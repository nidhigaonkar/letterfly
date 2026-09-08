import { useRef } from 'react';
import Sticker from './Sticker';
import './DraggableSticker.css';

export default function DraggableSticker({ sticker, def, containerRef, selected, onSelect, onChange, onDelete }) {
  const dragState = useRef(null);

  function handlePointerDown(e) {
    e.stopPropagation();
    onSelect(sticker.id);
    const container = containerRef.current;
    if (!container) return;
    dragState.current = { pointerId: e.pointerId };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e) {
    if (!dragState.current || dragState.current.pointerId !== e.pointerId) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onChange(sticker.id, {
      x: Math.min(96, Math.max(4, x)),
      y: Math.min(96, Math.max(4, y)),
    });
  }

  function handlePointerUp(e) {
    dragState.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
  }

  const width = def.wide ? def.defaultSize * 1.7 : def.defaultSize;
  const height = def.wide ? def.defaultSize * 0.5 : def.defaultSize;

  return (
    <div
      className={`draggable-sticker${selected ? ' selected' : ''}`}
      style={{
        left: `${sticker.x}%`,
        top: `${sticker.y}%`,
        width,
        height,
        transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <Sticker type={sticker.type} color={sticker.color} />
      {selected && (
        <div className="sticker-toolbar" onPointerDown={(e) => e.stopPropagation()}>
          <button title="Rotate left" onClick={() => onChange(sticker.id, { rotation: sticker.rotation - 15 })}>
            ↺
          </button>
          <button title="Smaller" onClick={() => onChange(sticker.id, { scale: Math.max(0.5, sticker.scale - 0.15) })}>
            −
          </button>
          <button title="Bigger" onClick={() => onChange(sticker.id, { scale: Math.min(2.2, sticker.scale + 0.15) })}>
            +
          </button>
          <button title="Rotate right" onClick={() => onChange(sticker.id, { rotation: sticker.rotation + 15 })}>
            ↻
          </button>
          <button title="Remove" className="danger" onClick={() => onDelete(sticker.id)}>
            ×
          </button>
        </div>
      )}
    </div>
  );
}
