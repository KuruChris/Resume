import { forwardRef } from 'react';
import AboutSection from '../../components/resume/sections/AboutSection';
import ExperienceSection from '../../components/resume/sections/ExperienceSection';
import ProjectsSection from '../../components/resume/sections/ProjectsSection';
import Sidebar from '../../components/resume/sections/Sidebar';
import { getThemeStyle } from '../../config';

const ClassicSidebarTemplate = forwardRef(function ClassicSidebarTemplate(
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
      className={`resume${editable ? ' resume--editable' : ''}`}
      ref={ref}
      data-theme={themeId}
      data-template={templateId}
      style={getThemeStyle(themeId)}
    >
      <Sidebar
        data={data}
        profilePhoto={profilePhoto}
        editable={editable}
        edit={edit}
      />

      <main className="content">
        <AboutSection data={data} editable={editable} edit={edit} />
        <ProjectsSection data={data} editable={editable} edit={edit} />
        <ExperienceSection data={data} editable={editable} edit={edit} />

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

export default ClassicSidebarTemplate;
