

# Reel Verdict

A film recommendation prototype. Black-and-crimson cinematic UI, a curated library of 150 films,
generated poster art, stackable filters, a "Tonight" picker, a watchlist and a taste profile.

## Run it

No build step, no dependencies. Pick any one of these.

**Option 1 — VS Code Live Server (easiest)**
1. Install the "Live Server" extension by Ritwick Dey.
2. Right-click `index.html` → **Open with Live Server**.

**Option 2 — Node**
```bash
npx serve .
```
Then open the URL it prints (usually http://localhost:3000).

**Option 3 — Python**
```bash
python -m http.server 5500
```
Then open http://localhost:5500

> Opening `index.html` by double-clicking works too, but a local server is better —
> some browsers restrict `file://` pages.

## Files

| File | What's in it |
|---|---|
| `index.html` | Page structure |
| `styles.css` | All styling, theme colours live in `:root` |
| `movies.js` | The film library and the poster art generator |
| `app.js` | Filtering, search, watchlist, tonight mode, taste profile |

## Adding films

Open `movies.js` and add one line to `RAW`, pipe-separated:

```
Title|Year|Genre,Genre|theme,theme,theme|Runtime|Rating|Language|Director|Cast|One-line synopsis|mood,mood
```

Moods must come from: `dark, tense, feelgood, funny, sad, thoughtful, epic, romantic, weird, cozy, adrenaline`.
Filters, posters, similar-film matching and the taste profile all pick it up automatically.

## About the AI search

The search bar ("something dark and twisty, but not depressing") runs on Claude when the page is
hosted on claude.ai. Running locally there's no Claude to call, so it falls back to keyword and tag
matching across titles, genres, themes, moods, directors, cast and synopses. It still works — it's
just literal rather than interpretive.

To wire up real AI locally you'd add an Anthropic API key behind a tiny backend (never in the
browser, or the key is public).

## Posters

Poster art is generated, not licensed. Each film gets a composition chosen from its genre —
eight templates, ten genre palettes — so the grid reads like a shelf of posters. For real studio
artwork you'd pull from the TMDB API, which needs a free key and a fetch layer.
