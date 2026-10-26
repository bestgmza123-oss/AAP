/**
 * Single canonical location for current local prototype metadata.
 * Identity is a non-account fixture; no gameplay-tunable values are stored here.
 */
export const prototypeFixture = {
  taskId: 'P1-UI-002',
  version: '0.1.0',
  fixtureIdentity: 'AAP-LOCAL-001',
  buildLabelKey: 'app.previewLabel',
  boundaryLabelKey: 'boundary.notice',
  runtimeMode: 'local-fixture-only',
  gameServerConnected: false,
  databaseConnected: false,
  gameplayFixtureCount: 0,
} as const;
