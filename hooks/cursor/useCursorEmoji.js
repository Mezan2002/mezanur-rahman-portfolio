// hooks/useCursorEmoji.js
import { DEFAULT_EMOJI, EMOJI_MAP } from "@/config/cursorConfig";
import { useCallback } from "react";

export function useCursorEmoji() {
  const getEmojiForElement = useCallback((element) => {
    if (!element) return DEFAULT_EMOJI;

    // Check data attribute first
    const cursorData = element.getAttribute("data-cursor");
    if (cursorData) {
      const dataKey = `[data-cursor="${cursorData}"]`;
      if (EMOJI_MAP[dataKey]) return EMOJI_MAP[dataKey];
    }

    // Check classes
    const classList = element.classList;
    for (const className of classList) {
      const classKey = `.${className}`;
      if (EMOJI_MAP[classKey]) return EMOJI_MAP[classKey];
    }

    // Check tag name
    const tagName = element.tagName.toLowerCase();
    return EMOJI_MAP[tagName] || DEFAULT_EMOJI;
  }, []);

  return { getEmojiForElement };
}
