import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { createResumeTemplate } from '../data/defaultResume';
import { DEFAULT_THEME_ID } from '../data/themes';
import ResumeView from '../components/ResumeView';
import ResumeEditorForm from '../components/ResumeEditorForm';
import '../App.css';
import '../Editor.css';

export default function EditorPage() {
  const template = createResumeTemplate();
  const [data, setData] = useState(template.data);
  const [profilePhoto, setProfilePhoto] = useState(template.profilePhoto);
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);
  const [exporting, setExporting] = useState(false);
  const resumeRef = useRef(null);

  async function handleExportPdf() {
    if (!resumeRef.current || exporting) return;

    setExporting(true);
    try {
      const { downloadResumePdf } = await import('../utils/exportPdf');
      const fileName = data.name.trim()
        ? `${data.name.trim().replace(/\s+/g, '-')}-Resume.pdf`
        : 'My-Resume.pdf';
      await downloadResumePdf(resumeRef.current, fileName);
    } catch (error) {
      console.error(error);
      window.alert('Could not generate PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="editor-page">
      <header className="editor-toolbar">
        <div className="editor-toolbar__start">
          <Link to="/" className="editor-toolbar__back">← Back</Link>
          <div>
            <h1 className="editor-toolbar__title">Resume editor</h1>
            <p className="editor-toolbar__note">
              Edits are temporary — download your PDF before you leave.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="editor-toolbar__download"
          onClick={handleExportPdf}
          disabled={exporting}
        >
          {exporting ? 'Generating…' : 'Download PDF'}
        </button>
      </header>

      <div className="editor-layout">
        <div className="editor-layout__form">
          <ResumeEditorForm
            data={data}
            profilePhoto={profilePhoto}
            themeId={themeId}
            onDataChange={setData}
            onPhotoChange={setProfilePhoto}
            onThemeChange={setThemeId}
          />
        </div>

        <div className="editor-layout__preview">
          <p className="editor-preview-label">Live preview</p>
          <div className="editor-preview__viewport">
            <div className="editor-preview__frame">
              <ResumeView
                ref={resumeRef}
                data={data}
                profilePhoto={profilePhoto}
                themeId={themeId}
                showFooter={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
