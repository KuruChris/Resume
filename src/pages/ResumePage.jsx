import { useRef, useState } from 'react';
import { resume } from '../data/resume';
import profilePhoto from '../assets/profile.jpeg';
import ResumeView from '../components/ResumeView';
import TemplateCta from '../components/TemplateCta';
import '../App.css';
import '../Editor.css';

export default function ResumePage() {
  const resumeRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  async function handleExportPdf() {
    if (!resumeRef.current || exporting) return;

    setExporting(true);
    try {
      const { downloadResumePdf } = await import('../utils/exportPdf');
      await downloadResumePdf(resumeRef.current, `${resume.name.replace(/\s+/g, '-')}-Resume.pdf`);
    } catch (error) {
      console.error(error);
      window.alert('Could not generate PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  }

  return (
    <>
      <header className="resume-page__top">
        <TemplateCta variant="compact" />
      </header>

      <button
        type="button"
        className="pdf-export-btn pdf-export-btn--sticky"
        onClick={handleExportPdf}
        disabled={exporting}
        aria-label="Save resume as PDF"
      >
        {exporting ? 'Generating…' : 'Save as PDF'}
      </button>

      <ResumeView
        ref={resumeRef}
        data={resume}
        profilePhoto={profilePhoto}
      />

      <div className="resume-page__cta">
        <TemplateCta />
      </div>
    </>
  );
}
