import { motion } from 'framer-motion';
import './Loading.css';

export default function Loading({ message = "Loading..." }) {
    return (
        <div className="loading-container">
            <div className="loading-content">
                <motion.div
                    className="logo-loader"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <img src="/logo.png?v=2" alt="Merryland School" className="logo-image" />
                    <div className="logo-glow"></div>
                </motion.div>

                <div className="loading-bar">
                    <motion.div
                        className="loading-bar-fill"
                        animate={{
                            width: ["0%", "100%", "0%"]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                <p className="loading-message">{message}</p>

                {/* Animated dots */}
                <div className="loading-dots">
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                    >•</motion.span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                    >•</motion.span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                    >•</motion.span>
                </div>
            </div>
        </div>
    );
}
