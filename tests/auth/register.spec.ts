import { test, expect } from '@playwright/test';

test.describe('Register Page (/register)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
    await page.getByText('Create account').waitFor({ state: 'visible', timeout: 8000 });
  });

  // ── Step 1: Account Info ──
  test('renders step 1 with correct fields and branding', async ({ page }) => {
    await expect(page.getByText('ZSTREAM').first()).toBeVisible();
    await expect(page.getByText('Create account')).toBeVisible();
    await expect(page.getByLabel('Full name')).toBeVisible();
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.locator('#reg-pw')).toBeVisible();
    await expect(page.locator('#reg-confirm-pw')).toBeVisible();
  });

  test('step bar shows 5 steps', async ({ page }) => {
    for (const n of ['1', '2', '3', '4', '5']) {
      await expect(page.getByText(n, { exact: true }).first()).toBeVisible();
    }
  });

  test('shows error when full name is empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Continue →' }).click();
    await expect(page.getByText('Please enter your full name.')).toBeVisible({ timeout: 4000 });
  });

  test('shows error when email is invalid', async ({ page }) => {
    await page.getByLabel('Full name').fill('Ada Lovelace');
    await page.getByLabel('Email address').fill('notvalid');
    await page.getByRole('button', { name: 'Continue →' }).click();
    await expect(page.getByText('Enter a valid email address.')).toBeVisible({ timeout: 4000 });
  });

  test('shows error when password is too short', async ({ page }) => {
    await page.getByLabel('Full name').fill('Ada Lovelace');
    await page.getByLabel('Email address').fill('ada@example.com');
    await page.locator('#reg-pw').fill('short');
    await page.locator('#reg-confirm-pw').fill('short');
    await page.getByRole('button', { name: 'Continue →' }).click();
    await expect(page.getByText('Password must be at least 8 characters.')).toBeVisible({ timeout: 4000 });
  });

  test('shows error when passwords do not match', async ({ page }) => {
    await page.getByLabel('Full name').fill('Ada Lovelace');
    await page.getByLabel('Email address').fill('ada@example.com');
    await page.locator('#reg-pw').fill('StrongPass1!');
    await page.locator('#reg-confirm-pw').fill('DifferentPass!');
    await page.getByRole('button', { name: 'Continue →' }).click();
    await expect(page.getByText('Passwords do not match.')).toBeVisible({ timeout: 4000 });
  });

  test('password strength meter appears on input', async ({ page }) => {
    await page.locator('#reg-pw').fill('Test1234');
    await expect(page.locator('[aria-label="Password strength"]')).toBeVisible({ timeout: 3000 });
  });

  test('avatar upload button is clickable', async ({ page }) => {
    const avatarBtn = page.getByRole('button', { name: 'Upload avatar' });
    await expect(avatarBtn).toBeVisible();
  });

  test('sign in link navigates to /login', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/login');
  });

  // ── Step 2: Tier Selection ──
  test('valid step 1 advances to tier selection', async ({ page }) => {
    await fillStep1(page);
    await expect(page.getByText('Choose your plan')).toBeVisible({ timeout: 5000 });
  });

  test('all three subscription tiers are shown', async ({ page }) => {
    await fillStep1(page);
    await expect(page.getByText('Free', { exact: true })).toBeVisible();
    await expect(page.getByText('Green', { exact: true })).toBeVisible();
    await expect(page.getByText('Carbon Zero', { exact: true })).toBeVisible();
  });

  test('Green tier has POPULAR badge', async ({ page }) => {
    await fillStep1(page);
    await expect(page.getByText('POPULAR')).toBeVisible();
  });

  test('tier cards are selectable', async ({ page }) => {
    await fillStep1(page);
    const freeBtn = page.getByRole('button', { name: /Free/i }).first();
    await freeBtn.click();
    await expect(freeBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('back button from tier returns to account step', async ({ page }) => {
    await fillStep1(page);
    await page.getByRole('button', { name: '← Back' }).click();
    await expect(page.getByText('Create account')).toBeVisible({ timeout: 4000 });
  });

  test('tier tiers show CO₂ savings', async ({ page }) => {
    await fillStep1(page);
    await expect(page.getByText(/saved\/month/)).toHaveCount(3);
  });

  // ── Step 3: DSGVO Consent ──
  test('advancing from tier shows DSGVO consent step', async ({ page }) => {
    await fillStep1(page);
    await page.getByRole('button', { name: 'Continue →' }).click();
    await expect(page.getByText('Privacy & Consent')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/DSGVO/i).first()).toBeVisible();
  });

  test('continue is blocked without required consent', async ({ page }) => {
    await fillStep1(page);
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Continue →' }).click();
    await page.getByText('Privacy & Consent').waitFor({ state: 'visible', timeout: 8000 });
    await expect(page.getByRole('button', { name: 'Continue →' })).toBeDisabled();
  });

  test('required DSGVO checkboxes are toggleable', async ({ page }) => {
    await fillStep1(page);
    await page.getByRole('button', { name: 'Continue →' }).click();
    await page.getByText('Privacy & Consent').waitFor({ state: 'visible', timeout: 5000 });
    const ageCheck = page.getByRole('checkbox', { name: /16 years/i });
    await expect(ageCheck).toHaveAttribute('aria-checked', 'false');
    await ageCheck.click();
    await expect(ageCheck).toHaveAttribute('aria-checked', 'true');
  });

  test('marketing consent is optional and toggleable', async ({ page }) => {
    await fillStep1(page);
    await page.getByRole('button', { name: 'Continue →' }).click();
    await page.getByText('Privacy & Consent').waitFor({ state: 'visible', timeout: 5000 });
    const marketing = page.getByRole('checkbox', { name: /personalised emails/i });
    await marketing.click();
    await expect(marketing).toHaveAttribute('aria-checked', 'true');
  });

  test('data controller info is displayed', async ({ page }) => {
    await fillStep1(page);
    await page.getByRole('button', { name: 'Continue →' }).click();
    await page.getByText('Privacy & Consent').waitFor({ state: 'visible', timeout: 5000 });
    await expect(page.getByText(/ZSTREAM GmbH/)).toBeVisible();
    await expect(page.getByText(/privacy@zstream.eco/)).toBeVisible();
  });

  // ── Step 4: CO₂ Goal ──
  test('advancing from consent shows CO₂ goal step', async ({ page }) => {
    await fillStep1(page);
    await page.getByRole('button', { name: 'Continue →' }).click();
    await fillConsent(page);
    await expect(page.getByText(/Set your CO₂ goal/i)).toBeVisible({ timeout: 5000 });
  });

  test('all 4 CO₂ goal options are visible', async ({ page }) => {
    await fillStep1(page);
    await page.getByRole('button', { name: 'Continue →' }).click();
    await fillConsent(page);
    await expect(page.getByText('100g/month')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('500g/month')).toBeVisible();
    await expect(page.getByText('1kg/month')).toBeVisible();
    await expect(page.getByText('Max possible')).toBeVisible();
  });

  test('CO₂ goal buttons are aria-pressed toggleable', async ({ page }) => {
    await fillStep1(page);
    await page.getByRole('button', { name: 'Continue →' }).click();
    await fillConsent(page);
    const goal = page.getByRole('button', { name: /500g\/month/i });
    await goal.click();
    await expect(goal).toHaveAttribute('aria-pressed', 'true');
  });

  // ── Step 5: Onboarding ──
  test('advancing from goals shows genre/language/region step', async ({ page }) => {
    await fillStep1(page);
    await page.getByRole('button', { name: 'Continue →' }).click();
    await fillConsent(page);
    await page.getByRole('button', { name: /500g\/month/i }).click();
    await page.getByRole('button', { name: 'Continue →' }).click();
    await expect(page.getByText('Personalise your feed')).toBeVisible({ timeout: 5000 });
  });

  test('genre chips are selectable', async ({ page }) => {
    await fillToOnboarding(page);
    const genre = page.getByRole('button', { name: 'Action', exact: true });
    await expect(genre).toHaveAttribute('aria-pressed', 'false');
    await genre.click();
    await expect(genre).toHaveAttribute('aria-pressed', 'true');
  });

  test('create account button is disabled with no genres', async ({ page }) => {
    await fillToOnboarding(page);
    await expect(page.getByRole('button', { name: /Create account/i })).toBeDisabled();
  });

  test('create account button enables after genre selection', async ({ page }) => {
    await fillToOnboarding(page);
    await page.getByRole('button', { name: 'Action', exact: true }).click();
    await expect(page.getByRole('button', { name: /Create account/i })).toBeEnabled();
  });

  test('language and region dropdowns are present', async ({ page }) => {
    await fillToOnboarding(page);
    await expect(page.getByLabel('Preferred language')).toBeVisible();
    await expect(page.getByLabel('Region')).toBeVisible();
  });

  // ── Step 6: Done screen ──
  test('completing wizard shows welcome done screen', async ({ page }) => {
    await fillFullWizard(page);
    await expect(page.getByText('Welcome to ZSTREAM!')).toBeVisible({ timeout: 8000 });
  });

  test('done screen shows selected email', async ({ page }) => {
    await fillFullWizard(page);
    await expect(page.getByText('ada@zstream-test.eco')).toBeVisible({ timeout: 8000 });
  });

  test('done screen shows sustainability profile', async ({ page }) => {
    await fillFullWizard(page);
    await expect(page.getByText(/Your sustainability profile/)).toBeVisible({ timeout: 8000 });
    await expect(page.getByText('500g/month').first()).toBeVisible({ timeout: 8000 });
  });

  test('done screen has "Start watching" link to /', async ({ page }) => {
    await fillFullWizard(page);
    const link = page.getByRole('link', { name: /Start watching/i });
    await expect(link).toBeVisible({ timeout: 8000 });
    await expect(link).toHaveAttribute('href', '/');
  });
});

// ── Helpers ──

async function fillStep1(page: import('@playwright/test').Page) {
  await page.getByLabel('Full name').fill('Ada Lovelace');
  await page.getByLabel('Email address').fill('ada@zstream-test.eco');
  await page.locator('#reg-pw').fill('StrongPass1!');
  await page.locator('#reg-confirm-pw').fill('StrongPass1!');
  await page.getByRole('button', { name: 'Continue →' }).click();
  await page.getByText('Choose your plan').waitFor({ state: 'visible', timeout: 6000 });
  await page.waitForTimeout(350);
}

async function fillConsent(page: import('@playwright/test').Page) {
  await page.getByText('Privacy & Consent').waitFor({ state: 'visible', timeout: 6000 });
  await page.getByRole('checkbox', { name: /16 years/i }).click();
  await page.getByRole('checkbox', { name: /Privacy Policy/i }).click();
  await page.getByRole('button', { name: 'Continue →' }).click();
  await page.getByText(/Set your CO₂ goal/i).waitFor({ state: 'visible', timeout: 6000 });
}

async function fillToOnboarding(page: import('@playwright/test').Page) {
  await fillStep1(page);
  await page.getByRole('button', { name: 'Continue →' }).click();
  await fillConsent(page);
  await page.getByRole('button', { name: /500g\/month/i }).click();
  await page.getByRole('button', { name: 'Continue →' }).click();
  await page.getByText('Personalise your feed').waitFor({ state: 'visible', timeout: 6000 });
}

async function fillFullWizard(page: import('@playwright/test').Page) {
  await fillToOnboarding(page);
  await page.getByRole('button', { name: 'Action', exact: true }).click();
  await page.getByRole('button', { name: /Create account/i }).click();
}
