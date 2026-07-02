import { useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  createPortfolioDocument,
  isValidTemplateId,
  patchDocumentContent,
} from '../config';
import ResumeView from '../components/ResumeView';
import ResumeEditorForm from '../components/ResumeEditorForm';
import '../App.css';
import '../Editor.css';

function EditorPageContent({ templateId }) {
  const [document, setDocument] = useState(() => createPortfolioDocument({ templateId }));
  const [exporting, setExporting] = useState(false);
  const resumeRef = useRef(null);
  const { content, profilePhoto, themeId } = document;

  async function handleExportPdf() {
    if (!resumeRef.current || exporting) return;

    setExporting(true);
    try {
      const { downloadResumePdf } = await import('../utils/exportPdf');
      const fileName = content.name.trim()
        ? `${content.name.trim().replace(/\s+/g, '-')}-Resume.pdf`
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
          <Link to="/templates" className="editor-toolbar__back">← Templates</Link>
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
            document={document}
            onDocumentChange={setDocument}
          />
        </div>

        <div className="editor-layout__preview">
          <p className="editor-preview-label">Live preview — click any text to edit</p>
          <div className="editor-preview__viewport">
            <div className="editor-preview__frame">
              <ResumeView
                ref={resumeRef}
                data={content}
                profilePhoto={profilePhoto}
                themeId={themeId}
                templateId={templateId}
                showFooter={false}
                onDataChange={(nextContent) => {
                  setDocument((current) => patchDocumentContent(current, nextContent));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditorPage() {
  const { templateId } = useParams();

  if (!isValidTemplateId(templateId)) {
    return <Navigate to="/templates" replace />;
  }

  return <EditorPageContent templateId={templateId} />;
}
