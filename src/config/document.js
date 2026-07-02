import defaultContent from './content/default-content.json';
import {
  DOCUMENT_VERSION,
  DEFAULT_TEMPLATE_ID,
  normalizeContent,
} from './schema';
import { getDefaultTemplate, getTemplate, isValidTemplateId } from './templates';
import { DEFAULT_THEME_ID, isValidThemeId } from './themes';

function createMeta(meta = {}) {
  return {
    title: typeof meta.title === 'string' ? meta.title : '',
    updatedAt: meta.updatedAt ?? null,
  };
}

/**
 * Creates a portfolio document — the unit we'll save to a backend later.
 *
 * @param {object} [options]
 * @param {string} [options.templateId]
 * @param {string} [options.themeId]
 * @param {string} [options.profilePhoto]
 * @param {object} [options.content]
 * @param {object} [options.meta]
 */
export function createPortfolioDocument(options = {}) {
  const templateId = options.templateId ?? DEFAULT_TEMPLATE_ID;
  const template = isValidTemplateId(templateId)
    ? getTemplate(templateId)
    : getDefaultTemplate();

  const resolvedTemplateId = template.id;
  const themeId = options.themeId && isValidThemeId(options.themeId)
    ? options.themeId
    : (template.defaultThemeId ?? DEFAULT_THEME_ID);

  const contentSource = options.content ?? structuredClone(defaultContent);

  return {
    version: DOCUMENT_VERSION,
    templateId: resolvedTemplateId,
    themeId,
    profilePhoto: options.profilePhoto ?? template.defaultProfilePhoto,
    content: normalizeContent(contentSource),
    meta: createMeta(options.meta),
  };
}

/** Demo document for the public resume page and editor defaults. */
export function createDemoDocument() {
  return createPortfolioDocument();
}

/** Parses JSON from an API or localStorage into a validated document. */
export function parsePortfolioDocument(input) {
  const raw = typeof input === 'string' ? JSON.parse(input) : input;

  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid portfolio document');
  }

  if (raw.version !== DOCUMENT_VERSION) {
    throw new Error(`Unsupported document version: ${raw.version}`);
  }

  return createPortfolioDocument({
    templateId: raw.templateId,
    themeId: raw.themeId,
    profilePhoto: raw.profilePhoto,
    content: raw.content,
    meta: raw.meta,
  });
}

/** Serializes a document for API storage or export. */
export function serializePortfolioDocument(document, { stamp = false } = {}) {
  const payload = stamp ? stampPortfolioDocument(document) : document;
  return JSON.stringify(payload, null, 2);
}

/** Sets updatedAt — use when persisting to a backend. */
export function stampPortfolioDocument(document) {
  return {
    ...document,
    meta: {
      ...document.meta,
      updatedAt: new Date().toISOString(),
    },
  };
}

export function patchDocumentContent(document, content) {
  return {
    ...document,
    content: normalizeContent(content),
  };
}

export function patchDocumentTheme(document, themeId) {
  if (!isValidThemeId(themeId)) {
    return document;
  }

  return {
    ...document,
    themeId,
  };
}

export function patchDocumentProfilePhoto(document, profilePhoto) {
  return {
    ...document,
    profilePhoto,
  };
}

export function patchDocumentTemplate(document, templateId) {
  if (!isValidTemplateId(templateId)) {
    return document;
  }

  const template = getTemplate(templateId);

  return {
    ...document,
    templateId,
    themeId: isValidThemeId(document.themeId)
      ? document.themeId
      : template.defaultThemeId,
  };
}

/** Returns true if a template supports a given section id. */
export function templateHasSection(document, sectionId) {
  const template = getTemplate(document.templateId);
  return template.sections.includes(sectionId);
}
