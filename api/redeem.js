// Codebeheer voor Lockout Bingo, volledig op de server.
//
// Vroeger las en schreef de browser de codes rechtstreeks in Firebase. Daardoor
// kon iedereen zelf een "geldige" code aanmaken. Nu mag alleen deze functie
// (via Firebase Admin) bij /redeemCodes; de databaseregels blokkeren de rest.
//
// POST /api/redeem  { action, ... }
//   redeem          { code }            → code inwisselen (start de 72-uursklok)
//   link            { code, gameCode }  → lobby aan een ingewisselde code koppelen
//   admin-list      { master }          → codes tonen (alleen met mastercode)
//   admin-generate  { master }          → 10 nieuwe codes (alleen met mastercode)
//
// Soorten codes:
//   LB-XXXXXXXX     eigen voorraad in Firebase (adminpaneel)
//   XXXX-XXXX       gekocht in de webshop op ravotters.nl (daar gecontroleerd)
//   LB-<vast deel>  mastercode (op ravotters.nl gecontroleerd, zie _master.js)

import admin from 'firebase-admin';
import crypto from 'crypto';
import { checkMaster, clientInfo } from './_master.js';

const DB_URL = 'https://stad-bingo-default-rtdb.europe-west1.firebasedatabase.app';
const SHOP_VERIFY = process.env.SHOP_VERIFY_API || 'https://www.ravotters.nl/api/codes/verify';
const VALIDITY_MS = 72 * 60 * 60 * 1000;
const OWN_CODE = /^LB-[A-Z0-9]{8}$/;
const SHOP_CODE = /^[A-Z0-9]{4}-[A-Z0-9]{4}$/;
const GAME_CODE = /^[A-Z0-9]{6}$/;

function getDb() {
  if (!admin.apps.length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT is niet ingesteld.');
    const json = raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8');
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(json)),
      databaseURL: DB_URL,
    });
  }
  return admin.database();
}

const clean = (v) => String(v ?? '').trim().toUpperCase().slice(0, 40);

async function verifyShopCode(req, code) {
  const { ip, geo } = clientInfo(req);
  try {
    const r = await fetch(SHOP_VERIFY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, gameSlug: 'lockout-bingo', ip, geo }),
      signal: AbortSignal.timeout(8000),
    });
    return await r.json();
  } catch {
    return null;
  }
}

async function redeem(req, body) {
  const code = clean(body.code);
  if (!code) return { ok: false, reason: 'empty' };
  const db = getDb();
  const now = Date.now();
  const ref = db.ref(`redeemCodes/${code.replace(/[.#$[\]/]/g, '')}`);

  // 1. Eigen voorraad (of een eerder ingewisselde webshopcode).
  if (OWN_CODE.test(code) || SHOP_CODE.test(code)) {
    const entry = (await ref.once('value')).val();
    if (entry) {
      if (entry.status === 'redeemed') {
        if (entry.expiresAt && entry.expiresAt < now) return { ok: false, reason: 'expired' };
        return { ok: true, gameCode: entry.gameCode || null, expiresAt: entry.expiresAt || null };
      }
      const expiresAt = now + VALIDITY_MS;
      await ref.update({ status: 'redeemed', redeemedAt: now, expiresAt, gameCode: null });
      return { ok: true, gameCode: null, expiresAt };
    }
  }

  // 2. Code uit de webshop: ravotters.nl controleert hem en start daar de 72 uur.
  if (SHOP_CODE.test(code)) {
    const v = await verifyShopCode(req, code);
    if (!v) return { ok: false, reason: 'offline' };
    if (v.reason === 'too_many_attempts') return { ok: false, reason: 'too_many' };
    if (!v.valid) return { ok: false, reason: v.reason === 'expired' ? 'expired' : 'not_found' };
    const expiresAt = v.expiresAt ? new Date(v.expiresAt).getTime() : now + VALIDITY_MS;
    // Spiegel in Firebase zodat terugkeren naar de lobby en koppelen blijven werken.
    await ref.set({ status: 'redeemed', redeemedAt: now, expiresAt, gameCode: null, source: 'shop' });
    return { ok: true, gameCode: null, expiresAt };
  }

  // 3. Anders: is het de mastercode?
  if (!OWN_CODE.test(code)) {
    const m = await checkMaster(req, code, 'lockout-bingo');
    if (m.tooMany) return { ok: false, reason: 'too_many' };
    if (m.isMaster) return { ok: true, isMaster: true };
  }
  return { ok: false, reason: 'not_found' };
}

async function link(body) {
  const code = clean(body.code);
  const gameCode = clean(body.gameCode);
  if (!code || !GAME_CODE.test(gameCode)) return { ok: false };
  const ref = getDb().ref(`redeemCodes/${code.replace(/[.#$[\]/]/g, '')}`);
  const entry = (await ref.once('value')).val();
  if (!entry || entry.status !== 'redeemed' || entry.gameCode) return { ok: false };
  if (entry.expiresAt && entry.expiresAt < Date.now()) return { ok: false };
  await ref.update({ gameCode });
  return { ok: true };
}

async function adminList(req, body) {
  const m = await checkMaster(req, body.master, 'lockout-bingo');
  if (!m.isMaster) return { ok: false, status: m.tooMany ? 429 : 403 };
  const all = (await getDb().ref('redeemCodes').once('value')).val() || {};
  const codes = Object.entries(all)
    .filter(([, d]) => d && d.source !== 'shop')
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([code, d]) => ({ code, status: d.status, expiresAt: d.expiresAt || null }));
  return { ok: true, codes };
}

async function adminGenerate(req, body) {
  const m = await checkMaster(req, body.master, 'lockout-bingo');
  if (!m.isMaster) return { ok: false, status: m.tooMany ? 429 : 403 };
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const updates = {};
  for (let i = 0; i < 10; i++) {
    const bytes = crypto.randomBytes(8);
    const c = 'LB-' + Array.from(bytes, (b) => chars[b % chars.length]).join('');
    updates[c] = { status: 'unused', redeemedAt: null, expiresAt: null, gameCode: null };
  }
  await getDb().ref('redeemCodes').update(updates);
  return adminList(req, body);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();
  const body = req.body || {};
  try {
    let out;
    switch (body.action) {
      case 'redeem': out = await redeem(req, body); break;
      case 'link': out = await link(body); break;
      case 'admin-list': out = await adminList(req, body); break;
      case 'admin-generate': out = await adminGenerate(req, body); break;
      default: return res.status(400).json({ ok: false, reason: 'unknown_action' });
    }
    const { status, ...rest } = out;
    return res.status(status || 200).json(rest);
  } catch (e) {
    console.error('redeem fout:', e);
    return res.status(500).json({ ok: false, reason: 'server' });
  }
}
