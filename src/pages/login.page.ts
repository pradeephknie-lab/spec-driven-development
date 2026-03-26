import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(baseUrl: string): Promise<void> {
    await this.page.goto(`${baseUrl}/web/index.php/auth/login`, {
      waitUntil: 'domcontentloaded'
    });
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async assertLoaded(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Login' })).toBeVisible();
  }
}
