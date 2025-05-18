import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from '@emailjs/browser';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/layout/LoadingScreen';
import Home from './components/sections/Home';
import solution1 from "./assets/solution1.png";
import solution2 from "./assets/solution2.png";
import solution3 from "./assets/solution3.png";
import aiIcon from "./assets/icons/ai-transformation.svg";
import customizedIcon from "./assets/icons/customized-ai-solutions.svg";
import scalableIcon from "./assets/icons/scalable-solutions.svg";
import resourceImg from "./assets/resource.png";

/**
 * NOTE: 2 small global tweaks fix the mobile‐view navbar shift
 * 1. Ensure <body> has no default margin & no horizontal scroll.
 *    Inside your tailwind base layer (or index.css) add:
 *
 *    @layer base {
 *      body { @apply m-0 overflow-x-hidden; }
 *    }
 *
 * 2. Update the nav container so it's truly full‑width and the
 *    inner flex box is centred with symmetric padding.
 */

// Update contact form inputs in dark mode
const contactFormInputStyles = {
  light: {
    backgroundColor: 'bg-white',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-900',
    placeholderColor: 'placeholder-gray-500',
    focusBorderColor: 'focus:border-orange-500',
    focusRingColor: 'focus:ring-orange-500/20'
  },
  dark: {
    backgroundColor: 'bg-gray-800',
    borderColor: 'border-gray-700',
    textColor: 'text-white',
    placeholderColor: 'placeholder-gray-400',
    focusBorderColor: 'focus:border-orange-500',
    focusRingColor: 'focus:ring-orange-500/20'
  }
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [eiSplit, setEiSplit] = useState(true);
  const [isTechSectionVisible, setIsTechSectionVisible] = useState(false);
  const techSectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: null });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });
  }, []);

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for Technology section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTechSectionVisible(true);
        } else {
          setIsTechSectionVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    const techSection = document.getElementById("technology");
    if (techSection) observer.observe(techSection);
    return () => techSection && observer.unobserve(techSection);
  }, []); // Remove scrollDirection dependency

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      limitRate: true,
      blockHeadless: false
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });

    try {
      // Log environment variables (without values) to verify they exist
      console.log('Checking environment variables:', {
        hasPublicKey: !!import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        hasServiceId: !!import.meta.env.VITE_EMAILJS_SERVICE_ID,
        hasRecieveTemplateId: !!import.meta.env.VITE_EMAILJS_RECIEVE_TEMPLATE_ID,
        hasSendTemplateId: !!import.meta.env.VITE_EMAILJS_SEND_TEMPLATE_ID
      });

      const customerEmail = formData.email;
      const customerName = formData.name;
      const customerMessage = formData.message;

      const receiveTemplateParams = {
        from_name: customerName,
        from_email: customerEmail,
        message: customerMessage,
        to_email: "admin@enableintelligence.com",
      };

      const reciveResponse = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_RECIEVE_TEMPLATE_ID,
        receiveTemplateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS Recive Response:', reciveResponse);
      setFormStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });

      const autoReplyTemplateParams = {
        to_name: formData.name,
        to_email: formData.email,
        message: customerMessage,
      }

      const sendResponse  =  await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_SEND_TEMPLATE_ID,
        autoReplyTemplateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS Send Response:', sendResponse);
      
    } catch (err) {
      console.error('EmailJS Error Details:', {
        name: err.name,
        message: err.message,
        text: err.text,
        status: err.status
      });

      setFormStatus({ 
        loading: false, 
        success: false, 
        error: `Failed to send message: ${err.text || err.message || 'Unknown error'}` 
      });
    }
  };

  return (
    <div
      className={`font-sans transition-colors duration-300 overflow-x-hidden relative ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Background effects removed */}
      </div>

      {/* NAVBAR */}
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* HOME SECTION */}
      <Home isDarkMode={isDarkMode} isMobile={isMobile} />

      {/* SOLUTIONS SECTION */}
      <section id="solutions" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-[90rem] mx-auto px-4 md:px-8 py-8 relative z-10">
          {/* Section Header with Enhanced Design */}
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

          {/* Solutions Grid with Enhanced Card Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { 
                title: "SPOCARE", 
                img: solution1,
                description: "Revolutionizing healthcare through AI-powered diagnostics and patient care management. Our platform combines advanced machine learning with medical expertise to deliver accurate, timely, and personalized healthcare solutions.",
                features: [
                  "AI-Powered Diagnostics",
                  "Patient Care Management",
                  "Real-time Analytics",
                  "Secure Data Handling"
                ]
              },
              { 
                title: "SPORTIFY IQ", 
                img: solution2,
                description: "Sportify is a comprehensive mobile application designed to support athletes and active individuals in their physical therapy and rehabilitation journeys. Whether you're recovering from an injury or aiming to enhance your performance, Sportify offers a suite of tools to assist you.",
                features: [
                  "Performance Analytics",
                  "Injury Prevention",
                  "Team Strategy Optimization",
                  "Real-time Tracking"
                ]
              },
              { 
                title: "AESTHETIC AI", 
                img: solution3,
                description: "Aesthetics AI is an innovative application that leverages artificial intelligence to help users enhance their visual presence—whether it's personal style, interior design, branding, or digital content. By combining cutting-edge AI with principles of aesthetics, the app offers smart, tailored suggestions that elevate the look and feel of whatever you're working on.",
                features: [
                  "Treatment Planning",
                  "Outcome Prediction",
                  "Progress Tracking",
                  "Personalized Recommendations"
                ]
              },
            ].map((s, i) => (
              <div 
                key={i} 
                className="group relative bg-gradient-to-br from-orange-50/80 to-orange-100/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-2 border border-orange-100/50" 
                data-aos="zoom-in" 
                data-aos-delay={i * 100}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setActiveCard(activeCard === i ? null : i);
                  }
                }}
              >
                {/* Card Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                
                {/* Desktop View */}
                <div className="hidden md:block flex-1 flex flex-col">
                  <h4 className={`text-2xl font-bold ${s.title === "SPORTIFY IQ" ? "text-orange-500" : "text-black"} mb-4 group-hover:opacity-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}>{s.title}</h4>
                  <div className="relative h-40 mb-5 flex-shrink-0">
                    <img 
                      src={s.img} 
                      alt={s.title} 
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
                      {s.description}
                    </motion.p>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden flex-1 flex flex-col">
                  <h4 className={`text-2xl font-bold ${s.title === "SPORTIFY IQ" ? "text-orange-500" : "text-black"} mb-4 transition-all duration-300 ${
                    activeCard === i ? 'opacity-0' : 'opacity-100'
                  }`}>{s.title}</h4>
                  <div className="relative h-40 mb-5 flex-shrink-0">
                    <img 
                      src={s.img} 
                      alt={s.title} 
                      className={`w-full h-full object-contain transition-all duration-300 ${
                        activeCard === i ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                  </div>
                  {/* Mobile Tap Reveal Overlay */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br from-orange-500/95 to-orange-600/95 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center p-6 z-20 ${
                      activeCard === i ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <motion.p 
                      className="text-white text-sm leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={activeCard === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ 
                        duration: 0.5,
                        delay: 0.2,
                        ease: "easeOut"
                      }}
                    >
                      {s.description}
                    </motion.p>
                  </div>
                </div>

                {/* Mobile Touch Indicator */}
                <div className="absolute bottom-4 right-4 md:hidden">
                  <span className="text-sm text-orange-500 bg-white/90 px-3 py-1.5 rounded-full shadow-lg">
                    {activeCard === i ? 'Tap to close' : 'Tap to view details'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section id="technology" className="relative min-h-screen flex items-center overflow-hidden w-full pt-20 pb-12 md:pt-24 md:pb-16" ref={techSectionRef}>
        <div className="w-full max-w-[90rem] mx-auto px-4 md:px-8 relative flex flex-col">
          {/* Modern Section Header with Enhanced Design */}
          <div className="flex flex-col items-center text-center mb-8 md:mb-12" data-aos="fade-up">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-2xl blur-xl"></div>
              <div className="inline-block bg-gradient-to-r from-orange-500/20 to-orange-600/20 px-6 py-2 rounded-2xl backdrop-blur-sm relative">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-orange-500">Technology</h2>
              </div>
            </div>
            <p className={`mt-3 text-sm sm:text-base md:text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-600'} max-w-2xl px-4`}>
              Harnessing the power of artificial intelligence to transform industries
            </p>
          </div>

          {/* Main Content Grid - Adjusted for better responsiveness */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto flex-1">
            {/* Left Side: Main Animation - Adjusted for better scaling */}
            <div className="flex justify-center lg:justify-start lg:pl-4 xl:pl-12">
              <div 
                className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 cursor-pointer select-none group"
                onClick={() => setEiSplit((v) => !v)}
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
                    animate={isTechSectionVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                    {/* Power Ring Effect */}
                    <AnimatePresence>
                      {!eiSplit && isTechSectionVisible && (
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
                  {eiSplit && isTechSectionVisible && (
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

            {/* Right Side: Features Grid - Adjusted for better responsiveness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-8 lg:mt-0">
              {[
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
              ].map((t, i) => (
                <motion.div 
                  key={i} 
                  className="group relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTechSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.2 * i }}
                >
                  {/* Background Gradient */}
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
          </div>
        </div>
      </section>

      {/* RESOURCES SECTION */}
      <section id="resources" className="py-24 px-4 md:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-block bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-8 py-4 rounded-full mb-6">
              <h2 className="text-5xl font-black text-orange-500">Resources</h2>
            </div>
            <p className={`text-xl ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} max-w-3xl mx-auto`}>
              Discover insights, guides, and innovations shaping the future of AI
            </p>
          </div>

          {/* Featured Resource */}
          <div className="relative mb-16" data-aos="fade-up">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-96 group">
                  <img src={resourceImg} alt="Featured Resource" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                      Featured Article
                    </span>
                    <h3 className="text-3xl font-bold mt-4">World Refugee Day 2030</h3>
                    <p className="text-gray-200 mt-2">Exploring the intersection of AI and humanitarian efforts</p>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="space-y-6">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Join us in exploring how artificial intelligence is revolutionizing humanitarian aid and refugee support. Discover innovative solutions and real-world applications that are making a difference.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all transform hover:-translate-y-1 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Read Article
                      </button>
                      <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resource Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "AI in Healthcare",
                desc: "Exploring the future of medical diagnostics",
                tag: "Healthcare",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                )
              },
              {
                title: "Machine Learning Basics",
                desc: "A comprehensive guide for beginners",
                tag: "Education",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              },
              {
                title: "Data Privacy",
                desc: "Best practices for secure AI implementation",
                tag: "Security",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )
              }
            ].map((r, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500/10 p-3 rounded-xl text-orange-500">
                    {r.icon}
                  </div>
                  <div className="flex-1">
                    <span className="inline-block bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      {r.tag}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{r.title}</h4>
                    <p className="text-gray-600 mb-6">{r.desc}</p>
                    <div className="flex items-center justify-between">
                      <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        Read Article
                      </button>
                      <span className="text-gray-400 text-sm">5 min read</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section id="faqs" className={`${isDarkMode ? 'bg-orange-500/90' : 'bg-orange-500'} py-24 px-4 md:px-16 relative text-white overflow-hidden backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full mb-6">
              <h2 className="text-5xl font-black">Frequently Asked Questions</h2>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Find answers to common questions about our services and technology
            </p>
          </div>

          {/* FAQ Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6" data-aos="fade-right">
              {[
                {
                  q: "What is SPOCARE?",
                  a: "SPOCARE is our advanced hospital AI platform that revolutionizes diagnostics through machine learning and predictive analytics."
                },
                {
                  q: "Is my data secure?",
                  a: "Yes, we implement end-to-end encryption and maintain HIPAA compliance to ensure your data remains protected at all times."
                },
                {
                  q: "Can I export reports?",
                  a: "Absolutely! You can export reports in multiple formats including PDF and CSV, with customizable templates available."
                }
              ].map((f, i) => (
                <motion.div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <h3 className="text-xl font-bold mb-3">{f.q}</h3>
                  <p className="text-white/80">{f.a}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6" data-aos="fade-left">
              {[
                {
                  q: "How does the AI work?",
                  a: "Our AI combines multiple advanced algorithms to analyze data patterns and provide accurate predictions and insights."
                },
                {
                  q: "What support do you offer?",
                  a: "We provide 24/7 technical support, regular updates, and dedicated account managers for enterprise clients."
                },
                {
                  q: "Can I customize the platform?",
                  a: "Yes, our platform is highly customizable to meet your specific needs and requirements."
                }
              ].map((f, i) => (
                <motion.div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <h3 className="text-xl font-bold mb-3">{f.q}</h3>
                  <p className="text-white/80">{f.a}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-16" data-aos="fade-up">
            <p className="text-xl mb-6">Still have questions?</p>
            <button 
              className="bg-white text-orange-500 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:-translate-y-1"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Our Team
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} pt-24 pb-16 px-4 md:px-16 backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-black mb-4 text-orange-500">Let's Talk</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
              We're here to help and answer any questions you might have
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Contact Form */}
            <div className={`flex-1 p-8 rounded-3xl shadow-xl ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
                : 'bg-gradient-to-br from-gray-50 to-white'
            }`} data-aos="fade-right">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className={`block font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Name
                    </span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name" 
                    className={`w-full p-4 border-2 rounded-xl transition-all ${
                      isDarkMode 
                        ? `${contactFormInputStyles.dark.backgroundColor} ${contactFormInputStyles.dark.borderColor} ${contactFormInputStyles.dark.textColor} ${contactFormInputStyles.dark.placeholderColor}`
                        : `${contactFormInputStyles.light.backgroundColor} ${contactFormInputStyles.light.borderColor} ${contactFormInputStyles.light.textColor} ${contactFormInputStyles.light.placeholderColor}`
                    }`}
                    required 
                  />
                </div>
                <div>
                  <label className={`block font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email" 
                    className={`w-full p-4 border-2 rounded-xl transition-all ${
                      isDarkMode 
                        ? `${contactFormInputStyles.dark.backgroundColor} ${contactFormInputStyles.dark.borderColor} ${contactFormInputStyles.dark.textColor} ${contactFormInputStyles.dark.placeholderColor}`
                        : `${contactFormInputStyles.light.backgroundColor} ${contactFormInputStyles.light.borderColor} ${contactFormInputStyles.light.textColor} ${contactFormInputStyles.light.placeholderColor}`
                    }`}
                    required 
                  />
                </div>
                <div>
                  <label className={`block font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Message
                    </span>
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How can we help?" 
                    rows={4} 
                    className={`w-full p-4 border-2 rounded-xl transition-all ${
                      isDarkMode 
                        ? `${contactFormInputStyles.dark.backgroundColor} ${contactFormInputStyles.dark.borderColor} ${contactFormInputStyles.dark.textColor} ${contactFormInputStyles.dark.placeholderColor}`
                        : `${contactFormInputStyles.light.backgroundColor} ${contactFormInputStyles.light.borderColor} ${contactFormInputStyles.light.textColor} ${contactFormInputStyles.light.placeholderColor}`
                    }`}
                    required
                  ></textarea>
                </div>

                {/* Status Messages */}
                {formStatus.error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{formStatus.error}</span>
                  </div>
                )}
                {formStatus.success && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    type="submit" 
                    disabled={formStatus.loading}
                    className={`flex-1 bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:-translate-y-1 flex items-center justify-center ${
                      formStatus.loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-orange-600'
                    }`}
                  >
                    {formStatus.loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                  <button 
                    type="button"
                    onClick={() => window.open('https://tidycal.com/enableintelligence', '_blank')}
                    className="flex-1 bg-white text-orange-500 border-2 border-orange-500 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all transform hover:-translate-y-1 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book a Meeting
                  </button>
                </div>

                {/* Additional Contact Information */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Contact Details */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-gray-900">Other Ways to Reach Us</h4>
                      <div className="space-y-3">
                        <a href="mailto:hr@enableintelligence.com" className="flex items-center text-gray-600 hover:text-orange-500 transition-colors">
                          <svg className="w-5 h-5 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          contact@enableintelligence.com
                        </a>
                      </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-gray-900">Connect With Us</h4>
                      <div className="flex space-x-4">
                        <a href="https://www.linkedin.com/in/enable-intelligence/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-500 transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                        <a href="https://github.com/Enable-Intelligence" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-500 transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Response Time Note */}
                  <div className="mt-6 text-sm text-gray-500 italic">
                    <p>We typically respond to inquiries within 24 hours during business days.</p>
                  </div>
                </div>
              </form>
            </div>

            {/* Company Info */}
            <div className="flex-1 flex flex-col justify-center" data-aos="fade-left">
              {/* Meeting Cards Row */}
              <div className="flex flex-col gap-4 mb-8 items-stretch w-full max-w-xl bg-orange-50/50 rounded-2xl p-2">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
                  <h4 className="text-xl font-bold mb-2">Product Demo</h4>
                  <p className="text-gray-600 mb-4">Experience our cutting-edge AI solutions in action:</p>
                  <ul className="text-gray-600 mb-4 space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      SPOCARE: AI-powered healthcare diagnostics platform
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      SPORTIFY IQ: Athletic performance optimization system
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      AESTHETIC AI: Visual enhancement and design platform
                    </li>
                  </ul>
                  <button
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center"
                    onClick={() => window.open('https://tidycal.com/enableintelligence/15-minute-meeting', '_blank')}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Schedule Demo
                  </button>
                </div>
                {/* Card 2 */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
                  <h4 className="text-xl font-bold mb-2">Detailed Discussion</h4>
                  <p className="text-gray-600 mb-4">Deep dive into your specific needs with our experts:</p>
                  <ul className="text-gray-600 mb-4 space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Custom AI solution development
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Integration and deployment strategies
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Data security and compliance
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      ROI and implementation timeline
                    </li>
                  </ul>
                  <button
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center"
                    onClick={() => window.open('https://tidycal.com/enableintelligence/30-minute-meeting', '_blank')}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Schedule Discussion
                  </button>
                </div>
              </div>
              {/* Quote and Company Info */}
              <div className="text-right">
                <p className="italic text-4xl mb-12 font-light text-orange-500">
                  "Got a vision?<br />Let's build the AI to match."
                </p>
                <div className="flex items-center space-x-6 justify-end">
                  <div className="text-4xl font-black text-orange-500">
                    Enable<br />Intelligence
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer isDarkMode={isDarkMode} />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* ... existing main content ... */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;