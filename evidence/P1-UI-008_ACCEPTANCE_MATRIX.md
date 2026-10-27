# P1-UI-008 Acceptance Evidence Matrix — UI-P1-01…16

Date: 2026-10-27
Scope: Phase 1 prototype UI only; no authoritative server or persistence claims.
Run checkpoint: [`P1-UI-008_CHECKPOINT.md`](P1-UI-008_CHECKPOINT.md)

## Criterion-to-evidence mapping

| Criterion | Inspectable implementation / test | Evidence and result | Bounded interpretation |
|---|---|---|---|
| UI-P1-01 — Start / fixture identity | `src/App.tsx`; `e2e/smoke.spec.ts`: “Start shows fixture identity, version and the prototype boundary” | Existing shell evidence: `browser-root.png`, `browser-smoke-combined.png`; browser test PASS | No real Account/Character session or persistent identity is claimed. |
| UI-P1-02 — Shared shell / Updates / Mail / routes | `e2e/smoke.spec.ts`: Updates, unknown-route placeholder, P1-UI-008 Mail empty state, route matrix | `p1-ui-008-mail-empty-desktop.png`; all route tests PASS | Mail is an accessible inactive empty state; delivery, claim and delete remain disabled; unknown route remains a placeholder. |
| UI-P1-03 — Province hierarchy / Safe Zone | P1-UI-003 “Province hierarchy and resource preview” E2E | `p1-ui-003-province-desktop.png`, `p1-ui-003-province-mobile.png`; PASS | Fixture hierarchy/location display only; no persistent world/travel mutation. |
| UI-P1-04 — Resource row / inactive preview | P1-UI-003 Province/resource E2E | Province desktop/mobile captures; PASS | Hunger/Infection remain labelled preview/inactive; no ticking, regeneration or death simulation. |
| UI-P1-05 — Run preflight disclosure | P1-UI-004 preflight E2E | `p1-ui-004-run-preflight-desktop.png`, `p1-ui-004-run-preflight-mobile.png`; PASS | Cost/risk/restriction disclosure only; no server Stamina debit or Run creation. |
| UI-P1-06 — Combat actions and status | P1-UI-005 Combat desktop/mobile E2E and full journey in P1-UI-008 | `p1-ui-005-combat-desktop.png`, `p1-ui-005-combat-mobile.png`; PASS | Deterministic local Attack/Skill/Guard fixture; no authoritative combat/RNG. |
| UI-P1-07 — Supported action affordances | P1-UI-005 keyboard-action E2E and Combat status tests | Test `Combat actions are keyboard reachable and can be activated without a pointer`; PASS | Disabled/invalid actions remain local demo feedback; no potions/loadout mutations. |
| UI-P1-08 — Escape | P1-UI-006 Escape confirmation/cost/return-context E2E; Result link coverage P1-UI-008 | `p1-ui-006-escape-desktop.png`, `p1-ui-006-escape-mobile.png`; P1-UI-008 Combat Escape→ESCAPED PASS | Configured fixture preview; no debit/refund or authoritative asset disposition. |
| UI-P1-09 — Surrender | P1-UI-006 Surrender consequences E2E; P1-UI-008 Surrender→FAILED Result E2E | Test confirms no rewards/refund/death claim; PASS | Local terminal state only; no Character death or HP mutation. |
| UI-P1-10 — Loot/capacity | P1-UI-007 exact-capacity/overflow E2E and unit tests | `p1-ui-007-loot-desktop.png`, `p1-ui-007-loot-mobile.png`; PASS | Integer grams, 20,000 g capacity including bag, worn gear excluded; no item claim/drop. |
| UI-P1-11 — Main clear / optional return encounter | P1-UI-007 no-encounter and one-return/Escape E2E; P1-UI-008 Loot→Result preserved bucket test | `p1-ui-007-loot-escape-result-desktop.png`; PASS | Exactly zero or one deterministic branch; no server encounter roll and no third check. |
| UI-P1-12 — Terminal Result | `src/routes/RunResultPage.tsx`, `src/fixtures/run-result.ts`, related Vitest and E2E covering COMPLETED/ESCAPED/FAILED/EXPIRED | `p1-ui-008-result-completed-desktop.png`, `p1-ui-008-result-escaped-desktop.png`, `p1-ui-008-result-expired-desktop.png`; PASS | Carried-in, chosen pending, received-demo and forfeited buckets remain distinct. Expiry is not death; no durable grant/refund claim. |
| UI-P1-13 — Loading / waiting / empty / error / retry / disabled / cancel | P1-UI-008 state-recovery Vitest/E2E | Test `local loading/waiting/empty/error/blocked states have clear recovery without a network request`; PASS | States are explicitly simulated, cancellable and recover locally; not a network state or authoritative retry. |
| UI-P1-14 — Accessibility / responsive / reduced motion | P1-UI-008 12-route matrix at 1440×900 and 390×844; Combat keyboard test; Result heading-focus, pseudo-expanded mobile and reduced-motion E2E | `p1-ui-008-result-expanded-mobile.png`; all matrix checks PASS, zero horizontal overflow | Browser prototype QA only, not a formal WCAG conformance certification. |
| UI-P1-15 — English-first localization | `src/i18n/index.ts` pseudo-expanded helper; P1-UI-008 pseudo-expanded copy E2E | Expanded Result desktop/mobile fixture assertions PASS; `p1-ui-008-result-expanded-mobile.png` | Stable translation keys, longer copy wraps; this is not a claim that additional languages are complete. |
| UI-P1-16 — Future-scope boundary | P1-UI-008 Mail inactive state and future route placeholders; `npm run audit:scope` | Market/Travel/Housing/Payments/Admin/Social remain `Route not implemented`; scope audit PASS for 25 source files | No backend/API/Supabase/Auth/persistence or feature activation. |

## Run-level verification snapshot

- TypeScript typecheck: PASS.
- Vitest: 51/51 PASS across 4 test files.
- Lint: exit 0; warning-only (reduced-motion `!important` and CSS specificity diagnostics).
- Static scope audit: PASS, 25 source files; no Supabase reference/import or direct client-network call patterns.
- Production build: PASS, Vite 8.3.5 / 40 modules transformed.
- Playwright: 25/25 PASS, including the 1440×900 / 390×844 route matrix and complete Start→Province→Preflight→Combat→Loot→Result journey.
- Documentation static audit: PASS, 70 Markdown files / 1,311 links / zero missing targets or required policy markers.
- `git diff --check`: PASS after final E2E and documentation changes.

## Known limits / non-claims

All gameplay-adjacent state above is deterministic local fixture data. A successful UI action is not proof of server mutation, real Stamina/Gold/item debit, reward grant, inventory atomicity, timer expiration, Combat result, death/asset loss, mail delivery or persistent storage. Relevant inherited LOAD/MAIL/RUN/ESC scenarios remain test-design references; they are not recorded as passed authoritative server tests.
