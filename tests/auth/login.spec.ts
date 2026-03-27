import { test, expect } from '@playwright/test';

test.describe('Login Page (/login)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByText('Welcome back').waitFor({ state: 'visible', timeout: 8000 });
  });

  test('renders ZSTREAM branding and heading', async ({ page }) => {
    await expect(page.getByText('ZSTREAM').first()).toBeVisible();
    await expect(page.getByText('Zero Carbon Streaming').first()).toBeVisible();
    await expect(page.getByText('Welcome back')).toBeVisible();
    await expect(page.getByText('Sign in to your ZSTREAM account')).toBeVisible();
  });

  test('shows email and password fields in password mode', async ({ page }) => {
    await page.waitForTimeout(400);
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
  });

  test('shows Forgot password link linking to /forgot-password', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Forgot password?' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/forgot-password');
  });

  test('remember me toggle changes state on click', async ({ page }) => {
    const toggle = page.getByRole('checkbox', { name: 'Remember me' });
    await expect(toggle).toHaveAttribute('aria-checked', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  test('show/hide password toggle works', async ({ page }) => {
    await page.waitForTimeout(400);
    const pwInput = page.locator('#password');
    await expect(pwInput).toHaveAttribute('type', 'password');
    await page.getByRole('button', { name: 'Show password' }).click();
    await expect(pwInput).toHaveAttribute('type', 'text');
    await page.getByRole('button', { name: 'Hide password' }).click();
    await expect(pwInput).toHaveAttribute('type', 'password');
  });

  test('shows error when submitting empty fields', async ({ page }) => {
    await page.waitForTimeout(400);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('Please fill in all fields.')).toBeVisible({ timeout: 4000 });
  });

  test('switches to magic link mode and shows correct UI', async ({ page }) => {
    await page.getByRole('button', { name: /Magic Link/i }).click();
    await page.waitForTimeout(400);
    await expect(page.getByRole('button', { name: 'Send magic link' })).toBeVisible();
    await expect(page.locator('#magic-email')).toBeVisible();
  });

  test('switching back to password mode shows password field', async ({ page }) => {
    await page.getByRole('button', { name: /Magic Link/i }).click();
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: /Password/i }).click();
    await page.waitForTimeout(400);
    await expect(page.locator('#password')).toBeVisible();
  });

  test('magic link shows error on empty email', async ({ page }) => {
    await page.getByRole('button', { name: /Magic Link/i }).click();
    await page.waitForTimeout(400);
    await page.getByRole('button', { name: 'Send magic link' }).click();
    await expect(page.getByText('Enter your email address.')).toBeVisible({ timeout: 4000 });
  });

  test('magic link success shows inbox confirmation', async ({ page }) => {
    await page.getByRole('button', { name: /Magic Link/i }).click();
    await page.waitForTimeout(400);
    await page.locator('#magic-email').fill('test@example.com');
    await page.getByRole('button', { name: 'Send magic link' }).click();
    await expect(page.getByText('Check your inbox')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('test@example.com')).toBeVisible();
  });

  test('renders Google and GitHub OAuth buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Google/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /GitHub/i })).toBeVisible();
  });

  test('carbon footprint note is visible', async ({ page }) => {
    await expect(page.getByText(/0.0001g CO₂/)).toBeVisible();
    await expect(page.getByText(/we offset it/i)).toBeVisible();
  });

  test('register link navigates to /register', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Create one free' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/register');
  });
});
