import EditableField from '../../components/EditableField';
import SplitSection from './SplitSection';

export default function SplitSkillsSection({ data, editable, edit }) {
  if (data.skills.length === 0 && !editable) return null;

  return (
    <SplitSection title="Skills">
      <ul className="split-skills-grid">
        {data.skills.map((skill, index) => (
          <li key={`${skill}-${index}`}>
            <EditableField
              value={skill}
              onChange={(value) => edit.setSkill(index, value)}
              editable={editable}
              placeholder="Skill"
            />
          </li>
        ))}
        {editable && (
          <li>
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
    </SplitSection>
  );
}
