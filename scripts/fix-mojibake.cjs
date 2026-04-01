const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const INCLUDED_DIRS = ['app', 'components', 'lib', 'public'];
const TEXT_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.md', '.txt']);

function mojibake(value) {
  return new TextDecoder('windows-1252').decode(Buffer.from(value, 'utf8'));
}

const ENTRIES = [
  ['€', 'EUR '],
  ['CO₂', 'CO2'],
  ['·', ' | '],
  ['•', '-'],
  ['—', ' - '],
  ['–', ' - '],
  ['×', 'x'],
  ['§', '§'],
  ['Ü', 'Ü'],
  ['ü', 'ü'],
  ['ã', 'ã'],
  ['⏳', '⏳'],
  ['⏱️', '⏱️'],
  ['⏱', '⏱'],
  ['✅', '✅'],
  ['❌', '❌'],
  ['✈️', '✈️'],
  ['⚠️', '⚠️'],
  ['⚙️', '⚙️'],
  ['♻️', '♻️'],
  ['❤️', '❤️'],
  ['▶', '▶'],
  ['🌿', '🌿'],
  ['🌱', '🌱'],
  ['🌍', '🌍'],
  ['🌲', '🌲'],
  ['🌳', '🌳'],
  ['🎬', '🎬'],
  ['🎵', '🎵'],
  ['🎙️', '🎙️'],
  ['🎙', '🎙'],
  ['🎞️', '🎞️'],
  ['🎞', '🎞'],
  ['🎥', '🎥'],
  ['🎉', '🎉'],
  ['📱', '📱'],
  ['📼', '📼'],
  ['📊', '📊'],
  ['📅', '📅'],
  ['📈', '📈'],
  ['📶', '📶'],
  ['📌', '📌'],
  ['📢', '📢'],
  ['📝', '📝'],
  ['📧', '📧'],
  ['🍎', '🍎'],
  ['👥', '👥'],
  ['👁️', '👁️'],
  ['👁', '👁'],
  ['👕', '👕'],
  ['🔗', '🔗'],
  ['🔒', '🔒'],
  ['🔔', '🔔'],
  ['🔴', '🔴'],
  ['🔥', '🔥'],
  ['🕐', '🕐'],
  ['🙌', '🙌'],
  ['🙏', '🙏'],
  ['💧', '💧'],
  ['💬', '💬'],
  ['💰', '💰'],
  ['💶', '💶'],
  ['💾', '💾'],
  ['💚', '💚'],
  ['🚗', '🚗'],
  ['🚂', '🚂'],
  ['🛍️', '🛍️'],
  ['🛍', '🛍'],
  ['🛡️', '🛡️'],
  ['🛡', '🛡'],
  ['🏆', '🏆'],
  ['🏪', '🏪'],
  ['🇩🇪', '🇩🇪'],
  ['🇺🇸', '🇺🇸'],
  ['🇬🇧', '🇬🇧'],
  ['🇸🇳', '🇸🇳'],
  ['🇯🇵', '🇯🇵'],
  ['🇧🇷', '🇧🇷'],
  ['🇫🇷', '🇫🇷'],
  ['🇪🇺', '🇪🇺'],
  ['🧊', '🧊'],
];

const REPLACEMENTS = ENTRIES.flatMap(([source, target]) => {
  const broken = mojibake(source);
  return broken === source ? [] : [[broken, target]];
});

const EXTRA_REPLACEMENTS = [
  ['âEUR "', ' - '],
  ['âEUR”', ' - '],
  ['âEUR ¢', '-'],
  ['Ã - ', 'x '],
  ['Ã -', 'x'],
  ['�', ''],
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.next' || entry.name === 'node_modules' || entry.name === '.git') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else if (TEXT_EXTENSIONS.has(path.extname(entry.name))) files.push(fullPath);
  }
  return files;
}

function normalize(content) {
  let next = content;
  for (const [from, to] of [...REPLACEMENTS, ...EXTRA_REPLACEMENTS]) {
    next = next.split(from).join(to);
  }
  next = next
    .replace(/[ \t]+\|[ \t]+/g, ' | ')
    .replace(/[ \t]+-[ \t]+/g, ' - ')
    .replace(/x\s+(\d+)/g, 'x $1')
    .replace(/EUR\s+/g, 'EUR ')
    .replace(/CO₂/g, 'CO2')
    .replace(/\r?\n/g, '\n');
  return next;
}

const files = INCLUDED_DIRS.map((dir) => path.join(ROOT, dir)).filter(fs.existsSync).flatMap((dir) => walk(dir));
let changed = 0;
for (const filePath of files) {
  const original = fs.readFileSync(filePath, 'utf8');
  const updated = normalize(original);
  if (updated !== original) {
    fs.writeFileSync(filePath, updated, 'utf8');
    changed += 1;
    console.log(path.relative(ROOT, filePath));
  }
}
console.log(`Updated ${changed} file(s).`);
