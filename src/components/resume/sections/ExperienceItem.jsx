import EditableField from '../../EditableField';

export default function ExperienceItem({
  job,
  isLast,
  editable,
  edit,
  jobIndex,
}) {
  return (
    <article className={`experience ${isLast ? 'experience--last' : ''}`}>
      <div className="experience__marker" aria-hidden="true" />
      <div className="experience__content">
        <div className="experience__header">
          <div>
            <h3 className="experience__title">
              <EditableField
                value={job.title}
                onChange={(value) => edit.updateExperience(jobIndex, { title: value })}
                editable={editable}
                placeholder="Job title"
              />
            </h3>
            <p className="experience__company">
              <EditableField
                value={job.company}
                onChange={(value) => edit.updateExperience(jobIndex, { company: value })}
                editable={editable}
                placeholder="Company"
              />
              {(editable || job.location) && (
                <>
                  {' · '}
                  <EditableField
                    value={job.location || ''}
                    onChange={(value) => edit.updateExperience(jobIndex, { location: value })}
                    editable={editable}
                    placeholder="Location (optional)"
                    showWhenEmpty={editable}
                  />
                </>
              )}
            </p>
          </div>
          <time className="experience__period">
            <EditableField
              as="span"
              value={job.period}
              onChange={(value) => edit.updateExperience(jobIndex, { period: value })}
              editable={editable}
              placeholder="Period"
            />
          </time>
        </div>
        {(editable || job.description) && (
          <p className="experience__description">
            <EditableField
              value={job.description || ''}
              onChange={(value) => edit.updateExperience(jobIndex, { description: value })}
              editable={editable}
              multiline
              placeholder="Description (optional)"
              showWhenEmpty={editable}
            />
          </p>
        )}
        {job.highlights?.some(Boolean) && (
          <ul className="experience__list">
            {job.highlights.filter(Boolean).map((item, highlightIndex) => (
              <li key={`${jobIndex}-${highlightIndex}`}>
                <EditableField
                  value={item}
                  onChange={(value) => edit.setExperienceHighlight(jobIndex, highlightIndex, value)}
                  editable={editable}
                  placeholder="Highlight"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
