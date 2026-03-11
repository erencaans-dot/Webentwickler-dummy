"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { TiltCardDemo } from "./TiltCardDemo";
import { PriceConfigurator } from "./PriceConfigurator";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

const features = [
    {
        id: "slider",
        title: "Vorher/Nachher Vergleiche",
        component: <BeforeAfterSlider />,
    },
    {
        id: "3d",
        title: "3D Interaktionen",
        component: <TiltCardDemo />,
    },
    {
        id: "configurator",
        title: "Dynamische Rechner",
        component: <PriceConfigurator />,
    },
];

export const FeatureCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
        }),
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => {
            let nextIndex = prev + newDirection;
            if (nextIndex < 0) nextIndex = features.length - 1;
            if (nextIndex >= features.length) nextIndex = 0;
            return nextIndex;
        });
    };

    return (
        <section className="relative py-12 md:py-24 px-4 overflow-hidden bg-black/40 border-y border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 md:mb-12">
                    <div className="inline-block px-2 md:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-semibold text-[var(--color-electric-purple)] mb-2 md:mb-4">
                        Meine Arbeitsweise
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4">Digitale Erlebnisse</h2>
                    <p className="text-xs md:text-base text-neutral-400 max-w-xl mx-auto">
                        Entdecken Sie einige der interaktiven Bausteine, die ich in Projekte integriere, um Ihre Webseite lebendig zu machen und Nutzer zu begeistern.
                    </p>
                </div>

                <div className="relative min-h-[400px] md:min-h-[600px] md:h-[600px] w-full flex items-center justify-center perspective-[1000px] pb-12 md:pb-0">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.2 },
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute w-full h-full flex items-center justify-center p-4"
                        >
                            {features[currentIndex].component}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
                        <button
                            className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors"
                            onClick={() => paginate(-1)}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="flex gap-2">
                            {features.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "w-8 bg-white" : "bg-white/20"
                                        }`}
                                />
                            ))}
                        </div>
                        <button
                            className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors"
                            onClick={() => paginate(1)}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
