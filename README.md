# Ordino Playwright Boilerplate (v1)

Playwright-based test project using `@ordino.ai/ordino-engine`.

---

## What’s included

- **UI tests:** Login and home flows against the demo app (`https://demoapp.ordino.ai/login`).
- **API tests:** CRUD against the demo API (`https://demoapi.ordino.ai/api/`).
- **Reports:** JSON, HTML, JUnit, and Allure output under `ordino-report/`.
- **Entrypoint:** `ordino.initialize.js` — single script for install, run, open, debug, and report.

---

## Project structure

```
.
├── ordino/
│   ├── e2e/
│   │   ├── ui/              # UI specs (e.g. ordino_login.spec.ts, ordino_home.spec.ts)
│   │   ├── api/             # API specs (e.g. ordino_service.spec.ts)
│   │   └── service/         # API service layer and payloads
│   ├── pages/               # Page objects (Login, Home, SidePanel)
│   └── fixtures/            # Test fixtures (e.g. pages.ts)
├── ordino.config.ts         # Playwright config (testDir, reporters, projects)
├── ordino.initialize.js     # CLI: initialize, runTest, openTest, debugTest, openReport
├── merge-reports.js         # Optional: merge sharded JSON reports
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## Prerequisites

- **Node.js** 18+ (or as required by `@playwright/test` and the engine).
- **npm** (or use the project’s install script).

---

## Setup

1. **Install dependencies**

   ```bash
   npm run initialize
   ```

   This removes `package-lock.json` (if present) and runs `npm install`. You can pass extra flags, e.g.:

   ```bash
   npm run initialize -- --legacy-peer-deps
   ```

2. **Environment**

   If your project includes a `.env` file, it may look like:

   ```
   PROJECT_ID=your-project-uuid
   ```

   Do not edit the project ID in the env.

---

## NPM scripts

| Script | Command | Description |
|--------|--------|-------------|
| `initialize` | `node ordino.initialize.js --initialize` | Install dependencies (see Setup). |
| `oi:run:test` | `node ordino.initialize.js --runTest` | Run all tests headless. |
| `oi:open:test` | `node ordino.initialize.js --openTest` | Run tests with browser open (headed). |
| `oi:debug:test` | `node ordino.initialize.js --debugTest` | Run Playwright in UI mode for debugging. |
| `oi:open:report` | `node ordino.initialize.js --openReport` | Generate and open the Allure report from `ordino-report/`. |

All test commands use `ordino.config.ts` (test dir: `./ordino/e2e`). Reports are written to `ordino-report/`.

---

## How to run tests

- **Headless (CI-friendly):**
  ```bash
  npm run oi:run:test
  ```
- **Headed (see the browser):**
  ```bash
  npm run oi:open:test
  ```
- **Debug (Playwright UI):**
  ```bash
  npm run oi:debug:test
  ```
- **Filter by file or grep:**
  ```bash
  npm run oi:run:test -- ordino/e2e/ui/ordino_login.spec.ts
  npm run oi:run:test -- --grep "Valid Credentials"
  ```

After a run, open the last report:

```bash
npm run oi:open:report
```

---

## How to add or change tests

1. **UI tests**  
   - Add or edit specs under `ordino/e2e/ui/` (e.g. `*.spec.ts`).  
   - Use the existing page objects in `ordino/pages/` (e.g. `LoginPage`, `HomePage`) or add new ones.  
   - Fixtures are in `ordino/fixtures/pages.ts` (e.g. `loginPage`, `homePage`).

2. **API tests**  
   - Add or edit specs under `ordino/e2e/api/`.  
   - Reuse or extend `ordino/e2e/service/requests/ordinoService.ts` and payloads in `ordino/e2e/service/payloads/`.

3. **Config**  
   - Change test dir, timeouts, browsers, or reporters in `ordino.config.ts`.  
   - Base URL for UI tests is in `use.baseURL` (default: `https://demoapp.ordino.ai/login`).  
   - API base URL is set inside the service (default: `https://demoapi.ordino.ai/api/`).

4. **Merging sharded reports (optional)**  
   If you run tests in shards and have multiple JSON reports:

   ```bash
   node merge-reports.js <input-directory> <output-file>
   # Example:
   node merge-reports.js ./ordino-report ./ordino-report/merged.json
   ```

---

## Key files

- **ordino.config.ts** — Playwright configuration (testDir, reporters, projects, baseURL).
- **ordino.initialize.js** — Entrypoint for all npm scripts (install, run, open, debug, report).
- **merge-reports.js** — Standalone script to merge multiple Playwright JSON reports (e.g. after sharded runs).

---

## Troubleshooting

- **Tests fail with “browser not found”**  
  Run `npx playwright install` (or re-run `npm run initialize` if it installs browsers).

- **Allure report not opening**  
  Ensure you’ve run at least one test so `ordino-report/` exists, then run `npm run oi:open:report`.

- **TypeScript errors**  
  Check `tsconfig.json` and that dependencies are installed (`npm run initialize`).

---

## Next steps

- Point `baseURL` and API base URLs to your own app when moving off the demo.  
- Add CI (e.g. GitHub Actions) that runs `npm run oi:run:test` and publishes or uploads `ordino-report/`.  
- Add CI or reporting integration when you need it.
