import { defineConfig } from '@playwright/test';

export default defineConfig({
    timeout: 60000,
    expect: { timeout: 15000 },
    use: {
        baseURL: 'https://practicesoftwaretesting.com',
        testIdAttribute: 'data-test',
    },
});