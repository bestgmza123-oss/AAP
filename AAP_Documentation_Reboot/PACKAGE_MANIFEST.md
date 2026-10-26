# Package Manifest — AAP Documentation Reboot

**Directory type:** Canonical Markdown documentation subtree within the combined AAP project  
**Source baseline:** v0.2.2 — v0.2.0 recovery ladder plus single-project / single-ZIP handoff requirements and Thai owner-facing Trello reporting, 2026-10-26  
**Files inside this directory:** documentation only; no legacy source code, database state, credentials or deployment artifacts imported  
**Current implementation sibling:** `../AAP_UI_P1/` (bounded `P1-UI-001` shell only)  
**Current task evidence:** `../evidence/`  
**Markdown files in this directory:** 68
**Canonical system owners:** 33  
**AI-DEC provenance index:** 63 entries (AI-DEC-201…AI-DEC-263)  
**Design acceptance criteria:** 154 unique IDs, each indexed individually; not executed tests

## Verification boundary

The package validator checks file type, system IDs, decision ID coverage, acceptance ID uniqueness, relative Markdown links and ZIP integrity. These checks prove structure, not semantic completeness of every legacy rule. See `delivery/05_DOC001_AUDIT.md` for the detailed documentation audit and residuals. Implementation checks for the current `P1-UI-001` are reported separately in `../evidence/P1-UI-001_CHECKPOINT.md`; this manifest does not claim those checks passed.

## Files

- `AGENTS.md`
- `CHECKLIST_FOR_REVIEW.md`
- `OWNER_SUMMARY_TH.md`
- `PACKAGE_MANIFEST.md`
- `README.md`
- `balance/01_BALANCE_POLICY.md`
- `balance/02_PHASE_1_BASELINE.md`
- `decisions/01_DECISION_REGISTER.md`
- `decisions/02_RECONCILIATION_LOG.md`
- `decisions/03_SOURCE_COVERAGE.md`
- `delivery/01_ROADMAP.md`
- `delivery/02_TASK_TEMPLATE.md`
- `delivery/03_NEXT_TASK.md`
- `delivery/04_REQUIREMENTS_TRACEABILITY.md`
- `delivery/05_DOC001_AUDIT.md`
- `delivery/06_TASK_BOARD_WORKFLOW.md`
- `delivery/07_P1_UI_PROTOTYPE_TASK.md`
- `delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md` — 65 bounded Tasks, dependencies, evidence and stop controls.
- `delivery/10_LEGACY_ACCEPTANCE_TEST_CROSSWALK.md` — all 379 unique legacy §10 test IDs/rows mapped to current system/phase/Bound; all runtime status `NOT RUN IN REBOOT`.
- `delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md` — Thai owner-facing Trello summaries and truthful sync/status rules.
- `delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md` — project layout, repository-first branch/commit/PR/CI handoff and milestone/release ZIP exceptions.
- `delivery/13_BOUNDED_DOC_TASK_ENVIRONMENT_BLOCKER_OWNER_ACTION.md` — completed bounded workflow task for Environment Blockers, real-path Owner Action and Thai Trello updates.
- `delivery/14_WORKFLOW_AUTOMATION_GITHUB_CI_SETUP.md` — current workflow automation task; CI/Playwright/branch-protection work waits for access to the existing AAP repository.
- `delivery/08_REUSABLE_PROMPTS_TH.md`
- `experience/01_VISUAL_DIRECTION.md`
- `experience/02_SCREEN_FLOWS.md`
- `experience/03_LOCALIZATION.md`
- `experience/04_PHASE1_WIREFLOW.md`
- `product/01_VISION.md`
- `product/02_SCOPE.md`
- `product/03_GLOSSARY.md`
- `product/04_SYSTEMS_MAP.md`
- `rules/01_GLOBAL_INVARIANTS.md`
- `rules/02_CROSS_SYSTEM_CONTRACTS.md`
- `rules/03_DECISION_POLICY.md`
- `systems/account-character-identity.md`
- `systems/association-simulation-rank-season.md`
- `systems/bank-delivery.md`
- `systems/companions.md`
- `systems/currency-markets-auction.md`
- `systems/custom-admin-content-data.md`
- `systems/direct-trade.md`
- `systems/dungeon-run-lifecycle.md`
- `systems/enemies-combat-ai.md`
- `systems/equipment-enhancement-durability.md`
- `systems/escape-surrender.md`
- `systems/guilds-shared-storage-competition.md`
- `systems/home-raid-async-pvp.md`
- `systems/housing-starter-room-rentals.md`
- `systems/hp-stamina-mana.md`
- `systems/hunger-fridge.md`
- `systems/infection.md`
- `systems/items-weight-inventory.md`
- `systems/job-board-quests-class-unlock.md`
- `systems/offline-world-time.md`
- `systems/onboarding-tutorial.md`
- `systems/permanent-death-asset-persistence.md`
- `systems/random-rewards-payments.md`
- `systems/robots.md`
- `systems/scrap-salvage-crafting.md`
- `systems/server-authority-integrity.md`
- `systems/skills-power-library.md`
- `systems/stats-traits-class.md`
- `systems/travel-vehicles.md`
- `systems/turn-based-combat.md`
- `systems/ux-ui-visual-direction.md`
- `systems/world-provinces-locations.md`
- `systems/zombie-invasion.md`

## Workflow recovery amendment (2026-10-26)

Updated canonical recovery rules in `AGENTS.md`, `delivery/06_TASK_BOARD_WORKFLOW.md`, `delivery/08_REUSABLE_PROMPTS_TH.md`, `delivery/02_TASK_TEMPLATE.md`, `delivery/03_NEXT_TASK.md`, `delivery/07_P1_UI_PROTOTYPE_TASK.md`, `delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`, `delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`, `CHECKLIST_FOR_REVIEW.md` and `OWNER_SUMMARY_TH.md`: known Agent DNS `EAI_AGAIN` is a persistent `ENVIRONMENT_BLOCKED` condition; installation retries in the same Agent Environment stop unless connectivity/settings demonstrably changed; no ChatGPT-wide outage is inferred; one consolidated, executable Windows Owner Action is used if authorized GitHub Actions is unavailable; the Task resumes at its first incomplete criterion and does not advance automatically. No gameplay rules or task scope changed.

## DOC-001 and source-audit artifacts (v0.1.6)

- `experience/04_PHASE1_WIREFLOW.md` — Phase 1 UI screens, interactions, states and criterion IDs.
- `delivery/07_P1_UI_PROTOTYPE_TASK.md` — bounded next implementation task, React + TypeScript, local fixture only.
- `delivery/04_REQUIREMENTS_TRACEABILITY.md` — precise UI-P1 clause/source/verification mapping.
- `delivery/05_DOC001_AUDIT.md` — scoped audit verdict and remaining boundaries.
- `delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md` — 65 bounded Tasks, dependencies, evidence and stop controls.
- `delivery/10_LEGACY_ACCEPTANCE_TEST_CROSSWALK.md` — all 379 unique legacy §10 test IDs/rows mapped to current system/phase/Bound; all runtime status `NOT RUN IN REBOOT`.
- `delivery/08_REUSABLE_PROMPTS_TH.md` — one-time start, normal continuation, and timeout-recovery prompt templates.


## Added in v0.1.6

The v0.1.6 source crosswalk, architecture provenance repairs, bounded P1 task and structural corrections remain included.

## Added in v0.1.7

- `decisions/03_SOURCE_COVERAGE.md` now includes source SHA-256 fingerprints and dispositions for all 66 Beta Q/OI IDs plus 42 additional legacy-SoT IDs. Q-48 is explicitly identified as absent in the inspected SoT identifier set; no ID is invented.
- `decisions/02_RECONCILIATION_LOG.md` records Q-08 as an AI-selected conservative safe-logout baseline under the owner's explicit delegation; it does not claim runtime verification.
- `systems/onboarding-tutorial.md` defines the baseline safe logout conditions, reconnect/time semantics, and required Phase 3 runtime tests.
- The AI-selected baseline is design authority for subsequent work unless a later explicit owner instruction supersedes it; it is not proof that logout/reconnect works in code.
- `decisions/01_DECISION_REGISTER.md` labels the stale Phase 5 Guild-base and Thai-first AI-DEC titles as historical/superseded.





## Added in v0.1.8

- `delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md`: 65 bounded Task contracts across Phases 0–6, including required phase-entry gates for Phases 2–6.
- `delivery/10_LEGACY_ACCEPTANCE_TEST_CROSSWALK.md`: all 379 unique table rows from the inspected legacy SoT §10. Source statuses are not runtime evidence; all rows are `NOT RUN IN REBOOT`.
- `delivery/07_P1_UI_PROTOTYPE_TASK.md`: Phase 1 UI work is split into eight bounded tasks; the active first task is scaffold/shell only.
- This update improves planning and test traceability. It does not implement or runtime-test the game and is not a public-release readiness claim.

## Added in v0.1.9

- `AGENTS.md` and `delivery/06_TASK_BOARD_WORKFLOW.md`: required per-task Trello preflight, active-session tool verification, search-before-create to avoid duplicate cards, creation of a task card when missing, blocker/review state rules, and an explicit `NOT SYNCED` state when the integration is unavailable.
- `delivery/07_P1_UI_PROTOTYPE_TASK.md` (historical v0.1.9 guidance, later superseded by the permanent `EAI_AGAIN` rule in v0.2.2 / RECON-021): initial npm registry/DNS recovery guidance; preserve lockfiles and avoid unapproved mirrors/TLS workarounds. Current policy forbids retrying in the same Agent Environment once `EAI_AGAIN` is evidenced unless fresh diagnostics prove connectivity/settings changed.
- `delivery/08_REUSABLE_PROMPTS_TH.md`: first-run and resume prompts now explicitly require direct Trello tool invocation when available, board/card lookup, and recovery from the current `P1-UI-001` checkpoint without starting `P1-UI-002` prematurely.
- This is a workflow/tooling improvement only. It does not change game rules or prove the current user's implementation environment has network access or a connected Trello action tool.


## Added in v0.2.0

- Added a bounded recovery ladder for dependency installation and environment/network failures: Agent environment first, an actually available authorized GitHub-hosted environment/Actions second, and one consolidated manual Owner Action Task if the blocker remains or the fallback is unavailable.
- Added explicit `ENVIRONMENT_BLOCKED` / tool-unavailable / authorization distinctions, anti-loop rules, commands-and-expected-results requirements, and a same-task resume contract.
- Owner requests are sent once per distinct blocker per task; the existing task card is updated instead of creating duplicate owner-action cards by default.
- No application code, live environment, package installation, build, browser, database, or runtime test was executed by this documentation-only update. Structural/link/ZIP checks are reported separately in the external audit note.


## Superseded v0.2.1 policy note

- v0.2.1 over-emphasized explicit document-preservation safeguards and permitted split delivery when combining archives was unavailable. v0.2.2 replaces that wording with a simpler project/workspace rule: creating an implementation workspace is normal, docs and code should live in one coherent project root, and the default deliverable after coding begins is one combined ZIP.
- `delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md` remains in force: owner-facing summaries, blockers, evidence captions and handoffs on Trello must be Thai; canonical Task IDs/list names and exact technical output remain unchanged. This governs reporting language, not the English-first in-game UI.

## Added in v0.2.2

- Reworked `delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md` to define one coherent project containing both the documentation and implementation directories, and one primary combined ZIP after coding begins.
- Updated `AGENTS.md`, `README.md`, `OWNER_SUMMARY_TH.md`, `CHECKLIST_FOR_REVIEW.md`, task template, current task, workflow and reusable prompts so workspace creation is not mistaken for deletion and routine continuation does not require two ZIPs.
- The initial v0.2.2 archive remains documentation-only because it is the bootstrap input before implementation code exists. The first implementation handoff is expected to include both this docs tree and the code created by the task in one ZIP.
- These are documentation/workflow changes only. No application code, live environment, package installation, build, browser, database, or runtime test was executed by this update.

## Current combined project handoff — P1-UI-001

- The original v0.2.2 input ZIP was inspected and classified `DOCS-ONLY`; the complete 66-file documentation tree was retained. Its pre-edit file inventory and hashes are in the project-level `evidence/BASELINE_DOCUMENT_INVENTORY.json`.
- `rules/01_GLOBAL_INVARIANTS.md` item 17 and `decisions/02_RECONCILIATION_LOG.md` were reconciled with the explicit single-project handoff contract: documentation remains in this directory; authorized implementation source belongs in sibling `AAP_UI_P1/` and travels with these docs in one ZIP.
- Runtime/build/test/browser evidence and the checkpoint are maintained in the project-level `evidence/` directory. The source-document inventory does not by itself represent code acceptance or product readiness.

## P1-UI-001 documentation reconciliation — 2026-10-26

- Clarified Global Invariant 17 and `RECON-004`: `AAP_Documentation_Reboot/` is documentation-only; an authorized implementation folder such as `AAP_UI_P1/` is a sibling under the same Project Root.
- Retained `RECON-020` as the operational implementation-layout record and linked its meaning to `RECON-004`; prior decision history is not deleted.
- Aligned project/documentation `README.md`, `AGENTS.md`, `OWNER_SUMMARY_TH.md`, `CHECKLIST_FOR_REVIEW.md`, `delivery/02_TASK_TEMPLATE.md`, `delivery/03_NEXT_TASK.md`, `delivery/06_TASK_BOARD_WORKFLOW.md`, `delivery/07_P1_UI_PROTOTYPE_TASK.md`, and `delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md` to the same folder-boundary and single-ZIP rule. Updated `AAP_UI_P1/README.md` and the project README so first install uses `npm install --no-audit --no-fund` while no lockfile exists and documents `npm ci` only after a lockfile is retained. Updated `delivery/03_NEXT_TASK.md`'s status to reflect the actual scaffold and registry blocker. Added project-level checkpoint, owner action instructions, policy-audit evidence and Thai delivery summary. No unrelated gameplay, system, phase or acceptance requirements were changed.
- The documentation file tree is still the complete imported baseline plus these declared task-relevant edits. The pre-edit inventory/hashes remain in project-level `evidence/BASELINE_DOCUMENT_INVENTORY.json`.


## P1-UI-001 continuation and workflow reliability update — 2026-10-26

- Updated the canonical blocker recovery rule across `AGENTS.md`, workflow, reusable prompts, task template/brief, task status, handoff contract, Trello language policy, checklist, owner summary and READMEs. Blockers must be classified from evidence; the agent must check safe code/config fixes and accessible authorized GitHub-hosted paths; otherwise issue one actionable Owner Action with working directory, exact ordered commands, expected results, return channel/files and same-Task resume criterion. Do not leave the owner only waiting for DNS, and do not request repeat installation in the same checkout when success is already evidenced and the lockfile is unchanged.
- `AAP_UI_P1/biome.json` now uses Biome 2 configuration (`files.includes`, `linter.rules.preset`); `src/test/setup.ts` explicitly calls Testing Library `cleanup()` after each Vitest test. Assertions were not changed.
- The uploaded handoff has a valid `package-lock.json` (lockfile v3); prior notes claiming no lockfile are superseded for this source package.
- Agent `npm ci` was blocked by observed registry `EAI_AGAIN`. GitHub repository searches for `AAP` and `Anime Apocalypse` returned no repositories; no Actions run is claimed. The Agent could run static JSON parsing and scope audit but could not execute Biome, Vitest, TypeScript or Vite. Updated source lint/tests/typecheck/build remain unverified until the provided Owner Action is returned. Browser test remains `NOT RUN`.
- Owner's pre-fix results are kept with explicit provenance in `../evidence/owner-reported-verification.md`; they are not represented as results for this fixed source revision. Full checkpoint and command output are in `../evidence/P1-UI-001_CHECKPOINT.md` and `../evidence/postfix-agent-checks.log`.
- No gameplay, Backend, API, Supabase/Auth, persistence, deployment, or `P1-UI-002` scope was started.
- Persistent Agent Network Blocker rule: after a confirmed `EAI_AGAIN` in the same Agent Environment, do not retry `npm ci`/`npm install` there without fresh evidence that connectivity/settings changed. Classify as `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`) rather than a code defect, do not infer a ChatGPT-wide outage, check only a genuinely authorized GitHub Actions path, then provide one complete Windows Owner Action against the existing checkout. Keep installed dependencies when the lockfile is unchanged and resume this Task from its first incomplete acceptance criterion. The updated-source test results remain explicitly unverified until returned with evidence.


## Repository-first workflow automation — 2026-10-26

- Updated `AGENTS.md`, `CHECKLIST_FOR_REVIEW.md`, `README.md`, `OWNER_SUMMARY_TH.md`, `delivery/03_NEXT_TASK.md`, `delivery/06_TASK_BOARD_WORKFLOW.md`, `delivery/08_REUSABLE_PROMPTS_TH.md`, `delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`, and `delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md` to use repository/commit/PR and CI artifacts as the routine handoff, with ZIP limited to milestone/release/owner request/documented access fallback.
- Added canonical Task brief `delivery/14_WORKFLOW_AUTOMATION_GITHUB_CI_SETUP.md` and reconciliation note `RECON-022`; added evidence `../evidence/github-repository-access-check.md`, `../evidence/OWNER_ACTION_GITHUB_REPOSITORY_TH.md`, and `../evidence/WORKFLOW_AUTOMATION_GITHUB_CI_SETUP_CHECKPOINT.md`.
- The global repository list and bounded searches omitted the owner-supplied AAP URL, but direct lookup confirmed `bestgmza123-oss/AAP` exists (Public, `main`, `admin=true`, `push=true`). Its repository size is 0 and Contents API reports it is empty. No branch/commit/PR/CI/required-check state has been invented; CI/Playwright/branch protection remain BLOCKED/NOT RUN pending one-time source bootstrap.
- No game requirements, system documents, balance rules, backend or Supabase configuration were changed; `P1-UI-002` remains unstarted.
