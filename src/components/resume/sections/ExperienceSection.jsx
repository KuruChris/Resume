import Section from '../shared/Section';
import ExperienceItem from './ExperienceItem';

export default function ExperienceSection({ data, editable, edit }) {
  if (data.experience.length === 0) return null;

  return (
    <Section title="Work Experience">
      <div className="timeline">
        {data.experience.map((job, index) => (
          <ExperienceItem
            key={`${job.company}-${job.period}-${index}`}
            job={job}
            isLast={index === data.experience.length - 1}
            editable={editable}
            edit={edit}
            jobIndex={index}
          />
        ))}
      </div>
    </Section>
  );
}
