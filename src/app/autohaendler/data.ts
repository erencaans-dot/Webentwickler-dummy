import { ReactNode } from "react";

export interface Car {
    id: number;
    brand: string;
    model: string;
    price: number;
    year: number;
    mileage: number;
    bodyType: string;
    photoCount: number;
    fuel: string;
    power: string;
    color: string;
    features: string[];
    theme: { from: string; to: string; accent: string; shimmer: string };
}

export const BRANDS = ["Velocis", "Aethelo", "Lumio", "Vantro", "Nexalo"];

const ALL_FEATURES = [
    ["Lederausstattung", "Navigationssystem", "Sitzheizung", "Panoramadach", "Rückfahrkamera"],
    ["Klimaautomatik", "Bluetooth", "Apple CarPlay", "Einparkhilfe", "LED-Scheinwerfer"],
    ["Tempomat", "Spurhalteassistent", "Totwinkelwarner", "Soundsystem", "Head-Up Display"],
    ["Allradantrieb", "Sportfahrwerk", "19-Zoll-Felgen", "Ambientebeleuchtung", "Keyless Go"],
    ["Wärmepumpe", "Schnellladefunktion", "Memorysitze", "Regensensor", "Fernlichtassistent"],
];
const COLORS = ["Polarmatt", "Mondsilber", "Saphirblau", "Graphitgrau", "Rubinrot"];
export const FUEL_TYPES = ["Benzin", "Diesel", "Elektro", "Hybrid", "Hybrid"];

export const CARD_THEMES = [
    { from: "from-[#0A4B8F]", to: "to-[#0d2a4a]", accent: "text-blue-300", shimmer: "via-blue-400/10" },
    { from: "from-[#1a1a2e]", to: "to-[#16213e]", accent: "text-slate-300", shimmer: "via-slate-400/10" },
    { from: "from-[#1e3a5f]", to: "to-[#0a1628]", accent: "text-sky-300", shimmer: "via-sky-400/10" },
    { from: "from-[#2d1b69]", to: "to-[#11052c]", accent: "text-purple-300", shimmer: "via-purple-400/10" },
    { from: "from-[#0d4f3c]", to: "to-[#052e22]", accent: "text-emerald-300", shimmer: "via-emerald-400/10" },
];

export const CARS: Car[] = Array.from({ length: 12 }).map((_, i) => {
    const brand = BRANDS[i % BRANDS.length];
    return {
        id: i,
        brand,
        model: `${brand} ${["Prime", "Avant", "Luxe", "Sport", "Urban"][i % 5]} ${["60", "80", "100", "150", "200"][i % 5]}`,
        price: 20000 + ((i * 4500) % 65000),
        year: 2018 + (i % 6),
        mileage: (i * 15000) % 120000,
        bodyType: ["SUV", "Limousine", "Coupé", "Kleinwagen", "Kombi"][i % 5],
        photoCount: 8 + (i % 5),
        fuel: FUEL_TYPES[i % FUEL_TYPES.length],
        power: `${120 + i * 15} PS`,
        color: COLORS[i % COLORS.length],
        features: ALL_FEATURES[i % ALL_FEATURES.length],
        theme: CARD_THEMES[i % CARD_THEMES.length],
    };
});

export const getCarById = (id: number) => CARS.find(c => c.id === id);
