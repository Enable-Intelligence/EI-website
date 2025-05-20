import { motion } from 'framer-motion';

export default function AnimatedText({ isMobile }) {
  return (
    <p className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
        <motion.span 
        className="text-black inline-block"
        whileHover={{ scale: 1.05 }}
        animate={isMobile ? {
            y: [-5, 5, -5],
            scale: [1, 1.02, 1]
        } : {}}
        transition={isMobile ? {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        } : { type: "spring", stiffness: 300, damping: 10 }}
        >
        Empowering
        </motion.span><br />
        <motion.span 
        className="text-white inline-block"
        whileHover={{ scale: 1.05 }}
        animate={isMobile ? {
            y: [5, -5, 5],
            scale: [1, 1.02, 1]
        } : {}}
        transition={isMobile ? {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
        } : { type: "spring", stiffness: 300, damping: 10 }}
        >
        Decisions.
        </motion.span><br />
        <motion.span 
        className="text-black inline-block"
        whileHover={{ scale: 1.05 }}
        animate={isMobile ? {
            y: [-5, 5, -5],
            scale: [1, 1.02, 1]
        } : {}}
        transition={isMobile ? {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
        } : { type: "spring", stiffness: 300, damping: 10 }}
        >
        Enabling
        </motion.span><br />
        <motion.span 
        className="text-white inline-block"
        whileHover={{ scale: 1.05 }}
        animate={isMobile ? {
            y: [5, -5, 5],
            scale: [1, 1.02, 1]
        } : {}}
        transition={isMobile ? {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
        } : { type: "spring", stiffness: 300, damping: 10 }}
        >
        Insight.
        </motion.span>
    </p>
  );
}

