/* src/components/sections/Solutions/SolutionCard.jsx */
import React from 'react';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

export default function SolutionCard({
  title,
  img,
  description,
  index,
  isMobile,
  activeCard,
  setActiveCard,
}) {
  return (
    <div
        className="group relative bg-gradient-to-br from-orange-50/80 to-orange-100/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-2 border border-orange-100/50" 
        data-aos="zoom-in"
        data-aos-delay={index * 100}
        onClick={() => {
            if (isMobile) setActiveCard(activeCard === index ? null : index);
        }}
        >
      {/* Card Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>   
        {/* Desktop View */}
        <div className="hidden md:block flex-1 flex flex-col">
            <h4 className={`text-2xl font-bold ${title === "SPORTIFY IQ" ? "text-orange-500" : "text-black"} mb-4 group-hover:opacity-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}>{title}</h4>
            <div className="relative h-40 mb-5 flex-shrink-0">
            <img 
                src={img} 
                alt={title} 
                className="w-full h-full object-contain group-hover:opacity-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" 
            />
            </div>
            {/* Desktop Hover Reveal Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/95 to-orange-600/95 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center p-6 z-20">
            <motion.p 
                className="text-white text-sm leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                duration: 0.5,
                delay: 0.2,
                ease: "easeOut"
                }}
            >
                {description}
            </motion.p>
            </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex-1 flex flex-col">
            <h4 className={`text-2xl font-bold ${title === "SPORTIFY IQ" ? "text-orange-500" : "text-black"} mb-4 transition-all duration-300 ${
            activeCard === index ? 'opacity-0' : 'opacity-100'
            }`}>{title}</h4>
            <div className="relative h-40 mb-5 flex-shrink-0">
            <img 
                src={img} 
                alt={title} 
                className={`w-full h-full object-contain transition-all duration-300 ${
                activeCard === index ? 'opacity-0' : 'opacity-100'
                }`}
            />
            </div>
            {/* Mobile Tap Reveal Overlay */}
            <div 
            className={`absolute inset-0 bg-gradient-to-br from-orange-500/95 to-orange-600/95 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center p-6 z-20 ${
                activeCard === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            >
            <motion.p 
                className="text-white text-sm leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={activeCard === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                duration: 0.5,
                delay: 0.2,
                ease: "easeOut"
                }}
            >
                {description}
            </motion.p>
            </div>
        </div>

        {/* Mobile Touch Indicator */}
        <div className="absolute bottom-4 right-4 md:hidden">
            <span className="text-sm text-orange-500 bg-white/90 px-3 py-1.5 rounded-full shadow-lg">
            {activeCard === index ? 'Tap to close' : 'Tap to view details'}
            </span>
        </div>
    </div>
  );
}
