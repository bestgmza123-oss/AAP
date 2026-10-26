# Balance & Content Data Policy

## Single owner for tunable values

Each numeric gameplay parameter has one canonical row/source. Systems define what the value means and reference the parameter ID. UI, roadmap and test briefs must not duplicate alternate numeric sources.

## Parameter classification

- **Design constant:** structural rule such as a single active Character or maximum of one return-encounter check.
- **Prototype balance default:** values selected in the prior AI-DEC batch or specified as initial values. Use for fixtures; do not claim balance.
- **Authored content value:** per-item/per-skill/per-enemy/per-route/per-recipe value with content version.
- **Observed value:** measured result from a real test/playtest/market sample with setup and date. Never substitute a prototype assumption for observation.

## Content quality requirements

Every content record must eventually have a stable ID, localized display data, supported effect/type, version, eligibility/phase, validation constraints and provenance (fixture vs intended production). Content must not silently mutate existing item instances or ongoing Runs.

## Phase 1 fixture boundary

Use one placeholder Province, a small number of Level 1 and Level 6 Standard Run fixtures, a few normal-enemy templates and only skill effect types already supported by the design. Fixtures are non-public and marked as prototype. No final lore, Elite/Boss mechanics or invented equipment catalogue is required for the first slice.

## No premature balance claims

Paper arithmetic can find obvious formula errors; it cannot prove fun, stochastic fairness, survival pacing, economy health or market liquidity. Balance claims require versioned inputs, random seeds where relevant, sample counts, observed outputs, explicit review criteria and human playtest.
