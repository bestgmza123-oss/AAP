# Systems Map — 33 canonical systems

This is the index and dependency map. Each gameplay rule has one owner: read the linked system file for canonical details. Roadmap placement below is the **new sequence**, not the legacy A–E phase naming.

| ID | System owner | New phase placement | Domain |
|---|---|---|---|
| [SYS-01](../systems/account-character-identity.md) | Account & Character Identity | Phase 1 prototype; Phase 2 authoritative | Identity |
| [SYS-02](../systems/permanent-death-asset-persistence.md) | Permanent Death & Asset Persistence | Phase 2 | Identity & Survival |
| [SYS-03](../systems/hp-stamina-mana.md) | HP, Stamina & Mana | Phase 2 | Survival |
| [SYS-04](../systems/hunger-fridge.md) | Hunger & Fridge | Hunger Phase 2; Fridge Phase 3 | Survival |
| [SYS-05](../systems/infection.md) | Infection | Phase 2 | Survival |
| [SYS-06](../systems/stats-traits-class.md) | Stats, Derived Values, Traits & Class | Stats Phase 1–2; Traits/Class Phase 4 | Progression |
| [SYS-07](../systems/turn-based-combat.md) | Turn-Based Combat | Phase 1 prototype; Phase 2 authoritative | Combat |
| [SYS-08](../systems/enemies-combat-ai.md) | Enemies & Combat AI | Phase 1 prototype; expand by phase | Combat |
| [SYS-09](../systems/dungeon-run-lifecycle.md) | Dungeon & Run Lifecycle | Phase 1 prototype; Phase 2 authoritative | Expedition |
| [SYS-10](../systems/escape-surrender.md) | Escape & Surrender | Phase 1 prototype; Phase 2 authoritative | Expedition / Combat |
| [SYS-11](../systems/world-provinces-locations.md) | World, Provinces & Locations | UI map Phase 1; persistent world Phase 3 | World |
| [SYS-12](../systems/travel-vehicles.md) | Travel & Vehicles | Phase 3 | World / Transport |
| [SYS-13](../systems/items-weight-inventory.md) | Items, Weight & Inventory | Visible prototype Phase 1; authoritative Phase 2 | Inventory |
| [SYS-14](../systems/scrap-salvage-crafting.md) | Scrap, Salvage & Crafting | Basic craft Phase 2; Salvage and advanced craft Phase 4 | Items / Production |
| [SYS-15](../systems/equipment-enhancement-durability.md) | Equipment, Enhancement & Durability | Small test set Phase 2; full progression Phase 4 | Equipment |
| [SYS-16](../systems/skills-power-library.md) | Skills & Power Library | Sample skills Phase 1; full system Phase 4 | Progression / Combat |
| [SYS-17](../systems/currency-markets-auction.md) | Currency, NPC Market, Player Market & Auction | NPC economy Phase 3; fixed-price market Phase 4; Auction Phase 6 | Economy |
| [SYS-18](../systems/direct-trade.md) | Direct Trade | Phase 5 | Social Economy |
| [SYS-19](../systems/bank-delivery.md) | Bank & Delivery | Phase 4 | Economy / Transport |
| [SYS-20](../systems/housing-starter-room-rentals.md) | Housing, Starter Room & Rentals | Phase 3 | World / Property |
| [SYS-21](../systems/zombie-invasion.md) | Zombie Invasion of Homes | Phase 6 | World Event |
| [SYS-22](../systems/home-raid-async-pvp.md) | Home Raid & Async PvP | Phase 6 | Competition |
| [SYS-23](../systems/companions.md) | Companions | Phase 5 | Helpers |
| [SYS-24](../systems/robots.md) | Robots | Phase 5 | Helpers |
| [SYS-25](../systems/association-simulation-rank-season.md) | Association, Simulation/Tower, Rank & Season | Phase 4 | Progression / Social |
| [SYS-26](../systems/job-board-quests-class-unlock.md) | Job Board, Quests & Class Unlock | Story/mandatory tutorial Phase 3; Job Board/Class Phase 4 | Progression / Narrative |
| [SYS-27](../systems/guilds-shared-storage-competition.md) | Guilds, Shared Storage & Competition | Guild core Phase 5; competition Phase 6 | Social / Competition |
| [SYS-28](../systems/onboarding-tutorial.md) | Onboarding & Tutorial | Phase 3 | Player Experience |
| [SYS-29](../systems/ux-ui-visual-direction.md) | UX/UI & Visual Direction | Every phase, start Phase 1 | Experience |
| [SYS-30](../systems/offline-world-time.md) | Offline World & Time | Clock contract Phase 2; all timed systems as introduced | World Foundation |
| [SYS-31](../systems/random-rewards-payments.md) | Random Rewards & Payments | Disabled at launch; reopening requires new scope decision | Commercial Scope |
| [SYS-32](../systems/custom-admin-content-data.md) | Custom Admin & Content Data | Minimal internal data control Phase 2; expanded by system phase | Operations / Content |
| [SYS-33](../systems/server-authority-integrity.md) | Server Authority & Integrity | Design from Phase 1; real enforcement Phase 2 onwards | Cross-Cutting Foundation |

## Key dependency chains

- **Run loop:** World/Province (SYS-11) → Inventory/Preparation (SYS-13; SYS-03/04/05) → Run (SYS-09) → Combat/Enemy (SYS-07/08) → Escape/Surrender (SYS-10) → Loot/Inventory (SYS-13) → return.
- **Death:** Resource/event (SYS-03/04/05/30) → permanent death (SYS-02) → one-time custody/ledger dispositions in each owner system (SYS-13/17/19/20/23/27).
- **Time:** SYS-30 is the clock owner. Other systems provide event definitions and outcomes; they must not invent independent time or reorder due events.
- **Balance:** `balance/02_PHASE_1_BASELINE.md` owns Phase 1 prototype numbers. Future values are owned by the relevant system's content/balance rows, not copied into each phase plan.
- **UI:** SYS-29 and the `experience/` documents own presentation patterns. System documents specify the information a screen must communicate, not duplicated CSS or implementation detail.
- **Content/Admin:** SYS-32 validates and publishes versioned content. Live rules read only published, validated content; other systems do not invent fallback effects.
- **Authority:** SYS-33 applies to every state transition; it does not replace the gameplay rule owned by a system.

## Cross-system links that must be read for selected work

| Task type | Read in addition to the owning system |
|---|---|
| Combat / Run / loot | SYS-02, SYS-07, SYS-08, SYS-09, SYS-10, SYS-13, SYS-30, SYS-33 |
| Inventory / item movement | SYS-02, SYS-13, SYS-14, SYS-15, SYS-17, SYS-18, SYS-19, SYS-23, SYS-30, SYS-33 |
| Hunger / Fridge / death | SYS-02, SYS-04, SYS-13, SYS-20, SYS-25, SYS-30, SYS-33 |
| Market / delivery / trade | SYS-02, SYS-13, SYS-17, SYS-18, SYS-19, SYS-30, SYS-33 |
| Housing / Raid / Invasion | SYS-02, SYS-12, SYS-20, SYS-21, SYS-22, SYS-23, SYS-24, SYS-27, SYS-30, SYS-33 |
| Simulation / Season | SYS-02, SYS-03, SYS-04, SYS-25, SYS-26, SYS-30, SYS-33 |
| UI / localization | SYS-29, experience docs, and the owning system's required screen states |
