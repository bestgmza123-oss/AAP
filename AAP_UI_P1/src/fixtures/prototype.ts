/**
 * Single canonical location for current local prototype metadata.
 * Gameplay fixtures and gameplay-tunable values are intentionally absent from P1-UI-001.
 */
export const prototypeFixture = {
  taskId: 'P1-UI-001',
  buildLabelKey: 'app.previewLabel',
  boundaryLabelKey: 'boundary.notice',
  runtimeMode: 'local-fixture-only',
  gameServerConnected: false,
  databaseConnected: false,
  gameplayFixtureCount: 0,
} as const;
