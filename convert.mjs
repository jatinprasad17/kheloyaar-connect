import { transformSync } from 'esbuild';
import { readFileSync, writeFileSync, renameSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname } from 'path';

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const files = walk('src');
for (const f of files) {
  const ext = extname(f);
  if (ext !== '.ts' && ext !== '.tsx') continue;
  const src = readFileSync(f, 'utf8');
  const isTsx = ext === '.tsx';
  const { code } = transformSync(src, {
    loader: isTsx ? 'tsx' : 'ts',
    jsx: 'preserve',
    format: 'esm',
    target: 'esnext',
  });
  const newPath = f.replace(/\.tsx?$/, isTsx ? '.jsx' : '.js');
  writeFileSync(newPath, code);
  if (newPath !== f) {
    // remove old
    require('fs').unlinkSync(f);
  }
}
console.log('done');
