import { Link } from 'react-router-dom';
import EditableField from '../../components/EditableField';
import { getFilledProjects, hasProjectLink } from '../../components/resume/shared/contentHelpers';
import SplitSection from './SplitSection';

function SplitProjectItem({ project, editable, edit, projectIndex }) {
  const url = project.url?.trim();
  const linked = !editable && hasProjectLink(project);
  const className = `split-project${linked ? ' split-project--linked' : ''}`;

  const content = (
    <>
      <h3 className="split-project__name">
        <EditableField
          value={project.name}
          onChange={(value) => edit.updateProject(projectIndex, { name: value })}
          editable={editable}
          placeholder="Project name"
          showWhenEmpty={editable}
        />
      </h3>
      {(editable || project.description) && (
        <p className="split-project__description">
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
        <ul className="split-bullet-list">
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

  if (!linked) {
    return <article className={className}>{content}</article>;
  }

  const isInternal = url.startsWith('/') && !url.startsWith('//');

  if (isInternal) {
    return <Link to={url} className={className}>{content}</Link>;
  }

  return (
    <a href={url} className={className} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}

export default function SplitProjectsSection({ data, editable, edit }) {
  const filledProjects = getFilledProjects(data.projects);

  if (filledProjects.length === 0) return null;

  return (
    <SplitSection title="Projects">
      <div className="split-project-list">
        {filledProjects.map(({ project, index }) => (
          <SplitProjectItem
            key={`${project.name}-${index}`}
            project={project}
            editable={editable}
            edit={edit}
            projectIndex={index}
          />
        ))}
      </div>
    </SplitSection>
  );
}
