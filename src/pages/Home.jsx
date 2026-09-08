import { useNavigate } from 'react-router-dom';
import { PaperStar, PaperHeart, SingleFlower, FlowerBouquet } from '../components/StickerArt';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-floaters" aria-hidden="true">
        <span className="floater f1"><PaperStar color="#f6d76b" /></span>
        <span className="floater f2"><SingleFlower color="#f7c8dd" /></span>
        <span className="floater f3"><PaperHeart color="#f2a9b8" /></span>
        <span className="floater f4"><FlowerBouquet /></span>
        <span className="floater f5"><PaperStar color="#a7c7e7" /></span>
      </div>
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
