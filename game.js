const SAVE_KEY = "kevin-clicker";
const TICK_MS = 100;
const SAVE_EVERY_MS = 5000;
const COST_GROWTH = 1.15;
const BASE_CLICK = 1;
// Fenêtre glissante sur laquelle on mesure la cadence de clic. Trop courte, le
// chiffre saute à chaque clic ; trop longue, il met du temps à retomber à zéro.
const CLICK_WINDOW_MS = 3000;

// Les quatre projets de Kévin Niel, du travail à la main vers les revenus passifs.
// Coûts repris de la courbe de Cookie Clicker : elle est éprouvée sur les premières minutes.
const UPGRADES = [
  { id: "nk", name: "NK Informatique", baseCost: 15, effect: "+1 €/clic", click: 1, rate: 0 },
  { id: "microlead", name: "Microlead", baseCost: 100, effect: "+1 €/s", click: 0, rate: 1 },
  { id: "prospectit", name: "Prospect-it", baseCost: 1100, effect: "+8 €/s", click: 0, rate: 8 },
  { id: "skraapit", name: "Skraap.it", baseCost: 12000, effect: "+47 €/s", click: 0, rate: 47 },
];

const state = { money: 0, owned: {} };

// Horodatage des clics récents, hors sauvegarde : c'est une mesure, pas une progression.
const recentClicks = [];

const els = {
  money: document.getElementById("money"),
  rate: document.getElementById("rate"),
  stage: document.getElementById("stage"),
  kevin: document.getElementById("kevin"),
  upgrades: document.getElementById("upgrades"),
  reset: document.getElementById("reset"),
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
      <div class="u-line">
        <span class="u-name">${upgrade.name}</span>
        <span class="u-count">×0</span>
      </div>
      <div class="u-line">
        <span class="u-effect">${upgrade.effect}</span>
        <span class="u-cost"></span>
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

function showGain(event, amount) {
  const stage = els.stage.getBoundingClientRect();
  const gain = document.createElement("span");
  gain.className = "gain";
  gain.textContent = `+${money(amount)}`;
  gain.style.left = `${event.clientX - stage.left}px`;
  gain.style.top = `${event.clientY - stage.top}px`;
  gain.addEventListener("animationend", () => gain.remove());
  els.stage.appendChild(gain);
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

els.kevin.addEventListener("click", (event) => {
  const gain = clickValue();
  state.money += gain;
  recentClicks.push(Date.now());
  showGain(event, gain);
  render();
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
