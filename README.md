# Factory OS — Marketing Site

Static landing page for Factory OS, the operating system for small
manufacturing. Built for Indian job shops: sales orders, inventory,
production, dispatch and invoices in one place.

## Files

- `index.html` — the whole page (single scroll, no build step)
- `css/style.css` — styles, responsive, respects `prefers-reduced-motion`
- `js/main.js` — mobile nav toggle and small enhancements, no dependencies
- `favicon.svg` — inline SVG favicon
- `.nojekyll` — disables GitHub Pages' Jekyll so files serve as-is

## View locally

Open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Deploy

Pushed to `main` → GitHub Pages serves it automatically (Settings → Pages
→ Source: Deploy from a branch → `main` / root).
