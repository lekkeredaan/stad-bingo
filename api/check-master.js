// Controleert of de ingevoerde code de mastercode van Lockout Bingo is.
// De code zelf staat niet in dit spel maar op ravotters.nl (zie _master.js).
//
// POST /api/check-master   Body: { code }   Antwoord: { isMaster, tooMany }

import { checkMaster } from './_master.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { code } = req.body || {};
  const result = await checkMaster(req, code, 'lockout-bingo');
  return res.status(200).json(result);
}
