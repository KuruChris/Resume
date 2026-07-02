import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const EXPORT_WIDTH = 1200;

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

function toPdfLinkUrl(href) {
  if (/^(https?:|mailto:|tel:)/i.test(href)) {
    return href;
  }

  if (href.startsWith('/')) {
    return `${window.location.origin}${href}`;
  }

  return href;
}

function collectPdfLinks(resumeElement) {
  const containerRect = resumeElement.getBoundingClientRect();

  return [...resumeElement.querySelectorAll('a[href]')]
    .map((anchor) => {
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#')) {
        return null;
      }

      const rect = anchor.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width <= 0 || height <= 0) {
        return null;
      }

      return {
        url: toPdfLinkUrl(href),
        x: rect.left - containerRect.left,
        y: rect.top - containerRect.top,
        width,
        height,
      };
    })
    .filter(Boolean);
}

function addPdfLinks(pdf, links, scale) {
  links.forEach(({ url, x, y, width, height }) => {
    pdf.link(
      x * scale,
      y * scale,
      width * scale,
      height * scale,
      { url },
    );
  });
}

function prepareExportLayout(resumeElement) {
  const restores = [];

  const previewFrame = resumeElement.closest('.editor-preview__frame');
  if (previewFrame) {
    restores.push([
      previewFrame,
      {
        transform: previewFrame.style.transform,
        marginBottom: previewFrame.style.marginBottom,
        width: previewFrame.style.width,
      },
    ]);
    previewFrame.style.transform = 'none';
    previewFrame.style.marginBottom = '0';
    previewFrame.style.width = `${EXPORT_WIDTH}px`;
  }

  const sidebar = resumeElement.querySelector('.sidebar');
  if (sidebar) {
    const sidebarStyles = getComputedStyle(sidebar);
    const horizontalPadding =
      parseFloat(sidebarStyles.paddingLeft) + parseFloat(sidebarStyles.paddingRight);
    const maxTagWidth = sidebar.clientWidth - horizontalPadding;

    resumeElement.querySelectorAll('.sidebar .skill-list').forEach((list) => {
      restores.push([list, {
        display: list.style.display,
        width: list.style.width,
        maxWidth: list.style.maxWidth,
      }]);
      list.style.display = 'block';
      list.style.width = '100%';
      list.style.maxWidth = `${maxTagWidth}px`;
    });

    resumeElement.querySelectorAll('.sidebar .skill-tag').forEach((tag) => {
      restores.push([tag, {
        display: tag.style.display,
        width: tag.style.width,
        maxWidth: tag.style.maxWidth,
        overflowWrap: tag.style.overflowWrap,
        wordBreak: tag.style.wordBreak,
        whiteSpace: tag.style.whiteSpace,
        margin: tag.style.margin,
      }]);
      tag.style.display = 'inline-block';
      tag.style.width = 'auto';
      tag.style.maxWidth = `${maxTagWidth}px`;
      tag.style.overflowWrap = 'anywhere';
      tag.style.wordBreak = 'break-word';
      tag.style.whiteSpace = 'normal';
      tag.style.margin = '0 0.4rem 0.4rem 0';
    });
  }

  return () => {
    restores.forEach(([element, styles]) => {
      Object.entries(styles).forEach(([property, value]) => {
        element.style[property] = value;
      });
    });
  };
}

export async function downloadResumePdf(resumeElement, fileName = 'Resume.pdf') {
  const root = document.documentElement;
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
  root.classList.add('pdf-exporting');
  const restoreLayout = prepareExportLayout(resumeElement);

  try {
    await document.fonts.ready;
    await waitForLayout();

    const linkTargets = collectPdfLinks(resumeElement);

    const backgroundColor = getComputedStyle(resumeElement)
      .getPropertyValue('--color-bg')
      .trim() || '#f5f3ef';

    const dataUrl = await toPng(resumeElement, {
      width: EXPORT_WIDTH,
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor,
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

    const captureScale = image.width / resumeElement.offsetWidth;
    addPdfLinks(pdf, linkTargets, captureScale);

    pdf.save(fileName);
  } finally {
    restoreLayout();
    root.classList.remove('pdf-exporting');
  }
}
