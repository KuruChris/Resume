import EditableField from '../../components/EditableField';

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export default function ProfessionalHeader({ data, editable, edit }) {
  const { name, title } = data;
  const initials = getInitials(name) || 'CV';

  return (
    <header className="professional-header">
      <span className="professional-header__watermark" aria-hidden="true">{initials}</span>
      <h1 className="professional-header__name">
        <EditableField
          value={name}
          onChange={edit.setName}
          editable={editable}
          placeholder="Full name"
        />
      </h1>
      <p className="professional-header__title">
        <EditableField
          value={title}
          onChange={edit.setTitle}
          editable={editable}
          placeholder="Job title"
        />
      </p>
    </header>
  );
}
