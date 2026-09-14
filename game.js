const SAVE_KEY = "kevin-clicker";
const TICK_MS = 100;
const SAVE_EVERY_MS = 5000;
const COST_GROWTH = 1.15;
const BASE_CLICK = 1;
// Fenêtre glissante sur laquelle on mesure la cadence de clic. Trop courte, le
// chiffre saute à chaque clic ; trop longue, il met du temps à retomber à zéro.
const CLICK_WINDOW_MS = 3000;
// Un joueur qui matraque le clic ne doit pas faire ramer la page.
const MAX_PARTICLES = 60;
const BILLS_PER_CLICK = 3;

// Les quatre projets de Kévin Niel, du travail à la main vers les revenus passifs.
// Grille recalée après le premier test : voir docs/contexte.md, section « Équilibrage ».
const UPGRADES = [
  {
    id: "nk",
    name: "NK Informatique",
    baseCost: 20,
    effect: "+0,5 €/clic",
    click: 0.5,
    rate: 0,
    icon: '<path d="M7 5 2 10l5 5"/><path d="M13 5l5 5-5 5"/>',
  },
  {
    id: "microlead",
    name: "Microlead",
    baseCost: 100,
    effect: "+8 €/s",
    click: 0,
    rate: 8,
    icon: '<path d="M10 3 1.5 7 10 11l8.5-4L10 3Z"/><path d="M5.5 8.8V13c0 1.4 2 2.4 4.5 2.4s4.5-1 4.5-2.4V8.8"/>',
  },
  {
    id: "prospectit",
    name: "Prospect-it",
    baseCost: 900,
    effect: "+90 €/s",
    click: 0,
    rate: 90,
    icon: '<path d="M2.5 4h15l-5.8 7v5.6l-3.4-2V11L2.5 4Z"/>',
  },
  {
    id: "skraapit",
    name: "Skraap.it",
    baseCost: 5000,
    effect: "+800 €/s",
    click: 0,
    rate: 800,
    icon: '<path d="M4 3.5h4v6.8a2 2 0 0 0 4 0V3.5h4v6.8a6 6 0 0 1-12 0V3.5Z"/><path d="M4 8.2h4M12 8.2h4"/>',
  },
];

const state = { money: 0, owned: {} };

// Horodatage des clics récents, hors sauvegarde : c'est une mesure, pas une progression.
const recentClicks = [];

const els = {
  money: document.getElementById("money"),
  rate: document.getElementById("rate"),
  stage: document.getElementById("stage"),
  portrait: document.getElementById("portrait"),
  upgrades: document.getElementById("upgrades"),
  reset: document.getElementById("reset"),
  layout: document.getElementById("layout"),
  toggle: document.getElementById("toggle"),
};

const rows = new Map();
const numberFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
const rateFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

// --- Règles du jeu ---

function costOf(upgrade) {
  return Math.ceil(upgrade.baseCost * COST_GROWTH ** state.owned[upgrade.id]);
}

function clickValue() {
  return UPGRADES.reduce((total, u) => total + u.click * state.owned[u.id], BASE_CLICK);
}

function incomePerSecond() {
  return UPGRADES.reduce((total, u) => total + u.rate * state.owned[u.id], 0);
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

  state.money -= cost;
  state.owned[upgrade.id] += 1;
  render();
}

// --- Affichage ---

function money(amount) {
  return `${numberFormat.format(Math.floor(amount))} €`;
}

function buildShop() {
  for (const upgrade of UPGRADES) {
    const row = document.createElement("li");
    row.className = "upgrade";
    row.innerHTML = `
      <svg class="u-icon" viewBox="0 0 20 20" aria-hidden="true">${upgrade.icon}</svg>
      <div>
        <div class="u-line">
          <span class="u-name">${upgrade.name}</span>
          <span class="u-count">×0</span>
        </div>
        <div class="u-line">
          <span class="u-effect">${upgrade.effect}</span>
          <span class="u-cost"></span>
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
}

function render() {
  els.money.textContent = money(state.money);
  els.rate.textContent = `${rateFormat.format(incomePerSecond() + clickIncomePerSecond())} €/s`;

  for (const upgrade of UPGRADES) {
    const row = rows.get(upgrade.id);
    const cost = costOf(upgrade);
    row.count.textContent = `×${state.owned[upgrade.id]}`;
    row.cost.textContent = money(cost);
    row.root.classList.toggle("locked", state.money < cost);
  }
}

// --- Particules ---

let particles = 0;

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

function showGain(x, y, amount) {
  const gain = document.createElement("span");
  gain.className = "gain";
  gain.textContent = `+${rateFormat.format(amount)} €`;
  gain.style.left = `${x}px`;
  gain.style.top = `${y}px`;
  addParticle(gain);
}

// Billets projetés en éventail depuis le curseur : la récompense immédiate du clic.
function showBills(x, y) {
  for (let i = 0; i < BILLS_PER_CLICK; i += 1) {
    const bill = document.createElement("div");
    bill.className = "bill";
    bill.textContent = "€";
    bill.style.left = `${x}px`;
    bill.style.top = `${y}px`;
    bill.style.setProperty("--dx", `${between(-70, 70)}px`);
    bill.style.setProperty("--dy", `${between(-150, -90)}px`);
    bill.style.setProperty("--rot", `${between(-50, 50)}deg`);
    addParticle(bill);
  }
}

// Décor de fond : une pièce par clic, qui traverse la scène lentement.
function dropCoin() {
  const { width, height } = els.stage.getBoundingClientRect();
  const coin = document.createElement("div");
  coin.className = "coin";
  coin.textContent = "€";
  coin.style.left = `${between(0, width - 22)}px`;
  coin.style.setProperty("--dx", `${between(-60, 60)}px`);
  coin.style.setProperty("--dy", `${height + 80}px`);
  coin.style.setProperty("--rot", `${between(-180, 180)}deg`);
  coin.style.setProperty("--dur", `${between(3, 5)}s`);
  addParticle(coin);
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
  for (const upgrade of UPGRADES) {
    state.owned[upgrade.id] = Number(saved.owned?.[upgrade.id]) || 0;
  }
}

function reset() {
  if (!confirm("Effacer la partie et tout recommencer ?")) return;
  localStorage.removeItem(SAVE_KEY);
  state.money = 0;
  for (const upgrade of UPGRADES) state.owned[upgrade.id] = 0;
  render();
}

// --- Démarrage ---

els.portrait.addEventListener("click", (event) => {
  const gain = clickValue();
  state.money += gain;
  recentClicks.push(Date.now());

  const stage = els.stage.getBoundingClientRect();
  const x = event.clientX - stage.left;
  const y = event.clientY - stage.top;
  showGain(x, y, gain);
  showBills(x, y);
  dropCoin();

  render();
});

els.toggle.addEventListener("click", () => {
  const closed = els.layout.classList.toggle("shop-closed");
  els.toggle.setAttribute("aria-expanded", String(!closed));
  els.toggle.title = closed ? "Afficher le panneau" : "Replier le panneau";
});

els.reset.addEventListener("click", reset);
window.addEventListener("beforeunload", save);

load();
buildShop();
render();

setInterval(() => {
  state.money += (incomePerSecond() * TICK_MS) / 1000;
  render();
}, TICK_MS);

setInterval(save, SAVE_EVERY_MS);
