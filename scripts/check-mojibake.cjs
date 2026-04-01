const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const INCLUDED_DIRS = ['app', 'components', 'lib', 'public'];
const TEXT_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.md', '.txt']);
const PATTERN = /Â|â‚|â€”|â€“|â€¢|Ã|ðŸ|ï¸|â€|COâ|â‚¬|âEUR|�/;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.next' || entry.name === 'node_modules' || entry.name === '.git') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else if (TEXT_EXTENSIONS.has(path.extname(entry.name))) files.push(fullPath);
  }
  return files;
}

const files = INCLUDED_DIRS.map((dir) => path.join(ROOT, dir)).filter(fs.existsSync).flatMap((dir) => walk(dir));
const matches = [];
for (const filePath of files) {
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  lines.forEach((line, index) => {
    if (PATTERN.test(line)) matches.push(`${path.relative(ROOT, filePath)}:${index + 1}: ${line.trim()}`);
  });
}
if (matches.length) {
  console.error(matches.join('\n'));
  process.exit(1);
}
console.log('No mojibake patterns found.');
