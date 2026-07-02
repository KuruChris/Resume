/** Current portfolio document schema version — bump when content shape changes. */
export const DOCUMENT_VERSION = 1;

export const DEFAULT_TEMPLATE_ID = 'classic-sidebar';

/** Section identifiers used by templates and the editor. */
export const SECTIONS = {
  PROFILE: 'profile',
  CONTACT: 'contact',
  ABOUT: 'about',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  CERTIFICATES: 'certificates',
  LANGUAGES: 'languages',
  REFERENCES: 'references',
};

export function createEmptyContactLink() {
  return {
    label: '',
    url: '',
  };
}

export function createEmptyContact() {
  return {
    email: '',
    phone: '',
    location: '',
    links: [],
  };
}

function normalizeContactLink(item = {}) {
  return {
    label: normalizeString(item.label),
    url: normalizeString(item.url),
  };
}

function normalizeContact(contact = {}) {
  let links = Array.isArray(contact.links)
    ? contact.links.map(normalizeContactLink)
    : [];

  const legacyLinkedin = normalizeString(contact.linkedin);
  if (legacyLinkedin && !links.some((link) => link.url === legacyLinkedin)) {
    links = [{ label: 'LinkedIn', url: legacyLinkedin }, ...links];
  }

  return {
    email: normalizeString(contact.email),
    phone: normalizeString(contact.phone),
    location: normalizeString(contact.location),
    links,
  };
}

export function createEmptyExperience() {
  return {
    title: '',
    company: '',
    location: '',
    period: '',
    description: '',
    highlights: [],
  };
}

export function createEmptyEducation() {
  return {
    degree: '',
    school: '',
    period: '',
  };
}

export function createEmptyCertificate() {
  return {
    name: '',
    note: '',
    period: '',
  };
}

export function createEmptyLanguage() {
  return {
    name: '',
    level: '',
  };
}

export function createEmptyReference() {
  return {
    name: '',
    title: '',
    company: '',
    phone: '',
    email: '',
  };
}

export function createEmptyProject() {
  return {
    name: '',
    description: '',
    linkEnabled: false,
    url: '',
    highlights: [],
  };
}

export function createEmptyContent() {
  return {
    name: '',
    title: '',
    contact: createEmptyContact(),
    about: [],
    skills: [],
    projects: [],
    experience: [],
    education: [],
    certificates: [],
    languages: [],
    references: [],
  };
}

function normalizeString(value) {
  return typeof value === 'string' ? value : '';
}

function normalizeStringList(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => (typeof item === 'string' ? item : ''));
}

function normalizeHighlights(value) {
  return normalizeStringList(value);
}

function normalizeExperienceItem(item = {}) {
  return {
    title: normalizeString(item.title),
    company: normalizeString(item.company),
    location: normalizeString(item.location),
    period: normalizeString(item.period),
    description: normalizeString(item.description),
    highlights: normalizeHighlights(item.highlights),
  };
}

function normalizeEducationItem(item = {}) {
  return {
    degree: normalizeString(item.degree),
    school: normalizeString(item.school),
    period: normalizeString(item.period),
  };
}

function normalizeCertificateItem(item = {}) {
  return {
    name: normalizeString(item.name),
    note: normalizeString(item.note),
    period: normalizeString(item.period),
  };
}

function normalizeLanguageItem(item = {}) {
  return {
    name: normalizeString(item.name),
    level: normalizeString(item.level),
  };
}

function normalizeReferenceItem(item = {}) {
  return {
    name: normalizeString(item.name),
    title: normalizeString(item.title),
    company: normalizeString(item.company),
    phone: normalizeString(item.phone),
    email: normalizeString(item.email),
  };
}

function normalizeProjectItem(item = {}) {
  return {
    name: normalizeString(item.name),
    description: normalizeString(item.description),
    linkEnabled: Boolean(item.linkEnabled),
    url: normalizeString(item.url),
    highlights: normalizeHighlights(item.highlights),
  };
}

/** Ensures content matches the expected schema with safe defaults. */
export function normalizeContent(content = {}) {
  const empty = createEmptyContent();

  return {
    name: normalizeString(content.name ?? empty.name),
    title: normalizeString(content.title ?? empty.title),
    contact: normalizeContact(content.contact),
    about: normalizeStringList(content.about),
    skills: normalizeStringList(content.skills).filter(Boolean),
    projects: Array.isArray(content.projects)
      ? content.projects.map(normalizeProjectItem)
      : empty.projects,
    experience: Array.isArray(content.experience)
      ? content.experience.map(normalizeExperienceItem)
      : empty.experience,
    education: Array.isArray(content.education)
      ? content.education.map(normalizeEducationItem)
      : empty.education,
    certificates: Array.isArray(content.certificates)
      ? content.certificates.map(normalizeCertificateItem)
      : empty.certificates,
    languages: Array.isArray(content.languages)
      ? content.languages.map(normalizeLanguageItem)
      : empty.languages,
    references: Array.isArray(content.references)
      ? content.references.map(normalizeReferenceItem)
      : empty.references,
  };
}

/** Maps section id to an empty list-item factory for the editor. */
export const sectionItemFactories = {
  [SECTIONS.PROJECTS]: createEmptyProject,
  [SECTIONS.EXPERIENCE]: createEmptyExperience,
  [SECTIONS.EDUCATION]: createEmptyEducation,
  [SECTIONS.CERTIFICATES]: createEmptyCertificate,
  [SECTIONS.LANGUAGES]: createEmptyLanguage,
  [SECTIONS.REFERENCES]: createEmptyReference,
};

/** Maps section id to the content field name (when they differ). */
export const sectionContentKeys = {
  [SECTIONS.PROJECTS]: 'projects',
  [SECTIONS.EXPERIENCE]: 'experience',
  [SECTIONS.EDUCATION]: 'education',
  [SECTIONS.CERTIFICATES]: 'certificates',
  [SECTIONS.LANGUAGES]: 'languages',
  [SECTIONS.REFERENCES]: 'references',
};
