import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'scripts/lib/**/*.test.ts', 'infra/cloudflare/**/*.test.ts'],
  },
});
