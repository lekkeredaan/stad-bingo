// Recap — Claude schrijft korte titelkaart-teksten (intro + outro) voor de aftermovie.

export const config = {
  api: { bodyParser: { sizeLimit: '256kb' } },
};

const SYSTEM = `Je schrijft korte, energieke titelkaart-teksten voor de "aftermovie" van een potje Lockout-Bingo: een locatie-bingo waarin teams opdrachten in de stad uitvoeren en foto's insturen.

Toon: speels, feestelijk, een tikje filmisch. Nederlands. Kort.

Antwoord ALTIJD exact in dit JSON-formaat, zonder markdown:
{
  "intro": "<1 korte zin om de aftermovie te openen, max 8 woorden>",
  "outro": "<1 korte zin om af te sluiten, max 10 woorden>"
}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(500).json({ error: 'ANTHROPIC_API_KEY is niet ingesteld.' });

  const { mode, teams, winner, photoCount } = req.body || {};

  const summary = [
    `Spelmodus: ${mode || 'onbekend'}.`,
    `Teams: ${(teams || []).map(t => `${t.name} (${t.score})`).join(', ') || 'onbekend'}.`,
    winner ? `Winnaar: ${winner}.` : 'Geen duidelijke winnaar.',
    `Aantal ingestuurde foto's: ${photoCount || 0}.`,
  ].join(' ');

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 200,
        system: SYSTEM,
        messages: [{ role: 'user', content: `Schrijf intro en outro voor deze aftermovie.\n${summary}` }],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Anthropic fout:', data);
      return res.status(response.status).json({ error: data.error?.message || 'Anthropic API fout' });
    }

    const text = data.content?.[0]?.text || '';
    const m = text.match(/\{[\s\S]*\}/);
    if (!m) return res.status(500).json({ error: 'Geen geldig antwoord.', raw: text });

    const r = JSON.parse(m[0]);
    return res.status(200).json({
      intro: String(r.intro || '').slice(0, 120),
      outro: String(r.outro || '').slice(0, 140),
    });
  } catch (err) {
    console.error('Recap fout:', err);
    return res.status(500).json({ error: 'Recap tijdelijk onbeschikbaar: ' + err.message });
  }
}
