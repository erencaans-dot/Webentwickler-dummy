"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
    const scrollToContact = () => {
        const element = document.getElementById("contact-section");
        element?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToDemos = () => {
        const element = document.getElementById("portals-section");
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden px-4 pt-8 md:pt-32">
            {/* Background gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-neon-cyan)]/10 rounded-full blur-[120px] opacity-70 pointer-events-none" />
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--color-electric-purple)]/10 rounded-full blur-[100px] opacity-60 pointer-events-none" />

            <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-white/10"
                >
                    <span className="w-2 h-2 rounded-full bg-[var(--color-glowing-green)] shadow-[0_0_8px_var(--color-glowing-green)] animate-pulse" />
                    <span className="text-sm font-medium tracking-wide text-neutral-300">System Online // Hub-Zugriff gewährt</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight"
                >
                    Professionelle <br className="hidden md:block" />
                    <span className="text-glow-cyan text-[var(--color-neon-cyan)]">Websites</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12"
                >
                    Ich erstelle moderne, schnelle und ansprechende Websites für Ihr Unternehmen.
                </motion.p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToDemos}
                        className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                    >
                        Live Demos ansehen
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToContact}
                        className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-electric-purple)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                            Projekt starten
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </motion.button>
                </div>
            </div>
        </section>
    );
};
