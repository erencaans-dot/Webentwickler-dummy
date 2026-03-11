"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { CarFront, Camera, ChevronDown, Wrench, CalendarCheck, ShieldCheck, CheckCircle2, MapPin, Menu, X } from "lucide-react";
import { Car } from "./data";

export const CarVisual = ({ car, large = false }: { car: Car; large?: boolean }) => (
    <div className={`relative ${large ? "aspect-[16/9]" : "aspect-[16/10]"} bg-gradient-to-br ${car.theme.from} ${car.theme.to} flex flex-col items-center justify-center gap-3 overflow-hidden`}>
        {/* Mesh grid */}
        <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        {/* Animated shimmer sweep */}
        <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut", repeatDelay: 1.2 }}
            className={`absolute inset-0 bg-gradient-to-r from-transparent ${car.theme.shimmer} to-transparent skew-x-[-20deg]`}
        />
        {/* Soft glow orb */}
        <div className="absolute w-40 h-40 rounded-full blur-3xl opacity-15 bg-white" />
        {/* Icon */}
        <CarFront className={`${large ? "w-24 h-24" : "w-16 h-16"} ${car.theme.accent} relative z-10`} strokeWidth={0.8} />
        <span className={`relative z-10 text-xs font-bold uppercase tracking-widest ${car.theme.accent} opacity-60`}>
            {car.bodyType}
        </span>
        {/* Photo counter */}
        <div className="absolute top-3 right-3 bg-black/40 border border-white/20 backdrop-blur-sm rounded-lg px-2.5 py-1 text-white text-xs font-semibold flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 opacity-70" />
            1 / {car.photoCount}
        </div>
    </div>
);

// ─── Premium Header ───────────────────────────────────────────────────────────
const NAV_ITEMS = [
    { label: "Startseite", href: "/autohaendler", hasDropdown: false },
    { label: "Fahrzeugverkauf", href: "/autohaendler/verkauf", hasDropdown: false },
    { label: "Fahrzeugankauf", href: "/autohaendler/ankauf", hasDropdown: false },
    {
        label: "Werkstatt & Service", href: "/autohaendler/werkstatt", hasDropdown: true,
        dropdown: [
            { icon: <Wrench className="w-4 h-4" />, label: "Werkstattleistungen", desc: "Inspektion, Reparatur & mehr", href: "/autohaendler/werkstatt" },
            { icon: <CalendarCheck className="w-4 h-4" />, label: "Servicetermin anfragen", desc: "Online-Terminbuchung", href: "/autohaendler/termin" },
        ],
    },
    {
        label: "Unternehmen", href: "/autohaendler/unternehmen/ueber-uns", hasDropdown: true, dropdown: [
            { icon: <ShieldCheck className="w-4 h-4" />, label: "Über uns", desc: "Team & Geschichte", href: "/autohaendler/unternehmen/ueber-uns" },
            { icon: <MapPin className="w-4 h-4" />, label: "Standort & Anfahrt", desc: "Öffnungszeiten & Karte", href: "/autohaendler/unternehmen/standort" },
        ]
    },
];

export const PremiumHeader = () => {
    const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
    const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
    const [scrolled, setScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [expandedMobileItem, setExpandedMobileItem] = React.useState<string | null>(null);
    const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", v => setScrolled(v > 20));

    const openDropdown = (label: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setActiveDropdown(label); };
    const closeDropdown = () => { closeTimer.current = setTimeout(() => setActiveDropdown(null), 120); };

    return (
        <>
            {/* Trust Bar */}
            <div className="bg-[#0A4B8F] text-white py-2 px-4 flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[10px] sm:text-xs font-semibold">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> 12 Monate Garantie</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> TÜV/AU Neu</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Geprüfte Qualität</span>
            </div>

            {/* Main Header */}
            <motion.header
                animate={{ height: scrolled ? 64 : 80, backdropFilter: scrolled ? "blur(20px)" : "blur(0px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm"
            >
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-8">

                    {/* Logo */}
                    <Link href="/autohaendler" className="flex-shrink-0 block">
                        <span className="text-xl font-black tracking-tighter text-slate-900">
                            Autohaus<span className="text-[#0A4B8F]"> Mustermann</span>
                        </span>
                        <div className="text-[10px] font-medium text-slate-400 tracking-widest uppercase">Demo-Showroom</div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1" onMouseLeave={() => { setHoveredItem(null); }}>
                        {NAV_ITEMS.map(item => (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => { setHoveredItem(item.label); if (item.hasDropdown) openDropdown(item.label); }}
                                onMouseLeave={() => { if (item.hasDropdown) closeDropdown(); }}
                            >
                                {item.hasDropdown ? (
                                    <button className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-lg">
                                        {item.label}
                                        <ChevronDown
                                            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`}
                                        />
                                        {/* Sliding underline */}
                                        {hoveredItem === item.label && (
                                            <motion.span
                                                layoutId="nav-underline"
                                                className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0A4B8F] rounded-full"
                                                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                                            />
                                        )}
                                    </button>
                                ) : (
                                    <Link href={item.href} className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-lg">
                                        {item.label}
                                        {/* Sliding underline */}
                                        {hoveredItem === item.label && (
                                            <motion.span
                                                layoutId="nav-underline"
                                                className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0A4B8F] rounded-full"
                                                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                                            />
                                        )}
                                    </Link>
                                )}

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {item.hasDropdown && activeDropdown === item.label && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: -4 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                            transition={{ duration: 0.18, ease: "easeOut" }}
                                            onMouseEnter={() => openDropdown(item.label)}
                                            onMouseLeave={closeDropdown}
                                            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200/70 shadow-2xl shadow-slate-200/60 overflow-hidden z-50"
                                        >
                                            <div className="p-2">
                                                {item.dropdown?.map(d => (
                                                    <Link
                                                        key={d.label}
                                                        href={d.href || "#"}
                                                        className="w-full flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors text-left group block"
                                                    >
                                                        <span className="text-[#0A4B8F] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                                                            {d.icon}
                                                        </span>
                                                        <div>
                                                            <div className="text-sm font-semibold text-slate-900">{d.label}</div>
                                                            <div className="text-xs text-slate-400 mt-0.5">{d.desc}</div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}

                        {/* CTAs */}
                        <div className="flex items-center gap-2 ml-3">
                            <Link
                                href="#termin"
                                className="px-5 py-2 text-sm font-semibold text-white bg-[#0A4B8F] rounded-full hover:bg-[#083a70] transition-all duration-200"
                            >
                                Termin vereinbaren
                            </Link>
                            <Link
                                href="#kontakt"
                                className="px-5 py-2 text-sm font-semibold text-slate-900 border border-slate-900 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-200"
                            >
                                Kontakt anfragen
                            </Link>
                        </div>
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="block md:hidden p-2 text-slate-800 focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col z-50 overflow-hidden md:hidden"
                        >
                            {NAV_ITEMS.map((item) => (
                                <div key={item.label}>
                                    {item.hasDropdown ? (
                                        <button
                                            onClick={() => setExpandedMobileItem(expandedMobileItem === item.label ? null : item.label)}
                                            className="w-full text-left px-5 py-3.5 text-base font-semibold text-slate-800 border-b border-slate-100 flex items-center justify-between"
                                        >
                                            {item.label}
                                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandedMobileItem === item.label ? 'rotate-180' : ''}`} />
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block px-5 py-3.5 text-base font-semibold text-slate-800 border-b border-slate-100 flex items-center justify-between"
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                    {/* Sub-items (Unterreiter) for mobile */}
                                    <AnimatePresence>
                                        {item.hasDropdown && item.dropdown && expandedMobileItem === item.label && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="bg-slate-50 flex flex-col overflow-hidden"
                                            >
                                                {item.dropdown.map(sub => (
                                                    <Link
                                                        key={sub.label}
                                                        href={sub.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="py-2.5 pl-10 pr-5 text-sm font-medium text-slate-600 hover:text-[#0A4B8F] border-b border-slate-100/50 flex items-center gap-3"
                                                    >
                                                        <span className="text-[#0A4B8F] opacity-80">{sub.icon}</span>
                                                        {sub.label}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                            <div className="px-5 py-5 flex flex-col gap-3">
                                <Link
                                    href="#kontakt"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-xl transition-all duration-200"
                                >
                                    Kontakt anfragen
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
};
