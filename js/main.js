/* =========================================================
   Naveen H — profile  ·  tab router + project data
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
    name: "TickerLite", meta: "Live · iOS + Android",
    tagline: "Your stocks, on alert.",
    desc: "A lightweight stock-watcher — search tickers, follow live quotes and charts, and set price alerts that ping you the moment a stock crosses your target. Backed by a real-time market-data service running on its own cloud backend.",
    shots: [
      "assets/projects/tickerlite/01-home.png",
      "assets/projects/tickerlite/02-detail.png",
      "assets/projects/tickerlite/03-alert.png"
    ],
    badges: [
      { type: "live", label: "Live on App Store" },
      { type: "android", label: "Android" },
      { type: "ios", label: "React Native · Expo" }
    ],
    store: "https://apps.apple.com/app/id6775094738"
  },
  {
    name: "Kestrel", meta: "Live · Connect IQ Store",
    tagline: "Your whole day, one glance.",
    desc: "A premium ($2.99) watch face for Garmin AMOLED watches, live on the Connect IQ Store — centered stacked time surrounded by six customizable data slots (heart rate, body battery, stress, VO2 max, and more) and seven accent themes, configured right on the wrist with the native fēnix 8 editor. Engineered always-on-first, with per-device graceful degradation and a burn-in-safe AOD mode.",
    shots: [
      "assets/projects/kestrel/max.jpg",
      "assets/projects/kestrel/lite.jpg",
      "assets/projects/kestrel/aod.jpg"
    ],
    badges: [
      { type: "live", label: "Live on Connect IQ" },
      { type: "ai", label: "Connect IQ · Monkey C" },
      { type: "web", label: "AMOLED always-on" }
    ],
    store: "https://apps.garmin.com/apps/6c9b61ac-04e9-48d9-8ec4-f3a563817ce8",
    storeLabel: "Connect IQ Store ↗"
  },
  {
    name: "RepSense", meta: "In development · Garmin", glyph: "×8",
    tagline: "Reps, counted honestly.",
    desc: "An on-watch strength-training tracker for Garmin. It auto-counts reps from the wrist accelerometer, shows a per-set confidence dot instead of pretending when a count can't be trusted, and makes corrections a two-second fix. One press to start lifting — sets, rest timing, and workout recording are automatic.",
    badges: [
      { type: "ai", label: "Connect IQ · Monkey C" },
      { type: "web", label: "Signal processing" }
    ]
  },
  {
    name: "Gunner Face", meta: "Personal build · Garmin",
    tagline: "Red, gold, and glory.",
    desc: "A just-for-the-love-of-it Garmin AMOLED watch face — an unofficial matchday tribute for Arsenal fans in red, gold, and brass. A bold Oswald clock anchors the face, with a live heart rate · steps · calories row, an Emirates-inspired skyline backdrop, and a burn-in-safe always-on mode. A personal fan project, not a store release.",
    shots: [
      "assets/projects/gunnerface/cover.jpg",
      "assets/projects/gunnerface/face.jpg"
    ],
    badges: [
      { type: "ai", label: "Connect IQ · Monkey C" },
      { type: "web", label: "AMOLED always-on" }
    ]
  },
  {
    name: "MicroMoment", commits: 36,
    tagline: "Five minutes a day.",
    desc: "A focused habit tracker built on one idea: small, daily, done. A hard cap of 5 active habits, 1–5 minutes each, one daily check-in. Fully local-first — SQLite on device, no account, no sync.",
    shots: [
      "assets/projects/micromoment/01-home.png",
      "assets/projects/micromoment/02-habit.png"
    ],
    badges: [
      { type: "ios", label: "iOS" },
      { type: "android", label: "Android" },
      { type: "ai", label: "Expo · SQLite" }
    ],
    repo: "https://github.com/nav1885/MicroMoment"
  }
];

function badgeHTML(b) {
  return `<span class="badge badge--${b.type}"><span class="badge__dot"></span>${b.label}</span>`;
}
function cardHTML(p) {
  let visual;
  if (p.shots) {
    visual = `<div class="card__shots">${p.shots.map(s => `<img src="${s}" alt="${p.name} screenshot" loading="lazy">`).join("")}</div>`;
  } else if (p.icon) {
    visual = `<div class="card__art card__art--icon"><img class="card__icon" src="${p.icon}" alt="${p.name} app icon" loading="lazy"></div>`;
  } else {
    visual = `<div class="card__art"><span class="card__art-glyph">${p.glyph || p.name[0]}</span></div>`;
  }
  const meta = p.commits != null
    ? `<span class="card__commits"><b>${p.commits}</b> commits</span>`
    : (p.meta ? `<span class="card__commits">${p.meta}</span>` : "");
  const repo = p.repo
    ? `<a href="${p.repo}" target="_blank" rel="noopener" class="card__link card__link--repo">View repo ↗</a>` : "";
  const store = p.store
    ? `<a href="${p.store}" target="_blank" rel="noopener" class="card__link card__link--store">${p.storeLabel || "App Store ↗"}</a>` : "";
  return `
    <article class="card ${p.feature ? "is-feature" : ""} reveal">
      ${visual}
      <div class="card__body">
        <div class="card__top">
          <h3 class="card__name">${p.name}</h3>
          ${meta}
        </div>
        <p class="card__tagline">${p.tagline}</p>
        <p class="card__desc">${p.desc}</p>
        <div class="card__badges">${p.badges.map(badgeHTML).join("")}</div>
        <div class="card__links">${repo}${store}</div>
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
const TABS = ["home", "resume", "projects", "contact"];
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
    ? "Naveen H Gowda — Engineering Manager"
    : name[0].toUpperCase() + name.slice(1) + " · Naveen H Gowda";
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
