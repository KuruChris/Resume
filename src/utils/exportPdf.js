import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const EXPORT_WIDTH = 1200;
const FILE_NAME = 'Davie-Chris-Fano-Resume.pdf';

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function waitForLayout() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

export async function downloadResumePdf(resumeElement) {
  const root = document.documentElement;
  root.classList.add('pdf-exporting');

  try {
    await document.fonts.ready;
    await waitForLayout();

    const dataUrl = await toPng(resumeElement, {
      width: EXPORT_WIDTH,
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: '#f5f3ef',
    });

    const image = await loadImage(dataUrl);
    const pdf = new jsPDF({
      orientation: image.width > image.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [image.width, image.height],
      compress: true,
      hotfixes: ['px_scaling'],
    });

    pdf.addImage(dataUrl, 'PNG', 0, 0, image.width, image.height, undefined, 'FAST');
    pdf.save(FILE_NAME);
  } finally {
    root.classList.remove('pdf-exporting');
  }
}
