# DOC-WF-001 — Environment Blocker, Owner Action and Trello Workflow Hardening

**Status:** `COMPLETE` — the bounded documentation task is implemented and static-audited in this handoff.  
**Task boundary:** Documentation/workflow only. No gameplay feature, backend/API/Supabase, persistence, deploy or `P1-UI-002` implementation is authorized by this task.  
**Pre-next-task gate:** Complete before any `P1-UI-002` begins. Completion of this document task does **not** start `P1-UI-002`; `P1-UI-001` must first pass its own Acceptance Criteria, and the owner must explicitly request the next Task.

## Objective

Make Blocked states actionable and resumable. Do not leave the owner waiting for an environment to recover without a concrete alternative, and do not re-request a successful action whose full output is already available.

## In scope

- Permanent rules in `AGENTS.md`, `rules/01_GLOBAL_INVARIANTS.md`, `delivery/06_TASK_BOARD_WORKFLOW.md`, `delivery/08_REUSABLE_PROMPTS_TH.md`, `delivery/02_TASK_TEMPLATE.md`, `delivery/03_NEXT_TASK.md`, `delivery/07_P1_UI_PROTOTYPE_TASK.md`, `delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`, `delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`, `CHECKLIST_FOR_REVIEW.md`, `OWNER_SUMMARY_TH.md`, the canonical README, and the reconciliation log.
- One consolidated Thai Owner Action Task and a readable Trello update.
- A checkpoint and repeatable static verification for policy consistency, links and the documentation-only folder boundary.

## Permanent rules now in force

1. Classify blockers from evidence as `CODE_CONFIGURATION_FAILURE`, `ENVIRONMENT_NETWORK_BLOCKER`, `TOOL_UNAVAILABLE`, or `PERMISSION_AUTH_BLOCKER`. `ENVIRONMENT_BLOCKED` is the task status when the environment prevents a required check; it is not the same as a code failure.
2. After `EAI_AGAIN` is established in an Agent Environment, stop `npm ci`/`npm install` retries there unless a new diagnostic proves connectivity/DNS settings changed. Never infer a ChatGPT-wide outage from a registry-specific error. Check a real authorized GitHub Actions path only when the repository and permission actually exist. If unavailable, record the observation and use the owner's existing successful Windows checkout.
3. One Owner Action set per distinct blocker per Task. Name the actual Project Root and working directory (or provide one discovery command if truly unknown), exact ordered commands, expected result/exit code, exact files/output to return, return channel, checkpoint, first incomplete criterion and resume condition. Do not reinstall when binaries already work and the lockfile is unchanged.
4. Owner Action path preflight is mandatory. Never put example placeholders such as `C:\path	o\...` into a ready-to-run command. If an earlier instruction has a wrong path or creates an error, own the instruction defect, update the same Owner Action and existing Trello comment with the corrected full command, expected output, cause in plain Thai and exactly what to return. Do not ask the owner to repeat a failed step before correcting it.
5. Trello Blocked fields and handoff explanations are Thai. Preserve commands/errors/Task IDs literally. If the integration cannot actually write, say `TRELLO SYNC: NOT SYNCED` and supply copyable card text.
6. `PASS`, `FAIL`, `BLOCKED`, and `NOT RUN` are independent statuses. ZIP integrity, a present test file or a passing build does not prove Lint, Tests or Browser acceptance.
7. A task resumes at its first incomplete criterion after source identity/checkpoint reconciliation. No automatic next-task start. Complete DOC-WF-001 before P1-UI-002; P1-UI-001 must independently pass before the owner asks to begin P1-UI-002.

## Acceptance criteria and verification

- [x] Blocker classification and no-retry rule documented in global AI/workflow instructions.
- [x] Agent → verified GitHub-hosted path when available → one consolidated Owner Action is documented.
- [x] Owner Action requires actual path preflight, expected output, requested files and a same-Task resume point.
- [x] Trello Thai-language requirements and `TRELLO SYNC: NOT SYNCED` fallback are documented.
- [x] Task template, reusable prompts, task brief, handoff and review checklist point to the same rules.
- [x] Documentation-only subtree boundary is preserved; implementation remains a sibling folder.
- [x] Current next-task pointer explicitly blocks automatic P1-UI-002.
- [x] Relative Markdown links, documentation folder file types, rule markers and package hashes verified; see `../../evidence/DOC-WF-001_CHECKPOINT.md`.

## Files changed by this bounded task

`AGENTS.md`; `rules/01_GLOBAL_INVARIANTS.md`; `delivery/02_TASK_TEMPLATE.md`; `delivery/03_NEXT_TASK.md`; `delivery/06_TASK_BOARD_WORKFLOW.md`; `delivery/07_P1_UI_PROTOTYPE_TASK.md`; `delivery/08_REUSABLE_PROMPTS_TH.md`; `delivery/11_TRELLO_OWNER_OUTPUT_LANGUAGE.md`; `delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`; `CHECKLIST_FOR_REVIEW.md`; `OWNER_SUMMARY_TH.md`; `README.md`; `decisions/02_RECONCILIATION_LOG.md`; `PACKAGE_MANIFEST.md` and this task record.

## Stop condition

This bounded documentation task is complete after its static audit passes and the combined ZIP manifest/checksums are regenerated. Stop here. Do not begin `P1-UI-002` automatically.
