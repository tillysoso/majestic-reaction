import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ReadingEngine from '@/components/ReadingEngine';
import SystemDemo from '@/components/SystemDemo';
import FirstReading from '@/components/FirstReading';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="main-nav">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🔮 Majestic
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Reading Engine</Link>
              <Link to="/demo" className="nav-link">System Demo</Link>
              <Link to="/onboarding" className="nav-link">Onboarding</Link>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<ReadingEngine />} />
            <Route path="/demo" element={<SystemDemo />} />
            <Route path="/onboarding" element={<div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>Choose Your Guide</h1>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                <Link to="/first-reading/olivia" style={{ padding: '1rem 2rem', background: '#6b8e23', color: 'white', borderRadius: '0.5rem', textDecoration: 'none' }}>Olivia</Link>
                <Link to="/first-reading/elijah" style={{ padding: '1rem 2rem', background: '#7c9299', color: 'white', borderRadius: '0.5rem', textDecoration: 'none' }}>Elijah</Link>
                <Link to="/first-reading/destiny" style={{ padding: '1rem 2rem', background: '#4A90E2', color: 'white', borderRadius: '0.5rem', textDecoration: 'none' }}>Destiny</Link>
                <Link to="/first-reading/casper" style={{ padding: '1rem 2rem', background: '#E53E3E', color: 'white', borderRadius: '0.5rem', textDecoration: 'none' }}>Casper</Link>
              </div>
            </div>} />
            <Route path="/first-reading/:avatarId" element={<FirstReading />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
