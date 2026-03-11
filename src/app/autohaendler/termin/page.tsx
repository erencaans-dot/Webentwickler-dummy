"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, CheckCircle2, Wrench, Settings, Droplets, ShieldCheck, BatteryCharging, Disc, ArrowRight, ArrowLeft, CalendarCheck, Calendar } from "lucide-react";
import { PremiumHeader } from "../components";

const SERVICES = [
    { id: "inspektion", title: "Inspektion", icon: <Settings className="w-6 h-6" /> },
    { id: "oelwechsel", title: "Ölwechsel", icon: <Droplets className="w-6 h-6" /> },
    { id: "hu-au", title: "HU/AU (TÜV)", icon: <ShieldCheck className="w-6 h-6" /> },
    { id: "bremsen", title: "Bremsen", icon: <Disc className="w-6 h-6" /> },
    { id: "reifen", title: "Reifenwechsel", icon: <Wrench className="w-6 h-6" /> },
    { id: "diagnose", title: "Diagnose", icon: <BatteryCharging className="w-6 h-6" /> },
];

function TerminForm() {
    const searchParams = useSearchParams();
    const initialService = searchParams.get("service") || "";

    const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Fahrzeug, 2: Service, 3: Kontakt, 4: Success

    // Form Data
    const [carData, setCarData] = useState({ brand: "", model: "", plate: "", mileage: "" });
    const [selectedServices, setSelectedServices] = useState<string[]>(initialService ? [initialService] : []);
    const [contactData, setContactData] = useState({ firstName: "", lastName: "", email: "", phone: "", date: "", time: "10:00" });

    const today = new Date().toISOString().split('T')[0];
    const isWeekend = contactData.date ? new Date(contactData.date).getDay() === 0 || new Date(contactData.date).getDay() === 6 : false;
    const currentTime = new Date().toTimeString().slice(0, 5);
    const isToday = contactData.date === today;
    const isTimePast = isToday && contactData.time < currentTime;
    const isDateTimeInvalid = isWeekend || isTimePast || (contactData.date < today && contactData.date !== "");

    const toggleService = (id: string) => {
        setSelectedServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    };

    const getNextDates = () => {
        const dates = [];
        const d = new Date();
        while (dates.length < 5) {
            d.setDate(d.getDate() + 1);
            if (d.getDay() !== 0 && d.getDay() !== 6) dates.push(new Date(d));
        }
        return dates;
    };

    const handleFinalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(4);
    };

    return (
        <div className="max-w-[800px] mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200">
            {/* Progress Bar */}
            {step < 4 && (
                <div className="mb-8">
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                        <span className={step >= 1 ? "text-[#0A4B8F]" : ""}>Fahrzeug</span>
                        <span className={step >= 2 ? "text-[#0A4B8F]" : ""}>Leistungen</span>
                        <span className={step >= 3 ? "text-[#0A4B8F]" : ""}>Termin</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                        <motion.div
                            initial={false}
                            animate={{ width: `${(step / 3) * 100}%` }}
                            className="h-full bg-[#0A4B8F]"
                        />
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                {/* STEP 1: FAHRZEUG */}
                {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Fahrzeugdaten eingeben</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Marke</label>
                                <input value={carData.brand} onChange={e => setCarData({ ...carData, brand: e.target.value })} type="text" placeholder="z.B. Nova" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Modell</label>
                                <input value={carData.model} onChange={e => setCarData({ ...carData, model: e.target.value })} type="text" placeholder="z.B. 320d" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kennzeichen</label>
                                <input value={carData.plate} onChange={e => setCarData({ ...carData, plate: e.target.value })} type="text" placeholder="M-AB 1234" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium uppercase" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Aktueller Kilometerstand</label>
                                <input value={carData.mileage} onChange={e => setCarData({ ...carData, mileage: e.target.value })} type="number" placeholder="z.B. 45000" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setStep(2)}
                                disabled={!carData.brand || !carData.model}
                                className={`px-8 py-4 font-bold rounded-xl transition-colors flex items-center gap-2 ${carData.brand && carData.model ? "bg-[#0A4B8F] text-white hover:bg-[#083a70]" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
                            >
                                Weiter zu den Leistungen <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: SERVICES */}
                {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Gewünschte Leistungen</h2>
                        <p className="text-slate-500 mb-6">Wählen Sie einen oder mehrere Services für Ihr Fahrzeug aus.</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                            {SERVICES.map(service => {
                                const isSelected = selectedServices.includes(service.id);
                                return (
                                    <button
                                        key={service.id}
                                        onClick={() => toggleService(service.id)}
                                        className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center text-center gap-3 transition-all ${isSelected ? "border-[#0A4B8F] bg-blue-50 text-[#0A4B8F]" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}
                                    >
                                        {service.icon}
                                        <span className="font-bold text-sm">{service.title}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex justify-between items-center">
                            <button onClick={() => setStep(1)} className="font-bold text-slate-400 hover:text-slate-600 flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Zurück</button>
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setStep(3)}
                                disabled={selectedServices.length === 0}
                                className={`px-8 py-4 font-bold rounded-xl transition-colors flex items-center gap-2 ${selectedServices.length > 0 ? "bg-[#0A4B8F] text-white hover:bg-[#083a70]" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
                            >
                                Weiter zur Terminwahl <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: TERMIN & KONTAKT */}
                {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                        <form onSubmit={handleFinalSubmit}>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Wunschtermin & Kontakt</h2>

                            <div className="mb-6">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Bevorzugtes Datum</label>
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="date"
                                        min={today}
                                        value={contactData.date}
                                        onChange={e => setContactData({ ...contactData, date: e.target.value })}
                                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium ${contactData.date && (contactData.date < today || isWeekend) ? 'border-red-500 ring-red-500' : 'border-slate-200'}`}
                                        required
                                    />
                                    {contactData.date && contactData.date < today && (
                                        <p className="text-xs text-red-500 font-medium">Bitte wähle ein Datum in der Zukunft.</p>
                                    )}
                                    {isWeekend && (
                                        <p className="text-xs text-red-500 font-medium">Am Wochenende haben wir geschlossen.</p>
                                    )}
                                </div>
                            </div>
                            <div className="mb-8">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Bevorzugte Uhrzeit</label>
                                <select
                                    value={contactData.time}
                                    onChange={e => setContactData({ ...contactData, time: e.target.value })}
                                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium appearance-none ${isTimePast ? 'border-red-500 ring-red-500' : 'border-slate-200'}`}
                                >
                                    <option value="08:00">08:00 Uhr</option>
                                    <option value="09:00">09:00 Uhr</option>
                                    <option value="10:00">10:00 Uhr</option>
                                    <option value="11:00">11:00 Uhr</option>
                                    <option value="13:00">13:00 Uhr</option>
                                    <option value="14:00">14:00 Uhr</option>
                                    <option value="15:00">15:00 Uhr</option>
                                    <option value="16:00">16:00 Uhr</option>
                                </select>
                                {isTimePast && (
                                    <p className="text-xs text-red-500 font-medium mt-2">Diese Uhrzeit liegt für heute in der Vergangenheit.</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Vorname</label>
                                    <input required value={contactData.firstName} onChange={e => setContactData({ ...contactData, firstName: e.target.value })} type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nachname</label>
                                    <input required value={contactData.lastName} onChange={e => setContactData({ ...contactData, lastName: e.target.value })} type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">E-Mail</label>
                                    <input required value={contactData.email} onChange={e => setContactData({ ...contactData, email: e.target.value })} type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Telefonnummer</label>
                                    <input required value={contactData.phone} onChange={e => setContactData({ ...contactData, phone: e.target.value })} type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
                                <div className="flex justify-between items-center w-full">
                                    <button type="button" onClick={() => setStep(2)} className="font-bold text-slate-400 hover:text-slate-600 flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Zurück</button>
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={!contactData.date || isDateTimeInvalid || !contactData.firstName || !contactData.phone}
                                        className={`px-6 py-4 md:px-8 font-bold rounded-xl transition-colors shadow-lg ${contactData.date && !isDateTimeInvalid && contactData.firstName && contactData.phone ? "bg-[#0A4B8F] text-white hover:bg-[#083a70] shadow-blue-900/20" : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"}`}
                                    >
                                        Kostenlosen Termin anfragen
                                    </motion.button>
                                </div>
                                <p className="text-[11px] text-slate-500 text-center md:text-right mt-2 w-full md:max-w-xs md:ml-auto leading-tight">
                                    Diese Terminanfrage ist zu 100% kostenlos. Du kannst den Termin jederzeit flexibel verschieben. Es gilt unsere <a href="#" className="underline hover:text-slate-700 transition-colors">Datenschutzerklärung</a>.
                                </p>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* STEP 4: SUCCESS MODAL */}
                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md w-full relative text-center shadow-2xl"
                        >
                            <CalendarCheck className="text-emerald-400 mb-4 mx-auto w-12 h-12" />
                            <h3 className="text-2xl font-bold text-white mb-2">Terminanfrage erfolgreich übermittelt!</h3>
                            <p className="text-zinc-400 mb-6 text-sm">Wir haben deinen Wunschtermin im System erfasst. Du erhältst in Kürze eine manuelle Bestätigung von unserem Team per E-Mail.</p>

                            <div className="bg-zinc-800 p-4 rounded-lg mb-6 text-left border border-zinc-700/50">
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Dein Wunschtermin</p>
                                <p className="text-white font-medium flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-[#0A4B8F]" />
                                    {new Date(contactData.date).toLocaleDateString("de-DE")} um {contactData.time} Uhr
                                </p>
                            </div>

                            <Link href="/autohaendler">
                                <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                                    Zurück zur Seite
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function AppointmentPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
            <PremiumHeader />

            <div className="max-w-[1200px] mx-auto px-4 mt-8 mb-12">
                <Link href="/autohaendler/werkstatt" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0A4B8F] transition-colors group">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Zurück zur Werkstatt-Übersicht
                </Link>
            </div>

            {/* Header Area */}
            <div className="text-center mb-10 px-4">
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
                    Servicetermin <span className="text-[#0A4B8F]">online buchen</span>
                </h1>
                <p className="text-lg text-slate-500 mb-2">Schnell, einfach und verbindlich in nur 3 Schritten.</p>
                <p className="text-sm text-slate-400 font-medium">Autohaus Cyber · Musterstraße 1 · 80331 München</p>
            </div>

            {/* Form Container (Suspense wrapper for useSearchParams) */}
            <Suspense fallback={<div className="text-center py-20 text-slate-400">Lade Formular...</div>}>
                <TerminForm />
            </Suspense>

        </main>
    );
}
