import { forwardRef } from 'react';
import AboutSection from '../../components/resume/sections/AboutSection';
import CertificatesSection from '../../components/resume/sections/CertificatesSection';
import EducationSection from '../../components/resume/sections/EducationSection';
import ExperienceSection from '../../components/resume/sections/ExperienceSection';
import LanguagesSection from '../../components/resume/sections/LanguagesSection';
import MinimalHero from '../../components/resume/sections/MinimalHero';
import ProjectsSection from '../../components/resume/sections/ProjectsSection';
import ReferencesSection from '../../components/resume/sections/ReferencesSection';
import SkillsSection from '../../components/resume/sections/SkillsSection';
import { getThemeStyle } from '../../config';
import './minimal-single.css';

const MinimalSingleTemplate = forwardRef(function MinimalSingleTemplate(
  {
    data,
    profilePhoto,
    themeId,
    templateId,
    editable,
    edit,
    showFooter = true,
    children,
  },
  ref,
) {
  return (
    <div
      className={`resume resume--minimal-single${editable ? ' resume--editable' : ''}`}
      ref={ref}
      data-theme={themeId}
      data-template={templateId}
      style={getThemeStyle(themeId)}
    >
      <MinimalHero
        data={data}
        profilePhoto={profilePhoto}
        editable={editable}
        edit={edit}
      />

      <main className="content content--minimal">
        <AboutSection data={data} editable={editable} edit={edit} />
        <SkillsSection data={data} editable={editable} edit={edit} />
        <ExperienceSection data={data} editable={editable} edit={edit} />
        <ProjectsSection data={data} editable={editable} edit={edit} />
        <EducationSection data={data} editable={editable} edit={edit} />
        <CertificatesSection data={data} editable={editable} edit={edit} />
        <LanguagesSection data={data} editable={editable} edit={edit} />
        <ReferencesSection data={data} editable={editable} edit={edit} />

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

export default MinimalSingleTemplate;
