import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoveMeter = () => {
  const [value, setValue] = useState(50);
  const [animating, setAnimating] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted && !animating) {
      const timer = setTimeout(() => {
        setAnimating(true);
        const interval = setInterval(() => {
          setValue((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setShowMessage(true);
              return 100;
            }
            return prev + 2;
          });
        }, 30);
        return () => clearInterval(interval);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted, animating]);

  return (
    <section className="min-h-screen bg-deep-romantic flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center max-w-lg w-full"
      >
        <h2 className="font-cursive text-4xl md:text-6xl text-glow text-primary-foreground mb-4">
          Love Meter
        </h2>
        <p className="font-elegant text-xl text-muted-foreground italic mb-12">
          On a scale of 1 to 100, how much do you love me?
        </p>

        <div className="relative mb-8">
          <input
            type="range"
            min="1"
            max="100"
            value={value}
            onChange={(e) => {
              if (!animating) {
                setValue(Number(e.target.value));
                if (!hasInteracted) setHasInteracted(true);
              }
            }}
            className="w-full h-3 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(348 83% 47%) 0%, hsl(348 83% 47%) ${value}%, hsl(0 15% 12%) ${value}%, hsl(0 15% 12%) 100%)`,
            }}
          />
          <motion.div
            className="mt-4 font-cursive text-6xl text-glow text-primary-foreground"
            animate={animating ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5, repeat: animating && value < 100 ? Infinity : 0 }}
          >
            {value}%
          </motion.div>
        </div>

        <AnimateMessage show={showMessage} />
      </motion.div>
    </section>
  );
};

const AnimateMessage = ({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="mt-8 p-6 rounded-2xl bg-card border border-border box-glow"
    >
      <p className="font-elegant text-xl text-foreground mb-2">
        Error ❌
      </p>
      <p className="font-cursive text-2xl md:text-3xl text-glow-gold text-accent">
        Love level exceeded.
      </p>
      <p className="font-elegant text-lg text-muted-foreground italic mt-2">
        Ammu loves Murari infinitely. 💕
      </p>
    </motion.div>
  );
};

export default LoveMeter;
