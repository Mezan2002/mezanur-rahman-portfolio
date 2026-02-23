// config/cursorConfig.js

export const EMOJI_MAP = {
  // Tags
  a: "hand",
  button: "hand",
  input: "hand",
  textarea: "hand",
  img: "hand",
  video: "hand",
  h1: "pointer",
  h2: "pointer",
  h3: "pointer",

  // Classes
  ".project-card": "hand",
  ".social-link": "hand",
  ".magnetic-btn": "hand",
  ".glass-card": "hand",
  ".hero": "pointer",
  ".cta": "hand",
  ".download": "hand",
  ".play": "hand",
  ".pause": "hand",
  ".like": "hand",
  ".share": "hand",
  ".menu": "hand",
  ".close": "hand",
  ".search": "hand",
  ".email": "hand",
  ".phone": "hand",
  ".location": "hand",
  ".github": "hand",
  ".linkedin": "hand",
  ".twitter": "hand",
  ".instagram": "hand",
  ".dribbble": "hand",

  // Data attributes
  '[data-cursor="rocket"]': "hand",
  '[data-cursor="fire"]': "hand",
  '[data-cursor="star"]': "hand",
  '[data-cursor="heart"]': "hand",
  '[data-cursor="sparkle"]': "hand",
  '[data-cursor="trophy"]': "hand",
  '[data-cursor="target"]': "hand",
  '[data-cursor="gift"]': "hand",
  '[data-cursor="bulb"]': "hand",
  '[data-cursor="lightning"]': "hand",
};

export const CELEBRATION_EMOJIS = [
  "🎉",
  "✨",
  "🎊",
  "💫",
  "⭐",
  "🌟",
  "💥",
  "🎆",
];

export const INTERACTIVE_SELECTORS =
  "a, button, input, textarea, img, video, h1, h2, h3, " +
  ".project-card, .social-link, .magnetic-btn, .glass-card, " +
  '[data-cursor], [role="button"]';

export const CURSOR_VARIANTS = {
  EMOJI: "emoji",
  PREMIUM: "premium",
  GLOW: "glow",
  CROSSHAIR: "crosshair",
};

export const DEFAULT_EMOJI = "pointer";
