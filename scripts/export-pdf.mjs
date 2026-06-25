import { build, preview } from 'vite';
import { PDFDocument } from 'pdf-lib';
import puppeteer from 'puppeteer';
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = resolve(root, 'Davie-Chris-Fano-Resume.pdf');
const VIEWPORT_WIDTH = 1200;

async function exportPdf() {
  console.log('Building resume…');
  await build({ root });

  const previewServer = await preview({
    root,
    preview: { port: 4173, strictPort: true },
  });

  const port = previewServer.config.preview.port;
  const url = `http://localhost:${port}/`;

  console.log('Rendering PDF…');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({
    width: VIEWPORT_WIDTH,
    height: 900,
    deviceScaleFactor: 2,
  });
  await page.emulateMediaType('screen');
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    document.querySelector('.pdf-export-btn')?.remove();
  });

  const pngBuffer = await page.screenshot({
    fullPage: true,
    type: 'png',
    captureBeyondViewport: true,
  });

  const pdfDoc = await PDFDocument.create();
  const image = await pdfDoc.embedPng(pngBuffer);
  const { width, height } = image.scale(1);
  const pdfPage = pdfDoc.addPage([width, height]);
  pdfPage.drawImage(image, { x: 0, y: 0, width, height });

  writeFileSync(outputPath, await pdfDoc.save());

  await browser.close();
  previewServer.httpServer.close();

  console.log(`PDF saved to ${outputPath}`);
}

exportPdf().catch((error) => {
  console.error(error);
  process.exit(1);
});
