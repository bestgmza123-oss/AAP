# Localization Contract

- Initial UI language: **English**. The document/handoff language may be Thai.
- All player-visible strings use stable translation keys; do not embed display text into gameplay identifiers.
- Items, skills, enemies, quests, locations and effects use stable IDs separate from localized names/descriptions.
- Keep descriptions and narrative content separate from logic. Never build translated sentences by concatenating English fragments.
- Support longer translated text, line wrapping, plural/count forms, date/time/number formatting and keyboard-accessible labels.
- Rank, currencies, weights and resource values should be formatted from typed data, not localized into logic.
- Error messages must convey user action and cause without exposing internal IDs, stack traces, secrets or diagnostics.
- Design review should test English baseline and pseudo-expanded strings. Thai and other translations can be added later without schema/UI redesign.
