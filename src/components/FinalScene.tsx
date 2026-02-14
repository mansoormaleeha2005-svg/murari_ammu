import { motion } from "framer-motion";

const FinalScene = () => {
  return (
    <section className="min-h-screen bg-romantic-gradient flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Large glowing rose */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-center z-10"
      >
        <motion.div
          className="text-9xl md:text-[12rem] mb-8 block animate-glow-pulse"
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            filter: "drop-shadow(0 0 40px hsl(348 83% 47% / 0.6))",
          }}
        >
          🌹
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1.5 }}
          className="font-elegant text-2xl md:text-3xl text-foreground italic mb-4 leading-relaxed"
        >
          Ammu…<br />
          You are not just my Valentine.<br />
          You are my forever.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5, duration: 1.5 }}
          className="font-cursive text-5xl md:text-7xl text-glow text-primary-foreground mt-8"
        >
          Happy Valentine's Day ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 3.5, duration: 1 }}
          className="font-elegant text-lg text-muted-foreground mt-6 italic"
        >
          — Forever Yours, Murari 💕
        </motion.p>
      </motion.div>

      {/* Background glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, hsl(348 83% 47% / 0.08) 0%, transparent 60%)",
        }}
      />
    </section>
  );
};

export default FinalScene;
