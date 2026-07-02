import classicSidebarConfig from '../config/templates/classic-sidebar.json';
import minimalSingleConfig from '../config/templates/minimal-single.json';
import professionalSplitConfig from '../config/templates/professional-split.json';
import defaultProfilePhoto from '../assets/profile-placeholder.svg';
import ClassicSidebarTemplate from './classic-sidebar';
import MinimalSingleTemplate from './minimal-single';
import ProfessionalSplitTemplate from './professional-split';

/**
 * Maps template IDs to their React layout component and metadata.
 * Add new templates here when building Phase 2 layouts.
 */
const templateRegistry = {
  [classicSidebarConfig.id]: {
    config: classicSidebarConfig,
    Component: ClassicSidebarTemplate,
    defaultProfilePhoto,
  },
  [minimalSingleConfig.id]: {
    config: minimalSingleConfig,
    Component: MinimalSingleTemplate,
    defaultProfilePhoto,
  },
  [professionalSplitConfig.id]: {
    config: professionalSplitConfig,
    Component: ProfessionalSplitTemplate,
    defaultProfilePhoto,
  },
};

export function getTemplateEntry(templateId) {
  const entry = templateRegistry[templateId];
  if (!entry) {
    throw new Error(`Unknown template: ${templateId}`);
  }
  return entry;
}

export function getTemplateComponent(templateId) {
  return getTemplateEntry(templateId).Component;
}

export function getRegisteredTemplateIds() {
  return Object.keys(templateRegistry);
}

export { templateRegistry };
