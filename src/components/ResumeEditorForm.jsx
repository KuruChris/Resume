const emptyExperience = () => ({
  title: '',
  company: '',
  location: '',
  period: '',
  description: '',
  highlights: [],
});

const emptyEducation = () => ({
  degree: '',
  school: '',
  period: '',
});

const emptyCertificate = () => ({
  name: '',
  note: '',
  period: '',
});

const emptyLanguage = () => ({
  name: '',
  level: '',
});

const emptyProject = () => ({
  name: '',
  description: '',
  linkEnabled: false,
  url: '',
  highlights: [],
});

import ThemeSelector from './ThemeSelector';

function Field({ label, children, hint }) {
  return (
    <label className="editor-field">
      <span className="editor-field__label">{label}</span>
      {children}
      {hint && <span className="editor-field__hint">{hint}</span>}
    </label>
  );
}

function SectionCard({ title, children, onAdd, addLabel }) {
  return (
    <section className="editor-section">
      <div className="editor-section__header">
        <h3 className="editor-section__title">{title}</h3>
        {onAdd && (
          <button type="button" className="editor-btn editor-btn--ghost" onClick={onAdd}>
            {addLabel}
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

export default function ResumeEditorForm({
  data,
  profilePhoto,
  themeId,
  onDataChange,
  onPhotoChange,
  onThemeChange,
}) {
  function updateData(patch) {
    onDataChange({ ...data, ...patch });
  }

  function updateContact(field, value) {
    updateData({ contact: { ...data.contact, [field]: value } });
  }

  function updateListItem(listName, index, patch) {
    updateData({
      [listName]: data[listName].map((item, i) => (i === index ? { ...item, ...patch } : item)),
    });
  }

  function addListItem(listName, factory) {
    updateData({ [listName]: [...data[listName], factory()] });
  }

  function removeListItem(listName, index) {
    updateData({ [listName]: data[listName].filter((_, i) => i !== index) });
  }

  function handlePhotoInput(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      window.alert('Please choose an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => onPhotoChange(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className="editor-form">
      <SectionCard title="Color theme">
        <ThemeSelector value={themeId} onChange={onThemeChange} />
      </SectionCard>

      <SectionCard title="Profile photo">
        <div className="editor-photo">
          <img src={profilePhoto} alt="Profile preview" className="editor-photo__preview" />
          <label className="editor-btn editor-btn--secondary">
            Change photo
            <input
              type="file"
              accept="image/*"
              className="editor-photo__input"
              onChange={handlePhotoInput}
            />
          </label>
        </div>
      </SectionCard>

      <SectionCard title="Basics">
        <Field label="Full name">
          <input
            className="editor-input"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
          />
        </Field>
        <Field label="Job title">
          <input
            className="editor-input"
            value={data.title}
            onChange={(e) => updateData({ title: e.target.value })}
          />
        </Field>
      </SectionCard>

      <SectionCard title="Contact">
        <Field label="Email">
          <input
            className="editor-input"
            type="email"
            value={data.contact.email}
            onChange={(e) => updateContact('email', e.target.value)}
          />
        </Field>
        <Field label="Phone">
          <input
            className="editor-input"
            value={data.contact.phone}
            onChange={(e) => updateContact('phone', e.target.value)}
          />
        </Field>
        <Field label="Location">
          <input
            className="editor-input"
            value={data.contact.location}
            onChange={(e) => updateContact('location', e.target.value)}
          />
        </Field>
        <Field label="LinkedIn URL">
          <input
            className="editor-input"
            value={data.contact.linkedin}
            onChange={(e) => updateContact('linkedin', e.target.value)}
          />
        </Field>
      </SectionCard>

      <SectionCard title="About me">
        <Field label="Bullet points" hint="One highlight per line.">
          <textarea
            className="editor-textarea"
            rows={6}
            value={data.about.join('\n')}
            onChange={(e) => updateData({
              about: e.target.value.split('\n').map((line) => line.trim()),
            })}
          />
        </Field>
      </SectionCard>

      <SectionCard title="Skills">
        <Field label="Skills" hint="Separate with commas.">
          <input
            className="editor-input"
            value={data.skills.join(', ')}
            onChange={(e) => updateData({
              skills: e.target.value.split(',').map((skill) => skill.trim()).filter(Boolean),
            })}
          />
        </Field>
      </SectionCard>

      <SectionCard
        title="Work experience"
        onAdd={() => addListItem('experience', emptyExperience)}
        addLabel="+ Add role"
      >
        {data.experience.map((job, index) => (
          <div key={index} className="editor-card">
            <div className="editor-card__header">
              <h4 className="editor-card__title">Role {index + 1}</h4>
              <button
                type="button"
                className="editor-btn editor-btn--danger"
                onClick={() => removeListItem('experience', index)}
              >
                Remove
              </button>
            </div>
            <Field label="Job title">
              <input
                className="editor-input"
                value={job.title}
                onChange={(e) => updateListItem('experience', index, { title: e.target.value })}
              />
            </Field>
            <Field label="Company">
              <input
                className="editor-input"
                value={job.company}
                onChange={(e) => updateListItem('experience', index, { company: e.target.value })}
              />
            </Field>
            <Field label="Location (optional)">
              <input
                className="editor-input"
                value={job.location || ''}
                onChange={(e) => updateListItem('experience', index, { location: e.target.value })}
              />
            </Field>
            <Field label="Period">
              <input
                className="editor-input"
                value={job.period}
                onChange={(e) => updateListItem('experience', index, { period: e.target.value })}
              />
            </Field>
            <Field label="Description (optional)">
              <textarea
                className="editor-textarea"
                rows={2}
                value={job.description || ''}
                onChange={(e) => updateListItem('experience', index, { description: e.target.value })}
              />
            </Field>
            <Field label="Highlights" hint="One bullet per line.">
              <textarea
                className="editor-textarea"
                rows={4}
                value={(job.highlights || []).join('\n')}
                onChange={(e) => updateListItem('experience', index, {
                  highlights: e.target.value.split('\n').map((line) => line.trim()),
                })}
              />
            </Field>
          </div>
        ))}
      </SectionCard>

      <SectionCard
        title="Projects"
        onAdd={() => addListItem('projects', emptyProject)}
        addLabel="+ Add project"
      >
        {(data.projects || []).map((project, index) => (
          <div key={index} className="editor-card">
            <div className="editor-card__header">
              <h4 className="editor-card__title">Project {index + 1}</h4>
              <button
                type="button"
                className="editor-btn editor-btn--danger"
                onClick={() => removeListItem('projects', index)}
              >
                Remove
              </button>
            </div>
            <Field label="Project name">
              <input
                className="editor-input"
                value={project.name}
                onChange={(e) => updateListItem('projects', index, { name: e.target.value })}
              />
            </Field>
            <label className="editor-checkbox">
              <input
                type="checkbox"
                checked={Boolean(project.linkEnabled)}
                onChange={(e) => updateListItem('projects', index, { linkEnabled: e.target.checked })}
              />
              <span>Link this project (clickable card on your resume)</span>
            </label>
            {project.linkEnabled && (
              <Field
                label="Link URL"
                hint="Use /editor for this template, or any full URL (e.g. GitHub, live demo)."
              >
                <input
                  className="editor-input"
                  value={project.url || ''}
                  onChange={(e) => updateListItem('projects', index, { url: e.target.value })}
                  placeholder="/editor or https://..."
                />
              </Field>
            )}
            <Field label="Description (optional)">
              <textarea
                className="editor-textarea"
                rows={2}
                value={project.description || ''}
                onChange={(e) => updateListItem('projects', index, { description: e.target.value })}
              />
            </Field>
            <Field label="Highlights" hint="One bullet per line.">
              <textarea
                className="editor-textarea"
                rows={4}
                value={(project.highlights || []).join('\n')}
                onChange={(e) => updateListItem('projects', index, {
                  highlights: e.target.value.split('\n').map((line) => line.trim()),
                })}
              />
            </Field>
          </div>
        ))}
      </SectionCard>

      <SectionCard
        title="Education"
        onAdd={() => addListItem('education', emptyEducation)}
        addLabel="+ Add school"
      >
        {data.education.map((edu, index) => (
          <div key={index} className="editor-card">
            <div className="editor-card__header">
              <h4 className="editor-card__title">School {index + 1}</h4>
              <button
                type="button"
                className="editor-btn editor-btn--danger"
                onClick={() => removeListItem('education', index)}
              >
                Remove
              </button>
            </div>
            <Field label="Degree">
              <input
                className="editor-input"
                value={edu.degree}
                onChange={(e) => updateListItem('education', index, { degree: e.target.value })}
              />
            </Field>
            <Field label="School">
              <input
                className="editor-input"
                value={edu.school}
                onChange={(e) => updateListItem('education', index, { school: e.target.value })}
              />
            </Field>
            <Field label="Period">
              <input
                className="editor-input"
                value={edu.period}
                onChange={(e) => updateListItem('education', index, { period: e.target.value })}
              />
            </Field>
          </div>
        ))}
      </SectionCard>

      <SectionCard
        title="Certificates"
        onAdd={() => addListItem('certificates', emptyCertificate)}
        addLabel="+ Add certificate"
      >
        {data.certificates.map((cert, index) => (
          <div key={index} className="editor-card">
            <div className="editor-card__header">
              <h4 className="editor-card__title">Certificate {index + 1}</h4>
              <button
                type="button"
                className="editor-btn editor-btn--danger"
                onClick={() => removeListItem('certificates', index)}
              >
                Remove
              </button>
            </div>
            <Field label="Name">
              <input
                className="editor-input"
                value={cert.name}
                onChange={(e) => updateListItem('certificates', index, { name: e.target.value })}
              />
            </Field>
            <Field label="Note">
              <input
                className="editor-input"
                value={cert.note}
                onChange={(e) => updateListItem('certificates', index, { note: e.target.value })}
              />
            </Field>
            <Field label="Period">
              <input
                className="editor-input"
                value={cert.period}
                onChange={(e) => updateListItem('certificates', index, { period: e.target.value })}
              />
            </Field>
          </div>
        ))}
      </SectionCard>

      <SectionCard
        title="Languages"
        onAdd={() => addListItem('languages', emptyLanguage)}
        addLabel="+ Add language"
      >
        {data.languages.map((lang, index) => (
          <div key={index} className="editor-card">
            <div className="editor-card__header">
              <h4 className="editor-card__title">Language {index + 1}</h4>
              <button
                type="button"
                className="editor-btn editor-btn--danger"
                onClick={() => removeListItem('languages', index)}
              >
                Remove
              </button>
            </div>
            <Field label="Language">
              <input
                className="editor-input"
                value={lang.name}
                onChange={(e) => updateListItem('languages', index, { name: e.target.value })}
              />
            </Field>
            <Field label="Proficiency">
              <input
                className="editor-input"
                value={lang.level}
                onChange={(e) => updateListItem('languages', index, { level: e.target.value })}
              />
            </Field>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}
