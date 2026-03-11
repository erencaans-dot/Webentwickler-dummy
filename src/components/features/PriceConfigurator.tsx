"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export const PriceConfigurator = () => {
    const [carValue, setCarValue] = useState(45000);
    const [duration, setDuration] = useState<12 | 24 | 36 | 48>(36);
    const [noDownpayment, setNoDownpayment] = useState(false);

    const calculatePrice = () => {
        // Simple mock formula for leasing
        const downPayment = noDownpayment ? 0 : carValue * 0.2;
        const remainingValue = carValue - downPayment;
        const interestRate = 0.04; // 4% interest
        const monthlyRate = (remainingValue / duration) + (remainingValue * interestRate / 12);
        return Math.round(monthlyRate);
    };

    return (
        <div className="glass-panel p-5 md:p-12 w-full max-w-2xl mx-auto flex flex-col md:flex-row gap-4 md:gap-12 max-h-[75vh] md:max-h-full overflow-y-auto custom-scrollbar">
            <div className="flex-1 space-y-3 md:space-y-8">
                <div>
                    <h3 className="text-base md:text-xl font-bold mb-1 md:mb-4 leading-tight">Beispiel: Leasing-Rechner</h3>
                    <p className="text-[10px] md:text-sm text-neutral-400">Solche anpassbaren Module baue ich auf Ihrer Website ein (z.B. ROI, Kredite).</p>
                </div>

                <div className="space-y-1.5 md:space-y-4">
                    <label className="text-xs md:text-base font-semibold text-neutral-300 flex justify-between">
                        Fahrzeugwert
                        <span className="text-[var(--color-neon-cyan)]">{carValue.toLocaleString('de-DE')} €</span>
                    </label>
                    <input
                        type="range"
                        min="10000"
                        max="120000"
                        step="1000"
                        value={carValue}
                        onChange={(e) => setCarValue(parseInt(e.target.value))}
                        className="w-full accent-[var(--color-neon-cyan)] h-1.5 md:h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                <div className="space-y-1.5 md:space-y-4">
                    <label className="text-xs md:text-base font-semibold text-neutral-300">Laufzeit (Monate)</label>
                    <div className="flex bg-black/50 rounded-lg p-1 border border-white/5">
                        {[12, 24, 36, 48].map((months) => (
                            <button
                                key={months}
                                onClick={() => setDuration(months as any)}
                                className={`flex-1 py-1 md:py-2 text-[10px] md:text-sm rounded-md transition-all ${duration === months ? "bg-white/10 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-300"
                                    }`}
                            >
                                {months}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="text-xs md:text-base font-semibold text-neutral-300 cursor-pointer" onClick={() => setNoDownpayment(!noDownpayment)}>
                        Ohne Anzahlung (0%)
                    </label>
                    <button
                        onClick={() => setNoDownpayment(!noDownpayment)}
                        className={`w-10 md:w-12 h-5 md:h-6 rounded-full transition-colors relative ${noDownpayment ? "bg-[var(--color-glowing-green)]" : "bg-white/10"}`}
                    >
                        <motion.div
                            className="w-3.5 md:w-4 h-3.5 md:h-4 bg-white rounded-full absolute top-[3px] md:top-1"
                            animate={{ left: noDownpayment ? "24px" : "4px" }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
                <div className="text-[10px] md:text-sm text-neutral-400 mb-0 md:mb-2">Monatliche Rate</div>
                <div className="text-2xl md:text-5xl font-bold flex items-baseline gap-1">
                    <motion.span
                        key={calculatePrice()}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[var(--color-neon-cyan)]"
                    >
                        {calculatePrice().toLocaleString('de-DE')}
                    </motion.span>
                    <span className="text-sm md:text-xl text-neutral-500">€ mtl.</span>
                </div>
                <p className="text-[9px] md:text-xs text-neutral-500 mt-2 md:mt-4 leading-relaxed">
                    Dies ist nur eine Demo, um technische Möglichkeiten zu zeigen. Kein echter Preis.
                </p>
            </div>
        </div>
    );
};
