"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BarChart3, Globe2, ShieldCheck, Mail, Linkedin, Building2, Phone, Hexagon, Triangle, Circle, Square, Star, User2, CheckCircle2 } from "lucide-react";

// --- Mock Data (alle Firmen & Personen sind FIKTIV / Demo-Platzhalter) ---
const PARTNERS = [
    { icon: Hexagon, name: "MusterTech GmbH" },
    { icon: Triangle, name: "Beispiel Systems AG" },
    { icon: Circle, name: "Demo Flow KG" },
    { icon: Square, name: "Platzhalter Data" },
    { icon: Star, name: "Mustermann IT" },
    { icon: Hexagon, name: "Demo Corp AG" },
    { icon: Triangle, name: "MusterTech GmbH" },
    { icon: Circle, name: "Beispiel Systems AG" },
];

const SERVICES = [
    { title: "Digital Strategy", icon: Globe2, desc: "Wir entwickeln datengetriebene Strategien für nachhaltiges Wachstum im digitalen Raum, speziell für B2B-Märkte." },
    { title: "Performance Marketing", icon: BarChart3, desc: "Maximierte ROIs durch präzises Targeting, klare KPIs und kontinuierliche A/B-Testing-Iterationen." },
    { title: "Cyber Security", icon: ShieldCheck, desc: "Enterprise-Grade Sicherheitsarchitekturen zum Schutz Ihrer sensibelsten Unternehmens- und Kundendaten." },
];

// Typografische Avatare statt Stockfotos
const TEAM = [
    { initials: "KM", name: "K. Mustermann", role: "Managing Director", color: "bg-[#0B1B3D]" },
    { initials: "MB", name: "M. Beispiel", role: "Head of Strategy", color: "bg-slate-700" },
    { initials: "SM", name: "S. Musterfrau", role: "Lead Consultant", color: "bg-emerald-800" },
    { initials: "DP", name: "D. Platzhalter", role: "Technical Director", color: "bg-slate-800" },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function CorporatePage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-white text-slate-800 font-sans">
            <AnimatePresence>
                {isSubmitted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full relative text-center shadow-2xl"
                        >
                            <CheckCircle2 className="text-emerald-400 mb-4 mx-auto w-12 h-12" />
                            <h3 className="text-2xl font-bold text-white mb-2">Beratungsanfrage erfolgreich!</h3>
                            <p className="text-slate-400 mb-6 text-sm">
                                Deine Anfrage für ein Erstgespräch ist sicher bei mir gelandet. Ich schaue mir deine Details an und melde mich in Kürze mit Terminvorschlägen bei dir.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                            >
                                Zurück zur Seite
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Header ─────────────────────────────────────────────── */}
            <header className="bg-white border-b border-slate-100 py-4 px-6 fixed top-0 w-full z-50 shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-2xl font-black text-[#0B1B3D] flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#0B1B3D] flex items-center justify-center rounded">
                            <span className="w-4 h-4 bg-[#10B981] block" />
                        </div>
                        Muster <span className="text-[#10B981] font-medium">Beratung GmbH</span>
                    </div>
                    <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
                        <a href="#services" className="hover:text-[#10B981] transition-colors">Leistungen</a>
                        <a href="#team" className="hover:text-[#10B981] transition-colors">Über uns</a>
                        <a href="#contact" className="hover:text-[#10B981] transition-colors">Kontakt</a>
                    </nav>
                    <a href="#contact" className="hidden md:flex px-6 py-2 bg-[#0B1B3D] text-white text-sm font-bold rounded-xl hover:bg-[#112a5e] transition-colors">
                        Beratung anfordern
                    </a>
                </div>
            </header>

            {/* ── Hero Section ────────────────────────────────────────── */}
            <section className="pt-40 pb-20 px-4 relative overflow-hidden">
                {/* Subtile Hintergrund-Tiefe */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[120px] opacity-40 pointer-events-none -translate-y-1/4 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-100 rounded-full blur-[100px] opacity-60 pointer-events-none" />

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 mt-4 relative z-10">
                    <motion.div
                        initial="hidden" animate="visible" variants={staggerContainer}
                        className="flex-1"
                    >
                        {/* Badge */}
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-sm font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Ihr B2B Wachstumspartner
                        </motion.div>

                        {/* Headline */}
                        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold text-[#0B1B3D] tracking-tight mb-8 leading-[1.1]">
                            Wir skalieren<br />
                            Unternehmen durch<br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-400">
                                klare Strategien.
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className="text-xl text-slate-600 max-w-xl mb-10 leading-relaxed">
                            Verlassen Sie sich auf datenbasierte Entscheidungen und Expertise aus über 150 Enterprise-Projekten. Wir optimieren Ihre digitalen Prozesse.
                        </motion.p>

                        {/* CTA mit Arrow-Animation */}
                        <motion.div variants={fadeUp}>
                            <a
                                href="#contact"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#10B981] text-white font-bold rounded-xl hover:bg-[#0d9b6b] shadow-lg shadow-emerald-500/30 transition-all duration-300 w-full md:w-auto justify-center"
                            >
                                Kostenlose Erstanalyse
                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Hero-Bild */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 hidden lg:block"
                    >
                        <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden relative shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop" alt="Demo: Consultants in a meeting" className="w-full h-full object-cover" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Marquee Trust Bar ───────────────────────────────────── */}
            <section className="py-10 border-y border-slate-100 bg-slate-50 overflow-hidden">
                <p className="text-center text-xs font-semibold text-slate-400 mb-6 uppercase tracking-widest">
                    Vertrauen von Branchenführern — alle Firmen sind fiktive Demo-Platzhalter
                </p>
                <div className="relative flex">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                        className="flex gap-16 items-center flex-shrink-0 pr-16"
                    >
                        {[...PARTNERS, ...PARTNERS].map((p, i) => (
                            <div key={i} className="flex items-center gap-2 text-slate-400 whitespace-nowrap">
                                <p.icon className="w-5 h-5" strokeWidth={1.5} />
                                <span className="text-base font-bold tracking-tight">{p.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Services Section ─────────────────────────────────────── */}
            <section id="services" className="py-28 relative">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial="hidden" whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                        className="mb-14 text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1B3D] tracking-tight mb-4">Unsere Expertise</h2>
                        <p className="text-lg text-slate-600 text-left max-w-2xl mx-auto">
                            Maßgeschneiderte Consulting-Ansätze, exakt zugeschnitten auf die Herausforderungen komplexer B2B-Märkte.
                        </p>
                    </motion.div>

                    {/* Horizontal Scroll auf Mobile */}
                    <div className="flex flex-row gap-5 overflow-x-auto snap-x snap-mandatory pb-4 px-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:px-0 scrollbar-hide">
                        {SERVICES.map((srv, i) => (
                            <div
                                key={i}
                                className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 hover:border-emerald-200 snap-start flex-shrink-0 w-[80vw] md:w-auto"
                            >
                                <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-6">
                                    <srv.icon className="w-7 h-7 text-[#0B1B3D]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#0B1B3D] mb-3 text-left">{srv.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm text-left">{srv.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Team Section — Typografische Avatare ─────────────────── */}
            <section id="team" className="py-28 px-4 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden" whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                        className="mb-14"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1B3D] tracking-tight mb-4">Das Führungsteam</h2>
                        <p className="text-lg text-slate-600 max-w-xl text-left">
                            Erfahrene Strategen, die fundiertes Wissen mit digitalem Innovationsgeist vereinen.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden" whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {TEAM.map((member, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                            >
                                {/* Typografischer Avatar */}
                                <div className={`w-20 h-20 rounded-2xl ${member.color} flex items-center justify-center mb-5 mx-auto`}>
                                    <span className="text-2xl font-black text-white tracking-tight">{member.initials}</span>
                                </div>
                                <h3 className="text-lg font-bold text-[#0B1B3D] mb-1 text-center">{member.name}</h3>
                                <p className="text-emerald-600 font-semibold text-sm mb-4 text-center">{member.role}</p>
                                <div className="flex gap-3 justify-center">
                                    <a href="#" className="text-slate-300 hover:text-[#0B1B3D] transition-colors"><Linkedin className="w-4 h-4" /></a>
                                    <a href="#" className="text-slate-300 hover:text-[#0B1B3D] transition-colors"><Mail className="w-4 h-4" /></a>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Contact ──────────────────────────────────────────────── */}
            <section id="contact" className="py-28 px-4 bg-[#0B1B3D] text-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Starten Sie Ihr <br /><span className="text-[#10B981]">Projekt mit uns.</span></h2>
                        <p className="text-slate-300 md:text-lg mb-10 leading-relaxed max-w-md text-left">
                            Hinterlassen Sie uns eine Nachricht oder rufen Sie uns direkt an. Wir melden uns innerhalb von 24 Stunden zurück.
                        </p>
                        <div className="space-y-7">
                            {[
                                { icon: Phone, label: "Telefon", value: "+49 (0) 30 0000 1111 (Demo)" },
                                { icon: Mail, label: "E-Mail", value: "demo@muster-beratung.example" },
                                { icon: Building2, label: "Büro", value: "Musterstraße 1, 10115 Musterstadt" },
                            ].map((c, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                                        <c.icon className="text-[#10B981] w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">{c.label}</div>
                                        <div className="text-lg font-bold text-left">{c.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Vorname</label>
                                    <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]" placeholder="Max" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Nachname</label>
                                    <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]" placeholder="Mustermann" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">E-Mail Adresse</label>
                                <input type="email" className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]" placeholder="max@firma.de" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Ihre Nachricht</label>
                                <textarea rows={4} className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-slate-50 text-slate-900 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] resize-none" placeholder="Beschreiben Sie kurz Ihr Projekt..." />
                            </div>
                            <button type="submit" className="w-full py-4 bg-[#10B981] text-white font-bold rounded-xl hover:bg-[#0d9b6b] shadow-lg shadow-emerald-500/20 transition-all mt-2 text-lg">
                                Anfrage absenden
                            </button>
                            <p className="text-[11px] text-slate-500 text-center mt-4">
                                Diese Beratungsanfrage ist 100% unverbindlich und kostenlos. Es gilt die <a href="#" className="underline hover:text-slate-700 transition-colors">Datenschutzerklärung</a>.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Demo Footer */}
            <footer className="bg-[#0B1B3D] border-t border-white/10 text-slate-500 text-center py-4 px-4 text-xs">
                <p>⚠️ Dies ist eine reine Demo-Website. Alle Namen, Personen und Unternehmen sind fiktiv. | Bilder: <a href="https://unsplash.com" className="underline hover:text-white">Unsplash</a></p>
            </footer>
        </main>
    );
}
