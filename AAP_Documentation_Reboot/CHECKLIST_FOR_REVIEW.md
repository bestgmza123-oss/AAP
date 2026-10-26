# Review Checklist — Documentation Baseline

## Persistent Environment Blocker rule

Do not retry `npm ci`/`npm install` in the same Agent Environment after `EAI_AGAIN` has been evidenced unless a new diagnostic proves DNS/network configuration or connectivity changed. Record this as `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`), not `CODE_CONFIGURATION_FAILURE`, and do not claim that the whole ChatGPT service is down. Check real authorized GitHub Actions access; if unavailable, provide one consolidated Windows Owner Action for the existing checkout. Keep already-installed dependencies when `package-lock.json` is unchanged. The returned transcript and browser evidence resume this Task at its first incomplete acceptance criterion; do not start the next Task or ask for periodic duplicate tests.

Use this before accepting any substantial documentation change.

## Feature preservation
- [ ] All 33 SYS topics still exist in `product/04_SYSTEMS_MAP.md` and `systems/`.
- [ ] Later-phase features remain deferred, not deleted.
- [ ] Launch-excluded paid flows and not-approved content stay explicitly excluded.

## Authority and drift
- [ ] Each current gameplay rule has one owning system.
- [ ] AI-DEC is not labelled owner-confirmed.
- [ ] Historical runtime status was not copied as current evidence.
- [ ] Later owner direction wins over conflicting legacy text.
- [ ] No ambiguous rule was silently resolved by dropping a feature or changing ownership/death consequences.

## Cross-system semantics
- [ ] Run/Combat/Loot/Escape/Surrender agree.
- [ ] Time/Hunger/Fridge/Death/Simulation event order agrees.
- [ ] Item weight/capacity/escrow/claim/storage agree.
- [ ] Character death/Account balances/market escrow/delivery/Companion/Guild custody agree.
- [ ] Housing expiry/death/Fridge/overflow agree.

## Experience quality
- [ ] English-first and localization keys are consistent.
- [ ] UI-Driven requirements start in Phase 1.
- [ ] Screen flows, responsive behavior and state handling are described.
- [ ] Hunger is unambiguously 100=fed and 0=death.

## Environment-recovery workflow
- [ ] Owner Action paths were derived from actual owner output/workspace; no runnable command contains literal placeholders like `C:\path\to\...`; if a path was unknown, a discovery command was requested first.
- [ ] When an owner-facing action failed because of the instruction itself (placeholder/wrong relative path), the same Owner Action and existing Thai Trello comment were corrected before asking the owner to retry.

- [ ] After a proven `EAI_AGAIN` in the current Agent Environment, no `npm ci`/`npm install` retry is made there unless fresh evidence proves connectivity/settings changed.
- [ ] The blocker is recorded as `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`), separate from `CODE_CONFIGURATION_FAILURE`; no ChatGPT-wide outage is inferred from a registry/DNS failure.
- [ ] The Owner Action is one Windows command set against the existing checkout, skips install when required tools are present and `package-lock.json` is unchanged, and tells the owner exactly which transcript/screenshots to return.
- [ ] Dependency failure is classified from actual output; a network/DNS error is not silently called a code defect or a passed build.
- [ ] Agent environment is tried first without repeated identical retries.
- [ ] An actually available, authorized GitHub-hosted environment/Actions path is tried second; unavailable access is reported truthfully.
- [ ] If both paths fail or GitHub is unavailable, exactly one consolidated Owner Action Task is sent with exact commands, expected results, workspace identity and output-return instructions.
- [ ] The existing task/card stays Blocked until acceptance evidence exists; do not skip criteria or spawn duplicate owner-action cards.
- [ ] No lockfile deletion, unapproved registry/mirror switch, TLS bypass, secret sharing, or unauthorized push/settings change was used as a workaround.
- [ ] Blocker class is evidenced and distinguishes code/configuration, network/environment, unavailable tool, and permission/auth failure.
- [ ] The agent checked practical alternatives; no handoff tells the owner only to wait for DNS/network recovery.
- [ ] If Agent checks cannot run, repository/Actions access is verified or marked `UNAVAILABLE` with observed reason.
- [ ] Exactly one actionable Owner Action set exists per blocker: working directory, ordered commands, expected outputs, output-return method, checkpoint path and resume condition.
- [ ] Successful owner installation/checks are not requested again unless a specific technical reason is recorded; results are matched to the exact source revision.
- [ ] Trello `Blocked` card is Thai and includes Task ID, passed/failed/NOT RUN, evidence/error, exact commands and expected results, requested outputs, checkpoint/Owner Action path, and resume point. If unavailable, `TRELLO SYNC: NOT SYNCED` plus copyable Thai update is provided.
- [ ] A successful ZIP, build or one passing check is not misreported as full Task acceptance; each acceptance check is reported separately.

## Repository-first workflow automation and same-revision gate

- [ ] Verify a canonical repository URL directly with `get_repo` whenever the owner/docs/Trello already provide one; do not infer repository absence from an empty list/search. Record existence, empty/populated state, default branch and actual permission fields. If the repo exists but is empty, use one bootstrap action from the canonical source; if it is inaccessible, use one authorization action. Verify write capability instead of assuming it from profile authentication alone.
- [ ] When accessible, changes are on a named Task branch with a commit SHA and PR; the base repository/default branch is verified rather than guessed.
- [ ] CI derives commands from the real `AAP_UI_P1/package.json`: `npm ci`, `npm run lint`, `npm test`, `npm run typecheck`, `npm run audit:scope`, and `npm run build`. Node version is compatible with `engines`; npm cache key uses the committed lockfile.
- [ ] Playwright was added only when its package/config/test are included in the same commit and `package-lock.json` is updated by npm in an allowed environment. Browser smoke checks `/` for the boundary banner/shell and `/not-yet-implemented` for the placeholder/return link; no gameplay/backend/API/database/Supabase is added.
- [ ] On Playwright/CI failure, a real GitHub Actions artifact contains the HTML report, screenshot(s), and trace(s) when generated. Artifact URL/run SHA are recorded; absence is not called a pass.
- [ ] PR head SHA, the tested workflow-run SHA, reviewed diff, and checkpoint/handoff evidence are identical. If a new commit changes the head, rerun its required checks and review.
- [ ] Required status checks are enabled only after exact check names are present in real successful workflow runs, permission to change rules exists, and the final branch-protection/ruleset configuration is read back. No bypass/merge over a missing or failing gate.
- [ ] Trello is updated in Thai with repository/branch/commit/PR/CI/artifact links and one actionable next step. Do not invent links or run outcomes; use `NOT RUN`, `NOT VERIFIED`, or `TRELLO SYNC: NOT SYNCED` as warranted.
- [ ] ZIP is used only for milestone/release, explicit owner request, or a documented repository-access fallback. Routine tasks use branch/commit/PR/CI as the canonical handoff.
- [ ] At most one consolidated Owner Action exists for a specific blocker. It has exact UI steps or commands, expected result, exact return item/channel, checkpoint, and resume condition. Do not request repetitive ZIP uploads/transcripts when repository/CI artifacts are accessible.

## Project workspace and repository-first handoff
- [ ] Input bundle is classified as `DOCS-ONLY`, `IMPLEMENTATION-ONLY`, or `COMBINED` from its actual contents; a docs-only starter is expected before source code exists.
- [ ] The actual project/workspace and relevant Git status/diff (if available) are inspected before editing.
- [ ] Workspace creation or reorganization is not incorrectly reported as document deletion.
- [ ] Routine handoff points to the actual repository, Task branch, commit SHA, PR, CI run and artifacts; Test, Review and Handoff identify the same source revision.
- [ ] Create one combined docs+code ZIP only for a milestone/release, explicit owner request, or a documented repository-access fallback; do not create a ZIP for each routine task.
- [ ] When a ZIP is justified, check its inventory, Markdown links/anchors, manifest/checksums and archive integrity before delivery.
- [ ] Owner-facing Trello status/progress/blocker/evidence/handoff is Thai per `delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`, without changing exact Task IDs, paths, commands or errors.

## Delivery integrity
- [x] The canonical `AAP_Documentation_Reboot/` subtree contains documentation only; implementation code belongs in a sibling workspace under the same Project Root. This does not authorize deletion/omission of documentation from a combined implementation handoff.
- [ ] Phase 1–2 marked private/internal only.
- [ ] Public/shared release is no earlier than Phase 3 and remains gate-controlled.
- [ ] Phase exit depends on evidence, not prose status or absence of `OPEN`.
- [ ] Task brief has explicit read list, scope, exclusions, acceptance and report.

## Source-to-acceptance traceability
- [ ] Every system-owner document records source/decision provenance without copying a second full ruleset.
- [ ] Each acceptance criterion has an identifiable source/owner instruction or is explicitly labelled as a derived design decision awaiting review.
- [ ] Every acceptance criterion maps to a concrete executable/manual check, expected result, and evidence location before implementation completion is claimed.
- [ ] AI-selected defaults, owner-confirmed decisions, prototype parameters, phase deferrals, and runtime evidence are labelled separately.
- [ ] No decision-register summary is cut off or used as the implementation authority; it points to the canonical owner instead.
- [ ] Filename is the human-readable system name; `SYS-xx` remains stable in the document heading and traceability index.
- [ ] Audit covers both presence and behavior: a row count or link scan does not establish semantic completeness.

## DOC-001 completion checklist (scoped)

- [x] 33/33 descriptive system owner files linked from systems map.
- [x] Key cross-system risks have a disposition in `decisions/02_RECONCILIATION_LOG.md`.
- [x] UI prototype criteria `UI-P1-01…UI-P1-16` map to source anchors and verification/evidence expectations.
- [x] Phase 1 wireflow exists and matches prototype scope.
- [x] Next task brief `delivery/07_P1_UI_PROTOTYPE_TASK.md` is bounded.
- [x] UI prototype implementation and browser evidence (P1-UI-001; not part of DOC-001).


## Source-version reconciliation (v0.1.7)

- [ ] Verify source fingerprints in `decisions/03_SOURCE_COVERAGE.md` against the exact Beta archive, latest legacy `SOURCE_OF_TRUTH.md`, `Doc.md`, and `Astrareply.md` supplied for the review.
- [ ] Confirm all 66 Beta Q/OI IDs and all later-SoT-only Q/OI IDs have explicit dispositions; do not infer that a missing literal ID means the feature is absent or resolved.
- [ ] Confirm Q-08's AI-selected safe-logout baseline remains aligned with SYS-28 and that Phase 3 runtime checks remain a hard gate; legacy AI-DEC status/phase labels must not override current Roadmap/owner docs.
- [ ] Confirm React/TypeScript + Supabase provenance is preserved without claiming live project/provider/security verification, and P1 UI task remains local-fixture-only.
- [ ] Confirm score/rating was not saved into any project file.


## v0.1.8 phase/bound review additions

- [ ] Confirm each phase has a source/semantic preflight before implementation (`*-GATE-000` for Phase 2–6).
- [ ] For every relevant legacy test row, link exact current `AC-SYS`/`UI-P1` criterion or record explicit disposition before marking acceptance.
- [ ] Treat all 379 legacy §10 rows as `NOT RUN IN REBOOT` until executed; do not inherit old status.
- [ ] Confirm every Task stops at its own boundary and hands off inspectable evidence/checkpoint.
- [ ] Do not interpret task-matrix completeness as code/runtime or public-release readiness.

## DOC-WF-001 — Blocker/Owner Action acceptance

- [ ] Blocker class chosen from actual evidence: `CODE_CONFIGURATION_FAILURE`, `ENVIRONMENT_NETWORK_BLOCKER`, `TOOL_UNAVAILABLE`, `PERMISSION_AUTH_BLOCKER`; task status `ENVIRONMENT_BLOCKED` used only when environment prevents a check.
- [ ] Known `EAI_AGAIN` is not retried in the same Agent Environment without new network/DNS evidence; valid lockfile is preserved.
- [ ] An actual authorized GitHub-hosted fallback was verified where practical; otherwise `GITHUB FALLBACK: UNAVAILABLE` and reason are recorded.
- [ ] Owner Action has no illustrative/guessed path in runnable commands and includes Terminal/working directory, commands in order, expected outputs, exact return files/channel, checkpoint and resume criterion.
- [ ] If a prior action failed due to instructions, the existing Owner Action and Thai Trello comment were corrected before asking for another run.
- [ ] Owner is asked for one consolidated output batch per relevant source revision, not periodic duplicate checks.
- [ ] Trello is Thai and includes passed/failed/NOT RUN; if integration write fails, `TRELLO SYNC: NOT SYNCED` plus copyable content is supplied.
- [ ] `PASS` claims refer to inspected output for the exact source revision. ZIP integrity/build success alone does not close a Task.
- [ ] `DOC-WF-001` is complete before any `P1-UI-002` start; no next Task is started automatically.

## Current UI checkpoint — code checks and Browser visual evidence reviewed

For the hash-verified source in `AAP1.2.zip`, the owner's latest Windows results are: `node --check` PASS (0); Biome lint PASS (0, four warnings only in reduced-motion CSS); Vitest PASS (4/4); Typecheck PASS (0); Scope Audit PASS (0); production Build PASS (0). Do not ask for these checks to be repeated without a source/configuration/environment change.

The owner-provided Browser composite was reviewed: the right panel shows the root shell, `P1-UI-001`, and the required boundary banner; the left panel shows `Route not implemented` and `Return to shell`. Both rendered UI states are PASS. The full pathname is not visible in browser chrome; see `evidence/browser-smoke-evidence.md`. `P1-UI-001` is accepted for the bounded scaffold/shell scope. `DOC-WF-001` is complete; do not start `P1-UI-002` automatically; wait for explicit owner instruction.


## Workflow Automation & GitHub CI Setup — current checkpoint (2026-10-26)

- [x] GitHub profile lookup returned a connected identity.
- [x] Bounded repository list and exact AAP/Anime Apocalypse searches returned zero repositories; GitHub App installation listing returned zero installations.
- [x] The extracted project directory was checked and is not a Git repository.
- [x] Exact repository URL and metadata permissions verified directly (`bestgmza123-oss/AAP`, Public, `main`, `admin=true` / `push=true`); remote is empty, so the remaining bootstrap blocker is first source commit.
- [ ] Task branch, commit, PR, real Actions run/artifacts, Playwright job and required status checks: `BLOCKED` / `NOT RUN` until the initial source is pushed and real runs/check names exist.
- [x] Exactly one repository-bootstrap Owner Action is documented at `../evidence/OWNER_ACTION_GITHUB_REPOSITORY_TH.md`; no reconnection/authorization request is needed for the directly verified repository.
- [ ] Do not begin `P1-UI-002` automatically.
