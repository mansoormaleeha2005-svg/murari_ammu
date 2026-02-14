import { useEffect, useState } from "react";

const PETAL_COUNT = 20;

const Petal = ({ delay, left, duration }: { delay: number; left: number; duration: number }) => (
  <div
    className="fixed pointer-events-none z-10 animate-petal-fall"
    style={{
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      top: '-5vh',
    }}
  >
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      className="animate-glow-pulse"
      style={{ animationDelay: `${delay * 0.5}s` }}
    >
      <ellipse
        cx="10"
        cy="12"
        rx="8"
        ry="12"
        fill="hsl(348 75% 45%)"
        opacity="0.7"
        transform={`rotate(${Math.random() * 40 - 20} 10 12)`}
      />
    </svg>
  </div>
);

const Sparkle = ({ delay, left, top }: { delay: number; left: number; top: number }) => (
  <div
    className="fixed pointer-events-none z-10 animate-sparkle"
    style={{
      left: `${left}%`,
      top: `${top}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }}
  >
    <div className="w-1 h-1 rounded-full bg-accent" />
  </div>
);

const FloatingPetals = () => {
  const [petals] = useState(() =>
    Array.from({ length: PETAL_COUNT }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 8,
    }))
  );

  const [sparkles] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      left: Math.random() * 100,
      top: Math.random() * 100,
    }))
  );

  return (
    <>
      {petals.map((p) => (
        <Petal key={p.id} delay={p.delay} left={p.left} duration={p.duration} />
      ))}
      {sparkles.map((s) => (
        <Sparkle key={s.id} delay={s.delay} left={s.left} top={s.top} />
      ))}
    </>
  );
};

export default FloatingPetals;
