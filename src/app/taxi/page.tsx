"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Clock, ShieldCheck, ThumbsUp, MapPin, Map, Car, Menu, X, Flag, Calendar, Star, CheckCircle2 } from "lucide-react";
import { TaxiContactForm } from "@/components/ui/TaxiContactForm";

const NAV_LINKS = [
    { label: "Start", href: "#" },
    { label: "Leistungen", href: "#features" },
    { label: "Bewertungen", href: "#testimonials" },
    { label: "Kontakt", href: "#contact" },
];

const FEATURES = [
    { icon: Clock, title: "Pünktlich", desc: "Immer zur vereinbarten Zeit vor Ort." },
    { icon: ShieldCheck, title: "Sicher", desc: "Geprüfte Fahrzeuge, erfahrene Fahrer." },
    { icon: ThumbsUp, title: "Fair", desc: "Transparente Preise, keine Überraschungen." },
];

export default function TaxiPage() {
    const [start, setStart] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
    const [price, setPrice] = useState<number | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    // User Details
    const [passengerName, setPassengerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [menuOpen, setMenuOpen] = useState(false);
    const [isBookingSuccess, setIsBookingSuccess] = useState(false);

    // Validation
    const isToday = date === new Date().toISOString().split('T')[0];
    const isTimePast = isToday && time < new Date().toTimeString().slice(0, 5);
    const isDatePast = date < new Date().toISOString().split('T')[0];
    const isDateTimeInvalid = isTimePast || isDatePast;

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        if (isDateTimeInvalid) return;
        setIsCalculating(true);
        setPrice(null);

        // Simulate realistic demo prices
        const s = start.toLowerCase();
        const d = destination.toLowerCase();

        // 1. Check for long distance trips (inter-city)
        const majorCities = ['berlin', 'hamburg', 'münchen', 'muenchen', 'köln', 'koeln', 'frankfurt', 'stuttgart', 'düsseldorf', 'leipzig', 'dortmund', 'essen', 'bremen', 'dresden', 'hannover', 'nürnberg', 'duisburg', 'bochum', 'wuppertal', 'bielefeld', 'bonn', 'münster'];
        const isStartMajor = majorCities.some(c => s.includes(c));
        const isDestMajor = majorCities.some(c => d.includes(c));
        const isInterCity = isStartMajor && isDestMajor && s !== d;

        // Generate a pseudo-random hash to keep the price stable for same input
        const hash = (start + destination).split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0) | 0, 0);
        const randomSeed = Math.abs(hash) % 100; // 0-99

        let computedPrice = 0;

        if (isInterCity) {
            // Expensive inter-city trips (e.g. 150 - 650 EUR)
            computedPrice = 150 + (randomSeed * 5);
        } else if (s !== d && (s.length > 6 || d.length > 6)) {
            // Regional trips (e.g. 35 - 135 EUR)
            computedPrice = 35 + randomSeed;
        } else {
            // Local short-distance trips (e.g. 15 - 45 EUR)
            computedPrice = 15 + Math.floor(randomSeed * 0.3);
        }

        setTimeout(() => {
            setPrice(computedPrice);
            setIsCalculating(false);
        }, 800);
    };

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would normally send passengerName and phoneNumber to your backend
        setIsBookingSuccess(true);
    };

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">

            {/* ── Header ──────────────────────────────────────────────── */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5 font-black text-xl tracking-tighter text-slate-900">
                        <span className="w-9 h-9 rounded-lg bg-[#FFD700] flex items-center justify-center text-slate-900 shadow-md">
                            <Car size={20} />
                        </span>
                        <span>Mustermann</span>
                    </div>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                        {NAV_LINKS.map(l => (
                            <a key={l.label} href={l.href} className="hover:text-slate-900 transition-colors">{l.label}</a>
                        ))}
                    </div>

                    {/* Right action buttons */}
                    <div className="flex items-center gap-3">
                        {/* Call button (round, mobile-friendly) */}
                        <motion.a
                            href="tel:0800123456"
                            whileTap={{ scale: 0.92 }}
                            className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center text-slate-900 shadow-md shadow-yellow-400/30 hover:bg-[#e6c200] transition-colors"
                            aria-label="Anrufen"
                        >
                            <Phone className="w-5 h-5" />
                        </motion.a>

                        {/* Burger */}
                        <button
                            onClick={() => setMenuOpen(true)}
                            className="md:hidden w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                            aria-label="Menü öffnen"
                        >
                            <Menu className="w-5 h-5 text-slate-700" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Mobile Full-Screen Menü ──────────────────────────────── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex flex-col"
                    >
                        {/* Close */}
                        <div className="flex justify-end p-6">
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="Menü schließen"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {/* Links */}
                        <nav className="flex-1 flex flex-col items-center justify-center gap-8">
                            {NAV_LINKS.map((l, i) => (
                                <motion.a
                                    key={l.label}
                                    href={l.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-4xl font-black tracking-tight text-white hover:text-[#FFD700] transition-colors"
                                >
                                    {l.label}
                                </motion.a>
                            ))}
                        </nav>

                        {/* Bottom CTA */}
                        <div className="p-8 flex justify-center">
                            <motion.a
                                href="tel:0800123456"
                                whileTap={{ scale: 0.96 }}
                                className="flex items-center gap-3 bg-[#FFD700] text-slate-900 font-bold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-yellow-400/30"
                            >
                                <Phone className="w-6 h-6" />
                                0800 – 123 456
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Success Modal (Overlay) ──────────────────────────────── */}
            <AnimatePresence>
                {isBookingSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
                        >
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Buchung erfolgreich!</h3>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                Deine Fahrt zum Festpreis von <strong className="text-slate-900">{price} €</strong> wurde verbindlich reserviert. Dein Fahrer meldet sich in Kürze unter {phoneNumber} bei dir.
                            </p>
                            <button
                                onClick={() => setIsBookingSuccess(false)}
                                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors"
                            >
                                Schließen
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Hero Section ─────────────────────────────────────────── */}
            <section className="relative min-h-[80vh] flex items-center px-6 overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/videos/TaxiBilld.jpg')" }}
                />

                {/* Dark Gradient Overlay for Readability on the Left */}
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

                <div className="max-w-6xl mx-auto w-full relative z-20 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 py-8 md:py-20">

                    {/* Left: Text & Vibe */}
                    <div className="flex-1 text-left mt-4 md:mt-0">
                        <div className="inline-block bg-[#FFD700]/20 text-[#FFD700] font-bold text-xs px-3 py-1 rounded-full mb-4 md:mb-6 uppercase tracking-widest border border-[#FFD700]/30 backdrop-blur-sm">
                            Mustermann Taxi GmbH
                        </div>
                        <h1 className="text-4xl md:text-6xl text-white font-bold mb-3 md:mb-4 tracking-tight leading-tight">
                            Dein Fahrer wartet schon.
                        </h1>
                        <p className="text-slate-300 text-lg mb-4 md:mb-8 max-w-md leading-relaxed">
                            Sicher, schnell und zum Festpreis an dein Ziel. Buche jetzt deine Fahrt.
                        </p>
                    </div>

                    {/* Right: Booking Widget */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20"
                    >
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-3 sm:space-y-4 md:space-y-5">

                            {price === null ? (
                                <>
                                    {/* Abholort */}
                                    <div>
                                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">Abholort</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="text"
                                                value={start}
                                                onChange={(e) => { setStart(e.target.value); setPrice(null); }}
                                                placeholder="Aktueller Standort"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 sm:py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition-all shadow-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Zielort */}
                                    <div>
                                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">Zielort</label>
                                        <div className="relative">
                                            <Flag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="text"
                                                value={destination}
                                                onChange={(e) => { setDestination(e.target.value); setPrice(null); }}
                                                placeholder="Wohin soll's gehen?"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 sm:py-3.5 pl-12 pr-4 text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition-all shadow-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Datum & Uhrzeit (Row / Col on mobile) */}
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                        <div className="w-full">
                                            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">Datum</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="date"
                                                    value={date}
                                                    onChange={(e) => { setDate(e.target.value); setPrice(null); }}
                                                    className={`w-full bg-slate-50 border ${isDatePast ? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:border-[#FFD700] focus:ring-[#FFD700]/30'} rounded-xl py-2.5 sm:py-3.5 pl-11 pr-3 text-slate-900 font-bold focus:outline-none focus:ring-2 transition-all text-sm shadow-sm`}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">Uhrzeit</label>
                                            <div className="relative">
                                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="time"
                                                    value={time}
                                                    onChange={(e) => { setTime(e.target.value); setPrice(null); }}
                                                    className={`w-full bg-slate-50 border ${isTimePast ? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:border-[#FFD700] focus:ring-[#FFD700]/30'} rounded-xl py-2.5 sm:py-3.5 pl-11 pr-3 text-slate-900 font-bold focus:outline-none focus:ring-2 transition-all text-sm shadow-sm`}
                                                    required
                                                />
                                            </div>
                                            {(isTimePast || isDatePast) && (
                                                <p className="text-[10px] text-red-500 font-bold mt-1.5 ml-1 flex items-center gap-1">
                                                    ⚠️ Zeitpunkt liegt in der Vergangenheit!
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isDateTimeInvalid || isCalculating}
                                        onClick={handleCalculate}
                                        className="w-full mt-4 sm:mt-6 py-3 sm:py-4 bg-slate-900 text-white font-extrabold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all text-lg flex items-center justify-center gap-2"
                                    >
                                        {isCalculating ? "Berechne..." : "Preis berechnen"}
                                    </button>
                                </>
                            ) : (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4">
                                    <div className="bg-[#FFD700]/10 border border-[#FFD700]/50 rounded-xl p-3 sm:p-4 text-center mb-4 sm:mb-6">
                                        <div className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">Ihr Festpreis</div>
                                        <div className="text-3xl sm:text-4xl font-black text-slate-900">{price} €</div>
                                        <div className="text-[10px] sm:text-[11px] text-slate-500 mt-1">Für: {start} ➔ {destination}</div>
                                    </div>

                                    {/* Passenger Details Form */}
                                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 text-left">
                                        <div>
                                            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">Vor- und Nachname</label>
                                            <input
                                                type="text"
                                                value={passengerName}
                                                onChange={(e) => setPassengerName(e.target.value)}
                                                placeholder="Max Mustermann"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 sm:py-3.5 px-4 text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition-all shadow-sm"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">Handynummer</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="tel"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    placeholder="+49 151 12345678"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 sm:py-3.5 pl-11 pr-4 text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition-all shadow-sm"
                                                    required
                                                />
                                            </div>
                                            <p className="text-[10px] text-slate-500 mt-1.5 ml-1">Der Fahrer wird dich bei Ankunft anrufen.</p>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        onClick={handleBooking}
                                        className="w-full py-3 sm:py-4 bg-[#FFD700] text-slate-900 font-extrabold rounded-xl hover:bg-[#e6c200] shadow-lg shadow-yellow-500/30 transition-all text-lg flex items-center justify-center"
                                    >
                                        Verbindlich Buchen
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPrice(null)}
                                        className="w-full mt-2 sm:mt-3 py-1.5 sm:py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                                    >
                                        Zurück zur Routenplanung
                                    </button>
                                </motion.div>
                            )}

                            <p className="text-[11px] text-slate-500 font-medium text-center mt-3 leading-relaxed">
                                {price === null ? "Unverbindliche Preisabfrage. Keine versteckten Kosten." : "Ihre Fahrt wird zum Festpreis verbindlich gebucht."}
                            </p>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* ── Feature Cards — horizontaler Scroll auf Mobile ───────── */}
            <section id="features" className="py-14 px-0 md:px-4 bg-slate-50">
                <div className="flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4 md:grid md:grid-cols-3 md:max-w-6xl md:mx-auto md:overflow-visible md:pb-0 scrollbar-hide">
                    {FEATURES.map((f, i) => (
                        <div
                            key={i}
                            className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center snap-start flex-shrink-0 w-[72vw] md:w-auto"
                        >
                            <div className="w-14 h-14 rounded-full bg-[#FFD700]/20 flex items-center justify-center mb-5 text-[#c9a800]">
                                <f.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Testimonials ────────────────────────────────────────────── */}
            <section id="testimonials" className="py-16 bg-slate-50 border-y border-slate-200">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-12 tracking-tight">
                        Was unsere Fahrgäste sagen
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                text: "Pünktlich auf die Minute am Flughafen angekommen. Der Fahrer hat sogar geholfen, das schwere Gepäck zu tragen. Top Service!",
                                author: "Michael K."
                            },
                            {
                                text: "Sehr sauberer Wagen und unglaublich freundlicher Fahrer. Ich buche meine Fahrten für Geschäftstermine nur noch hier.",
                                author: "Sarah L."
                            },
                            {
                                text: "Die App-ähnliche Buchung oben ist mega einfach. Und der Festpreis war fair. Kein Stress, einfach einsteigen und losfahren.",
                                author: "Thomas W."
                            }
                        ].map((review, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex gap-1 mb-4">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star key={star} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                                        ))}
                                    </div>
                                    <p className="text-slate-600 leading-relaxed italic mb-6">"{review.text}"</p>
                                </div>
                                <div className="font-bold text-slate-900 text-sm">
                                    — {review.author}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Contact Section ─────────────────────────────────────────── */}
            <section id="contact" className="py-20 px-4 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-50/50" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Hast du noch Fragen?</h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            Egal ob Sonderfahrten, Kurierdienste oder Rechnungsfragen – unser Team ist gerne für dich da. Schreib uns einfach eine Nachricht.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                        <TaxiContactForm />
                    </div>
                </div>
            </section>

            {/* Demo Disclaimer Footer */}
            <footer id="contact" className="bg-slate-900 text-slate-400 text-center py-4 px-4 text-xs">
                <p>⚠️ Dies ist eine reine Demo-Website. Alle Namen, Telefonnummern und Unternehmen sind fiktiv.</p>
            </footer>
        </main>
    );
}
