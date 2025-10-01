import { readdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const srcDir = path.join(root, 'src');
const barrelPath = path.join(srcDir, 'index.ts');
const args = new Set(process.argv.slice(2));
const checkOnly = args.has('--check');

function log(msg) {
  process.stdout.write(String(msg) + '\n');
}

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function collectExports() {
  const entries = await readdir(srcDir, { withFileTypes: true });
  const candidates = entries
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => !name.startsWith('.') && name !== 'utils' && name !== 'stories');

  const exportDirs = [];
  for (const name of candidates) {
    const idxTs = path.join(srcDir, name, 'index.ts');
    const idxTsx = path.join(srcDir, name, 'index.tsx');
    if (await fileExists(idxTs) || await fileExists(idxTsx)) {
      exportDirs.push(name);
    }
  }
  exportDirs.sort();
  return exportDirs.map((name) => `export * from "./${name}/index.js";`);
}

async function run() {
  const lines = await collectExports();
  const expected = lines.join('\n') + (lines.length ? '\n' : '');

  let current = '';
  if (await fileExists(barrelPath)) {
    current = await readFile(barrelPath, 'utf8');
  }

  if (checkOnly) {
    // Tolerant check: order/extra lines/blank lines don't matter.
    // Verify that current has an export referencing each required subpath.
    const present = new Set(
      current
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => {
          const m = l.match(/export\s+.*from\s+["']\.\/(.+?)\/index\.js["']/);
          return m ? m[1] : null;
        })
        .filter(Boolean)
    );
    const required = lines.map((l) => l.match(/"\.\/(.+?)\/index\.js"/)[1]);
    const missing = required.filter((name) => !present.has(name));
    if (missing.length === 0) {
      log('Exports check passed.');
      return;
    }
    log('Exports check failed: missing exports in src/index.ts -> ' + missing.join(', '));
    process.exit(1);
  }

  // Write canonical, sorted barrel (order/spacing standardized).
  await writeFile(barrelPath, expected, 'utf8');
  log('src/index.ts updated.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
