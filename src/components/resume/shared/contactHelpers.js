export const coreContactFields = [
  { field: 'email', placeholder: 'Email', inputType: 'email' },
  { field: 'phone', placeholder: 'Phone', inputType: 'tel' },
  { field: 'location', placeholder: 'Location', inputType: 'text' },
];

export function getContactLinkLabel(link = {}) {
  if (link.label?.trim()) return link.label.trim();

  const url = link.url?.trim();
  if (!url) return 'Link';

  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function hasContactLinkUrl(link = {}) {
  return Boolean(link.url?.trim());
}

export function getVisibleContactLinks(links = []) {
  return (links || []).filter(hasContactLinkUrl);
}
