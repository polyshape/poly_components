import { readdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const checkOnly = args.has('--check');

const componentsDir = path.join(root, 'src', 'icons', 'components');
const barrelPath = path.join(root, 'src', 'icons', 'components.ts');

function log(msg) {
  process.stdout.write(String(msg) + '\n');
}

async function fileExists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function collectExports() {
  const entries = await readdir(componentsDir, { withFileTypes: true });
  const files = entries
    .filter(d => d.isFile() && d.name.endsWith('.tsx'))
    .map(d => d.name)
    .sort();

  const exports = [];
  for (const file of files) {
    const full = path.join(componentsDir, file);
    const src = await readFile(full, 'utf8');
    // Look for a named function export: export function Name(
    // Be tolerant of an optional BOM and leading whitespace
    const m = src.match(/^[\uFEFF]?\s*export\s+function\s+(\w+)\s*\(/m);
    if (!m) {
      // Skip files that don't match the pattern (none expected)
      continue;
    }
    const exportName = m[1];
    const base = file.replace(/\.tsx$/, '');
    exports.push({ exportName, base });
  }

  // Sort by exportName for stable ordering
  exports.sort((a, b) => a.exportName.localeCompare(b.exportName));
  return exports;
}

async function run() {
  const items = await collectExports();
  const header = '';
  const lines = items.map(({ exportName, base }) => `export { ${exportName} } from "./components/${base}.js";`);
  const content = (header + lines.join('\n') + (lines.length ? '\n' : ''));

  let current = '';
  if (await fileExists(barrelPath)) {
    current = await readFile(barrelPath, 'utf8');
  }

  // Tolerant check: order doesn't matter in check mode.
  if (checkOnly) {
    const expectedLines = lines;
    const currentLines = current
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
      .filter((l) => l.startsWith('export '));
    const missing = expectedLines.filter((l) => !currentLines.includes(l));
    const extra = currentLines.filter((l) => !expectedLines.includes(l));
    if (missing.length === 0 && extra.length === 0) {
      log('No changes in component exports.');
      return;
    }
    log('Components barrel check FAILED: src/icons/components.ts is out of date.');
    if (missing.length) {
      log('Missing exports:');
      missing.forEach((l) => log('  ' + l));
    }
    if (extra.length) {
      log('Unexpected exports present:');
      extra.forEach((l) => log('  ' + l));
    }
    log('Run: npm run icons:components:write');
    process.exit(1);
  }

  // Write canonical, sorted content when not in check mode.
  if (current !== content) {
    await writeFile(barrelPath, content, 'utf8');
    log(`Wrote ${items.length} component exports to src/icons/components.ts`);
  } else {
    if (checkOnly) {
      process.stdout.write('Components barrel check PASSED: src/icons/components.ts is up to date.\n');
      process.exit(0);
    }
    log('No changes in component exports.');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
