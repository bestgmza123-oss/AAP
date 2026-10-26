import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Vitest runs without globals; explicitly clean the DOM between tests.
afterEach(() => {
  cleanup();
});
