// ── Firebase config ───────────────────────────────────────────────────────────
// 👇 Vul hier de URL van jouw Firebase Realtime Database in
const DB_URL = 'https://stad-bingo-default-rtdb.europe-west1.firebasedatabase.app';

// Als DB_URL niet is ingesteld → lokale modus (geen Firebase vereist)
const LOCAL_MODE = DB_URL.includes('YOUR-PROJECT');

// ── Verzilvercodes & admin ──────────────────────────────────────────────────────
// Masterscode werkt altijd (geen verzilvering/verloop) en ontgrendelt het adminpaneel.
const MASTER_CODE  = 'LOCKOUT-MASTER-2026';
const HOUR         = 60 * 60 * 1000;
const VALIDITY_MS  = 72 * HOUR; // codes en lobby's zijn 72 uur geldig na verzilvering

// ── Icon library ──────────────────────────────────────────────────────────────

/* Mode card icons — amber line art, 36 × 36 */
const ICONS = {
  family: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#e89520" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="10" cy="9" r="3.5"/>
    <path d="M4 27v-4a6 6 0 0 1 12 0v4"/>
    <circle cx="26" cy="9" r="3.5"/>
    <path d="M20 27v-4a6 6 0 0 1 12 0v4"/>
    <circle cx="18" cy="15.5" r="2.8"/>
    <path d="M13.5 27v-3a4.5 4.5 0 0 1 9 0v3"/>
  </svg>`,

  kids: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#e89520" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="18" cy="13.5" r="9.5"/>
    <path d="M18 23v6"/>
    <path d="M15 28.5q3 2.5 6 0"/>
    <circle cx="14" cy="12.5" r="1.5" fill="#e89520" stroke="none"/>
    <circle cx="22" cy="12.5" r="1.5" fill="#e89520" stroke="none"/>
    <path d="M15.5 18q2.5 2 5 0"/>
  </svg>`,

  adult18: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#e89520" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 5h12l-4 13h-4L12 5z"/>
    <line x1="18" y1="18" x2="18" y2="28"/>
    <path d="M13 28h10"/>
    <circle cx="15.5" cy="11" r="1.3" fill="#e89520" stroke="none"/>
    <circle cx="21" cy="8.5" r="1.1" fill="#e89520" stroke="none"/>
    <circle cx="19.5" cy="15" r="1" fill="#e89520" stroke="none"/>
  </svg>`,

  adults: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#e89520" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="19" width="7" height="13" rx="1.5"/>
    <rect x="10" y="13" width="7" height="19" rx="1.5"/>
    <rect x="18" y="7" width="9" height="25" rx="1.5"/>
    <rect x="28" y="16" width="6" height="16" rx="1.5"/>
    <path d="M1 32h34"/>
    <path d="M22.5 4v3M20.5 5.5h4"/>
  </svg>`,

  loco: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#e89520" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 3l2.5 6.5L27 8l-4.5 5.5L26 20l-6.5-3L13 22l1.5-7L9 11l6.5-.5z" fill="#e89520" fill-opacity=".18"/>
    <path d="M18 3l2.5 6.5L27 8l-4.5 5.5L26 20l-6.5-3L13 22l1.5-7L9 11l6.5-.5z"/>
    <path d="M6 26c2-3 5-2 7-4" stroke-linecap="round"/>
    <path d="M30 26c-2-3-5-2-7-4" stroke-linecap="round"/>
    <path d="M12 30c1-2 3-3 6-3s5 1 6 3" stroke-linecap="round"/>
    <circle cx="13" cy="13" r="1.2" fill="#e89520" stroke="none"/>
    <circle cx="25" cy="16" r="1" fill="#e89520" stroke="none"/>
    <circle cx="9" cy="22" r=".9" fill="#e89520" stroke="none"/>
  </svg>`,

  custom: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#e89520" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24 5l7 7-18 18H6v-7L24 5z"/>
    <path d="M20 9l7 7"/>
    <path d="M6 25l5 5"/>
    <path d="M3 33l3-7 4 4z" fill="#e89520"/>
  </svg>`,
};

/* Inline button icons — inherits currentColor, used via innerHTML */
const BTN = {
  camera:  `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px;flex-shrink:0"><rect x="1" y="4.5" width="13" height="9" rx="2"/><circle cx="7.5" cy="9" r="2.3"/><path d="M5 4.5l1-2h3l1 2"/><circle cx="12" cy="6.8" r=".7" fill="currentColor" stroke="none"/></svg>`,
  camSm:   `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x=".5" y="3" width="9" height="6.5" rx="1.5"/><circle cx="5" cy="6.2" r="1.6"/><path d="M3.2 3l.8-1.5h2l.8 1.5"/></svg>`,
};

// ── Data ──────────────────────────────────────────────────────────────────────

const MODES = [
  { id: 'family',  icon: ICONS.family,  name: 'Familie',     desc: 'Leuk voor alle leeftijden' },
  { id: 'kids',    icon: ICONS.kids,    name: 'Kids',        desc: 'Speciaal voor kinderen' },
  { id: 'adults',  icon: ICONS.adults,  name: 'Volwassenen', desc: 'Uitdagend, geen vieze content' },
  { id: 'adult18', icon: ICONS.adult18, name: '18+',         desc: 'Vrijgezellenfeest & teamuitjes' },
  { id: 'loco',    icon: ICONS.loco,    name: 'KNETTERGEK',  desc: 'Voor wie geen schaamte meer heeft' },
  { id: 'custom',  icon: ICONS.custom,  name: 'Vrij',        desc: 'Eigen opdrachten invoeren' },
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
    // Makkelijk
    'Maak een foto terwijl je een vreemde knuffelt',
    'Maak een foto van jezelf terwijl je in een winkelwagentje zit',
    'Vraag een voorbijganger om een mop te vertellen en neem het op',
    'Maak een menselijke piramide van drie mensen',
    'Doe de Macarena in een supermarkt en film het',
    'Maak een foto van een verkeersbord dat begint met de letter B',
    'Fotografeer jezelf op een schommel',
    'Vraag een vreemde om je op de rug te dragen',
    'Maak een teamfoto waarbij iedereen een zonnebril draagt',
    'Maak een slinger van 12 schoenen aan elkaar',
    'Lak je nagels en fotografeer het resultaat',
    'Eet een lokale lekkernij en maak een foto',
    'Blaas een ballon op tot het knapt',
    'Maak een mummie van een teamgenoot met toiletpapier',
    'Geef een teamgenoot een moddermasker',
    'Neem een roltrap in de verkeerde richting en film het',
    'Doe een koprol in het openbaar',
    'Klim op een klimrek en maak een foto',
    'Verzamel 10 grassprieten en leg ze van groot naar klein',
    'Aai een kat en maak een foto',
    // Gemiddeld
    'Laat een vreemde een gezicht op je hand tekenen',
    'Organiseer een mini-danswedstrijd op straat',
    'Maak een foto terwijl je een vreemde helpt met boodschappen dragen',
    'Zoek een straatmuzikant en zing een duet',
    'Sta op één been op een brug en maak een foto',
    'Doe een trucje met de hond van een vreemde en film het',
    'Maak een groepsfoto in de etalage van een winkel',
    'Doe een korte workout in een park en neem het op',
    'Maak een foto terwijl je op een boomtak zit',
    'Vraag een vreemde om een grappig gezicht te trekken en maak een foto samen',
    'Maak en draag een hoed van aluminiumfolie',
    'Houd een bord vast met "Gratis knuffels" en geef knuffels aan vreemden',
    'Bied voorbijgangers gratis koffie aan uit een thermoskan',
    'Doe Mentos in een fles cola en drink zo veel mogelijk voor het overloopt',
    'Ga touwtjespringen voor een winkel',
    'Geef een roos aan drie vrouwen',
    'Eet een wortel in de supermarkt',
    'Bel bij iemand aan en zeg bij het openen: "oh, ik ben vergeten te rennen"',
    'Drink een biertje met een lokaal voetbalteam in hun kantine',
    'Bestel bij McDonald\'s een cheeseburger zonder broodje, burger, saus, uitjes en augurk',
    'Tap een biertje en fotografeer het',
    'Trakteer een vreemde op een ijsje',
    'Neem een flinke hap sambal en neem het op',
    'Spot een driewieler en maak een foto',
    'Ruil een briefje van €10 in voor losse munten',
    'Peuter in je neus en eet het op',
    // Uitdagend
    'Vraag een lokale politieagent om samen op de foto te gaan',
    'Fotografeer jezelf terwijl je in een fontein staat',
    'Vraag een voorbijganger om je een make-over te geven',
    'Zing een liedje op een drukke plek in {stad} en film het',
    'Fotografeer jezelf terwijl je een straatkunstwerk nabootst',
    'Geef een wildvreemde een handmassage en neem het op',
    'Drink een glas vers gemolken melk met een koe op de achtergrond',
    'Vraag een schilder of je een stukje mag schilderen',
    'Kus een kikker',
    'Doe 50 push-ups in het openbaar op film',
    'Bouw een zo hoog mogelijke toren van willekeurige spullen',
    'Koop een haring met uitjes op de markt en eet hem ter plekke op',
    'Roep luid BINGO in een bibliotheek in {stad}',
    'Maak een ritje op een kinderfiets door {stad}',
    'Loop op hakken een drogist binnen en vraag om blarenpleisters',
    'Zing een lied in de lift terwijl vreemden mee instappen',
    'Doe een bodyshot bij een teamgenoot',
    'Probeer bij een pizzeria een pizza te bakken',
    'Eet een Madame Jeanette peper en kauw er minimaal 10 seconden op',
    'Win van het andere team met armpje drukken',
    'Blaf naar een hond totdat je reactie krijgt',
    'Ga op een yogamat yoga doen op een drukke plek in {stad} totdat iemand reageert',
    'Vang een vis',
    'Bestel op een terras een biertje, zeg dat je een radler hebt besteld, zeg dan dat je een radler 2.0 hebt besteld',
    'Laat een tijdelijke tattoo op een gênante plek zetten',
    'Vraag een voorbijganger om een grappig verhaal over {stad} te vertellen en neem het op',
    'Loop als straatpredikant door het centrum van {stad} en film het',
    'Maak een selfie bij het meest herkenbare punt van {stad}',
    // Stoer
    'Stop stiekem een briefje van €5 in de tas van een vreemde',
    'Hars het been van een teamgenoot',
    'Knoop grassprieten aan elkaar totdat het 2 meter lang is',
    'Was je haren met shampoo bij een openbare fontein in {stad}',
    'Laat de oudste van het team een tequila suicide doen en daarna Stevie Wonder zingen',
    'Doe een adje uit je eigen schoen',
    'Laat een bekende je haar in een belachelijke stijl knippen',
    'Lik de voet van een teamgenoot',
    'Maak met het hele team arm-in-arm een koprol',
    'Vraag een vreemde of je hun voeten mag masseren',
    'Doe alsof je dronken bent en bel een willekeurig nummer in je telefoon',
    'Drink een shotje rum op een boot als een echte piraat',
    'Breng bloemen naar de moeder van een teamgenoot',
    'Laat een teamgenoot in een zo gek mogelijk outfit een fristi kopen bij de supermarkt',
    'Laat een teamgenoot het Red Bull-schap aanvullen bij de Albert Heijn',
    'Eet met het hele team een frikandel bij een lokale cafetaria of friettent',
    // Extreem
    'Speel de kopbal van Robin van Persie na — het moet echt goed zijn',
    'Win een gratis drankje van een barman',
    'Eet een Madame Jeanette peper en slik hem door zonder te drinken',
    'Doe een bekende Jackass-stunt na op film',
    'Organiseer een eetwedstrijd bij een lokale cafetaria met minimaal drie vreemden',
    'Haal een alcoholische versnapering voor de spelleiding van een cafetaria in {stad}',
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

  loco: [
    'Roep midden op straat "HEEFT IEMAND MIJN PAARD GEZIEN?" en wacht op reactie',
    'Loop 2 minuten achteruit door de stad en doe alsof dit volkomen normaal is',
    'Ga op de grond liggen op een drukke plek en blijf 30 seconden doodstil',
    'Vraag een willekeurige winkel om een product dat ze absoluut niet hebben — houd vol',
    'Doe alsof je een straatmuzikant bent, zonder instrument — geef een volledige performance',
    'Ren naar een vreemde, geef een enthousiastste high five en ren weg zonder iets te zeggen',
    'Ga op handen en voeten een winkel binnen en vraag beleefd om hulp',
    'Vertel een voorbijganger een volledig verzonnen dramatisch levensverhaal',
    'Loop 3 minuten lang met een denkbeeldige hond aan de lijn — aaibaar, trots',
    'Bestel bij een café alsof je de eigenaar bent en de medewerkers jouw personeel zijn',
    'Vraag een vreemde of je even zijn of haar schoenen mag passen',
    'Zit op een bankje en doe 5 minuten alsof je wacht op een heel belangrijke persoon — kijk af en toe ongeduldig op je horloge',
    'Leg aan drie verschillende vreemden uit dat je beroemd bent, maar liever anoniem blijft',
    'Vraag een willekeurig iemand om een handtekening — "voor de herinnering"',
    'Doe alsof je een reportage maakt over de straat, inclusief serieuze interviews',
    'Loop mee met een groep toeristen alsof je de gids bent — minimaal 1 minuut',
    'Ga een willekeurige winkel binnen, bekijk alles heel aandachtig en loop dan weg zonder iets te zeggen',
    'Vraag drie mensen op rij om de weg naar een straat die niet bestaat',
    'Doe alsof je telefoon trilt, neem op en voer een serieus zakengesprek op straat',
    'Klop aan bij een willekeurige deur en vraag of ze een kopje suiker hebben',
    'Vertel een vreemde dat je zijn of haar tweelingbroer of zus al jaren zoekt',
    'Ga op een bankje zitten en eet een imaginaire maaltijd — vork en mes en alles',
    'Vraag een cafémedewerker of je het menu even mag recenseren voor je blog',
    'Doe een volledige warming-up alsof je een topsporter bent — midden op straat',
    'Zeg gedag tegen elke lantaarnpaal die je passeert voor een hele straat lang',
    'Probeer iemand te overtuigen dat er morgen een nationale feestdag is die niemand kent',
    'Vraag in een supermarkt of ze ook "biologische lucht" verkopen',
    'Loop met gespreide armen door een drukke straat alsof je een vliegtuig bent',
    'Ga voor een etalage staan en doe alsof je naar een spannende film kijkt',
    'Vraag een vreemde om een foto — zet dan een absurd pose neer en houd die vol',
    'Vertel iemand dat je psychisch voelt dat ze vandaag een geweldige dag zullen hebben',
    'Doe alsof je verdwaald bent in een stad die je perfect kent — vraag vijf mensen om hulp',
    'Ga op de grond zitten en teken een denkbeeldig portret van een voorbijganger — overhandig het',
    'Geef een minutenlange TED-talk op straat over een willekeurig object dat je ziet',
    'Vraag een vreemde of je even op zijn of haar rugzak mag passen — ga dan zitten',
    'Loop gebukt door een straat alsof het plafond te laag is',
    'Sla vriendschappelijk een arm om een lantaarnpaal en maak een groepsfoto',
    'Vertel een complete vreemde dat je hem al jarenlang bewondert',
    'Doe een dansje zodra je muziek hoort, waar je ook bent',
    'Vraag in een apotheek iets voor "te veel enthousiasme"',
    'Wijs naar de lucht en doe alsof je iets spectaculairs ziet — wacht tot anderen ook kijken',
    'Doe alsof je een onzichtbare vriend meeneemt — bestel ook voor hem of haar',
    'Vraag een willekeurig iemand of ze je kunnen helpen een woord te spellen',
    'Ga een gebouw binnen, loop langzaam een rondje en verlaat het weer met een tevreden knikje',
    'Fluister iets geheimzinnigs in het oor van een teamgenoot terwijl een vreemde toekijkt',
    'Vraag een winkelier vriendelijk om een product op de hoogste plank te pakken — neem het dan toch niet',
    'Doe alsof je in slow motion loopt door een drukke straat',
    'Leg een vreemde heel serieus uit hoe je loopt — alsof het een complexe vaardigheid is',
    'Zeg "bedankt voor alles" tegen een pinautomaat na het pinnen',
    'Vraag drie verschillende mensen of ze je kunnen helpen je eigen naam te onthouden',
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

// ── State ─────────────────────────────────────────────────────────────────────

let players        = [];
let gs             = null;
let ti             = null;
let pci            = -1;
let pendingTeamIdx = -1;
let myTeamIdx      = -1;   // which team this device is playing for
let photos         = {};
let currentCity = 'jouw stad';
let gameCode    = null;
let isHost      = false;
let gameStream  = null;
let redeemCode  = null;   // verzilverde code die dit spel heeft aangemaakt
let isAdmin     = false;  // masterscode ingevoerd

// ── Scherm navigatie ──────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showHome() {
  stopListening();
  clearInterval(ti);
  clearSession();
  gs         = null;
  pci        = -1;
  myTeamIdx  = -1;
  photos     = {};
  gameCode   = null;
  isHost     = false;
  redeemCode = null;
  isAdmin    = false;
  document.getElementById('wov').classList.remove('show');
  document.getElementById('sov').classList.remove('show');
  document.getElementById('gal').style.display = 'none';

  // Verberg de join-knop als Firebase niet is ingesteld
  const joinBtn = document.querySelector('#home .btn.bg2');
  if (joinBtn) joinBtn.style.display = LOCAL_MODE ? 'none' : '';

  showScreen('home');
}

function showSetup() {
  players = [{ name: 'Team 1', color: 0 }, { name: 'Team 2', color: 1 }];
  initSetup();
  showScreen('setup');
}

// ── Code verzilveren (klantreis: code → "Maak mijn spel") ───────────────────────

function showRedeem() {
  if (LOCAL_MODE) { showSetup(); return; }
  redeemCode = null;
  isAdmin    = false;
  document.getElementById('redeemCode').value           = '';
  document.getElementById('redeemErr').style.display    = 'none';
  document.getElementById('redeemBtn').textContent      = 'MAAK MIJN SPEL';
  document.getElementById('redeemBtn').disabled         = false;
  document.getElementById('adminPanel').style.display   = 'none';
  showScreen('redeem');
}

function showRedeemErr(msg) {
  const el = document.getElementById('redeemErr');
  el.textContent   = msg;
  el.style.display = 'block';
}

async function submitRedeem() {
  const code  = document.getElementById('redeemCode').value.trim().toUpperCase();
  const btn   = document.getElementById('redeemBtn');
  document.getElementById('redeemErr').style.display = 'none';

  if (!code) { showRedeemErr('Vul je code in.'); return; }

  // ── Masterscode: altijd geldig, ontgrendelt adminpaneel ──────────────────────
  if (code === MASTER_CODE) {
    redeemCode = null;
    isAdmin    = true;
    document.getElementById('adminPanel').style.display = 'block';
    renderAdminCodes();
    showSetup();
    return;
  }

  btn.textContent = 'CONTROLEREN...';
  btn.disabled    = true;
  const entry = await fbGetPath(`redeemCodes/${code}`);
  btn.textContent = 'MAAK MIJN SPEL';
  btn.disabled    = false;

  if (!entry) { showRedeemErr('Code niet gevonden. Controleer je code.'); return; }

  const now = Date.now();

  if (entry.status === 'redeemed') {
    if (entry.expiresAt && entry.expiresAt < now) {
      showRedeemErr('Deze code is verlopen (72 uur na verzilvering verstreken).');
      return;
    }
    // Code is al verzilverd en nog geldig — terug naar de bijbehorende lobby als host
    if (entry.gameCode) {
      const game = await fbGet(entry.gameCode);
      if (game && game.status !== 'over' && (!game.expiresAt || game.expiresAt > now)) {
        gameCode   = entry.gameCode;
        isHost     = true;
        redeemCode = code;
        if (game.status === 'lobby') {
          document.getElementById('waitCode').textContent       = gameCode;
          document.getElementById('waitSub').textContent        = 'Deel deze code met andere spelers';
          document.getElementById('waitStartBtn').style.display = 'block';
          document.getElementById('hostJoinCard').style.display = myTeamIdx < 0 ? 'block' : 'none';
          renderHostTeamPicker(game.teams);
          renderWaitPlayers(game.teams);
          saveSession();
          showScreen('wait');
          fbListen(gameCode, onGameData);
          return;
        }
      }
    }
    // Nog geen (geldig) spel aangemaakt met deze code — door naar setup binnen het verloopvenster
    redeemCode = code;
    showSetup();
    return;
  }

  // ── Code is nog ongebruikt: verzilver nu, start de 72-uurs klok ──────────────
  try {
    await fbPatchPath(`redeemCodes/${code}`, { status: 'redeemed', redeemedAt: now, expiresAt: now + VALIDITY_MS, gameCode: null });
  } catch {
    showRedeemErr('Verbinding mislukt. Probeer opnieuw.');
    return;
  }

  redeemCode = code;
  showSetup();
}

// ── Adminpaneel (alleen na masterscode) ──────────────────────────────────────────

async function adminGenerateCodes() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const codes = Array.from({ length: 10 }, () =>
    'LB-' + Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  );
  for (const c of codes) {
    await fbSetPath(`redeemCodes/${c}`, { status: 'unused', redeemedAt: null, expiresAt: null, gameCode: null });
  }
  await renderAdminCodes();
}

async function renderAdminCodes() {
  const all  = (await fbGetPath('redeemCodes')) || {};
  const rows = Object.entries(all).sort((a, b) => b[0].localeCompare(a[0]));
  document.getElementById('adminCodeList').innerHTML = rows.length
    ? rows.map(([code, d]) => {
        const expired = d.status === 'redeemed' && d.expiresAt && d.expiresAt < Date.now();
        const status  = d.status === 'redeemed' ? (expired ? 'verlopen' : 'actief (72u)') : 'ongebruikt';
        const color   = d.status === 'redeemed' ? (expired ? '#e07070' : '#4a9970') : 'var(--muted)';
        return `<div style="display:flex;justify-content:space-between;gap:8px;padding:5px 0;border-bottom:1px solid var(--bdr);font-size:12px">
                  <span style="font-family:'Orbitron',monospace">${code}</span>
                  <span style="color:${color}">${status}</span>
                </div>`;
      }).join('')
    : '<div style="color:var(--muted);font-size:12px">Nog geen codes. Klik op "Genereer 10 codes".</div>';
}

function showJoinScreen() {
  if (LOCAL_MODE) {
    alert('Meedoen via code vereist Firebase Realtime Database.\nVul je DB_URL in bovenaan script.js om multiplayer te activeren.');
    return;
  }
  document.getElementById('joinCode').value             = '';
  document.getElementById('joinDetails').style.display  = 'none';
  document.getElementById('joinErr').style.display      = 'none';
  document.getElementById('joinSearchBtn').textContent  = 'ZOEKEN';
  showScreen('join');
}

// ── Code generator ────────────────────────────────────────────────────────────

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// ── Firebase REST API ─────────────────────────────────────────────────────────

async function fbSet(code, data) {
  const res = await fetch(`${DB_URL}/games/${code}.json`, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Firebase fout: ${res.status} ${res.statusText}`);
}

async function fbPatch(code, data) {
  await fetch(`${DB_URL}/games/${code}.json`, {
    method:  'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  });
}

async function fbGet(code) {
  try {
    const r = await fetch(`${DB_URL}/games/${code}.json`);
    return r.json();
  } catch { return null; }
}

// Generieke helpers voor andere paden dan /games (bv. /redeemCodes)
async function fbGetPath(path) {
  try {
    const r = await fetch(`${DB_URL}/${path}.json`);
    return r.json();
  } catch { return null; }
}

async function fbSetPath(path, data) {
  const res = await fetch(`${DB_URL}/${path}.json`, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Firebase fout: ${res.status} ${res.statusText}`);
}

async function fbPatchPath(path, data) {
  const res = await fetch(`${DB_URL}/${path}.json`, {
    method:  'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Firebase fout: ${res.status} ${res.statusText}`);
}

function fbListen(code, cb) {
  stopListening();
  gameStream = new EventSource(`${DB_URL}/games/${code}.json`);

  const handle = async (e, isPatch) => {
    try {
      const d = JSON.parse(e.data);
      // 'put' on '/' = full snapshot → pass directly
      if (!isPatch && d.path === '/' && d.data) { cb(d.data); return; }
      // All other cases (patch, sub-path put) = partial data → refetch full state
      const full = await fbGet(code);
      if (full) cb(full);
    } catch {}
  };

  gameStream.addEventListener('put',   e => handle(e, false));
  gameStream.addEventListener('patch', e => handle(e, true));
  gameStream.onerror = () => {};
}

function stopListening() {
  if (gameStream) { gameStream.close(); gameStream = null; }
}

// ── GPS detectie ──────────────────────────────────────────────────────────────

async function fetchCityName(lat, lon) {
  try {
    const res  = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10`,
      { headers: { 'Accept-Language': 'nl-NL,nl' } }
    );
    const data = await res.json();
    return data.address?.city
        || data.address?.town
        || data.address?.village
        || data.address?.municipality
        || 'jouw stad';
  } catch {
    return 'jouw stad';
  }
}

function detectCity() {
  return new Promise(resolve => {
    if (!navigator.geolocation) { resolve('jouw stad'); return; }
    // Resolve immediately with fallback after 4 s (don't block game creation)
    const fallback = setTimeout(() => resolve('jouw stad'), 4000);
    navigator.geolocation.getCurrentPosition(
      async pos => {
        clearTimeout(fallback);
        resolve(await fetchCityName(pos.coords.latitude, pos.coords.longitude));
      },
      () => { clearTimeout(fallback); resolve('jouw stad'); },
      { timeout: 4000, maximumAge: 60000 }
    );
  });
}

// ── Setup scherm ──────────────────────────────────────────────────────────────

function initSetup() {
  const mg = document.getElementById('mgrid');
  mg.innerHTML = MODES.map((m, i) =>
    `<div class="mc${i === 0 ? ' sel' : ''}" data-id="${m.id}" onclick="selMode('${m.id}')">
       <div class="mi">${m.icon}</div>
       <div class="mn">${m.name}</div>
       <div class="md">${m.desc}</div>
     </div>`
  ).join('');

  renderPlayers();

  document.getElementById('gsz').oninput = e => {
    document.getElementById('glbl').textContent = e.target.value;
    updateCustomCount();
  };
  document.getElementById('tsel').onchange = e => {
    const c = e.target.value === 'c';
    document.getElementById('tcust').style.display = c ? 'block' : 'none';
    document.getElementById('tcl').style.display   = c ? 'block' : 'none';
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
         ? `<button class="btn br" style="padding:4px 9px;font-size:10px;line-height:1" onclick="removePlayer(${i})"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 2l6 6M8 2l-6 6"/></svg></button>`
         : ''}
     </div>`
  ).join('');
}

function addPlayer() {
  if (players.length >= 6) return;
  const used = players.map(p => p.color);
  const next = COLS.findIndex((_, i) => !used.includes(i));
  players.push({ name: `Team ${players.length + 1}`, color: next >= 0 ? next : 0 });
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
  const sz   = +document.getElementById('gsz').value || 5;
  const need = sz * sz - (document.getElementById('fsp').checked ? 1 : 0);
  const have = getCustomItems().length;
  const el   = document.getElementById('ccnt');
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

// ── Spel aanmaken (host) ──────────────────────────────────────────────────────

async function createGame() {
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

  const btn = document.querySelector('[onclick="createGame()"]');
  const btnOrig = btn.innerHTML;
  btn.textContent = 'LOCATIE OPHALEN...';
  btn.disabled    = true;
  currentCity     = await detectCity();
  btn.innerHTML   = btnOrig;
  btn.disabled    = false;

  const items = shuffle(pool).slice(0, need).map(t => t.replace(/\{stad\}/g, currentCity));
  const cells = [];
  let idx     = 0;
  const mid   = Math.floor(sz / 2);

  for (let r = 0; r < sz; r++) {
    for (let c = 0; c < sz; c++) {
      if (fs && r === mid && c === mid) cells.push({ text: 'VRIJ', free: true,  claimed: 0, wc: false });
      else                              cells.push({ text: items[idx++], free: false, claimed: 0, wc: false });
    }
  }

  const tm = getTimerMinutes();

  // ── Lokale modus (geen Firebase) ──────────────────────────────────────────
  if (LOCAL_MODE) {
    photos   = {};
    gameCode = null;
    isHost   = false;
    gs = {
      mode, sz,
      cells:   cells.map(c => ({ ...c, photo: null })),
      players: players.map(p => ({ name: p.name, color: p.color, score: 0, members: [] })),
      turn: 0, over: false,
      tm, ts: tm * 60,
      tstart: tm > 0 ? Date.now() : null,
    };
    document.getElementById('gal').style.display = 'none';
    showScreen('game');
    if (tm > 0 && gs.tstart) startTimer();
    renderGame();
    return;
  }

  // ── Multiplayer via Firebase ───────────────────────────────────────────────
  isHost   = true;

  btn.textContent = 'SPEL AANMAKEN...';
  btn.disabled    = true;

  // Eigen lobbycode (optioneel)
  const customRaw = document.getElementById('customCode')?.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '') || '';
  if (customRaw) {
    if (customRaw.length < 4 || customRaw.length > 10) {
      btn.innerHTML = btnOrig; btn.disabled = false;
      const err = document.getElementById('serr');
      err.style.display = 'block';
      err.textContent   = 'Eigen lobbycode moet 4 tot 10 tekens zijn (letters/cijfers).';
      return;
    }
    const existing = await fbGet(customRaw);
    const taken = existing && existing.status !== 'over' && (!existing.expiresAt || existing.expiresAt > Date.now());
    if (taken) {
      btn.innerHTML = btnOrig; btn.disabled = false;
      const err = document.getElementById('serr');
      err.style.display = 'block';
      err.textContent   = 'Deze lobbycode is al in gebruik. Kies een andere.';
      return;
    }
    gameCode = customRaw;
  } else {
    gameCode = generateCode();
  }

  const expiresAt = Date.now() + VALIDITY_MS;

  try {
    await fbSet(gameCode, {
      mode, sz, tm,
      status:    'lobby',
      over:      false,
      turn:      0,
      tstart:    0,
      cells,
      teams:     players.map(p => ({ name: p.name, color: p.color, score: 0, members: [] })),
      winner:    -1,
      winReason: '',
      expiresAt,
      redemptionCode: redeemCode || null,
    });
    if (redeemCode) await fbPatchPath(`redeemCodes/${redeemCode}`, { gameCode });
  } catch (e) {
    btn.innerHTML = btnOrig;
    btn.disabled  = false;
    const err = document.getElementById('serr');
    err.style.display = 'block';
    err.textContent   = 'Verbinding met Firebase mislukt. Controleer je internetverbinding.';
    return;
  }

  btn.innerHTML = btnOrig;
  btn.disabled  = false;

  document.getElementById('waitCode').textContent       = gameCode;
  document.getElementById('waitSub').textContent        = 'Deel deze code met andere spelers';
  document.getElementById('waitStartBtn').style.display = 'block';
  const initTeams = players.map(p => ({ ...p, members: [] }));
  renderWaitPlayers(initTeams);
  renderHostTeamPicker(initTeams);
  showScreen('wait');
  saveSession();
  fbListen(gameCode, onGameData);
}

// ── Joinen ────────────────────────────────────────────────────────────────────

async function searchGame() {
  const code = document.getElementById('joinCode').value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  document.getElementById('joinErr').style.display = 'none';

  if (code.length !== 6) { showJoinErr('Voer een geldige 6-cijferige code in'); return; }

  document.getElementById('joinSearchBtn').textContent = 'ZOEKEN...';
  const data = await fbGet(code);
  document.getElementById('joinSearchBtn').textContent = 'OPNIEUW ZOEKEN';

  if (!data)                    { showJoinErr('Spel niet gevonden. Controleer de code.'); return; }
  if (data.expiresAt && data.expiresAt < Date.now()) { showJoinErr('Dit spel is verlopen (72 uur verstreken).'); return; }
  if (data.status === 'playing'){ showJoinErr('Dit spel is al begonnen.'); return; }
  if (data.status === 'over')   { showJoinErr('Dit spel is afgelopen.'); return; }

  gameCode = code;
  renderJoinTeams(data.teams);
  document.getElementById('joinDetails').style.display = 'block';
}

function renderJoinTeams(teams) {
  document.getElementById('joinTeamList').dataset.sel = '';
  document.getElementById('joinTeamList').innerHTML   = teams.map((t, i) => {
    const c       = COLS[t.color];
    const members = (t.members || []).join(', ') || 'Nog niemand';
    return `<div class="join-team" data-idx="${i}"
               style="border-color:${c.m};background:${c.b}"
               onclick="selectJoinTeam(this, ${i})">
              <div class="cd" style="background:${c.m};width:12px;height:12px;flex-shrink:0"></div>
              <div style="flex:1">
                <div style="color:${c.l};font-weight:600;font-size:14px">${t.name}</div>
                <div style="font-size:11px;color:var(--muted);margin-top:2px">${members}</div>
              </div>
            </div>`;
  }).join('');
}

function selectJoinTeam(el, i) {
  document.querySelectorAll('.join-team').forEach(e => e.classList.remove('sel-team'));
  el.classList.add('sel-team');
  document.getElementById('joinTeamList').dataset.sel = i;
}

async function confirmJoin() {
  const name    = document.getElementById('joinName').value.trim();
  const selRaw  = document.getElementById('joinTeamList').dataset.sel;
  const teamIdx = selRaw !== '' ? +selRaw : -1;

  if (!name)       { showJoinErr('Vul je naam in'); return; }
  if (teamIdx < 0) { showJoinErr('Kies een team'); return; }

  const data = await fbGet(gameCode);
  if (!data) { showJoinErr('Verbindingsfout. Probeer opnieuw.'); return; }

  const teams = data.teams.map((t, i) =>
    i === teamIdx ? { ...t, members: [...(t.members || []), name] } : t
  );
  await fbPatch(gameCode, { teams });

  myTeamIdx = teamIdx;
  isHost    = false;
  document.getElementById('waitCode').textContent       = gameCode;
  document.getElementById('waitSub').textContent        = 'Wachten tot de host het spel start...';
  document.getElementById('waitStartBtn').style.display = 'none';
  document.getElementById('hostJoinCard').style.display = 'none';
  renderWaitPlayers(teams);
  showScreen('wait');
  saveSession();
  fbListen(gameCode, onGameData);
}

function showJoinErr(msg) {
  const el = document.getElementById('joinErr');
  el.textContent   = msg;
  el.style.display = 'block';
}

// ── Wait scherm (lobby) ───────────────────────────────────────────────────────

function renderHostTeamPicker(teams) {
  const list = document.getElementById('hostTeamList');
  if (!list) return;
  list.dataset.sel = '';
  list.innerHTML = teams.map((t, i) => {
    const c = COLS[t.color];
    return `<div class="join-team" data-idx="${i}"
               style="border-color:${c.m};background:${c.b}"
               onclick="selectHostTeam(this,${i})">
              <div class="cd" style="background:${c.m};width:12px;height:12px;flex-shrink:0"></div>
              <div style="color:${c.l};font-weight:600;font-size:14px">${t.name}</div>
            </div>`;
  }).join('');
}

function selectHostTeam(el, i) {
  document.querySelectorAll('#hostTeamList .join-team').forEach(e => e.classList.remove('sel-team'));
  el.classList.add('sel-team');
  document.getElementById('hostTeamList').dataset.sel = i;
}

function renderWaitPlayers(teams) {
  document.getElementById('waitPlayers').innerHTML = teams.map(t => {
    const c       = COLS[t.color];
    const members = (t.members || []).join(', ') || 'Nog niemand gejoint';
    return `<div class="pr" style="border-color:${c.m}55">
              <div class="cd" style="background:${c.m}"></div>
              <div>
                <div style="font-weight:600;color:${c.l};font-size:14px">${t.name}</div>
                <div style="font-size:12px;color:var(--muted)">${members}</div>
              </div>
            </div>`;
  }).join('');
}

async function hostStartGame() {
  if (!isHost || !gameCode) return;

  const name    = document.getElementById('hostName').value.trim();
  const selRaw  = document.getElementById('hostTeamList').dataset.sel;
  const teamIdx = selRaw !== '' ? +selRaw : -1;
  const errEl   = document.getElementById('hostJoinErr');

  if (!name) {
    errEl.textContent = 'Vul eerst je naam in';
    errEl.style.display = 'block';
    return;
  }
  if (teamIdx < 0) {
    errEl.textContent = 'Kies eerst een team';
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';

  const btn = document.getElementById('waitStartBtn');
  btn.textContent = 'STARTEN...';
  btn.disabled    = true;

  // Add host to chosen team, then set status to playing
  const data  = await fbGet(gameCode);
  const teams = (data?.teams || players.map(p => ({ ...p, members: [] }))).map((t, i) =>
    i === teamIdx ? { ...t, members: [...(t.members || []), name] } : t
  );

  await fbPatch(gameCode, { teams, status: 'playing', tstart: Date.now() });

  myTeamIdx       = teamIdx;
  saveSession();
  btn.textContent = 'SPEL STARTEN';
  btn.disabled    = false;
}

function leaveWait() {
  stopListening();
  showHome();
}

// ── Firebase data handler ─────────────────────────────────────────────────────

function onGameData(data) {
  if (!data) return;
  const screen = document.querySelector('.screen.active')?.id;

  if (data.status === 'lobby') {
    if (screen === 'wait') {
      renderWaitPlayers(data.teams);
      // Keep host team picker in sync but preserve current selection
      if (isHost) {
        const sel = document.getElementById('hostTeamList')?.dataset.sel;
        renderHostTeamPicker(data.teams);
        if (sel !== '') {
          const el = document.querySelector(`#hostTeamList [data-idx="${sel}"]`);
          if (el) el.classList.add('sel-team');
          document.getElementById('hostTeamList').dataset.sel = sel;
        }
      }
    }
    return;
  }

  if (data.status === 'playing' || data.status === 'over') {
    if (screen === 'wait') {
      // Eerste keer: initialiseer gs en ga naar game scherm
      photos = {};
      const tm = data.tm || 0;
      gs = {
        mode:    data.mode,
        sz:      data.sz,
        cells:   data.cells.map(c => ({ ...c, photo: null })),
        players: data.teams,
        turn:    data.turn,
        over:    data.over || data.status === 'over',
        tm,
        ts:      tm * 60,
        tstart:  data.tstart || null,
      };
      showScreen('game');
      if (tm > 0 && gs.tstart) startTimer();
      renderGame();

    } else if (screen === 'game' && gs) {
      const wasOver = gs.over;
      gs.cells   = data.cells.map((c, i) => ({ ...c, photo: gs.cells[i]?.photo || null }));
      gs.players = data.teams;
      gs.turn    = data.turn;
      gs.over    = data.over || data.status === 'over';
      renderGame();

      if (!wasOver && gs.over) {
        clearInterval(ti);
        if (data.winner >= 0) showWinner(data.winner, data.winReason);
        else showTie(data.winReason);
      }
    }
  }
}

// ── Game state sync naar Firebase ─────────────────────────────────────────────

async function syncGameState(opts = {}) {
  if (!gameCode) return;
  await fbPatch(gameCode, {
    cells:     gs.cells.map(c => ({ text: c.text, free: c.free, claimed: c.claimed, wc: c.wc })),
    teams:     gs.players.map(p => ({ name: p.name, color: p.color, score: p.score, members: p.members || [] })),
    turn:      gs.turn,
    over:      gs.over,
    status:    gs.over ? 'over' : 'playing',
    winner:    opts.winner !== undefined ? opts.winner : -1,
    winReason: opts.winReason || '',
  });
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
  el.textContent      = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  el.style.color      = rem < 60 ? '#ff4444' : rem < tot * .25 ? '#ffaa00' : 'var(--txt)';
  tf.style.width      = `${Math.round(rem / tot * 100)}%`;
  tf.style.background = rem < 60 ? '#ff4444' : rem < tot * .25 ? '#ffaa00' : 'var(--acc)';
  document.getElementById('tlbl').textContent = `${Math.ceil(rem / 60)} min over`;
}

function timeUp() {
  gs.over = true;
  renderGame();
  const max     = Math.max(...gs.players.map(p => p.score));
  const winners = gs.players.map((p, i) => ({ ...p, i })).filter(p => p.score === max);
  if (winners.length === 1) {
    showWinner(winners[0].i, 'Tijd is om! Meeste vakjes wint.');
    syncGameState({ winner: winners[0].i, winReason: 'Tijd is om! Meeste vakjes wint.' });
  } else {
    showTie('Tijd is om — gelijkspel!');
    syncGameState({ winner: -1, winReason: 'Tijd is om — gelijkspel!' });
  }
}

// ── Cell font sizing ──────────────────────────────────────────────────────────
// Scale font size so text always fits: larger cells + shorter text = bigger font.
// Formula: available_side / sqrt(charCount * charAspect)
// charAspect ≈ 0.65 accounts for character width vs height ratio + line-height.

function cellFontSize(cp, len) {
  const avail = cp - 10;           // subtract padding
  const byArea = avail / Math.sqrt(len * 0.65);
  return Math.max(7, Math.min(13, Math.floor(byArea)));
}

// ── Render game ───────────────────────────────────────────────────────────────

function renderGame() {
  const m = MODES.find(x => x.id === gs.mode);
  document.getElementById('mlbl').innerHTML = `${m.icon} <span style="vertical-align:middle">${m.name}</span>`;

  if (gs.tm > 0) document.getElementById('tbar').style.display = 'flex';

  document.getElementById('pchips').innerHTML = gs.players.map((p) => {
    const c = COLS[p.color];
    return `<div class="chip" style="background:${c.b};border-color:${c.m};color:${c.l}">
              ${p.name}<span class="cs">${p.score}</span>
            </div>`;
  }).join('');

  document.getElementById('turnl').innerHTML = '';

  const board     = document.getElementById('board');
  const sz        = gs.sz;
  const available = Math.min(window.innerWidth, 480) - 24; // phone-first: max 480px app width, 12px padding each side
  const gaps      = (sz - 1) * 4;
  const cp        = Math.max(44, Math.min(86, Math.floor((available - gaps) / sz)));
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
    const photoIcon = cell.photo ? `<span class="pb" style="color:var(--acc)">${BTN.camSm}</span>` : '';
    const wc        = cell.wc ? ' wc' : '';
    const fs        = cellFontSize(cp, cell.text.length);

    return `<div class="cell${cell.claimed ? ' cl' : ''}${wc}"
               style="width:${cp}px;height:${cp}px;background:${bg};border-color:${bc};color:${tc};font-size:${fs}px"
               onclick="clickCell(${i})">
              ${photoIcon}${cell.text}
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

  pci            = i;
  pendingTeamIdx = -1;

  document.getElementById('ptxt').textContent     = cell.text;
  document.getElementById('pprev').style.display  = 'none';
  document.getElementById('pprev').src            = '';
  document.getElementById('pconf').style.display  = 'none';
  document.getElementById('pshoot').style.display = 'none';
  document.getElementById('pfile').value          = '';

  if (myTeamIdx >= 0) {
    // Player is on a specific team — skip selector, go straight to photo
    document.getElementById('pins').innerHTML = '';
    selectClaimTeam(myTeamIdx);
  } else {
    // Unknown device or spectator — show team selector
    document.getElementById('pins').innerHTML =
      `<div style="margin-bottom:10px;font-size:12px;color:var(--muted);font-family:'Orbitron',monospace;letter-spacing:0.08em">WIE CLAIMT DIT?</div>` +
      `<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">` +
      gs.players.map((p, idx) => {
        const c = COLS[p.color];
        return `<button class="btn team-sel-btn" data-idx="${idx}"
                   style="background:${c.b};border:2px solid ${c.m};color:${c.l};padding:7px 16px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;letter-spacing:0"
                   onclick="selectClaimTeam(${idx})">${p.name}</button>`;
      }).join('') +
      `</div>`;
  }

  document.getElementById('pmod').classList.add('show');
}

function selectClaimTeam(idx) {
  pendingTeamIdx = idx;
  const p = gs.players[idx];
  const c = COLS[p.color];

  // Visually highlight selected team button
  document.querySelectorAll('.team-sel-btn').forEach(btn => {
    const selected = +btn.dataset.idx === idx;
    btn.style.opacity   = selected ? '1' : '0.4';
    btn.style.transform = selected ? 'scale(1.06)' : 'scale(1)';
  });

  // Show instruction + photo button
  const existing = document.getElementById('pins').querySelector('.claim-instr');
  if (existing) existing.remove();
  const instr = document.createElement('div');
  instr.className = 'claim-instr';
  instr.style.cssText = 'margin-top:10px;font-size:12px;color:var(--muted)';
  instr.textContent   = `${p.name}: maak een foto als bewijs!`;
  document.getElementById('pins').appendChild(instr);

  document.getElementById('pshoot').style.display = 'inline-block';
  document.getElementById('pshoot').innerHTML = BTN.camera + 'Foto kiezen';
}

function closeClaimModal() {
  document.getElementById('pmod').classList.remove('show');
  pci            = -1;
  pendingTeamIdx = -1;
}

document.getElementById('pfile').addEventListener('change', function () {
  if (!this.files || !this.files[0]) return;
  const reader = new FileReader();
  reader.onload = e => {
    const prev = document.getElementById('pprev');
    prev.src                                       = e.target.result;
    prev.style.display                             = 'block';
    document.getElementById('pconf').style.display = 'inline-block';
    document.getElementById('pshoot').innerHTML = BTN.camera + 'Andere foto';
  };
  reader.readAsDataURL(this.files[0]);
});

async function confirmClaim() {
  const i = pci;
  if (i < 0 || pendingTeamIdx < 0) {
    // No team selected — shake the team buttons as a hint
    document.querySelectorAll('.team-sel-btn').forEach(btn => {
      btn.style.animation = 'none';
      btn.offsetHeight; // reflow
      btn.style.animation = 'shake .35s ease';
    });
    return;
  }

  // ── Race condition guard: verify cell is still unclaimed on the server ──────
  if (gameCode) {
    const confBtn = document.getElementById('pconf');
    confBtn.textContent = '...';
    confBtn.disabled = true;
    const latest = await fbGet(gameCode);
    confBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px"><path d="M2.5 7l3.5 3.5L12 4"/></svg>Claim!';
    confBtn.disabled = false;
    if (latest?.cells?.[i]?.claimed) {
      closeClaimModal();
      return; // already taken — silently close, board will sync via SSE
    }
  }

  const cell   = gs.cells[i];
  const pi     = pendingTeamIdx;
  const pn     = pi + 1;
  const player = gs.players[pi];

  cell.claimed = pn;
  player.score++;

  const photoData = document.getElementById('pprev').src;
  if (photoData?.startsWith('data:')) {
    cell.photo = photoData;
    photos[i]  = { photo: photoData, task: cell.text, player: player.name, color: COLS[player.color].m };
  }

  closeClaimModal();

  const winLine = checkBingo(pn);
  if (winLine) {
    gs.over = true;
    winLine.forEach(x => gs.cells[x].wc = true);
    clearInterval(ti);
    renderGame();
    showWinner(pi, 'Rij voltooid!');
    await syncGameState({ winner: pi, winReason: 'Rij voltooid!' });
    return;
  }

  if (gs.cells.filter(c => !c.free && !c.claimed).length === 0) {
    gs.over = true;
    clearInterval(ti);
    renderGame();
    const max = Math.max(...gs.players.map(p => p.score));
    const ws  = gs.players.map((p, x) => ({ ...p, i: x })).filter(p => p.score === max);
    const wi  = ws.length === 1 ? ws[0].i : -1;
    const wr  = ws.length === 1 ? 'Meeste vakjes!' : 'Gelijkspel!';
    if (wi >= 0) showWinner(wi, wr); else showTie(wr);
    await syncGameState({ winner: wi, winReason: wr });
    return;
  }

  renderGame();
  await syncGameState();
}

function checkBingo(pn) {
  const sz = gs.sz;
  const c  = gs.cells;
  const ok = i => c[i].claimed === pn || c[i].free;

  for (let r = 0; r < sz; r++) {
    const row = [...Array(sz)].map((_, i) => r * sz + i);
    if (row.every(ok)) return row;
  }
  for (let col = 0; col < sz; col++) {
    const col2 = [...Array(sz)].map((_, i) => i * sz + col);
    if (col2.every(ok)) return col2;
  }
  const d1 = [...Array(sz)].map((_, i) => i * sz + i);
  if (d1.every(ok)) return d1;
  const d2 = [...Array(sz)].map((_, i) => i * sz + (sz - 1 - i));
  if (d2.every(ok)) return d2;
  return null;
}

// ── Win / tie ─────────────────────────────────────────────────────────────────

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
  document.getElementById('sov').classList.remove('show');
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
  document.getElementById('sov').classList.remove('show');
  document.getElementById('wov').classList.add('show');
}

// ── Help ──────────────────────────────────────────────────────────────────────

function toggleHelp() {
  document.getElementById('hov').classList.toggle('show');
}

// ── Scoreboard ───────────────────────────────────────────────────────────────

function toggleScoreboard() {
  const el = document.getElementById('sov');
  const opening = !el.classList.contains('show');
  if (opening) renderScoreboard();
  el.classList.toggle('show');
}

function renderScoreboard() {
  if (!gs) return;
  const sorted = [...gs.players.map((p, i) => ({ ...p, i }))]
    .sort((a, b) => b.score - a.score);

  const medals = ['🥇', '🥈', '🥉'];
  let lastScore = -1, rank = 0;

  document.getElementById('sblist').innerHTML = sorted.map((p, idx) => {
    if (p.score !== lastScore) { rank = idx + 1; lastScore = p.score; }
    const c       = COLS[p.color];
    const members = (p.members || []).join(', ');
    const medal   = rank <= 3 ? medals[rank - 1] : `${rank}`;
    return `<div class="sb-row" style="background:${c.b};border-color:${c.m}55">
              <div class="sb-rank">${medal}</div>
              <div style="flex:1;min-width:0">
                <div class="sb-name" style="color:${c.l}">${p.name}</div>
                ${members ? `<div class="sb-members">${members}</div>` : ''}
              </div>
              <div class="sb-score" style="color:${c.m}">${p.score}</div>
            </div>`;
  }).join('');
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
  stopListening();
  clearInterval(ti);
  gs     = null;
  pci    = -1;
  photos = {};
  document.getElementById('wov').classList.remove('show');
  document.getElementById('gal').style.display = 'none';
  showHome();
}

// ── Session persistence ───────────────────────────────────────────────────────

function saveSession() {
  if (!gameCode) return;
  localStorage.setItem('sbSession', JSON.stringify({ gameCode, myTeamIdx, isHost }));
}

function clearSession() {
  localStorage.removeItem('sbSession');
}

async function restoreSession() {
  const raw = localStorage.getItem('sbSession');
  if (!raw) return false;
  try {
    const saved = JSON.parse(raw);
    if (!saved?.gameCode) return false;

    const data = await fbGet(saved.gameCode);
    if (!data || data.status === 'over') { clearSession(); return false; }
    if (data.expiresAt && data.expiresAt < Date.now()) { clearSession(); return false; }

    gameCode  = saved.gameCode;
    myTeamIdx = saved.myTeamIdx ?? -1;
    isHost    = saved.isHost    ?? false;

    if (data.status === 'lobby') {
      const teams = data.teams || [];
      document.getElementById('waitCode').textContent       = gameCode;
      document.getElementById('waitSub').textContent        = isHost
        ? 'Deel deze code met andere spelers'
        : 'Wachten tot de host het spel start...';
      document.getElementById('waitStartBtn').style.display = isHost ? 'block' : 'none';
      document.getElementById('hostJoinCard').style.display = isHost ? 'block' : 'none';
      if (isHost) renderHostTeamPicker(teams);
      renderWaitPlayers(teams);
      showScreen('wait');
      fbListen(gameCode, onGameData);
      return true;
    }

    if (data.status === 'playing') {
      photos = {};
      const tm = data.tm || 0;
      gs = {
        mode:    data.mode,
        sz:      data.sz,
        cells:   data.cells.map(c => ({ ...c, photo: null })),
        players: data.teams,
        turn:    data.turn,
        over:    false,
        tm,
        ts:      tm * 60,
        tstart:  data.tstart || null,
      };
      document.getElementById('gal').style.display = 'none';
      showScreen('game');
      if (tm > 0 && gs.tstart) startTimer();
      renderGame();
      fbListen(gameCode, onGameData);
      return true;
    }
  } catch { /* fall through */ }
  clearSession();
  return false;
}

// ── Boot ──────────────────────────────────────────────────────────────────────

async function init() {
  if (LOCAL_MODE) { showHome(); return; }
  const restored = await restoreSession();
  if (!restored) showHome();
}
init();
