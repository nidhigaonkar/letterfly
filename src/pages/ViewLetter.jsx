import { useParams, Link } from 'react-router-dom';
import { decodeLetter } from '../utils/encode';
import Envelope from '../components/Envelope';
import './ViewLetter.css';

export default function ViewLetter() {
  const { encoded } = useParams();
  const letter = decodeLetter(encoded);

  if (!letter) {
    return (
      <div className="view-letter-page not-found">
        <p className="not-found-emoji">📪</p>
        <h1>This letter may have been lost in the mail</h1>
        <p>The link might be broken or incomplete.</p>
        <Link to="/">Go home</Link>
      </div>
    );
  }

  return (
    <div className="view-letter-page">
      <Envelope letter={letter} />
    </div>
  );
}
