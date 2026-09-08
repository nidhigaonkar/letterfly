import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LetterPaper from '../components/LetterPaper';
import StickerPalette from '../components/StickerPalette';
import { PAPER_COLORS, makeSticker } from '../data/stickers';
import { FONT_OPTIONS, DEFAULT_FONT } from '../data/fonts';
import { encodeLetter } from '../utils/encode';
import './Editor.css';

const initialLetter = {
  greeting: 'Dear ___,',
  message: '',
  paper: 'blush',
  font: DEFAULT_FONT,
  stickers: [],
};

export default function Editor() {
  const [letter, setLetter] = useState(initialLetter);
  const [selectedStickerId, setSelectedStickerId] = useState(null);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  function updateField(field, value) {
    setLetter((prev) => ({ ...prev, [field]: value }));
  }

  function addSticker(type) {
    const sticker = makeSticker(type);
    setLetter((prev) => ({ ...prev, stickers: [...prev.stickers, sticker] }));
    setSelectedStickerId(sticker.id);
  }

  function changeSticker(id, updates) {
    setLetter((prev) => ({
      ...prev,
      stickers: prev.stickers.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  }

  function deleteSticker(id) {
    setLetter((prev) => ({ ...prev, stickers: prev.stickers.filter((s) => s.id !== id) }));
    setSelectedStickerId(null);
  }

  function handleSeal() {
    const encoded = encodeLetter(letter);
    navigate(`/sent/${encoded}`);
  }

  const canSeal = letter.message.trim().length > 0;

  return (
    <div className="editor">
      <aside className="editor-panel">
        <div className="panel-group">
          <p className="panel-label">Paper color</p>
          <div className="paper-swatches">
            {PAPER_COLORS.map((p) => (
              <button
                key={p.id}
                className={`paper-swatch${letter.paper === p.id ? ' active' : ''}`}
                style={{ background: p.bg, borderColor: p.ink }}
                onClick={() => updateField('paper', p.id)}
                title={p.label}
              />
            ))}
          </div>
        </div>

        <div className="panel-group">
          <p className="panel-label">Handwriting style</p>
          <div className="font-options">
            {FONT_OPTIONS.map((f) => (
              <button
                key={f.id}
                className={`font-option${letter.font === f.id ? ' active' : ''}`}
                style={{ fontFamily: f.family }}
                onClick={() => updateField('font', f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <StickerPalette onAdd={addSticker} />

        <button className="seal-button" disabled={!canSeal} onClick={handleSeal}>
          Seal &amp; Share
        </button>
      </aside>

      <main className="editor-card-area">
        <LetterPaper
          letter={letter}
          editable
          cardRef={cardRef}
          selectedStickerId={selectedStickerId}
          onSelectSticker={setSelectedStickerId}
          onChangeSticker={changeSticker}
          onDeleteSticker={deleteSticker}
          onChangeField={updateField}
        />
      </main>
    </div>
  );
}
