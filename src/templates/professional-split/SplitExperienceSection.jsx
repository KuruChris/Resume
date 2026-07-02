import EditableField from '../../components/EditableField';
import SplitSection from './SplitSection';

function SplitExperienceItem({ job, editable, edit, jobIndex }) {
  return (
    <article className="split-experience">
      <div className="split-experience__top">
        <h3 className="split-experience__company">
          <EditableField
            value={job.company}
            onChange={(value) => edit.updateExperience(jobIndex, { company: value })}
            editable={editable}
            placeholder="Company"
          />
        </h3>
        <time className="split-experience__period">
          <EditableField
            as="span"
            value={job.period}
            onChange={(value) => edit.updateExperience(jobIndex, { period: value })}
            editable={editable}
            placeholder="Period"
          />
        </time>
      </div>
      <p className="split-experience__role">
        <EditableField
          value={job.title}
          onChange={(value) => edit.updateExperience(jobIndex, { title: value })}
          editable={editable}
          placeholder="Job title"
        />
        {(editable || job.location) && (
          <>
            {job.location ? ' · ' : null}
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
      {(editable || job.description) && (
        <p className="split-experience__description">
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
        <ul className="split-bullet-list">
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
    </article>
  );
}

export default function SplitExperienceSection({ data, editable, edit }) {
  if (data.experience.length === 0) return null;

  return (
    <SplitSection title="Work Experience">
      <div className="split-experience-list">
        {data.experience.map((job, index) => (
          <SplitExperienceItem
            key={`${job.company}-${job.period}-${index}`}
            job={job}
            editable={editable}
            edit={edit}
            jobIndex={index}
          />
        ))}
      </div>
    </SplitSection>
  );
}
