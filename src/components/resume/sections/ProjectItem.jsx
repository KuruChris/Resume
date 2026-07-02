import { Link } from 'react-router-dom';
import EditableField from '../../EditableField';
import { hasProjectLink } from '../shared/contentHelpers';

function ProjectItemContent({ project, linked, editable, edit, projectIndex }) {
  return (
    <>
      <div className="project__header">
        <h3 className="project__name">
          <EditableField
            value={project.name}
            onChange={(value) => edit.updateProject(projectIndex, { name: value })}
            editable={editable}
            placeholder="Project name"
            showWhenEmpty={editable}
          />
        </h3>
        {linked && <span className="project__cta" aria-hidden="true">Open →</span>}
      </div>
      {(editable || project.description) && (
        <p className="project__description">
          <EditableField
            value={project.description || ''}
            onChange={(value) => edit.updateProject(projectIndex, { description: value })}
            editable={editable}
            multiline
            placeholder="Description (optional)"
            showWhenEmpty={editable}
          />
        </p>
      )}
      {project.highlights?.some(Boolean) && (
        <ul className="project__list">
          {project.highlights.filter(Boolean).map((item, highlightIndex) => (
            <li key={`${projectIndex}-${highlightIndex}`}>
              <EditableField
                value={item}
                onChange={(value) => edit.setProjectHighlight(projectIndex, highlightIndex, value)}
                editable={editable}
                placeholder="Highlight"
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function ProjectItem({ project, editable, edit, projectIndex }) {
  const url = project.url?.trim();
  const linked = !editable && hasProjectLink(project);
  const className = `project${linked ? ' project--linked' : ''}`;

  if (!linked) {
    return (
      <article className={className}>
        <ProjectItemContent
          project={project}
          linked={false}
          editable={editable}
          edit={edit}
          projectIndex={projectIndex}
        />
      </article>
    );
  }

  const isInternal = url.startsWith('/') && !url.startsWith('//');

  if (isInternal) {
    return (
      <Link to={url} className={className}>
        <ProjectItemContent
          project={project}
          linked
          editable={editable}
          edit={edit}
          projectIndex={projectIndex}
        />
      </Link>
    );
  }

  return (
    <a
      href={url}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ProjectItemContent
        project={project}
        linked
        editable={editable}
        edit={edit}
        projectIndex={projectIndex}
      />
    </a>
  );
}
