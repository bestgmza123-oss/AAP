# Trello Owner-Output Language Rule

## Known Agent DNS blockers

When `EAI_AGAIN` has already been recorded in the Agent Environment, the Thai `Blocked` card must not request repeated `npm ci`/`npm install` in that same environment absent evidence of changed connectivity/settings. Label the cause `ENVIRONMENT_BLOCKED` (`ENVIRONMENT_NETWORK_BLOCKER`) and distinguish it from code/configuration failures. Do not infer a ChatGPT-wide outage. If real authorized GitHub Actions access is unavailable, give one Windows command sequence against the existing owner checkout; skip install if its required tools are present and the lockfile is unchanged. A card must specify expected results, transcript/screenshots to return, and the exact same-Task resume point.

**Purpose:** Keep the task board easy for the Thai-speaking owner to review without changing canonical task identifiers or exact technical evidence.

## Language contract

- Owner-facing text on Trello must be **Thai**: progress summary, current status explanation, blocker, completed/pending work, requested owner action, evidence captions and review handoff.
- Keep canonical Task IDs and technical task titles (for example, `P1-UI-001 — Frontend scaffold and shell`) unchanged so they remain stable across docs, commits and search. Keep standard board-list names such as `Backlog`, `Ready`, `In Progress`, `Review`, `Blocked`, and `Done` unchanged unless the owner explicitly changes the board taxonomy.
- Keep commands, error strings, file paths, branch/commit IDs, test names and identifiers verbatim where needed for accurate copy/paste and diagnosis. Add Thai explanation around them; do not translate or paraphrase away the exact error.
- Agent-facing implementation specifications may remain English when that is the canonical specification language. The rule applies to the owner-facing report layer, not the in-game localization baseline (which remains English-first).

## Required shape for a card update

Put a concise Thai summary first, then include the relevant items:

1. **สถานะ:** `In Progress`, `Blocked`, `Review`, or another observed board state.
2. **ทำแล้ว:** only the work actually completed.
3. **ยังไม่ผ่าน / ยังไม่ได้ตรวจ:** checks or acceptance criteria without evidence.
4. **ปัญหาหรือสิ่งที่ต้องทำต่อ:** exact blocker and the next safe action, including which action belongs to the owner if needed.
5. **หลักฐาน:** command/result, CI run URL, checkpoint, screenshot or file path actually inspected.

Do not paste secrets, credentials, tokens or `.env` content. If a command fails, preserve the first useful full error and the command that produced it.

## Synchronization truth and update frequency

- At the start of each tracked Task, check whether an authorized Trello action tool is actually available in the current agent session. If available, use it directly; search the board and Task ID before creating any card, then update the existing card.
- Update only at meaningful state changes: task start, transition to/from `Blocked`, evidence-ready handoff to `Review`, or owner-returned evidence. Do not post a new comment for every command/tool call.
- If the tool, board, or write permission is unavailable, state `TRELLO SYNC: NOT SYNCED` and give a Thai copyable update. Do not claim that opening Trello in a browser or installing a plugin elsewhere means a sync occurred.
- `Review` means implementation evidence is ready for owner inspection. `Done` means the owner has accepted the required evidence. Never mark a check complete because a script exists or an agent says it should pass.
- Do not create duplicate cards for the same Task ID. Do not change or delete unrelated cards.

## Required fields when a card is `Blocked`

A blocked card that requires owner action must be actionable without another clarification round. In Thai, include all of the following while preserving copyable technical strings:

- Task ID and observed board-list status.
- What passed, what failed, and what is `NOT RUN`/`BLOCKED`; never infer full acceptance from a single passing command or ZIP integrity.
- Evidence-based blocker class (`CODE_CONFIGURATION_FAILURE`, `ENVIRONMENT_NETWORK_BLOCKER`, `TOOL_UNAVAILABLE`, or `PERMISSION_AUTH_BLOCKER`) and exact error/exit code.
- Actual Project Root and working directory known from the package/session.
- One ordered command sequence copied from the actual scripts/lockfile, with expected exit code/result after each command.
- Exact output/log/screenshots to return and how to return them (reply in this Task/chat or attach named files). Never ask for secrets.
- Relevant Checkpoint and Owner Action path; the first incomplete acceptance criterion and the condition for resuming the same Task.
- State whether authorized GitHub-hosted/Actions access was verified; if not available, say `GITHUB FALLBACK: UNAVAILABLE` and why.

Do not leave the owner with only “wait for DNS” or ask them to repeat an install/check already known to have succeeded in the same unchanged checkout. If Trello tools/board/write permission are unavailable, say `TRELLO SYNC: NOT SYNCED` and provide copyable Thai card text.

## Copyable Thai update template

```text
สถานะ: [In Progress / Blocked / Review]

สรุป: [ผลที่ตรวจพบจริงหนึ่งหรือสองประโยค]

ทำแล้ว:
- [งานที่เสร็จจริง พร้อมหลักฐาน]

ยังไม่ผ่าน/ยังไม่ได้ตรวจ:
- [เกณฑ์และเหตุผล; ระบุ NOT RUN หากยังไม่ได้รัน]

ปัญหา/สิ่งที่ต้องทำต่อ:
- [error จริง + ขั้นตอนถัดไป หรือคำสั่งสำหรับเจ้าของ]

หลักฐาน:
- [checkpoint, command output, CI URL, screenshot หรือ path ที่ตรวจได้]

TRELLO SYNC: [SYNCED only after the action succeeded / NOT SYNCED + observed reason]
```

Canonical related workflow: [`06_TASK_BOARD_WORKFLOW.md`](06_TASK_BOARD_WORKFLOW.md). When repository integration works, cards link the real repository, branch, commit SHA, PR, CI run and artifacts; Trello is the Thai status dashboard, not a manual source-file relay. Do not invent missing links or run results. Repository-first handoff and the milestone/release ZIP exception are governed by [`12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`](12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md).


## Step-action errors and hand-holding (mandatory)

When a user reports that a command failed because a prior Owner Action used a placeholder path, wrong working directory, or incorrect relative path, do not merely repeat the command. Treat it as an instruction defect, read the owner's actual output, and update the existing Task comment in Thai with: (1) what the output proves, (2) the exact cause in plain language, (3) the corrected full path/commands in copyable order, (4) what success should look like, (5) what to send back if it fails. Prefer the known real path over asking the owner to edit placeholders. If the path is not yet known, provide one discovery command first; do not pretend the subsequent path is known. Keep the same Task/card and status; do not create duplicate cards or ask for a repeated action before correcting the instructions.

## Step-action failure recovery (DOC-WF-001)

When the owner posts a failed command output, update the existing Task comment/card with the diagnosis and corrected Thai instructions. Use real paths observed in that output. Include a copyable full command block, exact expected success signal, what output/file to send back if it still fails, and the resume point. Never leave placeholders in runnable commands, never imply a Trello update unless the write succeeded, and never ask for the same install/check again when its successful output is already available. For unavailable Trello write access, provide the full text and state `TRELLO SYNC: NOT SYNCED`.
