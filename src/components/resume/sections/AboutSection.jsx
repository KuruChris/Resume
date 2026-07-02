import EditableField from '../../EditableField';
import Section from '../shared/Section';

export default function AboutSection({ data, editable, edit }) {
  if (!data.about.some(Boolean)) return null;

  return (
    <Section title="About Me">
      <ul className="about-list">
        {data.about
          .map((item, index) => ({ item, index }))
          .filter(({ item }) => item)
          .map(({ item, index }) => (
            <li key={`${index}-${item}`}>
              <EditableField
                value={item}
                onChange={(value) => edit.setAboutItem(index, value)}
                editable={editable}
                placeholder="About bullet"
              />
            </li>
          ))}
      </ul>
    </Section>
  );
}
