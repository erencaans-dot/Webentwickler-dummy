"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { PremiumHeader } from "../../components";

export default function StandortPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
            <PremiumHeader />

            {/* Hero Section */}
            <section className="bg-[#0A4B8F] text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2000&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
                <div className="max-w-[1200px] mx-auto relative z-10 text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                        Standort & Kontakt
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-blue-100 max-w-2xl mx-auto">
                        Besuchen Sie uns in unserem modernen Showroom. Wir freuen uns darauf, Sie persönlich beraten zu dürfen.
                    </motion.p>
                </div>
            </section>

            <section className="max-w-[1200px] mx-auto px-4 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Map Placeholder */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-slate-200 rounded-3xl h-[400px] md:h-auto min-h-[400px] relative overflow-hidden flex items-center justify-center border border-slate-300">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
                        <div className="relative z-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center">
                            <MapPin className="w-10 h-10 text-[#0A4B8F] mx-auto mb-3" />
                            <h3 className="font-bold text-slate-900 mb-1">Autohaus Mustermann GmbH</h3>
                            <p className="text-slate-600 text-sm">Musterstraße 123<br />10115 Berlin</p>
                        </div>
                    </motion.div>

                    {/* Contact Details */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 h-full">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">Nehmen Sie Kontakt auf</h2>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-[#0A4B8F]" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Telefon</h4>
                                        <p className="text-lg font-bold text-slate-900">+49 (0) 30 1234 5678</p>
                                        <p className="text-sm text-slate-500 mt-1">Für Verkauf & Werkstatt</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-[#0A4B8F]" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">E-Mail</h4>
                                        <p className="text-lg font-bold text-slate-900">info@mustermann-demo.de</p>
                                        <p className="text-sm text-slate-500 mt-1">Wir antworten innerhalb von 24h</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-[#0A4B8F]" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Öffnungszeiten</h4>
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-slate-700 font-medium">
                                            <span>Mo - Fr:</span>
                                            <span className="text-slate-900 font-bold">08:00 - 18:30</span>
                                            <span>Samstag:</span>
                                            <span className="text-slate-900 font-bold">09:00 - 14:00</span>
                                            <span>Sonntag:</span>
                                            <span className="text-slate-500">Geschlossen</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>
        </main>
    );
}
