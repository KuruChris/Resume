import { Link } from 'react-router-dom';
import { listTemplates } from '../config';
import TemplateCard from '../components/TemplateCard';
import '../Editor.css';

export default function TemplateGalleryPage() {
  const templates = listTemplates();

  return (
    <div className="template-gallery">
      <header className="template-gallery__header">
        <div className="template-gallery__header-inner">
          <Link to="/" className="template-gallery__back">← Back to demo</Link>
          <div>
            <p className="template-gallery__eyebrow">Resume templates</p>
            <h1 className="template-gallery__title">Choose a layout</h1>
            <p className="template-gallery__subtitle">
              Pick a starting design, customize your content, then download a PDF.
            </p>
          </div>
        </div>
      </header>

      <main className="template-gallery__main">
        <div className="template-gallery__grid">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </main>
    </div>
  );
}
