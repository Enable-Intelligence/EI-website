import React, { useState } from 'react';
import SolutionGrid from './SolutionGrid';
import { motion } from 'framer-motion';
import { solutionsData } from '../../../utils/constants';


export default function Solutions({ isMobile }) {
  const [activeCard, setActiveCard] = useState(null); // mobile tap‑to‑open

  return (
    <section
      id="solutions"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="w-full max-w-[90rem] mx-auto px-4 md:px-8 py-8 relative z-10">
        {/* ---- HEADER (exact markup copied from App.jsx) ---- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 relative">
            <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-2xl blur-xl"></div>
                <h2 className="text-5xl md:text-6xl font-black text-orange-500 mb-4 md:mb-0 tracking-tight relative">Solutions</h2>
            </div>
            <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-2xl blur-xl"></div>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 text-center md:text-right max-w-3xl leading-tight relative">
                    Shaping Tomorrow with <span className="text-orange-500 relative">
                    Intelligence
                    <motion.div
                        className="absolute -bottom-2 left-0 w-full h-1 bg-orange-500"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                    </span> Today
                </h3>
            </div>
        </div>

        {/* ---- GRID ---- */}
        <SolutionGrid
          data={solutionsData}
          isMobile={isMobile}
          activeCard={activeCard}
          setActiveCard={setActiveCard}
        />
      </div>
    </section>
  );
}
