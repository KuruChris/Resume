export function hasProjectContent(project) {
  return Boolean(
    project.name?.trim()
    || project.description?.trim()
    || project.highlights?.some(Boolean),
  );
}

export function hasReferenceContent(reference) {
  return Boolean(
    reference.name?.trim()
    || reference.title?.trim()
    || reference.company?.trim()
    || reference.phone?.trim()
    || reference.email?.trim(),
  );
}

export function hasProjectLink(project) {
  return Boolean(project.linkEnabled && project.url?.trim());
}

export function getFilledProjects(projects = []) {
  return projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => hasProjectContent(project));
}
