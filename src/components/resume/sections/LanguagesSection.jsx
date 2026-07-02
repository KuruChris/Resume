import EditableField from '../../EditableField';
import Section from '../shared/Section';

export default function LanguagesSection({ data, editable, edit }) {
  if (data.languages.length === 0) return null;

  return (
    <Section title="Languages">
      <ul className="language-list">
        {data.languages.map((lang, index) => (
          <li key={`${lang.name}-${index}`} className="language">
            <span className="language__name">
              <EditableField
                value={lang.name}
                onChange={(value) => edit.updateLanguage(index, { name: value })}
                editable={editable}
                placeholder="Language"
              />
            </span>
            <span className="language__level">
              <EditableField
                value={lang.level}
                onChange={(value) => edit.updateLanguage(index, { level: value })}
                editable={editable}
                placeholder="Proficiency"
              />
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
