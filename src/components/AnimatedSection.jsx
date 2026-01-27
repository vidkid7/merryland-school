import { motion } from 'framer-motion';

export default function AnimatedSection({
    children,
    className = '',
    animation = 'fadeInUp',
    delay = 0
}) {

    // Robust responsive animations
    const effectiveDelay = Math.min(delay * 0.001, 0.2);

    const variants = {
        fadeInUp: {
            hidden: { opacity: 0, y: 30 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut", delay: effectiveDelay }
            }
        },
        fadeInLeft: {
            hidden: { opacity: 0, x: -30 },
            visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, ease: "easeOut", delay: effectiveDelay }
            }
        },
        fadeInRight: {
            hidden: { opacity: 0, x: 30 },
            visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, ease: "easeOut", delay: effectiveDelay }
            }
        },
        scaleIn: {
            hidden: { opacity: 0, scale: 0.9 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.4, ease: "easeOut", delay: effectiveDelay }
            }
        },
        fadeIn: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { duration: 0.4, delay: effectiveDelay }
            }
        }
    };

    // Use simple mount animations to avoid any chance of sections not appearing
    // due to viewport / intersection-observer edge cases.
    return (
        <motion.div
            className={className}
            initial="hidden"
            animate="visible"
            variants={variants[animation] || variants.fadeIn}
        >
            {children}
        </motion.div>
    );
}
