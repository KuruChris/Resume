import { Navigate, Route, Routes } from 'react-router-dom';
import { DEFAULT_TEMPLATE_ID } from './config';
import ResumePage from './pages/ResumePage';
import EditorPage from './pages/EditorPage';
import TemplateGalleryPage from './pages/TemplateGalleryPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ResumePage />} />
      <Route path="/templates" element={<TemplateGalleryPage />} />
      <Route path="/editor" element={<Navigate to={`/editor/${DEFAULT_TEMPLATE_ID}`} replace />} />
      <Route path="/editor/:templateId" element={<EditorPage />} />
    </Routes>
  );
}
