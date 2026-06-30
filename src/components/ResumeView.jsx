import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_THEME_ID, getThemeStyle } from '../data/themes';
import EditableField from './EditableField';

function ContactLink({ href, label, external }) {
  const props = external
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { href };

  return (
    <a className="contact-link" {...props}>
      {label}
    </a>
  );
}

function Section({ title, children, className = '' }) {
  return (
    <section className={`section ${className}`}>
      <h2 className="section__title">{title}</h2>
      {children}
    </section>
  );
}

function hasProjectContent(project) {
  return Boolean(
    project.name?.trim()
    || project.description?.trim()
    || project.highlights?.some(Boolean),
  );
}

function hasReferenceContent(reference) {
  return Boolean(
    reference.name?.trim()
    || reference.title?.trim()
    || reference.company?.trim()
    || reference.phone?.trim()
    || reference.email?.trim(),
  );
}

function hasProjectLink(project) {
  return Boolean(project.linkEnabled && project.url?.trim());
}

function createResumeEditor(data, onDataChange) {
  return {
    setName: (name) => onDataChange({ ...data, name }),
    setTitle: (title) => onDataChange({ ...data, title }),
    setContact: (field, value) => onDataChange({
      ...data,
      contact: { ...data.contact, [field]: value },
    }),
    setAboutItem: (index, value) => onDataChange({
      ...data,
      about: data.about.map((item, i) => (i === index ? value : item)),
    }),
    setSkill: (index, value) => onDataChange({
      ...data,
      skills: data.skills.map((skill, i) => (i === index ? value : skill)),
    }),
    updateEducation: (index, patch) => onDataChange({
      ...data,
      education: data.education.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }),
    updateCertificate: (index, patch) => onDataChange({
      ...data,
      certificates: data.certificates.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }),
    updateLanguage: (index, patch) => onDataChange({
      ...data,
      languages: data.languages.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }),
    updateReference: (index, patch) => onDataChange({
      ...data,
      references: (data.references || []).map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }),
    updateExperience: (index, patch) => onDataChange({
      ...data,
      experience: data.experience.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }),
    setExperienceHighlight: (jobIndex, highlightIndex, value) => onDataChange({
      ...data,
      experience: data.experience.map((job, i) => {
        if (i !== jobIndex) return job;
        return {
          ...job,
          highlights: job.highlights.map((item, hi) => (hi === highlightIndex ? value : item)),
        };
      }),
    }),
    updateProject: (index, patch) => onDataChange({
      ...data,
      projects: (data.projects || []).map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }),
    setProjectHighlight: (projectIndex, highlightIndex, value) => onDataChange({
      ...data,
      projects: (data.projects || []).map((project, i) => {
        if (i !== projectIndex) return project;
        return {
          ...project,
          highlights: (project.highlights || []).map((item, hi) => (hi === highlightIndex ? value : item)),
        };
      }),
    }),
  };
}

function ProjectItemContent({ project, linked, editable, edit, projectIndex }) {
  return (
    <>
      <div className="project__header">
        <h3 className="project__name">
          <EditableField
            value={project.name}
            onChange={(value) => edit.updateProject(projectIndex, { name: value })}
            editable={editable}
            placeholder="Project name"
            showWhenEmpty={editable}
          />
        </h3>
        {linked && <span className="project__cta" aria-hidden="true">Open →</span>}
      </div>
      {(editable || project.description) && (
        <p className="project__description">
          <EditableField
            value={project.description || ''}
            onChange={(value) => edit.updateProject(projectIndex, { description: value })}
            editable={editable}
            multiline
            placeholder="Description (optional)"
            showWhenEmpty={editable}
          />
        </p>
      )}
      {project.highlights?.some(Boolean) && (
        <ul className="project__list">
          {project.highlights.filter(Boolean).map((item, highlightIndex) => (
            <li key={`${projectIndex}-${highlightIndex}`}>
              <EditableField
                value={item}
                onChange={(value) => edit.setProjectHighlight(projectIndex, highlightIndex, value)}
                editable={editable}
                placeholder="Highlight"
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function ProjectItem({ project, editable, edit, projectIndex }) {
  const url = project.url?.trim();
  const linked = !editable && hasProjectLink(project);
  const className = `project${linked ? ' project--linked' : ''}`;

  if (!linked) {
    return (
      <article className={className}>
        <ProjectItemContent
          project={project}
          linked={false}
          editable={editable}
          edit={edit}
          projectIndex={projectIndex}
        />
      </article>
    );
  }

  const isInternal = url.startsWith('/') && !url.startsWith('//');

  if (isInternal) {
    return (
      <Link to={url} className={className}>
        <ProjectItemContent
          project={project}
          linked
          editable={editable}
          edit={edit}
          projectIndex={projectIndex}
        />
      </Link>
    );
  }

  return (
    <a
      href={url}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ProjectItemContent
        project={project}
        linked
        editable={editable}
        edit={edit}
        projectIndex={projectIndex}
      />
    </a>
  );
}

function ExperienceItem({
  job,
  isLast,
  editable,
  edit,
  jobIndex,
}) {
  return (
    <article className={`experience ${isLast ? 'experience--last' : ''}`}>
      <div className="experience__marker" aria-hidden="true" />
      <div className="experience__content">
        <div className="experience__header">
          <div>
            <h3 className="experience__title">
              <EditableField
                value={job.title}
                onChange={(value) => edit.updateExperience(jobIndex, { title: value })}
                editable={editable}
                placeholder="Job title"
              />
            </h3>
            <p className="experience__company">
              <EditableField
                value={job.company}
                onChange={(value) => edit.updateExperience(jobIndex, { company: value })}
                editable={editable}
                placeholder="Company"
              />
              {(editable || job.location) && (
                <>
                  {' · '}
                  <EditableField
                    value={job.location || ''}
                    onChange={(value) => edit.updateExperience(jobIndex, { location: value })}
                    editable={editable}
                    placeholder="Location (optional)"
                    showWhenEmpty={editable}
                  />
                </>
              )}
            </p>
          </div>
          <time className="experience__period">
            <EditableField
              as="span"
              value={job.period}
              onChange={(value) => edit.updateExperience(jobIndex, { period: value })}
              editable={editable}
              placeholder="Period"
            />
          </time>
        </div>
        {(editable || job.description) && (
          <p className="experience__description">
            <EditableField
              value={job.description || ''}
              onChange={(value) => edit.updateExperience(jobIndex, { description: value })}
              editable={editable}
              multiline
              placeholder="Description (optional)"
              showWhenEmpty={editable}
            />
          </p>
        )}
        {job.highlights?.some(Boolean) && (
          <ul className="experience__list">
            {job.highlights.filter(Boolean).map((item, highlightIndex) => (
              <li key={`${jobIndex}-${highlightIndex}`}>
                <EditableField
                  value={item}
                  onChange={(value) => edit.setExperienceHighlight(jobIndex, highlightIndex, value)}
                  editable={editable}
                  placeholder="Highlight"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function Sidebar({ data, profilePhoto, editable, edit }) {
  const { name, title, contact } = data;
  const contactFields = [
    { field: 'email', value: contact.email, placeholder: 'Email', inputType: 'email' },
    { field: 'phone', value: contact.phone, placeholder: 'Phone', inputType: 'tel' },
    { field: 'location', value: contact.location, placeholder: 'Location', inputType: 'text' },
    { field: 'linkedin', value: contact.linkedin, placeholder: 'LinkedIn URL', inputType: 'url' },
  ];

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

      <nav className="sidebar__contact" aria-label="Contact information">
        {editable ? (
          contactFields.map(({ field, value, placeholder, inputType }) => (
            <EditableField
              key={field}
              className="contact-link"
              value={value || ''}
              onChange={(nextValue) => edit.setContact(field, nextValue)}
              editable
              placeholder={placeholder}
              inputType={inputType}
              showWhenEmpty
            />
          ))
        ) : (
          <>
            {contact.email && <ContactLink href={`mailto:${contact.email}`} label={contact.email} />}
            {contact.phone && <ContactLink href={`tel:${contact.phone}`} label={contact.phone} />}
            {contact.location && <span className="contact-link">{contact.location}</span>}
            {contact.linkedin && <ContactLink href={contact.linkedin} label="LinkedIn" external />}
          </>
        )}
      </nav>

      {data.skills.length > 0 && (
        <Section title="Skills">
          <ul className="skill-list">
            {data.skills.map((skill, index) => (
              <li key={`${skill}-${index}`} className="skill-tag">
                <EditableField
                  value={skill}
                  onChange={(value) => edit.setSkill(index, value)}
                  editable={editable}
                  placeholder="Skill"
                />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title="Education">
          {data.education.map((edu, index) => (
            <article key={`${edu.school}-${edu.period}-${index}`} className="education">
              <h3 className="education__degree">
                <EditableField
                  value={edu.degree}
                  onChange={(value) => edit.updateEducation(index, { degree: value })}
                  editable={editable}
                  placeholder="Degree"
                />
              </h3>
              <p className="education__school">
                <EditableField
                  value={edu.school}
                  onChange={(value) => edit.updateEducation(index, { school: value })}
                  editable={editable}
                  placeholder="School"
                />
              </p>
              <time className="education__period">
                <EditableField
                  as="span"
                  value={edu.period}
                  onChange={(value) => edit.updateEducation(index, { period: value })}
                  editable={editable}
                  placeholder="Period"
                />
              </time>
            </article>
          ))}
        </Section>
      )}

      {data.certificates.length > 0 && (
        <Section title="Certificates">
          <ul className="certificate-list">
            {data.certificates.map((cert, index) => (
              <li key={`${cert.name}-${cert.period}-${index}`} className="certificate">
                <h3 className="certificate__name">
                  <EditableField
                    value={cert.name}
                    onChange={(value) => edit.updateCertificate(index, { name: value })}
                    editable={editable}
                    placeholder="Certificate name"
                  />
                </h3>
                {(editable || cert.note) && (
                  <p className="certificate__note">
                    <EditableField
                      value={cert.note || ''}
                      onChange={(value) => edit.updateCertificate(index, { note: value })}
                      editable={editable}
                      placeholder="Note (optional)"
                      showWhenEmpty={editable}
                    />
                  </p>
                )}
                <time className="certificate__period">
                  <EditableField
                    as="span"
                    value={cert.period}
                    onChange={(value) => edit.updateCertificate(index, { period: value })}
                    editable={editable}
                    placeholder="Period"
                  />
                </time>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {data.languages.length > 0 && (
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
      )}

      {(data.references || []).some((ref) => editable || hasReferenceContent(ref)) && (
        <Section title="References">
          <ul className="reference-list">
            {(data.references || [])
              .map((ref, index) => ({ ref, index }))
              .filter(({ ref }) => editable || hasReferenceContent(ref))
              .map(({ ref, index }) => (
                <li key={`${ref.name}-${index}`} className="reference">
                  {(editable || ref.name) && (
                    <span className="reference__name">
                      <EditableField
                        value={ref.name || ''}
                        onChange={(value) => edit.updateReference(index, { name: value })}
                        editable={editable}
                        placeholder="Name"
                        showWhenEmpty={editable}
                      />
                    </span>
                  )}
                  {(editable || ref.title) && (
                    <span className="reference__title">
                      <EditableField
                        value={ref.title || ''}
                        onChange={(value) => edit.updateReference(index, { title: value })}
                        editable={editable}
                        placeholder="Title (optional)"
                        showWhenEmpty={editable}
                      />
                    </span>
                  )}
                  {(editable || ref.company) && (
                    <span className="reference__company">
                      <EditableField
                        value={ref.company || ''}
                        onChange={(value) => edit.updateReference(index, { company: value })}
                        editable={editable}
                        placeholder="Company (optional)"
                        showWhenEmpty={editable}
                      />
                    </span>
                  )}
                  {(editable || ref.phone) && (
                    editable ? (
                      <EditableField
                        className="contact-link"
                        value={ref.phone || ''}
                        onChange={(value) => edit.updateReference(index, { phone: value })}
                        editable
                        placeholder="Phone (optional)"
                        inputType="tel"
                        showWhenEmpty
                      />
                    ) : (
                      <ContactLink href={`tel:${ref.phone}`} label={ref.phone} />
                    )
                  )}
                  {(editable || ref.email) && (
                    editable ? (
                      <EditableField
                        className="contact-link"
                        value={ref.email || ''}
                        onChange={(value) => edit.updateReference(index, { email: value })}
                        editable
                        placeholder="Email (optional)"
                        inputType="email"
                        showWhenEmpty
                      />
                    ) : (
                      <ContactLink href={`mailto:${ref.email}`} label={ref.email} />
                    )
                  )}
                </li>
              ))}
          </ul>
        </Section>
      )}
    </aside>
  );
}

const noopEdit = {
  setName: () => {},
  setTitle: () => {},
  setContact: () => {},
  setAboutItem: () => {},
  setSkill: () => {},
  updateEducation: () => {},
  updateCertificate: () => {},
  updateLanguage: () => {},
  updateReference: () => {},
  updateExperience: () => {},
  setExperienceHighlight: () => {},
  updateProject: () => {},
  setProjectHighlight: () => {},
};

const ResumeView = forwardRef(function ResumeView(
  {
    data,
    profilePhoto,
    showFooter = true,
    children,
    themeId = DEFAULT_THEME_ID,
    onDataChange,
  },
  ref,
) {
  const editable = Boolean(onDataChange);
  const edit = editable ? createResumeEditor(data, onDataChange) : noopEdit;
  const filledProjects = (data.projects || [])
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => hasProjectContent(project));

  return (
    <div
      className={`resume${editable ? ' resume--editable' : ''}`}
      ref={ref}
      data-theme={themeId}
      style={getThemeStyle(themeId)}
    >
      <Sidebar
        data={data}
        profilePhoto={profilePhoto}
        editable={editable}
        edit={edit}
      />

      <main className="content">
        {data.about.some(Boolean) && (
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
        )}

        {filledProjects.length > 0 && (
          <Section title="Projects">
            <div className="project-list">
              {filledProjects.map(({ project, index }) => (
                <ProjectItem
                  key={`${project.name}-${index}`}
                  project={project}
                  editable={editable}
                  edit={edit}
                  projectIndex={index}
                />
              ))}
            </div>
          </Section>
        )}

        {data.experience.length > 0 && (
          <Section title="Work Experience">
            <div className="timeline">
              {data.experience.map((job, index) => (
                <ExperienceItem
                  key={`${job.company}-${job.period}-${index}`}
                  job={job}
                  isLast={index === data.experience.length - 1}
                  editable={editable}
                  edit={edit}
                  jobIndex={index}
                />
              ))}
            </div>
          </Section>
        )}

        {children}

        {showFooter && (
          <footer className="footer">
            <p>© {new Date().getFullYear()} {data.name}</p>
          </footer>
        )}
      </main>
    </div>
  );
});

export default ResumeView;
