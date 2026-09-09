import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-content">
        <p className="home-kicker">letterfly</p>
        <h1 className="home-title">Send a little handmade joy</h1>
        <button className="home-cta" onClick={() => navigate('/create')}>
          Write a letter
        </button>
      </div>
    </div>
  );
}
