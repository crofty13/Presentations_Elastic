# Elastic Presentations

Elastic Observability decks built with [fslides](https://www.npmjs.com/package/fslides), plus a Slide Library for building new decks from existing slides.

## Slide Library

Browse every slide in every deck, pick the ones you want, and create a new presentation from them.

```bash
npm start
```

Opens **http://localhost:3100**. Requires Node and fslides (`npm install -g fslides`).

1. Click slides to select them. The number on each card is its position in the new deck. Use the magnifier on a card for a full-size preview (← → to step through).
2. Drag the chips in the bottom bar to reorder, or × to drop one.
3. Click **Create new presentation** and give it a name.

The library creates `collaterals/<name>/` with:

- the selected slide HTML files, in your order (a slide whose filename clashes with another deck's is renamed `<deck>-<file>.html`)
- every local file those slides use: `css/`, `js/`, images and anything those stylesheets pull in
- their speaker notes (`notes.json`) and voice-over recordings
- a `fuckslides.config.js`, `package.json`, `build-player.js` and `README.md`, so it runs like the other decks

Then click **Open presentation**, or run it yourself:

```bash
cd collaterals/<name>
fslides serve
```

New decks show up in the library too, so you can remix them later. The library also lists slides that are disabled or unused in a deck; untick **Show slides not in a deck** to hide them.

## Decks

| Deck | Description |
|------|-------------|
| [observability-presentation](collaterals/observability-presentation/) | Elastic Observability: company presentation |
| [metrics-analysts-presentation](collaterals/metrics-analysts-presentation/) | Elastic Observability: Metrics Analyst Briefing |

`collaterals/fslides-styles/elastic-web/` holds the reusable elastic.co slide style.

The voice-over files in `recordings/` are Git LFS pointers from the original repo, not the videos themselves.
