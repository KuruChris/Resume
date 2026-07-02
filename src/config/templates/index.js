import classicSidebar from './classic-sidebar.json';
import { getTemplateEntry, templateRegistry } from '../../templates/registry';

export function getTemplate(templateId) {
  const entry = getTemplateEntry(templateId);
  return {
    ...entry.config,
    defaultProfilePhoto: entry.defaultProfilePhoto,
  };
}

export function listTemplates() {
  return Object.values(templateRegistry).map(({ config, defaultProfilePhoto: _photo }) => config);
}

export function isValidTemplateId(templateId) {
  return Boolean(templateRegistry[templateId]);
}

export function getDefaultTemplate() {
  return getTemplate(classicSidebar.id);
}

export function getTemplateLayoutComponent(templateId) {
  return getTemplateEntry(templateId).Component;
}

export { classicSidebar };
