# Phase 1 UI Prototype — Screen-by-Screen Wireflow

**Task linkage:** `DOC-001` defines this wireflow; `P1-UI-001` implements it.  
**Product mode:** English-first, UI-Driven, anime-comic apocalypse.  
**Implementation truth:** this is a clickable UI prototype using local, deterministic fixtures. It is not a server-authoritative game, does not persist to a database, and must never imply that a real Run, reward, account grant, death transaction, or release publication has committed.

## Global shell (applies to all routes)

- Keep a persistent, visibly readable `PRIVATE PROTOTYPE · FIXTURE DATA · NOT CONNECTED TO GAME SERVER` indicator. It must not be hidden in a tooltip or developer console.
- Show one shared build label such as `Prototype build` / `Development Preview`. Do not claim `AAP Game v1.0.0` is released. Use one central version/build constant for the prototype surface.
- Main navigation includes **Updates** immediately beside **Mail**. Updates opens a player-facing release-history shell containing no invented published release history; state that the prototype has no published release notes if none exist. Mail opens an accessible Phase-inactive empty state and exposes no send/receive/delete/archive/claim/reward mutation.
- Use the common Slash Loading route transition where navigation actually resolves a route. A local prototype may simulate a bounded waiting/error state for demonstration, but must label it as a prototype state and must not imply a server command was sent.
- Every route has a stable page title, visible back/home affordance where relevant, keyboard-operable controls, focus styles, reduced-motion behavior, and responsive layout.

## Screen 0 — Start / Test Character Fixture

**Purpose:** establish the scope of the experience before the player enters the game UI.

**Show:** AAP title, one-sentence premise, `Development Preview` build label, prototype/fixture notice, and a `Continue to Province` action. The user may choose one of the pre-authored local test-character fixtures if multiple exist.

**Controls:** `Continue`, optional fixture selector, `Updates`, `Mail`.

**Rules:** no real signup/login, no public identity creation, no server authentication and no real Account-scoped starter grant in this task. Never claim that a Character has been persisted.

**States:** initial, no fixture available, fixture selected, navigation waiting/error. Empty/error states must explain how to return/retry.

**Acceptance:** `UI-P1-01`, `UI-P1-02`, `UI-P1-12`, `UI-P1-13`, `UI-P1-14`, `UI-P1-15`, `UI-P1-16`.

## Screen 1 — Province Hub

**Purpose:** give the player situational awareness and a clear next action.

**Desktop layout:** main Province/dungeon panel; compact player/status rail; a clear expedition call-to-action; a recent-events/notice panel.  
**Mobile layout:** focused single-column page; resource summary before the expedition CTA; map/location details in a collapsible panel rather than tiny desktop columns.

**Show:** current placeholder Province and Safe Zone state; available Standard Run fixture; recommended level/threat; carry weight and current/remaining capacity; recent fixture events. Clearly mark names and content as placeholders/fixtures.

**Resource row:** display HP, Stamina and Mana as prototype values. Hunger and Infection may be previewed to communicate the later design, but each must say `PREVIEW ONLY — NOT ACTIVE IN PHASE 1`; Hunger semantics must say `100 = Fed` and `0 = Death`. Do not decrement these values with real time, trigger real death, or imply offline simulation in this UI-only task.

**Controls:** `View Run Details`, `Inventory / Loot Preview` only if the page is included, `Character Sheet` only if implemented as a fixture view, `Updates`, `Mail`.

**States:** normal, no dungeon fixture, unavailable future destination, loading, error/retry, status-preview information.

**Acceptance:** `UI-P1-03`, `UI-P1-04`, `UI-P1-12`, `UI-P1-13`, `UI-P1-14`, `UI-P1-15`.

## Screen 2 — Run Preflight

**Purpose:** communicate the exact preview cost, duration, risks and consequences before the user enters the fixture Run.

**Show:** Province/dungeon fixture name; recommended level/threat; Standard Run enemy-count range `4–7 normal enemies`; entry Stamina cost from `18 + 2 × ceil(dungeon level / 5)`; a 30-minute hard-timeout disclosure; no-potion/no-loadout-change restrictions; a concise risk/return-encounter disclosure; Escape and Surrender consequence summary. Level-1 and level-6 test fixtures display costs of 20 and 22 Stamina respectively.

**Prototype boundary:** display the calculated value from fixture/versioned parameter data. Clicking `Begin Demo Run` changes only local prototype state; no real Stamina is debited, no server RNG is called, and no server Run is created. State this near the CTA.

**Controls:** `Back`, `Begin Demo Run`, `Escape details`, `Surrender details` (details only, not a valid pre-combat surrender action).

**States:** normal, insufficient fixture Stamina (disabled with reason), no fixture, preflight error and retry.

**Acceptance:** `UI-P1-05`, `UI-P1-08`, `UI-P1-09`, `UI-P1-12`, `UI-P1-13`.

## Screen 3 — Combat

**Purpose:** demonstrate readable turn-based decisions against one normal enemy at a time.

**Show:** one normal-enemy fixture at a time; enemy name/species/tier/threat/level as separate fields; HP and Mana only when the template supports Mana; intent only for an action tagged `telegraphed=true`; player HP/Mana, turn order, Run elapsed/remaining demo timer, defeated/total fixture count, and a concise combat log.

**Controls:** `Normal Attack`, `Skill`, `Guard`, `Escape`, `Surrender`. Do not show usable Potions, equipment replacement, or skill-loadout changes inside a Run. Use only sample skill effects supported by the chosen fixture contract; unsupported effects are not invented.

**Prototype interactions:** attacks/skills/Guard update a deterministic local demo state so screen flow can be tested. The UI remains visibly marked as fixture-only. Do not claim the prototype validates damage balance, server RNG, atomicity, or authoritative command security.

**Guard/cooldown preview:** explain the specified semantics in a details/log surface; avoid making every action require confirmation. Surrender requires a consequence confirmation. Escape opens its own cost/consequence panel.

**States:** player turn, enemy turn, enemy defeated/next enemy, action disabled with reason, simulated waiting, simulated error/retry. Do not auto-advance the world while the page is closed.

**Acceptance:** `UI-P1-06`, `UI-P1-07`, `UI-P1-08`, `UI-P1-09`, `UI-P1-12`, `UI-P1-13`, `UI-P1-14`.

## Screen 4 — Escape Confirmation

**Purpose:** allow an informed choice without blurring Escape and Surrender.

**Show:** Warp Stone option only when the selected fixture says one is carried; otherwise hide it. Show Gold option and the exact configured example cost before confirmation, including the retained-weight inputs used by the demo fixture. Clearly state destination is the current Province, no home is required and no additional Encounter is triggered.

**Weight semantics:** before the main dungeon is fully cleared, forfeited pending Run loot is excluded from escape-cost weight. When fleeing a return Encounter after selecting main loot, already-chosen main loot remains and counts in the weight used by the example. The current formula is `ceil((20 + 5×W) × Z)`; any `Z` used in the visual demo must be labelled a non-final prototype fixture value, not a final balance approval.

**Controls:** `Confirm Escape`, `Cancel`. The confirm action returns to the Province result view in local demo state only.

**Acceptance:** `UI-P1-08`, `UI-P1-10`, `UI-P1-11`.

## Screen 5 — Surrender Confirmation

**Purpose:** make the Surrender/Escape choice understandable without silently changing either rule.

**Show:** Surrender is available only during active Combat; confirmation says the Run becomes `FAILED`, no Run rewards/EXP are granted, entry Stamina is not refunded, the Character is not killed by Surrender, and HP is not refilled. Contrast this with paid/stone Escape consequences in plain language. The perceived overlap is a UX/playtest risk; do not add a penalty or remove the command.

**Controls:** `Confirm Surrender`, `Continue Fighting`.

**Acceptance:** `UI-P1-09`, `UI-P1-10`.

## Screen 6 — Loot Selection

**Purpose:** let the player understand exactly what may be kept within the carrying limit.

**Show:** selected item illustration/placeholder, localized name, rank, weight, quantity control, current carried weight, total capacity, remaining capacity, and a clear explanation for unavailable quantities. Capacity is weight-based; the Starter Bag's own weight counts; worn gear does not count; total starter capacity is 20 kg, not 10 + 20 kg.

**Controls:** increase/decrease quantity, deselect an item, `Confirm Demo Selection`, `Back`. Over-capacity quantities are disabled with an exact shortfall message; never auto-delete or silently drop an item. Use integer-gram fixture data internally where item weights are represented, but do not claim transactional exact-gram enforcement in UI-only code.

**Prototype boundary:** items and selection exist in local fixture state only. Confirmation does not claim permanent receipt or backend persistence.

**Acceptance:** `UI-P1-10`, `UI-P1-11`, `UI-P1-12`, `UI-P1-13`.

## Screen 7 — Optional Return Encounter

**Purpose:** show the distinct final risk after main-dungeon loot selection.

**Rule:** at most one return-encounter check. No third encounter. If the player escapes this Encounter, already-chosen main-dungeon rewards remain, while the Encounter reward is not gained. If no Encounter is rolled by the fixture, skip this page and proceed to Run Result.

**Controls:** `Fight Encounter`, `Escape`, `Surrender` only if the UI is in active Combat (not as an invented non-combat action).

**Acceptance:** `UI-P1-11`, `UI-P1-12`.

## Screen 8 — Run Result

**Purpose:** explain the outcome and next action unambiguously.

**Outcomes:**
- `COMPLETED`: chosen rewards shown as previewed/selected; do not imply durable claim.
- `ESCAPED`: state which rewards were forfeited and which selected rewards remain, according to the Escape branch.
- `FAILED / SURRENDER`: no Run rewards/EXP and no Stamina refund; Character death is not caused by Surrender.
- `EXPIRED`: no Run reward/EXP, no refund, and timeout itself does not kill the Character.

Keep three item buckets visually distinct: carried-in/original items, chosen-pending loot, and received loot. In this UI-only prototype, label the last state as a **demo outcome**, not a committed persistent grant.

**Controls:** `Return to Province`, optional `View Demo Log`. Returning to Province must not restart the same demo Run implicitly.

**Acceptance:** `UI-P1-11`, `UI-P1-12`, `UI-P1-13`.

## Global acceptance checklist for the wireflow

- [ ] Every route has a clear heading, back/forward path where applicable, and no dead end.
- [ ] Fixture/non-persistent state is clear on all relevant screens, not just Start.
- [ ] Desktop viewport 1440×900 and mobile viewport 390×844 are reviewed; controls are not merely a shrunken desktop layout.
- [ ] Keyboard navigation, visible focus, status announcements, text contrast and reduced motion are reviewed; status is never color-only.
- [ ] English strings use stable translation keys. Run an expanded-string layout check so longer translations do not overflow critical controls.
- [ ] Loading, waiting, empty, error, retry, disabled, cancellation and result states are demonstrated where applicable.
- [ ] Updates/Mail shell follows `REL-001…004`, `LOAD-001…005` and `MAIL-UX-001` at the level achievable in the prototype; no Mail backend is implied.
- [ ] No public login/signup, actual persistence, authoritative resource clock, real RNG, final content publishing, Market, housing, Travel, payment or future-phase feature is accidentally activated.
- [ ] The working prototype remains a testable slice, not a final balanced or production-ready game claim.
