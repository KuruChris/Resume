import { Routes, Route } from 'react-router-dom';
import ResumePage from './pages/ResumePage';
import EditorPage from './pages/EditorPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ResumePage />} />
      <Route path="/editor" element={<EditorPage />} />
    </Routes>
  );
}
