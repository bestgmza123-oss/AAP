# SYS-01 — Account & Character Identity

**Domain:** Identity  
**New roadmap placement:** Phase 1 fixture identity only; Phase 2 private authenticated identity; Phase 3 public Auth/Mail activation after gates  
**Canonical owner:** this document for behavior summarized below; see `product/04_SYSTEMS_MAP.md` for neighbors.
**Source basis (provenance, not runtime proof):** Old SoT §§4.1, 26.3; DEC-075/076/098; AI-DEC-206, 262, 263; RECON-001/004.

## Goal

Separate the person/account from the playable survivor. One Account has at most one active Character; death ends that Character permanently, while the Account record persists and may create a successor Character. The opening flow is intro/landing → sign-in or internal test access as appropriate → Character setup → onboarding. Public email/password signup is a later release capability and must not be mixed into the private prototype.

## Rules and boundaries

- **Owns:** Account lifecycle, active Character binding, identity-derived ownership, one-time starter grants.
- **Depends on:** Death/persistence, mail, bank, Auth, all Character-owned systems.
- **Cross-system contract:** Never accept Account ID, Character ID, role or ownership claims from editable client fields as authority. Do not reissue the starter entitlement after death or Character recreation.

## UI contract

Character setup and account state; all mutations must reflect server-confirmed identity.

## Scope boundary

P2 identity/persistence tests; P1 prototype may use clearly labelled fixture identity.

## Detailed account baseline

- Public account flow uses Email + Password; verified email is required before Character creation or gameplay mutation. Unverified accounts may verify/resend within provider limits, sign out and inspect authentication status only. Exact provider capabilities must be verified during implementation.
- Account deletion requires verified identity and recent reauthentication. A pending-deletion Account is blocked from gameplay mutations; the baseline includes a 30-day verified cancellation window, followed by removal of provider identity/direct identifiers/playable data and an audited sink for remaining assets. Minimal pseudonymized, content-free security/ledger records may be retained up to 365 days subject to applicable legal review. This is a design baseline, not legal-compliance certification.
- Mailbox, messages, unclaimed reward attachments and claim state are Account-owned and survive Character death. Eligibility is evaluated at the source event's cutoff. Character-bound items require a living active Character and enough capacity; mixed claims fail wholly rather than partially granting. Reward mail with attachments never expires; Phase 1 only shows an empty/inactive Mail destination.

## Detailed Auth and Account-owned Mail lifecycle

- Verification link: single use, target lifetime 24 hours. Password-reset responses must not reveal whether an email exists; reset links are single use, target lifetime 30 minutes. These are design targets, not verified provider guarantees. During implementation, verify token expiry, resend throttles, refresh-session revocation and email reuse against the selected Auth provider. Never promise unsupported provider behavior.
- Every protected mutation checks the trusted session and authoritative Account lifecycle status. The server derives Account/Character identity from the verified principal; client-supplied IDs and editable role claims are never authority. An unverified Account can only verify/resend within provider limits, sign out, or read auth status. A pending-deletion Account cannot mutate gameplay.
- Account deletion requires verified identity and recent reauthentication. Request immediately sets `PENDING_DELETION`; cancellation requires verified recovery plus reauthentication before the 30-day deadline. At/after the deadline, an idempotent job removes provider identity/direct identifiers/playable data and routes remaining assets and unclaimed reward attachments to an audited deletion sink, with no transfer/refund/inheritance. A former email may register a fresh unlinked Account only after provider deletion is confirmed; do not restore/link the deleted Account automatically.
- Retain only pseudonymized, content-free security/financial/audit records for up to 365 days after completed deletion unless a documented lawful/security hold applies. Never retain credentials, reset/verification tokens, message bodies or direct identifiers in the tombstone. Backup purge, provider lifecycle and jurisdictional privacy/legal obligations need actual verification before public exposure; this document does not certify legal compliance.
- Mail delivery is idempotent by `(account_id, source_kind, source_event_id)`. Mail, messages and unclaimed attachments belong to the Account and survive Character death/recreation. Reward eligibility is captured at its original source cutoff; a Character dead at a Season cutoff is ineligible, but a reward validly granted to the Account is not revoked by a later death.
- Account-currency attachments credit the Account ledger and do not require a living Character. Character-bound items require the current living active Character and enough capacity. If any Character-bound item in a selected claim batch cannot be delivered, the entire batch remains pending with no partial grant. Read/archive changes neither ownership nor claim state. Reward/system mail with unclaimed attachments never expires and cannot be deleted. Attachment-free informational mail may be recoverably deleted for 30 days, then its body is purged and only a minimal content-free tombstone is retained up to 365 days, subject to privacy/legal review.
- Mail is Phase 1 empty/inactive UI only. The delivery/claim backend is not enabled until Phase 3 and after MBOX-001…005 plus applicable security/privacy gates pass.

## Design acceptance criteria

These are requirements to verify in a future implementation task, not evidence that any code exists or tests have passed. Every in-scope criterion must map to an executable check and inspected evidence before the relevant phase is accepted.

- `AC-SYS01-01` — At most one active Character exists per Account; a DEAD Character is terminal and cannot mutate gameplay. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS01-02` — Creating a successor Character never reissues the Account-scoped starter grant. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS01-03` — Account/Character/role identity is derived from trusted session/server state, not client-supplied IDs. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS01-04` — Unverified/pending-deletion Account restrictions are enforced on every protected mutation, not UI alone. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.
- `AC-SYS01-05` — Mail claims are Account-owned, atomic and all-or-nothing when Character capacity/eligibility is missing. **Status:** design requirement defined; runtime evidence not supplied by this document-only package.

## Authoring checklist for this system

- [ ] State machine and allowed actions are written where the system is stateful.
- [ ] Inputs, outputs, ownership and side-effects are explicit.
- [ ] Errors/disabled reasons and retry/reconnect behavior are defined.
- [ ] Time and death interactions reference `rules/02_CROSS_SYSTEM_CONTRACTS.md` rather than rewriting global ordering.
- [ ] Numeric values have a stable parameter/content ID and do not conflict with `balance/` ownership.
- [ ] UI states and English localization keys are listed before implementation.
- [ ] Acceptance checks cover normal, boundary, failure and duplicate/replay behavior where applicable.

## Legacy decision provenance

See `decisions/01_DECISION_REGISTER.md` for the old AI-DEC index. AI-DEC entries are design provenance, not owner confirmation or runtime evidence. The current behavior for this system is owned by this file and the named global contracts.
