# Lockout-Bingo — Code Handoff

Locatie-bingo: teams krijgen een bord met opdrachten, voeren ze uit in de stad en sturen
foto's/video's als bewijs. Realtime multiplayer via lobbycodes. Toegang via verkochte
verzilvercodes (72 uur geldig). Optionele AI-rechter beoordeelt het bewijs, en achteraf
is er een gedeelde galerij en een AI-aftermovie (highlight-reel met muziek).

> Let op: repo, Vercel-project en Firebase heten historisch nog **`stad-bingo`**.
> De productnaam/branding is **Lockout-Bingo**. Functioneel is dit hetzelfde project.

---

## Tech-stack

| Laag | Keuze |
|---|---|
| Frontend | **Vanilla HTML/CSS/JS** — géén framework, géén build-stap. Drie bestanden: `index.html`, `style.css`, `script.js`. |
| Fonts | Orbitron + DM Sans (Google Fonts) |
| Hosting | **Vercel** (statische site + serverless functions). Auto-deploy bij elke push naar `master`. |
| Realtime + database | **Firebase Realtime Database** via REST (PUT/PATCH/GET) + **SSE/EventSource** voor live sync. Regio `europe-west1`. |
| Media-opslag | **Cloudinary** — foto's én video's, **direct vanuit de browser** (unsigned upload preset). |
| AI | **Anthropic Claude API** (`claude-sonnet-4-6`, vision) via serverless functions. |
| Cron | **Vercel Cron** (dagelijkse opruiming). |
| Aftermovie | **Canvas 2D** (rendering) + **Web Audio API** (muziek) + **MediaRecorder** (mp4/webm-export) + **Web Share API** (delen). |
| Dependencies | `cloudinary`, `firebase-admin` (alleen voor de serverless functions). |

---

## Bestanden

```
index.html            Alle schermen (home, verzilveren, setup, lobby, join, spel) + overlays
style.css             Volledige styling (licht "variant C"-thema, design-tokens in :root)
script.js             Alle spel-logica (één bestand, ~2000 regels)
api/judge.js          AI-rechter: foto/frame → Claude vision → {approved, score, comment}
api/recap.js          AI-titelkaarten voor de aftermovie (intro/outro-tekst)
api/cleanup.js        Dagelijkse opruiming via firebase-admin (verlopen lobby's + codes)
api/upload.js         LEGACY/ongebruikt — server-side Cloudinary-upload. Uploads gaan nu
                      direct browser→Cloudinary (zie uploadMedia in script.js). Kan weg.
assets/audio/*.mp3    8 royalty-free muziektracks voor de aftermovie
vercel.json           Functions-config, dagelijkse cron, domein-redirects
package.json          Dependencies voor de functions
database.rules.json   Firebase security rules (read/write per games/$id en redeemCodes/$code)
firebase.json         Firebase CLI-config (rules-deploy)
```

---

## Externe diensten & env-vars (op Vercel-project `stad-bingo`)

Allemaal als **Sensitive** ingesteld (niet terug te lezen):

| Env var | Waarvoor |
|---|---|
| `CLOUDINARY_CLOUD_NAME` | Cloudinary-cloud (`dxgedixra`) — ook in `script.js` als `CLOUD_NAME` |
| `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Alleen nog voor de legacy `api/upload.js` |
| `ANTHROPIC_API_KEY` | Claude API (rechter + recap) |
| `FIREBASE_SERVICE_ACCOUNT` | Service-account JSON voor de cleanup-cron (admin-toegang) |
| `CRON_SECRET` | Beveiligt `/api/cleanup`; Vercel stuurt 'm automatisch mee bij de cron |

**Cloudinary:** unsigned upload preset met naam **`lockout_bingo`** (Settings → Upload).
**Firebase:** Realtime Database, rules in `database.rules.json` (alleen lees/schrijf per
afzonderlijk record — de collectie is bewust niet opsombaar; daarom gebruikt de cleanup
firebase-admin).

**Belangrijke constanten in `script.js`:**
- `DB_URL` — Firebase database-URL
- `MASTER_CODE` = `LOCKOUT-MASTER-2026` — admin/masterscode (verander dit bij overdracht!)
- `CLOUD_NAME` / `UPLOAD_PRESET` — Cloudinary
- `VALIDITY_MS` = 72 uur — geldigheid van codes/lobby's
- `MUSIC` — lijst aftermovie-tracks

---

## Datamodel (Firebase)

```
/games/{lobbycode}        { mode, sz, tm, judge, status, over, turn, tstart,
                            expiresAt, redemptionCode,
                            cells:[{text, free, claimed, wc, photo, mtype, verdict}],
                            teams:[{name, color, score, members:[]}], winner, winReason }
/redeemCodes/{code}       { status: 'unused'|'redeemed', redeemedAt, expiresAt, gameCode }
```

- Score wordt afgeleid uit de geclaimde vakjes (race-proof), niet als losse teller bijgehouden.
- Een claim synct gericht (`/games/{code}/cells/{i}`) i.p.v. de hele array, zodat
  gelijktijdige claims elkaar niet overschrijven (getest tot 20 spelers tegelijk).

---

## Deploy & lokaal draaien

- **Deploy:** `git push` naar `master` → Vercel deployt automatisch naar productie.
  De Vercel CLI is niet nodig.
- **Branch `aftermovie`** bestaat nog (was de integratiebranch) maar is gemerged.
- **Lokaal:** het is een statische site; serveer de map met bijv. `npx serve .`.
  De serverless functions (rechter/recap/cleanup) draaien dan niet, maar de directe
  Cloudinary-upload werkt wel (browser→Cloudinary). Voor de functions lokaal: `vercel dev`
  (vereist dat de env-vars beschikbaar zijn; de "Sensitive" vars zijn niet te pullen).

---

## Domeinen

Canoniek: **`lockoutbingo.nl`**. Alle varianten (lockout-bingo.nl/.online, lockoutbingo.online,
stad-bingo.nl, stadbingo.nl, stadbingo.online) verwijzen er via host-redirects in `vercel.json`
naartoe. DNS bij TransIP: A-record `@` → `76.76.21.21` per domein.

---

## Aandachtspunten voor de nieuwe ontwikkelaar

- **`api/upload.js` is dood** sinds uploads direct naar Cloudinary gaan — mag verwijderd
  (en de regel in `vercel.json`). De `CLOUDINARY_API_KEY/SECRET` env-vars zijn dan ook niet
  meer nodig.
- **Verander `MASTER_CODE`** in `script.js` bij overdracht (staat in de client-broncode).
- **Kosten:** Claude-rechter ≈ ~$0,01 per beoordeelde foto; Cloudinary-video kost opslag/
  bandbreedte. Firebase/Vercel/Cloudinary draaien op gratis tiers (Vercel Hobby is formeel
  niet-commercieel → overweeg Pro).
- **Capaciteit:** ~100 gelijktijdige spelers op de Firebase-gratis-tier (verbindingslimiet).
- De cleanup ruimt geen Cloudinary-media op — alleen Firebase-records. Media in Cloudinary
  blijft staan tot je dat apart opruimt.
