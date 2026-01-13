// components/cursor/CursorRipple.jsx
import { memo } from "react";

const CursorRipple = memo(({ x, y }) => {
  return (
    <div
      className="fixed rounded-full pointer-events-none z-[99998] hidden md:block animate-ripple-emoji"
      style={{
        left: `${x - 30}px`,
        top: `${y - 30}px`,
        width: "60px",
        height: "60px",
        border: "3px solid rgba(102, 126, 234, 0.6)",
        boxShadow: "0 0 20px rgba(102, 126, 234, 0.4)",
      }}
    />
  );
});

CursorRipple.displayName = "CursorRipple";

export default CursorRipple;
