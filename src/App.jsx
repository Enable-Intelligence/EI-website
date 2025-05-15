import React, { useEffect, useState } from "react";
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

function App() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ setCurrentSection] = useState("home");
  const [eiSplit, setEiSplit] = useState(false);
  const [isTechSectionVisible, setIsTechSectionVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
          setEiSplit(true);
        } else {
          setIsTechSectionVisible(false);
          setEiSplit(false);
        }
      },
      { threshold: 0.3 }
    );

    const techSection = document.getElementById("technology");
    if (techSection) observer.observe(techSection);
    return () => techSection && observer.unobserve(techSection);
  }, []);

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
                  <span className="text-gray-800">Where AI Meets Innovation</span>
                </h1>
              </motion.div>

              <motion.p 
                className="text-lg md:text-xl text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                We're a forward‑thinking, AI‑driven organization born from a vision to reimagine how industries operate. At Enable Intelligence, we don't just develop AI—we enable intelligence.
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button className="group relative px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold overflow-hidden" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                  <span className="relative z-10 group-hover:text-black">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <button className="group relative px-8 py-4 bg-white text-orange-500 rounded-xl font-semibold border-2 border-orange-500 overflow-hidden" onClick={() => document.getElementById("technology")?.scrollIntoView({ behavior: "smooth" })}>
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
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    Empowering
                  </motion.span><br />
                  <motion.span 
                    className="text-white inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    Decisions.
                  </motion.span><br />
                  <motion.span 
                    className="text-black inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    Enabling
                  </motion.span><br />
                  <motion.span 
                    className="text-white inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
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
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-4xl font-extrabold text-orange-500">Solutions</h2>
            <h3 className="text-3xl font-extrabold text-gray-900 text-right">
              Shaping Tomorrow with <span className="text-orange-500">Intelligence</span> Today
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "SPOCARE", img: solution1 },
              { title: "SPORTIFY IQ", img: solution2 },
              { title: "AESTHETIC AI", img: solution3 },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-lg shadow-md p-6 text-center" data-aos="zoom-in" data-aos-delay={i * 100}>
                <h4 className="text-2xl font-bold text-orange-500 mb-4">{s.title}</h4>
                <img src={s.img} alt={s.title} className="mx-auto mb-4 h-40 object-contain" />
                <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-full transition">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section id="technology" className={`relative ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} py-8 md:py-24 px-2 md:px-16 overflow-hidden w-full`}>
        {/* Modern Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
        </div>

        {/* Decorative Left Side Design - Hidden on Mobile */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-[600px] opacity-60 hidden md:block">
          <div className="relative w-full h-full">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent"></div>
            
            {/* Rotating Hexagons */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(5)].map((_, i) => (
                <div
                  key={`left-hex-${i}`}
                  className="absolute inset-0 border-2 border-orange-400/20"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    transform: `scale(${1 - i * 0.15}) rotate(${i * 45}deg)`
                  }}
                />
              ))}
            </motion.div>

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`left-particle-${i}`}
                className="absolute w-2 h-2 bg-orange-400/30 rounded-full"
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
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}

            {/* Energy Lines */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`left-line-${i}`}
                className="absolute h-1 bg-gradient-to-r from-orange-400/20 to-transparent"
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
        </div>

        {/* Decorative Right Side Design - Hidden on Mobile */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-[600px] opacity-60 hidden md:block">
          <div className="relative w-full h-full">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-l from-orange-500/5 to-transparent"></div>
            
            {/* Rotating Circles */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(5)].map((_, i) => (
                <div
                  key={`right-circle-${i}`}
                  className="absolute inset-0 border-2 border-orange-400/20 rounded-full"
                  style={{
                    transform: `scale(${1 - i * 0.15})`
                  }}
                />
              ))}
            </motion.div>

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`right-particle-${i}`}
                className="absolute w-2 h-2 bg-orange-400/30 rounded-full"
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
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}

            {/* Energy Lines */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`right-line-${i}`}
                className="absolute h-1 bg-gradient-to-l from-orange-400/20 to-transparent"
                style={{
                  right: '0',
                  top: `${i * 12}%`,
                  width: '100%',
                  transform: `rotate(${-i * 5}deg)`
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
        </div>

        <div className="w-full max-w-7xl mx-auto relative">
          {/* Modern Section Header - Mobile Optimized */}
          <div className="flex flex-col items-center text-center mb-8 md:mb-20 px-2 md:px-0" data-aos="fade-up" data-aos-duration="1000">
            <div className="inline-block bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-4 md:px-8 py-2 md:py-4 rounded-full mb-4 md:mb-6">
              <h2 className="text-2xl md:text-5xl font-black text-orange-500">Technology</h2>
            </div>
            <p className="text-sm md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              At the core of our platform lies a fusion of industry‑grade LLMs, optimized inference pipelines, and proprietary deployment frameworks.
            </p>
          </div>

          {/* Modern Animation - Mobile Optimized */}
          <div className="flex flex-col items-center justify-center mb-8 md:mb-24 px-2 md:px-0">
            <div 
              className="relative w-56 h-56 md:w-96 md:h-96 cursor-pointer select-none group"
              onClick={() => setEiSplit((v) => !v)}
            >
              {/* Main Circle */}
              <div className="absolute inset-0">
                {/* Outer Circle */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-300/20 to-orange-400/20"
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
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-xl"></div>
                </motion.div>

                {/* Inner Circle */}
                <motion.div
                  className="absolute inset-8 rounded-full bg-gradient-to-br from-orange-300/10 to-orange-400/10"
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
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-lg"></div>
                </motion.div>

                {/* Rotating Rings */}
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
                      className="absolute inset-0 rounded-full border-2 border-orange-400/20"
                      style={{
                        transform: `rotate(${i * 60}deg) scale(${1 - i * 0.1})`
                      }}
                    />
                  ))}
                </motion.div>
              </div>

              {/* EI Letters */}
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
                        {/* Outer Power Ring */}
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.2, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 z-10"
                        >
                          <div className="absolute inset-0 rounded-full border-4 border-orange-400/30 blur-sm"></div>
                          <div className="absolute inset-0 rounded-full border-2 border-orange-400/50"></div>
                        </motion.div>

                        {/* Spark Ring */}
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.5 }}
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

                        {/* Energy Burst */}
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 z-10"
                        >
                          {[...Array(24)].map((_, i) => (
                            <motion.div
                              key={`energy-burst-${i}`}
                              className="absolute w-1 h-1 bg-orange-400 rounded-full"
                              style={{
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) rotate(${i * 15}deg)`
                              }}
                              animate={{
                                scale: [0, 2, 0],
                                opacity: [0, 1, 0],
                                x: [
                                  0,
                                  Math.cos(i * Math.PI / 12) * 80,
                                  Math.cos(i * Math.PI / 12) * 120
                                ],
                                y: [
                                  0,
                                  Math.sin(i * Math.PI / 12) * 80,
                                  Math.sin(i * Math.PI / 12) * 120
                                ]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.05,
                                ease: "easeOut"
                              }}
                            >
                              <div className="absolute inset-0 bg-white/50 rounded-full blur-sm"></div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>

                  <motion.span
                    initial={{ x: 0, rotate: 0, opacity: 0 }}
                    animate={isTechSectionVisible ? 
                      (eiSplit ? { x: -170, rotate: -15, opacity: 1 } : { x: 0, rotate: 0, opacity: 1 }) : 
                      { x: 0, rotate: 0, opacity: 0 }
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
                    animate={isTechSectionVisible ? 
                      (eiSplit ? { x: 135, rotate: 15, opacity: 1 } : { x: 0, rotate: 0, opacity: 1 }) : 
                      { x: 0, rotate: 0, opacity: 0 }
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

              {/* Floating Text */}
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
            <motion.span 
              className="text-xs md:text-sm text-gray-500 mt-2 md:mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={isTechSectionVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Click to explore our technology
            </motion.span>
          </div>

          {/* Enhanced Features Grid - Mobile Optimized */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 px-2 md:px-0">
            {[
              { 
                icon: aiIcon, 
                label: "AI Transformation", 
                desc: "We turn raw data into predictive power through advanced machine learning algorithms and neural networks.",
                gradient: "from-orange-500/10 to-orange-600/10"
              },
              { 
                icon: customizedIcon, 
                label: "Customized AI Solutions", 
                desc: "Tailored pipelines designed specifically for your industry's unique challenges and requirements.",
                gradient: "from-orange-500/10 to-orange-600/10"
              },
              { 
                icon: scalableIcon, 
                label: "Scalable Solutions", 
                desc: "Enterprise-grade deployment frameworks that grow with your business needs.",
                gradient: "from-orange-500/10 to-orange-600/10"
              },
            ].map((t, i) => (
              <motion.div 
                key={i} 
                className="group relative bg-white rounded-xl md:rounded-3xl shadow-xl p-4 md:p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isTechSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 * i }}
              >
                {/* Enhanced Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} rounded-xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                
                {/* Enhanced Content */}
                <div className="relative z-10">
                  <div className="w-14 h-14 md:w-24 md:h-24 mb-4 md:mb-8 rounded-lg md:rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-3 md:p-6 transform group-hover:scale-110 transition-transform duration-700">
                    <img src={t.icon} alt={t.label} className="w-full h-full object-contain filter brightness-0 invert" />
                  </div>
                  <h3 className="font-bold text-lg md:text-2xl mb-2 md:mb-4 text-gray-900">{t.label}</h3>
                  <p className="text-xs md:text-base text-gray-600 leading-relaxed">{t.desc}</p>
                </div>

                {/* Enhanced Hover Effect Line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:w-1/2 group-hover:opacity-100 transition-all duration-700"></div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Additional Info - Mobile Optimized */}
          <motion.div 
            className="mt-8 md:mt-20 text-center px-2 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isTechSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="inline-block bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-4 md:px-8 py-2 md:py-4 rounded-full">
              <p className="text-sm md:text-lg text-gray-700 max-w-3xl mx-auto">
                Our technology stack is constantly evolving, incorporating the latest advancements in AI and machine learning to deliver cutting-edge solutions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RESOURCES SECTION */}
      <section id="resources" className={`${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} py-24 px-4 md:px-16 relative overflow-hidden`}>
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
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore our latest insights, articles, and guides to stay ahead in the world of AI
            </p>
          </div>

          {/* Featured Resource */}
          <div className="relative mb-16" data-aos="fade-up">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-96">
                  <img src={resourceImg} alt="Featured Resource" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Featured</span>
                    <h3 className="text-3xl font-bold mt-4">World Refugee Day 2030</h3>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <p className="text-gray-600 text-lg mb-6">
                    Join us in exploring the intersection of AI and humanitarian efforts. Discover how technology is shaping the future of refugee support and global aid.
                  </p>
                  <div className="flex items-center space-x-4">
                    <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all transform hover:-translate-y-1">
                      Read More
                    </button>
                    <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI in Healthcare",
                desc: "Exploring the future of medical diagnostics",
                tag: "Healthcare"
              },
              {
                title: "Machine Learning Basics",
                desc: "A comprehensive guide for beginners",
                tag: "Education"
              },
              {
                title: "Data Privacy",
                desc: "Best practices for secure AI implementation",
                tag: "Security"
              }
            ].map((r, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <span className="inline-block bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {r.tag}
                </span>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{r.title}</h4>
                <p className="text-gray-600 mb-6">{r.desc}</p>
                <div className="flex items-center justify-between">
                  <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                    Read Article
                  </button>
                  <span className="text-gray-400 text-sm">5 min read</span>
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
            <button className="bg-white text-orange-500 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:-translate-y-1">
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
            <h2 className="text-4xl font-black mb-4">Let's Talk</h2>
            <p className="text-xl text-gray-600">We're here to help and answer any questions you might have</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Contact Form */}
            <div className="flex-1 bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-xl" data-aos="fade-right">
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your name" 
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Message</label>
                  <textarea 
                    placeholder="How can we help?" 
                    rows={3} 
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" 
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all transform hover:-translate-y-1"
                >
                  Send Message
                </button>
              </form>

              {/* Additional Contact Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Contact Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">+91 82972 11188</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">support@enableintelligence.com</p>
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="mt-6 p-4 bg-orange-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Office Hours</p>
                      <p className="font-medium">Mon - Fri: 9:00 AM - 6:00 PM EST</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 flex justify-center space-x-4">
                  <a href="#" className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
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
    </div>
  );
}

export default App;

