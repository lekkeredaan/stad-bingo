// Gedeelde mastercode-controle voor alle Ravotters-spellen.
//
// De mastercode (afkorting van het spel + een vast deel) staat alleen op
// ravotters.nl. Deze functie stuurt de ingevoerde code daarheen, samen met het
// internetadres en de geschatte locatie van de speler, zodat ravotters.nl
// (1) te veel foute pogingen kan blokkeren en (2) een mail kan sturen als de
// mastercode buiten de regio Helmond wordt gebruikt.
//
// Bestanden die met een _ beginnen worden door Vercel niet als eigen URL gezien.

const MASTER_API = process.env.MASTER_API || 'https://www.ravotters.nl/api/master/check';

function dec(v) {
  if (!v) return null;
  try { return decodeURIComponent(v); } catch { return v; }
}

export function clientInfo(req) {
  const h = (req && req.headers) || {};
  const lat = parseFloat(h['x-vercel-ip-latitude']);
  const lon = parseFloat(h['x-vercel-ip-longitude']);
  return {
    ip: String(h['x-forwarded-for'] || '').split(',')[0].trim() || undefined,
    geo: Number.isFinite(lat) && Number.isFinite(lon)
      ? {
          lat, lon,
          city: dec(h['x-vercel-ip-city']),
          region: dec(h['x-vercel-ip-country-region']),
          country: h['x-vercel-ip-country'] || null,
        }
      : undefined,
  };
}

// Geeft { isMaster, tooMany } terug. Bij een storing: isMaster = false.
export async function checkMaster(req, code, gameSlug) {
  if (!code || typeof code !== 'string') return { isMaster: false, tooMany: false };
  const { ip, geo } = clientInfo(req);
  try {
    const r = await fetch(MASTER_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code.slice(0, 80), gameSlug, ip, geo }),
      signal: AbortSignal.timeout(8000),
    });
    if (r.status === 429) return { isMaster: false, tooMany: true };
    const d = await r.json().catch(() => ({}));
    return { isMaster: d.isMaster === true, tooMany: false };
  } catch {
    return { isMaster: false, tooMany: false };
  }
}
