import EditableField from '../../EditableField';
import ContactFields from './ContactFields';
import CertificatesSection from './CertificatesSection';
import EducationSection from './EducationSection';
import LanguagesSection from './LanguagesSection';
import ReferencesSection from './ReferencesSection';
import SkillsSection from './SkillsSection';

export default function Sidebar({ data, profilePhoto, editable, edit }) {
  const { name, title } = data;

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="profile-photo">
          <img src={profilePhoto} alt={name} />
        </div>
        <h1 className="sidebar__name">
          <EditableField
            value={name}
            onChange={edit.setName}
            editable={editable}
            placeholder="Full name"
          />
        </h1>
        <p className="sidebar__title">
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
        variant="sidebar"
      />

      <SkillsSection data={data} editable={editable} edit={edit} />
      <EducationSection data={data} editable={editable} edit={edit} />
      <CertificatesSection data={data} editable={editable} edit={edit} />
      <LanguagesSection data={data} editable={editable} edit={edit} />
      <ReferencesSection data={data} editable={editable} edit={edit} />
    </aside>
  );
}
