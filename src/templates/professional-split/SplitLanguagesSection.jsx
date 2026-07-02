import EditableField from '../../components/EditableField';
import SplitSection from './SplitSection';

export default function SplitLanguagesSection({ data, editable, edit }) {
  if (data.languages.length === 0) return null;

  return (
    <SplitSection title="Languages">
      <ul className="split-bullet-list split-bullet-list--compact">
        {data.languages.map((lang, index) => (
          <li key={`${lang.name}-${index}`}>
            <EditableField
              value={lang.name}
              onChange={(value) => edit.updateLanguage(index, { name: value })}
              editable={editable}
              placeholder="Language"
            />
            {': '}
            <EditableField
              value={lang.level}
              onChange={(value) => edit.updateLanguage(index, { level: value })}
              editable={editable}
              placeholder="Proficiency"
            />
          </li>
        ))}
      </ul>
    </SplitSection>
  );
}
