# Visual Direction — UI-Driven Anime Apocalypse

## Product statement

The UI is the play space. AAP is not accepted as a set of backend screens with placeholder layout; the hierarchy, feedback, pacing and visual identity are part of the core game.

## Art direction

- Anime-comic apocalypse with a dark foundation, crisp text surfaces, angular/slanted panels and restrained neon/hazard accents.
- Halftone and worn-material texture may support emphasis but must not reduce readability.
- Use one consistent icon family, clear tier/rank treatment and strong spacing hierarchy.
- Do not make every panel glow, rely on color alone, or sacrifice reading order for decoration.
- Placeholder art is acceptable for content fixtures; real spacing, hierarchy, component behavior and responsive layout are not placeholders.
- Art must be swappable without rewriting gameplay rules or content identifiers.

## Component/state requirements

Major components define default, hover/focus, selected, disabled, loading, refreshing, empty, error, permission-blocked and success states where applicable. Dangerous actions clearly identify loss/cost before confirmation. Keyboard and touch access are both required; targets must be comfortable on mobile. Respect reduced-motion preferences.

## Layout guidance

- Desktop: composed panels and persistent resource/context bars can be used when they preserve the main task hierarchy.
- Mobile: simplify into focused full-page experiences for Combat and Map; do not shrink desktop panels until controls become unusable.
- Avoid nested modal stacks. Use a clear route/panel hierarchy and visible close/back behavior.
- Status must use more than color: pair color with text, icon, shape or explicit label.

## Completion rule

A feature is not UI-complete until its screen flow, layout, interaction states, loading/error/empty states, mobile behavior, localization expansion and acceptance checks are defined and reviewable.
