"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Check, ArrowRight, ShieldCheck, Euro, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { BRANDS, FUEL_TYPES } from "./data";
import { PremiumHeader } from "./components";

export default function AutoDealerLandingPage() {
    const router = useRouter();

    // Form State
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedFuels, setSelectedFuels] = useState<string[]>([]);
    const [minYear, setMinYear] = useState("");
    const [maxKm, setMaxKm] = useState("");

    // Dropdown States
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Dummy Models based on Brand (to simulate dependency)
    const getModelsForBrand = (brand: string) => {
        if (!brand) return [];
        return [`${brand} Prime 100`, `${brand} Avant 150`, `${brand} Luxe 200`, `${brand} Sport 80`, `${brand} Urban 60`];
    };

    const toggleFuel = (fuel: string) => {
        setSelectedFuels(prev => prev.includes(fuel) ? prev.filter(f => f !== fuel) : [...prev, fuel]);
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (selectedBrand) params.append("brand", selectedBrand);
        if (selectedModel) params.append("search", selectedModel); // Use search param for model text
        selectedFuels.forEach(f => params.append("fuel", f));
        if (minYear) params.append("minYear", minYear);
        if (maxKm) params.append("maxKm", maxKm);

        router.push(`/autohaendler/verkauf?${params.toString()}`);
    };

    interface SelectDropdownProps {
        label: string;
        value: string;
        options: string[];
        placeholder: string;
        isOpen: boolean;
        onToggle: () => void;
        onSelect: (val: string) => void;
        disabled?: boolean;
    }

    // Helper for custom select dropdowns
    const SelectDropdown = ({ label, value, options, placeholder, isOpen, onToggle, onSelect, disabled = false }: SelectDropdownProps) => (
        <div className="relative">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</label>
            <button
                type="button"
                disabled={disabled}
                onClick={onToggle}
                className={`w-full flex items-center justify-between px-0 py-2 bg-transparent border-0 border-b ${isOpen ? 'border-[#0A4B8F]' : 'border-slate-300'} rounded-none text-left focus:outline-none focus:ring-0 transition-colors ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:border-slate-400'}`}
            >
                <span className={`block truncate font-medium ${value ? 'text-slate-900' : 'text-slate-400'}`}>
                    {value || placeholder}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && !disabled && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 py-1 overflow-hidden"
                    >
                        {options.map(opt => (
                            <button
                                key={opt}
                                onClick={() => onSelect(opt)}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-[#0A4B8F] transition-colors"
                            >
                                {opt}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 font-sans">
            <PremiumHeader />

            {/* Hero Section - Compressed */}
            <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden bg-slate-900 border-b border-slate-800">
                {/* Background Video Container */}
                <div className="absolute inset-0 z-0">
                    <video
                        suppressHydrationWarning
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src="/videos/autorepair.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {/* Dark Gradient Overlay for perfect contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-900/90" />
                </div>

                <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-lg mb-2">
                            Ihr Weg zum <span className="text-blue-400">Traumauto</span>
                        </h1>
                        <p className="text-base text-slate-400 font-medium">Finde aus über 500 geprüften Modellen deines.</p>
                    </motion.div>
                </div>
            </section>

            {/* Overlapping Search Mask */}
            <section className="relative z-20 w-full px-4 -mt-24 md:-mt-32 max-w-[1200px] mx-auto">
                <div className="relative">
                    {/* Highly Interactive Search Mask */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-3xl p-5 md:p-8 shadow-2xl max-w-4xl mx-auto border border-slate-100"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 relative">
                            {/* Brand Select */}
                            <SelectDropdown
                                label="Hersteller" value={selectedBrand} options={BRANDS}
                                placeholder="Beliebig" isOpen={openDropdown === 'brand'}
                                onToggle={() => setOpenDropdown(openDropdown === 'brand' ? null : 'brand')}
                                onSelect={(val: string) => { setSelectedBrand(val); setSelectedModel(""); setOpenDropdown(null); }}
                            />

                            {/* Model Select (Dependent on Brand) */}
                            <SelectDropdown
                                label="Modell" value={selectedModel} options={getModelsForBrand(selectedBrand)}
                                placeholder={selectedBrand ? "Alle Modelle" : "Bitte Hersteller wählen"}
                                isOpen={openDropdown === 'model'} disabled={!selectedBrand}
                                onToggle={() => setOpenDropdown(openDropdown === 'model' ? null : 'model')}
                                onSelect={(val: string) => { setSelectedModel(val); setOpenDropdown(null); }}
                            />

                            {/* EZ Select */}
                            <SelectDropdown
                                label="EZ ab" value={minYear}
                                options={["2018", "2019", "2020", "2021", "2022", "2023", "2024"]}
                                placeholder="Beliebig" isOpen={openDropdown === 'year'}
                                onToggle={() => setOpenDropdown(openDropdown === 'year' ? null : 'year')}
                                onSelect={(val: string) => { setMinYear(val); setOpenDropdown(null); }}
                            />

                            {/* KM Select */}
                            <SelectDropdown
                                label="Kilometer bis" value={maxKm ? `${Number(maxKm).toLocaleString('de-DE')} km` : ""}
                                options={["10000", "30000", "50000", "80000", "120000", "150000"]}
                                placeholder="Beliebig" isOpen={openDropdown === 'km'}
                                onToggle={() => setOpenDropdown(openDropdown === 'km' ? null : 'km')}
                                onSelect={(val: string) => { setMaxKm(val); setOpenDropdown(null); }}
                            />
                        </div>

                        {/* Custom Multi-Select for Fuel Types */}
                        <div className="mb-6">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Antriebsart</label>
                            <div className="flex flex-wrap gap-2">
                                {Array.from(new Set(FUEL_TYPES)).map(fuel => {
                                    const active = selectedFuels.includes(fuel);
                                    return (
                                        <button
                                            key={fuel} onClick={() => toggleFuel(fuel)}
                                            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors flex items-center gap-2 ${active ? 'bg-blue-500 border-blue-400 text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100'}`}
                                        >
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${active ? 'bg-white border-white' : 'border-slate-300 bg-white'}`}>
                                                {active && <Check className="w-3 h-3 text-blue-600" />}
                                            </div>
                                            {fuel}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Search Button */}
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSearch}
                            className="w-full bg-[#0A4B8F] hover:bg-blue-600 text-white font-black text-[15px] tracking-wide py-3 md:py-4 rounded-xl shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 transition-all mt-2"
                        >
                            <Search className="w-5 h-5" /> Fahrzeuge anzeigen
                        </motion.button>

                    </motion.div>
                </div>
            </section>

            <section className="bg-white py-16 border-b border-slate-200">
                <div className="max-w-[1200px] mx-auto px-4 text-left mb-12">
                    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Warum Autohaus Mustermann?</h2>
                    <p className="text-lg text-slate-600 max-w-4xl leading-relaxed">
                        Wir stehen nicht nur für exklusive Fahrzeuge, sondern für ein Rundum-Sorglos-Gefühl. Vertrauen, Transparenz und ein reibungsloser Ablauf sind unsere Eckpfeiler.
                        Seit über 25 Jahren begleiten wir unsere Kunden auf dem Weg zu ihrem Traumauto. Dabei legen wir größten Wert auf eine persönliche und ehrliche Beratung.
                        Jedes Fahrzeug in unserem Bestand durchläuft vor dem Verkauf einen strengen 100-Punkte-Check in unserer hauseigenen Meisterwerkstatt.
                        Wir wissen, dass der Kauf eines neuen Autos eine emotionale und wichtige Entscheidung ist – deshalb nehmen wir uns Zeit für Sie.
                        Von der ersten Probefahrt bis hin zu maßgeschneiderten Finanzierungs- oder Leasingangeboten: Bei uns bekommen Sie alles aus einer Hand.
                        Erleben Sie den feinen Unterschied und lassen Sie sich von unserer Leidenschaft für Automobile anstecken.
                    </p>
                </div>
                <div className="max-w-[1200px] mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link href="/autohaendler/verkauf" className="group p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#0A4B8F]/30 hover:shadow-lg transition-all">
                            <ShieldCheck className="w-10 h-10 text-[#0A4B8F] mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Geprüfte Qualität</h3>
                            <p className="text-slate-600 mb-4 text-sm leading-relaxed">Alle unsere Fahrzeuge durchlaufen einen strengen 100-Punkte Qualitätscheck. Inklusive 12 Monate Garantie.</p>
                            <span className="text-sm font-bold text-[#0A4B8F] flex items-center gap-1 group-hover:gap-2 transition-all">Zum Bestand <ArrowRight className="w-4 h-4" /></span>
                        </Link>

                        <Link href="/autohaendler/ankauf" className="group p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#0A4B8F]/30 hover:shadow-lg transition-all">
                            <Euro className="w-10 h-10 text-[#0A4B8F] mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Faire Inzahlungnahme</h3>
                            <p className="text-slate-600 mb-4 text-sm leading-relaxed">Wir bewerten Ihr aktuelles Fahrzeug transparent und bieten Ihnen Höchstpreise bei Inzahlungnahme oder Ankauf.</p>
                            <span className="text-sm font-bold text-[#0A4B8F] flex items-center gap-1 group-hover:gap-2 transition-all">Auto bewerten <ArrowRight className="w-4 h-4" /></span>
                        </Link>

                        <Link href="/autohaendler/werkstatt" className="group p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#0A4B8F]/30 hover:shadow-lg transition-all">
                            <HeartHandshake className="w-10 h-10 text-[#0A4B8F] mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Erstklassiger Service</h3>
                            <p className="text-slate-600 mb-4 text-sm leading-relaxed">Unsere zertifizierte Meisterwerkstatt kümmert sich auch nach dem Kauf kompetent um Ihr Fahrzeug.</p>
                            <span className="text-sm font-bold text-[#0A4B8F] flex items-center gap-1 group-hover:gap-2 transition-all">Service entdecken <ArrowRight className="w-4 h-4" /></span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact Anchor */}
            <div id="kontakt" className="h-1" />
        </main>
    );
}
