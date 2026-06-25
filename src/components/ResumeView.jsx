import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_THEME_ID, getThemeStyle } from '../data/themes';

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

function hasProjectLink(project) {
  return Boolean(project.linkEnabled && project.url?.trim());
}

function ProjectItemContent({ project, linked }) {
  return (
    <>
      <div className="project__header">
        <h3 className="project__name">{project.name}</h3>
        {linked && <span className="project__cta" aria-hidden="true">Open →</span>}
      </div>
      {project.description && <p className="project__description">{project.description}</p>}
      {project.highlights?.some(Boolean) && (
        <ul className="project__list">
          {project.highlights.filter(Boolean).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
}

function ProjectItem({ project }) {
  const url = project.url?.trim();
  const linked = hasProjectLink(project);
  const className = `project${linked ? ' project--linked' : ''}`;

  if (!linked) {
    return (
      <article className={className}>
        <ProjectItemContent project={project} linked={false} />
      </article>
    );
  }

  const isInternal = url.startsWith('/') && !url.startsWith('//');

  if (isInternal) {
    return (
      <Link to={url} className={className}>
        <ProjectItemContent project={project} linked />
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
      <ProjectItemContent project={project} linked />
    </a>
  );
}

function ExperienceItem({ job, isLast }) {
  return (
    <article className={`experience ${isLast ? 'experience--last' : ''}`}>
      <div className="experience__marker" aria-hidden="true" />
      <div className="experience__content">
        <div className="experience__header">
          <div>
            <h3 className="experience__title">{job.title}</h3>
            <p className="experience__company">
              {job.company}
              {job.location && <span> · {job.location}</span>}
            </p>
          </div>
          <time className="experience__period">{job.period}</time>
        </div>
        {job.description && <p className="experience__description">{job.description}</p>}
        {job.highlights?.some(Boolean) && (
          <ul className="experience__list">
            {job.highlights.filter(Boolean).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function Sidebar({ data, profilePhoto }) {
  const { name, title, contact } = data;

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="profile-photo">
          <img src={profilePhoto} alt={name} />
        </div>
        <h1 className="sidebar__name">{name}</h1>
        <p className="sidebar__title">{title}</p>
      </div>

      <nav className="sidebar__contact" aria-label="Contact information">
        {contact.email && <ContactLink href={`mailto:${contact.email}`} label={contact.email} />}
        {contact.phone && <ContactLink href={`tel:${contact.phone}`} label={contact.phone} />}
        {contact.location && <span className="contact-link">{contact.location}</span>}
        {contact.linkedin && <ContactLink href={contact.linkedin} label="LinkedIn" external />}
      </nav>

      {data.skills.length > 0 && (
        <Section title="Skills">
          <ul className="skill-list">
            {data.skills.map((skill) => (
              <li key={skill} className="skill-tag">{skill}</li>
            ))}
          </ul>
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title="Education">
          {data.education.map((edu) => (
            <article key={`${edu.school}-${edu.period}`} className="education">
              <h3 className="education__degree">{edu.degree}</h3>
              <p className="education__school">{edu.school}</p>
              <time className="education__period">{edu.period}</time>
            </article>
          ))}
        </Section>
      )}

      {data.certificates.length > 0 && (
        <Section title="Certificates">
          <ul className="certificate-list">
            {data.certificates.map((cert) => (
              <li key={`${cert.name}-${cert.period}`} className="certificate">
                <h3 className="certificate__name">{cert.name}</h3>
                {cert.note && <p className="certificate__note">{cert.note}</p>}
                <time className="certificate__period">{cert.period}</time>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {data.languages.length > 0 && (
        <Section title="Languages">
          <ul className="language-list">
            {data.languages.map((lang) => (
              <li key={lang.name} className="language">
                <span className="language__name">{lang.name}</span>
                <span className="language__level">{lang.level}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </aside>
  );
}

const ResumeView = forwardRef(function ResumeView(
  { data, profilePhoto, showFooter = true, children, themeId = DEFAULT_THEME_ID },
  ref,
) {
  return (
    <div
      className="resume"
      ref={ref}
      data-theme={themeId}
      style={getThemeStyle(themeId)}
    >
      <Sidebar data={data} profilePhoto={profilePhoto} />

      <main className="content">
        {data.about.some(Boolean) && (
          <Section title="About Me">
            <ul className="about-list">
              {data.about.filter(Boolean).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
                />
              ))}
            </div>
          </Section>
        )}

        {data.projects?.length > 0 && (
          <Section title="Projects">
            <div className="project-list">
              {data.projects.map((project, index) => (
                <ProjectItem
                  key={`${project.name}-${index}`}
                  project={project}
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
