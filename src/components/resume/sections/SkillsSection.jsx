import EditableField from '../../EditableField';
import Section from '../shared/Section';

export default function SkillsSection({ data, editable, edit }) {
  if (data.skills.length === 0 && !editable) return null;

  return (
    <Section title="Skills">
      <ul className="skill-list">
        {data.skills.map((skill, index) => (
          <li key={`${skill}-${index}`} className="skill-tag">
            <EditableField
              value={skill}
              onChange={(value) => edit.setSkill(index, value)}
              editable={editable}
              placeholder="Skill"
            />
          </li>
        ))}
        {editable && (
          <li className="skill-tag skill-tag--add">
            <EditableField
              value=""
              onChange={(value) => edit.addSkill(value)}
              editable
              placeholder="+ Add skill"
              showWhenEmpty
            />
          </li>
        )}
      </ul>
    </Section>
  );
}
