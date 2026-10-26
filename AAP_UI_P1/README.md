# AAP_UI_P1 — Frontend scaffold and shell

## Latest verification status — 2026-10-27

`P1-UI-001` remains accepted for its fixture-only shell scope. Workflow follow-up adds `@playwright/test`, `playwright.config.ts`, `e2e/smoke.spec.ts`, and the `test:e2e` script. On the authorized Windows checkout, the current local revision passed lint (four pre-existing reduced-motion `!important` warnings only), Vitest 4/4, typecheck (now includes Playwright config/tests), scope audit, production build, and Playwright browser smoke (2/2). The browser workflow and artifact path still require GitHub Actions verification on the pushed SHA. Do not infer browser job/Artifacts/branch protection PASS from the older base CI run.

## Known Agent DNS blocker policy

If this Agent Environment has already recorded npm registry `EAI_AGAIN`, do not retry installs here unless new evidence shows connectivity/settings changed. Classify it as `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`), not a code failure and not evidence of a ChatGPT-wide outage. Validate the updated source from the owner's existing Windows checkout (keep installed dependencies while the lockfile is unchanged) or a verified authorized GitHub Actions runner. Use the single Owner Action in `../evidence/OWNER_ACTION_TASK_TH.md` and return its transcript and browser evidence.

**Active bound:** `P1-UI-001` only. This app is a private, local UI scaffold; it is not a connected game.

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
- `src/fixtures/prototype.ts` is the single canonical location for current prototype metadata and local fixture configuration. No gameplay fixtures are defined in this Task because gameplay screens are out of scope.
- `src/i18n/en.ts` is the English-first string catalog. UI code uses stable keys through `src/i18n/index.ts`; additional locales can be added without changing route or game identifiers.
- No Supabase, network API, Auth, database, persistent game state, server RNG, gameplay mutation, deployment, or credentials are part of this bound.
- The only routes are the shell placeholder and a generic unknown-route placeholder. Do not add gameplay screens until their bounded Task is authorized.
