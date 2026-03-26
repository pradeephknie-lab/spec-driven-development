import dotenv from 'dotenv';

dotenv.config();

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}. Copy .env.example to .env and set it locally.`);
  }

  return value;
}

export const runtimeConfig = {
  baseUrl: process.env.ORANGEHRM_BASE_URL?.trim() || 'https://opensource-demo.orangehrmlive.com',
  username: getRequiredEnv('ORANGEHRM_USERNAME'),
  password: getRequiredEnv('ORANGEHRM_PASSWORD'),
  headless: (process.env.HEADLESS?.trim() || 'true').toLowerCase() !== 'false',
  browserChannel: process.env.BROWSER_CHANNEL?.trim() || 'chrome'
};
