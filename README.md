# Elastic Presentations

Elastic Observability and Elastic Security decks built with [fslides](https://www.npmjs.com/package/fslides), plus a **Slide Library**: a local web app to browse every slide, build new presentations from existing slides, and edit or delete decks.

## Quick start

```bash
brew install node                 # or install Node.js from nodejs.org
npm install -g fslides            # the slide player
git clone https://github.com/crofty13/Presentations_Elastic.git
cd Presentations_Elastic
npm start                         # Slide Library at http://localhost:3100
```

To play one deck on its own:

```bash
cd collaterals/<deck>
fslides serve                     # opens at the port in the deck's fuckslides.config.js
```

`fslides serve` keeps its terminal busy until you press Ctrl+C, and so does `npm start`. Run each in its own terminal tab if you want both.

## Requirements

### Required

| What | Why | Install |
|---|---|---|
| **Node.js** 20 or newer, with npm | Runs fslides and the Slide Library (tested on Node 25) | [nodejs.org](https://nodejs.org) or `brew install node` |
| **fslides** 0.7.1 | Plays the decks (`fslides serve`) and exports them (`fslides pdf`, `fslides gif`, `fslides pptx`) | `npm install -g fslides` |

Installing fslides also installs its own libraries: puppeteer (which downloads a headless Chrome, about 150 MB, used for PDF, GIF and PowerPoint export), pptxgenjs, pdf-lib, pngjs, gif-encoder-2 and the Anthropic SDK. Nothing else needs installing.

The Slide Library needs no `npm install`: it uses only Node's built-in modules. It finds fslides on its own and uses it for slide thumbnails and **Open presentation**.

### Internet access while presenting

- **Google Fonts** (fonts.googleapis.com): almost every slide loads Inter and IBM Plex Mono from there. Offline, slides fall back to system fonts, which changes the look and can move line breaks.
- **Public CDNs**: a few older Observability slides (`streams-demo`, `nightshift-reveal`, `ns-clickthrough-demo`) load React from unpkg.com. Some fslides player features load code or call services online: the webcam background effect (cdn.jsdelivr.net, storage.googleapis.com) and comments (api.github.com).
- **Live links**: a couple of demo slides link to external prototype sites.

If you may present without internet access, test those slides first.

### Optional, only for certain fslides features

| Tool | Only needed for |
|---|---|
| `git` | `fslides publish` and `fslides build`, which read the repo's remote |
| GitHub CLI (`gh`), signed in | The comments panel in the player (GitHub issues) and `fslides scaffold` |
| `ANTHROPIC_API_KEY` | `fslides import`, which turns a PDF or images into slides |

## Slide Library

```bash
npm start
```

Opens **http://localhost:3100** in your browser. Set `PORT=3200 npm start` to use another port, or add `--no-open` (`node library/server.js --no-open`) to skip opening a browser tab. It reads the decks from `collaterals/` on every page load, so new or edited decks show up after a refresh.

### All slides

The home page shows every slide from every deck as a live thumbnail, grouped by deck. Search by title or file name, and untick **Show slides not in a deck** to hide slides a deck doesn't use. A deck's title takes you to that presentation.

To build a new presentation:

1. Click slides to select them; you can mix decks. The number on each card is its position in the new deck. The magnifier opens a full-size preview (← → to step through).
2. Drag the chips in the bottom bar to reorder, or × to drop one.
3. Click **Create new presentation** and give it a name. The library creates `collaterals/<name>/`.
4. Click **Open presentation** to play it, or run `fslides serve` in that folder.

### Presentations

**Presentations** in the top bar lists every deck with its first slide, slide count, folder and port. Click a deck to see its slides in order, with any slides it doesn't use below them. Click a slide to preview it full size.

**Delete**: hover a deck card and click the red trash button, then **Move to Trash**. Nothing is erased: the deck's folder moves to the macOS Trash as `<deck> (deleted <date-time>)`, or to `.trash/` in the repo (ignored by git) when the Trash isn't reachable. To restore a deck, move its folder back into `collaterals/` and rename it to the original name. A player the library started for that deck is stopped first.

### Edit slides

On a deck's page, click **Edit slides**:

- **Remove**: × on a slide takes it out of the running order.
- **Reorder**: drag a slide; a blue line shows where it will land.
- **Add**: the **+** card at the end opens the whole library, with search and a deck filter. Pick one or more slides from any deck; slides already in the deck are greyed out. New slides go at the end, marked "new".
- **Save** writes the changes to the deck's folder. **Cancel** discards them, and the page warns you before you leave with unsaved changes.

### What the library writes to disk

**Creating** a presentation makes `collaterals/<name>/` with:

- the selected slide HTML files, in your order;
- every local file those slides use: `css/`, `js/`, images and anything those stylesheets pull in;
- their speaker notes (`notes.json`) and voice-over recordings;
- `fuckslides.config.js` (with the next free port from 3020), `package.json`, `build-player.js`, `.gitignore` and a `README.md`, so it runs like the other decks.

**Saving** an edited deck:

- rewrites only the `slides`, `labels` and `disabled` lists in its `fuckslides.config.js`, so every other setting stays as it was;
- copies slides added from other decks into the folder, with their assets, notes and recordings. If the deck already has a different file at the same path (say, its own `css/eweb.css`), it keeps its own and the save lists a warning;
- moves removed slides to `disabled` rather than deleting them, so their files stay and you can add them back with **+**.

**Either way**:

- A slide whose file name is already taken is copied as `<source-deck>-<file>.html`.
- `js/fuckslides.js` (the slide runtime) is never copied; fslides serves it.
- Restart any `fslides serve` already running for a deck after you save, because it reads the slide order only when it starts. A player started with **Open presentation** restarts by itself.
- Saving doesn't commit to git. Commit and push yourself when you are happy with the changes.
- A removed slide loses its short label (the config keeps labels only for slides in the order). If you add it back, its label becomes its page title; edit `labels` in the config to shorten it.

## Decks

| Deck | Slides | Port | Description |
|---|---|---|---|
| [observability-presentation](collaterals/observability-presentation/) | 58 | 3004 | Elastic Observability company presentation. The main talk runs to **Thank You** (slide 35); the 23 slides after it are older and previously parked slides, added back as an appendix. |
| [metrics-analysts-presentation](collaterals/metrics-analysts-presentation/) | 24 | 3012 | Elastic Observability Metrics Analyst Briefing. The main talk runs to **Thank You** (slide 21); Competitive, Market Landscape and Why Columnar Is Smaller follow. |
| [security-presentation](collaterals/security-presentation/) | 14 | 3013 | Elastic Security, ElasticON Amsterdam. Rebuilt from the Google Slides deck in the elastic.co web style; every animated GIF is now an HTML animation. |

`collaterals/fslides-styles/elastic-web/` holds the reusable elastic.co slide style that the observability and security decks use.

Every deck folder has the same shape: one HTML file per slide, `fuckslides.config.js` (`slides` and `labels` in running order, `disabled` for parked slides), `notes.json` (speaker notes keyed by file name), shared `css/` and `js/`, and `recordings/` for voice-overs.

## Known issues

- **Voice-over recordings don't play.** The `recordings/*.webm` files are Git LFS pointers from the original repo, not the videos themselves.
- **One slide is missing an image.** `observability-presentation/12-gen-dashboard.html` uses `images/mo2.gif`, which wasn't in the original files, so the slide is mostly empty. The library warns about it if you copy that slide.
- **Mixed styles in the Observability appendix.** Most of the 23 appendix slides use an older, dark visual style.
- **Internal notes.** Speaker notes include internal review and compliance comments (sources to verify, naming and analyst-approval questions). This repo is public, so treat them accordingly.

## Changes in this repo

- **Imported** the Observability and Metrics Analyst decks and the elastic-web style from the Elastic observability-team repo.
- **Added the Slide Library**: browse all slides and create new presentations from them.
- **Added the Elastic Security deck** (14 slides) rebuilt from the ElasticON Amsterdam deck, with its GIFs as HTML animations, density 1 to 5, and speaker notes. Vendor names are off the slide faces and live in the notes.
- **Added Presentations, Edit slides and Delete** to the Slide Library.
- **Put every slide into its deck**: the 26 slides that sat outside their decks (3 Metrics Analyst, 23 Observability) are appended after each deck's closing slide, with short labels.
