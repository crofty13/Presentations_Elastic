# Elastic Observability — Company Presentation

35-slide deck covering the full Elastic Observability story: from data streams and logs, through metrics and PromQL, to the Nightshift AI SRE vision.

## Prerequisites

Install [fslides](https://www.npmjs.com/package/fslides) globally:

```bash
npm install -g fslides
```

## Spin it up

```bash
cd collaterals/observability-presentation
fslides serve
```

Opens in your browser at **http://localhost:3004** with the full player UI (slide navigation, speaker notes, keyboard shortcuts).

## Export to PDF

```bash
fslides pdf
```

Outputs `company-preso.pdf` in the same directory. Animations are captured at their final state.

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `F` | Toggle fullscreen |
| `G` | Jump to slide number |
