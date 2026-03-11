"use client";

import { useState } from "react";
import { Send, ChevronDown, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    return (
        <section id="contact-section" className="py-24 px-4 relative overflow-hidden">
            <AnimatePresence>
                {isSubmitted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md w-full mx-4 relative text-center"
                        >
                            <CheckCircle className="text-emerald-400 mb-4 mx-auto w-12 h-12" />
                            <h3 className="text-2xl font-bold text-white mb-2">Transmission erfolgreich!</h3>
                            <p className="text-zinc-400 mb-6">Deine Anfrage wurde sicher an den Hub übermittelt. Ich analysiere deine Daten und melde mich innerhalb von 24 Stunden bei dir.</p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                            >
                                Zurück zur Basis
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[var(--color-glowing-green)]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Bereit für das nächste Level?</h2>
                <p className="text-neutral-400">Lass uns dein Projekt besprechen und eine digitale Experience schaffen.</p>
            </div>

            <div className="max-w-2xl mx-auto glass-panel p-8 border-t border-l border-white/20">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">Vorname & Nachname</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors"
                                placeholder="Vorname Nachname"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">E-Mail</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors"
                                placeholder="Vorname@Nachname.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 relative">
                        <label className="text-sm font-medium text-neutral-300">Gewünschtes Paket</label>
                        <div className="relative">
                            <select
                                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors appearance-none cursor-pointer"
                                defaultValue=""
                            >
                                <option value="" disabled className="text-neutral-500">Bitte Paket wählen (optional)</option>
                                <option value="one-pager" className="bg-neutral-900 text-white">One-Pager (790 €)</option>
                                <option value="starter" className="bg-neutral-900 text-white">Starter (1.490 €)</option>
                                <option value="professional" className="bg-neutral-900 text-white">Professional (3.290 €)</option>
                                <option value="custom" className="bg-neutral-900 text-white">Custom / Web-App (Auf Anfrage)</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Projektdetails</label>
                        <textarea
                            required
                            rows={5}
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[var(--color-neon-cyan)] transition-colors resize-none"
                            placeholder="Wir brauchen ein High-End Redesign..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative py-4 bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-electric-purple)] rounded-lg font-bold text-black overflow-hidden group disabled:opacity-70"
                    >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isSubmitting ? "Sende Transmission..." : "Nachricht senden"}
                            {!isSubmitting && <Send className="w-5 h-5 ml-2" />}
                        </span>
                    </button>
                    <p className="text-[11px] text-zinc-500 text-center mt-4">Deine Anfrage ist vollkommen unverbindlich und kostenfrei. Mit dem Absenden akzeptierst du unsere <a href="#" className="underline hover:text-zinc-300 transition-colors">Datenschutzerklärung</a>.</p>
                </form>
            </div>
        </section>
    );
};
