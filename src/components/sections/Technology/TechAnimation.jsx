/* src/components/sections/Technology/TechAnimation.jsx */
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

export default function TechAnimation({ eiSplit, toggle }) {
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.3 });
  const [ready, setReady] = useState(false);

  // delay AOS-like entrance once component is in-view
  useEffect(() => {
    if (isVisible) setReady(true);
  }, [isVisible]);

  return (
    <div
      className="flex justify-center lg:justify-start lg:pl-4 xl:pl-12"
      ref={ref}
    >
      <div
        className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 cursor-pointer select-none"
        onClick={toggle}
      >
        {/* Enhanced Main Circle - Adjusted for better scaling */}
        <div className="absolute inset-0">
            {/* Outer Circle with Enhanced Glow */}
            <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-300/30 to-orange-400/30"
            animate={{
                scale: [1, 1.02, 1],
                opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            >
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
            <div className="absolute inset-0 rounded-full border-2 border-orange-400/20"></div>
            </motion.div>

            {/* Inner Circle with Enhanced Effects */}
            <motion.div
            className="absolute inset-[10%] rounded-full bg-gradient-to-br from-orange-300/20 to-orange-400/20"
            animate={{
                scale: [1, 1.05, 1],
                opacity: [0.6, 0.8, 0.6]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            >
            <div className="absolute inset-0 bg-white/20 rounded-full blur-lg"></div>
            <div className="absolute inset-0 rounded-full border border-orange-400/30"></div>
            </motion.div>

            {/* Enhanced Rotating Rings - Adjusted for better scaling */}
            <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
            }}
            >
            {[...Array(3)].map((_, i) => (
                <motion.div
                key={`ring-${i}`}
                className="absolute inset-0 rounded-full border-2 border-orange-400/30"
                style={{
                    transform: `rotate(${i * 60}deg) scale(${1 - i * 0.1})`
                }}
                />
            ))}
            </motion.div>
        </div>

        {/* EI Letters with Enhanced Animation - Adjusted for better scaling */}
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={ready ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            >
            {/* Power Ring Effect */}
            <AnimatePresence>
                {!eiSplit && ready && (
                <>
                    {/* Enhanced Outer Power Ring */}
                    <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-10"
                    >
                    <div className="absolute inset-0 rounded-full border-4 border-orange-400/40 blur-sm"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-orange-400/60"></div>
                    </motion.div>

                    {/* Enhanced Spark Ring - Adjusted for better scaling */}
                    <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-20"
                    >
                    {[...Array(32)].map((_, i) => (
                        <motion.div
                        key={`power-spark-${i}`}
                        className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-orange-400 rounded-full"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(-50%, -50%) rotate(${i * 11.25}deg)`
                        }}
                        animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0],
                            x: [
                            Math.cos(i * Math.PI / 16) * 80,
                            Math.cos(i * Math.PI / 16) * 60,
                            Math.cos(i * Math.PI / 16) * 80
                            ],
                            y: [
                            Math.sin(i * Math.PI / 16) * 80,
                            Math.sin(i * Math.PI / 16) * 60,
                            Math.sin(i * Math.PI / 16) * 80
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.02,
                            ease: "easeInOut"
                        }}
                        >
                        <div className="absolute inset-0 bg-white/80 rounded-full blur-sm"></div>
                        </motion.div>
                    ))}
                    </motion.div>
                </>
                )}
            </AnimatePresence>

            <motion.span
                initial={{ x: 0, rotate: 0, opacity: 0 }}
                animate={
                eiSplit ? { x: -170, rotate: -15, opacity: 1 } : { x: 0, rotate: 0, opacity: 1 }
                }
                transition={{ 
                type: 'spring', 
                stiffness: 100, 
                damping: 20, 
                duration: 1.5,
                delay: 0.6 
                }}
                className="text-7xl sm:text-8xl md:text-9xl font-black text-orange-500 drop-shadow-lg z-30"
                style={{ fontFamily: 'inherit' }}
            >
                E
            </motion.span>
            <motion.span
                initial={{ x: 0, rotate: 0, opacity: 0 }}
                animate={
                eiSplit ? { x: 135, rotate: 15, opacity: 1 } : { x: 0, rotate: 0, opacity: 1 }
                }
                transition={{ 
                type: 'spring', 
                stiffness: 100, 
                damping: 20, 
                duration: 1.5,
                delay: 0.6 
                }}
                className="text-7xl sm:text-8xl md:text-9xl font-black text-orange-500 drop-shadow-lg z-30"
                style={{ fontFamily: 'inherit' }}
            >
                I
            </motion.span>
            </motion.div>
        </div>

        {/* Enhanced Floating Text - Adjusted for better scaling */}
        <AnimatePresence>
            {eiSplit && ready && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ 
                duration: 1,
                delay: 0.8,
                ease: "easeOut"
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
                <div className="bg-white/95 backdrop-blur-sm px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full shadow-xl">
                <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 whitespace-nowrap">
                    Enable Intelligence
                </span>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}
