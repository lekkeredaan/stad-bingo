// ── Data ────────────────────────────────────────────────────────────────────

const MODES = [
  { id: 'family',  icon: '👨‍👩‍👧‍👦', name: 'Familie',     desc: 'Leuk voor alle leeftijden' },
  { id: 'kids',    icon: '🎈',       name: 'Kids',        desc: 'Speciaal voor kinderen' },
  { id: 'adult18', icon: '🍾',       name: '18+',         desc: 'Vrijgezellenfeest & teamuitjes' },
  { id: 'adults',  icon: '🏙️',      name: 'Volwassenen', desc: 'Uitdagend, geen vieze content' },
  { id: 'custom',  icon: '✏️',       name: 'Vrij',        desc: 'Eigen opdrachten invoeren' },
];

const TASKS = {
  family: [
    'Maak een foto met een hond','Vind een bankje en ga zitten','Foto met iemand in een felle kleur',
    'Vind een bloem buiten','Foto met een fiets','Zwaai naar een vreemde — krijg een zwaai terug',
    'Vind iets ronds buiten','Selfie met een boom','Koop iets voor minder dan €1','Vind een rood voertuig',
    'Foto van een dier','Vraag iemand hoe laat het is','Winkel met een grappige naam',
    'Foto bij een brievenbus','Vind iemand met een hoed','Foto van iets blauw',
    'Vind een fontein of waterpartij','Gekke pose voor een gebouw','Vind iets ouder dan 50 jaar',
    'Groepsfoto met drie mensen','Foto bij een straatnaambord','Doe iemand na die je ziet',
    'Vind een paraplu','Foto van iets groen','Koop een snoepje en eet het op',
    'Vind een kind dat speelt','Foto van een mooie gekleurde deur','Vind iemand met zonnebril',
    'Groepsfoto met vijf mensen','Vind een kat','Foto op een brug','Vind iets van hout buiten',
    'Ga zitten op een terras','Selfie bij winkelingang','Vind iets geel',
    'Foto met iemand ouder dan 60','Vind een speelplaats','Foto van het hoogste gebouw dat je ziet',
    'Vind iemand met koptelefoon','Foto van een standbeeld of kunstwerk','Vind een glazen gebouw',
    'Vraag iemand een caféaanbeveling','Foto met grappig opschrift','Vind een straat zonder auto\'s',
    'Foto van jezelf in een spiegelruit','Vind iets oranje','Foto van een kerk of historisch gebouw',
    'Vind een ijskar','Maak een schaduwfoto','Maak een foto van iets symmetrisch',
  ],
  kids: [
    'Vind een hond en geef hem een aai','Foto van iets roze','Vind een vogel',
    'Raap afval op en gooi het weg','Grappig gezicht voor de camera','Vind iets groter dan jijzelf',
    'Foto met iemand die lacht','Rol over het gras','Foto van jouw schoenen naast andermans schoenen',
    'Vind een regenboogkleur buiten','Klim op iets en maak een foto','Vind iets dat je nog nooit zag',
    'Foto met een heel dikke boom','Zoek een vlinder of lieveheersbeestje','Tekening op de grond',
    'Gooi een muntje in een fontein','Vind iemand met een grappige tas','Doe een dansje in het openbaar',
    'Vind iets met wielen','Foto van iets dat je lekker vindt','Vind een ijskar of snackbar',
    'Foto van een vliegtuig in de lucht','Vind iemand met krullen','Foto van iets super klein',
    'Vind een put of rioolrooster','Vind iets met een getal erop','Foto van je favoriete etalage',
    'Vind iets met stippen','Zing een liedje buiten','Foto van iets doorschijnend',
    'Vind iemand die hardloopt','Foto van heel veel treden','Vind iets dat beweegt zonder motor',
    'Foto van iets hartvormig','Vind een bakker en ruik de geur','Foto van iets dat je bang maakt',
    'Vind iets roestig','Foto terwijl je springt','Vind iets eetbaars in de natuur',
    'Foto van iets paars','Vind een regenplas en spring erin','Maak een foto van iets met strepen',
    'Doe een handstand ergens','Vind een bushalte','Foto van een tunnel of doorgang',
    'Vind iets met een smiley erop','Foto met iemand die een fiets heeft',
    'Maak een schaduwfiguur','Vind iets glimmends','Foto van iets heel groots','Vind iets met een grappige vorm',
  ],
  adult18: [
    'Doe een shot bij een willekeurige bar','Overtuig een vreemde om met de groep te dansen',
    'Foto met iemand identiek gekleed','Vraag barman zijn beste drankje-aanbeveling',
    'Maak een dansje op een terras','Overtuig een vreemde voor een groepsselfie',
    'Bestel een drankje in een andere taal','Vind iemand die jarig is vandaag',
    'Foto bij kroeg met grappige naam','Overtuig een ober voor een speciale deal',
    'Maak een video van de groep die zingt','Vind een beveiliger of nachtwacht',
    'Doe een straatartiest na','Groepsfoto op een rotonde of plein',
    'Eet friet met saus staand op straat','Overtuig iemand mee te doen aan een wedstrijdje',
    'Foto met een taxi of tuktuk','Vraag vreemde om het beste adres voor vanavond',
    'Foto bij beroemde plek in de stad','Dans mee met een straatmuzikant',
    'Ruil iets kleins met een vreemde','Menselijke piramide op straat',
    'Overtuig iemand je te tekenen','Vraag cocktailbar om hun signature drink',
    'Groepskaraoke moment buiten','Zet iemand op om een mop te vertellen',
    'Foto bij opvallende street art','Koop iets onverwachts in een nachtwinkel',
    'Foto terwijl je zweeft (sprong-foto)','Vind een fotoautomaat en maak een strip',
    'Vraag vreemde naar hun levensmotto','Maak een conga-lijn met 5+ mensen',
    'Foto met een politieagent','Vraag barman om zijn wildste verhaal',
    'Foto bij indrukwekkende brug','Overtuig twee vreemden om te knuffelen',
    'Vind drie haarkleur combos in één foto','Maak een grappige video voor iemands socials',
    'Overtuig een vreemde voor een armworsteling','Foto op dak van parkeergarage',
    'Foto van de groep in een hotellobby','Overtuig de DJ jullie liedje te spelen',
    'Vind iemand met een unieke tatoeage','Doe een barman na achter de bar',
    'Vind een terrasje met de beste sfeer','Foto van de skyline vanaf hoog punt',
    'Zet iemand op om een speech te geven','Foto met een ober of barman',
    'Organiseer een spontane wedstrijdje','Vind iemand die je een geheim vertelt',
  ],
  adults: [
    'Foto bij het oudste gebouw dat je vindt','Overtuig een vreemde voor spontaan gesprek 2 min',
    'Vind het meest verborgen straatje','Foto van iets niet in een toeristengids',
    'Vraag local om hun stadsgeheim','Vind een markt of straatstalletje',
    'Foto van de mooiste deur die je ziet','Ontdek een café dat je niet kende',
    'Vind iemand met een bijzonder beroep','Panoramafoto van de skyline',
    'Vind de grappigste straatnaam','Foto bij een kunstwerk in de openbare ruimte',
    'Overtuig vreemde voor een gratis stadstip','Vind een historisch monument',
    'Foto met reflectie in een etalage','Foto van een fietser in beweging',
    'Proef een lokale specialiteit','Maak een schaduwfoto van de groep',
    'Vind een opmerkelijke streetart mural','Foto van het hoogste punt dat je bereikt',
    'Vraag ober voor niet-vermelde specialiteit','Vind een bankje met uitzicht',
    'Foto van iets dat de stad uniek maakt','Vraag local voor een mini-rondleiding',
    'Foto bij een brug','Vraag boekenwinkel om beste aanbeveling',
    'Foto van jezelf als cliché-toerist','Koop iets bij een lokale bakker',
    'Overtuig vreemde om groepsfoto te maken','Foto van waterpartij met lange sluitertijd',
    'Foto bij een kleurrijke muur','Bezoek een oud café en bestudeer de sfeer',
    'Foto bij stadsplattegrond','Vind iets typisch voor deze stad',
    'Foto van spiegeling in een plens water','Overtuig vreemde voor geïmproviseerd portret',
    'Terras met uitzicht op iets bijzonders','Foto van gebouw van boven bekeken',
    'Vind vintage item te koop op straat','Foto bij de drukste plek in de stad',
    'Overtuig iemand voor een grappig stadsweetje','Foto waarbij iedereen iets anders eet',
    'Vind iets dat 10 jaar geleden niet bestond','Foto bij originele stadsleuze',
    'Vind de beste koffie in de buurt','Foto van iets symmetrisch',
    'Vind iemand met een bijzonder verhaal','Foto van stadslichten na zonsondergang',
    'Vind de meest onverwachte winkel','Foto van iets dat je verrast',
  ],
};

const COLS = [
  { m: '#1a6fff', b: '#0a1a3a', l: '#7aacff' },
  { m: '#ff4444', b: '#3a0a0a', l: '#ff8888' },
  { m: '#00cc66', b: '#003318', l: '#55ffaa' },
  { m: '#ffaa00', b: '#2a1800', l: '#ffd055' },
  { m: '#cc44ff', b: '#1a0033', l: '#ee88ff' },
  { m: '#ff6688', b: '#330015', l: '#ffaabb' },
];

// ── State ────────────────────────────────────────────────────────────────────

let players = [];
let gs      = null;   // game state
let ti      = null;   // timer interval
let pci     = -1;     // pending claim index
let photos  = {};

// ── Setup screen ─────────────────────────────────────────────────────────────

function initSetup() {
  // Mode grid
  const mg = document.getElementById('mgrid');
  mg.innerHTML = MODES.map((m, i) =>
    `<div class="mc${i === 0 ? ' sel' : ''}" data-id="${m.id}" onclick="selMode('${m.id}')">
       <div class="mi">${m.icon}</div>
       <div class="mn">${m.name}</div>
       <div class="md">${m.desc}</div>
     </div>`
  ).join('');

  // Default players
  players = [{ name: 'Speler 1', color: 0 }, { name: 'Speler 2', color: 1 }];
  renderPlayers();

  // Board-size live label
  document.getElementById('gsz').oninput = e => {
    document.getElementById('glbl').textContent = e.target.value;
    updateCustomCount();
  };

  // Timer custom input toggle
  document.getElementById('tsel').onchange = e => {
    const custom = e.target.value === 'c';
    document.getElementById('tcust').style.display = custom ? 'block' : 'none';
    document.getElementById('tcl').style.display   = custom ? 'block' : 'none';
  };

  document.getElementById('citems').oninput = updateCustomCount;
  updateCustomCount();
}

function selMode(id) {
  document.querySelectorAll('.mc').forEach(c => c.classList.toggle('sel', c.dataset.id === id));
  document.getElementById('cc').style.display = id === 'custom' ? 'block' : 'none';
  updateCustomCount();
}

function getMode() {
  return (document.querySelector('.mc.sel') || { dataset: { id: 'family' } }).dataset.id;
}

function renderPlayers() {
  document.getElementById('plist').innerHTML = players.map((p, i) =>
    `<div class="pr" style="border-color:${COLS[p.color].m}33">
       <div class="cd" style="background:${COLS[p.color].m}"></div>
       <input type="text" value="${p.name}" onchange="players[${i}].name=this.value" style="flex:1;width:auto">
       <select onchange="players[${i}].color=+this.value" style="width:auto">
         ${COLS.map((c, ci) =>
           `<option value="${ci}"${ci === p.color ? ' selected' : ''}>${['Blauw','Rood','Groen','Geel','Paars','Roze'][ci]}</option>`
         ).join('')}
       </select>
       ${players.length > 2
         ? `<button class="btn br" style="padding:4px 9px;font-size:10px" onclick="removePlayer(${i})">✕</button>`
         : ''}
     </div>`
  ).join('');
}

function addPlayer() {
  if (players.length >= 6) return;
  const used = players.map(p => p.color);
  const next = COLS.findIndex((_, i) => !used.includes(i));
  players.push({ name: `Speler ${players.length + 1}`, color: next >= 0 ? next : 0 });
  renderPlayers();
}

function removePlayer(i) {
  if (players.length <= 2) return;
  players.splice(i, 1);
  renderPlayers();
}

function getCustomItems() {
  return document.getElementById('citems').value
    .split('\n').map(s => s.trim()).filter(s => s);
}

function updateCustomCount() {
  if (getMode() !== 'custom') return;
  const sz    = +document.getElementById('gsz').value || 5;
  const need  = sz * sz - (document.getElementById('fsp').checked ? 1 : 0);
  const have  = getCustomItems().length;
  const el    = document.getElementById('ccnt');
  el.style.color = have >= need ? '#4a9970' : '#c05050';
  el.textContent = `${have} opdrachten — ${need} nodig`;
}

function getTimerMinutes() {
  const s = document.getElementById('tsel').value;
  if (s === '0') return 0;
  if (s === 'c') return +document.getElementById('tcust').value || 45;
  return +s;
}

// ── Shuffle ───────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

// ── Start game ────────────────────────────────────────────────────────────────

function startGame() {
  const mode = getMode();
  const sz   = Math.max(3, Math.min(7, +document.getElementById('gsz').value || 5));
  const fs   = document.getElementById('fsp').checked;
  const need = sz * sz - (fs ? 1 : 0);
  const pool = mode === 'custom' ? getCustomItems() : [...TASKS[mode]];

  if (pool.length < need) {
    const err = document.getElementById('serr');
    err.style.display = 'block';
    err.textContent   = `Niet genoeg opdrachten! Nodig: ${need}, beschikbaar: ${pool.length}.`;
    return;
  }
  document.getElementById('serr').style.display = 'none';

  const items = shuffle(pool).slice(0, need);
  const cells = [];
  let idx     = 0;
  const mid   = Math.floor(sz / 2);

  for (let r = 0; r < sz; r++) {
    for (let c = 0; c < sz; c++) {
      if (fs && r === mid && c === mid) {
        cells.push({ text: 'VRIJ', free: true,  claimed: 0, photo: null, wc: false });
      } else {
        cells.push({ text: items[idx++], free: false, claimed: 0, photo: null, wc: false });
      }
    }
  }

  const tm = getTimerMinutes();
  gs = {
    mode,
    sz,
    cells,
    players: players.map(p => ({ ...p, score: 0 })),
    turn: 0,
    over: false,
    tm,
    ts:     tm * 60,
    tstart: tm > 0 ? Date.now() : null,
  };
  photos = {};

  document.getElementById('setup').classList.remove('active');
  document.getElementById('game').classList.add('active');

  if (tm > 0) startTimer();
  renderGame();
}

// ── Timer ─────────────────────────────────────────────────────────────────────

function startTimer() {
  clearInterval(ti);
  ti = setInterval(() => {
    if (!gs || gs.over) { clearInterval(ti); return; }
    const elapsed = Math.floor((Date.now() - gs.tstart) / 1000);
    const rem     = Math.max(0, gs.ts - elapsed);
    updateTimerDisplay(rem, gs.ts);
    if (rem <= 0) { clearInterval(ti); timeUp(); }
  }, 500);
}

function updateTimerDisplay(rem, tot) {
  const el = document.getElementById('tdsp');
  const tf = document.getElementById('tfill');
  const m  = Math.floor(rem / 60);
  const s  = rem % 60;
  el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  el.style.color = rem < 60 ? '#ff4444' : rem < tot * .25 ? '#ffaa00' : 'var(--txt)';
  tf.style.width      = `${Math.round(rem / tot * 100)}%`;
  tf.style.background = rem < 60 ? '#ff4444' : rem < tot * .25 ? '#ffaa00' : 'var(--acc)';
  document.getElementById('tlbl').textContent = `${Math.ceil(rem / 60)} min over`;
}

function timeUp() {
  gs.over = true;
  renderGame();
  const max = Math.max(...gs.players.map(p => p.score));
  const winners = gs.players.map((p, i) => ({ ...p, i })).filter(p => p.score === max);
  winners.length === 1
    ? showWinner(winners[0].i, 'Tijd is om! Meeste vakjes wint.')
    : showTie('Tijd is om — gelijkspel!');
}

// ── Render game ───────────────────────────────────────────────────────────────

function renderGame() {
  const m = MODES.find(x => x.id === gs.mode);
  document.getElementById('mlbl').textContent = `${m.icon} ${m.name}`;

  if (gs.tm > 0) document.getElementById('tbar').style.display = 'flex';

  // Player chips
  document.getElementById('pchips').innerHTML = gs.players.map((p, i) => {
    const c   = COLS[p.color];
    const act = !gs.over && gs.turn === i;
    return `<div class="chip${act ? ' act' : ''}" style="background:${c.b};border-color:${c.m};color:${c.l}">
              ${act ? '▶ ' : ''}${p.name}<span class="cs">${p.score}</span>
            </div>`;
  }).join('');

  // Turn label
  const tl = document.getElementById('turnl');
  if (!gs.over) {
    const cur = gs.players[gs.turn];
    tl.innerHTML = `<span style="color:${COLS[cur.color].m}">${cur.name}</span> — kies een opdracht`;
  } else {
    tl.innerHTML = '';
  }

  // Board
  const board = document.getElementById('board');
  const sz    = gs.sz;
  const cp    = Math.max(52, Math.min(86, Math.floor(550 / sz)));
  board.style.gridTemplateColumns = `repeat(${sz}, ${cp}px)`;

  board.innerHTML = gs.cells.map((cell, i) => {
    if (cell.free) {
      return `<div class="cell fr" style="width:${cp}px;height:${cp}px;font-size:9px">VRIJ</div>`;
    }

    let bg = 'var(--surf)', bc = 'var(--bdr)', tc = 'var(--txt)';
    if (cell.claimed) {
      const c = COLS[gs.players[cell.claimed - 1].color];
      bg = c.b; bc = c.m; tc = c.l;
    }

    const ownerName = cell.claimed ? gs.players[cell.claimed - 1].name : '';
    const photoIcon = cell.photo ? '<span class="pb">📷</span>' : '';
    const wc        = cell.wc ? ' wc' : '';
    const fs        = Math.max(9, Math.min(11, Math.floor(cp / 8)));

    return `<div class="cell${cell.claimed ? ' cl' : ''}${wc}"
               style="width:${cp}px;height:${cp}px;background:${bg};border-color:${bc};color:${tc};font-size:${fs}px"
               onclick="clickCell(${i})">
              ${photoIcon}
              ${cell.text}
              ${ownerName
                ? `<div class="ow" style="color:${COLS[gs.players[cell.claimed - 1].color].m}">${ownerName.substring(0, 8)}</div>`
                : ''}
            </div>`;
  }).join('');

  renderGallery();
}

// ── Claim flow ────────────────────────────────────────────────────────────────

function clickCell(i) {
  if (gs.over) return;
  const cell = gs.cells[i];
  if (cell.free || cell.claimed) return;

  pci = i;
  const cur = gs.players[gs.turn];
  document.getElementById('ptxt').textContent         = cell.text;
  document.getElementById('pins').textContent         = `${cur.name}: maak een foto als bewijs!`;
  document.getElementById('pprev').style.display      = 'none';
  document.getElementById('pprev').src                = '';
  document.getElementById('pconf').style.display      = 'none';
  document.getElementById('pshoot').textContent       = '📷 Foto kiezen';
  document.getElementById('pfile').value              = '';
  document.getElementById('pmod').classList.add('show');
}

function closeClaimModal() {
  document.getElementById('pmod').classList.remove('show');
  pci = -1;
}

document.getElementById('pfile').addEventListener('change', function () {
  if (!this.files || !this.files[0]) return;
  const reader = new FileReader();
  reader.onload = e => {
    const prev = document.getElementById('pprev');
    prev.src             = e.target.result;
    prev.style.display   = 'block';
    document.getElementById('pconf').style.display  = 'inline-block';
    document.getElementById('pshoot').textContent   = '📷 Andere foto';
  };
  reader.readAsDataURL(this.files[0]);
});

function confirmClaim() {
  const i = pci;
  if (i < 0) return;

  const cell   = gs.cells[i];
  const pi     = gs.turn;
  const pn     = pi + 1;
  const player = gs.players[pi];

  cell.claimed = pn;
  player.score++;

  const photoData = document.getElementById('pprev').src;
  if (photoData && photoData.startsWith('data:')) {
    cell.photo  = photoData;
    photos[i]   = { photo: photoData, task: cell.text, player: player.name, color: COLS[player.color].m };
  }

  closeClaimModal();

  // Check bingo
  const winLine = checkBingo(pn);
  if (winLine) {
    gs.over = true;
    winLine.forEach(x => gs.cells[x].wc = true);
    clearInterval(ti);
    renderGame();
    showWinner(pi, 'Rij voltooid!');
    return;
  }

  // Check board full
  if (gs.cells.filter(c => !c.free && !c.claimed).length === 0) {
    gs.over = true;
    clearInterval(ti);
    renderGame();
    const max     = Math.max(...gs.players.map(p => p.score));
    const winners = gs.players.map((p, x) => ({ ...p, i: x })).filter(p => p.score === max);
    winners.length === 1 ? showWinner(winners[0].i, 'Meeste vakjes!') : showTie('Gelijkspel!');
    return;
  }

  gs.turn = (gs.turn + 1) % gs.players.length;
  renderGame();
}

function checkBingo(pn) {
  const sz  = gs.sz;
  const c   = gs.cells;
  const ok  = i => c[i].claimed === pn || c[i].free;

  for (let r = 0; r < sz; r++) {
    const row = [...Array(sz)].map((_, i) => r * sz + i);
    if (row.every(ok)) return row;
  }
  for (let col = 0; col < sz; col++) {
    const column = [...Array(sz)].map((_, i) => i * sz + col);
    if (column.every(ok)) return column;
  }
  const d1 = [...Array(sz)].map((_, i) => i * sz + i);
  if (d1.every(ok)) return d1;
  const d2 = [...Array(sz)].map((_, i) => i * sz + (sz - 1 - i));
  if (d2.every(ok)) return d2;
  return null;
}

// ── Win / tie overlays ────────────────────────────────────────────────────────

function showWinner(pi, reason) {
  clearInterval(ti);
  const p = gs.players[pi];
  const c = COLS[p.color];

  document.getElementById('wtitle').textContent  = p.name + ' wint!';
  document.getElementById('wtitle').style.color  = c.m;
  document.getElementById('wreason').textContent = reason;

  const sorted = [...gs.players.map((pl, i) => ({ ...pl, i }))].sort((a, b) => b.score - a.score);
  document.getElementById('pod').innerHTML = sorted.map(pl =>
    `<div class="pe">
       <div class="ps" style="color:${COLS[pl.color].m}">${pl.score}</div>
       <div class="pn">${pl.name}</div>
     </div>`
  ).join('');

  document.getElementById('wov').classList.add('show');
}

function showTie(msg) {
  clearInterval(ti);
  document.getElementById('wtitle').textContent  = 'Gelijkspel!';
  document.getElementById('wtitle').style.color  = '#ffcc00';
  document.getElementById('wreason').textContent = msg || '';

  const sorted = [...gs.players.map((pl, i) => ({ ...pl, i }))].sort((a, b) => b.score - a.score);
  document.getElementById('pod').innerHTML = sorted.map(pl =>
    `<div class="pe">
       <div class="ps" style="color:${COLS[pl.color].m}">${pl.score}</div>
       <div class="pn">${pl.name}</div>
     </div>`
  ).join('');

  document.getElementById('wov').classList.add('show');
}

// ── Gallery ───────────────────────────────────────────────────────────────────

function toggleGallery() {
  const g = document.getElementById('gal');
  g.style.display = g.style.display === 'none' ? 'block' : 'none';
  renderGallery();
}

function renderGallery() {
  const grid = document.getElementById('gg');
  const ph   = Object.values(photos);
  if (!ph.length) {
    grid.innerHTML = '<div style="color:var(--muted);font-size:11px;padding:7px">Nog geen foto\'s gemaakt.</div>';
    return;
  }
  grid.innerHTML = ph.map(p =>
    `<div class="gi">
       <img src="${p.photo}" alt="foto">
       <div class="gl" style="color:${p.color}">${p.player}</div>
       <div class="gl">${p.task.substring(0, 38)}</div>
     </div>`
  ).join('');
}

// ── Reset ─────────────────────────────────────────────────────────────────────

function resetGame() {
  clearInterval(ti);
  gs   = null;
  pci  = -1;
  photos = {};
  document.getElementById('wov').classList.remove('show');
  document.getElementById('game').classList.remove('active');
  document.getElementById('gal').style.display = 'none';
  document.getElementById('setup').classList.add('active');
  renderPlayers();
  updateCustomCount();
}

// ── Boot ──────────────────────────────────────────────────────────────────────
initSetup();
