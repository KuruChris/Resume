import { Link } from 'react-router-dom';
import { getThemeStyle } from '../config';

function TemplatePreview({ layout, themeId }) {
  const themeStyle = getThemeStyle(themeId);

  if (layout === 'sidebar') {
    return (
      <div className="template-card__preview-frame" style={themeStyle}>
        <div className="template-card__preview template-card__preview--sidebar">
          <div className="template-card__preview-sidebar">
            <span className="template-card__preview-photo" />
            <span className="template-card__preview-line template-card__preview-line--short" />
            <span className="template-card__preview-line" />
            <span className="template-card__preview-line template-card__preview-line--muted" />
          </div>
          <div className="template-card__preview-main">
            <span className="template-card__preview-heading" />
            <span className="template-card__preview-line" />
            <span className="template-card__preview-line" />
            <span className="template-card__preview-block" />
          </div>
        </div>
      </div>
    );
  }

  if (layout === 'stacked') {
    return (
      <div className="template-card__preview-frame" style={themeStyle}>
        <div className="template-card__preview template-card__preview--stacked">
          <span className="template-card__preview-photo template-card__preview-photo--centered" />
          <span className="template-card__preview-line template-card__preview-line--short template-card__preview-line--centered" />
          <span className="template-card__preview-line template-card__preview-line--muted template-card__preview-line--centered" />
          <span className="template-card__preview-heading template-card__preview-heading--centered" />
          <span className="template-card__preview-block" />
          <span className="template-card__preview-block" />
        </div>
      </div>
    );
  }

  if (layout === 'split') {
    return (
      <div className="template-card__preview-frame" style={themeStyle}>
        <div className="template-card__preview template-card__preview--split">
          <span className="template-card__preview-split-header" />
          <div className="template-card__preview-split-body">
            <div className="template-card__preview-split-sidebar">
              <span className="template-card__preview-line template-card__preview-line--short" />
              <span className="template-card__preview-line template-card__preview-line--muted" />
              <span className="template-card__preview-line template-card__preview-line--muted" />
            </div>
            <div className="template-card__preview-split-main">
              <span className="template-card__preview-heading" />
              <span className="template-card__preview-block" />
              <span className="template-card__preview-block" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="template-card__preview-frame" style={themeStyle}>
      <div className="template-card__preview template-card__preview--stacked">
        <span className="template-card__preview-line template-card__preview-line--short" />
        <span className="template-card__preview-block" />
        <span className="template-card__preview-block" />
      </div>
    </div>
  );
}

export default function TemplateCard({ template }) {
  return (
    <article className="template-card">
      <TemplatePreview layout={template.layout} themeId={template.defaultThemeId} />

      <div className="template-card__body">
        <h2 className="template-card__name">{template.name}</h2>
        <p className="template-card__description">{template.description}</p>
        <Link to={`/editor/${template.id}`} className="template-card__button">
          Use this template
        </Link>
      </div>
    </article>
  );
}
