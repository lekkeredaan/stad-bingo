# WIP — Host-goedkeuring van claims (vervolg-opdracht)

> Lees ook `HANDOFF.md` voor de algemene stack/architectuur. Dit document beschrijft
> één lopende feature die nog NIET af is. Werkmap is schoon; backend is klaar, de
> client-kant moet nog gebouwd worden.

## Doel
Naast "AI-rechter" of "niets" willen we een **handmatige goedkeuring door de host**:
- **Zonder AI** → de host moet elke claim goedkeuren.
- **Met AI** → als de rechter **twijfelt**, beslist de host alsnog.

## Genomen beslissingen (door de gebruiker bevestigd)
- **Goedkeurder = de host** (degene die het spel aanmaakte, `isHost === true`). Niet de masterscode.
- **AI-twijfel = de AI geeft het zelf aan** via een `uncertain`-vlag (niet op basis van cijfer).

## Beoordelingsmodi (waarde van `gs.judge` / `game.judge` in Firebase)
1. `off` — claims tellen direct (bestaat).
2. `host` — **NIEUW**: geen AI; elke claim met foto/video gaat naar de host-wachtrij.
3. `advisory` — AI geeft cijfer + commentaar, claim telt altijd (bestaat).
4. `blocking` — AI keurt goed/af; **bij `uncertain` → host beslist** (gedrag uitbreiden).

## Wat AL klaar is (gecommit + live op productie)
- `api/judge.js`: de rechter-prompt vraagt nu ook een `uncertain` (true/false) en de
  respons bevat `{ approved, uncertain, score, comment }`. Getest patroon = ongewijzigd;
  `uncertain` wordt nu meegestuurd. Client gebruikt het nog niet.

## Nog te bouwen (client-kant — `index.html`, `style.css`, `script.js`)

### 1. Setup-UI — modus-keuze uitbreiden (`index.html`)
`#judgeSel` heeft nu `off/advisory/blocking`. Voeg `host` toe en herschrijf de labels, bv.:
- Uit → `off`
- Host keurt goed → `host`
- AI – adviserend → `advisory`
- AI – streng (host bij twijfel) → `blocking`

Pas ook het uitleg-tekstje eronder aan. `createGame()` slaat `judgeMode` al op als `game.judge` —
geen wijziging nodig daar.

### 2. Datamodel — wachtrij in Firebase
Nieuwe node per spel: `/games/{code}/pending/{i}` (i = celindex), met:
```
{ cell: i, team: <claimed-waarde = teamIndex+1>, photo: <url|null>, mtype: 'image'|'video', verdict: {score,comment,approved,uncertain}|null }
```
- `gs.pending` (object, keyed op celindex) in de client. Initialiseer overal waar `gs` wordt
  opgebouwd uit Firebase-data: in `onGameData` (init-tak én game-update-tak: `gs.pending = data.pending || {}`)
  en in `restoreSession` (playing-tak). Bij lokale/nieuwe game: `gs.pending = {}`.

### 3. Claim-flow aanpassen (`confirmClaim` in script.js)
Huidige volgorde: upload → (AI judge) → race-check → claim. Nieuwe logica na de upload + judge:
```
const aiMode = gs.judge === 'advisory' || gs.judge === 'blocking';
// verdict komt al uit judgePhoto() in aiMode
let needHost = false;
if (gs.judge === 'host') needHost = true;
else if (gs.judge === 'blocking' && verdict) {
  if (verdict.approved === false && !verdict.uncertain) { showVerdict(verdict, true); return; } // zeker afgekeurd
  if (verdict.uncertain) needHost = true;                                                       // twijfel → host
  // anders: goedgekeurd → telt
}
if (needHost && isHost) needHost = false;   // de host is zelf de goedkeurder → telt direct
// race-check: cel nog vrij EN niet al in pending? (latest.cells[i].claimed of latest.pending?.[i] → afbreken)
if (needHost) { await submitPending(i, pn, mediaUrl, mediaType, verdict); closeClaimModal(); toast('Verstuurd — wacht op goedkeuring van de host.'); return; }
// anders: claim direct (bestaande pad: cell.claimed=pn, photo, mtype, verdict, computeScores, checkBingo/boardfull/syncClaim)
```
`submitPending(i, team, url, mtype, verdict)`: zet `gs.pending[i] = {cell:i,team,photo:url||null,mtype,verdict||null}`,
`renderGame()`, en `await fbPatchPath('games/'+gameCode+'/pending/'+i, entry)`.

### 4. Host review-paneel (alleen voor `isHost`)
- Knop in de spelbalk (`.game-actions`), alleen tonen als `isHost && aantal pending > 0`,
  met teller — bv. `<button class="lb-btn lb-btn--review" id="revBtn">… Keuren <span id="revCount">0</span></button>`.
  In `renderGame()` zichtbaarheid + teller bijwerken.
- Overlay `#rev` met een lijst (`renderReview()`): per pending-item de opdrachttekst
  (`gs.cells[cell].text`), teamnaam+kleur (`COLS[gs.players[team-1].color]`), de foto (`<img>`)
  of video (`<video controls>`), het AI-oordeel als `verdict` aanwezig is, en **Goedkeuren/Afwijzen**.
- `approveClaim(i)`: `cell.claimed = p.team; cell.photo=p.photo; cell.mtype=p.mtype; cell.verdict=p.verdict;`
  `delete gs.pending[i]`; `computeScores()`; verwijder pending in Firebase
  (`fetch(DB_URL+'/games/'+gameCode+'/pending/'+i+'.json',{method:'DELETE'})`); `await syncClaim(i)`;
  dan dezelfde **win/bingo + bord-vol**-check als in `confirmClaim` (kan een rij voltooien!).
- `rejectClaim(i)`: `delete gs.pending[i]`; pending in Firebase verwijderen; `renderGame()` + `renderReview()`.
  Cel blijft open → claimer ziet 'm vanzelf weer vrij via SSE.
- `toggleReview()/closeReview()`; bij SSE-update (`onGameData`) het paneel her-renderen als het open is.

### 5. Bord + interactie
- `clickCell(i)`: blokkeer ook als `gs.pending && gs.pending[i]` (naast free/claimed).
- In `renderGame()` voor een onclaimde cel die in `gs.pending` zit: toon een "wachtend"-badge
  (bv. `#lb-clock`-icoon) en dim de tegel licht (`is-pending`-class).

### 6. Toast-helper + CSS
- Klein `toast(msg)`-functie + element (fixed onderaan, fadet na ~2,5s) voor "wacht op goedkeuring".
- CSS in de redesign-stijl (`--lb-*` tokens) voor: review-knop, review-overlay (lijst-items zoals een
  bottom-sheet, hergebruik `#sov/#sbox`-patroon), pending-badge, toast.

## Testen na het bouwen (preview via eval; screenshots hangen op de Google Fonts)
- Modus `host`: niet-host claimt → komt in `gs.pending` + Firebase; host ziet review-knop met teller;
  goedkeuren → cel geclaimd + score; afwijzen → cel weer vrij. Host's eigen claim telt direct.
- Modus `blocking` + AI `uncertain:true` → claim naar host-wachtrij (mock `judgePhoto` om uncertain te forceren).
- Modus `blocking` + AI zeker goed/af → telt / afgewezen (bestaand gedrag, niet kapot).
- `off`/`advisory` ongewijzigd.
- Bord: pending-cel niet opnieuw te claimen; win-check werkt ook bij goedkeuren van een winnende rij.

## Belangrijke projectfeiten (zie ook HANDOFF.md)
- Deploy: `git push` naar `master` → auto-deploy productie. Visuele review eerst via een aparte
  branch + preview-URL (`stad-bingo-git-<branch>-lekkeredaans-projects.vercel.app`) is de gewende werkwijze.
- Sticker-redesign is overal toegepast (home, lobby, setup, bord, knoppen, timer, chips) — bouw de
  nieuwe UI in diezelfde stijl met de `--lb-*` tokens en de icoon-sprite (`<use href="#lb-…">`).
- Score is race-proof afgeleid uit de cellen (`computeScores`); een claim synct gericht via
  `syncClaim(i)` (alleen `/cells/{i}`). Volg datzelfde patroon voor approve (gericht, niet de hele array).
