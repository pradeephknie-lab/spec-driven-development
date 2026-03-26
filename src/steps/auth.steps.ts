import { Given, Then, When } from '@cucumber/cucumber';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { runtimeConfig } from '../support/env';
import { CustomWorld } from '../support/world';

Given('I open the OrangeHRM login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.goto(runtimeConfig.baseUrl);
  await loginPage.assertLoaded();
});

When('I sign in with OrangeHRM credentials from the environment', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.login(runtimeConfig.username, runtimeConfig.password);
});

Then('I should land on the dashboard', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page!);
  await dashboardPage.assertLoaded();
});
