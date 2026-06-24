// Dagelijkse opruiming: verwijdert verlopen lobby's + verzilverde-maar-verlopen codes.
// Wordt door Vercel Cron aangeroepen (zie vercel.json). Ongebruikte codes blijven staan.

const DB_URL = 'https://stad-bingo-default-rtdb.europe-west1.firebasedatabase.app';

export default async function handler(req, res) {
  // Optionele beveiliging: als CRON_SECRET is ingesteld, eis de bijbehorende header.
  // Vercel stuurt deze header automatisch mee bij cron-aanroepen.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const now = Date.now();
  let gamesDeleted = 0, gamesKept = 0, codesDeleted = 0;
  const errors = [];

  try {
    // ── Verlopen lobby's ───────────────────────────────────────────────────────
    const games = await (await fetch(`${DB_URL}/games.json`)).json() || {};
    for (const [code, g] of Object.entries(games)) {
      if (g && g.expiresAt && g.expiresAt < now) {
        const r = await fetch(`${DB_URL}/games/${code}.json`, { method: 'DELETE' });
        if (r.ok) gamesDeleted++; else errors.push(`game ${code}: ${r.status}`);
      } else {
        gamesKept++;
      }
    }

    // ── Verzilverde codes die verlopen zijn (ongebruikte blijven staan) ─────────
    const codes = await (await fetch(`${DB_URL}/redeemCodes.json`)).json() || {};
    for (const [code, c] of Object.entries(codes)) {
      if (c && c.status === 'redeemed' && c.expiresAt && c.expiresAt < now) {
        const r = await fetch(`${DB_URL}/redeemCodes/${code}.json`, { method: 'DELETE' });
        if (r.ok) codesDeleted++; else errors.push(`code ${code}: ${r.status}`);
      }
    }

    return res.status(200).json({ ok: true, gamesDeleted, gamesKept, codesDeleted, errors });
  } catch (err) {
    console.error('Cleanup fout:', err);
    return res.status(500).json({ error: 'Cleanup mislukt: ' + err.message, gamesDeleted, codesDeleted });
  }
}
