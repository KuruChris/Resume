import { Link } from 'react-router-dom';
import { DEFAULT_TEMPLATE_ID } from '../config';

const features = [
  'No account required',
  'Live preview as you edit',
  'Download as PDF instantly',
];

export default function TemplateCta({ variant = 'default' }) {
  if (variant === 'compact') {
    return (
      <aside className="template-cta--compact" aria-label="Resume template">
        <div className="template-cta--compact__inner">
          <p className="template-cta--compact__text">
            Like this layout?
          </p>
          <div className="template-cta--compact__actions">
            <Link to="/templates" className="template-cta__link">
              All templates
            </Link>
            <Link to={`/editor/${DEFAULT_TEMPLATE_ID}`} className="template-cta__button">
              Use this template
            </Link>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="template-cta" aria-label="Resume template">
      <div className="template-cta__glow" aria-hidden="true" />
      <div className="template-cta__inner">
        <div className="template-cta__copy">
          <p className="template-cta__eyebrow">Free template</p>
          <h2 className="template-cta__title">Like this layout? Build your own resume.</h2>
          <p className="template-cta__text">
            Start from this design, swap in your photo and details, then download a PDF.
            Nothing is stored — your edits stay in the browser until you save.
          </p>
          <ul className="template-cta__features">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="template-cta__action">
          <Link to={`/editor/${DEFAULT_TEMPLATE_ID}`} className="template-cta__button">
            Use this template
          </Link>
          <Link to="/templates" className="template-cta__secondary-link">
            Browse all templates
          </Link>
          <p className="template-cta__note">Takes less than a minute to get started</p>
        </div>
      </div>
    </aside>
  );
}
