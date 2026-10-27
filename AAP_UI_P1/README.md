# AAP_UI_P1 — Private UI Prototype (P1-UI-001 through P1-UI-004)

## Latest verification status — 2026-10-27

`P1-UI-001`, `P1-UI-002` and `P1-UI-003` are accepted. P1-UI-003 was delivered in [PR #4](https://github.com/bestgmza123-oss/AAP/pull/4), squash-merged into `main` at `aae3f18dffa78b6261d00553acfc7544df823b54`; the final PR head passed run #23 and post-merge `main` passed run #24. P1-UI-004 — Run preflight screen is in progress on `feat/p1-ui-004-run-preflight`, based on `main` `7398698608917c21ff76d721d59206dc3bc0caf7`. The screen includes Levels 1/5/6/50 cost previews, 30-minute timeout, restrictions/risks, Escape/Surrender disclosure, local-only confirmation/cancel, insufficient-Stamina, missing-fixture and retryable-error examples. Local verification passed on the current source: typecheck, Vitest 14/14, lint (four existing reduced-motion CSS `!important` warnings), scope audit (14 files), production build (32 modules), Playwright 5/5, static documentation audit (70 Markdown files/1,301 local links/0 missing targets), and `git diff --check`. See [`../evidence/P1-UI-004_CHECKPOINT.md`](../evidence/P1-UI-004_CHECKPOINT.md) and the desktop/mobile screenshots in `../evidence/`. Exact-PR-head CI remains pending; no authoritative Run/gameplay mutation has been added.

## Known Agent DNS blocker policy

If this Agent Environment has already recorded npm registry `EAI_AGAIN`, do not retry installs here unless new evidence shows connectivity/settings changed. Classify it as `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`), not a code failure and not evidence of a ChatGPT-wide outage. Validate the updated source from the owner's existing Windows checkout (keep installed dependencies while the lockfile is unchanged) or a verified authorized GitHub Actions runner. Use the single Owner Action in `../evidence/OWNER_ACTION_TASK_TH.md` and return its transcript and browser evidence.

**Active bound:** `P1-UI-004` only. `/run/preflight` is a review/disclosure screen with static fixtures and UI-only state examples; it does not create or enter a Run. Stop before Combat/P1-UI-005.

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
- Implemented routes are Start (`/`), the honest empty Updates state (`/updates`), fixture-only Province (`/province`) and Run preflight (`/run/preflight`). Preflight confirm/cancel/error examples are local UI state only. Combat, real Stamina debit, server RNG, Run timer, travel and authoritative gameplay remain out of scope; stop before P1-UI-005.
