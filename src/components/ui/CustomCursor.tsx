"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Always call hooks unconditionally
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);
    const glowX = useMotionValue(0);
    const glowY = useMotionValue(0);
    const glowXSpring = useSpring(glowX, { damping: 40, stiffness: 200 });
    const glowYSpring = useSpring(glowY, { damping: 40, stiffness: 200 });

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
            glowX.set(e.clientX - 200 + 16);
            glowY.set(e.clientY - 200 + 16);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", moveCursor);
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [cursorX, cursorY, glowX, glowY]);

    // Render nothing until client-side hydration is complete
    if (!mounted) return null;

    // Optional: Hide entirely on smaller screens if desired
    if (!isVisible && window.innerWidth > 768) return null;

    return (
        <>
            {/* Small dot cursor */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>

            {/* Flashlight glow effect */}
            <motion.div
                className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 hidden md:block"
                style={{
                    x: glowXSpring,
                    y: glowYSpring,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
            >
                <div className="w-full h-full rounded-full bg-neon-cyan/20 blur-[100px] opacity-30" />
            </motion.div>
        </>
    );
};
