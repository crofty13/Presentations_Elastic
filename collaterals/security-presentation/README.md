# Elastic Security: ElasticON Amsterdam

14-slide deck rebuilt from the ElasticON Amsterdam Google Slides in the elastic.co web style of the observability deck. Every animated GIF in the original is now a native HTML animation.

## Spin it up

```bash
cd collaterals/security-presentation
fslides serve
```

Opens at **http://localhost:3013**. Export a PDF with `fslides pdf` (animations are captured at their final frame).

## Files

- `sec-*.html`: one file per slide, in deck order in `fuckslides.config.js`
- `notes.json`: speaker notes, with sources and compliance caveats
- `css/eweb.css`, `js/eweb.js`: the shared elastic-web style (same as the observability deck)
- `css/sec.css`, `js/sec.js`: components and the slide clock shared by this deck

## Notes

- The source deck's vendor and source names (Splunk, QRadar, Sentinel; Hoxhunt, Anthropic, Verizon, Hugging Face, OpenAI, METR) are kept off the slides and cited in `notes.json`.
- The speaker notes carry the compliance caveats from the original: the "Context Engine" name, the Hugging Face facts to verify before stage, and the Forrester and IDC usage approvals.
- Every slide jumps to its final frame for PDF and PowerPoint export, and works at density 1 to 5 (default 3).
