export {
  DOCUMENT_VERSION,
  DEFAULT_TEMPLATE_ID,
  SECTIONS,
  createEmptyContact,
  createEmptyContactLink,
  createEmptyExperience,
  createEmptyEducation,
  createEmptyCertificate,
  createEmptyLanguage,
  createEmptyReference,
  createEmptyProject,
  createEmptyContent,
  normalizeContent,
  sectionItemFactories,
  sectionContentKeys,
} from './schema';

export {
  createPortfolioDocument,
  createDemoDocument,
  parsePortfolioDocument,
  serializePortfolioDocument,
  stampPortfolioDocument,
  patchDocumentContent,
  patchDocumentTheme,
  patchDocumentProfilePhoto,
  patchDocumentTemplate,
  templateHasSection,
} from './document';

export {
  getTemplate,
  getDefaultTemplate,
  listTemplates,
  isValidTemplateId,
  getTemplateLayoutComponent,
} from './templates';

export {
  getTemplateComponent,
  getTemplateEntry,
  getRegisteredTemplateIds,
} from '../templates/registry';

export {
  DEFAULT_THEME_ID,
  themes,
  getThemeStyle,
  getThemeBackground,
  isValidThemeId,
  listThemes,
} from './themes';
