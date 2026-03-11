"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, CheckCircle2, ChevronRight, Loader2, ArrowRight, Plus, Minus } from "lucide-react";
import { getCarById } from "../../data";
import { CarVisual, PremiumHeader } from "../../components";

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const carId = parseInt(resolvedParams.id, 10);
    const car = getCarById(carId);
    const router = useRouter();

    // active overlay: null | 'inquiry' | 'appointment'
    const [activeFlow, setActiveFlow] = useState<"inquiry" | "appointment" | null>(null);
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    // --- Inquiry State ---
    const [inqPhase, setInqPhase] = useState<"form" | "loading" | "success">("form");

    // --- Appointment State ---
    const [aptStep, setAptStep] = useState<1 | 2 | 3>(1); // 1: Date, 2: Details, 3: Success
    const [selectedDate, setSelectedDate] = useState("");

    if (!car) {
        notFound();
    }

    // Mock Next 7 Business Days
    const getNextDates = () => {
        const dates = [];
        const d = new Date();
        while (dates.length < 7) {
            d.setDate(d.getDate() + 1);
            if (d.getDay() !== 0 && d.getDay() !== 6) { // Skip weekends
                dates.push(new Date(d));
            }
        }
        return dates;
    };

    const handleInquirySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setInqPhase("loading");
        setTimeout(() => setInqPhase("success"), 1500);
    };

    const handleAptSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAptStep(3); // Go to success
    };

    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
            <PremiumHeader />

            <div className="max-w-[1200px] mx-auto px-4 mt-8">
                {/* Back Link */}
                <button
                    onClick={() => {
                        if (window.history.length > 2) {
                            router.back();
                        } else {
                            router.push('/autohaendler/verkauf');
                        }
                    }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0A4B8F] transition-colors mb-6 group cursor-pointer"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Zurück zum Fahrzeugverkauf
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

                    {/* Left Column: Image & Specs */}
                    <div className="md:col-span-7 lg:col-span-8">
                        <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 bg-white">
                            <CarVisual car={car} large={true} />
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm">
                                <div className="text-sm text-slate-500 font-medium mb-1">Leistung</div>
                                <div className="text-lg font-bold text-slate-900">{car.power}</div>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm">
                                <div className="text-sm text-slate-500 font-medium mb-1">Kraftstoff</div>
                                <div className="text-lg font-bold text-slate-900">{car.fuel}</div>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm">
                                <div className="text-sm text-slate-500 font-medium mb-1">Getriebe</div>
                                <div className="text-lg font-bold text-slate-900">Automatik</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details & CTA */}
                    <div className="md:col-span-5 lg:col-span-4 flex flex-col">
                        <div className="flex justify-between items-start mb-4 pb-4 border-b border-slate-200/60">
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{car.brand} {car.model}</h1>
                                <p className="text-lg font-medium text-slate-500 mt-1">{car.mileage.toLocaleString("de-DE")} km | EZ {car.year}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-[#0A4B8F]">
                                    {car.price.toLocaleString("de-DE")} €
                                </div>
                                <span className="block text-sm text-slate-500 font-normal mt-1">inkl. 19% MwSt., ausweisbar</span>
                            </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed mb-8">
                            Ein exzellent gepflegtes Fahrzeug aus erster Hand. Scheckheftgepflegt und mit umfangreicher Sonderausstattung. Überzeugen Sie sich selbst bei einer unverbindlichen Probefahrt.
                        </p>

                        {/* Ausstattung */}
                        <div className="mb-10">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Top-Ausstattung</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Navigationssystem Professional", "Sitzheizung", "LED-Scheinwerfer", "Spurhalteassistent", "Rückfahrkamera", "Apple CarPlay", "Panorama-Glasdach"].map((feature, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg border border-slate-200/60">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Accordions */}
                        <div className="mb-10 border-t border-slate-200">
                            {[
                                {
                                    id: 1, title: "Technische Daten",
                                    content: (
                                        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                                            <div><span className="font-semibold text-slate-900">Motorart:</span> Verbrenner</div>
                                            <div><span className="font-semibold text-slate-900">Hubraum:</span> 1.998 cm³</div>
                                            <div><span className="font-semibold text-slate-900">Getriebe:</span> Automatik</div>
                                            <div><span className="font-semibold text-slate-900">Antrieb:</span> Allradantrieb</div>
                                        </div>
                                    )
                                },
                                {
                                    id: 2, title: "Verbrauch & Emissionen",
                                    content: (
                                        <div className="space-y-3 text-sm text-slate-600">
                                            <div className="flex justify-between border-b border-dashed border-slate-200 pb-1"><span>WLTP Verbrauch kombiniert:</span> <span className="font-semibold text-slate-900">6,5 l/100km</span></div>
                                            <div className="flex justify-between border-b border-dashed border-slate-200 pb-1"><span>CO₂-Emissionen kombiniert:</span> <span className="font-semibold text-slate-900">149 g/km</span></div>
                                            <div className="flex justify-between pb-1"><span>CO₂-Effizienzklasse:</span> <span className="font-semibold text-green-600">B</span></div>
                                        </div>
                                    )
                                },
                                {
                                    id: 3, title: "Garantie & Service",
                                    content: (
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            Dieses Fahrzeug kommt mit unserer zertifizierten 12-Monate-Premium-Garantie, die alle wichtigen mechanischen und elektronischen Baugruppen abdeckt. Die nächste Inspektion ist frisch durchgeführt.
                                        </p>
                                    )
                                }
                            ].map((acc) => (
                                <div key={acc.id} className="border-b border-slate-200">
                                    <button
                                        onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                                        className="w-full flex justify-between items-center py-4 text-left font-bold text-slate-900 hover:text-[#0A4B8F] transition-colors"
                                    >
                                        <span>{acc.title}</span>
                                        {openAccordion === acc.id ? <Minus className="w-5 h-5 text-[#0A4B8F]" /> : <Plus className="w-5 h-5 text-slate-400" />}
                                    </button>
                                    <AnimatePresence>
                                        {openAccordion === acc.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-5">
                                                    {acc.content}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        {activeFlow === null && (
                            <div className="flex flex-col gap-4">
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => { setActiveFlow("appointment"); setAptStep(1); }}
                                    className="w-full flex justify-between items-center bg-[#0A4B8F] text-white py-4 px-6 rounded-2xl font-bold text-lg hover:bg-[#083a70] transition-colors shadow-lg shadow-blue-900/20"
                                >
                                    <span>Besichtigung vereinbaren</span>
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => { setActiveFlow("inquiry"); setInqPhase("form"); }}
                                    className="w-full flex justify-between items-center bg-white text-slate-800 border-2 border-slate-200 py-4 px-6 rounded-2xl font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-colors"
                                >
                                    <span>Unverbindliche Anfrage</span>
                                </motion.button>
                            </div>
                        )}

                        {/* Interactive Flows */}
                        <AnimatePresence mode="wait">
                            {/* --- INQUIRY FLOW --- */}
                            {activeFlow === "inquiry" && (
                                <motion.div
                                    key="inquiry"
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                    className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-slate-900">Anfrage für {car.brand} {car.model}</h2>
                                        <button onClick={() => setActiveFlow(null)} className="text-sm font-semibold text-slate-400 hover:text-slate-600">Abbrechen</button>
                                    </div>

                                    {inqPhase === "form" && (
                                        <form onSubmit={handleInquirySubmit} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Vorname</label>
                                                    <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nachname</label>
                                                    <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">E-Mail</label>
                                                <input required type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium" />
                                            </div>
                                            <div className="flex items-start gap-3 mt-4">
                                                <input required type="checkbox" className="mt-1 w-4 h-4 accent-[#0A4B8F]" id="privacy" />
                                                <label htmlFor="privacy" className="text-xs text-slate-500 font-medium">Ich stimme zu, dass meine Angaben aus dem Kontaktformular zur Beantwortung meiner Anfrage erhoben und verarbeitet werden. (Datenschutz)</label>
                                            </div>
                                            <motion.button
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                className="w-full py-4 mt-6 bg-[#0A4B8F] text-white font-bold rounded-xl hover:bg-[#083a70] transition-colors"
                                            >
                                                Jetzt unverbindlich anfragen
                                            </motion.button>
                                        </form>
                                    )}

                                    {inqPhase === "loading" && (
                                        <div className="py-12 flex flex-col items-center justify-center">
                                            <Loader2 className="w-10 h-10 text-[#0A4B8F] animate-spin mb-4" />
                                            <div className="text-slate-600 font-medium">Anfrage wird sicher übertragen...</div>
                                        </div>
                                    )}

                                    {inqPhase === "success" && (
                                        <div className="py-8 flex flex-col items-center justify-center text-center">
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Vielen Dank!</h3>
                                            <p className="text-slate-600 mb-8 max-w-[280px]">Wir haben Ihre Anfrage erhalten. Ein Berater wird sich in Kürze telefonisch bei Ihnen melden.</p>
                                            <button onClick={() => setActiveFlow(null)} className="text-[#0A4B8F] font-bold hover:underline">
                                                Zurück zum Fahrzeug
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* --- APPOINTMENT FLOW --- */}
                            {activeFlow === "appointment" && (
                                <motion.div
                                    key="appointment"
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                    className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-200/50"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-900">Besichtigung buchen</h2>
                                            <div className="text-sm font-medium text-slate-500 mt-1">Schritt {aptStep} von 2</div>
                                        </div>
                                        <button onClick={() => setActiveFlow(null)} className="text-sm font-semibold text-slate-400 hover:text-slate-600">Abbrechen</button>
                                    </div>

                                    {aptStep === 1 && (
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-sm font-bold text-slate-900 mb-3">Gewünschter Tag</h3>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                    {getNextDates().map((date, i) => {
                                                        const dateStr = date.toLocaleDateString("de-DE", { weekday: 'short', day: '2-digit', month: '2-digit' });
                                                        return (
                                                            <button
                                                                key={i}
                                                                onClick={() => setSelectedDate(dateStr)}
                                                                className={`p-3 rounded-xl border text-sm font-bold transition-all ${selectedDate === dateStr ? "border-[#0A4B8F] bg-blue-50 text-[#0A4B8F]" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
                                                            >
                                                                {dateStr}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <motion.button
                                                whileTap={{ scale: selectedDate ? 0.98 : 1 }}
                                                onClick={() => setAptStep(2)}
                                                disabled={!selectedDate}
                                                className={`w-full py-4 text-white font-bold rounded-xl transition-colors ${selectedDate ? "bg-[#0A4B8F] hover:bg-[#083a70]" : "bg-slate-300 cursor-not-allowed"}`}
                                            >
                                                Weiter zu Ihren Daten
                                            </motion.button>
                                        </div>
                                    )}

                                    {aptStep === 2 && (
                                        <form onSubmit={handleAptSubmit} className="space-y-4">
                                            <div className="flex items-center gap-3 bg-blue-50/50 border border-blue-100 p-3 rounded-xl mb-4">
                                                <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-bold text-[#0A4B8F] shadow-sm">{selectedDate}</div>
                                                <button type="button" onClick={() => setAptStep(1)} className="text-xs font-semibold text-slate-400 hover:text-[#0A4B8F] underline">Ändern</button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Vorname</label>
                                                    <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nachname</label>
                                                    <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Telefonnummer</label>
                                                <input required type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A4B8F] outline-none font-medium" />
                                            </div>

                                            <div className="flex items-start gap-3 mt-4">
                                                <input required type="checkbox" className="mt-1 w-4 h-4 accent-[#0A4B8F]" id="privacy-apt" />
                                                <label htmlFor="privacy-apt" className="text-xs text-slate-500 font-medium">Ich stimme den Datenschutzbestimmungen zur Terminvereinbarung zu.</label>
                                            </div>

                                            <motion.button
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                className="w-full py-4 mt-6 bg-[#0A4B8F] text-white font-bold rounded-xl hover:bg-[#083a70] transition-colors"
                                            >
                                                Termin verbindlich anfragen
                                            </motion.button>
                                        </form>
                                    )}

                                    {aptStep === 3 && (
                                        <div className="py-8 flex flex-col items-center justify-center text-center">
                                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                                <CheckCircle2 className="w-8 h-8 text-[#0A4B8F]" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Termin angefragt!</h3>
                                            <p className="text-slate-600 mb-8 max-w-[280px]">Ihre Besichtigungsanfrage für den <span className="font-bold text-black">{selectedDate}</span> wurde übermittelt. Wir bestätigen diesen in Kürze.</p>
                                            <button onClick={() => setActiveFlow(null)} className="text-[#0A4B8F] font-bold hover:underline">
                                                Zurück zum Fahrzeug
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </div>
            </div>

            {/* Legal Micro-Footer */}
            <div className="max-w-[1200px] mx-auto px-4 mt-20">
                <p className="text-[10px] text-slate-400 max-w-4xl mx-auto text-justify leading-relaxed">
                    Weitere Informationen zum offiziellen Kraftstoffverbrauch und den offiziellen spezifischen CO2-Emissionen neuer Personenkraftwagen können dem 'Leitfaden über den Kraftstoffverbrauch, die CO2-Emissionen und den Stromverbrauch neuer Personenkraftwagen' entnommen werden, der an allen Verkaufsstellen und bei der DAT unentgeltlich erhältlich ist. Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit.
                </p>
            </div>
        </main>
    );
}
