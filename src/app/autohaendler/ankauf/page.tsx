"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CarFront, CheckCircle2, ChevronRight, Euro, Banknote, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { PremiumHeader } from "../components";

const STEPS = ["Fahrzeug", "Zustand", "Ihre Daten", "Angebot"];

export default function AnkaufPage() {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        brand: "", model: "", year: "", mileage: "",
        condition: "", damage: "Nein",
        firstName: "", lastName: "", email: "", phone: "",
        hasConsent: false
    });

    const handleNext = () => setStep(s => Math.min(s + 1, 3));
    const handlePrev = () => setStep(s => Math.max(s - 1, 0));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3); // Go to success/offer stage
    };

    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
            <PremiumHeader />

            {/* Hero Section */}
            <section className="bg-white border-b border-slate-200 py-16 px-4">
                <div className="max-w-[1200px] mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                            <Banknote className="w-4 h-4" /> Höchstpreise garantiert
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Wir kaufen Ihr <span className="text-green-600">Auto</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Einfach, schnell und sicher. Bewerten Sie Ihr Fahrzeug online und erhalten Sie innerhalb von 24 Stunden ein verbindliches Kaufangebot.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Multi-Step Form */}
            <section className="max-w-[800px] mx-auto px-4 mt-16">
                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200">

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                            {STEPS.map((s, i) => (
                                <span key={i} className={step >= i ? "text-green-600" : ""}>{s}</span>
                            ))}
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                            <motion.div
                                initial={false}
                                animate={{ width: `${((step + 1) / 4) * 100}%` }}
                                className="h-full bg-green-500"
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {/* STEP 1: FAHRZEUG */}
                        {step === 0 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Fahrzeugdaten</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Marke</label>
                                        <input value={data.brand} onChange={e => setData({ ...data, brand: e.target.value })} type="text" placeholder="z.B. Velocis" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-medium" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Modell</label>
                                        <input value={data.model} onChange={e => setData({ ...data, model: e.target.value })} type="text" placeholder="z.B. A4 Avant" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-medium" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Erstzulassung (Jahr)</label>
                                        <input value={data.year} onChange={e => setData({ ...data, year: e.target.value })} type="number" placeholder="z.B. 2019" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-medium" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kilometerstand</label>
                                        <input value={data.mileage} onChange={e => setData({ ...data, mileage: e.target.value })} type="number" placeholder="z.B. 65000" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-medium" />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleNext}
                                        disabled={!data.brand || !data.model || !data.year || !data.mileage}
                                        className={`px-8 py-4 font-bold rounded-xl transition-colors flex items-center gap-2 ${data.brand && data.model && data.year && data.mileage ? "bg-green-600 text-white hover:bg-green-700" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
                                    >
                                        Weiter <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: ZUSTAND */}
                        {step === 1 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Fahrzeugzustand</h2>

                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Allgemeiner Zustand</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                                    {["Sehr gut", "Gut", "Akzeptabel"].map(cond => (
                                        <button
                                            key={cond} onClick={() => setData({ ...data, condition: cond })}
                                            className={`p-4 rounded-xl border-2 font-bold transition-all ${data.condition === cond ? "border-green-600 bg-green-50 text-green-700" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
                                        >
                                            {cond}
                                        </button>
                                    ))}
                                </div>

                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Unfallfrei?</label>
                                <div className="grid grid-cols-2 gap-3 mb-8">
                                    {["Ja (Unfallfrei)", "Nein (Unfallschaden)"].map(opt => (
                                        <button
                                            key={opt} onClick={() => setData({ ...data, damage: opt })}
                                            className={`p-4 rounded-xl border-2 font-bold transition-all ${data.damage === opt ? "border-green-600 bg-green-50 text-green-700" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center">
                                    <button onClick={handlePrev} className="font-bold text-slate-400 hover:text-slate-600 flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Zurück</button>
                                    <motion.button
                                        whileTap={{ scale: 0.98 }} onClick={handleNext} disabled={!data.condition}
                                        className={`px-8 py-4 font-bold rounded-xl transition-colors flex items-center gap-2 ${data.condition ? "bg-green-600 text-white hover:bg-green-700" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
                                    >
                                        Weiter <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: KONTAKT */}
                        {step === 2 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                <form onSubmit={handleSubmit}>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Ihre Kontaktdaten</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Vorname</label>
                                            <input required value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })} type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-medium" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nachname</label>
                                            <input required value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })} type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-medium" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">E-Mail</label>
                                            <input required value={data.email} onChange={e => setData({ ...data, email: e.target.value })} type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-medium" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Telefonnummer</label>
                                            <input required value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-medium" />
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 mb-8">
                                        <input required checked={data.hasConsent} onChange={e => setData({ ...data, hasConsent: e.target.checked })} type="checkbox" className="mt-1 w-4 h-4 accent-green-600" id="privacy-ankauf" />
                                        <label htmlFor="privacy-ankauf" className="text-xs text-slate-500 font-medium leading-relaxed">Ich bin damit einverstanden, dass meine Daten zur Erstellung eines verbindlichen Kaufangebots verarbeitet werden. Meine Daten werden nicht an dritte Händler weitergegeben.</label>
                                    </div>

                                    <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                                        <button type="button" onClick={handlePrev} className="font-bold text-slate-400 hover:text-slate-600 flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Zurück</button>
                                        <motion.button
                                            whileTap={{ scale: 0.98 }} type="submit"
                                            disabled={!data.firstName || !data.email || !data.phone || !data.hasConsent}
                                            className={`px-8 py-4 font-bold rounded-xl transition-colors shadow-lg shadow-green-900/20 ${data.firstName && data.email && data.hasConsent ? "bg-green-600 text-white hover:bg-green-700" : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"}`}
                                        >
                                            Bewertung abschließen
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {/* STEP 4: SUCCESS */}
                        {step === 3 && (
                            <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Daten übermittelt!</h2>
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 w-full max-w-sm">
                                    <div className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">Ihr Fahrzeug</div>
                                    <div className="text-xl font-black text-slate-900 mb-1">{data.brand} {data.model}</div>
                                    <div className="text-slate-600">{data.year} | {data.mileage} km</div>
                                </div>
                                <p className="text-lg text-slate-600 max-w-md mx-auto mb-8">
                                    Unsere Experten bewerten Ihr Fahrzeug aktuell. Sie erhalten Ihr unverbindliches Angebot in Kürze per E-Mail an <span className="font-bold text-slate-900">{data.email}</span>.
                                </p>
                                <button onClick={() => window.location.href = "/autohaendler"} className="bg-slate-100 text-slate-800 font-bold px-8 py-3 rounded-xl hover:bg-slate-200 transition-colors">
                                    Zurück zur Startseite
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="max-w-[800px] mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                        <ShieldCheck className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                        <h4 className="font-bold text-slate-900 mb-1">Sicher & Seriös</h4>
                        <p className="text-sm text-slate-500">Wir sind ein zertifizierter Händler</p>
                    </div>
                    <div>
                        <Euro className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                        <h4 className="font-bold text-slate-900 mb-1">Faire Preise</h4>
                        <p className="text-sm text-slate-500">Kostenlose Autobewertung</p>
                    </div>
                    <div>
                        <CheckCircle2 className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                        <h4 className="font-bold text-slate-900 mb-1">Kein Stress</h4>
                        <p className="text-sm text-slate-500">Wir kümmern uns um die Abmeldung</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
