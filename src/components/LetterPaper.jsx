import { useRef } from 'react';
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
}) {
  const internalRef = useRef(null);
  const cardRef = externalRef || internalRef;
  const paper = PAPER_COLORS.find((p) => p.id === letter.paper) || PAPER_COLORS[0];
  const fontFamily = getFontFamily(letter.font);

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
    </div>
  );
}
