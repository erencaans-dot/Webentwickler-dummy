"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Calendar, Clock, Users, CheckCircle2, ChevronRight, ChevronDown } from "lucide-react";

// --- Demo Menu Data ---
type MenuItem = {
    id: number;
    name: string;
    price: string;
    description: string;
    isVegan: boolean;
    isGlutenFree: boolean;
    spicyLevel: number;
    subCategory?: string;
};

type MenuCategory = {
    id: string;
    name: string;
    items: MenuItem[];
};

const MENU_CATEGORIES: MenuCategory[] = [
    {
        id: "starters",
        name: "Vorspeisen",
        items: [
            { id: 1, name: "Bruschetta Classico", price: "8.50", description: "Geröstetes Ciabatta, Strauchtomaten, Knoblauch, frisches Basilikum und extra natives Olivenöl.", isVegan: true, isGlutenFree: false, spicyLevel: 0 },
            { id: 2, name: "Vitello Tonnato", price: "14.90", description: "Zartes Kalbfleisch mit cremiger Thunfischsauce und Kapernäpfeln.", isVegan: false, isGlutenFree: true, spicyLevel: 0 },
            { id: 3, name: "Burrata", price: "12.50", description: "Cremige Burrata auf mariniertem Rucola mit Kirschtomaten und Balsamico-Glace.", isVegan: false, isGlutenFree: true, spicyLevel: 0 },
            { id: 31, name: "Carpaccio di Manzo", price: "16.00", description: "Hauchdünnes Rinderfilet, Rucola, Pinienkerne und Parmigiano Reggiano.", isVegan: false, isGlutenFree: true, spicyLevel: 0 },
        ],
    },
    {
        id: "mains",
        name: "Hauptspeisen",
        items: [
            // Pasta & Risotto
            { id: 4, name: "Truffle Tagliolini", price: "22.50", description: "Hausgemachte Tagliolini in Butter geschwenkt mit frisch gehobeltem schwarzen Trüffel.", subCategory: "Pasta & Risotto", isVegan: false, isGlutenFree: false, spicyLevel: 0 },
            { id: 41, name: "Penne all'Arrabbiata", price: "14.50", description: "Penne in pikanter Tomaten-Knoblauchsauce mit frischer Petersilie.", subCategory: "Pasta & Risotto", isVegan: true, isGlutenFree: false, spicyLevel: 2 },
            { id: 42, name: "Risotto Agli Spinaci", price: "18.50", description: "Cremiges Risotto mit frischem Babyspinat und gerösteten Pinienkernen.", subCategory: "Pasta & Risotto", isVegan: true, isGlutenFree: true, spicyLevel: 0 },
            { id: 43, name: "Spaghetti Aglio e Olio", price: "12.50", description: "Klassiker mit Knoblauch, feinem Olivenöl und Chili.", subCategory: "Pasta & Risotto", isVegan: true, isGlutenFree: false, spicyLevel: 1 },

            // Pizza aus dem Steinofen
            { id: 44, name: "Pizza Margherita", price: "11.00", description: "Der neapolitanische Klassiker mit San Marzano Tomaten, Fior di Latte und Basilikum.", subCategory: "Pizza aus dem Steinofen", isVegan: false, isGlutenFree: false, spicyLevel: 0 },
            { id: 45, name: "Pizza Diavola", price: "15.00", description: "Mit pikanter Salami, roten Zwiebeln und kalabresischer Chili.", subCategory: "Pizza aus dem Steinofen", isVegan: false, isGlutenFree: false, spicyLevel: 2 },
            { id: 46, name: "Pizza Marinara", price: "10.00", description: "San Marzano Tomaten, Knoblauch, Oregano und extra natives Olivenöl.", subCategory: "Pizza aus dem Steinofen", isVegan: true, isGlutenFree: false, spicyLevel: 0 },
            { id: 47, name: "Pizza Tartufo", price: "19.50", description: "Weiße Pizza mit Trüffelcreme, Fior di Latte, frischen Champignons und Trüffelöl.", subCategory: "Pizza aus dem Steinofen", isVegan: false, isGlutenFree: false, spicyLevel: 0 },

            // Fleisch & Grill
            { id: 5, name: "Bistecca alla Fiorentina", price: "38.00", description: "Auf dem Lavagrill zubereitetes T-Bone-Steak mit Rosmarinkartoffeln.", subCategory: "Fleisch & Grill", isVegan: false, isGlutenFree: true, spicyLevel: 0 },
            { id: 51, name: "Pollo Cacciatora", price: "24.00", description: "Grillhähnchenbrust in feiner Tomaten-Oliven-Sauce mit Rosmarin.", subCategory: "Fleisch & Grill", isVegan: false, isGlutenFree: true, spicyLevel: 0 },
            { id: 6, name: "Branzino al Forno", price: "26.00", description: "Im Ofen gegrillter Wolfsbarsch mit mediterranem Gemüse und Zitronen-Salsa.", subCategory: "Fisch & Meeresfrüchte", isVegan: false, isGlutenFree: true, spicyLevel: 0 },
            { id: 61, name: "Salmone Grigliato", price: "25.50", description: "Gegrilltes Lachsfilet auf Zitronenrisotto mit grünem Spargel.", subCategory: "Fisch & Meeresfrüchte", isVegan: false, isGlutenFree: true, spicyLevel: 0 },
        ],
    },
    {
        id: "desserts",
        name: "Desserts",
        items: [
            { id: 7, name: "Tiramisu della Nonna", price: "7.50", description: "Klassisches Tiramisu nach Familienrezept mit Espresso und Mascarpone.", isVegan: false, isGlutenFree: false, spicyLevel: 0 },
            { id: 8, name: "Panna Cotta", price: "6.90", description: "Vanille-Panna Cotta mit frischem Himbeer-Coulis.", isVegan: false, isGlutenFree: true, spicyLevel: 0 },
            { id: 9, name: "Sorbetto al Limone", price: "5.50", description: "Erfrischendes Zitronensorbet – die perfekte Abkühlung.", isVegan: true, isGlutenFree: true, spicyLevel: 0 },
        ],
    },
];

export default function GastroPage() {
    const [activeTab, setActiveTab] = useState("starters");
    const [reservationState, setReservationState] = useState<"idle" | "loading" | "success">("idle");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("19:00");

    useEffect(() => {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const dStr = String(d.getDate()).padStart(2, '0');
        setSelectedDate(`${y}-${m}-${dStr}`);
    }, []);

    const nowLocal = new Date();
    const year = nowLocal.getFullYear();
    const month = String(nowLocal.getMonth() + 1).padStart(2, '0');
    const day = String(nowLocal.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    const isSunday = selectedDate ? new Date(selectedDate).getDay() === 0 : false;
    const currentTime = String(nowLocal.getHours()).padStart(2, '0') + ":" + String(nowLocal.getMinutes()).padStart(2, '0');
    const isToday = selectedDate === today;

    const availableTimes = (() => {
        const options = [];
        for (let h = 17; h <= 22; h++) {
            options.push(`${h}:00`);
            // Only add 22:30, do not add 23:30
            if (h < 22) {
                options.push(`${h}:30`);
            } else {
                options.push(`22:30`);
            }
        }
        if (isToday) return options.filter(t => t > currentTime);
        return options;
    })();

    // Time is only past if the selected date is TODAY and the time is earlier than NOW
    const isTimePast = isToday && selectedTime < currentTime;

    const isTimeOutOfHours = selectedTime < "17:00" || selectedTime > "23:00";
    const isDatePast = selectedDate !== "" && selectedDate < today;
    const isDateTimeInvalid = isSunday || isTimePast || isTimeOutOfHours || isDatePast || (isToday && availableTimes.length === 0);

    useEffect(() => {
        if (availableTimes.length > 0 && !availableTimes.includes(selectedTime)) {
            setSelectedTime(availableTimes[0]);
        }
    }, [selectedDate, isToday]); // Update selected time if date changes and current selection becomes invalid

    // --- Filter States ---
    const [filterVegan, setFilterVegan] = useState(false);
    const [filterGlutenFree, setFilterGlutenFree] = useState(false);
    const [filterSpicy, setFilterSpicy] = useState(false);

    const activeCategory = MENU_CATEGORIES.find(c => c.id === activeTab)!;

    // --- Smart Filtering & Grouping Logic ---
    const filteredItems = activeCategory.items.filter(item => {
        if (filterVegan && !item.isVegan) return false;
        if (filterGlutenFree && !item.isGlutenFree) return false;
        if (filterSpicy && item.spicyLevel === 0) return false;
        return true;
    });

    const groupedItems: Record<string, typeof filteredItems> = {};
    filteredItems.forEach(item => {
        const cat = item.subCategory || "Allgemein";
        if (!groupedItems[cat]) groupedItems[cat] = [];
        groupedItems[cat].push(item);
    });

    // Scroll-getriebene Animation
    const { scrollY } = useScroll();
    const heroContentY = useTransform(scrollY, [0, 600], ["0%", "-40%"]);
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
    const heroBgY = useTransform(scrollY, [0, 800], ["0%", "20%"]);

    // ── Full-Page Snap Logic ──────────────────────────────────────────
    const isSnapping = useRef(false);   // Verhindert mehrfaches Triggern
    const touchStartY = useRef(0);

    useEffect(() => {
        const snapThreshold = window.innerHeight * 0.8; // Hero-Zone: obere 80vh

        const snapDown = () => {
            if (isSnapping.current) return;
            isSnapping.current = true;
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            // Cooldown: nach Animation wieder freigeben
            setTimeout(() => { isSnapping.current = false; }, 900);
        };

        const snapUp = () => {
            if (isSnapping.current) return;
            isSnapping.current = true;
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => { isSnapping.current = false; }, 900);
        };

        // ── Maus/Trackpad ──────────────────────────────────────────
        const handleWheel = (e: WheelEvent) => {
            const sy = window.scrollY;
            // Im Hero-Bereich: runter scrollen → snap zur Speisekarte
            if (sy < snapThreshold && e.deltaY > 0) {
                e.preventDefault();
                snapDown();
                return;
            }
            // Ganz oben bei der Speisekarte: hoch scrollen → snap zurück zum Hero
            if (sy >= window.innerHeight - 10 && sy <= window.innerHeight + 40 && e.deltaY < 0) {
                e.preventDefault();
                snapUp();
            }
        };

        // ── Touch (Mobile Swipe) ───────────────────────────────────
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const delta = touchStartY.current - e.changedTouches[0].clientY;
            const sy = window.scrollY;
            // Swipe nach oben (Finger bewegt sich hoch) → snap runter
            if (Math.abs(delta) > 30 && delta > 0 && sy < snapThreshold) {
                snapDown();
                return;
            }
            // Swipe nach unten an der Speisekarte-Oberkante → snap zurück
            if (Math.abs(delta) > 30 && delta < 0 && sy >= window.innerHeight - 10 && sy <= window.innerHeight + 40) {
                snapUp();
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, []);

    const handleReservation = (e: React.FormEvent) => {
        e.preventDefault();
        setReservationState("loading");
        setTimeout(() => {
            setReservationState("success");
            setTimeout(() => setReservationState("idle"), 5000);
        }, 1500);
    };


    return (
        <main className="min-h-screen bg-[#FAFAF8] text-neutral-800 font-serif selection:bg-[#9B5C43] selection:text-white">

            {/* ── Hero — Scroll-Driven Parallax ────────────────────────── */}
            <section className="relative h-[100dvh] w-full overflow-hidden flex items-end justify-center">

                {/* Hintergrundbild mit Parallax — bewegt sich langsamer als der Scroll */}
                <motion.div
                    style={{ y: heroBgY }}
                    className="absolute inset-0 scale-110"
                >
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2669&auto=format&fit=crop"
                        alt="Demo: Restaurant Interior"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
                </motion.div>

                {/* Hero-Inhalt: gleitet nach oben weg und fadet aus beim Scrollen */}
                <motion.div
                    style={{ y: heroContentY, opacity: heroOpacity }}
                    className="relative z-10 text-center px-6 max-w-3xl mx-auto pb-28"
                >
                    <motion.p
                        initial={{ opacity: 0, letterSpacing: "0.4em" }}
                        animate={{ opacity: 1, letterSpacing: "0.6em" }}
                        transition={{ duration: 1.2 }}
                        className="text-[#E8DCC2]/70 font-sans text-xs uppercase tracking-[0.6em] mb-6"
                    >
                        Fine Dining · Demo
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-light mb-4 text-white tracking-wide leading-tight"
                    >
                        Restaurant <br />
                        <span className="font-semibold italic text-[#E8DCC2]">Kulinarik-Beispiel</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-[#E8DCC2]/60 font-sans text-sm tracking-widest uppercase mb-10"
                    >
                        Fiktive Demo-Speisekarte &amp; Reservierung
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
                        className="font-sans px-10 py-4 border border-white/50 text-white backdrop-blur-sm hover:bg-white hover:text-neutral-900 transition-all duration-300 rounded-full text-sm tracking-widest uppercase"
                    >
                        Speisekarte entdecken
                    </motion.button>
                </motion.div>

                {/* Wippender Pfeil — fadet ebenfalls aus beim Scrollen */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
                >
                    <span className="font-sans text-[10px] uppercase tracking-widest text-white/40">Scrollen</span>
                    <ChevronDown className="w-6 h-6 text-white/50" strokeWidth={1.5} />
                </motion.div>
            </section>

            {/* ── Content — direkt anschließend, gleitet als Vorhang darüber ── */}
            <div className="relative z-10 bg-[#FAFAF8]">

                {/* ── Menu Section ────────────────────────────────────── */}
                <section id="menu" className="py-20 px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Titel — whileInView Reveal */}
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="text-center mb-14"
                        >
                            <h2 className="text-4xl md:text-5xl font-semibold text-[#4A5D4E] mb-4">Speisekarte</h2>
                            <div className="w-12 h-px bg-[#9B5C43] mx-auto" />
                        </motion.div>

                        {/* Tab Buttons — Sliding Underline */}
                        <div className="flex flex-row gap-8 overflow-x-auto pb-1 mb-6 justify-start md:justify-center scrollbar-hide" style={{ scrollbarWidth: "none" }}>
                            {MENU_CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className="relative flex-shrink-0 pb-3 font-sans text-sm tracking-widest uppercase transition-colors duration-300"
                                    style={{ color: activeTab === cat.id ? "#1c1917" : "#a8a29e" }}
                                >
                                    <span className={activeTab === cat.id ? "font-semibold" : "font-normal"}>
                                        {cat.name}
                                    </span>
                                    {activeTab === cat.id && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4A5D4E] rounded-full"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Filter Badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap items-center justify-center gap-3 mb-10"
                        >
                            <button
                                onClick={() => setFilterVegan(!filterVegan)}
                                className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all border ${filterVegan ? 'bg-green-100 border-green-300 text-green-800 font-semibold' : 'bg-white border-neutral-200 text-neutral-500 hover:bg-neutral-50'}`}
                            >
                                🌱 Vegan
                            </button>
                            <button
                                onClick={() => setFilterGlutenFree(!filterGlutenFree)}
                                className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all border ${filterGlutenFree ? 'bg-yellow-100 border-yellow-300 text-yellow-800 font-semibold' : 'bg-white border-neutral-200 text-neutral-500 hover:bg-neutral-50'}`}
                            >
                                🌾 Glutenfrei
                            </button>
                            <button
                                onClick={() => setFilterSpicy(!filterSpicy)}
                                className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all border ${filterSpicy ? 'bg-red-100 border-red-300 text-red-800 font-semibold' : 'bg-white border-neutral-200 text-neutral-500 hover:bg-neutral-50'}`}
                            >
                                🌶️ Scharf
                            </button>
                        </motion.div>

                        {/* Animated Menu Items grouped by SubCategory */}
                        <motion.div layout className="space-y-12">
                            <AnimatePresence>
                                {Object.keys(groupedItems).length === 0 && (
                                    <motion.div
                                        key="empty-state"
                                        layout
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                                        transition={{ duration: 0.3 }}
                                        className="py-12 text-center text-neutral-500 font-sans"
                                    >
                                        Für diese Filterkombination haben wir aktuell leider keine Gerichte.
                                    </motion.div>
                                )}
                                {Object.entries(groupedItems).map(([categoryName, items]) => {
                                    if (items.length === 0) return null; // Hide empty sections securely

                                    return (
                                        <motion.div
                                            key={categoryName}
                                            layout
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-0 relative"
                                        >
                                            {categoryName !== "Allgemein" && (
                                                <h3 className="text-xl md:text-2xl font-serif text-[#4A5D4E] mt-4 mb-4 border-b border-neutral-200/60 pb-2">
                                                    {categoryName}
                                                </h3>
                                            )}

                                            <div className="space-y-0 relative">
                                                <AnimatePresence>
                                                    {items.map((item, idx) => (
                                                        <motion.div
                                                            key={item.id}
                                                            layout
                                                            initial={{ opacity: 0, scale: 0.9, height: 0 }}
                                                            animate={{ opacity: 1, scale: 1, height: "auto" }}
                                                            exit={{ opacity: 0, scale: 0.9, height: 0, overflow: "hidden", marginTop: 0, marginBottom: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className="py-7 border-b border-neutral-100 last:border-0"
                                                        >
                                                            <div className="flex items-baseline gap-3 mb-2">
                                                                <h4 className="text-xl font-semibold text-neutral-900 flex-shrink-0">
                                                                    {item.name}
                                                                </h4>
                                                                {/* Emojis inline for extra flair */}
                                                                <div className="flex gap-1 items-center">
                                                                    {item.isVegan && <span className="text-[10px]" title="Vegan">🌱</span>}
                                                                    {item.isGlutenFree && <span className="text-[10px]" title="Glutenfrei">🌾</span>}
                                                                    {item.spicyLevel > 0 && <span className="text-[10px]" title="Scharf">{"🌶️".repeat(item.spicyLevel)}</span>}
                                                                </div>

                                                                <div className="flex-1 border-b border-dashed border-neutral-300 mb-1 mx-2" />
                                                                <span className="text-lg font-bold text-[#4A5D4E] flex-shrink-0 font-sans tabular-nums">
                                                                    {item.price} €
                                                                </span>
                                                            </div>
                                                            <p className="text-neutral-500 font-sans text-sm leading-relaxed max-w-xl">{item.description}</p>
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </section>{/* end menu section */}

                {/* ── Reservation Section ──────────────────────────────── */}
                <section id="reservation" className="py-20 px-4 bg-[#F2EFE9] border-t border-[#E8DCC2]">
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-start">

                        {/* Left: Info */}
                        <div className="flex-1">
                            <h2 className="text-4xl font-semibold text-[#4A5D4E] mb-5">Wir erwarten Sie.</h2>
                            <p className="text-neutral-600 font-sans leading-relaxed mb-8">
                                Reservieren Sie Ihren Tisch für einen unvergesslichen Abend voller kulinarischer Highlights in gemütlicher Atmosphäre.
                            </p>
                            <div className="font-sans space-y-2 text-neutral-500 border-l-2 border-[#9B5C43] pl-4">
                                <p className="font-semibold text-neutral-700">Öffnungszeiten & Ort</p>
                                <p>Mo – Sa: 17:00 – 23:00 Uhr</p>
                                <p>Sonn- & Feiertage geschlossen</p>
                                <p className="pt-2 text-sm text-[#4A5D4E]">Culinary Art Restaurant<br />Genussstraße 42<br />10115 Berlin</p>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="flex-1 w-full">
                            <div className="bg-white/70 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-lg shadow-[#4A5D4E]/8 border border-[#E8DCC2]">
                                <h3 className="text-2xl font-semibold text-center mb-8 text-[#9B5C43] tracking-wide">Tischreservierung</h3>

                                {reservationState === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-12 text-center"
                                    >
                                        <CheckCircle2 className="w-14 h-14 text-[#4A5D4E] mb-4" />
                                        <h4 className="text-2xl font-semibold mb-2">Vielen Dank!</h4>
                                        <p className="font-sans text-neutral-500 text-sm max-w-xs">
                                            Ihre Anfrage wurde entgegengenommen. Wir bestätigen die Reservierung in Kürze.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleReservation} className="space-y-5 font-sans">
                                        {/* Datum */}
                                        <div className="mb-2">
                                            <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">Datum</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B5C43]" strokeWidth={1.5} />
                                                <input
                                                    type="date"
                                                    required
                                                    min={today}
                                                    value={selectedDate}
                                                    onChange={(e) => setSelectedDate(e.target.value)}
                                                    className={`w-full bg-white/50 border rounded-xl py-3.5 pl-11 pr-4 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#4A5D4E]/30 transition-all placeholder:text-neutral-400 ${selectedDate && (selectedDate < today || isSunday) ? 'border-red-500 ring-red-500' : 'border-[#E8DCC2] focus:border-[#4A5D4E]'}`}
                                                />
                                            </div>
                                            {selectedDate && selectedDate < today && (
                                                <p className="text-xs text-red-500 mt-1.5 font-medium">Bitte wählen Sie ein Datum in der Zukunft.</p>
                                            )}
                                            {isSunday && (
                                                <p className="text-xs text-red-500 mt-1.5 font-medium">Sonntags haben wir leider geschlossen.</p>
                                            )}
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-4">
                                            {/* Uhrzeit */}
                                            <div className="flex-1 min-w-[120px]">
                                                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">Uhrzeit</label>
                                                <div className="relative">
                                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B5C43]" strokeWidth={1.5} />
                                                    {availableTimes.length > 0 ? (
                                                        <select
                                                            required
                                                            value={selectedTime}
                                                            onChange={(e) => setSelectedTime(e.target.value)}
                                                            className="w-full bg-white/50 border border-[#E8DCC2] rounded-xl py-3.5 pl-11 pr-8 text-neutral-900 focus:border-[#4A5D4E] focus:outline-none focus:ring-1 focus:ring-[#4A5D4E]/30 transition-all appearance-none"
                                                        >
                                                            {availableTimes.map(t => (
                                                                <option key={t} value={t}>{t}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <div className="w-full bg-red-50 border border-[#E8DCC2] rounded-xl py-3.5 pl-11 pr-4 text-red-500 text-sm font-semibold whitespace-nowrap overflow-hidden">
                                                            Heute ausgebucht
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {/* Personen */}
                                            <div className="flex-1 min-w-[105px]">
                                                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">Personen</label>
                                                <div className="relative">
                                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B5C43]" strokeWidth={1.5} />
                                                    <select
                                                        required
                                                        className="w-full bg-white/50 border border-[#E8DCC2] rounded-xl py-3.5 pl-11 pr-8 text-neutral-900 focus:border-[#4A5D4E] focus:outline-none focus:ring-1 focus:ring-[#4A5D4E]/30 transition-all appearance-none text-base"
                                                    >
                                                        <option value="2">2 Personen</option>
                                                        <option value="3">3 Personen</option>
                                                        <option value="4">4 Personen</option>
                                                        <option value="5+">5+ Personen</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Name */}
                                        <div>
                                            <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">Name</label>
                                            <input
                                                type="text" required placeholder="Ihr Name"
                                                className="w-full bg-white/50 border border-[#E8DCC2] rounded-xl py-3.5 px-4 text-neutral-900 focus:border-[#4A5D4E] focus:outline-none focus:ring-1 focus:ring-[#4A5D4E]/30 transition-all placeholder:text-neutral-400"
                                            />
                                        </div>

                                        <motion.button
                                            type="submit"
                                            disabled={reservationState === "loading" || isDateTimeInvalid}
                                            whileTap={{ scale: 0.97 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                            className="w-full mt-2 py-4 bg-[#4A5D4E] rounded-xl text-white font-semibold tracking-wide hover:bg-[#3A4A3E] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                        >
                                            {reservationState === "loading" ? "Wird verarbeitet…" : "Verbindlich anfragen"}
                                            {reservationState !== "loading" && <ChevronRight className="w-4 h-4" />}
                                        </motion.button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Demo Disclaimer Footer */}
                <footer className="bg-stone-900 text-stone-400 text-center py-4 px-4 text-xs">
                    <p>⚠️ Dies ist eine reine Demo-Website. Alle Namen und Unternehmen sind fiktiv. Speisekarte und Preise sind Beispieldaten. | Bilder: <a href="https://unsplash.com" className="underline hover:text-white">Unsplash</a></p>
                </footer>
            </div>{/* end curtain wrapper */}
        </main>
    );
}
