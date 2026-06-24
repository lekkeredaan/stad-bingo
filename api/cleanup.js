// Dagelijkse opruiming via Firebase Admin (omzeilt de security rules veilig).
// Verwijdert verlopen lobby's + verzilverde-maar-verlopen codes.
// Ongebruikte codes blijven staan (= verkoopvoorraad).

import admin from 'firebase-admin';

const DB_URL = 'https://stad-bingo-default-rtdb.europe-west1.firebasedatabase.app';

function getDb() {
  if (!admin.apps.length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT is niet ingesteld.');
    // Ondersteun zowel platte JSON als base64-gecodeerde JSON
    const json = raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8');
    const serviceAccount = JSON.parse(json);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: DB_URL,
    });
  }
  return admin.database();
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  // Optionele beveiliging: als CRON_SECRET is ingesteld, eis de bijbehorende header.
  // Vercel stuurt deze header automatisch mee bij cron-aanroepen.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const now = Date.now();
  const purgeLegacy = req.query?.purgeLegacy === '1'; // eenmalig: ook spellen zonder expiresAt
  let gamesDeleted = 0, gamesKept = 0, legacyDeleted = 0, codesDeleted = 0;

  try {
    const db = getDb();

    // ── Verlopen lobby's ───────────────────────────────────────────────────────
    const games = (await db.ref('games').once('value')).val() || {};
    for (const [code, g] of Object.entries(games)) {
      if (g && g.expiresAt && g.expiresAt < now) {
        await db.ref(`games/${code}`).remove();
        gamesDeleted++;
        if (g.redemptionCode) await db.ref(`redeemCodes/${g.redemptionCode}`).remove();
      } else if (purgeLegacy && (!g || !g.expiresAt)) {
        await db.ref(`games/${code}`).remove();
        legacyDeleted++;
      } else {
        gamesKept++;
      }
    }

    // ── Verzilverde codes die verlopen zijn (ongebruikte blijven staan) ─────────
    const codes = (await db.ref('redeemCodes').once('value')).val() || {};
    for (const [code, c] of Object.entries(codes)) {
      if (c && c.status === 'redeemed' && c.expiresAt && c.expiresAt < now) {
        await db.ref(`redeemCodes/${code}`).remove();
        codesDeleted++;
      }
    }

    return res.status(200).json({ ok: true, gamesDeleted, gamesKept, legacyDeleted, codesDeleted });
  } catch (err) {
    console.error('Cleanup fout:', err);
    return res.status(500).json({ error: 'Cleanup mislukt: ' + err.message });
  }
}
