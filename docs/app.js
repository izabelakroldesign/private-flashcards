const STORAGE_KEY = "private-flashcards-v1";
const cardTypes = new Set(["definition", "understanding", "comparison", "scenario", "calculation"]);
const BUILT_IN_IMPORTS = [
  {
    migrationKey: "ipArpRoutingPdfCardsV1",
    url: "./data/ip_arp_routing_cards.json",
  },
];
const TOPIC_PREFIX = "topic:";
const STUDY_TOPICS = [
  { id: `${TOPIC_PREFIX}networks`, name: "Sieci", matches: (card) => !isLinuxCard(card) },
  { id: `${TOPIC_PREFIX}linux`, name: "Linux", matches: (card) => isLinuxCard(card) },
];
const NETWORKING_PDF_MIGRATION = "networkingPdfCardsV1";
const NETWORKING_PDF_SOURCE = "anki_networking_cards.pdf";
const NETWORKING_PDF_CARDS = [
  ["Jakie wartości może przyjmować bit?", "0 albo 1", "definition"],
  ["Ile bitów ma 1 bajt?", "8 bitów", "definition"],
  ["Co oznacza ASCII?", "American Standard Code for Information Interchange", "definition"],
  ["Jak w notatkach reprezentowany jest pojedynczy znak ASCII?", "Za pomocą 8 bitów", "definition"],
  ["Jak przesyłane są electrical signals?", "Jako impulsy elektryczne przez przewód miedziany", "understanding"],
  ["Jak przesyłane są optical signals?", "Jako impulsy światła przez medium optyczne", "understanding"],
  ["Jak przesyłane są wireless signals?", "Za pomocą fal radiowych lub mikrofal przez powietrze", "understanding"],
  ["Co to bandwidth?", "Pojemność medium określająca, ile danych może zostać przesłanych w określonym czasie", "definition"],
  ["Co to throughput?", "Rzeczywista ilość danych przesłanych i odebranych przez połączenie", "definition"],
  ["Co to latency?", "Czas potrzebny danym na przebycie drogi z jednego punktu do drugiego, uwzględniając opóźnienia", "definition"],
  ["Bandwidth vs throughput?", "Bandwidth = możliwości/pojemność medium. Throughput = rzeczywiście osiągnięty transfer", "comparison"],
  ["Co oznacza Kbps?", "Tysiące bitów na sekundę - 10^3 bps", "definition"],
  ["Co oznacza Mbps?", "Miliony bitów na sekundę - 10^6 bps", "definition"],
  ["Co oznacza Gbps?", "Miliardy bitów na sekundę - 10^9 bps", "definition"],
  ["Co oznacza Tbps?", "Biliony bitów na sekundę - 10^12 bps", "definition"],
  ["Co to host?", "Urządzenie podłączone do sieci, które bezpośrednio uczestniczy w komunikacji", "definition"],
  ["Co robi client?", "Żąda danych lub usług", "definition"],
  ["Co robi server?", "Dostarcza dane lub usługi klientowi", "definition"],
  ["Co wyróżnia P2P?", "Komputer może jednocześnie pełnić rolę klienta i serwera", "understanding"],
  ["Podaj przykłady end devices.", "Desktop, laptop, printer, IP phone, tablet", "definition"],
  ["Podaj przykłady intermediary devices.", "Wireless router, LAN switch, router, multilayer switch", "definition"],
  ["Co to ISP?", "Internet Service Provider - zapewnia połączenie między siecią domową a Internetem", "definition"],
  ["Z jakiego medium korzysta DSL?", "Z linii telefonicznej", "definition"],
  ["Z jakiego medium korzysta Cable Internet?", "Z kabla koncentrycznego używanego także przez telewizję kablową", "definition"],
  ["Co robi cable modem?", "Oddziela sygnał internetowy od innych sygnałów przesyłanych tym samym kablem", "understanding"],
  ["Co oznacza GPS?", "Global Positioning System", "definition"],
  ["Z czego korzysta GPS do określania lokalizacji?", "Z satelitów", "definition"],
  ["Co to hotspot?", "Obszar, w którym dostępne jest Wi-Fi", "definition"],
  ["Jakie są główne cechy Bluetooth?", "Low-power, short-range wireless technology", "definition"],
  ["Jakie pasmo Bluetooth wskazują notatki?", "2.4 GHz", "definition"],
  ["Co oznacza NFC?", "Near Field Communication", "definition"],
  ["Na jaką odległość działa NFC według notatek?", "Zwykle mniej niż kilka centymetrów", "definition"],
  ["Co oznacza SSID?", "Service Set Identifier", "definition"],
  ["Czym jest SSID?", "Nazwą sieci Wi-Fi odróżniającą ją od innych sieci", "definition"],
  ["Co to passphrase?", "Hasło używane do uzyskania dostępu do sieci Wi-Fi", "definition"],
  ["Co to tethering?", "Udostępnianie połączenia internetowego jednego urządzenia innemu", "definition"],
  ["Co oznacza WLAN?", "Wireless Local Area Network", "definition"],
  ["Co oznacza LAN?", "Local Area Network", "definition"],
  ["Co oznacza WAN?", "Wide Area Network", "definition"],
  ["Co to Ethernet?", "Standard transmisji danych w przewodowej sieci lokalnej", "definition"],
  ["Jakie dwie częstotliwości Wi-Fi wskazują notatki jako najczęstsze w domu?", "2.4 GHz i 5 GHz", "definition"],
  ["Czym zajmuje się Wi-Fi Alliance?", "Testuje/certyfikuje interoperacyjność urządzeń WLAN różnych producentów", "understanding"],
  ["Co oznacza AP?", "Access Point - punkt dostępowy Wi-Fi", "definition"],
  ["Co to wireless channel?", "Wybrana część pasma częstotliwości radiowych używana przez AP/router", "definition"],
  ["Ile bitów ma IPv4?", "32 bity", "definition"],
  ["Na ile oktetów dzieli się IPv4?", "4 oktety po 8 bitów", "definition"],
  ["Jakie wartości mają kolejne bity oktetu?", "128, 64, 32, 16, 8, 4, 2, 1", "calculation"],
  ["Co określa subnet mask?", "Która część adresu IP oznacza sieć, a która hosta/urządzenie", "definition"],
  ["Jaka maska odpowiada /24?", "255.255.255.0", "calculation"],
  ["Ile bitów sieci oznacza /24?", "24", "calculation"],
  ["Ile bitów hosta pozostawia /24?", "8", "calculation"],
  ["Jaka maska odpowiada /27?", "255.255.255.224", "calculation"],
  ["Ile bitów hosta pozostawia /27?", "5", "calculation"],
  ["Jaki block size daje 255.255.255.224?", "32", "calculation"],
  ["Jak obliczyć block size dla ostatniego oktetu maski?", "256 - wartość oktetu maski", "calculation"],
  ["Co jest pierwszym adresem każdego bloku?", "Network address", "definition"],
  ["Co jest ostatnim adresem każdego bloku?", "Broadcast address", "definition"],
  ["Gdzie znajdują się usable host addresses?", "Pomiędzy network address a broadcast address", "understanding"],
  ["Dla bloku 128-159 jaki jest network address?", ".128", "calculation"],
  ["Dla bloku 128-159 jaki jest broadcast address?", ".159", "calculation"],
  ["Dla bloku 128-159 jaki jest zakres hostów?", ".129-.158", "calculation"],
  ["Co to default gateway?", "Punkt wyjścia z lokalnej sieci do innych sieci; najczęściej router", "definition"],
  ["Co robi DNS server?", "Tłumaczy nazwy domen na adresy IP", "definition"],
  ["Jakie 6 cech communication protocols wymieniają notatki?", "Message format, message size, timing, encoding, encapsulation, message pattern", "definition"],
  ["Co określa message format?", "Strukturę/format wiadomości", "definition"],
  ["Co określa message size?", "Reguły dotyczące wielkości przesyłanych części danych", "definition"],
  ["Co może się stać z długą wiadomością?", "Może zostać podzielona na mniejsze części", "understanding"],
  ["Co określa timing?", "Kiedy bity są transmitowane i kiedy host może wysyłać dane", "definition"],
  ["Co to encoding?", "Zamiana bitów na sygnały odpowiednie dla danego medium", "definition"],
  ["Co to decoding?", "Zamiana odebranego sygnału z powrotem na bity", "definition"],
  ["Co to encapsulation?", "Dodawanie do wiadomości informacji, np. nagłówka z adresowaniem source i destination", "definition"],
  ["Co może określać message pattern?", "Np. konieczność otrzymania acknowledgement przed wysłaniem kolejnej wiadomości", "understanding"],
  ["Jakie informacje DHCP może przekazać urządzeniu?", "IP, informacje o sieci, default gateway i adres DNS server", "definition"],
  ["Jakie są 4 warstwy TCP/IP?", "Application, Transport, Internet/Network, Network Access", "definition"],
  ["Przykład protokołu Application w TCP/IP?", "HTTP", "definition"],
  ["Przykład protokołu Transport?", "TCP", "definition"],
  ["Przykład protokołu Internet/Network?", "IP", "definition"],
  ["Przykład technologii Network Access?", "Ethernet", "definition"],
  ["Ile warstw ma OSI?", "7", "definition"],
  ["Wymień OSI od 7 do 1.", "Application, Presentation, Session, Transport, Network, Data Link, Physical", "definition"],
  ["Która warstwa OSI odpowiada za frames?", "Layer 2 - Data Link", "definition"],
  ["Która warstwa OSI odpowiada za fizyczną transmisję bitów?", "Layer 1 - Physical", "definition"],
  ["Która warstwa OSI odpowiada za segmentowanie, transfer i ponowne składanie danych?", "Layer 4 - Transport", "definition"],
  ["Co oznacza NIC?", "Network Interface Card", "definition"],
  ["Jaki unikalny adres ma każdy NIC?", "MAC address - Media Access Control address", "definition"],
  ["W co encapsulated jest wiadomość przed wysłaniem przez Ethernet?", "W frame", "definition"],
  ["Do czego służy Preamble?", "Do synchronizacji przed ramką", "definition"],
  ["Co oznacza SFD?", "Start Frame Delimiter", "definition"],
  ["Co robi SFD?", "Oznacza początek ramki", "definition"],
  ["Co zawiera Destination MAC?", "MAC address urządzenia odbierającego", "definition"],
  ["Co zawiera Source MAC?", "MAC address urządzenia wysyłającego", "definition"],
  ["Co zawiera Data w Ethernet frame?", "Payload", "definition"],
  ["Co oznacza FCS?", "Frame Check Sequence", "definition"],
  ["Do czego służy FCS?", "Do wykrywania błędów", "definition"],
  ["Co robi switch, gdy zna destination MAC?", "Wysyła ramkę przez odpowiedni port", "scenario"],
  ["Co robi switch, gdy NIE zna destination MAC?", "Flooduje ramkę przez wszystkie porty poza portem wejściowym", "scenario"],
  ["OSI Layer 7 - Application", "Program korzysta z sieci. Prosty przykład: otwierasz stronę w przeglądarce.", "understanding"],
  ["OSI Layer 6 - Presentation", "Ustala format danych, może je szyfrować lub kompresować. Prosty przykład: tekst jest kodowany, HTTPS szyfruje dane.", "understanding"],
  ["OSI Layer 5 - Session", "Pilnuje trwania połączenia między aplikacjami. Prosty przykład: utrzymuje „rozmowę” między tobą a serwerem.", "understanding"],
  ["OSI Layer 4 - Transport", "Dzieli dane na części i pilnuje dostarczenia. Prosty przykład: TCP sprawdza, czy wszystko dotarło.", "understanding"],
  ["OSI Layer 3 - Network", "Wybiera drogę między sieciami. Prosty przykład: IP i routery kierują pakiet do właściwego miejsca.", "understanding"],
  ["OSI Layer 2 - Data Link", "Dostarcza dane w obrębie lokalnej sieci. Prosty przykład: Ethernet/Wi-Fi używa adresów MAC.", "understanding"],
  ["OSI Layer 1 - Physical", "Faktycznie przesyła bity. Prosty przykład: sygnał elektryczny, światło w światłowodzie albo fale radiowe.", "understanding"],
];

const state = {
  view: "today",
  selectedDeckId: null,
  query: "",
  queue: [],
  queueIndex: 0,
  revealed: false,
  editingCardId: null,
  message: "",
  data: loadData(),
};

function uid(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function normalizeText(value) {
  return String(value || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function fingerprint(front, back) {
  return `${normalizeText(front)}::${normalizeText(back)}`;
}

function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const data = JSON.parse(stored);
    if (migrateData(data)) localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }
  const data = {
    decks: [],
    cards: [],
    reviewLogs: [],
    settings: { dailyNewLimit: 10, dailyReviewLimit: 100, theme: "system" },
  };
  seed(data);
  migrateData(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function seed(data) {
  const deckId = uid("deck");
  data.decks.push({ id: deckId, name: "Networking Basics", createdAt: nowIso() });
  [
    ["DNS", "Translates domain names into IP addresses.", "definition"],
    ["IPv4", "32 bits divided into four 8-bit octets.", "definition"],
    ["/24", "255.255.255.0", "calculation"],
    ["/27", "255.255.255.224", "calculation"],
    ["FCS", "Frame Check Sequence, used for error detection.", "definition"],
    ["SFD", "Start Frame Delimiter, marks the start of an Ethernet frame.", "definition"],
    ["Unknown destination MAC", "A switch floods the frame out all ports except the incoming port.", "scenario"],
  ].forEach(([front, back, type]) => {
    data.cards.push(makeCard({ deckId, front, back, type }));
  });
}

function migrateData(data) {
  data.decks ||= [];
  data.cards ||= [];
  data.reviewLogs ||= [];
  data.settings ||= {};
  if (data.settings[NETWORKING_PDF_MIGRATION]) return false;
  let deck = data.decks.find((item) => item.name === "Networking Basics");
  if (!deck) {
    deck = { id: uid("deck"), name: "Networking Basics", createdAt: nowIso() };
    data.decks.push(deck);
  }
  const existing = new Set(data.cards.map((card) => card.fingerprint || fingerprint(card.front, card.back)));
  NETWORKING_PDF_CARDS.forEach(([front, back, type]) => {
    const fp = fingerprint(front, back);
    if (existing.has(fp)) return;
    data.cards.push(makeCard({ deckId: deck.id, front, back, type, source: NETWORKING_PDF_SOURCE }));
    existing.add(fp);
  });
  data.settings[NETWORKING_PDF_MIGRATION] = true;
  return true;
}

function makeCard({ deckId, front, back, type, source }) {
  return {
    id: uid("card"),
    deckId,
    front: front.trim(),
    back: back.trim(),
    type: cardTypes.has(type) ? type : undefined,
    source: source?.trim() || undefined,
    createdAt: nowIso(),
    lastReviewedAt: undefined,
    nextReviewAt: undefined,
    interval: 0,
    repetitions: 0,
    lapses: 0,
    difficulty: 2.5,
    state: "new",
    fingerprint: fingerprint(front, back),
  };
}

function validateImport(raw) {
  if (!raw || typeof raw !== "object") throw new Error("JSON must be an object.");
  if (!raw.deck || typeof raw.deck.name !== "string" || !raw.deck.name.trim()) throw new Error("Missing deck.name.");
  if (!Array.isArray(raw.cards)) throw new Error("Missing cards array.");
  return {
    deck: { name: raw.deck.name.trim() },
    cards: raw.cards.map((card, index) => {
      if (!card || typeof card !== "object") throw new Error(`Card ${index + 1} must be an object.`);
      if (typeof card.front !== "string" || !card.front.trim()) throw new Error(`Card ${index + 1} needs front.`);
      if (typeof card.back !== "string" || !card.back.trim()) throw new Error(`Card ${index + 1} needs back.`);
      return {
        front: card.front.trim(),
        back: card.back.trim(),
        type: cardTypes.has(card.type) ? card.type : undefined,
        source: typeof card.source === "string" && card.source.trim() ? card.source.trim() : undefined,
      };
    }),
  };
}

function importPayload(payload, targetDeckId) {
  let deckId = targetDeckId;
  if (!deckId) {
    const existing = state.data.decks.find((deck) => deck.name === payload.deck.name);
    deckId = existing?.id || uid("deck");
    if (!existing) state.data.decks.push({ id: deckId, name: payload.deck.name, createdAt: nowIso() });
  }

  let imported = 0;
  let duplicates = 0;
  let conflicts = 0;
  payload.cards.forEach((item) => {
    const fp = fingerprint(item.front, item.back);
    if (state.data.cards.some((card) => card.fingerprint === fp)) {
      duplicates += 1;
      return;
    }
    if (state.data.cards.some((card) => normalizeText(card.front) === normalizeText(item.front))) conflicts += 1;
    state.data.cards.push(makeCard({ ...item, deckId }));
    imported += 1;
  });
  saveData();
  return { seen: payload.cards.length, imported, duplicates, conflicts };
}

function deckStats(deckId) {
  const today = Date.now();
  const cards = cardsForTarget(deckId);
  return {
    total: cards.length,
    due: cards.filter((card) => card.state !== "new" && card.nextReviewAt && Date.parse(card.nextReviewAt) <= today).length,
    newCards: cards.filter((card) => card.state === "new").length,
    learned: cards.filter((card) => card.repetitions > 0).length,
  };
}

function todayStats() {
  const day = new Date().toISOString().slice(0, 10);
  const logs = state.data.reviewLogs.filter((log) => log.reviewedAt.startsWith(day));
  return {
    reviewed: logs.length,
    again: logs.filter((log) => log.rating === "again").length,
    hard: logs.filter((log) => log.rating === "hard").length,
    good: logs.filter((log) => log.rating === "good").length,
    easy: logs.filter((log) => log.rating === "easy").length,
  };
}

function streak() {
  const days = [...new Set(state.data.reviewLogs.map((log) => log.reviewedAt.slice(0, 10)))].sort().reverse();
  const cursor = new Date();
  let count = 0;
  for (const day of days) {
    const expected = cursor.toISOString().slice(0, 10);
    if (day !== expected) break;
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

function deckForCard(card) {
  return state.data.decks.find((deck) => deck.id === card.deckId);
}

function isLinuxCard(card) {
  const deck = deckForCard(card);
  const text = `${deck?.name || ""} ${card.source || ""} ${card.front || ""} ${card.back || ""}`;
  return /\b(linux|linuks|linuksa)\b/i.test(text);
}

function isTopicId(id) {
  return typeof id === "string" && id.startsWith(TOPIC_PREFIX);
}

function topicForId(id) {
  return STUDY_TOPICS.find((topic) => topic.id === id);
}

function cardsForTarget(targetId) {
  const topic = topicForId(targetId);
  if (topic) return state.data.cards.filter(topic.matches);
  if (targetId) return state.data.cards.filter((card) => card.deckId === targetId);
  return state.data.cards;
}

function titleForTarget(targetId) {
  const topic = topicForId(targetId);
  if (topic) return topic.name;
  if (targetId) return state.data.decks.find((deck) => deck.id === targetId)?.name || "Deck";
  return "All decks";
}

function prioritizeLinuxCards(cards, fallbackTime) {
  return [...cards].sort((a, b) => {
    const priority = Number(isLinuxCard(b)) - Number(isLinuxCard(a));
    if (priority !== 0) return priority;
    return fallbackTime(a) - fallbackTime(b);
  });
}

function buildQueue(deckId) {
  const limitNew = Number(state.data.settings.dailyNewLimit) || 10;
  const limitReview = Number(state.data.settings.dailyReviewLimit) || 100;
  const now = Date.now();
  const all = cardsForTarget(deckId);
  const due = prioritizeLinuxCards(
    all.filter((card) => card.state !== "new" && card.nextReviewAt && Date.parse(card.nextReviewAt) <= now),
    (card) => Date.parse(card.nextReviewAt)
  )
    .slice(0, limitReview);
  const fresh = prioritizeLinuxCards(
    all.filter((card) => card.state === "new"),
    (card) => Date.parse(card.createdAt)
  )
    .slice(0, limitNew);
  const queue = [];
  const max = Math.max(due.length, fresh.length);
  for (let i = 0; i < max; i += 1) {
    if (due[i]) queue.push(due[i]);
    if (i % 2 === 0 && fresh.length) {
      const next = fresh.shift();
      if (next) queue.push(next);
    }
  }
  return queue.concat(fresh);
}

function schedule(card, rating) {
  let interval = card.interval;
  let repetitions = card.repetitions;
  let lapses = card.lapses;
  let difficulty = card.difficulty || 2.5;
  let cardState = "review";

  if (rating === "again") {
    lapses += 1;
    repetitions = 0;
    interval = 0;
    difficulty = Math.max(1.3, difficulty - 0.2);
    cardState = "learning";
  } else {
    repetitions += 1;
    if (rating === "hard") {
      interval = Math.max(1, Math.ceil(Math.max(1, interval) * 1.2));
      difficulty = Math.max(1.3, difficulty - 0.1);
    }
    if (rating === "good") interval = repetitions === 1 ? 1 : repetitions === 2 ? 3 : Math.ceil(Math.max(1, interval) * difficulty);
    if (rating === "easy") {
      interval = repetitions === 1 ? 4 : Math.ceil(Math.max(1, interval) * (difficulty + 0.4));
      difficulty = Math.min(3.2, difficulty + 0.15);
    }
  }

  const reviewedAt = nowIso();
  const delay = rating === "again" ? 10 * 60 * 1000 : interval * 24 * 60 * 60 * 1000;
  return { interval, repetitions, lapses, difficulty, state: cardState, lastReviewedAt: reviewedAt, nextReviewAt: new Date(Date.now() + delay).toISOString() };
}

function rateCurrent(rating) {
  const current = state.queue[state.queueIndex];
  if (!current) return;
  const card = state.data.cards.find((item) => item.id === current.id);
  if (!card) return;
  const previousInterval = card.interval;
  Object.assign(card, schedule(card, rating));
  state.data.reviewLogs.push({ id: uid("log"), cardId: card.id, reviewedAt: card.lastReviewedAt, rating, previousInterval, newInterval: card.interval });
  state.queueIndex += 1;
  state.revealed = false;
  saveData();
  render();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function download(filename, text) {
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function exportDeck(deckId) {
  const deck = state.data.decks.find((item) => item.id === deckId);
  const cards = state.data.cards.filter((card) => card.deckId === deckId);
  return JSON.stringify({
    deck: { name: deck?.name || "Deck" },
    cards: cards.map((card) => ({
      front: card.front,
      back: card.back,
      ...(card.type ? { type: card.type } : {}),
      ...(card.source ? { source: card.source } : {}),
    })),
  }, null, 2);
}

function setView(view) {
  state.view = view;
  state.message = "";
  render();
}

function startStudy(deckId) {
  state.selectedDeckId = deckId || null;
  state.queue = buildQueue(deckId);
  state.queueIndex = 0;
  state.revealed = false;
  state.view = "study";
  render();
}

function nav() {
  return `
    <nav class="nav">
      ${["today", "decks", "cards", "settings"].map((item) => `<button class="${state.view === item ? "active" : ""}" data-view="${item}">${item[0].toUpperCase() + item.slice(1)}</button>`).join("")}
    </nav>
  `;
}

function shell(content, noNav = false) {
  return `<main class="desktop-frame"><section class="screen phone-preview">${content}${noNav ? "" : nav()}</section></main>`;
}

function todayView() {
  const stats = deckStats();
  const today = todayStats();
  return shell(`
    <header class="top">
      <div>
        <h1 class="title">Today</h1>
        <p class="subtitle">${streak()} day streak · ${today.reviewed} reviewed</p>
      </div>
    </header>
    <section class="panel today-panel stack">
      <h2 class="deck-name">All decks</h2>
      <div>
        <p class="hero-count">${stats.due} due</p>
        <p class="hero-count">${stats.newCards} new</p>
      </div>
      <p class="muted">${today.again} Again · ${today.hard} Hard · ${today.good} Good · ${today.easy} Easy</p>
      <button class="primary" data-start-all ${stats.due + stats.newCards === 0 ? "disabled" : ""}>Start review</button>
    </section>
  `);
}

function decksView() {
  const topicRows = STUDY_TOPICS.map((topic) => {
    const stats = deckStats(topic.id);
    return `<button class="row" data-topic="${topic.id}"><span class="row-title">${escapeHtml(topic.name)}</span><span class="row-meta">${stats.total} cards · ${stats.due} due · ${stats.newCards} new</span></button>`;
  }).join("");
  const rows = state.data.decks.map((deck) => {
    const stats = deckStats(deck.id);
    return `<button class="row" data-deck="${deck.id}"><span class="row-title">${escapeHtml(deck.name)}</span><span class="row-meta">${stats.total} cards · ${stats.due} due</span></button>`;
  }).join("");
  return shell(`
    <header class="top">
      <h1 class="title">Decks</h1>
      <button class="text-btn" data-import>Import JSON</button>
    </header>
    ${state.message ? `<p class="message">${escapeHtml(state.message)}</p>` : ""}
    <section class="stack">
      <div>
        <p class="subtitle">Topics</p>
        ${topicRows}
      </div>
      <div>
        <p class="subtitle">Decks</p>
        ${rows || `<div class="empty">No decks yet. Import JSON to start.</div>`}
      </div>
    </section>
  `);
}

function deckDetailView(deckId) {
  const topic = topicForId(deckId);
  if (topic) {
    const stats = deckStats(deckId);
    return shell(`
      <header class="top">
        <button class="text-btn" data-back-decks>Back</button>
      </header>
      <section class="stack">
        <h1 class="title">${escapeHtml(topic.name)}</h1>
        <div class="panel stack">
          <p class="hero-count">${stats.total} cards</p>
          <p class="hero-count">${stats.due} due · ${stats.newCards} new</p>
          <p class="muted">${stats.learned} learned</p>
        </div>
        <button class="primary" data-start-deck="${deckId}" ${stats.due + stats.newCards === 0 ? "disabled" : ""}>Start review</button>
      </section>
    `);
  }
  const deck = state.data.decks.find((item) => item.id === deckId);
  if (!deck) return decksView();
  const stats = deckStats(deckId);
  return shell(`
    <header class="top">
      <button class="text-btn" data-back-decks>Back</button>
      <button class="text-btn" data-export-deck="${deckId}">Export</button>
    </header>
    <section class="stack">
      <h1 class="title">${escapeHtml(deck.name)}</h1>
      <div class="panel stack">
        <p class="hero-count">${stats.total} cards</p>
        <p class="hero-count">${stats.due} due · ${stats.newCards} new</p>
        <p class="muted">${stats.learned} learned</p>
      </div>
      <button class="primary" data-start-deck="${deckId}">Start review</button>
      <label class="field"><span class="label">Deck name</span><input class="input" id="deck-name" value="${escapeHtml(deck.name)}" /></label>
      <button class="secondary" data-save-deck="${deckId}">Save name</button>
      <button class="secondary" data-import-deck="${deckId}">Import JSON into deck</button>
      <button class="danger" data-delete-deck="${deckId}">Delete deck</button>
    </section>
  `);
}

function studyView() {
  const current = state.queue[state.queueIndex];
  if (!current) {
    return shell(`
      <section class="stack" style="min-height: 86dvh; align-content: center;">
        <h1 class="title" style="text-align:center;">Review complete</h1>
        <p class="muted" style="text-align:center;">No more due or new cards in this queue.</p>
        <button class="primary" data-view="today">Back to Today</button>
      </section>
    `, true);
  }
  const longText = `${current.front}${current.back}`.length > 180;
  return shell(`
    <section class="study-screen">
      <header class="top">
        <button class="text-btn" data-view="today">Close</button>
        <p class="subtitle">${state.queueIndex + 1} / ${state.queue.length}</p>
      </header>
      <article class="study-card ${longText ? "long-text" : ""}">
        <div class="study-scroll">
          <p class="study-front">${escapeHtml(current.front)}</p>
          ${state.revealed ? `<p class="study-back">${escapeHtml(current.back)}</p>` : ""}
        </div>
      </article>
      ${state.revealed ? `
        <div class="review-row">
          <button data-rate="again">Again</button>
          <button data-rate="hard">Hard</button>
          <button data-rate="good">Good</button>
          <button data-rate="easy">Easy</button>
        </div>
      ` : `<button class="primary" data-reveal>Show answer</button>`}
    </section>
  `, true);
}

function cardsView() {
  const decks = state.data.decks;
  const cards = state.data.cards.filter((card) => {
    const topic = topicForId(state.selectedDeckId);
    const matchesDeck = topic ? topic.matches(card) : !state.selectedDeckId || card.deckId === state.selectedDeckId;
    const q = normalizeText(state.query);
    const matchesQuery = !q || normalizeText(`${card.front} ${card.back} ${card.source || ""}`).includes(q);
    return matchesDeck && matchesQuery;
  });
  return shell(`
    <header class="top">
      <h1 class="title">Cards</h1>
      <button class="text-btn" data-new-card>Add</button>
    </header>
    <section class="stack">
      <input class="input" id="search" value="${escapeHtml(state.query)}" placeholder="Search" />
      <div class="chips">
        <button class="chip ${!state.selectedDeckId ? "active" : ""}" data-filter-deck="">All</button>
        ${STUDY_TOPICS.map((topic) => `<button class="chip ${state.selectedDeckId === topic.id ? "active" : ""}" data-filter-deck="${topic.id}">${escapeHtml(topic.name)}</button>`).join("")}
        ${decks.map((deck) => `<button class="chip ${state.selectedDeckId === deck.id ? "active" : ""}" data-filter-deck="${deck.id}">${escapeHtml(deck.name)}</button>`).join("")}
      </div>
      <div>
        ${cards.map((card) => `<button class="row" data-edit-card="${card.id}"><span class="row-title">${escapeHtml(card.front)}</span><span class="row-meta">${escapeHtml(card.back)}</span><span class="row-meta">${escapeHtml(card.source || (card.nextReviewAt ? new Date(card.nextReviewAt).toLocaleDateString() : "new"))}</span></button>`).join("") || `<div class="empty">No matching cards.</div>`}
      </div>
    </section>
  `);
}

function cardEditorView(cardId) {
  const card = cardId ? state.data.cards.find((item) => item.id === cardId) : null;
  const deckOptions = state.data.decks.map((deck) => `<option value="${deck.id}" ${card?.deckId === deck.id || (!card && state.selectedDeckId === deck.id) ? "selected" : ""}>${escapeHtml(deck.name)}</option>`).join("");
  return shell(`
    <header class="top">
      <button class="text-btn" data-view="cards">Back</button>
      ${card ? `<button class="danger" data-delete-card="${card.id}">Delete</button>` : ""}
    </header>
    <section class="stack">
      <h1 class="title">${card ? "Edit card" : "Add card"}</h1>
      <label class="field"><span class="label">Deck</span><select class="select" id="card-deck">${deckOptions}</select></label>
      <label class="field"><span class="label">Front</span><textarea class="textarea" id="card-front">${escapeHtml(card?.front || "")}</textarea></label>
      <label class="field"><span class="label">Back</span><textarea class="textarea" id="card-back">${escapeHtml(card?.back || "")}</textarea></label>
      <label class="field"><span class="label">Source</span><input class="input" id="card-source" value="${escapeHtml(card?.source || "")}" /></label>
      ${card?.nextReviewAt ? `<p class="muted">Next review: ${new Date(card.nextReviewAt).toLocaleString()}</p>` : ""}
      <button class="primary" data-save-card="${card?.id || ""}">Save card</button>
    </section>
  `);
}

function settingsView() {
  return shell(`
    <header class="top"><h1 class="title">Settings</h1></header>
    <section class="stack">
      <label class="field"><span class="label">Daily new-card limit</span><input class="input" id="daily-new" type="number" min="0" value="${state.data.settings.dailyNewLimit}" /></label>
      <label class="field"><span class="label">Daily review limit</span><input class="input" id="daily-review" type="number" min="1" value="${state.data.settings.dailyReviewLimit}" /></label>
      <button class="primary" data-save-settings>Save settings</button>
      <button class="secondary" data-export-all>Export backup JSON</button>
      <button class="danger" data-reset>Reset local data</button>
      <p class="message">Data is stored locally in this browser. Export backups before clearing Safari/site data.</p>
    </section>
  `);
}

function render() {
  const app = document.querySelector("#app");
  if (state.view === "today") app.innerHTML = todayView();
  if (state.view === "decks") app.innerHTML = state.selectedDeckId ? deckDetailView(state.selectedDeckId) : decksView();
  if (state.view === "study") app.innerHTML = studyView();
  if (state.view === "cards") app.innerHTML = state.editingCardId !== null ? cardEditorView(state.editingCardId) : cardsView();
  if (state.view === "settings") app.innerHTML = settingsView();
}

document.addEventListener("click", async (event) => {
  const target = event.target.closest("button");
  if (!target) return;
  if (target.dataset.view) {
    state.editingCardId = null;
    setView(target.dataset.view);
  }
  if (target.dataset.startAll !== undefined) startStudy(null);
  if (target.dataset.startDeck) startStudy(target.dataset.startDeck);
  if (target.dataset.deck) {
    state.selectedDeckId = target.dataset.deck;
    state.view = "decks";
    render();
  }
  if (target.dataset.topic) {
    state.selectedDeckId = target.dataset.topic;
    state.view = "decks";
    render();
  }
  if (target.dataset.backDecks !== undefined) {
    state.selectedDeckId = null;
    render();
  }
  if (target.dataset.reveal !== undefined) {
    state.revealed = true;
    render();
  }
  if (target.dataset.rate) rateCurrent(target.dataset.rate);
  if (target.dataset.import !== undefined) openImport();
  if (target.dataset.importDeck) openImport(target.dataset.importDeck);
  if (target.dataset.exportDeck) download("deck_cards.json", exportDeck(target.dataset.exportDeck));
  if (target.dataset.saveDeck) {
    const deck = state.data.decks.find((item) => item.id === target.dataset.saveDeck);
    const name = document.querySelector("#deck-name").value.trim();
    if (deck && name) deck.name = name;
    saveData();
    render();
  }
  if (target.dataset.deleteDeck && confirm("Delete this deck and its cards?")) {
    state.data.cards = state.data.cards.filter((card) => card.deckId !== target.dataset.deleteDeck);
    state.data.decks = state.data.decks.filter((deck) => deck.id !== target.dataset.deleteDeck);
    state.selectedDeckId = null;
    saveData();
    render();
  }
  if (target.dataset.filterDeck !== undefined) {
    state.selectedDeckId = target.dataset.filterDeck || null;
    render();
  }
  if (target.dataset.newCard !== undefined) {
    state.editingCardId = "";
    render();
  }
  if (target.dataset.editCard) {
    state.editingCardId = target.dataset.editCard;
    render();
  }
  if (target.dataset.saveCard !== undefined) saveCardFromForm(target.dataset.saveCard || null);
  if (target.dataset.deleteCard && confirm("Delete this card?")) {
    state.data.cards = state.data.cards.filter((card) => card.id !== target.dataset.deleteCard);
    state.editingCardId = null;
    saveData();
    render();
  }
  if (target.dataset.saveSettings !== undefined) {
    state.data.settings.dailyNewLimit = Math.max(0, Number(document.querySelector("#daily-new").value) || 0);
    state.data.settings.dailyReviewLimit = Math.max(1, Number(document.querySelector("#daily-review").value) || 1);
    saveData();
    state.message = "Settings saved.";
    render();
  }
  if (target.dataset.exportAll !== undefined) download("flashcard_backup.json", JSON.stringify(state.data, null, 2));
  if (target.dataset.reset !== undefined && confirm("Reset all local data?")) {
    localStorage.removeItem(STORAGE_KEY);
    state.data = loadData();
    state.selectedDeckId = null;
    state.editingCardId = null;
    render();
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "search") {
    state.query = event.target.value;
    render();
  }
});

function saveCardFromForm(cardId) {
  const deckId = document.querySelector("#card-deck").value;
  const front = document.querySelector("#card-front").value.trim();
  const back = document.querySelector("#card-back").value.trim();
  const source = document.querySelector("#card-source").value.trim();
  if (!deckId || !front || !back) {
    alert("Deck, front, and back are required.");
    return;
  }
  const fp = fingerprint(front, back);
  if (cardId) {
    const card = state.data.cards.find((item) => item.id === cardId);
    Object.assign(card, { deckId, front, back, source: source || undefined, fingerprint: fp });
  } else {
    if (state.data.cards.some((card) => card.fingerprint === fp)) {
      alert("Exact duplicate card.");
      return;
    }
    state.data.cards.push(makeCard({ deckId, front, back, source }));
  }
  state.editingCardId = null;
  saveData();
  render();
}

function openImport(deckId) {
  const input = document.querySelector("#json-file");
  input.onchange = async () => {
    const file = input.files[0];
    input.value = "";
    if (!file) return;
    try {
      const payload = validateImport(JSON.parse(await file.text()));
      const result = importPayload(payload, deckId);
      state.message = `${result.imported} imported\n${result.duplicates} duplicates skipped\n${result.conflicts} possible conflicts`;
      state.view = "decks";
      state.selectedDeckId = deckId || null;
      render();
    } catch (error) {
      alert(error.message || "Import failed.");
    }
  };
  input.click();
}

render();
applyBuiltInImports();

async function applyBuiltInImports() {
  let changed = false;
  for (const item of BUILT_IN_IMPORTS) {
    if (state.data.settings[item.migrationKey]) continue;
    try {
      const response = await fetch(item.url, { cache: "no-store" });
      if (!response.ok) throw new Error(`Could not load ${item.url}`);
      importPayload(validateImport(await response.json()));
      state.data.settings[item.migrationKey] = true;
      changed = true;
    } catch (error) {
      console.warn(error);
    }
  }
  if (changed) {
    saveData();
    render();
  }
}
