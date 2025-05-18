import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
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
    );
}

export default LoadingScreen;