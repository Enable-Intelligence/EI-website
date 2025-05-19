import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from '@emailjs/browser';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/layout/LoadingScreen';
import Home from './components/sections/Home';
import Solutions from './components/sections/Solutions';
import Technology from './components/sections/Technology';
import Resources from './components/sections/Resources';
import FAQs from './components/sections/FAQs';
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
      <Solutions isMobile={isMobile} />

      {/* TECHNOLOGY SECTION */}
      <Technology isDarkMode={isDarkMode} />

      {/* RESOURCES SECTION */}
      <Resources isDarkMode={isDarkMode} />

      {/* FAQS SECTION */}
      <FAQs isDarkMode={isDarkMode} />

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