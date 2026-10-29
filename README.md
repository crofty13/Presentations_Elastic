# Elastic Observability Team

Resources, collaterals, and enablement materials for the Elastic Observability team.

## Collaterals

Published automatically to GitHub Pages on every push to `main`. Each deck with an `export` script gets built and deployed.

| Deck | Description |
|------|-------------|
| [observability-presentation](collaterals/observability-presentation/) | Elastic Observability — Company Presentation |
| [metrics-analysts-presentation](collaterals/metrics-analysts-presentation/) | Elastic Observability — Metrics Analyst Briefing |

## Adding a new collateral

1. Create a directory under `collaterals/<name>/`
2. Add a `package.json` with an `export` script (e.g. `"export": "fslides export"`)
3. Push to `main` — CI will build and publish it automatically
