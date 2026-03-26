import { expect, type Page } from '@playwright/test';
import type { DirectoryEntry } from '../types/directory';

interface DirectoryEmployeeResponse {
  data: Array<{
    firstName?: string;
    middleName?: string;
    lastName?: string;
    jobTitle?: { title?: string };
    subunit?: { name?: string };
    location?: { name?: string };
  }>;
}

export class DirectoryPage {
  constructor(private readonly page: Page) {}

  private get jobTitleField() {
    return this.page.locator('.oxd-input-group', {
      has: this.page.getByText('Job Title')
    });
  }

  async assertLoaded(): Promise<void> {
    await expect(this.page.getByRole('button', { name: 'Search' })).toBeVisible();
    await expect(this.jobTitleField.locator('.oxd-select-text')).toBeVisible();
  }

  async filterByJobTitle(jobTitle: string): Promise<void> {
    await this.jobTitleField.locator('.oxd-select-text').click();
    await this.page.getByRole('option', { name: jobTitle }).click();
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (apiResponse) =>
          apiResponse.url().includes('/api/v2/directory/employees?') &&
          apiResponse.url().includes('jobTitleId=') &&
          apiResponse.request().method() === 'GET'
      ),
      this.page.getByRole('button', { name: 'Search' }).click()
    ]);

    await this.page.waitForLoadState('networkidle');

    const payload = (await response.json()) as DirectoryEmployeeResponse;
    this.lastResults = payload.data.map((employee) => ({
      name: [employee.firstName, employee.middleName, employee.lastName].filter(Boolean).join(' '),
      jobTitle: employee.jobTitle?.title ?? '',
      subUnit: employee.subunit?.name ?? '',
      location: employee.location?.name ?? ''
    }));
  }

  private lastResults: DirectoryEntry[] = [];

  getResults(): DirectoryEntry[] {
    expect(this.lastResults.length).toBeGreaterThan(0);
    return this.lastResults;
  }
}
