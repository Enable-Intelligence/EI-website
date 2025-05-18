/* src/components/sections/Technology/index.jsx */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TechAnimation from "./TechAnimation";
import FeatureGrid from "./FeatureGrid";
import SectionHeader from "../../common/SectionHeader";

/**
 * Props:
 *  - isDarkMode (bool)       — forwarded from App
 *  - isMobile   (bool)       — forwarded from App
 */
export default function Technology({ isDarkMode, isMobile }) {
  const [eiSplit, setEiSplit] = useState(true);

  return (
    <section
      id="technology"
      className="relative min-h-screen flex items-center overflow-hidden w-full pt-20 pb-12 md:pt-24 md:pb-16"
    >
      <div className="w-full max-w-[90rem] mx-auto px-4 md:px-8 flex flex-col">
        {/* ---------- header ---------- */}
        <SectionHeader
          title="Technology"
          subtitle="Harnessing the power of artificial intelligence to transform industries"
          color="orange"
          dark={isDarkMode}
        />

        {/* ---------- body ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto flex-1">
          <TechAnimation
            eiSplit={eiSplit}
            toggle={() => setEiSplit((v) => !v)}
          />

          <FeatureGrid isVisible={!isMobile /* simple optimisation */} />
        </div>
      </div>
    </section>
  );
}
