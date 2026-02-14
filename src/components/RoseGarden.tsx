import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  "When did you first start loving me?",
  "What is your favorite memory with me?",
  "What do you feel when I say your name?",
  "If I was a song, which one would I be?",
  "Will you stay with me forever?",
];

const answers = ["Always ❤️", "Forever 💍", "Only You 🌹", "Endless Love 💖"];

const RoseGarden = () => {
  const [selectedRose, setSelectedRose] = useState<number | null>(null);
  const [answeredRoses, setAnsweredRoses] = useState<Set<number>>(new Set());
  const [showMessage, setShowMessage] = useState(false);

  const handleAnswer = (roseIndex: number) => {
    setShowMessage(true);
    setTimeout(() => {
      setAnsweredRoses((prev) => new Set([...prev, roseIndex]));
      setSelectedRose(null);
      setShowMessage(false);
    }, 2500);
  };

  return (
    <section className="min-h-screen bg-romantic-gradient py-20 px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className="font-cursive text-4xl md:text-6xl text-glow text-primary-foreground mb-4">
          A Garden of Questions
        </h2>
        <p className="font-elegant text-lg text-muted-foreground italic">
          Click each rose to reveal a question from my heart
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-3xl mx-auto">
        {questions.map((_, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedRose(i)}
            className={`text-6xl md:text-7xl transition-all duration-300 ${
              answeredRoses.has(i)
                ? "opacity-50 grayscale pointer-events-none"
                : "animate-glow-pulse cursor-pointer"
            }`}
            style={{
              filter: answeredRoses.has(i)
                ? undefined
                : "drop-shadow(0 0 15px hsl(348 83% 47% / 0.6))",
            }}
          >
            🌹
          </motion.button>
        ))}
      </div>

      {/* Question Modal */}
      <AnimatePresence>
        {selectedRose !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => !showMessage && setSelectedRose(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center box-glow"
            >
              <AnimatePresence mode="wait">
                {!showMessage ? (
                  <motion.div key="question" exit={{ opacity: 0 }}>
                    <span className="text-5xl mb-4 block">🌹</span>
                    <h3 className="font-elegant text-2xl text-foreground mb-8 italic">
                      {questions[selectedRose]}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {answers.map((answer, j) => (
                        <motion.button
                          key={j}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAnswer(selectedRose)}
                          className="px-4 py-3 rounded-xl bg-secondary text-secondary-foreground font-elegant text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        >
                          {answer}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="message"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="relative">
                      {Array.from({ length: 8 }).map((_, k) => (
                        <motion.span
                          key={k}
                          className="absolute text-2xl"
                          initial={{ opacity: 1, x: 0, y: 0 }}
                          animate={{
                            opacity: 0,
                            x: (Math.random() - 0.5) * 200,
                            y: -150 - Math.random() * 100,
                          }}
                          transition={{ duration: 1.5, delay: k * 0.1 }}
                          style={{ left: "45%", top: "50%" }}
                        >
                          ❤️
                        </motion.span>
                      ))}
                    </div>
                    <span className="text-5xl mb-4 block">💕</span>
                    <p className="font-cursive text-3xl text-glow text-primary-foreground">
                      You make my heart smile, Ammu 💕
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RoseGarden;
