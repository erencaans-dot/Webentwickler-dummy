"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const portals = [
    {
        id: "ecommerce",
        title: "Autohaus & Katalog",
        tag: "Data-Driven UI",
        glow: "shadow-[0_0_30px_-5px_var(--color-electric-purple)]",
        image: "/videos/AutoGangBild.jpg",
        href: "/autohaendler",
    },
    {
        id: "taxi",
        title: "Transport & Taxi",
        tag: "Conversion First",
        glow: "shadow-[0_0_30px_-5px_var(--color-neon-cyan)]",
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop",
        href: "/taxi",
    },
    {
        id: "corporate",
        title: "Corporate Agency",
        tag: "Trust & Metrics",
        glow: "shadow-[0_0_30px_-5px_var(--color-glowing-green)]",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
        href: "/corporate",
    },
    {
        id: "gastro",
        title: "Gastronomie",
        tag: "Emotionale Ästhetik",
        glow: "shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)]",
        image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop",
        href: "/gastro",
    },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const PortalsSection = () => {
    return (
        <section id="portals-section" className="relative pt-16 pb-24 md:py-32 px-4 z-10 max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-20 max-w-3xl mx-auto">
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[var(--color-neon-cyan)] mb-4 uppercase tracking-widest">
                    Live Demos
                </div>
                <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 tracking-tight flex flex-wrap justify-center gap-x-2 md:gap-x-3 gap-y-1">
                    <span>Klickbare</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-electric-purple)] whitespace-nowrap">Branchen-Demos</span>
                </h2>
                <p className="text-neutral-400 text-sm md:text-lg">
                    Minimalistisch, extrem schnell und konversionsstark.
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-2 gap-3 md:gap-8 max-w-5xl mx-auto"
            >
                {portals.map((portal) => {
                    return (
                        <motion.div
                            key={portal.id}
                            variants={itemVariants}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                            <Link href={portal.href} className="block group">
                                <div className="glass-card relative w-full aspect-[4/5] md:aspect-video p-4 md:p-8 flex flex-col justify-end overflow-hidden transition-all duration-700 hover:border-white/20 active:border-white/20">

                                    {/* Background Image */}
                                    <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none">
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 active:bg-black/20 transition-colors duration-300 z-10" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10" />
                                        <Image
                                            src={portal.image}
                                            alt={portal.title}
                                            fill
                                            className="object-cover scale-105 group-hover:scale-100 active:scale-100 transition-transform duration-700 ease-out opacity-80"
                                        />
                                    </div>

                                    {/* Animated Background Glow — auch bei :active sichtbar */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center z-10">
                                        <div className={`w-48 h-48 rounded-full blur-[80px] ${portal.glow}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-20 flex flex-col items-start translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-sm md:text-3xl font-bold mb-0.5 md:mb-2 text-white leading-tight">{portal.title}</h3>
                                        <p className="text-[9px] md:text-sm font-medium text-neutral-300 uppercase tracking-widest mb-0.5 md:mb-2 drop-shadow-md">
                                            {portal.tag}
                                        </p>
                                    </div>

                                    {/* Arrow */}
                                    <div className="hidden md:flex absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 z-20">
                                        <ChevronRight className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}

            </motion.div>
        </section >
    );
};
