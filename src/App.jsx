import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from '@emailjs/browser';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/layout/LoadingScreen'
import Home from './components/sections/Home';
import Solutions from './components/sections/Solutions';
import Technology from './components/sections/Technology';
import Resources from './components/sections/Resources';
import FAQs from './components/sections/FAQs';
import Contact from './components/sections/Contact';

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
      <Contact
  isDarkMode={isDarkMode}
  formData={formData}
  handleInputChange={handleInputChange}
  handleSubmit={handleSubmit}
  formStatus={formStatus}
  contactFormInputStyles={contactFormInputStyles}
/>


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