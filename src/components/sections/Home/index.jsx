import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import Hero from './Hero';

export default function Home({ isDarkMode, isMobile }) {
  return (
    <section id="home" className="min-h-screen flex flex-col lg:flex-row relative pt-16">
      {/* LEFT */}
      <Hero isDarkMode={isDarkMode} />

      {/* RIGHT – paste the “Right Content” div exactly as-is,
         but replace the long <p> block with <AnimatedText isMobile={isMobile}/> */}
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
                    <AnimatedText isMobile={isMobile} />
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
  );
}