# AAP_UI_P1 — Private UI Prototype (P1-UI-001 through P1-UI-005)

## Latest verification status — 2026-10-27

`P1-UI-001` through `P1-UI-005` are accepted; PR #4 and PR #6 and their exact-head/post-merge CI records are documented in the project README and task checkpoints. P1-UI-005 — Combat interaction demo is accepted and complete. PR #8 squash-merged into `main` at `d52413d422cac1ba416d6f109d5a99f290cf6d44`; its exact PR head passed both required jobs in [Actions run #32](https://github.com/bestgmza123-oss/AAP/actions/runs/40502541879), and post-merge `main` passed both in [run #33](https://github.com/bestgmza123-oss/AAP/actions/runs/40502782746). The deterministic local demo includes Attack/Skill/Guard, one visible Normal enemy at a time, separated enemy classification fields, telegraphed-intent gating, HP/Mana, Skill cooldown, Guard reduction after mitigation, a bounded combat log, low-Mana preview/recovery and a preflight-to-Combat UI link. Local verification passed: typecheck, Vitest 21/21, lint (four existing reduced-motion CSS `!important` warnings), scope audit (16 files), production build (34 modules), Playwright 9/9, static documentation audit (70 Markdown files/1,305 local links/0 missing targets), and `git diff --check`. Evidence and checkpoint: [`../evidence/P1-UI-005_CHECKPOINT.md`](../evidence/P1-UI-005_CHECKPOINT.md), `../evidence/p1-ui-005-combat-desktop.png`, `../evidence/p1-ui-005-combat-mobile.png`. Exact PR-head and post-merge CI both passed as recorded above; no authoritative Combat/Run mutation has been added.

## Known Agent DNS blocker policy

If this Agent Environment has already recorded npm registry `EAI_AGAIN`, do not retry installs here unless new evidence shows connectivity/settings changed. Classify it as `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`), not a code failure and not evidence of a ChatGPT-wide outage. Validate the updated source from the owner's existing Windows checkout (keep installed dependencies while the lockfile is unchanged) or a verified authorized GitHub Actions runner. Use the single Owner Action in `../evidence/OWNER_ACTION_TASK_TH.md` and return its transcript and browser evidence.

**Active bound:** `P1-UI-005`. `/run/combat` is a deterministic local fixture interaction demo; it does not create or enter a server Run. Only Attack/Skill/Guard and explicit local enemy-step transitions are available. No authoritative combat, RNG, real timer, death/infection simulation, persistence, backend/API/Supabase/Auth, Escape/Surrender, Loot or Result. Stop before P1-UI-006; do not start the next bounded task automatically.

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
- Implemented routes are Start (`/`), the empty Updates state (`/updates`), fixture-only Province (`/province`), Run preflight (`/run/preflight`) and Combat demo (`/run/combat`). Preflight confirmation and Combat actions update temporary in-memory UI fixture state only. No Stamina debit, authoritative Combat/RNG, real Run timer, death/infection transition, persistence, backend/API/Supabase/Auth, Escape/Surrender, Loot or Result is implemented; stop before P1-UI-006.
