import { createDemoDocument } from '../config';
import ResumeView from '../components/ResumeView';
import TemplateCta from '../components/TemplateCta';
import '../App.css';
import '../Editor.css';

export default function ResumePage() {
  const document = createDemoDocument();
  const { content, profilePhoto, themeId, templateId } = document;

  return (
    <>
      <header className="resume-page__top">
        <TemplateCta variant="compact" />
      </header>

      <ResumeView
        data={content}
        profilePhoto={profilePhoto}
        themeId={themeId}
        templateId={templateId}
      />

      <div className="resume-page__cta">
        <TemplateCta />
      </div>
    </>
  );
}
