import logo from '../../../assets/logo.png';
import { motion } from 'framer-motion';

export default function Hero({ isDarkMode }) {
  return (
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
  );
}
