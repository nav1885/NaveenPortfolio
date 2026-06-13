/* =========================================================
   Naveen H — Portfolio  ·  tab router + project data
   ========================================================= */

const CAP_MODE = location.search.includes("cap");
if (CAP_MODE) document.documentElement.classList.add("cap");

// ---- Project data (ordered by commit count, descending) ----
const PROJECTS = [
  {
    name: "VoxRider", commits: 116, feature: true,
    tagline: "Hear the traffic behind you.",
    desc: "Connects to a Garmin Varia RTL515 bike radar over Bluetooth and speaks traffic alerts straight into your earbuds — “2 vehicles, high speed”, “Clear”. Hands-free, eyes-free situational awareness for road cyclists.",
    badges: [
      { type: "live", label: "Live on App Store" },
      { type: "android", label: "Android (soon)" },
      { type: "ios", label: "React Native" }
    ],
    shots: [
      "assets/projects/voxrider/03-main.png",
      "assets/projects/voxrider/04-alert.png",
      "assets/projects/voxrider/01-pair-step1.png",
      "assets/projects/voxrider/05-settings.png"
    ],
    repo: "https://github.com/nav1885/VoxRider",
    store: "https://apps.apple.com/app/voxrider/id6771203798"
  },
  {
    name: "Veloscape", commits: 53, feature: true,
    tagline: "Trail whisperer.",
    desc: "An AI riding companion for cyclists — pick a ride mode, get a live map debrief, and break down your performance with segment-by-segment analysis. Built for road and mountain riders alike.",
    badges: [
      { type: "ios", label: "iOS" },
      { type: "android", label: "Android" },
      { type: "ios", label: "React Native" }
    ],
    shots: [
      "assets/projects/veloscape/01-home.png",
      "assets/projects/veloscape/02-ride.png",
      "assets/projects/veloscape/03-segment.png"
    ],
    repo: "https://github.com/nav1885/Veloscape"
  },
  {
    name: "MicroMoment", commits: 36, glyph: "5m",
    tagline: "Five minutes a day.",
    desc: "A focused habit tracker built on one idea: small, daily, done. A hard cap of 5 active habits, 1–5 minutes each, one daily check-in. Fully local-first — SQLite on device, no account, no sync.",
    badges: [
      { type: "ios", label: "iOS" },
      { type: "android", label: "Android" },
      { type: "ai", label: "Expo · SQLite" }
    ],
    repo: "https://github.com/nav1885/MicroMoment"
  },
  {
    name: "PaxtonAgent", commits: 1, glyph: "⌘",
    tagline: "A personal agent for the mundane.",
    desc: "A customizable multi-agent framework powered by local LLMs via Ollama and orchestrated with LangGraph — a private, run-on-your-machine playground for agentic task automation.",
    badges: [
      { type: "ai", label: "Multi-agent · LangGraph" },
      { type: "web", label: "Python" },
      { type: "ai", label: "Local LLM · Ollama" }
    ],
    repo: "https://github.com/nav1885/PaxtonAgent"
  },
  {
    name: "DeFi Yield Farm", commits: 2, glyph: "◈",
    tagline: "Stake. Earn. On-chain.",
    desc: "A decentralized yield-farming dApp on Ethereum — stake a stablecoin into a smart contract and earn reward tokens over time. Solidity contracts with a React/Web3 front end.",
    badges: [
      { type: "chain", label: "Blockchain · Solidity" },
      { type: "web", label: "Web3 · React" },
      { type: "chain", label: "Ethereum" }
    ],
    repo: "https://github.com/nav1885/defi_tutorial"
  }
];

function badgeHTML(b) {
  return `<span class="badge badge--${b.type}"><span class="badge__dot"></span>${b.label}</span>`;
}
function cardHTML(p) {
  const visual = p.shots
    ? `<div class="card__shots">${p.shots.map(s => `<img src="${s}" alt="${p.name} screenshot" loading="lazy">`).join("")}</div>`
    : `<div class="card__art"><span class="card__art-glyph">${p.glyph || p.name[0]}</span></div>`;
  const store = p.store
    ? `<a href="${p.store}" target="_blank" rel="noopener" class="card__link card__link--store">App Store ↗</a>` : "";
  return `
    <article class="card ${p.feature ? "is-feature" : ""} reveal">
      ${visual}
      <div class="card__body">
        <div class="card__top">
          <h3 class="card__name">${p.name}</h3>
          <span class="card__commits"><b>${p.commits}</b> commits</span>
        </div>
        <p class="card__tagline">${p.tagline}</p>
        <p class="card__desc">${p.desc}</p>
        <div class="card__badges">${p.badges.map(badgeHTML).join("")}</div>
        <div class="card__links">
          <a href="${p.repo}" target="_blank" rel="noopener" class="card__link card__link--repo">View repo ↗</a>
          ${store}
        </div>
      </div>
    </article>`;
}
const grid = document.getElementById("projGrid");
if (grid) grid.innerHTML = PROJECTS.map(cardHTML).join("");

// ---- Stat counter ----
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  if (CAP_MODE) { el.textContent = target + suffix; return; }
  const dur = 1300, start = performance.now();
  el.textContent = "0" + suffix;
  function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (t < 1) requestAnimationFrame(tick); else el.textContent = target + suffix;
  }
  requestAnimationFrame(tick);
}

// ---- Reveal a panel's elements ----
function revealPanel(panel) {
  const items = panel.querySelectorAll(".reveal");
  if (CAP_MODE) { items.forEach(el => el.classList.add("in")); return; }
  items.forEach(el => el.classList.remove("in"));
  // force reflow so the transition replays each time the tab opens
  void panel.offsetWidth;
  requestAnimationFrame(() => items.forEach(el => el.classList.add("in")));
}

// ---- Tab router ----
const TABS = ["home", "resume", "projects", "strava", "contact"];
const tabLinks = document.querySelectorAll(".tab-link");

function setTab(name, push = true) {
  if (!TABS.includes(name)) name = "home";
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("is-active"));
  tabLinks.forEach(t => t.classList.toggle("is-active", t.dataset.tab === name));
  const panel = document.getElementById("panel-" + name);
  panel.classList.add("is-active");
  window.scrollTo(0, 0);
  revealPanel(panel);
  if (name === "home") panel.querySelectorAll(".stat__num[data-count]").forEach(animateCount);
  if (push && location.hash.slice(1) !== name) history.replaceState(null, "", name === "home" ? "#" : "#" + name);
  document.title = name === "home"
    ? "Naveen H — Engineering Manager"
    : name[0].toUpperCase() + name.slice(1) + " · Naveen H";
}

// any element with data-tab switches tabs
document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-tab]");
  if (trigger) { e.preventDefault(); setTab(trigger.dataset.tab); }
});
window.addEventListener("hashchange", () => setTab(location.hash.slice(1) || "home", false));

// ---- Init ----
setTab(location.hash.slice(1) || "home", false);
document.getElementById("year").textContent = new Date().getFullYear();
