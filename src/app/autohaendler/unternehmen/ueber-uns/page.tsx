"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Users, ThumbsUp, ShieldCheck } from "lucide-react";
import { PremiumHeader } from "../../components";

const VALUES = [
    { title: "Qualität", desc: "Wir prüfen jedes Fahrzeug auf Herz und Nieren.", icon: <ShieldCheck className="w-8 h-8" /> },
    { title: "Transparenz", desc: "Keine versteckten Mängel, faire Preise.", icon: <ThumbsUp className="w-8 h-8" /> },
    { title: "Kompetenz", desc: "Über 20 Jahre Erfahrung im Premium-Segment.", icon: <Award className="w-8 h-8" /> },
    { title: "Service", desc: "Persönliche Beratung und Betreuung.", icon: <Users className="w-8 h-8" /> }
];

export default function UeberUnsPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
            <PremiumHeader />

            {/* Hero Section */}
            <section className="bg-white border-b border-slate-200 py-20 px-4">
                <div className="max-w-[1200px] mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Ihre Experten für <span className="text-[#0A4B8F]">Premium-Mobilität</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Seit über zwei Jahrzehnten widmen wir uns mit Leidenschaft dem Verkauf, Ankauf und der Pflege von hochwertigen Fahrzeugen. Unser Ziel ist es nicht nur Autos zu verkaufen, sondern langfristiges Vertrauen aufzubauen.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content & Image Section */}
            <section className="max-w-[1200px] mx-auto px-4 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-square shadow-xl border border-slate-200">
                            <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1000&auto=format&fit=crop" alt="Team im Gespräch" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Unsere Philosophie</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Wir glauben, dass der Autokauf ein entspanntes und freudiges Erlebnis sein sollte. Deswegen nehmen wir uns Zeit für Sie. Wir hören zu statt zu überreden, beraten ehrlich statt zu drängen und sorgen dafür, dass Sie das Fahrzeug finden, das wirklich zu Ihrem Leben passt.
                            </p>
                        </div>

                        <div className="pt-4 border-t border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-2">Unabhängig & Markenoffen</h3>
                            <p className="text-slate-600">
                                Als unabhängiger Händler sind wir nicht an Hersteller gebunden. So können wir Sie objektiv beraten und herstellerübergreifend das beste Modell für Ihre Ansprüche finden.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section className="max-w-[1200px] mx-auto px-4 mt-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Das macht uns aus</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">Vier Säulen, auf die Sie sich bei jedem Besuch verlassen können.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {VALUES.map((val, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm text-center flex flex-col items-center hover:border-blue-200 transition-colors"
                        >
                            <div className="w-16 h-16 bg-blue-50 text-[#0A4B8F] rounded-2xl flex items-center justify-center mb-6">
                                {val.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{val.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
