// components/cursor/CursorEmoji.jsx
import Image from "next/image";
import { memo } from "react";

const CursorEmoji = memo(({ cursorRef, emoji, isClicking }) => {
  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-99999 hidden md:block select-none"
      style={{
        left: "-15px",
        top: "-15px",
        mixBlendMode: "difference",
      }}
    >
      <div className="relative transition-transform duration-150">
        <Image
          src={`/cursors/${emoji}.svg`}
          alt="cursor"
          width={60}
          height={60}
          className="object-contain"
        />
      </div>
    </div>
  );
});

CursorEmoji.displayName = "CursorEmoji";

export default CursorEmoji;
