import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getCapacityCheck,
  type LootSelection,
  type LootStackFixture,
  lootCapacityFixture,
  type ReturnEncounterBranch,
  sumSelectedWeightGrams,
} from '../fixtures/loot-capacity';
import { type TranslationKey, t } from '../i18n';

type LootStage = 'main-selection' | 'return-choice' | 'return-encounter' | 'return-loot' | 'result';
type LootResult = 'no-encounter' | 'escaped-return' | 'completed-return';

function formatWeight(grams: number): string {
  return `${(grams / 1000).toFixed(3)} kg (${grams.toLocaleString('en-US')} g)`;
}

function selectionSummary(stacks: readonly LootStackFixture[], selection: LootSelection): string {
  const entries = stacks
    .map((stack) => ({ stack, quantity: selection[stack.id] ?? 0 }))
    .filter((entry) => entry.quantity > 0);
  if (entries.length === 0) return t('loot.bucket.empty');
  return entries.map(({ stack, quantity }) => `${t(stack.nameKey)} × ${quantity}`).join(' · ');
}

export function LootDemoPage() {
  const [stage, setStage] = useState<LootStage>('main-selection');
  const [mainSelection, setMainSelection] = useState<LootSelection>({});
  const [returnSelection, setReturnSelection] = useState<LootSelection>({});
  const [returnBranch, setReturnBranch] = useState<ReturnEncounterBranch>('none');
  const [result, setResult] = useState<LootResult | null>(null);

  const mainWeightGrams = sumSelectedWeightGrams(lootCapacityFixture.mainLoot, mainSelection);
  const returnStacks = [lootCapacityFixture.returnEncounterLoot] as const;
  const returnWeightGrams = sumSelectedWeightGrams(returnStacks, returnSelection);
  const carriedPlusMainGrams = lootCapacityFixture.initialCarriedWeightGrams + mainWeightGrams;
  const currentTotalGrams = carriedPlusMainGrams + returnWeightGrams;
  const remainingGrams = lootCapacityFixture.totalCapacityGrams - currentTotalGrams;

  function updateQuantity(
    stack:
      | (typeof lootCapacityFixture.mainLoot)[number]
      | typeof lootCapacityFixture.returnEncounterLoot,
    nextQuantity: number,
    isReturnStack: boolean,
  ) {
    const currentSelection = isReturnStack ? returnSelection : mainSelection;
    const currentTotal = isReturnStack ? currentTotalGrams : carriedPlusMainGrams;
    const check = getCapacityCheck(
      currentTotal - stack.weightGrams * (currentSelection[stack.id] ?? 0),
      lootCapacityFixture.totalCapacityGrams,
      stack,
      nextQuantity,
    );
    if (!check.allowed) return;
    const setter = isReturnStack ? setReturnSelection : setMainSelection;
    setter((current) => ({ ...current, [stack.id]: nextQuantity }));
  }

  function resolveReturnBranch() {
    if (returnBranch === 'none') {
      setResult('no-encounter');
      setStage('result');
      return;
    }
    setStage('return-encounter');
  }

  function escapeReturnEncounter() {
    setReturnSelection({});
    setResult('escaped-return');
    setStage('result');
  }

  function completeReturnEncounter() {
    setStage('return-loot');
  }

  function finishReturnLoot() {
    setResult('completed-return');
    setStage('result');
  }

  function resetDemo() {
    setStage('main-selection');
    setMainSelection({});
    setReturnSelection({});
    setReturnBranch('none');
    setResult(null);
  }

  const resultTitle: TranslationKey =
    result === 'escaped-return'
      ? 'loot.result.escapedTitle'
      : result === 'completed-return'
        ? 'loot.result.completedTitle'
        : 'loot.result.noEncounterTitle';

  return (
    <div className="page-shell loot-page" data-testid="loot-page">
      <div className="page-heading">
        <p className="page-eyebrow">{t('loot.page.eyebrow')}</p>
        <h1>{t('loot.page.title')}</h1>
        <p className="page-description">{t('loot.page.description')}</p>
      </div>

      <section className="loot-boundary" aria-label={t('loot.notice.title')}>
        <strong>{t('loot.notice.title')}</strong>
        <p>{t('loot.notice.description')}</p>
      </section>

      <section className="loot-capacity-panel" aria-labelledby="loot-capacity-title">
        <div className="loot-section-heading">
          <div>
            <p className="card-eyebrow">{t('loot.capacity.eyebrow')}</p>
            <h2 id="loot-capacity-title">{t('loot.capacity.title')}</h2>
          </div>
          <span className={remainingGrams < 0 ? 'loot-capacity-state over' : 'loot-capacity-state'}>
            {t(remainingGrams === 0 ? 'loot.capacity.atCapacity' : 'loot.capacity.withinCapacity')}
          </span>
        </div>
        <div className="loot-metrics" data-testid="loot-capacity-metrics">
          <div>
            <span>{t('loot.capacity.current')}</span>
            <strong data-testid="loot-current-weight">{formatWeight(currentTotalGrams)}</strong>
          </div>
          <div>
            <span>{t('loot.capacity.total')}</span>
            <strong data-testid="loot-total-capacity">
              {formatWeight(lootCapacityFixture.totalCapacityGrams)}
            </strong>
          </div>
          <div>
            <span>{t('loot.capacity.remaining')}</span>
            <strong data-testid="loot-remaining-weight">
              {formatWeight(Math.max(0, remainingGrams))}
            </strong>
          </div>
        </div>
        <p className="loot-capacity-note">{t('loot.capacity.inclusions')}</p>
        <div className="loot-weight-bar" aria-label={t('loot.capacity.current')} role="img">
          <span
            style={{
              width: `${Math.min(100, (currentTotalGrams / lootCapacityFixture.totalCapacityGrams) * 100)}%`,
            }}
          />
        </div>
        <div className="loot-weight-bar-labels">
          <span>{formatWeight(0)}</span>
          <span>{formatWeight(lootCapacityFixture.totalCapacityGrams)}</span>
        </div>
      </section>

      <section className="loot-buckets" aria-label={t('loot.bucket.region')}>
        <div>
          <span>{t('loot.bucket.carriedIn')}</span>
          <strong data-testid="loot-carried-in">
            {formatWeight(lootCapacityFixture.initialCarriedWeightGrams)}
          </strong>
          <p>{t('loot.bucket.carriedInDescription')}</p>
        </div>
        <div>
          <span>{t('loot.bucket.mainPending')}</span>
          <strong data-testid="loot-main-pending-weight">{formatWeight(mainWeightGrams)}</strong>
          <p data-testid="loot-main-pending-list">
            {selectionSummary(lootCapacityFixture.mainLoot, mainSelection)}
          </p>
        </div>
        <div>
          <span>{t('loot.bucket.returnPending')}</span>
          <strong data-testid="loot-return-pending-weight">
            {formatWeight(returnWeightGrams)}
          </strong>
          <p>{selectionSummary(returnStacks, returnSelection)}</p>
        </div>
      </section>

      {stage === 'main-selection' ? (
        <section className="loot-panel" aria-labelledby="loot-main-title">
          <div className="loot-section-heading">
            <div>
              <p className="card-eyebrow">{t('loot.main.eyebrow')}</p>
              <h2 id="loot-main-title">{t('loot.main.title')}</h2>
            </div>
            <span className="loot-tag">{t('loot.tag.fixture')}</span>
          </div>
          <p>{t('loot.main.description')}</p>
          <div className="loot-stack-list">
            {lootCapacityFixture.mainLoot.map((stack) => {
              const quantity = mainSelection[stack.id] ?? 0;
              const projectedCurrent =
                lootCapacityFixture.initialCarriedWeightGrams +
                mainWeightGrams -
                stack.weightGrams * quantity;
              const increaseCheck = getCapacityCheck(
                projectedCurrent,
                lootCapacityFixture.totalCapacityGrams,
                stack,
                quantity + 1,
              );
              const increaseDisabled =
                quantity >= stack.availableQuantity || !increaseCheck.allowed;
              const decreaseDisabled = quantity <= 0;
              return (
                <article
                  className="loot-stack"
                  key={stack.id}
                  data-testid={`loot-stack-${stack.id}`}
                >
                  <div className="loot-stack-info">
                    <h3>{t(stack.nameKey)}</h3>
                    <p>
                      {t('loot.stack.weightEach', {
                        kg: (stack.weightGrams / 1000).toFixed(3),
                        grams: stack.weightGrams,
                      })}
                    </p>
                    <p>{t('loot.stack.available', { count: stack.availableQuantity })}</p>
                  </div>
                  <div className="loot-quantity-control">
                    <button
                      type="button"
                      aria-label={t('loot.stack.decrease', { item: t(stack.nameKey) })}
                      data-testid={`loot-decrease-${stack.id}`}
                      disabled={decreaseDisabled}
                      onClick={() => updateQuantity(stack, quantity - 1, false)}
                    >
                      −
                    </button>
                    <output
                      aria-label={t('loot.stack.quantity', { item: t(stack.nameKey) })}
                      data-testid={`loot-quantity-${stack.id}`}
                    >
                      {quantity}
                    </output>
                    <button
                      type="button"
                      aria-label={t('loot.stack.increase', { item: t(stack.nameKey) })}
                      data-testid={`loot-increase-${stack.id}`}
                      disabled={increaseDisabled}
                      onClick={() => updateQuantity(stack, quantity + 1, false)}
                    >
                      +
                    </button>
                  </div>
                  {increaseDisabled &&
                  quantity < stack.availableQuantity &&
                  !increaseCheck.allowed ? (
                    <p className="loot-overflow-reason" data-testid={`loot-overflow-${stack.id}`}>
                      {t('loot.capacity.overflow', {
                        shortfall: increaseCheck.shortfallGrams.toLocaleString('en-US'),
                      })}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
          <div className="loot-panel-actions">
            <button
              type="button"
              className="loot-primary-action"
              data-testid="loot-confirm-main"
              onClick={() => setStage('return-choice')}
            >
              {t('loot.main.confirm')}
            </button>
            <Link className="loot-secondary-action" to="/run/combat">
              {t('loot.backToCombat')}
            </Link>
          </div>
        </section>
      ) : null}

      {stage === 'return-choice' ? (
        <section className="loot-panel" aria-labelledby="loot-return-choice-title">
          <p className="card-eyebrow">{t('loot.returnChoice.eyebrow')}</p>
          <h2 id="loot-return-choice-title">{t('loot.returnChoice.title')}</h2>
          <p>{t('loot.returnChoice.description')}</p>
          <label className="loot-fixture-select">
            {t('loot.returnChoice.selectLabel')}
            <select
              data-testid="loot-return-branch"
              value={returnBranch}
              onChange={(event) => setReturnBranch(event.target.value as ReturnEncounterBranch)}
            >
              <option value="none">{t('loot.returnChoice.none')}</option>
              <option value="one">{t('loot.returnChoice.one')}</option>
            </select>
          </label>
          <p className="loot-capacity-note">{t('loot.returnChoice.noThirdRoll')}</p>
          <div className="loot-panel-actions">
            <button
              type="button"
              className="loot-primary-action"
              data-testid="loot-resolve-return"
              onClick={resolveReturnBranch}
            >
              {t('loot.returnChoice.continue')}
            </button>
            <button
              type="button"
              className="loot-secondary-action"
              onClick={() => setStage('main-selection')}
            >
              {t('loot.returnChoice.back')}
            </button>
          </div>
        </section>
      ) : null}

      {stage === 'return-encounter' ? (
        <section
          className="loot-panel return-encounter-panel"
          aria-labelledby="loot-return-encounter-title"
        >
          <p className="card-eyebrow">{t('loot.return.eyebrow')}</p>
          <h2 id="loot-return-encounter-title">{t('loot.return.title')}</h2>
          <p>{t('loot.return.description')}</p>
          <div className="loot-buckets loot-return-preservation">
            <div>
              <span>{t('loot.bucket.mainChosen')}</span>
              <strong>{formatWeight(mainWeightGrams)}</strong>
              <p>{selectionSummary(lootCapacityFixture.mainLoot, mainSelection)}</p>
            </div>
            <div>
              <span>{t('loot.bucket.returnLootAtRisk')}</span>
              <strong>
                {formatWeight(
                  lootCapacityFixture.returnEncounterLoot.weightGrams *
                    lootCapacityFixture.returnEncounterLoot.availableQuantity,
                )}
              </strong>
              <p>{t('loot.return.rewardNotOwned')}</p>
            </div>
          </div>
          <div className="loot-panel-actions">
            <button
              type="button"
              className="loot-secondary-action"
              data-testid="loot-escape-return"
              onClick={escapeReturnEncounter}
            >
              {t('loot.return.escape')}
            </button>
            <button
              type="button"
              className="loot-primary-action"
              data-testid="loot-complete-return"
              onClick={completeReturnEncounter}
            >
              {t('loot.return.complete')}
            </button>
          </div>
        </section>
      ) : null}

      {stage === 'return-loot' ? (
        <section className="loot-panel" aria-labelledby="loot-return-loot-title">
          <p className="card-eyebrow">{t('loot.returnLoot.eyebrow')}</p>
          <h2 id="loot-return-loot-title">{t('loot.returnLoot.title')}</h2>
          <p>{t('loot.returnLoot.description')}</p>
          {returnStacks.map((stack) => {
            const quantity = returnSelection[stack.id] ?? 0;
            const projectedCurrent =
              carriedPlusMainGrams + returnWeightGrams - stack.weightGrams * quantity;
            const increaseCheck = getCapacityCheck(
              projectedCurrent,
              lootCapacityFixture.totalCapacityGrams,
              stack,
              quantity + 1,
            );
            const increaseDisabled = quantity >= stack.availableQuantity || !increaseCheck.allowed;
            return (
              <article className="loot-stack" key={stack.id} data-testid={`loot-stack-${stack.id}`}>
                <div className="loot-stack-info">
                  <h3>{t(stack.nameKey)}</h3>
                  <p>
                    {t('loot.stack.weightEach', {
                      kg: (stack.weightGrams / 1000).toFixed(3),
                      grams: stack.weightGrams,
                    })}
                  </p>
                  <p>{t('loot.stack.available', { count: stack.availableQuantity })}</p>
                </div>
                <div className="loot-quantity-control">
                  <button
                    type="button"
                    aria-label={t('loot.stack.decrease', { item: t(stack.nameKey) })}
                    data-testid="loot-decrease-return-salvage"
                    disabled={quantity <= 0}
                    onClick={() => updateQuantity(stack, quantity - 1, true)}
                  >
                    −
                  </button>
                  <output
                    aria-label={t('loot.stack.quantity', { item: t(stack.nameKey) })}
                    data-testid="loot-quantity-return-salvage"
                  >
                    {quantity}
                  </output>
                  <button
                    type="button"
                    aria-label={t('loot.stack.increase', { item: t(stack.nameKey) })}
                    data-testid="loot-increase-return-salvage"
                    disabled={increaseDisabled}
                    onClick={() => updateQuantity(stack, quantity + 1, true)}
                  >
                    +
                  </button>
                </div>
                {increaseDisabled &&
                quantity < stack.availableQuantity &&
                !increaseCheck.allowed ? (
                  <p className="loot-overflow-reason" data-testid="loot-overflow-return-salvage">
                    {t('loot.capacity.overflow', {
                      shortfall: increaseCheck.shortfallGrams.toLocaleString('en-US'),
                    })}
                  </p>
                ) : null}
              </article>
            );
          })}
          <div className="loot-panel-actions">
            <button
              type="button"
              className="loot-primary-action"
              data-testid="loot-finish-return"
              onClick={finishReturnLoot}
            >
              {t('loot.returnLoot.confirm')}
            </button>
            <button
              type="button"
              className="loot-secondary-action"
              onClick={() => setStage('return-encounter')}
            >
              {t('loot.returnLoot.back')}
            </button>
          </div>
        </section>
      ) : null}

      {stage === 'result' && result ? (
        <section
          className="loot-panel loot-result-panel"
          aria-labelledby="loot-result-title"
          data-testid="loot-result"
        >
          <p className="card-eyebrow">{t('loot.result.eyebrow')}</p>
          <h2 id="loot-result-title">{t(resultTitle)}</h2>
          {result === 'no-encounter' ? <p>{t('loot.result.noEncounterDescription')}</p> : null}
          {result === 'escaped-return' ? <p>{t('loot.result.escapedDescription')}</p> : null}
          {result === 'completed-return' ? <p>{t('loot.result.completedDescription')}</p> : null}
          <div className="loot-buckets loot-result-buckets">
            <div>
              <span>{t('loot.bucket.carriedIn')}</span>
              <strong>{formatWeight(lootCapacityFixture.initialCarriedWeightGrams)}</strong>
            </div>
            <div>
              <span>{t('loot.bucket.mainChosen')}</span>
              <strong data-testid="loot-result-main">{formatWeight(mainWeightGrams)}</strong>
              <p>{selectionSummary(lootCapacityFixture.mainLoot, mainSelection)}</p>
            </div>
            <div>
              <span>
                {t(
                  result === 'completed-return'
                    ? 'loot.bucket.returnSelected'
                    : 'loot.bucket.returnForfeited',
                )}
              </span>
              <strong data-testid="loot-result-return">
                {formatWeight(result === 'completed-return' ? returnWeightGrams : 0)}
              </strong>
              <p>
                {result === 'escaped-return'
                  ? t('loot.return.rewardNotOwned')
                  : selectionSummary(
                      returnStacks,
                      result === 'completed-return' ? returnSelection : {},
                    )}
              </p>
            </div>
          </div>
          <p className="loot-capacity-note">{t('loot.result.noPersistence')}</p>
          <div className="loot-panel-actions">
            <button
              type="button"
              className="loot-primary-action"
              data-testid="loot-reset"
              onClick={resetDemo}
            >
              {t('loot.result.reset')}
            </button>
            <Link className="loot-secondary-action" to="/run/combat">
              {t('loot.backToCombat')}
            </Link>
          </div>
        </section>
      ) : null}
    </div>
  );
}
