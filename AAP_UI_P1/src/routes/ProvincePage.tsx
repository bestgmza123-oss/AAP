import { Link } from 'react-router-dom';
import { prototypeFixture } from '../fixtures/prototype';
import { provinceFixture } from '../fixtures/province';
import { type TranslationKey, t } from '../i18n';

type ResourceId = keyof typeof provinceFixture.resources;

const resourceDefinitions: {
  id: ResourceId;
  labelKey: TranslationKey;
  noteKey: TranslationKey;
  previewOnly: boolean;
}[] = [
  {
    id: 'hp',
    labelKey: 'province.resource.hp',
    noteKey: 'province.resource.fixtureOnly',
    previewOnly: false,
  },
  {
    id: 'stamina',
    labelKey: 'province.resource.stamina',
    noteKey: 'province.resource.fixtureOnly',
    previewOnly: false,
  },
  {
    id: 'mana',
    labelKey: 'province.resource.mana',
    noteKey: 'province.resource.fixtureOnly',
    previewOnly: false,
  },
  {
    id: 'hunger',
    labelKey: 'province.resource.hunger',
    noteKey: 'province.resource.hungerMeaning',
    previewOnly: true,
  },
  {
    id: 'infection',
    labelKey: 'province.resource.infection',
    noteKey: 'province.resource.infectionScale',
    previewOnly: true,
  },
];

function ResourceMeter({
  id,
  labelKey,
  noteKey,
  previewOnly,
}: (typeof resourceDefinitions)[number]) {
  const resource = provinceFixture.resources[id];

  return (
    <article className={previewOnly ? 'resource-meter resource-meter-preview' : 'resource-meter'}>
      <div className="resource-meter-heading">
        <h3>{t(labelKey)}</h3>
        <strong>
          {resource.current} <span aria-hidden="true">/</span> {resource.maximum}
        </strong>
      </div>
      <progress aria-label={t(labelKey)} value={resource.current} max={resource.maximum} />
      <div className="resource-meter-footer">
        <span>{t(noteKey)}</span>
        {previewOnly ? (
          <span className="preview-status">{t('province.resource.previewOnly')}</span>
        ) : (
          <span className="fixture-status">{t('province.resource.fixtureValue')}</span>
        )}
      </div>
    </article>
  );
}

export function ProvincePage() {
  const carryRemaining = provinceFixture.carry.capacityKg - provinceFixture.carry.currentKg;

  return (
    <section
      className="province-page"
      aria-labelledby="province-title"
      data-fixture-id={provinceFixture.id}
    >
      <header className="province-heading">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-marker" aria-hidden="true" />
            {t('province.eyebrow')}
          </p>
          <h1 id="province-title">{t('province.title')}</h1>
          <p className="province-intro">{t('province.description')}</p>
        </div>
        <span className="province-fixture-stamp">{t('province.fixtureStamp')}</span>
      </header>

      <div className="province-layout">
        <div className="province-main-column">
          <section
            className="province-panel hierarchy-panel"
            aria-labelledby="province-hierarchy-title"
          >
            <div className="province-section-heading">
              <div>
                <p className="card-eyebrow">{t('province.location.sectionLabel')}</p>
                <h2 id="province-hierarchy-title">{t('province.location.title')}</h2>
              </div>
              <span className="fixture-status">{t('province.location.placeholder')}</span>
            </div>

            <ol className="hierarchy-list">
              <li>
                <span className="hierarchy-level">{t('province.location.country')}</span>
                <strong>{t(provinceFixture.world.country.nameKey)}</strong>
                <span className="hierarchy-placeholder">{t('province.location.placeholder')}</span>
              </li>
              <li>
                <span className="hierarchy-level">{t('province.location.province')}</span>
                <strong>{t(provinceFixture.world.currentProvince.nameKey)}</strong>
                <span className="hierarchy-current">{t('province.location.current')}</span>
              </li>
              <li>
                <span className="hierarchy-level">{t('province.location.district')}</span>
                <strong>{t(provinceFixture.world.currentDistrict.nameKey)}</strong>
                <span className="hierarchy-placeholder">{t('province.location.placeholder')}</span>
              </li>
            </ol>

            <div className="current-location">
              <span className="location-marker" aria-hidden="true">
                ⌖
              </span>
              <div>
                <span className="card-eyebrow">{t('province.location.currentPosition')}</span>
                <strong>{t(provinceFixture.world.currentLocation.nameKey)}</strong>
                <p>{t('province.location.currentPositionNote')}</p>
              </div>
            </div>

            <div className="safe-zone-panel">
              <span className="safe-zone-symbol" aria-hidden="true">
                !
              </span>
              <div>
                <div className="safe-zone-heading">
                  <h3>{t('province.safeZone.title')}</h3>
                  <span className="safe-zone-outside">
                    {t(provinceFixture.world.safeZone.currentStatusKey)}
                  </span>
                </div>
                <p>{t('province.safeZone.description')}</p>
                <p className="safe-zone-reference">
                  <strong>{t(provinceFixture.world.safeZone.nameKey)}</strong>
                  <span>{t('province.safeZone.destinationNote')}</span>
                </p>
              </div>
            </div>
          </section>

          <section
            className="province-panel run-preview-panel"
            aria-labelledby="province-run-title"
          >
            <div className="province-section-heading">
              <div>
                <p className="card-eyebrow">{t('province.run.sectionLabel')}</p>
                <h2 id="province-run-title">{t('province.run.title')}</h2>
              </div>
              <span className="run-fixture-badge">{t(provinceFixture.standardRun.statusKey)}</span>
            </div>
            <div className="run-fixture-body">
              <div className="run-fixture-icon" aria-hidden="true">
                R
              </div>
              <div className="run-fixture-copy">
                <h3>{t(provinceFixture.standardRun.nameKey)}</h3>
                <p>{t('province.run.description')}</p>
                <dl className="run-facts">
                  <div>
                    <dt>{t('province.run.recommendedLevel')}</dt>
                    <dd>{provinceFixture.standardRun.recommendedLevel}</dd>
                  </div>
                  <div>
                    <dt>{t('province.run.threat')}</dt>
                    <dd>{t(provinceFixture.standardRun.threatKey)}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <button
              className="province-disabled-action"
              type="button"
              disabled
              aria-describedby="run-preflight-disabled-reason"
            >
              {t('province.run.detailsAction')}
              <span aria-hidden="true">→</span>
            </button>
            <p id="run-preflight-disabled-reason" className="disabled-action-reason">
              {t('province.run.preflightNotAvailable')}
            </p>
          </section>

          <section
            className="province-panel destinations-panel"
            aria-labelledby="province-destinations-title"
          >
            <div className="province-section-heading">
              <div>
                <p className="card-eyebrow">{t('province.destinations.sectionLabel')}</p>
                <h2 id="province-destinations-title">{t('province.destinations.title')}</h2>
              </div>
              <span className="fixture-status">{t('province.destinations.previewOnly')}</span>
            </div>
            <div className="destination-list">
              {provinceFixture.destinations.map((destination) => (
                <article className="destination-row" key={destination.id}>
                  <div className="destination-icon" aria-hidden="true">
                    ↗
                  </div>
                  <div className="destination-copy">
                    <h3>{t(destination.nameKey)}</h3>
                    <p>{t(destination.statusKey)}</p>
                  </div>
                  <button
                    type="button"
                    className="destination-disabled"
                    disabled
                    aria-describedby={`destination-disabled-${destination.id}`}
                  >
                    {t('province.destinations.unavailable')}
                  </button>
                  <span className="visually-hidden" id={`destination-disabled-${destination.id}`}>
                    {t('province.destinations.disabledReason')}
                  </span>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="province-side-column" aria-label={t('province.sidePanelLabel')}>
          <section
            className="province-panel resource-panel"
            aria-labelledby="province-resources-title"
          >
            <div className="province-section-heading">
              <div>
                <p className="card-eyebrow">{t('province.resource.sectionLabel')}</p>
                <h2 id="province-resources-title">{t('province.resource.title')}</h2>
              </div>
              <span className="fixture-status">{t('province.resource.snapshot')}</span>
            </div>
            <p className="resource-panel-note">{t('province.resource.description')}</p>
            <div className="resource-meter-list">
              {resourceDefinitions.map((resource) => (
                <ResourceMeter key={resource.id} {...resource} />
              ))}
            </div>
            <div className="resource-boundary-note">
              <strong>{t('province.resource.inactiveTitle')}</strong>
              <p>{t('province.resource.inactiveDescription')}</p>
            </div>
          </section>

          <section className="province-panel carry-panel" aria-labelledby="province-carry-title">
            <div className="province-section-heading">
              <div>
                <p className="card-eyebrow">{t('province.carry.sectionLabel')}</p>
                <h2 id="province-carry-title">{t('province.carry.title')}</h2>
              </div>
              <span className="fixture-status">{t('province.carry.fixtureOnly')}</span>
            </div>
            <div className="carry-value">
              <strong>{provinceFixture.carry.currentKg.toFixed(1)}</strong>
              <span>/ {provinceFixture.carry.capacityKg.toFixed(1)} kg</span>
            </div>
            <progress
              aria-label={t('province.carry.title')}
              value={provinceFixture.carry.currentKg}
              max={provinceFixture.carry.capacityKg}
            />
            <div className="carry-remaining">
              <span>{t('province.carry.remaining')}</span>
              <strong>{carryRemaining.toFixed(1)} kg</strong>
            </div>
            <p className="carry-note">{t('province.carry.description')}</p>
          </section>

          <section className="province-panel events-panel" aria-labelledby="province-events-title">
            <div className="province-section-heading">
              <div>
                <p className="card-eyebrow">{t('province.events.sectionLabel')}</p>
                <h2 id="province-events-title">{t('province.events.title')}</h2>
              </div>
            </div>
            <ul className="fixture-event-list">
              {provinceFixture.recentEventKeys.map((eventKey) => (
                <li key={eventKey}>
                  <span aria-hidden="true">•</span>
                  <p>{t(eventKey)}</p>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <div className="province-return-row">
        <Link className="return-link" to="/">
          {t('province.returnToStart')}
          <span aria-hidden="true">↗</span>
        </Link>
        <span className="province-footer-note">
          {t('province.footerNote')} · {prototypeFixture.version}
        </span>
      </div>
    </section>
  );
}
