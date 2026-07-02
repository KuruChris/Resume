import { forwardRef } from 'react';
import { getThemeStyle } from '../../config';
import ProfessionalHeader from './ProfessionalHeader';
import SplitAboutSection from './SplitAboutSection';
import SplitCertificatesSection from './SplitCertificatesSection';
import SplitContactList from './SplitContactList';
import SplitEducationSection from './SplitEducationSection';
import SplitExperienceSection from './SplitExperienceSection';
import SplitLanguagesSection from './SplitLanguagesSection';
import SplitProjectsSection from './SplitProjectsSection';
import SplitReferencesSection from './SplitReferencesSection';
import SplitSkillsSection from './SplitSkillsSection';
import './professional-split.css';

const ProfessionalSplitTemplate = forwardRef(function ProfessionalSplitTemplate(
  {
    data,
    profilePhoto: _profilePhoto,
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
      className={`resume resume--professional-split${editable ? ' resume--editable' : ''}`}
      ref={ref}
      data-theme={themeId}
      data-template={templateId}
      style={getThemeStyle(themeId)}
    >
      <ProfessionalHeader data={data} editable={editable} edit={edit} />

      <div className="professional-split__body">
        <aside className="professional-split__sidebar">
          <SplitContactList contact={data.contact} editable={editable} edit={edit} />
          <SplitEducationSection data={data} editable={editable} edit={edit} />
          <SplitSkillsSection data={data} editable={editable} edit={edit} />
          <SplitLanguagesSection data={data} editable={editable} edit={edit} />
          <SplitCertificatesSection data={data} editable={editable} edit={edit} />
          <SplitReferencesSection data={data} editable={editable} edit={edit} />
        </aside>

        <main className="professional-split__main">
          <SplitAboutSection data={data} editable={editable} edit={edit} />
          <SplitExperienceSection data={data} editable={editable} edit={edit} />
          <SplitProjectsSection data={data} editable={editable} edit={edit} />

          {children}

          {showFooter && (
            <footer className="footer">
              <p>© {new Date().getFullYear()} {data.name}</p>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
});

export default ProfessionalSplitTemplate;
