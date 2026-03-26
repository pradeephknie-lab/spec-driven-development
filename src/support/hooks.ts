import { After, Before, Status } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import path from 'path';
import { promises as fs } from 'fs';
import { runtimeConfig } from './env';
import { CustomWorld } from './world';

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({
    channel: runtimeConfig.browserChannel,
    headless: runtimeConfig.headless
  });

  this.context = await this.browser.newContext({
    viewport: { width: 1440, height: 1024 }
  });

  this.page = await this.context.newPage();
  this.directoryEntries = [];
  this.selectedJobTitle = '';
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshotDir = path.join(process.cwd(), 'reports');
    await fs.mkdir(screenshotDir, { recursive: true });

    const screenshotPath = path.join(
      screenshotDir,
      `${scenario.pickle.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.png`
    );

    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    await this.attach(`Saved failure screenshot to ${screenshotPath}`);
  }

  await this.context?.close();
  await this.browser?.close();
});
