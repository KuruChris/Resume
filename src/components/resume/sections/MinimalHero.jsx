import EditableField from '../../EditableField';
import ContactFields from './ContactFields';

export default function MinimalHero({ data, profilePhoto, editable, edit }) {
  const { name, title } = data;

  return (
    <header className="minimal-hero">
      <div className="minimal-hero__inner">
        <div className="minimal-hero__profile">
          <div className="profile-photo">
            <img src={profilePhoto} alt={name} />
          </div>
          <h1 className="minimal-hero__name">
            <EditableField
              value={name}
              onChange={edit.setName}
              editable={editable}
              placeholder="Full name"
            />
          </h1>
          <p className="minimal-hero__title">
            <EditableField
              value={title}
              onChange={edit.setTitle}
              editable={editable}
              placeholder="Job title"
            />
          </p>
        </div>

        <ContactFields
          contact={data.contact}
          editable={editable}
          edit={edit}
          variant="inline"
        />
        <div className="minimal-hero__rule" aria-hidden="true" />
      </div>
    </header>
  );
}
