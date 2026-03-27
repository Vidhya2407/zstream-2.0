import { test, expect } from '@playwright/test';

test.describe('Forgot Password (/forgot-password)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/forgot-password');
    await page.getByText('Forgot password?').waitFor({ state: 'visible', timeout: 8000 });
  });

  test('renders page with correct heading and email field', async ({ page }) => {
    await expect(page.getByText('Forgot password?')).toBeVisible();
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send reset link' })).toBeVisible();
  });

  test('ZSTREAM branding is present', async ({ page }) => {
    await expect(page.getByText('ZSTREAM').first()).toBeVisible();
  });

  test('shows error on empty submit', async ({ page }) => {
    await page.getByRole('button', { name: 'Send reset link' }).click();
    await expect(page.getByText('Enter a valid email address.')).toBeVisible({ timeout: 4000 });
  });

  test('shows error on invalid email format', async ({ page }) => {
    await page.getByLabel('Email address').fill('notanemail');
    await page.getByRole('button', { name: 'Send reset link' }).click();
    await expect(page.getByText('Enter a valid email address.')).toBeVisible({ timeout: 4000 });
  });

  test('transitions to confirmation screen on valid email', async ({ page }) => {
    await page.getByLabel('Email address').fill('user@zstream.eco');
    await page.getByRole('button', { name: 'Send reset link' }).click();
    await expect(page.getByText('Check your email')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('user@zstream.eco')).toBeVisible();
    await expect(page.getByText(/Reset link sent to/i)).toBeVisible();
  });

  test('confirmation screen shows expiry note', async ({ page }) => {
    await page.getByLabel('Email address').fill('user@zstream.eco');
    await page.getByRole('button', { name: 'Send reset link' }).click();
    await expect(page.getByText(/expires in 30 minutes/i)).toBeVisible({ timeout: 5000 });
  });

  test('resend button appears after confirmation', async ({ page }) => {
    await page.getByLabel('Email address').fill('user@zstream.eco');
    await page.getByRole('button', { name: 'Send reset link' }).click();
    await page.getByText('Check your email').waitFor({ state: 'visible', timeout: 5000 });
    await expect(page.getByRole('button', { name: /Resend/ })).toBeVisible();
  });

  test('resend button enters cooldown state', async ({ page }) => {
    await page.getByLabel('Email address').fill('user@zstream.eco');
    await page.getByRole('button', { name: 'Send reset link' }).click();
    await page.getByText('Check your email').waitFor({ state: 'visible', timeout: 5000 });
    await expect(page.getByRole('button', { name: /Resend in \d+s/ })).toBeVisible();
  });

  test('"Back to login" link on form navigates to /login', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Back to login' });
    await expect(link).toHaveAttribute('href', '/login');
  });

  test('"Back to login" link on confirmation screen navigates to /login', async ({ page }) => {
    await page.getByLabel('Email address').fill('user@zstream.eco');
    await page.getByRole('button', { name: 'Send reset link' }).click();
    await page.getByText('Check your email').waitFor({ state: 'visible', timeout: 5000 });
    const link = page.getByRole('link', { name: 'Back to login' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/login');
  });
});
