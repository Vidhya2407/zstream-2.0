import { test, expect } from '@playwright/test';

test.describe('Security / 2FA Page (/settings/security)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings/security');
    await page.getByText('Authenticator App (TOTP)').waitFor({ state: 'visible', timeout: 8000 });
  });

  test('renders page heading and all four sections', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Security' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Authenticator App (TOTP)' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'SMS Fallback' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Backup Codes' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Change Password' })).toBeVisible();
  });

  // ── TOTP ──
  test('TOTP section shows "Not enabled" status', async ({ page }) => {
    await expect(page.getByText('Not enabled')).toBeVisible();
  });

  test('TOTP setup button opens QR/secret panel', async ({ page }) => {
    await page.getByRole('button', { name: /Set up authenticator app/i }).click();
    await expect(page.getByText(/Scan QR code/i)).toBeVisible({ timeout: 3000 });
    await expect(page.getByText('Manual entry secret')).toBeVisible();
    await expect(page.getByText('JBSWY3DPEHPK3PXP')).toBeVisible();
  });

  test('TOTP secret copy button is visible', async ({ page }) => {
    await page.getByRole('button', { name: /Set up authenticator app/i }).click();
    await expect(page.getByRole('button', { name: 'Copy secret' })).toBeVisible({ timeout: 3000 });
  });

  test('TOTP verify button is disabled when code is incomplete', async ({ page }) => {
    await page.getByRole('button', { name: /Set up authenticator app/i }).click();
    await page.getByLabel('TOTP verification code').waitFor({ state: 'visible', timeout: 3000 });
    const verifyBtn = page.getByRole('button', { name: 'Verify' }).first();
    await expect(verifyBtn).toBeDisabled();
  });

  test('TOTP verify button enables with 6-digit code', async ({ page }) => {
    await page.getByRole('button', { name: /Set up authenticator app/i }).click();
    await page.getByLabel('TOTP verification code').waitFor({ state: 'visible', timeout: 3000 });
    await page.getByLabel('TOTP verification code').fill('123456');
    const verifyBtn = page.getByRole('button', { name: 'Verify' }).first();
    await expect(verifyBtn).toBeEnabled();
  });

  test('TOTP verify button is disabled for fewer than 6 digits', async ({ page }) => {
    await page.getByRole('button', { name: /Set up authenticator app/i }).click();
    await page.getByLabel('TOTP verification code').waitFor({ state: 'visible', timeout: 3000 });
    await page.getByLabel('TOTP verification code').fill('123');
    await expect(page.getByRole('button', { name: 'Verify' }).first()).toBeDisabled();
  });

  test('TOTP verify success shows enabled state', async ({ page }) => {
    await page.getByRole('button', { name: /Set up authenticator app/i }).click();
    await page.getByLabel('TOTP verification code').waitFor({ state: 'visible', timeout: 3000 });
    await page.getByLabel('TOTP verification code').fill('123456');
    await page.getByRole('button', { name: 'Verify' }).first().click();
    await expect(page.getByText('Authenticator app enabled')).toBeVisible({ timeout: 5000 });
  });

  test('TOTP cancel button returns to idle state', async ({ page }) => {
    await page.getByRole('button', { name: /Set up authenticator app/i }).click();
    await page.getByRole('button', { name: 'Cancel' }).waitFor({ state: 'visible', timeout: 3000 });
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByText('Not enabled')).toBeVisible({ timeout: 3000 });
  });

  // ── SMS ──
  test('SMS section shows phone input and send button', async ({ page }) => {
    await expect(page.getByLabel('Phone number for SMS 2FA')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send code' })).toBeVisible();
  });

  test('SMS: entering phone and sending shows OTP entry', async ({ page }) => {
    await page.getByLabel('Phone number for SMS 2FA').fill('+49 151 12345678');
    await page.getByRole('button', { name: 'Send code' }).click();
    await expect(page.getByLabel('SMS verification code')).toBeVisible({ timeout: 3000 });
    await expect(page.getByRole('button', { name: 'Verify' }).last()).toBeVisible();
  });

  test('SMS: OTP verify button disabled when code empty', async ({ page }) => {
    await page.getByLabel('Phone number for SMS 2FA').fill('+49 151 12345678');
    await page.getByRole('button', { name: 'Send code' }).click();
    await page.getByLabel('SMS verification code').waitFor({ state: 'visible', timeout: 3000 });
    await expect(page.getByRole('button', { name: 'Verify' }).last()).toBeDisabled();
  });

  test('SMS: successful verify shows enabled state', async ({ page }) => {
    await page.getByLabel('Phone number for SMS 2FA').fill('+49 151 12345678');
    await page.getByRole('button', { name: 'Send code' }).click();
    await page.getByLabel('SMS verification code').waitFor({ state: 'visible', timeout: 3000 });
    await page.getByLabel('SMS verification code').fill('654321');
    await page.getByRole('button', { name: 'Verify' }).last().click();
    await expect(page.getByText('SMS 2FA enabled')).toBeVisible({ timeout: 4000 });
  });

  test('SMS: resend button shows cooldown after sending', async ({ page }) => {
    await page.getByLabel('Phone number for SMS 2FA').fill('+49 151 12345678');
    await page.getByRole('button', { name: 'Send code' }).click();
    await page.getByLabel('SMS verification code').waitFor({ state: 'visible', timeout: 3000 });
    await expect(page.getByText(/Resend in \d+s/)).toBeVisible();
  });

  // ── Backup codes ──
  test('backup codes warning is shown before generation', async ({ page }) => {
    await expect(page.getByText(/Each code can only be used once/i)).toBeVisible();
  });

  test('clicking generate shows all 8 backup codes', async ({ page }) => {
    await page.getByRole('button', { name: /Generate backup codes/i }).click();
    await expect(page.getByText('Your backup codes')).toBeVisible({ timeout: 4000 });
    const codeList = page.getByRole('list', { name: 'Backup codes' });
    await expect(codeList.getByRole('listitem')).toHaveCount(8);
  });

  test('download button triggers file download', async ({ page }) => {
    await page.getByRole('button', { name: /Generate backup codes/i }).click();
    await page.getByText('Your backup codes').waitFor({ state: 'visible', timeout: 4000 });
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: /Download .txt/i }).click(),
    ]);
    expect(download.suggestedFilename()).toBe('zstream-backup-codes.txt');
  });

  test('copy all button appears with backup codes', async ({ page }) => {
    await page.getByRole('button', { name: /Generate backup codes/i }).click();
    await expect(page.getByRole('button', { name: 'Copy all' })).toBeVisible({ timeout: 4000 });
  });

  test('regenerate link resets to idle state', async ({ page }) => {
    await page.getByRole('button', { name: /Generate backup codes/i }).click();
    await page.getByText('Your backup codes').waitFor({ state: 'visible', timeout: 4000 });
    await page.getByRole('button', { name: 'Regenerate' }).click();
    await expect(page.getByRole('button', { name: /Generate backup codes/i })).toBeVisible({ timeout: 3000 });
  });

  // ── Change Password ──
  test('change password form renders all three fields', async ({ page }) => {
    await expect(page.getByLabel('Current password')).toBeVisible();
    await expect(page.getByLabel('Confirm new password')).toBeVisible();
  });

  test('update password button is disabled when fields are empty', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Update password/i })).toBeDisabled();
  });

  test('update password button stays disabled when passwords mismatch', async ({ page }) => {
    await page.getByLabel('Current password').fill('oldpass');
    await page.locator('#new-pw').fill('NewPass1!');
    await page.getByLabel('Confirm new password').fill('DifferentPass!');
    await expect(page.getByRole('button', { name: /Update password/i })).toBeDisabled();
  });

  test('update password shows success when all valid', async ({ page }) => {
    await page.getByLabel('Current password').fill('oldpass');
    await page.locator('#new-pw').fill('NewPass1!');
    await page.getByLabel('Confirm new password').fill('NewPass1!');
    await page.getByRole('button', { name: /Update password/i }).click();
    await expect(page.getByText('Password updated successfully')).toBeVisible({ timeout: 4000 });
  });
});
