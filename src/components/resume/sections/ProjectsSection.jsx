import Section from '../shared/Section';
import { getFilledProjects } from '../shared/contentHelpers';
import ProjectItem from './ProjectItem';

export default function ProjectsSection({ data, editable, edit }) {
  const filledProjects = getFilledProjects(data.projects);

  if (filledProjects.length === 0) return null;

  return (
    <Section title="Projects">
      <div className="project-list">
        {filledProjects.map(({ project, index }) => (
          <ProjectItem
            key={`${project.name}-${index}`}
            project={project}
            editable={editable}
            edit={edit}
            projectIndex={index}
          />
        ))}
      </div>
    </Section>
  );
}
