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
  const [techSectionScrollProgress, setTechSectionScrollProgress] = useState(0);
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
  }, []);

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
      <section id="home" className={`pt-16 min-h-screen flex flex-col lg:flex-row overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-white'} relative`}>
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
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative z-10">
          {/* Logo and Content */}
          <div className="relative">
            <div className="flex justify-center items-center h-40 mb-8 relative">
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

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
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
                  <br />
                  <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Where AI Meets Innovation</span>
                </h1>
              </motion.div>

              <motion.p 
                className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-200' : 'text-gray-600'} leading-relaxed`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Empowering Industries with Next-Generation Adaptive AI
                At Enable Intelligence, we are revolutionizing the future of business through cutting-edge artificial intelligence solutions. Our mission is to unlock the full potential of adaptive AI by seamlessly integrating advanced technologies with human insight. From manufacturing and healthcare to finance and beyond, we help organizations transform, innovate, and thrive in a rapidly evolving digital landscape. By bridging the gap between technology and human potential, we empower industries to make smarter decisions, automate complex processes, and create meaningful impact at scale.
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button 
                  className="group relative px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold overflow-hidden" 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="relative z-10 group-hover:text-black">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <button 
                  className="group relative px-8 py-4 bg-white text-orange-500 rounded-xl font-semibold border-2 border-orange-500 overflow-hidden" 
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
        <div className="flex-1 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center p-8 relative overflow-hidden">
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
      <section id="solutions" className={`py-16 px-4 md:px-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-4xl font-extrabold text-orange-500 mb-4 md:mb-0">Solutions</h2>
            <h3 className="text-3xl font-extrabold text-gray-900 text-center md:text-right">
              Shaping Tomorrow with <span className="text-orange-500">Intelligence</span> Today
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="group relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 overflow-hidden" 
                data-aos="zoom-in" 
                data-aos-delay={i * 100}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setActiveCard(activeCard === i ? null : i);
                  }
                }}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl animate-pulse"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
                </div>

                {/* Content Container */}
                <div className="relative z-10">
                  <h4 className={`text-2xl font-bold text-orange-500 mb-4 transition-all duration-300 ${
                    activeCard === i ? 'opacity-0' : 'opacity-100'
                  }`}>{s.title}</h4>
                  <div className="relative h-48 mb-6">
                    <img 
                      src={s.img} 
                      alt={s.title} 
                      className={`w-full h-full object-contain transition-all duration-300 ${
                        activeCard === i ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                  </div>
                  {/* Hover/Tap Reveal Overlay */}
                  <div 
                    className={`absolute inset-0 bg-orange-500/90 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center p-6 z-20 ${
                      activeCard === i ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <motion.p 
                      className="text-white text-sm"
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
                <div className="absolute bottom-2 right-2 md:hidden">
                  <span className="text-xs text-gray-400">
                    {activeCard === i ? 'Tap to close' : 'Tap to view details'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section id="technology" ref={techSectionRef} className={`py-16 px-4 md:px-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} relative overflow-hidden`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-4xl font-extrabold text-orange-500 mb-4 md:mb-0">Technology</h2>
            <h3 className="text-3xl font-extrabold text-gray-900 text-center md:text-right">
              Powering Innovation with <span className="text-orange-500">Advanced AI</span>
            </h3>
          </div>
          
          {/* EI Animation */}
          <div className="relative h-64 flex items-center justify-center mb-16">
            <motion.div
              className="text-8xl font-black relative"
              animate={isTechSectionVisible ? {
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className={`${eiSplit ? 'inline-block' : 'hidden'}`}>
                <motion.span
                  className="text-orange-500"
                  animate={isTechSectionVisible ? {
                    x: [-20, 0, -20],
                    opacity: [0.5, 1, 0.5]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  E
                </motion.span>
                <motion.span
                  className="text-orange-500"
                  animate={isTechSectionVisible ? {
                    x: [20, 0, 20],
                    opacity: [0.5, 1, 0.5]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2
                  }}
                >
                  I
                </motion.span>
              </span>
              <span className={`${!eiSplit ? 'inline-block' : 'hidden'} text-orange-500`}>EI</span>
            </motion.div>
            
            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Left Side Design */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-xl"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-orange-500/30 to-transparent rounded-full blur-lg"></div>
                <div className="absolute inset-8 bg-gradient-to-br from-orange-500/40 to-transparent rounded-full"></div>
              </div>
              
              {/* Right Side Design */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32">
                <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full blur-xl"></div>
                <div className="absolute inset-4 bg-gradient-to-bl from-orange-500/30 to-transparent rounded-full blur-lg"></div>
                <div className="absolute inset-8 bg-gradient-to-bl from-orange-500/40 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Technology Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: aiIcon,
                title: "AI Transformation",
                description: "Leverage cutting-edge artificial intelligence to transform your business processes and decision-making capabilities."
              },
              {
                icon: customizedIcon,
                title: "Customized Solutions",
                description: "Tailored AI solutions designed to meet your specific business needs and industry requirements."
              },
              {
                icon: scalableIcon,
                title: "Scalable Architecture",
                description: "Built on a robust, scalable architecture that grows with your business needs."
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <img src={feature.icon} alt={feature.title} className="w-16 h-16 mb-4" />
                <h4 className="text-xl font-bold text-orange-500 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESOURCES SECTION */}
      <section id="resources" className={`py-16 px-4 md:px-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-4xl font-extrabold text-orange-500 mb-4 md:mb-0">Resources</h2>
            <h3 className="text-3xl font-extrabold text-gray-900 text-center md:text-right">
              Knowledge Hub for <span className="text-orange-500">AI Excellence</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-xl overflow-hidden shadow-lg" data-aos="fade-right">
              <img src={resourceImg} alt="AI Resources" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">AI Insights Blog</h4>
                  <p className="text-gray-200 mb-4">Stay updated with the latest trends and insights in artificial intelligence.</p>
                  <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-6" data-aos="fade-left">
              {[
                {
                  title: "Case Studies",
                  description: "Explore real-world applications of our AI solutions across various industries."
                },
                {
                  title: "White Papers",
                  description: "In-depth analysis and research on AI implementation and best practices."
                },
                {
                  title: "Webinars",
                  description: "Join our expert-led sessions on AI transformation and digital innovation."
                }
              ].map((resource, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h4 className="text-xl font-bold text-orange-500 mb-2">{resource.title}</h4>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <button className="text-orange-500 hover:text-orange-600 font-semibold">
                    Learn More →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section id="faqs" className={`py-16 px-4 md:px-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-4xl font-extrabold text-orange-500 mb-4 md:mb-0">FAQs</h2>
            <h3 className="text-3xl font-extrabold text-gray-900 text-center md:text-right">
              Common Questions About <span className="text-orange-500">Our Solutions</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What industries do you serve?",
                answer: "We serve a wide range of industries including healthcare, manufacturing, finance, and retail. Our AI solutions are adaptable to various business needs and can be customized for specific industry requirements."
              },
              {
                question: "How long does implementation take?",
                answer: "Implementation time varies depending on the complexity of the solution and your specific requirements. Typically, basic implementations can be completed within 4-6 weeks, while more complex solutions may take 3-6 months."
              },
              {
                question: "What kind of support do you offer?",
                answer: "We provide comprehensive support including 24/7 technical assistance, regular updates, training sessions, and dedicated account management. Our team ensures you get the most out of your AI solution."
              },
              {
                question: "Is my data secure?",
                answer: "Yes, we take data security very seriously. Our solutions comply with industry standards and regulations, implementing robust encryption and security measures to protect your sensitive information."
              }
            ].map((faq, i) => (
              <div 
                key={i}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <h4 className="text-xl font-bold text-orange-500 mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className={`py-16 px-4 md:px-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-4xl font-extrabold text-orange-500 mb-4 md:mb-0">Contact</h2>
            <h3 className="text-3xl font-extrabold text-gray-900 text-center md:text-right">
              Let's Build Your <span className="text-orange-500">AI Future</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6" data-aos="fade-right">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h4 className="text-xl font-bold text-orange-500 mb-4">Get in Touch</h4>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode ? contactFormInputStyles.dark.backgroundColor : contactFormInputStyles.light.backgroundColor
                      } ${
                        isDarkMode ? contactFormInputStyles.dark.borderColor : contactFormInputStyles.light.borderColor
                      } ${
                        isDarkMode ? contactFormInputStyles.dark.textColor : contactFormInputStyles.light.textColor
                      } ${
                        isDarkMode ? contactFormInputStyles.dark.placeholderColor : contactFormInputStyles.light.placeholderColor
                      } focus:outline-none ${
                        isDarkMode ? contactFormInputStyles.dark.focusBorderColor : contactFormInputStyles.light.focusBorderColor
                      } ${
                        isDarkMode ? contactFormInputStyles.dark.focusRingColor : contactFormInputStyles.light.focusRingColor
                      }`}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode ? contactFormInputStyles.dark.backgroundColor : contactFormInputStyles.light.backgroundColor
                      } ${
                        isDarkMode ? contactFormInputStyles.dark.borderColor : contactFormInputStyles.light.borderColor
                      } ${
                        isDarkMode ? contactFormInputStyles.dark.textColor : contactFormInputStyles.light.textColor
                      } ${
                        isDarkMode ? contactFormInputStyles.dark.placeholderColor : contactFormInputStyles.light.placeholderColor
                      } focus:outline-none ${
                        isDarkMode ? contactFormInputStyles.dark.focusBorderColor : contactFormInputStyles.light.focusBorderColor
                      } ${
                        isDarkMode ? contactFormInputStyles.dark.focusRingColor : contactFormInputStyles.light.focusRingColor
                      }`}
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows="4"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isDarkMode ? contactFormInputStyles.dark.backgroundColor : contactFormInputStyles.light.backgroundColor
                      } ${
                        isDarkMode ? contactFormInputStyles.dark.borderColor : contactFormInputStyles.light.borderColor
                      } ${
                        isDarkMode ? contactFormInputStyles.dark.textColor : contactFormInputStyles.light.textColor
                      } ${
                        isDarkMode ? contactFormInputStyles.dark.placeholderColor : contactFormInputStyles.light.placeholderColor
                      } focus:outline-none ${
                        isDarkMode ? contactFormInputStyles.dark.focusBorderColor : contactFormInputStyles.light.focusBorderColor
                      } ${
                        isDarkMode ? contactFormInputStyles.dark.focusRingColor : contactFormInputStyles.light.focusRingColor
                      }`}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            
            <div className="space-y-6" data-aos="fade-left">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h4 className="text-xl font-bold text-orange-500 mb-4">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">contact@enableintelligence.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-600">123 AI Street, Tech City, TC 12345</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h4 className="text-xl font-bold text-orange-500 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {['twitter', 'linkedin', 'facebook', 'instagram'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;


