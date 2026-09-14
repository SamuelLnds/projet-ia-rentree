const SAVE_KEY = "kevin-clicker";
const TICK_MS = 100;
const SAVE_EVERY_MS = 5000;
const COST_GROWTH = 1.15;
const BASE_CLICK = 1;
// Fenêtre glissante sur laquelle on mesure la cadence de clic. Trop courte, le
// chiffre saute à chaque clic ; trop longue, il met du temps à retomber à zéro.
const CLICK_WINDOW_MS = 3000;
// Au-delà de cet écart entre deux clics, le combo retombe.
const COMBO_WINDOW_MS = 1200;
const COMBO_MAX = 2.5;
// Un joueur qui matraque le clic ne doit pas faire ramer la page.
const MAX_PARTICLES = 90;
const BILLS_PER_CLICK = 3;

// Les quatre projets de Kévin Niel, du travail à la main vers les revenus passifs.
// Grille recalée au cycle 2 : voir docs/contexte.md, section « Équilibrage ».
const UPGRADES = [
  {
    id: "nk",
    name: "NK Informatique",
    baseCost: 20,
    effect: "+0,5 €/clic",
    click: 0.5,
    rate: 0,
    color: "var(--vert)",
    icon: '<path d="M7 5 2 10l5 5"/><path d="M13 5l5 5-5 5"/>',
  },
  {
    id: "microlead",
    name: "Microlead",
    baseCost: 100,
    effect: "+8 €/s",
    click: 0,
    rate: 8,
    color: "var(--or)",
    icon: '<path d="M10 3 1.5 7 10 11l8.5-4L10 3Z"/><path d="M5.5 8.8V13c0 1.4 2 2.4 4.5 2.4s4.5-1 4.5-2.4V8.8"/>',
  },
  {
    id: "prospectit",
    name: "Prospect-it",
    baseCost: 900,
    effect: "+90 €/s",
    click: 0,
    rate: 90,
    color: "var(--bleu)",
    icon: '<path d="M2.5 4h15l-5.8 7v5.6l-3.4-2V11L2.5 4Z"/>',
  },
  {
    id: "skraapit",
    name: "Skraap.it",
    baseCost: 5000,
    effect: "+800 €/s",
    click: 0,
    rate: 800,
    color: "var(--violet)",
    icon: '<path d="M4 3.5h4v6.8a2 2 0 0 0 4 0V3.5h4v6.8a6 6 0 0 1-12 0V3.5Z"/><path d="M4 8.2h4M12 8.2h4"/>',
  },
  {
    // « Chat GPT 4 — Apprenez à exploiter le potentiel de l'Intelligence
    // Artificielle », le livre de Kévin Niel. Dernier palier : il met fin à la run.
    id: "livre",
    name: "Chat GPT 4",
    baseCost: 50000,
    effect: "+8 000 €/s",
    click: 0,
    rate: 8000,
    color: "var(--rose)",
    icon: '<path d="M10 6.5S8.6 4.5 3 4.5V15c5.6 0 7 2 7 2s1.4-2 7-2V4.5c-5.6 0-7 2-7 2Z"/><path d="M10 6.5V17"/>',
  },
];

// Le dernier palier de la liste met fin à la run.
const FINAL_UPGRADE = UPGRADES[UPGRADES.length - 1];

// Consommables : coût fixe, pas de coût croissant. Ils servent surtout en fin de
// run, là où un coût croissant les aurait rendus inutilisables.
const BOOSTS = [
  {
    id: "cafe",
    name: "Café serré",
    cost: 250,
    duration: 15,
    mult: 3,
    target: "click",
    color: "var(--or)",
    icon: '<path d="M4 7h10v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V7Z"/><path d="M14 8.5h1.8a2 2 0 0 1 0 4H14"/><path d="M7 4V2.5M10.5 4V2.5"/>',
  },
  {
    id: "linkedin",
    name: "Post viral",
    cost: 2000,
    duration: 20,
    mult: 3,
    target: "rate",
    color: "var(--bleu)",
    icon: '<path d="M10 2.5 12.2 7l5 .7-3.6 3.5.9 5-4.5-2.4L5.5 16.2l.9-5L2.8 7.7l5-.7L10 2.5Z"/>',
  },
  {
    id: "blackfriday",
    name: "Black Friday",
    cost: 6000,
    duration: 10,
    mult: 10,
    target: "click",
    color: "var(--rouge)",
    icon: '<path d="M11 2 4 11h5l-1 7 7-9h-5l1-7Z"/>',
  },
];

// Images specimen officielles de la BCE (série Europa), récupérées une fois et
// posées dans assets/ : le jeu continue de marcher hors ligne.
const NOTES = [5, 10, 20, 50, 100, 200];

const state = {
  money: 0,
  owned: {},
  runMs: 0,
  started: false,
  finished: false,
  best: null,
};

// Horodatage des clics récents, hors sauvegarde : c'est une mesure, pas une progression.
const recentClicks = [];
// Bonus en cours : identifiant -> millisecondes restantes. Hors sauvegarde aussi,
// ce sont des effets et non une progression.
const activeBoosts = new Map();

let combo = 0;
let lastClickAt = 0;
let particles = 0;

const els = {
  money: document.getElementById("money"),
  rate: document.getElementById("rate"),
  combo: document.getElementById("combo"),
  timer: document.getElementById("timer"),
  best: document.getElementById("best"),
  stage: document.getElementById("stage"),
  portrait: document.getElementById("portrait"),
  upgrades: document.getElementById("upgrades"),
  boosts: document.getElementById("boosts"),
  actives: document.getElementById("actives"),
  reset: document.getElementById("reset"),
  layout: document.getElementById("layout"),
  toggle: document.getElementById("toggle"),
  victory: document.getElementById("victory"),
  victoryTime: document.getElementById("victoryTime"),
  victoryText: document.getElementById("victoryText"),
  again: document.getElementById("again"),
};

const rows = new Map();
const boostRows = new Map();
const numberFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
const rateFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

// --- Règles du jeu ---

function costOf(upgrade) {
  return Math.ceil(upgrade.baseCost * COST_GROWTH ** state.owned[upgrade.id]);
}

function comboMultiplier() {
  return Math.min(1 + Math.floor(combo / 10) * 0.25, COMBO_MAX);
}

function boostMultiplier(target) {
  let mult = 1;
  for (const boost of BOOSTS) {
    if (boost.target === target && activeBoosts.has(boost.id)) mult *= boost.mult;
  }
  return mult;
}

function clickValue() {
  const base = UPGRADES.reduce((total, u) => total + u.click * state.owned[u.id], BASE_CLICK);
  return base * boostMultiplier("click") * comboMultiplier();
}

function incomePerSecond() {
  const base = UPGRADES.reduce((total, u) => total + u.rate * state.owned[u.id], 0);
  return base * boostMultiplier("rate");
}

// Ce que rapporte la cadence de clic actuelle, mesurée sur la fenêtre glissante.
// Purge au passage les clics sortis de la fenêtre : appelé à chaque image, ça suffit
// à faire redescendre le chiffre quand on arrête de cliquer.
function clickIncomePerSecond() {
  const cutoff = Date.now() - CLICK_WINDOW_MS;
  while (recentClicks.length > 0 && recentClicks[0] < cutoff) recentClicks.shift();
  return (recentClicks.length / (CLICK_WINDOW_MS / 1000)) * clickValue();
}

function buy(upgrade) {
  const cost = costOf(upgrade);
  if (state.money < cost) return;

  const premier = state.owned[upgrade.id] === 0;
  state.money -= cost;
  state.owned[upgrade.id] += 1;
  flash(rows.get(upgrade.id).root);

  if (premier && upgrade.id === FINAL_UPGRADE.id) finishRun();
  render();
}

function buyBoost(boost) {
  if (state.money < boost.cost) return;
  state.money -= boost.cost;
  // Relancer un bonus déjà actif remet son minuteur à zéro, il ne se cumule pas.
  activeBoosts.set(boost.id, boost.duration * 1000);
  flash(boostRows.get(boost.id).root);
  render();
}

// --- Chronomètre ---

function formatTime(ms) {
  const total = Math.max(0, Math.floor(ms));
  const minutes = Math.floor(total / 60000);
  const seconds = Math.floor((total % 60000) / 1000);
  const cents = Math.floor((total % 1000) / 10);
  return `${minutes}:${String(seconds).padStart(2, "0")}.${String(cents).padStart(2, "0")}`;
}

function finishRun() {
  state.finished = true;

  const record = state.best === null || state.runMs < state.best;
  if (record) state.best = state.runMs;

  els.victoryTime.textContent = formatTime(state.runMs);
  els.victoryText.textContent = record
    ? "Nouveau record. Tu as lu le livre, l'IA bosse pour toi, tu peux lâcher la souris."
    : `Le livre est à toi. Ton record reste ${formatTime(state.best)}.`;
  els.victory.hidden = false;

  for (let i = 0; i < 30; i += 1) dropNote();
  save();
}

function newRun() {
  state.money = 0;
  for (const upgrade of UPGRADES) state.owned[upgrade.id] = 0;
  state.runMs = 0;
  state.started = false;
  state.finished = false;
  activeBoosts.clear();
  recentClicks.length = 0;
  combo = 0;
  els.victory.hidden = true;
  save();
  render();
}

// --- Affichage ---

function money(amount) {
  return `${numberFormat.format(Math.floor(amount))} €`;
}

function flash(node) {
  node.classList.remove("flash");
  // Forcer un reflow, sinon retirer puis remettre la classe dans la même image
  // ne relance pas l'animation.
  void node.offsetWidth;
  node.classList.add("flash");
}

function buildShop() {
  for (const upgrade of UPGRADES) {
    const row = document.createElement("li");
    row.className = "upgrade";
    row.style.color = upgrade.color;
    row.innerHTML = `
      <svg class="u-icon" viewBox="0 0 20 20" aria-hidden="true">${upgrade.icon}</svg>
      <div>
        <div class="u-line">
          <span class="u-name">${upgrade.name}</span>
          <span class="u-count">×0</span>
        </div>
        <div class="u-line">
          <span class="u-effect">${upgrade.effect}</span>
          <span class="u-cost" style="color:${upgrade.color}"></span>
        </div>
      </div>`;
    row.addEventListener("click", () => buy(upgrade));
    els.upgrades.appendChild(row);
    rows.set(upgrade.id, {
      root: row,
      count: row.querySelector(".u-count"),
      cost: row.querySelector(".u-cost"),
    });
  }

  for (const boost of BOOSTS) {
    const row = document.createElement("li");
    row.className = "upgrade";
    row.style.color = boost.color;
    const cible = boost.target === "click" ? "clics" : "production";
    row.innerHTML = `
      <svg class="u-icon" viewBox="0 0 20 20" aria-hidden="true">${boost.icon}</svg>
      <div>
        <div class="u-line">
          <span class="u-name">${boost.name}</span>
          <span class="u-count">${boost.duration} s</span>
        </div>
        <div class="u-line">
          <span class="u-effect">×${boost.mult} ${cible}</span>
          <span class="u-cost" style="color:${boost.color}">${money(boost.cost)}</span>
        </div>
      </div>`;
    row.addEventListener("click", () => buyBoost(boost));
    els.boosts.appendChild(row);
    boostRows.set(boost.id, { root: row });
  }
}

function renderActives() {
  els.actives.textContent = "";
  for (const boost of BOOSTS) {
    const left = activeBoosts.get(boost.id);
    if (left === undefined) continue;
    const tag = document.createElement("div");
    tag.className = "active-boost";
    tag.style.color = boost.color;
    tag.textContent = `${boost.name} ×${boost.mult} · ${(left / 1000).toFixed(1)} s`;
    els.actives.appendChild(tag);
  }
}

function render() {
  els.money.textContent = money(state.money);
  els.rate.textContent = `${rateFormat.format(incomePerSecond() + clickIncomePerSecond())} €/s`;

  els.timer.textContent = formatTime(state.runMs);
  els.timer.className = `timer${state.finished ? " done" : state.started ? " running" : ""}`;
  els.best.textContent = state.best === null ? "record —" : `record ${formatTime(state.best)}`;

  if (combo >= 5) {
    const mult = comboMultiplier();
    els.combo.textContent = `combo ×${combo} · gains ×${mult.toLocaleString("fr-FR")}`;
    els.combo.classList.add("on");
    els.combo.style.color = combo >= 30 ? "var(--rouge)" : combo >= 15 ? "var(--or)" : "var(--vert)";
  } else {
    els.combo.classList.remove("on");
  }

  for (const upgrade of UPGRADES) {
    const row = rows.get(upgrade.id);
    const cost = costOf(upgrade);
    row.count.textContent = `×${state.owned[upgrade.id]}`;
    row.cost.textContent = money(cost);
    row.root.classList.toggle("locked", state.money < cost);
  }

  for (const boost of BOOSTS) {
    boostRows.get(boost.id).root.classList.toggle("locked", state.money < boost.cost);
  }

  renderActives();
}

// --- Particules ---

function addParticle(node) {
  if (particles >= MAX_PARTICLES) return;
  particles += 1;
  node.addEventListener("animationend", () => {
    node.remove();
    particles -= 1;
  });
  els.stage.appendChild(node);
}

function between(min, max) {
  return min + Math.random() * (max - min);
}

// Plus le clic vaut cher, plus la coupure qui s'envole est grosse.
function noteFor(amount) {
  let chosen = NOTES[0];
  for (const value of NOTES) if (amount >= value) chosen = value;
  return chosen;
}

function makeNote(value, className) {
  const bill = document.createElement("div");
  bill.className = `bill ${className}`;
  bill.style.backgroundImage = `url("assets/billet-${value}.jpg")`;
  return bill;
}

function showGain(x, y, amount) {
  const gain = document.createElement("span");
  gain.className = "gain";
  gain.textContent = `+${rateFormat.format(amount)} €`;
  gain.style.left = `${x}px`;
  gain.style.top = `${y}px`;
  addParticle(gain);
}

// Billets projetés en éventail depuis le curseur : la récompense immédiate du clic.
function throwNotes(x, y, amount) {
  const note = noteFor(amount);
  for (let i = 0; i < BILLS_PER_CLICK; i += 1) {
    const bill = makeNote(note, "fly");
    bill.style.left = `${x - 31}px`;
    bill.style.top = `${y - 16}px`;
    bill.style.setProperty("--dx", `${between(-90, 90)}px`);
    bill.style.setProperty("--dy", `${between(-170, -100)}px`);
    bill.style.setProperty("--rot", `${between(-60, 60)}deg`);
    addParticle(bill);
  }
}

// Décor de fond : un billet par clic, qui traverse la scène lentement.
function dropNote() {
  const { width, height } = els.stage.getBoundingClientRect();
  const bill = makeNote(NOTES[Math.floor(Math.random() * NOTES.length)], "fall");
  bill.style.left = `${between(0, Math.max(0, width - 62))}px`;
  bill.style.setProperty("--dx", `${between(-70, 70)}px`);
  bill.style.setProperty("--dy", `${height + 90}px`);
  bill.style.setProperty("--rot", `${between(-200, 200)}deg`);
  bill.style.setProperty("--dur", `${between(3, 5)}s`);
  addParticle(bill);
}

// --- Sauvegarde ---

function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function load() {
  for (const upgrade of UPGRADES) state.owned[upgrade.id] = 0;

  let saved;
  try {
    // Une sauvegarde d'une version antérieure peut ne plus correspondre : on l'ignore
    // plutôt que de laisser le jeu planter au chargement.
    saved = JSON.parse(localStorage.getItem(SAVE_KEY));
  } catch {
    return;
  }
  if (!saved) return;

  state.money = Number(saved.money) || 0;
  state.runMs = Number(saved.runMs) || 0;
  state.started = Boolean(saved.started);
  state.finished = Boolean(saved.finished);
  state.best = typeof saved.best === "number" ? saved.best : null;
  for (const upgrade of UPGRADES) {
    state.owned[upgrade.id] = Number(saved.owned?.[upgrade.id]) || 0;
  }
}

// --- Démarrage ---

els.portrait.addEventListener("click", (event) => {
  if (state.finished) return;
  if (!state.started) state.started = true;

  const now = Date.now();
  combo = now - lastClickAt < COMBO_WINDOW_MS ? combo + 1 : 1;
  lastClickAt = now;

  const gain = clickValue();
  state.money += gain;
  recentClicks.push(now);

  const stage = els.stage.getBoundingClientRect();
  const x = event.clientX - stage.left;
  const y = event.clientY - stage.top;
  showGain(x, y, gain);
  throwNotes(x, y, gain);
  dropNote();

  els.money.classList.remove("pop");
  void els.money.offsetWidth;
  els.money.classList.add("pop");

  render();
});

els.toggle.addEventListener("click", () => {
  const closed = els.layout.classList.toggle("shop-closed");
  els.toggle.setAttribute("aria-expanded", String(!closed));
  els.toggle.title = closed ? "Afficher le panneau" : "Replier le panneau";
});

els.reset.addEventListener("click", () => {
  if (confirm("Relancer une run ? La progression en cours est perdue.")) newRun();
});

els.again.addEventListener("click", newRun);
window.addEventListener("beforeunload", save);

// Sans préchargement, les premiers billets s'affichent vides le temps du
// téléchargement : ils ne vivent que 900 ms, ils seraient déjà partis.
for (const value of NOTES) new Image().src = `assets/billet-${value}.jpg`;

load();
buildShop();
if (state.finished) els.victory.hidden = false;
render();

setInterval(() => {
  state.money += (incomePerSecond() * TICK_MS) / 1000;

  // Le chronomètre ne compte que le temps joué : l'incrémenter ici plutôt que de
  // le calculer depuis un horodatage évite qu'une nuit onglet fermé ruine la run.
  if (state.started && !state.finished) state.runMs += TICK_MS;

  for (const [id, left] of activeBoosts) {
    if (left <= TICK_MS) activeBoosts.delete(id);
    else activeBoosts.set(id, left - TICK_MS);
  }

  if (combo > 0 && Date.now() - lastClickAt > COMBO_WINDOW_MS) combo = 0;

  render();
}, TICK_MS);

setInterval(save, SAVE_EVERY_MS);
