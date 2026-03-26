# Running The OrangeHRM HR Manager Project

## 1. Install dependencies

```bash
npm install
npx playwright install
```

## 2. Configure local environment variables

Copy `.env.example` to `.env` and set these values locally:

```bash
ORANGEHRM_BASE_URL=https://opensource-demo.orangehrmlive.com
ORANGEHRM_USERNAME=<set locally>
ORANGEHRM_PASSWORD=<set locally>
HEADLESS=true
BROWSER_CHANNEL=chrome
```

The demo portal shows sample credentials on its login page. Keep your `.env` file local and out of source control.

## 3. Run the BDD test suite

```bash
npm run test:bdd
```

For a visible browser session:

```bash
npm run test:bdd:headed
```

Outputs:

- `reports/cucumber-report.html`
- `reports/cucumber-report.json`
- `artifacts/hr-managers.json`

## 4. View the local frontend report

Start the static server:

```bash
npm run app
```

Then open:

```text
http://127.0.0.1:4173/app/
```

The page reads `artifacts/hr-managers.json` and displays the latest extracted HR Manager results.

## Project Structure

- `features/`: BDD feature files.
- `src/pages/`: Playwright Page Object Model classes.
- `src/steps/`: Cucumber step definitions.
- `src/support/`: hooks, world state, and environment loading.
- `src/utils/`: local artifact/report generation.
- `app/`: local frontend viewer for the generated HR Manager report.
