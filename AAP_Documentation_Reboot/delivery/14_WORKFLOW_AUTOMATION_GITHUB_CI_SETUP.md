# Workflow Automation & GitHub CI Setup

## Task contract

- **Task ID:** `Workflow Automation & GitHub CI Setup`
- **Status:** `Blocked` — `REPOSITORY_EMPTY_BOOTSTRAP_BLOCKER` (existing repository and write permissions confirmed; initial source commit still required)
- **Purpose:** Make the existing AAP repository, commit history, pull requests and GitHub Actions the routine implementation/review/handoff path so the owner is not a manual bridge among Agent, Windows, ZIP and Trello.
- **Source authority:** Current AAP package in this project root, particularly `AGENTS.md`, `delivery/03_NEXT_TASK.md`, `delivery/06_TASK_BOARD_WORKFLOW.md`, `delivery/08_REUSABLE_PROMPTS_TH.md`, `delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`, `CHECKLIST_FOR_REVIEW.md`, and the existing `AAP_UI_P1/package.json` + `package-lock.json`.
- **Game-rule changes:** None authorized. This is workflow/tooling only. Do not edit game systems, mechanics, balance, feature scope, or backend contracts.
- **Next-task control:** Do not start `P1-UI-002` automatically.

## Verified preflight — 2026-10-26

| Check | Result | Evidence |
|---|---|---|
| GitHub profile/tool authentication | `PASS` — an authenticated profile result was returned | GitHub connector profile lookup in this task |
| Repository list, first page (100 max) | `PASS` for the query; zero repositories returned | `../../evidence/github-repository-access-check.md` |
| Bounded repository search for `AAP` | `PASS` for the query; zero repositories returned | Same evidence report |
| Bounded repository search for `Anime Apocalypse` | `PASS` for the query; zero repositories returned | Same evidence report |
| GitHub App installation list | `PASS` for the query; zero installations returned | Same evidence report |
| Local extracted Project Root | `BLOCKED` as a Git checkout; `git status` returned `fatal: not a git repository` | Same evidence report |
| Direct URL `https://github.com/bestgmza123-oss/AAP` | `PASS` — existing public repository | `get_repo` returned repository metadata |
| Default branch / reported write permissions | `PASS` — `main`, `admin=true`, `push=true` | Direct repository metadata |
| Repository content | `BLOCKED` — `size=0`, Contents API reports empty repository | No source commit exists to branch from |
| Branch, commit, PR, workflow run, CI artifacts | `NOT RUN` — remote repository is empty | Do not invent results; initial source push required |
| Branch protection / required status checks | `NOT VERIFIED` — no workflow run/check names exist yet | Configure/read back only after actual run and permission check |
| Playwright dependency/config/test | `NOT RUN` — requires an authorized repository branch and a lockfile update in a permitted environment | Do not retry dependency installation in the already DNS-blocked Agent environment without new network evidence |
| Trello write/sync | `PASS` — this task's card is tracked on `AAP Development` | Trello card URL in checkpoint/report |

The global repository list and bounded searches did not surface AAP, but the owner then provided `https://github.com/bestgmza123-oss/AAP` and a direct `get_repo` succeeded. The existing repository is Public, `main` is the default branch, and the connector reports `admin=true`/`push=true`; `size=0` and the Contents API error “This repository is empty” confirm it has no seed commit or source files. Therefore the correct blocker is initial source bootstrap, not repository absence or authorization. Never infer absence from list/search alone when a canonical URL is supplied. The exported workspace is not a Git checkout. No repository was created, guessed or claimed. No dependency install was retried.

## Scope

### In scope

1. Change workflow documentation to make repository branch/commit/PR/Actions the routine handoff when actually available.
2. Keep Trello as a Thai status/dependency dashboard and link real repository/PR/CI/artifact records rather than copying source/test output as the long-term process.
3. Once authorized repository access is effective, create one bounded branch and implement CI with Node/npm version compatible with `AAP_UI_P1/package.json` `engines`, `actions/setup-node`, npm cache keyed to `AAP_UI_P1/package-lock.json`, `npm ci`, and the scripts that truly exist: `lint`, `test`, `typecheck`, `audit:scope`, `build`.
4. Add Playwright browser smoke only in the authorized repository and with the test dependency/config committed to the same revision. Test `/` (fixture boundary banner and shell) and `/not-yet-implemented` (placeholder and return-to-shell link). Upload HTML report, screenshots and traces as GitHub Actions artifacts when the browser job fails.
5. Run the actual workflow; record commit SHA, run URL/status and artifact URLs. Only configure Required Status Checks if repository permissions allow and the exact check names have real runs; read back protection/ruleset configuration afterward.
6. Verify and preserve one source revision across PR head SHA, CI run SHA, reviewed diff and checkpoint. If a new commit changes source, its checks/review must be rerun.
7. Update the existing canonical policy docs and checklist without editing any game specification.

### Out of scope

- Any gameplay/UI product work for `P1-UI-002` or later tasks.
- Changes to game rules, balance, phase placement, API/backend/database/Supabase, secrets, deployment or production release.
- Creating a replacement GitHub repository, using a guessed URL, asking the owner to paste credentials, or bypassing a failing/missing check.
- Retrying `npm ci`/`npm install` in the current Agent environment after the previously evidenced `EAI_AGAIN` without new diagnostic evidence that connectivity/settings changed.
- Marking CI, Playwright, branch protection or Required Status Checks `PASS` before an actual result/read-back exists.

## CI / Browser plan after the initial source commit is pushed

1. Verify repository URL, default branch, actual repository read/write permission, and whether GitHub Actions/workflows are enabled. Create a Task branch from the verified default branch; do not commit to the default branch directly.
2. Add a GitHub Actions workflow that triggers on pull requests and relevant pushes. Use `actions/checkout`, `actions/setup-node` with Node 22 compatible with the declared `>=22.12.0` engine, npm cache and `cache-dependency-path: AAP_UI_P1/package-lock.json`. In `AAP_UI_P1/`, run `npm ci` then each package script separately: `npm run lint`, `npm test`, `npm run typecheck`, `npm run audit:scope`, and `npm run build`.
3. Add `@playwright/test`, its npm script, config and two route smoke tests on that same branch; let npm update `package.json` and `package-lock.json` in the working repository/authorized environment. Use the local Vite app only. Install Chromium in the GitHub runner as part of the browser job. Do not use the known-blocked Agent DNS environment to retry an install.
4. Preserve Playwright `playwright-report/`, `test-results/` screenshots and traces; on failure upload them as a workflow artifact with a predictable name including the commit SHA/run attempt. A real successful run must also be captured as evidence; YAML alone does not satisfy acceptance.
5. Inspect each run result and its commit SHA. If checks pass, obtain exact stable job/check names from the real run. If permitted, configure those as required checks on the verified default branch and retrieve the settings to prove they are active. If permissions are insufficient, record `NOT CONFIGURED` and give the actual repository owner/admin the exact setting names/action.
6. Open a PR and review its diff. CI run SHA and PR head SHA must match. Update the same Trello card with URLs for the repository, branch, commit, PR, run, artifacts and next action.


### Integration write capability note

The official [Connecting GitHub to ChatGPT guide](https://help.openai.com/en/articles/11145903-connecting-github-to-chatgpt) describes the standard connected app as read-only for code changes and directs users to Codex for direct code pushes. In this session, direct `get_repo` for the owner-provided URL reports `admin=true` and `push=true`; however, no write operation against a seeded branch has yet been tested because the repository is empty. After the one-time initial source push, verify the actual branch/ref operations and real workflow results before claiming the path is working end to end. Do not claim a PR or CI pass until the tool returns a real SHA/URL/run result.

## Acceptance criteria

- [x] Exact existing AAP repository `https://github.com/bestgmza123-oss/AAP` is resolved directly; it is Public, default branch `main`, and metadata reports `admin=true` / `push=true`. Repository contents are empty, so source bootstrap is still required.
- [ ] Changes are placed on a named Task branch, with a traceable commit and PR; no direct default-branch write is done.
- [ ] Workflow runs `npm ci` and all five real package scripts and results are visible in GitHub Actions.
- [ ] Playwright dependency, lockfile, script, config and tests are committed; both required routes are tested against local fixture-only UI.
- [ ] A real failed-browser-run path produces and retains its report/screenshots/traces as GitHub Actions artifacts, as configured and evidenced by the run/artifact interface when a failure occurs.
- [ ] PR head, workflow run, review and checkpoint all identify the same source SHA.
- [ ] Required status checks are enabled and read back as active **if** permission exists; otherwise report them honestly as `NOT CONFIGURED` with the observed permission limitation.
- [ ] Thai Trello card has real repository/branch/commit/PR/CI/artifact links and a single executable next action; no links/results are invented.
- [x] Existing workflow documentation and review checklist have been updated to repository-first policy, direct-URL verification and same-revision gates; repository exists, but workflow/PR/branch protection changes remain blocked until the initial source commit is pushed.
- [ ] No gameplay requirements changed and `P1-UI-002` remains unstarted.

## Single resume condition

Resume this same Task after the one-time bootstrap pushes the current canonical docs+source to the already verified `https://github.com/bestgmza123-oss/AAP` and the first commit is visible. Use `evidence/OWNER_ACTION_GITHUB_REPOSITORY_TH.md`; then re-read remote `main`, create a Task branch, add Playwright using an npm-generated lockfile update, run CI and verify artifacts/check settings. Do not request new ZIPs or test transcripts for every task. Do not start `P1-UI-002` automatically.

## References

- OpenAI Help Center, [Connecting GitHub to ChatGPT](https://help.openai.com/en/articles/11145903-connecting-github-to-chatgpt): repository selection/authorization, organization approval, and troubleshooting repositories missing from the connected app. Checked 2026-10-26.
- Related canonical policies: `AGENTS.md`, `delivery/06_TASK_BOARD_WORKFLOW.md`, `delivery/08_REUSABLE_PROMPTS_TH.md`, `delivery/12_PROJECT_WORKSPACE_AND_SINGLE_ZIP_HANDOFF.md`, and `CHECKLIST_FOR_REVIEW.md`.
