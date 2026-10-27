export const provinceFixture = {
  id: 'province-fixture-velra-001',
  world: {
    country: { id: 'country-acheria', nameKey: 'province.world.acheria' },
    currentProvince: { id: 'province-velra', nameKey: 'province.world.velra' },
    currentDistrict: { id: 'district-velra-outskirts', nameKey: 'province.world.velraOutskirts' },
    currentLocation: { id: 'location-outskirts-checkpoint', nameKey: 'province.world.checkpoint' },
    safeZone: {
      id: 'location-lumen-capital',
      nameKey: 'province.world.lumenCapital',
      currentStatusKey: 'province.safeZone.outside',
    },
  },
  standardRun: {
    id: 'run-fixture-standard-velra',
    nameKey: 'province.run.standardName',
    statusKey: 'province.run.listedFixture',
    recommendedLevel: '1–5',
    threatKey: 'province.run.threatNormal',
  },
  resources: {
    hp: { current: 86, maximum: 120 },
    stamina: { current: 186, maximum: 240 },
    mana: { current: 42, maximum: 60 },
    hunger: { current: 84, maximum: 100 },
    infection: { current: 12, maximum: 100 },
  },
  carry: { currentKg: 8.5, capacityKg: 20 },
  recentEventKeys: ['province.events.arrived', 'province.events.noRunStarted'],
  destinations: [
    {
      id: 'destination-lumen-capital',
      nameKey: 'province.destinations.lumen',
      statusKey: 'province.destinations.travelInactive',
    },
    {
      id: 'destination-other-provinces',
      nameKey: 'province.destinations.otherProvinces',
      statusKey: 'province.destinations.notBuilt',
    },
  ],
} as const;
