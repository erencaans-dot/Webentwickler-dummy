"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

export const TiltCardDemo = () => {
    return (
        <div className="flex flex-row gap-8 md:gap-12 justify-center items-center w-full py-2 md:py-10">
            <TiltCard
                title="Innovation. Skalierbar."
                subtitle="Modernste Architektur"
                color="from-[var(--color-neon-cyan)] to-black"
                delay={0}
            />
            <TiltCard
                title="Flüssig wie Wasser."
                subtitle="Perfekte UX, 60fps."
                color="from-[var(--color-electric-purple)] to-black"
                delay={0.2}
            />
        </div>
    );
};

const TiltCard = ({ title, subtitle, color, delay }: { title: string; subtitle: string; color: string; delay: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            style={{ perspective: 1000 }}
            className="shrink-0 w-32 sm:w-40 md:w-64 h-44 sm:h-52 md:h-80"
        >
            <motion.div
                style={{ x, y, rotateX, rotateY, z: 100, WebkitMaskImage: "-webkit-radial-gradient(white, white)" }}
                drag
                dragElastic={0.18}
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                whileTap={{ cursor: "grabbing" }}
                className={`w-full h-full rounded-2xl p-3 sm:p-4 md:p-6 flex flex-col justify-end relative shadow-2xl bg-gradient-to-br ${color} cursor-grab`}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl z-0" />
                <div className="absolute inset-0 border border-white/20 rounded-2xl z-10 pointer-events-none" />

                <div className="relative z-20 transform translate-z-10 text-white">
                    <p className="text-[8px] md:text-xs uppercase tracking-widest text-white/70 mb-1 md:mb-2 leading-tight">{subtitle}</p>
                    <h4 className="text-sm md:text-2xl font-bold leading-tight">{title}</h4>
                </div>
            </motion.div>
        </motion.div>
    );
};
