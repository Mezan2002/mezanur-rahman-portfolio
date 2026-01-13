import { useCallback, useEffect, useRef, useState } from "react";

export function useCursorSound() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioContextRef = useRef(null);

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();

      // Load preference
      const savedPreference = localStorage.getItem("cursorSoundEnabled");
      if (savedPreference !== null) {
        if (savedPreference !== null) {
          const initial = savedPreference === "true";
          Promise.resolve().then(() => setSoundEnabled(initial));
        }
      }
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Listen for toggle events
  useEffect(() => {
    const handleToggleSound = (e) => {
      setSoundEnabled(e.detail.enabled);
      localStorage.setItem("cursorSoundEnabled", e.detail.enabled);
    };

    window.addEventListener("toggleCursorSound", handleToggleSound);
    return () => {
      window.removeEventListener("toggleCursorSound", handleToggleSound);
    };
  }, []);

  // Play sound function
  const playSound = useCallback(
    (type) => {
      if (!soundEnabled || !audioContextRef.current) return;

      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      switch (type) {
        case "click":
          oscillator.frequency.value = 800;
          oscillator.type = "sine";
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            ctx.currentTime + 0.1
          );
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.1);
          break;

        case "hover":
          oscillator.frequency.value = 600;
          oscillator.type = "sine";
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            ctx.currentTime + 0.05
          );
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.05);
          break;

        case "celebrate":
          oscillator.frequency.setValueAtTime(400, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            800,
            ctx.currentTime + 0.1
          );
          oscillator.type = "triangle";
          gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            ctx.currentTime + 0.15
          );
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.15);
          break;

        case "doubleclick":
          // First beep
          const osc1 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          osc1.connect(gain1);
          gain1.connect(ctx.destination);
          osc1.frequency.value = 1000;
          osc1.type = "sine";
          gain1.gain.setValueAtTime(0.2, ctx.currentTime);
          gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
          osc1.start(ctx.currentTime);
          osc1.stop(ctx.currentTime + 0.05);

          // Second beep
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.frequency.value = 1200;
          osc2.type = "sine";
          gain2.gain.setValueAtTime(0.2, ctx.currentTime + 0.08);
          gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.13);
          osc2.start(ctx.currentTime + 0.08);
          osc2.stop(ctx.currentTime + 0.13);
          break;
      }
    },
    [soundEnabled]
  );

  return { playSound, soundEnabled };
}
