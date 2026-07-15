# Naveen H

Profile site for Naveen H, Engineering Manager.

Dark, bold, minimal, large-type, single-page **tabbed** site (Home · Résumé · Projects · Contact) — no build step, plain HTML/CSS/JS with a hash-based tab router.

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
assets/           profile photo + project screenshots
Staticfile        Railpack static-serve config for Railway
```

## Notes

- Projects are ordered by commit count and rendered from the `PROJECTS` array in `js/main.js`.
- `?cap` in the URL enables static capture mode (no animations, everything revealed) for screenshots.

## Deploy

Hosted on **Railway** as a static site (Railpack detects `index.html` and serves it via Caddy). Push to `main` redeploys.
