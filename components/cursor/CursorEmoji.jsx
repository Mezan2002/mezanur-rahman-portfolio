// components/cursor/CursorEmoji.jsx
import { memo } from "react";

const CursorEmoji = memo(({ cursorRef, emoji, isClicking }) => {
  return (
    <div
      ref={cursorRef}
      className="fixed text-4xl pointer-events-none z-[99999] hidden md:block select-none"
      style={{
        left: "-20px",
        top: "-20px",
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
      }}
    >
      <span
        className={`inline-block ${isClicking ? "animate-bounce-quick" : ""}`}
      >
        {emoji}
      </span>
    </div>
  );
});

CursorEmoji.displayName = "CursorEmoji";

export default CursorEmoji;
