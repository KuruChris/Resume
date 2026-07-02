import EditableField from '../../components/EditableField';
import SplitSection from './SplitSection';

export default function SplitAboutSection({ data, editable, edit }) {
  if (!data.about.some(Boolean)) return null;

  return (
    <SplitSection title="Profile Summary">
      <ul className="split-about-list">
        {data.about
          .map((item, index) => ({ item, index }))
          .filter(({ item }) => item)
          .map(({ item, index }) => (
            <li key={`${index}-${item}`}>
              <EditableField
                value={item}
                onChange={(value) => edit.setAboutItem(index, value)}
                editable={editable}
                placeholder="Summary bullet"
              />
            </li>
          ))}
      </ul>
    </SplitSection>
  );
}
