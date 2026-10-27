/**
 * Single canonical location for current local prototype metadata.
 * Gameplay/display values live in named task fixtures, not in build metadata.
 */
export const prototypeFixture = {
  taskId: 'P1-UI-004',
  version: '0.1.0',
  fixtureIdentity: 'AAP-LOCAL-001',
  buildLabelKey: 'app.previewLabel',
  boundaryLabelKey: 'boundary.notice',
  runtimeMode: 'local-fixture-only',
  gameServerConnected: false,
  databaseConnected: false,
  gameplayFixtureCount: 0,
} as const;
