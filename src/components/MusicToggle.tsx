import { useEffect, useRef } from "react";

const MusicAutoPlay = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const audio = new Audio(
      "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3"
    );
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const tryPlay = () => {
      if (started.current) return;
      audio.play().then(() => { started.current = true; }).catch(() => {});
    };

    // Try immediately, then on first user interaction as fallback
    tryPlay();
    const events = ["click", "touchstart", "keydown", "scroll"];
    events.forEach((e) => document.addEventListener(e, tryPlay, { once: true }));

    return () => {
      audio.pause();
      audio.src = "";
      events.forEach((e) => document.removeEventListener(e, tryPlay));
    };
  }, []);

  return null;
};

export default MusicAutoPlay;
