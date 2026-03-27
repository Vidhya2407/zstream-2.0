const fs = require('fs');
const path = require('path');

function readEnvFile(filename) {
  const filePath = path.join(process.cwd(), filename);
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs.readFileSync(filePath, 'utf8').split(/\r?\n/).reduce((acc, line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      return acc;
    }

    const separator = trimmed.indexOf('=');
    if (separator === -1) {
      return acc;
    }

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    acc[key] = value;
    return acc;
  }, {});
}

const env = {
  ...readEnvFile('.env.example'),
  ...readEnvFile('.env.local'),
  ...process.env,
};

const required = ['AUTH_SECRET', 'AUTH_URL', 'MONGODB_URI'];
const missing = required.filter((key) => !env[key]);
const placeholder = [];

if ((env.AUTH_SECRET || '').includes('replace_with')) {
  placeholder.push('AUTH_SECRET');
}

if ((env.MONGODB_URI || '').includes('example')) {
  placeholder.push('MONGODB_URI');
}

if (missing.length) {
  console.error(`Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}

if (placeholder.length) {
  console.error(`Replace placeholder env vars before staging/prod: ${placeholder.join(', ')}`);
  process.exit(1);
}

console.log('Environment check passed for staging/prod workflow.');
