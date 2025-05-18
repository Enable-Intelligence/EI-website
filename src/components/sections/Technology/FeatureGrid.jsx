/* src/components/sections/Technology/FeatureGrid.jsx */
import React from "react";
import { motion } from "framer-motion";
import aiIcon from "../../../assets/icons/ai-transformation.svg";
import customizedIcon from "../../../assets/icons/customized-ai-solutions.svg";
import scalableIcon from "../../../assets/icons/scalable-solutions.svg";

const FEATURES = [
    {
        icon: aiIcon, 
        label: "AI Transformation", 
        desc: "We turn raw data into predictive power through advanced machine learning algorithms.",
        gradient: "from-orange-500/20 to-orange-600/20"
    },
    { 
        icon: customizedIcon, 
        label: "Customized AI Solutions", 
        desc: "Tailored pipelines designed for your industry's unique challenges and requirements.",
        gradient: "from-orange-500/20 to-orange-600/20"
    },
    { 
        icon: scalableIcon, 
        label: "Scalable Solutions", 
        desc: "Enterprise-grade deployment frameworks that grow with your business needs.",
        gradient: "from-orange-500/20 to-orange-600/20"
    },
    {
        icon: aiIcon,
        label: "Real-time Analytics",
        desc: "Instant insights and decision-making support through powerful data processing.",
        gradient: "from-orange-500/20 to-orange-600/20"
    }
];

export default function FeatureGrid({ isVisible }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-8 lg:mt-0">
      {FEATURES.map((t, i) => (
        <motion.div
          key={t.label}
          className="group relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.15 * i }}
        >
        <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>    
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
            <motion.div 
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-2 transform group-hover:scale-110 transition-transform duration-500"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
            >
                <img src={t.icon} alt={t.label} className="w-full h-full object-contain filter brightness-0 invert" />
            </motion.div>
            <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 text-gray-900">{t.label}</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t.desc}</p>
            </div>

            {/* Hover Effects */}
            <div className="absolute inset-0 rounded-xl border-2 border-orange-500/0 group-hover:border-orange-500/20 transition-colors duration-500"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-1/2 transition-all duration-500"></div>
        </motion.div>
      ))}
    </div>
  );
}
