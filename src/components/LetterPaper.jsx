import { useRef, useState } from 'react';
import DraggableSticker from './DraggableSticker';
import Sticker from './Sticker';
import { STICKER_TYPES, PAPER_COLORS } from '../data/stickers';
import { getFontFamily } from '../data/fonts';
import './LetterPaper.css';

export default function LetterPaper({
  letter,
  editable = false,
  selectedStickerId,
  onSelectSticker,
  onChangeSticker,
  onDeleteSticker,
  onChangeField,
  cardRef: externalRef,
  drawMode = false,
  onAddStroke,
}) {
  const internalRef = useRef(null);
  const cardRef = externalRef || internalRef;
  const paper = PAPER_COLORS.find((p) => p.id === letter.paper) || PAPER_COLORS[0];
  const fontFamily = getFontFamily(letter.font);
  const [currentPoints, setCurrentPoints] = useState([]);

  function pointFromEvent(e) {
    const rect = cardRef.current.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  }

  function handleDrawPointerDown(e) {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setCurrentPoints([pointFromEvent(e)]);
  }

  function handleDrawPointerMove(e) {
    if (currentPoints.length === 0) return;
    setCurrentPoints((prev) => [...prev, pointFromEvent(e)]);
  }

  function handleDrawPointerUp(e) {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
    if (currentPoints.length > 1) onAddStroke(currentPoints, paper.ink);
    setCurrentPoints([]);
  }

  return (
    <div
      ref={cardRef}
      className="letter-paper"
      style={{ '--paper-bg': paper.bg, '--paper-ink': paper.ink, '--font-hand': fontFamily }}
      onPointerDown={() => editable && onSelectSticker(null)}
    >
      <div className="letter-paper-texture" />
      <div className="letter-paper-content">
        {editable ? (
          <input
            className="letter-greeting-input"
            value={letter.greeting}
            onChange={(e) => onChangeField('greeting', e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
          />
        ) : (
          <p className="letter-greeting">{letter.greeting}</p>
        )}
        {editable ? (
          <textarea
            className="letter-message-input"
            placeholder="Write your message here..."
            value={letter.message}
            onChange={(e) => onChangeField('message', e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
          />
        ) : (
          <p className="letter-message">{letter.message}</p>
        )}
      </div>
      <div className="letter-paper-stickers">
        {letter.stickers.map((sticker) => {
          const def = STICKER_TYPES.find((s) => s.type === sticker.type);
          if (!def) return null;
          return editable ? (
            <DraggableSticker
              key={sticker.id}
              sticker={sticker}
              def={def}
              containerRef={cardRef}
              selected={selectedStickerId === sticker.id}
              onSelect={onSelectSticker}
              onChange={onChangeSticker}
              onDelete={onDeleteSticker}
            />
          ) : (
            <div
              key={sticker.id}
              className="static-sticker"
              style={{
                left: `${sticker.x}%`,
                top: `${sticker.y}%`,
                width: def.wide ? def.defaultSize * 1.7 : def.defaultSize,
                height: def.wide ? def.defaultSize * 0.5 : def.defaultSize,
                transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
              }}
            >
              <Sticker type={sticker.type} color={sticker.color} />
            </div>
          );
        })}
      </div>
      <svg
        className={`letter-paper-drawing${editable && drawMode ? ' active' : ''}`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        onPointerDown={editable && drawMode ? handleDrawPointerDown : undefined}
        onPointerMove={editable && drawMode ? handleDrawPointerMove : undefined}
        onPointerUp={editable && drawMode ? handleDrawPointerUp : undefined}
      >
        {(letter.drawing || []).map((stroke) => (
          <polyline
            key={stroke.id}
            points={stroke.points.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke={stroke.color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {currentPoints.length > 1 && (
          <polyline
            points={currentPoints.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke={paper.ink}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
    </div>
  );
}
