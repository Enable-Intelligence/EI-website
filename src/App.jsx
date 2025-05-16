import React, { useEffect, useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import logo from "./assets/logo.png";
import navLogo from "./assets/logo512.png";
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
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [setCurrentSection] = useState("home");
  const [eiSplit, setEiSplit] = useState(true);
  const [isTechSectionVisible, setIsTechSectionVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const techSectionRef = useRef(null);
  const [setTechSectionScrollProgress] = useState(0);
  const [activeCard, setActiveCard] = useState(null);

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

  // initialise AOS (scroll animations)
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Intersection Observer for Technology section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTechSectionVisible(true);
          setEiSplit(true); // Split when entering the section
        } else {
          setIsTechSectionVisible(false);
          // Close only if scrolling down
          if (scrollDirection === "down") {
            setEiSplit(false);
          }
        }
      },
      { threshold: 0.3 }
    );

    const techSection = document.getElementById("technology");
    if (techSection) observer.observe(techSection);
    return () => techSection && observer.unobserve(techSection);
  }, [scrollDirection]); // Add scrollDirection as a dependency

  // update currentSection based on scroll position
  useEffect(() => {
    const sections = ["home", "solutions", "technology", "resources", "faqs", "contact"];
    const onScroll = () => {
      const scrollY = window.scrollY + 120;
      let found = "home";
      for (let id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) found = id;
      }
      setCurrentSection(found);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  },);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleScroll = () => {
      if (techSectionRef.current) {
        const { top, height } = techSectionRef.current.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (window.innerHeight - top) / height));
        setTechSectionScrollProgress(progress);

        // Combine letters when scrolled past 50% of the section
        if (progress > 0.5) {
          setEiSplit(false);
        } else {
          setEiSplit(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "solutions", label: "Solutions" },
    { id: "technology", label: "Technology" },
    { id: "resources", label: "Resources" },
    { id: "faqs", label: "FAQs" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <div
      className={`font-sans transition-colors duration-300 overflow-x-hidden ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-orange-500"
        }`}
        data-aos="fade-down"
      >
        {/* max‑width wrapper keeps content centred & equal padding */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2">
          {/* --- Logo --- */}
          <img
            src={navLogo}
            alt="Enable Intelligence Logo"
            className="h-8 sm:h-10 w-auto object-contain block"
            style={{ maxWidth: "120px" }}
          />

          {/* --- Desktop Nav Links + Dark Toggle --- */}
          <div className="hidden sm:flex items-center space-x-4">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-3 py-1 rounded-lg border transition ${
                  isDarkMode
                    ? "border-gray-600 hover:bg-gray-700"
                    : "border-black hover:bg-black hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            {/* Dark‑mode button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
              }`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* --- Mobile: dark toggle + hamburger --- */}
          <div className="sm:hidden flex items-center space-x-1">
            {/* Dark toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 rounded-full transition-all duration-300 ${
                isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
              }`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            {/* Hamburger */}
            <button
              className="focus:outline-none p-1.5"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* --- Mobile slide‑down menu --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={`sm:hidden fixed top-[52px] left-0 right-0 border-t shadow-lg ${
                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-orange-500"
              }`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {navLinks.map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`block px-4 py-3 border-b transition-colors duration-200 ${
                    isDarkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HOME SECTION */}
      <section id="home" className={`min-h-screen flex flex-col lg:flex-row ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-white'} relative pt-16`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Modern Gradient Orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-orange-500/5 to-orange-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          {/* Modern Pattern Overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
          </div>
        </div>

        {/* Left Content */}
        <div className="flex-1 p-4 md:p-8 flex flex-col justify-center relative z-10">
          {/* Logo and Content */}
          <div className="relative">
            <div className="flex justify-center items-center h-36 mb-6 relative">
              <motion.img
                src={logo}
                alt="Enable Intelligence Logo"
                className="max-h-full max-w-full object-contain block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                style={{ 
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                  width: 'auto',
                  height: '100%'
                }}
              />
              {/* Glowing Effect */}
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl animate-pulse"></div>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center space-y-3"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                  <span className="text-orange-500 relative inline-block">
                    Enable Intelligence
                    <motion.div
                      className="absolute -bottom-2 left-0 w-full h-1 bg-orange-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </span>
                  <div className="mt-3">
                    <span className={`text-2xl md:text-3xl ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Where AI Meets Innovation</span>
                  </div>
                </h1>
              </motion.div>

              <motion.div 
                className={`text-center space-y-5 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-xl md:text-2xl font-bold text-orange-500">
                  Empowering Industries with Next-Generation Adaptive AI
                </p>
                <div className="space-y-3 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                  <p>
                    At Enable Intelligence, we are revolutionizing the future of business through cutting-edge artificial intelligence solutions.
                  </p>
                  <p>
                    We help organizations transform, innovate, and thrive in a rapidly evolving digital landscape.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex flex-wrap justify-center gap-6 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button 
                  className="group relative px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold overflow-hidden min-w-[200px] text-lg" 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="relative z-10 group-hover:text-black">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <button 
                  className="group relative px-8 py-4 bg-white text-orange-500 rounded-xl font-semibold border-2 border-orange-500 overflow-hidden min-w-[200px] text-lg" 
                  onClick={() => document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="relative z-10 group-hover:text-black">Learn More</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
          </div>

          {/* Main Content */}
          <motion.div 
            className="flex items-center justify-center relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="relative flex items-center">
              <div className="flex flex-col space-y-4">
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
              </div>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-float" style={{ animationDuration: '6s' }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS SECTION */}
      <section id="solutions" className={`relative min-h-screen flex items-center overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-orange-500/5 to-orange-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-orange-500/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}

          {/* Energy Lines */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-1 bg-gradient-to-r from-orange-500/20 to-transparent"
              style={{
                left: '0',
                top: `${i * 12}%`,
                width: '100%',
                transform: `rotate(${i * 5}deg)`
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scaleX: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>

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
      <section id="technology" className={`relative h-screen flex items-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} overflow-hidden w-full pt-16`} ref={techSectionRef}>
        {/* Modern Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
          
          {/* Enhanced Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {/* Floating Tech Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`tech-particle-${i}`}
              className="absolute w-1.5 h-1.5 bg-orange-500/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>

        <div className="w-full max-w-[90rem] mx-auto px-4 md:px-8 relative h-full flex flex-col">
          {/* Modern Section Header with Enhanced Design */}
          <div className="flex flex-col items-center text-center pt-4 mb-4" data-aos="fade-up">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-2xl blur-xl"></div>
              <div className="inline-block bg-gradient-to-r from-orange-500/20 to-orange-600/20 px-6 py-2 rounded-2xl backdrop-blur-sm relative">
                <h2 className="text-4xl md:text-5xl font-black text-orange-500">Technology</h2>
              </div>
            </div>
            <p className={`mt-3 text-base md:text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-600'} max-w-2xl`}>
              Harnessing the power of artificial intelligence to transform industries
            </p>
          </div>

          {/* Main Content Grid - Adjusted for better alignment and spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto flex-1">
            {/* Left Side: Main Animation - Adjusted position */}
            <div className="flex justify-center lg:justify-start lg:pl-12">
              <div 
                className="relative w-72 h-72 md:w-96 md:h-96 cursor-pointer select-none group"
                onClick={() => setEiSplit((v) => !v)}
              >
                {/* Enhanced Main Circle */}
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
                    className="absolute inset-8 rounded-full bg-gradient-to-br from-orange-300/20 to-orange-400/20"
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

                  {/* Enhanced Rotating Rings */}
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

                {/* EI Letters with Enhanced Animation */}
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

                          {/* Enhanced Spark Ring */}
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 z-20"
                          >
                            {[...Array(48)].map((_, i) => (
                              <motion.div
                                key={`power-spark-${i}`}
                                className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full"
                                style={{
                                  left: '50%',
                                  top: '50%',
                                  transform: `translate(-50%, -50%) rotate(${i * 7.5}deg)`
                                }}
                                animate={{
                                  scale: [0, 1.5, 0],
                                  opacity: [0, 1, 0],
                                  x: [
                                    Math.cos(i * Math.PI / 24) * 120,
                                    Math.cos(i * Math.PI / 24) * 100,
                                    Math.cos(i * Math.PI / 24) * 120
                                  ],
                                  y: [
                                    Math.sin(i * Math.PI / 24) * 120,
                                    Math.sin(i * Math.PI / 24) * 100,
                                    Math.sin(i * Math.PI / 24) * 120
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
                      className="text-9xl font-black text-orange-500 drop-shadow-lg z-30"
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
                      className="text-9xl font-black text-orange-500 drop-shadow-lg z-30"
                      style={{ fontFamily: 'inherit' }}
                    >
                      I
                    </motion.span>
                  </motion.div>
                </div>

                {/* Enhanced Floating Text */}
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
                      <div className="bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl">
                        <span className="text-2xl font-semibold text-gray-800 whitespace-nowrap">
                          Enable Intelligence
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side: Features Grid - Adjusted for better content visibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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
                  className="group relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTechSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.2 * i }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <motion.div 
                      className="w-14 h-14 md:w-16 md:h-16 mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-2 transform group-hover:scale-110 transition-transform duration-500"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <img src={t.icon} alt={t.label} className="w-full h-full object-contain filter brightness-0 invert" />
                    </motion.div>
                    <h3 className="font-bold text-lg md:text-xl mb-2 text-gray-900">{t.label}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{t.desc}</p>
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
      <section id="resources" className={`${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} py-24 px-4 md:px-16 relative overflow-hidden`}>
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
        </div>

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
      <section id="faqs" className={`${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-500 to-orange-600'} py-24 px-4 md:px-16 relative text-white overflow-hidden`}>
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
        </div>

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
      <section id="contact" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-32 px-4 md:px-16`}>
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
              <form className="space-y-6">
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
                <button 
                  type="submit" 
                  className="w-full bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-all transform hover:-translate-y-1 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Message
                </button>
              </form>

              {/* Additional Contact Info */}
              <div className={`mt-12 pt-8 border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <h3 className={`text-2xl font-semibold mb-6 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  <span className="flex items-center">
                    <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Stay Updated
                  </span>
                </h3>
                <div className="space-y-6">
                  <p className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                    Subscribe to our newsletter for the latest insights and updates in AI technology
                  </p>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className={`flex-1 px-6 py-4 rounded-xl transition-all ${
                        isDarkMode 
                          ? `${contactFormInputStyles.dark.backgroundColor} ${contactFormInputStyles.dark.borderColor} ${contactFormInputStyles.dark.textColor} ${contactFormInputStyles.dark.placeholderColor}`
                          : `${contactFormInputStyles.light.backgroundColor} ${contactFormInputStyles.light.borderColor} ${contactFormInputStyles.light.textColor} ${contactFormInputStyles.light.placeholderColor}`
                      }`}
                    />
                    <button className="bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-all transform hover:-translate-y-1">
                      Subscribe
                    </button>
                  </div>
                  <div className="flex justify-center space-x-4 pt-4">
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Support Section */}
            <div className="flex-1 flex flex-col">
              {/* Live Support Box */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white shadow-xl mb-12" data-aos="fade-up">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Live Chat</h3>
                    <p className="text-white/80">Start a conversation</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button className="flex-1 bg-white text-orange-500 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:-translate-y-1">
                    Start Chat
                  </button>
                  <button className="flex-1 bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all transform hover:-translate-y-1">
                    Schedule Call
                  </button>
                </div>
              </div>

              {/* Interactive Support Person */}
              <div className="relative mb-12" data-aos="fade-up">
                <div className="w-full h-96 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-3xl overflow-hidden">
                  {/* Speech Bubbles */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 bg-white rounded-2xl p-4 shadow-xl animate-bounce z-10" style={{ animationDuration: '2s' }}>
                    <div className="relative">
                      <p className="text-gray-800 font-medium text-lg">Hi! How can I help you today?</p>
                      <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white transform rotate-45"></div>
                    </div>
                  </div>

                  <div className="absolute top-32 right-8 w-64 bg-orange-500 rounded-2xl p-4 shadow-xl animate-bounce z-10" style={{ animationDuration: '2s', animationDelay: '0.5s' }}>
                    <div className="relative">
                      <p className="text-white font-medium text-lg">I'm here to answer all your questions!</p>
                      <div className="absolute -bottom-2 right-6 w-4 h-4 bg-orange-500 transform rotate-45"></div>
                    </div>
                  </div>

                  {/* Support Person */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-72 h-72">
                      {/* Animated Background Rings */}
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 rounded-full border-4 border-orange-500/20 animate-ping" style={{ animationDuration: '3s' }}></div>
                        <div className="absolute inset-4 rounded-full border-4 border-orange-500/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
                        <div className="absolute inset-8 rounded-full border-4 border-orange-500/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
                      </div>

                      {/* Glowing Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded-full animate-pulse blur-xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full animate-pulse"></div>
                      
                      {/* Support Person Image with Live Effect */}
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww" 
                          alt="Support Team" 
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                        {/* Live Video Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent animate-pulse"></div>
                  </div>

                      {/* Status Badge with Enhanced Animation */}
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl">
                        <span className="text-orange-500 text-sm font-semibold flex items-center">
                          <span className="relative flex h-3 w-3 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                          </span>
                          Live Now
                        </span>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute -top-4 -left-4 w-8 h-8 bg-orange-500/20 rounded-full animate-pulse"></div>
                      <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-orange-500/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  </div>

                  {/* Bottom Speech Bubble */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-72 bg-white rounded-2xl p-4 shadow-xl animate-bounce z-10" style={{ animationDuration: '2s', animationDelay: '1s' }}>
                    <div className="relative">
                      <p className="text-gray-800 font-medium text-lg">Feel free to ask anything!</p>
                      <div className="absolute -top-2 left-6 w-4 h-4 bg-white transform rotate-45"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="text-right mt-auto" data-aos="fade-left">
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
      <footer className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-900'} text-white py-6`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm"
        >
          © {new Date().getFullYear()} Enable Intelligence. All rights reserved.
        </motion.div>
      </footer>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Energy Lines from Edges */}
            {[
              { from: 'top', rotate: 0, delay: 0.3 },
              { from: 'right', rotate: 90, delay: 0.4 },
              { from: 'bottom', rotate: 180, delay: 0.5 },
              { from: 'left', rotate: 270, delay: 0.6 }
            ].map((direction, index) => (
              <motion.div
                key={`energy-${index}`}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: direction.delay }}
              >
                {/* Main Energy Line */}
                <motion.div
                  className="absolute w-[200%] h-2 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600"
                  style={{
                    transform: `rotate(${direction.rotate}deg)`,
                    transformOrigin: 'center',
                    opacity: 0.9
                  }}
                  initial={{ 
                    scale: 0,
                    opacity: 0,
                    x: direction.from === 'left' ? '-100%' : direction.from === 'right' ? '100%' : 0,
                    y: direction.from === 'top' ? '-100%' : direction.from === 'bottom' ? '100%' : 0
                  }}
                      animate={{
                    scale: [0, 1],
                    opacity: [0, 0.9, 0],
                    x: 0,
                    y: 0
                  }}
                      transition={{ 
                    duration: 1.2,
                    delay: direction.delay,
                        ease: "easeOut"
                      }}
                    >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 animate-pulse"></div>
                </motion.div>

                {/* Energy Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`particle-${index}-${i}`}
                    className="absolute w-1 h-1 bg-orange-500 rounded-full"
                    style={{
                      transform: `rotate(${direction.rotate}deg)`,
                      transformOrigin: 'center'
                    }}
                    initial={{ 
                      scale: 0,
                      opacity: 0,
                      x: direction.from === 'left' ? '-100%' : direction.from === 'right' ? '100%' : 0,
                      y: direction.from === 'top' ? '-100%' : direction.from === 'bottom' ? '100%' : 0
                    }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.8, 0],
                      x: [0, Math.cos(i * 45 * Math.PI / 180) * 100],
                      y: [0, Math.sin(i * 45 * Math.PI / 180) * 100]
                    }}
                    transition={{
                      duration: 1,
                      delay: direction.delay + i * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-600 via-orange-500 to-orange-600 animate-pulse"></div>
                  </motion.div>
                ))}
              </motion.div>
            ))}

            {/* Letters Container */}
            <div className="relative flex items-center justify-center">
              {/* Initial White EI */}
              <motion.div
                className="text-[15rem] font-black text-white relative"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                EI
              </motion.div>

              {/* Charging Effect */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                {/* Charging Animation */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <motion.span
                    className="text-[15rem] font-black text-orange-500 relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    EI
                  </motion.span>
                </motion.div>

                {/* Power Core Effect */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.2 }}
                >
                  {/* Core Glow */}
                  <div className="absolute inset-0 bg-orange-500 rounded-full animate-pulse opacity-30 blur-xl"></div>
                  
                  {/* Power Rings */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`ring-${i}`}
                      className="absolute inset-0 border-2 border-orange-500 rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 0.4, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        delay: 1.2 + i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>

                {/* Energy Burst Effect */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.5 }}
                >
                  {[...Array(24)].map((_, i) => (
                    <motion.div
                      key={`burst-${i}`}
                      className="absolute w-1 h-1 bg-orange-500 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${i * 15}deg)`
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 2, 0],
                        opacity: [0, 1, 0],
                        x: [
                          0,
                          Math.cos(i * Math.PI / 12) * 200,
                          Math.cos(i * Math.PI / 12) * 300
                        ],
                        y: [
                          0,
                          Math.sin(i * Math.PI / 12) * 200,
                          Math.sin(i * Math.PI / 12) * 300
                        ]
                      }}
                      transition={{ 
                        duration: 1.5,
                        delay: 1.5 + i * 0.05,
                        ease: "easeOut"
                      }}
                    >
                      <div className="absolute inset-0 bg-white/50 rounded-full blur-sm"></div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Electric Lines */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`electric-${i}`}
                    className="absolute w-1 h-32 bg-gradient-to-b from-orange-500 to-transparent"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) rotate(${i * 45}deg)`
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0]
                    }}
                    transition={{
                      duration: 1,
                      delay: 1.8 + i * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-sm"></div>
                  </motion.div>
                ))}
              </motion.div>
                  </div>
          </motion.div>
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


