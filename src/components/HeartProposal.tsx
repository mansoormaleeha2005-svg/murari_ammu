import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeartProposalProps {
  onAccept: () => void;
}

const FloatingHeart = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute text-2xl pointer-events-none"
    initial={{ y: 0, opacity: 1, x }}
    animate={{ y: -250, opacity: 0 }}
    transition={{ duration: 2, delay, ease: "easeOut" }}
  >
    ❤️
  </motion.div>
);

const SparkleTrail = ({ x, y, id }: { x: number; y: number; id: number }) => (
  <motion.div
    key={id}
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ scale: 0, opacity: 1 }}
    animate={{ 
      scale: [0, 1.5, 0],
      opacity: [1, 0.8, 0],
      y: [0, -20]
    }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    <div className="w-3 h-3 bg-pink-400 rounded-full" 
         style={{ 
           boxShadow: '0 0 10px rgba(255,182,193,0.8), 0 0 20px rgba(255,105,180,0.6)' 
         }} />
  </motion.div>
);

const HeartPhoto = ({
  src,
  size = 160,
  className,
}: {
  src: string;
  size?: number;
  className?: string;
}) => (
  <div
    className={className}
    style={{
      width: size,
      height: size,
      filter: "drop-shadow(0 0 18px rgba(255,105,180,0.45))",
    }}
  >
    <svg width={size} height={size} viewBox="0 0 100 100" className="block">
      <defs>
        <clipPath id={`heart-clip-${src.replace(/[^a-zA-Z0-9]/g, "-")}`} clipPathUnits="objectBoundingBox">
          <path d="M0.5,0.92 C0.36,0.82 0.12,0.62 0.12,0.4 C0.12,0.25 0.23,0.14 0.38,0.14 C0.46,0.14 0.54,0.18 0.6,0.24 C0.66,0.18 0.74,0.14 0.82,0.14 C0.97,0.14 1,0.25 1,0.4 C1,0.62 0.64,0.82 0.5,0.92 Z" />
        </clipPath>
        <linearGradient id={`heart-stroke-${src.replace(/[^a-zA-Z0-9]/g, "-")}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,105,180,0.9)" />
          <stop offset="50%" stopColor="rgba(255,182,193,0.9)" />
          <stop offset="100%" stopColor="rgba(255,20,147,0.9)" />
        </linearGradient>
      </defs>

      <image
        href={src}
        width="100"
        height="100"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#heart-clip-${src.replace(/[^a-zA-Z0-9]/g, "-")})`}
      />

      <path
        d="M50 92 C36 82 12 62 12 40 C12 25 23 14 38 14 C46 14 54 18 60 24 C66 18 74 14 82 14 C97 14 100 25 100 40 C100 62 64 82 50 92 Z"
        fill="none"
        stroke={`url(#heart-stroke-${src.replace(/[^a-zA-Z0-9]/g, "-")})`}
        strokeWidth="3"
      />
    </svg>
  </div>
);

const CinematicTransition = () => {
  const particles = Array.from({ length: 50 });
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Pastel pink and rose-gold gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,182,193,0.9) 0%, rgba(255,218,185,0.7) 25%, rgba(255,192,203,0.5) 50%, rgba(219,112,147,0.3) 75%, transparent 100%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1]
        }}
      />
      
      {/* Light bloom effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 50%)',
        }}
        animate={{
          scale: [0.8, 1.5, 0.8],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1]
        }}
      />
      
      {/* Glowing pink light particles forming circular wave */}
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const radius = 150 + Math.sin(i * 0.5) * 50;
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(255,105,180,1) 0%, rgba(255,182,193,0.8) 50%, transparent 70%)`,
              boxShadow: '0 0 10px rgba(255,105,180,0.8), 0 0 20px rgba(255,182,193,0.5)',
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [0, Math.cos(angle) * radius, Math.cos(angle + Math.PI) * radius, 0],
              y: [0, Math.sin(angle) * radius, Math.sin(angle + Math.PI) * radius, 0],
              scale: [0, 1, 1, 0],
              opacity: [0, 1, 0.8, 0],
            }}
            transition={{
              duration: 6,
              delay: i * 0.12,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1]
            }}
          />
        );
      })}
      
      {/* Floating sparkles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            boxShadow: '0 0 6px rgba(255,255,255,0.9), 0 0 12px rgba(255,182,193,0.6)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1]
          }}
        />
      ))}
      
      {/* Soft circular wave effect */}
      <motion.div
        className="absolute border-4 border-pink-300 rounded-full"
        style={{
          borderColor: 'rgba(255,182,193,0.6)',
          boxShadow: '0 0 30px rgba(255,182,193,0.8), inset 0 0 30px rgba(255,105,180,0.4)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          width: [0, 400, 600, 800],
          height: [0, 400, 600, 800],
          opacity: [1, 0.7, 0.4, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1]
        }}
      />
    </motion.div>
  );
};

const HeartProposal = ({ onAccept }: HeartProposalProps) => {
  const [answered, setAnswered] = useState(false);
  const [noMoveCount, setNoMoveCount] = useState(0);
  const [noClickStep, setNoClickStep] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [noText, setNoText] = useState("NO 🙈");
  const [showVideo, setShowVideo] = useState(false);
  const [showCinematicTransition, setShowCinematicTransition] = useState(false);
  const [sparkleTrails, setSparkleTrails] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [isAvoiding, setIsAvoiding] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleYes = useCallback(() => {
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.currentTime = 0;
      void audioEl.play();
    }

    setAnswered(true);
    setShowVideo(true);
  }, []);

  const handleDirectAccept = useCallback(() => {
    setAnswered(true);
    setShowHearts(true);
    setTimeout(() => onAccept(), 3000);
  }, [onAccept]);

  const handleVideoEnd = useCallback(() => {
    setTimeout(() => {
      setShowVideo(false);
      setTimeout(() => {
        setShowCinematicTransition(true);
        setTimeout(() => {
          setShowCinematicTransition(false);
          setShowHearts(true);
          setTimeout(() => onAccept(), 3000);
        }, 5000);
      }, 800);
    }, 500);
  }, [onAccept]);

  const createSparkleTrail = () => {
    const newSparkle = {
      id: Date.now() + Math.random(),
      x: 50 + (Math.random() - 0.5) * 30,
      y: 50 + (Math.random() - 0.5) * 30
    };
    setSparkleTrails(prev => [...prev, newSparkle]);
    
    setTimeout(() => {
      setSparkleTrails(prev => prev.filter(s => s.id !== newSparkle.id));
    }, 1000);
  };

  const handleCursorApproach = () => {
    if (!isAvoiding) {
      setIsAvoiding(true);
      createSparkleTrail();
      
      // Trigger movement almost instantly
      setTimeout(() => {
        setNoMoveCount((prev) => prev + 1);
        setIsAvoiding(false);
      }, 50);
    }
  };

  const handleNo = () => {
    const nextStep = noClickStep + 1;
    setNoClickStep(nextStep);
    setNoMoveCount((prev) => prev + 1);
    createSparkleTrail();

    if (nextStep === 1) {
      setNoText("Are you sure? 🥺");
      return;
    }

    setNoText("YES 💖");
    setTimeout(handleDirectAccept, 500);
  };

  const noButtonOffset = noMoveCount > 0
    ? { 
        x: (Math.random() - 0.5) * 300, 
        y: (Math.random() - 0.5) * 200,
        rotate: Math.random() * 30 - 15,
        scale: 0.9 + Math.random() * 0.2
      }
    : { x: 0, y: 0, rotate: 0, scale: 1 };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-deep-romantic overflow-hidden">
      <audio ref={audioRef} preload="auto">
        <source src="/murari audio.mpeg" type="audio/mpeg" />
      </audio>
      {/* Sparkle trails */}
      {sparkleTrails.map(sparkle => (
        <SparkleTrail key={sparkle.id} x={sparkle.x} y={sparkle.y} id={sparkle.id} />
      ))}
      
      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center z-20 px-4"
          >
            {/* Glowing Heart */}
            <motion.div
              className="animate-heart-beat mx-auto mb-8 relative"
              style={{ width: 200, height: 180 }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: "radial-gradient(circle, hsl(348 83% 47% / 0.3) 0%, transparent 70%)",
                  borderRadius: "50%",
                }}
              >
                <span className="text-8xl select-none" style={{ filter: "drop-shadow(0 0 20px hsl(348 83% 47% / 0.8))" }}>
                  💖
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-cursive text-5xl md:text-7xl text-glow text-primary-foreground mb-6"
            >
              Will You Be My Valentine, Ammu?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="font-elegant text-xl md:text-2xl text-muted-foreground italic mb-12"
            >
              With Love,<br />
              Murari ❤️
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-elegant text-xl font-semibold box-glow hover:brightness-125 transition-all duration-300"
              >
                YES 💖
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                animate={noButtonOffset}
                transition={{ 
                  type: "spring", 
                  stiffness: 600, 
                  damping: 15,
                  duration: 0.2
                }}
                onHoverStart={handleCursorApproach}
                onClick={handleNo}
                className="px-10 py-4 rounded-full border-2 border-pink-400 text-pink-300 font-elegant text-xl font-semibold transition-all duration-300"
                style={{
                  boxShadow: '0 0 20px rgba(255,105,180,0.6), 0 0 40px rgba(255,182,193,0.4), inset 0 0 20px rgba(255,105,180,0.2)',
                  background: 'linear-gradient(135deg, rgba(255,105,180,0.1) 0%, rgba(255,182,193,0.05) 100%)',
                  textShadow: '0 0 10px rgba(255,105,180,0.8)'
                }}
              >
                {noText}
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="accepted"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center z-20 px-4 relative"
          >
            {showVideo ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.95, 
                  transition: { duration: 1.5, ease: "easeInOut" }
                }}
                className="flex flex-col items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ 
                    scale: 0.9,
                    transition: { duration: 1.5, ease: "easeInOut" }
                  }}
                  className="relative"
                >
                  <video
                    autoPlay
                    muted
                    onEnded={handleVideoEnd}
                    className="max-w-2xl max-h-[70vh] rounded-lg shadow-2xl"
                    controls={false}
                  >
                    <source src="/ammu video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ 
                      opacity: 0,
                      transition: { duration: 1.5, ease: "easeInOut" }
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent rounded-lg pointer-events-none"
                  />
                </motion.div>
              </motion.div>
            ) : showCinematicTransition ? (
              <CinematicTransition />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                className="relative"
              >
                <div className="pointer-events-none absolute inset-0 -z-10">
                  <motion.div
                    className="absolute left-[4%] top-[12%]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: [0.25, 0.55, 0.25],
                      y: [0, -14, 0],
                      rotate: [-6, 6, -6],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <HeartPhoto src="/image.png" size={220} />
                  </motion.div>

                  <motion.div
                    className="absolute right-[4%] top-[12%]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: [0.22, 0.5, 0.22],
                      y: [0, -12, 0],
                      rotate: [7, -7, 7],
                      scale: [1, 1.03, 1],
                    }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <HeartPhoto src="/image1.png" size={220} />
                  </motion.div>

                  <motion.div
                    className="absolute left-1/2 bottom-[2%] -translate-x-1/2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: [0.2, 0.55, 0.2],
                      y: [0, -18, 0],
                      rotate: [4, -4, 4],
                      scale: [1, 1.04, 1],
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <HeartPhoto src="/image2.png" size={280} />
                  </motion.div>
                </div>

                {showHearts && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {Array.from({ length: 20 }).map((_, i) => (
                      <FloatingHeart
                        key={i}
                        delay={Math.random() * 1.5}
                        x={(Math.random() - 0.5) * 400}
                      />
                    ))}
                  </motion.div>
                )}

                <motion.p
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.8, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  className="font-elegant text-2xl md:text-3xl text-foreground mb-6 italic"
                >
                  You just made my world bloom like roses 🌹
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.5, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  className="font-cursive text-5xl md:text-7xl text-glow text-primary-foreground"
                >
                  Happy Valentine's Day, Ammu ❤️
                </motion.h2>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeartProposal;
