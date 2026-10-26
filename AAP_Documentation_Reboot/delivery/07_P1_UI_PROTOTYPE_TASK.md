# P1 UI Prototype Task Pack — Begin with P1-UI-001

## Persistent Environment Blocker rule

Do not retry `npm ci`/`npm install` in the same Agent Environment after `EAI_AGAIN` has been evidenced unless a new diagnostic proves DNS/network configuration or connectivity changed. Record this as `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`), not `CODE_CONFIGURATION_FAILURE`, and do not claim that the whole ChatGPT service is down. Check real authorized GitHub Actions access; if unavailable, provide one consolidated Windows Owner Action for the existing checkout. Keep already-installed dependencies when `package-lock.json` is unchanged. The returned transcript and browser evidence resume this Task at its first incomplete acceptance criterion; do not start the next Task or ask for periodic duplicate tests.

**Current active Task:** `P1-UI-001 — Frontend scaffold and shell`  
**Phase:** 1 — UI-First Vertical Slice  
**Task control:** `delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md` is the canonical task sequence and boundary index.  
**Workspace:** the original v0.2.2 baseline was documentation-only; the current resumed combined handoff includes `AAP_UI_P1/` source alongside `AAP_Documentation_Reboot/`. Keep the canonical docs folder documentation-only; never place source code inside it. `AAP_UI_P1/` is a sibling under the same Project Root. Continue from the included source, `package-lock.json`, Checkpoint and evidence; do not recreate the scaffold. The primary delivery remains one combined ZIP. Follow [`delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`](12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md).

## Important scope correction

The complete Phase 1 UI vertical slice is intentionally split into eight bounded Tasks so it does not become one timeout-prone task. **Do only `P1-UI-001` on the first invocation.** Do not build all screens in one pass and do not automatically start the next Task. The eight rows below are aligned with the canonical task matrix; each Task stops at its own acceptance and checkpoint.

| Task | Bounded outcome | Main acceptance scope | Stop point |
|---|---|---|---|
| `P1-UI-001` | Frontend scaffold, scripts, route shell and fixture-only boundary | Toolchain/shell; no gameplay screens | Build/type/lint/test baseline has real output or an exact setup blocker is recorded |
| `P1-UI-002` | Start, fixture identity and global navigation | `UI-P1-01/02/16`; prototype portions of `REL-001/002`, `MAIL-UX-001`, `LOAD-001/002` | Identity/navigation states work; no Province/Run screen yet |
| `P1-UI-003` | Province and resource preview | `UI-P1-03/04`; preview-only Hunger/Infection labels | Province states are clear and fixture-only; no real decay/death/travel/housing |
| `P1-UI-004` | Run preflight | `UI-P1-05`; level/tier/cost/time/risk disclosure and confirm/cancel | Preflight confirmation/cancel works; no Combat flow yet |
| `P1-UI-005` | Combat interaction demo | `UI-P1-06/07`; supported Attack/Skill/Guard and enemy/status/log fixtures | Supported deterministic combat transitions work; no authoritative RNG/server logic |
| `P1-UI-006` | Escape and Surrender confirmation | `UI-P1-08/09`; separate confirmed and cancelled paths | Consequence display and terminal paths match current owner rules |
| `P1-UI-007` | Loot selection, capacity and optional return encounter | `UI-P1-10/11`; quantity/capacity and zero-or-one return encounter | At/over capacity and return-encounter branches preserve visible consequences |
| `P1-UI-008` | Results, responsive/accessibility/localization and full UI review | `UI-P1-12…16`; cross-flow/negative-scope/loading/error/retry states | Full desktop/mobile flow evidence, or exact failed criterion and blocker are recorded |
## P1-UI-001 — Frontend scaffold and shell (current task)

### Outcome

Create or verify an isolated React + TypeScript frontend workspace that can start and build, contains a clear shell and route placeholder, and cannot be mistaken for a connected/authoritative game. This task is complete only when real command output/evidence is recorded.

### Read list

1. `README.md`, `AGENTS.md`, `delivery/03_NEXT_TASK.md`.
2. [`delivery/09_PHASE_BOUNDARY_EXECUTION_MATRIX.md`](09_PHASE_BOUNDARY_EXECUTION_MATRIX.md), this row `P1-UI-001`.
3. `product/01_VISION.md`, `product/02_SCOPE.md`, `product/04_SYSTEMS_MAP.md`.
4. `rules/01_GLOBAL_INVARIANTS.md`, `rules/02_CROSS_SYSTEM_CONTRACTS.md`.
5. `experience/01_VISUAL_DIRECTION.md`, `experience/03_LOCALIZATION.md`, `experience/04_PHASE1_WIREFLOW.md` (for naming/shell direction only).
6. This task's related owner reference: `systems/ux-ui-visual-direction.md` and `systems/server-authority-integrity.md`.

Do not load all 33 system files. The source files `SOURCE_OF_TRUTH.md`, `Doc.md`, and `Astrareply.md` are migration references, not current runtime instructions. Use `delivery/10_LEGACY_ACCEPTANCE_TEST_CROSSWALK.md` only to inspect the scaffold/no-live-service/negative-scope tests assigned to this first bound. Report contradictions instead of silently restoring an old rule.

### In scope

- Inspect the actual workspace and existing project files first. If implementation source does not exist, create/use `AAP_UI_P1/` (or another explicitly scoped implementation folder) as a sibling of `AAP_Documentation_Reboot/` under the same Project Root. Never place source code inside `AAP_Documentation_Reboot/`. A docs-only starter is expected at this stage. Workspace creation or reorganization is permitted; avoid broad cleanup outside this Task. Follow `delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`.
- Establish React + TypeScript scaffold and a minimal application shell suitable for later slice screens.
- Include scripts for start/dev, production build, type checking, linting and tests when supported by the chosen template. If a script cannot be installed or run, report exact reason instead of creating a script that falsely passes.
- Set up fixture-only data boundaries and a visible `PRIVATE PROTOTYPE · FIXTURE DATA · NOT CONNECTED TO GAME SERVER` label.
- Choose a maintainable source layout and one place for tunable fixture values; add a short local development instruction only if needed to make this task runnable.
- Keep UI English-first and localization-key ready from initial structure.

### Out of scope

- No gameplay screens/flow beyond shell/placeholder.
- No Supabase connection, live database, migrations, backend/API, public Auth/signup, real persistence, server RNG, reward grants/claims, real timers, or real asset/death transaction.
- No deployment/publish, production credentials, monetization or mutation to external service.
- Do not spend the current task implementing `P1-UI-002…008`; list them as next Tasks only after this task passes.

### Required recovery contract for this Task

- Treat reported lint/test failures caused by the current source/config as `CODE_CONFIGURATION_FAILURE` and fix them within the existing scope before asking the owner for environment action. For Biome 2.x, validate the configuration against the installed schema/version; for DOM tests, fix test isolation/cleanup without weakening assertions.
- If a check cannot run, classify the observed reason as `ENVIRONMENT_NETWORK_BLOCKER`, `TOOL_UNAVAILABLE`, or `PERMISSION_AUTH_BLOCKER` only when the evidence supports it. Do not conflate a config diagnostic with a network error.
- After the Agent environment attempt, verify whether the actual repository and an authorized GitHub-hosted runner are accessible. If not, record the observed unavailable reason and provide one consolidated Owner Action set based on this package's real scripts/lockfile. Never stop at “wait for DNS.”
- The Owner Action must identify the current Project Root and `AAP_UI_P1/` working directory, commands and expected outputs, exactly what logs/results to return through the same task/chat or attached files, and the first incomplete criterion where the agent will resume. Do not repeat install requests when the owner has already supplied a successful install in the same unchanged checkout; use its existing dependencies when possible.
- A successful build or ZIP integrity check is not equivalent to acceptance. Report lint, tests, typecheck, scope audit, build and browser separately; any unavailable check remains `BLOCKED`/`NOT RUN`.

### Acceptance checks

- [ ] Actual workspace/repository was inspected; existing files and package manager were not assumed. Input was classified as `DOCS-ONLY`, `IMPLEMENTATION-ONLY`, or `COMBINED`.
- [ ] Baseline documentation/file inventory was recorded; no pre-existing docs or user files were deleted, overwritten, moved or omitted without explicit authorization.
- [ ] React + TypeScript app shell runs in the verified environment, or a precise blocker is recorded.
- [ ] Start/build/type/lint/test scripts correspond to real installed tools and each was actually run where feasible. Biome config matches the pinned/installed major/minor schema, and test cleanup isolates each test without weakening assertions.
- [ ] No source code imports/calls Supabase or an unapproved remote API; no secrets or credentials were added.
- [ ] Prototype boundary is visible in the UI and in developer-facing instructions.
- [ ] English-first localization structure and one canonical fixture location are established.
- [ ] Changed-file list, exact command output, results and first unchecked criterion are recorded in checkpoint.
- [ ] Completion report marks only checks actually executed; no screenshot/browser claim unless a browser was actually used.
- [ ] Primary handoff includes the full `AAP_Documentation_Reboot/` directory and the implementation workspace. A code-only ZIP, if offered, is secondary and labeled clearly.
- [ ] Thai owner-facing Trello report follows `delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`; exact technical errors/commands remain verbatim.

### Environment blocker recovery — Agent → GitHub-hosted environment → owner action

Dependency-install failure is a verification blocker, not an excuse to skip the acceptance gate. Diagnose from actual output: distinguish `CODE_CONFIGURATION_FAILURE` (source/test/package/configuration defect), `ENVIRONMENT_NETWORK_BLOCKER` (network/DNS/registry/runtime access), `TOOL_UNAVAILABLE`, and `PERMISSION_AUTH_BLOCKER`. A package-manager failure is not automatically a code defect, and neither a plan nor a source inspection is proof that the app builds.

**Step A — Agent environment (first).**

1. Record the actual repository root, package manager/runtime versions, install command, lockfile state, and complete relevant error in the task checkpoint. Read `package.json` and the lockfile; do not guess scripts or package manager.
2. If this exact Agent Environment already has a recorded `EAI_AGAIN` and there is no new evidence that DNS/network settings or connectivity changed, **skip installation** and do not repeat `npm ci`/`npm install`; use the verified GitHub-hosted route if accessible, otherwise the one Owner Action on the owner's existing successful checkout. Only when the Agent Environment is not already known-blocked should the correct install command be attempted once. For npm use `npm ci` with a valid committed `package-lock.json`; do not replace a reproducible lockfile install with `npm install` in CI.
3. For a new network/DNS error (`EAI_AGAIN`, `EAI_FAIL`, `ENOTFOUND`, timeout, connection reset, or equivalent), capture the current registry setting and one targeted DNS diagnostic; `npm ping` is optional only if it materially distinguishes the cause and has not already been confirmed. If the diagnostics do not demonstrate recovered connectivity or changed settings, stop installs in that Agent Environment—no retry. Retry only if fresh output proves connectivity/settings actually changed. If output instead indicates dependency conflict, missing script, or source error, diagnose that class directly.

**Step B — GitHub-hosted environment (second).**

4. Check whether the current agent session has real, authorized access to the intended repository and a GitHub-hosted environment or GitHub Actions path. If available, run the same lockfile-respecting install plus the actual typecheck/lint/test/build scripts defined by the project. Capture the run URL/ID or exact output and the commit SHA tested.
5. Do not claim a GitHub attempt if only the GitHub plugin is installed/listed, the repo cannot be accessed, or authorization is missing. Record `GITHUB FALLBACK: UNAVAILABLE` with the observed reason. Do not push/commit, change repo settings, or create secrets merely to force CI unless permitted by the owner. Do not delete/regenerate lockfiles, switch registry/mirrors, disable TLS verification, or use unverified package downloads.

**Step C — one consolidated Owner Action Task (third).**

6. If the Agent environment and the available GitHub-hosted path both fail, or GitHub is verifiably unavailable, stop automated retries for the same blocker in this Task. Preserve work and keep `P1-UI-001` `Blocked`. Send one **Owner Action Task** with: (a) exact blocker and error; (b) workspace/checkout/commit identity known; (c) a short, ordered command list derived from the actual `package.json`, lockfile and scripts; (d) expected success signal for each command; (e) exactly which output the owner should copy back; and (f) safe instructions such as not to delete lockfiles or paste secrets. If the path is Windows PowerShell, state where the terminal should be opened based on a real path; never invent a local path.
7. Send this request once per distinct blocker per Task, not once per command/tool call. Do not ask the owner to repeat commands whose full failure output is already available. Request another command only when new output points to a materially different, specific diagnostic. Use the existing Task/Trello card by default; do not create duplicate owner-action cards.
8. When the owner returns output, inspect it and resume this same Task from the first incomplete acceptance check. If commands ran against a different checkout/commit, treat results as environment diagnostics until the tested code matches the agent's work. Never mark `Done` or start `P1-UI-002` merely because fallback attempts were made.

After dependencies can be installed in the target checkout, run the actual available typecheck, lint, tests, production build, and dev-server/browser smoke checks. Report each separately. An unavailable browser tool is `NOT RUN`, not PASS. Until evidence exists, acceptance remains `BLOCKED`/`NOT RUN`.

### Checkpoint / resume

A blocker must never be handed off as “wait until DNS returns” without a usable alternative. Before stopping, document the recovery alternatives actually checked and attach one consolidated Owner Action set with working directory, ordered commands, expected output/exit codes, requested outputs and return channel, checkpoint path, first incomplete criterion and resume condition. Do not request reinstallation when owner evidence shows a successful install in the same checkout and the lockfile remains unchanged.

Record the implementation path; package manager/runtime versions; install/build/type/lint/test commands and outputs; files changed; current diff; any blocker; first incomplete acceptance check; and next task ID `P1-UI-002` only if this task is accepted. If an existing checkpoint says `P1-UI-001` is `Blocked` by registry/DNS, resume this task from that checkpoint and retain all verified work; do not recreate the scaffold or start `P1-UI-002`. Never mark this task complete from source inspection alone when a runnable environment is available.

### Completion report

Report one combined ZIP path containing docs + implementation + checkpoint/evidence, changed paths, commands actually run, results, relevant screenshots (if browser tool available), unresolved blockers, Trello sync truth, and whether this Task is `Ready for Review`, `Blocked`, or `Accepted`. If the platform cannot create a combined ZIP, explain the exact constraint and report the split outputs as an exception. **Stop after P1-UI-001.**


### Latest owner verification — 2026-10-26 (current source)

The owner supplied the actual Windows result in Trello comment `6adf5099d23be278f9806642` and `evidence/owner-final-source-recheck.txt`. SHA-256 for `package-lock.json`, `biome.json`, `src/test/setup.ts`, `src/App.tsx`, `src/App.test.tsx`, and `src/styles.css` was compared to the uploaded `AAP1.2.zip` and matched exactly.

Results on this source revision: `node --check` PASS (0); `npm.cmd run lint` PASS (0) with four warnings for `!important` in reduced-motion CSS and no errors; `npm.cmd test` PASS, 4/4 tests; `npm.cmd run typecheck` PASS (0); `npm.cmd run audit:scope` PASS (0); `npm.cmd run build` PASS (0; Vite 8.3.5, 28 modules transformed). PowerShell emitted native stderr warning formatting, but the explicit Lint exit code was 0. Assertions remain unchanged.

**Latest acceptance result (2026-10-26):** The owner supplied a composite Browser screenshot, inspected and preserved as `../../evidence/browser-smoke-combined.png`. The right panel shows the root shell and required boundary banner; the left panel shows the unknown-route placeholder and `Return to shell`. Both rendered UI-state checks are PASS. The address bar/full pathname is not visible, and this evidence limitation is recorded in `../../evidence/browser-smoke-evidence.md`. Combined with the hash-verified code checks and documentation/package audits, `P1-UI-001` is accepted for the bounded scaffold/shell scope. `DOC-WF-001` is complete. Do not start `P1-UI-002` automatically; wait for explicit owner instruction.
