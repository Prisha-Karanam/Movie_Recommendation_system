

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
## screenshots 

<img width="1470" height="828" alt="Screenshot 2026-09-29 at 7 38 41 PM" src="https://github.com/user-attachments/assets/9186390c-cd82-4426-af60-e125a1a47162" />
<img width="1470" height="828" alt="Screenshot 2026-09-29 at 7 38 34 PM" src="https://github.com/user-attachments/assets/997c9fcf-29a1-4adb-bc8d-8993e40507cc" />
<img width="1470" height="828" alt="Screenshot 2026-09-29 at 7 38 28 PM" src="https://github.com/user-attachments/assets/df11712c-0294-4d23-acfb-b48be1a42f10" />
<img width="1470" height="828" alt="Screenshot 2026-09-29 at 7 38 21 PM" src="https://github.com/user-attachments/assets/bccf8444-3190-4fa3-a185-124e6b8a5878" />
<img width="1470" height="828" alt="Screenshot 2026-09-29 at 7 38 13 PM" src="https://github.com/user-attachments/assets/30dc38ce-88dd-4d4f-9bac-678bab88a3d0" />

