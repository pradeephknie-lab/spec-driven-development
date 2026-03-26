import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { DirectoryPage } from '../pages/directory.page';
import { writeDirectoryReport } from '../utils/report-writer';
import { CustomWorld } from '../support/world';

When('I open the directory page', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page!);
  const directoryPage = new DirectoryPage(this.page!);

  await dashboardPage.openDirectory();
  await directoryPage.assertLoaded();
});

When('I filter the directory by job title {string}', async function (this: CustomWorld, jobTitle: string) {
  const directoryPage = new DirectoryPage(this.page!);
  await directoryPage.filterByJobTitle(jobTitle);
  this.directoryEntries = directoryPage.getResults();
  this.selectedJobTitle = jobTitle;
});

Then('each directory result should have the job title {string}', async function (this: CustomWorld, jobTitle: string) {
  expect(this.directoryEntries.length).toBeGreaterThan(0);

  for (const entry of this.directoryEntries) {
    expect(entry.jobTitle).toBe(jobTitle);
  }
});

Then('I print the HR Manager list', async function (this: CustomWorld) {
  const lines = this.directoryEntries.map(
    (entry, index) => `${index + 1}. ${entry.name} | ${entry.jobTitle} | ${entry.subUnit} | ${entry.location}`
  );

  console.log('HR Manager Directory Results');
  console.log(lines.join('\n'));
  await this.attach(lines.join('\n'));
});

Then('I save the HR Manager report artifact', async function (this: CustomWorld) {
  const artifactPath = await writeDirectoryReport(this.selectedJobTitle, this.directoryEntries);
  await this.attach(`Saved HR Manager report to ${artifactPath}`);
});
