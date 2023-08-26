import { defineConfig } from 'cypress';

export default defineConfig({
  screenshotOnRunFailure: true,
  e2e: {
    baseUrl: 'http://127.0.0.1:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        seedDatabase(filename) {
          // seeding logic here
          // Run your NodeJS code
          // e.g., edit a file here
          return filename;
        },
      });
    },
  },
});
