import React, { useState } from 'react';
import { FaSearch, FaArrowLeft, FaArrowRight, FaRedo } from 'react-icons/fa';
import '../../styles/FunZoneModal.css'; 
const Browser = ({ onBack }) => {
  const [url, setUrl] = useState('https://www.google.com');
  const [displayUrl, setDisplayUrl] = useState('https://www.google.com');
  const [history, setHistory] = useState(['https://www.google.com']);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNavigate = (e) => {
    e.preventDefault();
    let newUrl = displayUrl;
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      newUrl = 'https://' + newUrl;
    }
    setUrl(newUrl);
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newUrl);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUrl(history[currentIndex - 1]);
      setDisplayUrl(history[currentIndex - 1]);
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUrl(history[currentIndex + 1]);
      setDisplayUrl(history[currentIndex + 1]);
    }
  };

  return (
    <div className="browser-container" style={{ color: 'white', padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="browser-toolbar" style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center' }}>
        <button onClick={goBack} disabled={currentIndex === 0} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: currentIndex === 0 ? 0.5 : 1 }}>
          <FaArrowLeft />
        </button>
        <button onClick={goForward} disabled={currentIndex === history.length - 1} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: currentIndex === history.length - 1 ? 0.5 : 1 }}>
          <FaArrowRight />
        </button>
        <button onClick={() => setUrl(url)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
          <FaRedo />
        </button>
        <form onSubmit={handleNavigate} style={{ flex: 1, display: 'flex' }}>
          <input
            type="text"
            value={displayUrl}
            onChange={(e) => setDisplayUrl(e.target.value)}
            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
          />
          <button type="submit" style={{ marginLeft: '10px', padding: '8px 15px', borderRadius: '4px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
            <FaSearch />
          </button>
        </form>
      </div>
      
      <div className="browser-content" style={{ flex: 1, background: 'white', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#333', textAlign: 'center' }}>
          <h2>Browser Demo</h2>
          <p>Navigating to: {url}</p>
          <p style={{ fontSize: '0.8em', color: '#666' }}>(This is a simulated browser interface)</p>
        </div>
      </div>
    </div>
  );
};

export default Browser;
