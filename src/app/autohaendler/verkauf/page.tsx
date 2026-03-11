"use client";

import React, { useState, useMemo, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown, CarFront, Loader2 } from "lucide-react";
import Link from "next/link";
import { Car, CARS, BRANDS } from "../data";
import { CarVisual, PremiumHeader } from "../components";

// ─── Car Card ─────────────────────────────────────────────────────────────────
const CarCard = ({ car }: { car: Car }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25 }}
        whileHover={{ y: -4 }}
        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-200 overflow-hidden flex flex-col group h-full"
    >
        <Link href={`/autohaendler/auto/${car.id}`} className="block relative">
            <CarVisual car={car} />
        </Link>
        <div className="p-5 flex flex-col flex-1">
            <div className="mb-2">
                <div className="text-xs font-bold text-[#0A4B8F] uppercase tracking-widest">{car.brand}</div>
                <h3 className="text-base font-black text-slate-900 line-clamp-1 mt-0.5">{car.model}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs text-slate-600 mb-5 font-medium">
                <span className="px-2 py-1 bg-slate-100 rounded-md">{car.year}</span>
                <span className="px-2 py-1 bg-slate-100 rounded-md">{car.mileage.toLocaleString("de-DE")} km</span>
                <span className="px-2 py-1 bg-slate-100 rounded-md">{car.fuel}</span>
                <span className="px-2 py-1 bg-slate-100 rounded-md">{car.power}</span>
            </div>
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="text-xl font-black text-slate-900">{car.price.toLocaleString("de-DE")} €</div>
                <Link
                    href={`/autohaendler/auto/${car.id}`}
                    className="text-sm font-bold text-white bg-[#0A4B8F] hover:bg-[#063365] px-4 py-2 rounded-lg transition-colors"
                >
                    Details
                </Link>
            </div>
        </div>
    </motion.div>
);

// ─── Filter Panel ─────────────────────────────────────────────────────────────
const FilterContent = ({
    selectedBrands, toggleBrand, maxPrice, setMaxPrice,
    maxMileage, setMaxMileage, setSelectedBrands, setSearch, activeFuels, toggleFuel,
    availableModels, selectedModels, toggleModel, setSelectedModels, setActiveFuels
}: {
    selectedBrands: string[]; toggleBrand: (b: string) => void;
    maxPrice: number; setMaxPrice: (v: number) => void;
    maxMileage: number; setMaxMileage: (v: number) => void;
    setSelectedBrands: (v: string[]) => void; setSearch: (v: string) => void;
    activeFuels: string[]; toggleFuel: (f: string) => void;
    availableModels: string[]; selectedModels: string[]; toggleModel: (m: string) => void; setSelectedModels: (v: string[]) => void; setActiveFuels: (v: string[]) => void;
}) => (
    <div className="space-y-6">
        <div>
            <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">Marke</h3>
            <div className="space-y-2">
                {BRANDS.map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleBrand(brand)}>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${selectedBrands.includes(brand) ? "bg-[#0A4B8F] border-[#0A4B8F]" : "border-slate-300 group-hover:border-[#0A4B8F]"}`}>
                            {selectedBrands.includes(brand) && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{brand}</span>
                    </label>
                ))}
            </div>
        </div>

        {selectedBrands.length > 0 && availableModels.length > 0 && (
            <div>
                <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">Modell</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {availableModels.map(model => (
                        <label key={model} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleModel(model)}>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${selectedModels.includes(model) ? "bg-[#0A4B8F] border-[#0A4B8F]" : "border-slate-300 group-hover:border-[#0A4B8F]"}`}>
                                {selectedModels.includes(model) && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                            </div>
                            <span className="text-sm font-medium text-slate-700 leading-tight">{model}</span>
                        </label>
                    ))}
                </div>
            </div>
        )}

        <div>
            <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">Antrieb</h3>
            <div className="space-y-2">
                {["Benzin", "Diesel", "Elektro", "Hybrid"].map(fuel => (
                    <label key={fuel} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleFuel(fuel)}>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${activeFuels.includes(fuel) ? "bg-[#0A4B8F] border-[#0A4B8F]" : "border-slate-300 group-hover:border-[#0A4B8F]"}`}>
                            {activeFuels.includes(fuel) && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{fuel}</span>
                    </label>
                ))}
            </div>
        </div>

        <div>
            <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider flex justify-between">
                Max. Preis <span className="text-[#0A4B8F]">{maxPrice.toLocaleString("de-DE")} €</span>
            </h3>
            <input type="range" min="15000" max="100000" step="5000" value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-[#0A4B8F] h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
        </div>
        <div>
            <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider flex justify-between">
                Max. KM <span className="text-[#0A4B8F]">{maxMileage.toLocaleString("de-DE")} km</span>
            </h3>
            <input type="range" min="10000" max="200000" step="10000" value={maxMileage}
                onChange={(e) => setMaxMileage(parseInt(e.target.value))}
                className="w-full accent-[#0A4B8F] h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
        </div>
        <button
            onClick={() => { setSelectedBrands([]); setSelectedModels([]); setActiveFuels([]); setMaxPrice(100000); setMaxMileage(200000); setSearch(""); }}
            className="w-full py-2 text-sm font-semibold text-slate-500 hover:text-[#0A4B8F] border border-slate-200 rounded-lg hover:border-[#0A4B8F] transition-all"
        >
            Filter zurücksetzen
        </button>
    </div>
);

// ─── Main Grid logic ──────────────────────────────────────────────────────────
function GridContainer() {
    const searchParams = useSearchParams();

    // Initial states derived from URL search params (if coming from Landingpage hero search)
    const initialBrand = searchParams.get("brand");
    const initialFuels = searchParams.getAll("fuel");
    const initialMinYear = parseInt(searchParams.get("minYear") || "0");
    const initialMaxKm = parseInt(searchParams.get("maxKm") || "200000");

    const [search, setSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrand ? [initialBrand] : []);
    const [selectedModels, setSelectedModels] = useState<string[]>([]);
    const [activeFuels, setActiveFuels] = useState<string[]>(initialFuels.length > 0 ? initialFuels : []);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [maxMileage, setMaxMileage] = useState(initialMaxKm);
    const [minYear] = useState(initialMinYear); // currently read-only in this simplistic UI setup, but acts as hard filter

    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filterKey, setFilterKey] = useState(0);

    const availableModels = useMemo(() => {
        if (selectedBrands.length === 0) return [];
        return Array.from(new Set(CARS.filter(c => selectedBrands.includes(c.brand)).map(c => c.model)));
    }, [selectedBrands]);

    const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearch = (val: string) => {
        setSearch(val);
        if (searchTimer.current) clearTimeout(searchTimer.current);
        if (val.length > 0) {
            setIsSearching(true);
            searchTimer.current = setTimeout(() => setIsSearching(false), 600);
        } else {
            setIsSearching(false);
        }
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
        setSelectedModels([]); // reset models on brand change
        setFilterKey(k => k + 1);
    };

    const toggleModel = (model: string) => {
        setSelectedModels(prev => prev.includes(model) ? prev.filter(m => m !== model) : [...prev, model]);
        setFilterKey(k => k + 1);
    };

    const toggleFuel = (fuel: string) => {
        setActiveFuels(prev => prev.includes(fuel) ? prev.filter(f => f !== fuel) : [...prev, fuel]);
        setFilterKey(k => k + 1);
    }

    const filteredCars = useMemo(() => CARS.filter(car => {
        const s = search.toLowerCase();
        return (
            (car.model.toLowerCase().includes(s) || car.brand.toLowerCase().includes(s)) &&
            (selectedBrands.length === 0 || selectedBrands.includes(car.brand)) &&
            (selectedModels.length === 0 || selectedModels.includes(car.model)) &&
            (activeFuels.length === 0 || activeFuels.includes(car.fuel)) &&
            car.price <= maxPrice &&
            car.mileage <= maxMileage &&
            car.year >= minYear
        );
    }), [search, selectedBrands, selectedModels, activeFuels, maxPrice, maxMileage, minYear]);

    const activeFilterCount = selectedBrands.length + selectedModels.length + activeFuels.length + (maxPrice < 100000 ? 1 : 0) + (maxMileage < 200000 ? 1 : 0);

    return (
        <>
            {/* Sub-header: Suchleiste */}
            <div className="bg-white border-b border-slate-100 py-3 px-4">
                <div className="max-w-[1400px] mx-auto flex items-center gap-4">
                    <div className="relative flex-1 max-w-xl">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Marke, Modell, Stichwort..."
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-2.5 pl-11 pr-11 focus:outline-none focus:ring-2 focus:ring-[#0A4B8F] focus:bg-white transition-all font-medium text-sm"
                        />
                        <AnimatePresence>
                            {isSearching && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    <Loader2 className="w-4 h-4 text-[#0A4B8F] animate-spin" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 mt-6">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        className="flex items-center justify-between w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-800 shadow-sm hover:border-[#0A4B8F] transition-colors"
                    >
                        <span className="flex items-center gap-2">
                            <SlidersHorizontal className="w-5 h-5 text-[#0A4B8F]" />
                            Filter anpassen
                            {activeFilterCount > 0 && (
                                <span className="bg-[#0A4B8F] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {activeFilterCount}
                                </span>
                            )}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${filtersOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                        {filtersOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mt-2">
                                    <FilterContent
                                        selectedBrands={selectedBrands} toggleBrand={toggleBrand}
                                        availableModels={availableModels} selectedModels={selectedModels} toggleModel={toggleModel} setSelectedModels={setSelectedModels}
                                        activeFuels={activeFuels} toggleFuel={toggleFuel} setActiveFuels={setActiveFuels}
                                        maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                                        maxMileage={maxMileage} setMaxMileage={setMaxMileage}
                                        setSelectedBrands={setSelectedBrands} setSearch={setSearch}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Desktop Layout */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Sidebar */}
                    <aside className="hidden lg:block w-72 flex-shrink-0 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-32">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 text-lg font-bold text-slate-900">
                            <SlidersHorizontal className="w-5 h-5 text-[#0A4B8F]" /> Filter anpassen
                        </div>
                        <FilterContent
                            selectedBrands={selectedBrands} toggleBrand={toggleBrand}
                            availableModels={availableModels} selectedModels={selectedModels} toggleModel={toggleModel} setSelectedModels={setSelectedModels}
                            activeFuels={activeFuels} toggleFuel={toggleFuel} setActiveFuels={setActiveFuels}
                            maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                            maxMileage={maxMileage} setMaxMileage={setMaxMileage}
                            setSelectedBrands={setSelectedBrands} setSearch={setSearch}
                        />
                    </aside>

                    {/* Car Grid with shake animation on filter change */}
                    <div className="flex-1 w-full">
                        <div className="mb-5 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-slate-900">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={filteredCars.length}
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 6 }}
                                        transition={{ duration: 0.2 }}
                                        className="inline-block"
                                    >
                                        {filteredCars.length}
                                    </motion.span>
                                </AnimatePresence>
                                {" "}Fahrzeuge gefunden
                            </h2>
                        </div>

                        <motion.div
                            key={filterKey}
                            animate={filterKey > 0 ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                        >
                            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                <AnimatePresence mode="popLayout">
                                    {filteredCars.map(car => (
                                        <CarCard key={car.id} car={car} />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>

                        {filteredCars.length === 0 && (
                            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center mt-6">
                                <CarFront className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Kein Fahrzeug gefunden</h3>
                                <p className="text-slate-500 mb-6">Bitte passen Sie Ihre Filterkriterien an.</p>
                                <button
                                    onClick={() => { setSelectedBrands([]); setSelectedModels([]); setActiveFuels([]); setMaxPrice(100000); setMaxMileage(200000); setSearch(""); }}
                                    className="px-6 py-2 bg-[#0A4B8F] text-white font-bold rounded-lg hover:bg-[#063365] transition-colors"
                                >
                                    Alle Filter zurücksetzen
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

// ─── Exported Page wrapper ───────────────────────────────────────────────────
export default function VerkaufPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
            <PremiumHeader />
            <Suspense fallback={<div className="text-center py-20 text-slate-400">Fahrzeuge werden geladen...</div>}>
                <GridContainer />
            </Suspense>
        </main>
    );
}
