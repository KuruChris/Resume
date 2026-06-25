import { resume } from '../data/resume';
import profilePhoto from '../assets/profile.jpeg';
import ResumeView from '../components/ResumeView';
import TemplateCta from '../components/TemplateCta';
import '../App.css';
import '../Editor.css';

export default function ResumePage() {
  return (
    <>
      <header className="resume-page__top">
        <TemplateCta variant="compact" />
      </header>

      <ResumeView
        data={resume}
        profilePhoto={profilePhoto}
      />

      <div className="resume-page__cta">
        <TemplateCta />
      </div>
    </>
  );
}
