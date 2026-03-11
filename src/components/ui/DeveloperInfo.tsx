"use client";

import { CheckCircle2, Zap, TrendingUp, Smartphone, Shield } from "lucide-react";
import Link from "next/link";

const principles = [
    {
        icon: Zap,
        title: "Spürbare Performance",
        desc: "Blitzschnelle Ladezeiten, die Ihre Besucher nicht warten lassen — und Google belohnt.",
        color: "text-[var(--color-neon-cyan)]",
        bg: "bg-[var(--color-neon-cyan)]/10",
    },
    {
        icon: TrendingUp,
        title: "Konversions-Optimiert",
        desc: "Design, das nicht nur schön aussieht, sondern Besucher gezielt zu Kunden macht.",
        color: "text-[var(--color-electric-purple)]",
        bg: "bg-[var(--color-electric-purple)]/10",
    },
    {
        icon: Smartphone,
        title: "100% Mobile-Ready",
        desc: "Perfekt auf jedem Smartphone — denn über 60 % Ihrer Besucher kommen vom Handy.",
        color: "text-[var(--color-glowing-green)]",
        bg: "bg-[var(--color-glowing-green)]/10",
    },
    {
        icon: Shield,
        title: "Zukunftssichere Technologie",
        desc: "Kein veralteter Baukasten. Sauberer Code, der mit Ihrem Unternehmen wächst.",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
    },
];

const plans = [
    {
        name: "One-Pager",
        price: "790",
        description: "Die perfekte digitale Visitenkarte für einen schnellen, professionellen Start.",
        features: ["Single-Page Design (1 Landingpage)", "Responsive Design", "Basis SEO Setup", "Kontaktformular & Impressum/Datenschutz"],
        isPopular: false,
    },
    {
        name: "Starter",
        price: "1.490",
        description: "Perfekt für wachsende Unternehmen mit einem kleinen, aber feinen Web-Auftritt.",
        features: ["Bis zu 5 Unterseiten", "Responsive Design", "Basis SEO Setup", "Kontaktformular", "Performance Optimierung"],
        isPopular: false,
    },
    {
        name: "Professional",
        price: "3.290",
        description: "Der Standard für starke Marken, die interaktiv überzeugen wollen.",
        features: ["Bis zu 15 Unterseiten", "Premium Animationen (Framer Motion)", "Advanced SEO & Analytics", "CMS Integration (Inhalte selbst pflegen)", "Prio-Support (Reaktionszeit < 24h)"],
        isPopular: true,
    },
    {
        name: "Custom / Web-App",
        price: "Auf Anfrage",
        description: "Maßgeschneiderte Lösungen, komplexe Web-Apps oder Shops.",
        features: ["Unlimitierte Seiten", "3D-Komponenten / WebGL", "Komplexe API-Anbindungen", "Payment Gateways", "Optionaler Wartungsvertrag"],
        isPopular: false,
    },
];

export const DeveloperInfo = () => {
    return (
        <section className="py-24 px-4 max-w-7xl mx-auto">
            {/* About Section — 2-column layout on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-28 items-start">

                {/* Left: Text / Copy */}
                <div className="flex flex-col justify-center">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[var(--color-neon-cyan)] mb-5 uppercase tracking-widest w-fit">
                        Über diesen Hub
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight text-white">
                        Webdesign, das<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-electric-purple)]">
                            für Sie arbeitet.
                        </span>
                    </h2>
                    <p className="text-neutral-300 leading-relaxed text-lg mb-5">
                        Ich baue keine Standard-Baukasten-Seiten. Ich entwickle maßgeschneiderte,
                        blitzschnelle Web-Erlebnisse, die Ihre Besucher zu Kunden machen und Ihre
                        Marke digital auf das nächste Level heben.
                    </p>
                    <p className="text-neutral-400 leading-relaxed text-base">
                        Jede Zeile Code ist auf Performance, Ästhetik und Konversion ausgerichtet —
                        damit Ihre Website nicht nur gut aussieht, sondern messbar mehr Umsatz bringt.
                    </p>
                </div>

                {/* Right: Principle Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {principles.map((p, i) => (
                        <div
                            key={i}
                            className="glass-card p-6 flex flex-col gap-3 hover:border-white/20 transition-all duration-300"
                        >
                            <div className={`w-10 h-10 rounded-xl ${p.bg} flex items-center justify-center flex-shrink-0`}>
                                <p.icon className={`w-5 h-5 ${p.color}`} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-base mb-1">{p.title}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">{p.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pricing */}
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Pricing-Modelle</h2>
                <p className="text-neutral-400 max-w-2xl mx-auto">
                    Transparente Preise für maßgeschneiderte Entwicklung.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`glass-card p-8 flex flex-col relative ${plan.isPopular ? "border-[var(--color-electric-purple)]/50 shadow-[0_0_30px_rgba(181,55,242,0.15)]" : ""}`}
                    >
                        {plan.isPopular && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-electric-purple)] text-white text-xs font-bold px-3 py-1 rounded-full">
                                MEISTGEBUCHT
                            </div>
                        )}
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <p className="text-neutral-400 text-sm mb-6 h-10">{plan.description}</p>
                        <div className="mb-8">
                            <span className="text-4xl font-extrabold">{plan.price}</span>
                            {plan.price !== "Auf Anfrage" && <span className="text-neutral-500"> €</span>}
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                                    <CheckCircle2 className="w-4 h-4 text-[var(--color-glowing-green)] flex-shrink-0 mt-0.5" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Link href="#contact-section" className="w-full">
                            <button
                                className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.isPopular
                                    ? "bg-white text-black hover:bg-neutral-200"
                                    : "bg-white/5 text-white hover:bg-white/10"
                                    }`}
                            >
                                Anfragen
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};
