import EditableField from '../../EditableField';
import Section from '../shared/Section';

export default function EducationSection({ data, editable, edit }) {
  if (data.education.length === 0) return null;

  return (
    <Section title="Education">
      <div className="education-grid">
        {data.education.map((edu, index) => (
          <article key={`${edu.school}-${edu.period}-${index}`} className="education">
          <h3 className="education__degree">
            <EditableField
              value={edu.degree}
              onChange={(value) => edit.updateEducation(index, { degree: value })}
              editable={editable}
              placeholder="Degree"
            />
          </h3>
          <p className="education__school">
            <EditableField
              value={edu.school}
              onChange={(value) => edit.updateEducation(index, { school: value })}
              editable={editable}
              placeholder="School"
            />
          </p>
          <time className="education__period">
            <EditableField
              as="span"
              value={edu.period}
              onChange={(value) => edit.updateEducation(index, { period: value })}
              editable={editable}
              placeholder="Period"
            />
          </time>
        </article>
      ))}
      </div>
    </Section>
  );
}
