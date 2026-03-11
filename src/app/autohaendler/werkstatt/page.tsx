"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, Settings, Droplets, ShieldCheck, BatteryCharging, Disc, ArrowRight, CheckCircle2 } from "lucide-react";
import { PremiumHeader } from "../components";

const SERVICES = [
    {
        id: "inspektion",
        title: "Kleine & Große Inspektion",
        description: "Regelmäßige Wartung nach Herstellervorgaben zur Erhaltung von Garantie und Wert Ihres Fahrzeugs.",
        image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=600&auto=format&fit=crop",
        features: ["Auslesen des Fehlerspeichers", "Prüfung aller Systeme", "Eintrag ins Serviceheft"]
    },
    {
        id: "oelwechsel",
        title: "Öl- & Filterwechsel",
        description: "Schneller und professioneller Premium-Ölwechsel inkl. umweltgerechter Entsorgung des Altöls.",
        image: "/videos/Ölwechsel.jpg",
        features: ["Premium Motoröl", "Neuer Ölfilter", "Sichtprüfung Motorraum"]
    },
    {
        id: "hu-au",
        title: "Hauptuntersuchung (HU/AU)",
        description: "TÜV-Abnahme direkt bei uns im Haus. Vorab-Check inklusive, um Überraschungen zu vermeiden.",
        image: "https://images.unsplash.com/photo-1504222490345-c075b6008014?q=80&w=600&auto=format&fit=crop",
        features: ["Amtliche Prüfplakette", "Abgasuntersuchung", "Kostenloser Vorab-Check"]
    },
    {
        id: "bremsen",
        title: "Bremsenservice",
        description: "Sicherheit geht vor. Wir prüfen und wechseln Bremsbeläge und -scheiben mit Original-Ersatzteilen.",
        image: "/videos/Bremsen.jpg",
        features: ["Scheiben & Beläge", "Bremsflüssigkeitswechsel", "Sichtprüfung Leitungen"]
    },
    {
        id: "reifen",
        title: "Reifen & Räder",
        description: "Von saisonalem Radwechsel über Auswuchten bis hin zur fachgerechten Einlagerung Ihrer Räder.",
        image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?q=80&w=600&auto=format&fit=crop",
        features: ["Radwechsel", "Wuchten & Montage", "Einlagerungsservice"]
    },
    {
        id: "diagnose",
        title: "Fehlerdiagnose & Elektrik",
        description: "Hochmoderne Diagnosegeräte für eine schnelle und präzise Fehlerfindung an der Bordelektronik.",
        image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=600&auto=format&fit=crop",
        features: ["Batterie-Check", "Steuergeräte-Diagnose", "Klimaanlagen-Service"]
    }
];

export default function WorkshopPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
            <PremiumHeader />

            {/* Hero Section */}
            <section className="bg-white border-b border-slate-200 py-8 px-4">
                <div className="max-w-[1200px] mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
                            Service auf <span className="text-[#0A4B8F]">Premium-Niveau</span>
                        </h1>
                        <p className="text-base text-slate-600 max-w-2xl mx-auto mb-3">
                            Vertrauen Sie auf unser hochqualifiziertes Team und modernste Technik. Wir sorgen dafür, dass Ihr Fahrzeug immer in Top-Zustand bleibt.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="max-w-[1200px] mx-auto px-4 mt-8">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Unsere Leistungen</h2>
                        <p className="text-slate-500 mt-2">Wählen Sie den gewünschten Service für Details und Preise.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col h-full hover:border-[#0A4B8F]/30 hover:shadow-xl transition-all group"
                        >
                            <div className="mb-6 rounded-2xl overflow-hidden h-40 relative group-hover:shadow-md transition-shadow">
                                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed flex-grow mb-6">
                                {service.description}
                            </p>

                            <ul className="mb-2 space-y-2">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
