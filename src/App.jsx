import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Sent from './pages/Sent';
import ViewLetter from './pages/ViewLetter';

export default function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <header className="app-header">
          <Link to="/" className="app-logo">letterfly</Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Editor />} />
          <Route path="/sent/:encoded" element={<Sent />} />
          <Route path="/letter/:encoded" element={<ViewLetter />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
