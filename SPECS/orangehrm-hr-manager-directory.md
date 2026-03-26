# Feature Spec: OrangeHRM HR Manager Directory Search

## Goal
- Provide a local, maintainable automation project that logs into the OrangeHRM demo portal, filters the employee directory by the HR Manager job title, and captures the matching employees in a reusable report.

## Scope
- In:
  - Playwright-based browser automation against the hosted OrangeHRM demo site.
  - BDD scenarios implemented with Cucumber.
  - Page Object Model structure for login, dashboard, and directory workflows.
  - Local report generation that prints and persists the HR Manager list.
  - A small frontend viewer that displays the generated HR Manager report locally.
- Out:
  - Changes to the hosted OrangeHRM application.
  - Backend services or data persistence outside generated local artifacts.
  - Hardcoded credentials in source control.

## Requirements
- Credentials must be supplied through local environment variables.
- The automation must open the OrangeHRM login page, authenticate, navigate to Directory, and filter by the HR Manager job title.
- The framework must extract the matching employee names and associated directory metadata from the filtered search response.
- The extracted list must be printed during execution and saved to a local artifact file.
- The repository must include local run instructions for the BDD tests and the local report viewer.

## Acceptance Criteria
- [x] A BDD feature file covers successful authentication and HR Manager directory filtering.
- [x] Playwright page objects encapsulate login, dashboard navigation, and directory interactions.
- [x] Running the BDD suite locally can generate an `artifacts/hr-managers.json` report.
- [x] The report artifact contains the searched job title, generated timestamp, total results, and employee entries.
- [x] A local frontend viewer can render the generated report artifact when served locally.
- [x] Documentation explains environment setup, test execution, and report viewing.
