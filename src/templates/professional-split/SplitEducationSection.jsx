import EditableField from '../../components/EditableField';
import SplitSection from './SplitSection';

export default function SplitEducationSection({ data, editable, edit }) {
  if (data.education.length === 0) return null;

  return (
    <SplitSection title="Education">
      <div className="split-education-list">
        {data.education.map((edu, index) => (
          <article key={`${edu.school}-${edu.period}-${index}`} className="split-education">
            <time className="split-education__period">
              <EditableField
                as="span"
                value={edu.period}
                onChange={(value) => edit.updateEducation(index, { period: value })}
                editable={editable}
                placeholder="Period"
              />
            </time>
            <h3 className="split-education__school">
              <EditableField
                value={edu.school}
                onChange={(value) => edit.updateEducation(index, { school: value })}
                editable={editable}
                placeholder="School"
              />
            </h3>
            <p className="split-education__degree">
              <EditableField
                value={edu.degree}
                onChange={(value) => edit.updateEducation(index, { degree: value })}
                editable={editable}
                placeholder="Degree"
              />
            </p>
          </article>
        ))}
      </div>
    </SplitSection>
  );
}
