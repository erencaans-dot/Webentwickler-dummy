"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const TaxiContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Form States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            // Reset fields
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
        }, 1200);
    };

    return (
        <div className="relative">
            <AnimatePresence>
                {isSubmitted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white p-8 rounded-3xl max-w-md w-full mx-4 text-center shadow-xl flex flex-col items-center"
                        >
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Nachricht gesendet!</h3>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                Vielen Dank für deine Anfrage. Wir haben sie erhalten und unser Team wird sich schnellstmöglich bei dir melden.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors"
                            >
                                Schließen
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Dein Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition-all"
                            placeholder="Max Mustermann"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">E-Mail Adresse</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition-all"
                            placeholder="mail@beispiel.de"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Betreff</label>
                    <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition-all"
                        placeholder="Worum geht es?"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Deine Nachricht</label>
                    <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition-all resize-none"
                        placeholder="Wie können wir dir helfen?"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 py-4 bg-[#FFD700] text-slate-900 font-extrabold rounded-xl hover:bg-[#e6c200] shadow-lg shadow-yellow-500/20 transition-all text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
                >
                    {isSubmitting ? "Sende Nachricht..." : "Nachricht abschicken"}
                    {!isSubmitting && <Send className="w-5 h-5 ml-1" />}
                </button>
            </form>
        </div>
    );
};
