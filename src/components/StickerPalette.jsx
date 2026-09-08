import { STICKER_TYPES } from '../data/stickers';
import Sticker from './Sticker';
import './StickerPalette.css';

export default function StickerPalette({ onAdd }) {
  return (
    <div className="sticker-palette">
      <p className="panel-label">Decorate your letter</p>
      <div className="sticker-palette-grid">
        {STICKER_TYPES.map((def) => (
          <button
            key={def.type}
            className="sticker-palette-item"
            onClick={() => onAdd(def.type)}
            title={`Add ${def.label}`}
          >
            <span className="sticker-palette-preview">
              <Sticker type={def.type} color={def.colors[0]} />
            </span>
            <span className="sticker-palette-name">{def.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
