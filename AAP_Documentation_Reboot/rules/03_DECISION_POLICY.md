# Decision Policy — Close Work Without Inventing Facts

## Status vocabulary

- **OWNER-CONFIRMED:** the owner explicitly approved the stated behavior. Confirmation is limited to its scope.
- **AI-SELECTED BASELINE:** the previous owner delegated the design choice; the AI-selected default is current design input, not owner confirmation.
- **CURRENT REBOOT OVERRIDE:** the later instructions in the design conversation intentionally supersede older text (English-first, UI-Driven, Hunger label, new phase order, private test restriction).
- **CONTENT INPUT NEEDED:** the system rules are known but a versioned catalogue/template/asset is not yet authored. This should not block unrelated work.
- **RUNTIME EVIDENCE NEEDED:** design is specified; behavior still requires real test evidence.
- **OWNER APPROVAL REQUIRED:** changing a high-impact consequence, deleting a named feature, changing ownership/loss, or reopening payment scope.

## How to deal with a missing point

1. First check the owning system and the relevant cross-system contract.
2. If an explicit current decision answers it, keep the rule and do not reopen it.
3. If the owner delegated that design area, choose a conservative and coherent default, label it AI-SELECTED, record rationale in `decisions/02_RECONCILIATION_LOG.md`, and update all affected dependencies.
4. If the question affects permanent death, loss/ownership, paid activity or irreversible deletion and no current rule answers it, do not hide the uncertainty. Block only that affected behavior and continue independent work.
5. If it is missing authored content, create a placeholder fixture clearly marked non-final instead of inventing lore or claiming content completeness.
6. If it requires runtime facts, label it RUNTIME EVIDENCE NEEDED. Never close it by editing prose.

## No fake closure

Do not create a blanket rule that every `OPEN` word must disappear. Close each item with a disposition: adopted rule, explicit owner approval, AI-selected default within delegation, deferred content, phase deferral, or a named blocked slice. A document review should check meaning and dependencies, not only keywords.

## Decision provenance

The old SoT's `DEC/CONF` and `AI-DEC-201…263` are provenance. The current active rule is in the owning file in this package. If a later owner instruction changes behavior, update the active rule and append one concise entry in the reconciliation log; do not create one patch log or audit file per change.
