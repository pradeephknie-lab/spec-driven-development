import { expect, type Page } from '@playwright/test';

export class DashboardPage {
  constructor(private readonly page: Page) {}

  async assertLoaded(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  }

  async openDirectory(): Promise<void> {
    await this.page.getByRole('link', { name: 'Directory' }).click();
  }
}
