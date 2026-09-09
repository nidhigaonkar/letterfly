import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { decodeLetter } from '../utils/encode';
import './Sent.css';

export default function Sent() {
  const { encoded } = useParams();
  const letter = decodeLetter(encoded);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}${window.location.pathname}#/letter/${encoded}`;

  function copyLink() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!letter) {
    return (
      <div className="sent-page">
        <p>Hmm, this letter seems to have gotten lost. <Link to="/create">Write a new one?</Link></p>
      </div>
    );
  }

  return (
    <div className="sent-page">
      <div className="sent-seal">💌</div>
      <h1>Your letter is ready to share!</h1>

      <div className="share-link-box">
        <input className="share-link-input" readOnly value={shareUrl} onFocus={(e) => e.target.select()} />
        <button className="copy-button" onClick={copyLink}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <div className="sent-links">
        <Link to={`/letter/${encoded}`}>Preview as recipient</Link>
        <Link to="/create">Write another letter</Link>
      </div>
    </div>
  );
}
