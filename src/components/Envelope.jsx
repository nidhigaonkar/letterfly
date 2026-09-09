import { useState } from 'react';
import LetterPaper from './LetterPaper';
import { getFontFamily } from '../data/fonts';
import './Envelope.css';

function getAddressee(greeting) {
  if (!greeting) return '';
  const match = greeting.match(/^\s*dear\s+(.*?)[,.\s]*$/i);
  return (match ? match[1] : greeting).trim();
}

export default function Envelope({ letter }) {
  const [stage, setStage] = useState('closed'); // closed -> opening -> peeking -> open
  const addressee = getAddressee(letter.greeting);

  function handleOpen() {
    if (stage !== 'closed') return;
    setStage('opening');
    setTimeout(() => setStage('peeking'), 700);
    setTimeout(() => setStage('open'), 1350);
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
      <div className={`envelope-stack stage-${stage}`}>
        <div className="envelope-letter-slot">
          <LetterPaper letter={letter} editable={false} />
        </div>
        <button
          className={`envelope${stage !== 'closed' ? ' opening' : ''}`}
          onClick={handleOpen}
          aria-label="Open your letter"
        >
          <div className="envelope-back" />
          <div className="envelope-flap" />
          <div className="envelope-seal" />
          {addressee && (
            <p className="envelope-to" style={{ fontFamily: getFontFamily(letter.font) }}>
              To: {addressee}
            </p>
          )}
        </button>
        {stage !== 'closed' && <div className="envelope-pocket" aria-hidden="true" />}
      </div>
      {stage === 'closed' && <p className="envelope-hint">Tap the envelope to open your letter</p>}
    </div>
  );
}
