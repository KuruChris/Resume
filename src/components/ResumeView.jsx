import { forwardRef } from 'react';
import { DEFAULT_TEMPLATE_ID, DEFAULT_THEME_ID } from '../config';
import { createContentEditor, noopContentEditor } from './resume/shared/contentEditor';
import { getTemplateComponent } from '../templates/registry';

const ResumeView = forwardRef(function ResumeView(
  {
    data,
    profilePhoto,
    showFooter = true,
    children,
    themeId = DEFAULT_THEME_ID,
    templateId = DEFAULT_TEMPLATE_ID,
    onDataChange,
  },
  ref,
) {
  const editable = Boolean(onDataChange);
  const edit = editable ? createContentEditor(data, onDataChange) : noopContentEditor;
  const TemplateComponent = getTemplateComponent(templateId);

  return (
    <TemplateComponent
      ref={ref}
      data={data}
      profilePhoto={profilePhoto}
      themeId={themeId}
      templateId={templateId}
      editable={editable}
      edit={edit}
      showFooter={showFooter}
    >
      {children}
    </TemplateComponent>
  );
});

export default ResumeView;
