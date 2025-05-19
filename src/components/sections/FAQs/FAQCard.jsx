// src/components/sections/FAQs/FAQCard.jsx
import { motion } from 'framer-motion';

export default function FAQCard({ q, a, delay = 0 }) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <h3 className="text-xl font-bold mb-3">{q}</h3>
      <p className="text-white/80">{a}</p>
    </motion.div>
  );
}
