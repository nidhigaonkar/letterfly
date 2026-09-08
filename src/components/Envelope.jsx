import { useState } from 'react';
import LetterPaper from './LetterPaper';
import './Envelope.css';

export default function Envelope({ letter }) {
  const [stage, setStage] = useState('closed'); // closed -> opening -> open

  function handleOpen() {
    if (stage !== 'closed') return;
    setStage('opening');
    setTimeout(() => setStage('open'), 1100);
  }

  if (stage === 'open') {
    return (
      <div className="envelope-reveal">
        <LetterPaper letter={letter} editable={false} />
      </div>
    );
  }

  return (
    <div className="envelope-scene">
      <button
        className={`envelope${stage === 'opening' ? ' opening' : ''}`}
        onClick={handleOpen}
        aria-label="Open your letter"
      >
        <div className="envelope-back" />
        <div className="envelope-flap" />
        <div className="envelope-seal">💌</div>
      </button>
      <p className="envelope-hint">{stage === 'opening' ? 'Opening...' : 'Tap the envelope to open your letter'}</p>
    </div>
  );
}
