import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const checkOnly = args.has('--check');

const componentsDir = path.join(root, 'src', 'icons', 'components');
const registryPath = path.join(root, 'src', 'icons', 'IconRegistry.tsx');

function log(msg) { process.stdout.write(String(msg) + '\n'); }

function toKebab(name) {
  // Convert PascalCase/CamelCase to kebab-case
  const s = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2');
  return s.toLowerCase();
}

async function getComponentExports() {
  const entries = await readdir(componentsDir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile() && e.name.endsWith('.tsx')).map((e) => e.name).sort();
  const components = [];
  for (const file of files) {
    const src = await readFile(path.join(componentsDir, file), 'utf8');
    const m = src.match(/^[\uFEFF]?\s*export\s+function\s+(\w+)\s*\(/m);
    if (!m) continue;
    const exportName = m[1];
    const base = exportName.endsWith('Icon') ? exportName.slice(0, -4) : exportName;
    const keyKebab = toKebab(base);
    const key = keyKebab.includes('-') ? `"${keyKebab}"` : keyKebab;
    components.push({ exportName, key });
  }
  return components;
}

function parseImports(registry) {
  const m = registry.match(/import\s*{([\s\S]*?)}\s*from\s*["']\.\/components\.js["'];/);
  if (!m) return new Set();
  const names = m[1]
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
  return new Set(names);
}

function parseIconPathsBody(registry) {
  const m = registry.match(/export\s+const\s+iconPaths\s*=\s*\{([\s\S]*?)\}\s*as\s+const;/);
  return m ? m[1] : '';
}

function parseExistingKeys(iconPathsBody) {
  const keys = new Set();
  const re = /(["']?[a-z0-9\-]+["']?)\s*:\s*<([A-Za-z0-9_]+)\s*\/>/g;
  let mm;
  while ((mm = re.exec(iconPathsBody))) {
    keys.add(mm[1]);
  }
  return keys;
}

function parseUsedComponents(iconPathsBody) {
  const used = new Set();
  const re = /<([A-Za-z0-9_]+)\s*\/>/g;
  let mm;
  while ((mm = re.exec(iconPathsBody))) {
    used.add(mm[1]);
  }
  return used;
}

async function run() {
  const components = await getComponentExports();
  const registry = await readFile(registryPath, 'utf8');
  const importSet = parseImports(registry);
  const body = parseIconPathsBody(registry);
  const existingKeys = parseExistingKeys(body);
  const usedComponents = parseUsedComponents(body);

  const missingImports = components
    .map((c) => c.exportName)
    .filter((name) => !importSet.has(name));

  const missingMappings = components
    .filter((c) => !usedComponents.has(c.exportName))
    .map((c) => ({ key: c.key, exportName: c.exportName }))
    .filter((c) => !existingKeys.has(c.key));

  if (missingImports.length === 0 && missingMappings.length === 0) {
    log('PASS');
    return;
  }

  if (checkOnly) {
    if (missingImports.length) {
      log('Missing imports:');
      missingImports.sort().forEach((n) => log('  ' + n));
    }
    if (missingMappings.length) {
      log('Missing iconPaths entries:');
      missingMappings
        .sort((a, b) => a.key.localeCompare(b.key))
        .forEach((m) => log(`  ${m.key}: <${m.exportName} />`));
    }
    process.exit(1);
  }

  // Update imports: insert missing names into the existing import block
  const importBlockMatch = registry.match(/import\s*{([\s\S]*?)}\s*from\s*["']\.\/components\.js["'];/);
  let updated = registry;
  if (importBlockMatch) {
    const start = importBlockMatch.index;
    const end = start + importBlockMatch[0].length;
    const inside = importBlockMatch[1];
    const names = inside
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const allNames = new Set(names);
    missingImports.forEach((n) => allNames.add(n));
    const sorted = Array.from(allNames).sort();
    const formatted = '  ' + sorted.join(',\n  ') + ',\n';
    const newImport = `import {\n${formatted}} from "./components.js";`;
    updated = registry.slice(0, start) + newImport + registry.slice(end);
  }

  // Update iconPaths: append missing entries before closing
  const pathsMatch = updated.match(/export\s+const\s+iconPaths\s*=\s*\{([\s\S]*?)\}\s*as\s+const;/);
  if (pathsMatch) {
    const start = pathsMatch.index;
    const end = start + pathsMatch[0].length;
    const bodyInside = pathsMatch[1];
    const insertion = missingMappings
      .sort((a, b) => a.key.localeCompare(b.key))
      .map((m) => `  ${m.key}: <${m.exportName} />,\n`)
      .join('');
    // Insert before the closing `} as const;` keeping existing body
    const openPrefix = updated.slice(0, start);
    const closeSuffix = updated.slice(end);
    const newBlock = `export const iconPaths = {${bodyInside}${insertion}} as const;`;
    updated = openPrefix + newBlock + closeSuffix;
  }

  await writeFile(registryPath, updated, 'utf8');
  log(`Updated IconRegistry: +${missingImports.length} imports, +${missingMappings.length} iconPaths entries.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

