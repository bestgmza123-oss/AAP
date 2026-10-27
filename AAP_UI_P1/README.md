# AAP_UI_P1 — Private UI Prototype (P1-UI-001 through P1-UI-003)

## Latest verification status — 2026-10-27

`P1-UI-001` and `P1-UI-002` remain accepted. The owner explicitly authorized `P1-UI-003 — Province and resource preview`; current branch is `feat/p1-ui-003-province-resource-preview` from main `39f50737c97b10db67aa0a293894c69586170e55`. The current local Windows source passed Biome lint (exit 0; four reduced-motion CSS `!important` warnings only), Vitest 9/9, typecheck, scope audit (12 files, no forbidden Supabase/client-network patterns), production build (Vite 8.3.5 / 30 modules transformed), and Playwright browser smoke 4/4; `git diff --check` passed. Actual full-page browser captures, visually inspected at desktop and mobile sizes, are `../evidence/p1-ui-003-province-desktop.png` and `../evidence/p1-ui-003-province-mobile.png`. Implementation commit `614a9dff49e99fe944c9994df02b893e3262fccc` passed both required GitHub Actions jobs in [run #22](https://github.com/bestgmza123-oss/AAP/actions/runs/40479139048). PR #4 is open at [this link](https://github.com/bestgmza123-oss/AAP/pull/4); if further commits are added, the current PR check rollup must be re-verified on its latest head before merge.

## Known Agent DNS blocker policy

If this Agent Environment has already recorded npm registry `EAI_AGAIN`, do not retry installs here unless new evidence shows connectivity/settings changed. Classify it as `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`), not a code failure and not evidence of a ChatGPT-wide outage. Validate the updated source from the owner's existing Windows checkout (keep installed dependencies while the lockfile is unchanged) or a verified authorized GitHub Actions runner. Use the single Owner Action in `../evidence/OWNER_ACTION_TASK_TH.md` and return its transcript and browser evidence.

**Active bound:** `P1-UI-003` only. `/province` is a navigation/resource-information prototype backed by static local data, not a playable or connected game. Stop after Province and preview meters are accepted; do not start P1-UI-004 automatically.

## Requirements

- Node.js `>=22.12.0`
- npm `>=10.0.0`

## Dependencies for this checkpoint

This handoff includes a `package-lock.json` generated for this source package. If you already installed dependencies successfully in this exact checkout and the lockfile is unchanged, keep the existing `node_modules` and run the checks; do not install again without a technical reason. For a fresh/clean checkout, from `AAP_UI_P1/` run:

```sh
npm ci --no-audit --no-fund
```

If installation is blocked, preserve the lockfile, capture the exact output and follow `../evidence/OWNER_ACTION_TASK_TH.md`. Do not change registry/mirror or bypass TLS to work around a network failure.

## Run and verify

```sh
npm run typecheck
npm run lint
npm test
npm run audit:scope
npm run build
npm run test:e2e
npm run dev
```

Keep each command result separate. A successful build does not mean lint, tests, scope audit or browser smoke checks passed. The Biome configuration must match the installed Biome 2.x schema, and the Vitest setup explicitly cleans up the DOM after every test without changing assertions.

## Boundaries

- The visible banner `PRIVATE PROTOTYPE · FIXTURE DATA · NOT CONNECTED TO GAME SERVER` must remain readable.
- `src/fixtures/prototype.ts` owns build metadata and fixture identity; `src/fixtures/province.ts` owns static Province/resource display fixtures. The display values remain static preview data and are not final balance approvals or persistent world state.
- `src/i18n/en.ts` is the English-first string catalog. UI code uses stable keys through `src/i18n/index.ts`; additional locales can be added without changing route or game identifiers.
- No Supabase, network API, Auth, database, persistent game state, server RNG, gameplay mutation, deployment, or credentials are part of this bound.
- Implemented routes are Start (`/`), the honest empty Updates state (`/updates`), and the fixture-only Province hub (`/province`). Run preflight, combat, real travel and all authoritative gameplay remain out of scope; future route actions stay unavailable until their bounded Task is authorized.
