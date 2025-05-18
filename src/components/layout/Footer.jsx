import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`${isDarkMode ? 'bg-gray-900/90' : 'bg-gray-900/90'} text-white py-6 backdrop-blur-sm`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-sm"
      >
        © {new Date().getFullYear()} Enable Intelligence. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
