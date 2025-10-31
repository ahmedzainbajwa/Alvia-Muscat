import { promises as fs } from 'fs';
import path from 'path';

const ROOT = '/Users/ahmedzain/Downloads/alvia-landing';
const EXTS = new Set(['.jsx','.js','.json','.md','.css','.scss']);

async function listFiles(dir, acc=[]) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (['node_modules','.next','.git'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await listFiles(p, acc);
    else if (EXTS.has(path.extname(e.name))) acc.push(p);
  }
  return acc;
}

async function run() {
  const files = await listFiles(ROOT);
  let changed = 0;
  const re = /(\/assets\/[\w\-\/\.]+?)\.(jpg|jpeg|png)/gi;
  for (const f of files) {
    let txt = await fs.readFile(f, 'utf8');
    const before = txt;
    txt = txt.replace(re, (m, p1) => `${p1}.webp`);
    if (txt !== before) {
      await fs.writeFile(f, txt);
      console.log('Updated', f);
      changed++;
    }
  }
  console.log('Files updated:', changed);
}

run().catch(e => { console.error(e); process.exit(1); });
