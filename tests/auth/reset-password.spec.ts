import { test, expect } from '@playwright/test';

const ROUTE = '/reset-password/test-token-abc123';

test.describe('Reset Password (/reset-password/[token])', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTE);
    await page.getByRole('heading', { name: 'Set new password' }).waitFor({ state: 'visible', timeout: 8000 });
  });

  test('renders form with correct heading and fields', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Set new password' })).toBeVisible();
    await expect(page.locator('#new-password')).toBeVisible();
    await expect(page.locator('#confirm-password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Set new password' })).toBeVisible();
  });

  test('displays token excerpt in UI', async ({ page }) => {
    await expect(page.getByText(/Token:/)).toBeVisible();
  });

  test('strength meter appears when typing password', async ({ page }) => {
    await page.locator('#new-password').fill('abc');
    await expect(page.locator('#strength-meter')).toBeVisible();
  });

  test('strength meter shows "Very weak" for 8-char lowercase password', async ({ page }) => {
    await page.locator('#new-password').fill('abcdefgh');
    await expect(page.locator('#strength-meter p')).toHaveText('Very weak', { timeout: 3000 });
  });

  test('strength meter shows "Strong" for password with all 4 criteria (under 12 chars)', async ({ page }) => {
    await page.locator('#new-password').fill('Password1!');
    await expect(page.locator('#strength-meter p')).toHaveText('Strong', { timeout: 3000 });
  });

  test('strength meter shows "Very strong" for long complex password', async ({ page }) => {
    await page.locator('#new-password').fill('MyP@ssw0rd123');
    await expect(page.locator('#strength-meter p')).toHaveText('Very strong', { timeout: 3000 });
  });

  test('requirements checklist ticks for length ≥ 8', async ({ page }) => {
    await page.locator('#new-password').fill('longpassword');
    await expect(page.getByText('At least 8 characters')).toBeVisible();
  });

  test('requirements checklist ticks for uppercase', async ({ page }) => {
    await page.locator('#new-password').fill('Abc');
    await expect(page.getByText('One uppercase letter')).toBeVisible();
  });

  test('requirements checklist ticks for number', async ({ page }) => {
    await page.locator('#new-password').fill('abc1');
    await expect(page.getByText('One number')).toBeVisible();
  });

  test('shows mismatch error inline when confirm differs', async ({ page }) => {
    await page.locator('#new-password').fill('Password123!');
    await page.locator('#confirm-password').fill('Different1!');
    await page.locator('#confirm-password').blur();
    await expect(page.getByText('Passwords do not match')).toBeVisible({ timeout: 3000 });
  });

  test('shows error when password is too short on submit', async ({ page }) => {
    await page.locator('#new-password').fill('short');
    await page.locator('#confirm-password').fill('short');
    await page.getByRole('button', { name: 'Set new password' }).click();
    await expect(page.getByText('Password must be at least 8 characters.')).toBeVisible({ timeout: 4000 });
  });

  test('shows error when passwords do not match on submit', async ({ page }) => {
    await page.locator('#new-password').fill('StrongPass1!');
    await page.locator('#confirm-password').fill('Different99!');
    await page.getByRole('button', { name: 'Set new password' }).click();
    await expect(page.getByText('Passwords do not match.')).toBeVisible({ timeout: 4000 });
  });

  test('success screen appears after valid submission', async ({ page }) => {
    await page.locator('#new-password').fill('StrongPass1!');
    await page.locator('#confirm-password').fill('StrongPass1!');
    await page.getByRole('button', { name: 'Set new password' }).click();
    await expect(page.getByText('Password updated!')).toBeVisible({ timeout: 6000 });
    await expect(page.getByText(/now signed in/i)).toBeVisible();
  });

  test('success screen shows redirect countdown', async ({ page }) => {
    await page.locator('#new-password').fill('StrongPass1!');
    await page.locator('#confirm-password').fill('StrongPass1!');
    await page.getByRole('button', { name: 'Set new password' }).click();
    await expect(page.getByText(/Redirecting in \ds/)).toBeVisible({ timeout: 6000 });
  });

  test('success screen has "Go to ZSTREAM" link', async ({ page }) => {
    await page.locator('#new-password').fill('StrongPass1!');
    await page.locator('#confirm-password').fill('StrongPass1!');
    await page.getByRole('button', { name: 'Set new password' }).click();
    const link = page.getByRole('link', { name: /Go to ZSTREAM/i });
    await expect(link).toBeVisible({ timeout: 6000 });
    await expect(link).toHaveAttribute('href', '/');
  });
});
