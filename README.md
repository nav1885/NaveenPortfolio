# Naveen H — Portfolio

Personal portfolio site for Naveen H, Engineering Manager.

Dark, bold, minimal, large-type, single-page **tabbed** site (Home · Résumé · Projects · Strava · Contact) — no build step, plain HTML/CSS/JS.

## Run locally

```sh
python3 -m http.server 8765
# open http://localhost:8765
```

## Structure

```
index.html        markup + all tab panels
css/styles.css    design system (dark, Space Grotesk display, one accent)
js/main.js        tab router, project cards, stat counters, reveals
assets/projects/  real screenshots pulled from project repos
```

## Notes

- Projects are ordered by commit count and rendered from the `PROJECTS` array in `js/main.js`.
- Strava stat tiles in `index.html` (`.strava__stats`) are placeholders — edit the numbers directly.
- Deployed via GitHub Pages from `main` / root.
