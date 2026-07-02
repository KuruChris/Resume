import { useEffect, useState } from 'react';
import {
  SECTIONS,
  createEmptyCertificate,
  createEmptyContactLink,
  createEmptyEducation,
  createEmptyExperience,
  createEmptyLanguage,
  createEmptyProject,
  createEmptyReference,
  getTemplate,
  patchDocumentContent,
  patchDocumentProfilePhoto,
  patchDocumentTheme,
  templateHasSection,
} from '../config';
import ThemeSelector from './ThemeSelector';

function parseCommaSeparatedList(value) {
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

function CommaSeparatedInput({ values, onChange, className }) {
  const [text, setText] = useState(() => values.join(', '));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) {
      setText(values.join(', '));
    }
  }, [values, focused]);

  function commit(nextText) {
    const parsed = parseCommaSeparatedList(nextText);
    onChange(parsed);
    setText(parsed.join(', '));
  }

  return (
    <input
      className={className}
      value={text}
      onChange={(event) => setText(event.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        commit(text);
      }}
    />
  );
}

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
  document,
  onDocumentChange,
}) {
  const { content: data, profilePhoto, themeId, templateId } = document;
  const template = getTemplate(templateId);

  function updateContent(patch) {
    onDocumentChange(patchDocumentContent(document, { ...data, ...patch }));
  }

  function updateContact(field, value) {
    updateContent({ contact: { ...data.contact, [field]: value } });
  }

  function updateContactLinks(updater) {
    updateContent({
      contact: {
        ...data.contact,
        links: updater(data.contact.links || []),
      },
    });
  }

  function addContactLink() {
    updateContactLinks((links) => [...links, createEmptyContactLink()]);
  }

  function removeContactLink(index) {
    updateContactLinks((links) => links.filter((_, i) => i !== index));
  }

  function updateContactLink(index, patch) {
    updateContactLinks((links) => links.map((link, i) => (
      i === index ? { ...link, ...patch } : link
    )));
  }

  function updateListItem(listName, index, patch) {
    updateContent({
      [listName]: (data[listName] || []).map((item, i) => (i === index ? { ...item, ...patch } : item)),
    });
  }

  function addListItem(listName, factory) {
    updateContent({ [listName]: [...(data[listName] || []), factory()] });
  }

  function removeListItem(listName, index) {
    updateContent({ [listName]: (data[listName] || []).filter((_, i) => i !== index) });
  }

  function handlePhotoInput(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      window.alert('Please choose an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onDocumentChange(patchDocumentProfilePhoto(document, reader.result));
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="editor-form">
      <SectionCard title="Template">
        <p className="editor-template-name">{template.name}</p>
        <p className="editor-section__hint">{template.description}</p>
      </SectionCard>

      <SectionCard title="Color theme">
        <ThemeSelector
          value={themeId}
          onChange={(nextThemeId) => {
            onDocumentChange(patchDocumentTheme(document, nextThemeId));
          }}
        />
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

      {templateHasSection(document, SECTIONS.PROFILE) && (
      <SectionCard title="Basics">
        <Field label="Full name">
          <input
            className="editor-input"
            value={data.name}
            onChange={(e) => updateContent({ name: e.target.value })}
          />
        </Field>
        <Field label="Job title">
          <input
            className="editor-input"
            value={data.title}
            onChange={(e) => updateContent({ title: e.target.value })}
          />
        </Field>
      </SectionCard>
      )}

      {templateHasSection(document, SECTIONS.CONTACT) && (
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

        <div className="editor-subsection">
          <div className="editor-subsection__header">
            <h4 className="editor-subsection__title">Social links</h4>
            <button
              type="button"
              className="editor-btn editor-btn--ghost"
              onClick={addContactLink}
            >
              + Add link
            </button>
          </div>
          <p className="editor-section__hint">Optional — LinkedIn, GitHub, portfolio, etc. Leave blank to hide.</p>
          {(data.contact.links || []).length === 0 && (
            <p className="editor-empty-hint">No social links added.</p>
          )}
          {(data.contact.links || []).map((link, index) => (
            <div key={index} className="editor-card">
              <div className="editor-card__header">
                <h4 className="editor-card__title">Link {index + 1}</h4>
                <button
                  type="button"
                  className="editor-btn editor-btn--ghost editor-btn--danger"
                  onClick={() => removeContactLink(index)}
                >
                  Remove
                </button>
              </div>
              <Field label="Label">
                <input
                  className="editor-input"
                  value={link.label}
                  placeholder="LinkedIn, GitHub, Website…"
                  onChange={(e) => updateContactLink(index, { label: e.target.value })}
                />
              </Field>
              <Field label="URL">
                <input
                  className="editor-input"
                  type="url"
                  value={link.url}
                  placeholder="https://"
                  onChange={(e) => updateContactLink(index, { url: e.target.value })}
                />
              </Field>
            </div>
          ))}
        </div>
      </SectionCard>
      )}

      {templateHasSection(document, SECTIONS.ABOUT) && (
      <SectionCard title="About me">
        <Field label="Bullet points" hint="One highlight per line.">
          <textarea
            className="editor-textarea"
            rows={6}
            value={data.about.join('\n')}
            onChange={(e) => updateContent({
              about: e.target.value.split('\n').map((line) => line.trim()),
            })}
          />
        </Field>
      </SectionCard>
      )}

      {templateHasSection(document, SECTIONS.SKILLS) && (
      <SectionCard title="Skills">
        <Field label="Skills" hint="Separate with commas.">
          <CommaSeparatedInput
            className="editor-input"
            values={data.skills}
            onChange={(skills) => updateContent({ skills })}
          />
        </Field>
      </SectionCard>
      )}

      {templateHasSection(document, SECTIONS.PROJECTS) && (
      <SectionCard
        title="Projects"
        onAdd={() => addListItem('projects', createEmptyProject)}
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
      )}

      {templateHasSection(document, SECTIONS.EXPERIENCE) && (
      <SectionCard
        title="Work experience"
        onAdd={() => addListItem('experience', createEmptyExperience)}
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
      )}

      {templateHasSection(document, SECTIONS.EDUCATION) && (
      <SectionCard
        title="Education"
        onAdd={() => addListItem('education', createEmptyEducation)}
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
      )}

      {templateHasSection(document, SECTIONS.CERTIFICATES) && (
      <SectionCard
        title="Certificates"
        onAdd={() => addListItem('certificates', createEmptyCertificate)}
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
      )}

      {templateHasSection(document, SECTIONS.LANGUAGES) && (
      <SectionCard
        title="Languages"
        onAdd={() => addListItem('languages', createEmptyLanguage)}
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
      )}

      {templateHasSection(document, SECTIONS.REFERENCES) && (
      <SectionCard
        title="References"
        onAdd={() => addListItem('references', createEmptyReference)}
        addLabel="+ Add reference"
      >
        <p className="editor-section__hint">
          Optional — leave empty or remove all entries to hide this section on your resume.
        </p>
        {(data.references || []).map((ref, index) => (
          <div key={index} className="editor-card">
            <div className="editor-card__header">
              <h4 className="editor-card__title">Reference {index + 1}</h4>
              <button
                type="button"
                className="editor-btn editor-btn--danger"
                onClick={() => removeListItem('references', index)}
              >
                Remove
              </button>
            </div>
            <Field label="Name">
              <input
                className="editor-input"
                value={ref.name}
                onChange={(e) => updateListItem('references', index, { name: e.target.value })}
              />
            </Field>
            <Field label="Title (optional)">
              <input
                className="editor-input"
                value={ref.title || ''}
                onChange={(e) => updateListItem('references', index, { title: e.target.value })}
              />
            </Field>
            <Field label="Company (optional)">
              <input
                className="editor-input"
                value={ref.company || ''}
                onChange={(e) => updateListItem('references', index, { company: e.target.value })}
              />
            </Field>
            <Field label="Phone (optional)">
              <input
                className="editor-input"
                value={ref.phone || ''}
                onChange={(e) => updateListItem('references', index, { phone: e.target.value })}
              />
            </Field>
            <Field label="Email (optional)">
              <input
                className="editor-input"
                type="email"
                value={ref.email || ''}
                onChange={(e) => updateListItem('references', index, { email: e.target.value })}
              />
            </Field>
          </div>
        ))}
      </SectionCard>
      )}
    </div>
  );
}
