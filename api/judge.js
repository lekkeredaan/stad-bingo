// De Rechter — beoordeelt of een bingo-opdracht echt is uitgevoerd, op basis van de foto.

export const config = {
  api: { bodyParser: { sizeLimit: '2mb' } },
};

const JUDGE_SYSTEM = `Je bent "De Rechter" in het spel Lockout-Bingo: een locatie-bingo waarin teams opdrachten in de stad uitvoeren en een foto als bewijs insturen.

Je taak: beoordeel of de foto aannemelijk laat zien dat de opdracht is uitgevoerd.

Toon:
- Speels, kort en met humor — maar eerlijk.
- Schrijf in het Nederlands, 1 tot 2 zinnen.
- Geen uitroeptekens stapelen, geen scheldwoorden.

Beoordelingsregels:
- Wees soepel: geef het voordeel van de twijfel. Als de foto redelijkerwijs bij de opdracht past, keur je goed.
- Keur alleen af als de foto duidelijk niets met de opdracht te maken heeft, leeg/zwart is, of overduidelijk vals.
- "approved" = true betekent: de claim telt.
- "score" is 1-10 voor de uitvoering (sfeer, creativiteit, duidelijkheid van het bewijs).

Antwoord ALTIJD exact in dit JSON-formaat, zonder markdown:
{
  "approved": <true of false>,
  "score": <getal 1-10>,
  "comment": "<jouw korte oordeel in het Nederlands>"
}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is niet ingesteld.' });
  }

  const { task, imageUrl } = req.body || {};
  if (!task)     return res.status(400).json({ error: 'task is verplicht.' });
  if (!imageUrl) return res.status(400).json({ error: 'imageUrl is verplicht.' });

  const content = [
    { type: 'image', source: { type: 'url', url: imageUrl } },
    { type: 'text', text: `De opdracht was: "${task}"\nBeoordeel de bijgevoegde foto.` },
  ];

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 400,
        system: JUDGE_SYSTEM,
        messages: [{ role: 'user', content }],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Anthropic fout:', data);
      return res.status(response.status).json({ error: data.error?.message || 'Anthropic API fout' });
    }

    const text = data.content?.[0]?.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: 'De Rechter gaf geen geldig antwoord.', raw: text });
    }

    const result = JSON.parse(jsonMatch[0]);
    return res.status(200).json({
      approved: result.approved !== false,
      score:    Math.min(10, Math.max(1, Math.round(result.score || 5))),
      comment:  String(result.comment || '').slice(0, 300),
    });

  } catch (err) {
    console.error('Judge fout:', err);
    return res.status(500).json({ error: 'De Rechter is tijdelijk onbeschikbaar: ' + err.message });
  }
}
