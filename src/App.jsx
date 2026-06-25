import { useRef, useState } from 'react';
import { resume } from './data/resume';
import profilePhoto from './assets/profile.jpeg';
import './App.css';

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

function Sidebar() {
  const { name, title, contact } = resume;

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
        <ContactLink href={`mailto:${contact.email}`} label={contact.email} />
        <ContactLink href={`tel:${contact.phone}`} label={contact.phone} />
        <span className="contact-link">{contact.location}</span>
        <ContactLink href={contact.linkedin} label="LinkedIn" external />
      </nav>

      <Section title="Skills">
        <ul className="skill-list">
          {resume.skills.map((skill) => (
            <li key={skill} className="skill-tag">{skill}</li>
          ))}
        </ul>
      </Section>

      <Section title="Education">
        {resume.education.map((edu) => (
          <article key={edu.school} className="education">
            <h3 className="education__degree">{edu.degree}</h3>
            <p className="education__school">{edu.school}</p>
            <time className="education__period">{edu.period}</time>
          </article>
        ))}
      </Section>

      <Section title="Certificates">
        <ul className="certificate-list">
          {resume.certificates.map((cert) => (
            <li key={cert.name} className="certificate">
              <h3 className="certificate__name">{cert.name}</h3>
              <p className="certificate__note">{cert.note}</p>
              <time className="certificate__period">{cert.period}</time>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Languages">
        <ul className="language-list">
          {resume.languages.map((lang) => (
            <li key={lang.name} className="language">
              <span className="language__name">{lang.name}</span>
              <span className="language__level">{lang.level}</span>
            </li>
          ))}
        </ul>
      </Section>
    </aside>
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
        {job.highlights && (
          <ul className="experience__list">
            {job.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function App() {
  const resumeRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  async function handleExportPdf() {
    if (!resumeRef.current || exporting) return;

    setExporting(true);
    try {
      const { downloadResumePdf } = await import('./utils/exportPdf');
      await downloadResumePdf(resumeRef.current);
    } catch (error) {
      console.error(error);
      window.alert('Could not generate PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="pdf-export-btn"
        onClick={handleExportPdf}
        disabled={exporting}
        aria-label="Save resume as PDF"
      >
        {exporting ? 'Generating…' : 'Save as PDF'}
      </button>

      <div className="resume" ref={resumeRef}>
        <Sidebar />

        <main className="content">
        <Section title="About Me">
          <ul className="about-list">
            {resume.about.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Work Experience">
          <div className="timeline">
            {resume.experience.map((job, index) => (
              <ExperienceItem
                key={`${job.company}-${job.period}`}
                job={job}
                isLast={index === resume.experience.length - 1}
              />
            ))}
          </div>
        </Section>

        <footer className="footer">
          <p>© {new Date().getFullYear()} {resume.name}</p>
        </footer>
        </main>
      </div>
    </>
  );
}

export default App;
