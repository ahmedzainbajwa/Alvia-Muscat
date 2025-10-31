import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { glob } from 'glob';

const ROOT = '/Users/ahmedzain/Downloads/alvia-landing';
const ASSETS_DIR = path.join(ROOT, 'public', 'assets');

const isRaster = (file) => /\.(jpe?g|png)$/i.test(file);

const getQuality = (file) => {
  const lower = file.toLowerCase();
  if (lower.includes('/offerings/') || lower.includes('/whyinvest/') || lower.includes('/parallax/') ) return 80; // photos
  if (lower.includes('/paymentplan/')) return 85; // detailed images
  return 90; // ui-ish pngs
};

async function convertFile(srcPath) {
  const dstPath = srcPath.replace(/\.(jpe?g|png)$/i, '.webp');
  try {
    const q = getQuality(srcPath);
    const input = await fs.readFile(srcPath);
    const hasAlpha = /\.png$/i.test(srcPath);
    const pipeline = sharp(input);
    const webpBuf = await pipeline.webp({ quality: q, alphaQuality: hasAlpha ? 100 : 0 }).toBuffer();
    await fs.writeFile(dstPath, webpBuf);
    return { srcPath, dstPath, ok: true };
  } catch (e) {
    return { srcPath, error: e?.message || String(e), ok: false };
  }
}

async function main() {
  const files = await glob('**/*.{jpg,jpeg,png}', { cwd: ASSETS_DIR, nodir: true, absolute: true });
  const results = [];
  for (const f of files) {
    const res = await convertFile(f);
    results.push(res);
    console.log(res.ok ? `Converted: ${path.relative(ASSETS_DIR, f)} -> .webp` : `Failed: ${path.relative(ASSETS_DIR, f)} :: ${res.error}`);
  }
  const ok = results.filter(r => r.ok).length;
  console.log(`Done. Converted ${ok}/${results.length}. Originals preserved.`);
}

main().catch(err => { console.error(err); process.exit(1); });
