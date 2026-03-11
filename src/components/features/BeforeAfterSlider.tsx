"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export const BeforeAfterSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);

    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
            <div className="mb-8 text-center">
                <h3 className="text-xl font-bold mb-2">Modernisierung & Neustart</h3>
                <p className="text-sm text-neutral-400">Navigiere den Slider, um den Unterschied zu sehen.</p>
            </div>

            <div className="w-full aspect-video relative overflow-hidden rounded-xl border border-white/10 group">

                {/* Native Range Input for perfect Mobile/Desktop dragging */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0"
                />

                {/* "After" Image (Background / New Design) */}
                <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center pt-8 pointer-events-none">
                    <div className="w-[80%] h-[80%] bg-neutral-800 rounded-t-lg shadow-[0_0_50px_rgba(0,243,255,0.1)] border border-white/5 flex flex-col overflow-hidden">
                        <div className="h-4 bg-neutral-700/50 flex items-center px-2 gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        </div>
                        <div className="flex-1 p-4">
                            <div className="w-full h-8 bg-[var(--color-neon-cyan)]/20 rounded mb-4" />
                            <div className="flex gap-4">
                                <div className="w-1/3 h-24 bg-white/5 rounded" />
                                <div className="w-1/3 h-24 bg-white/5 rounded" />
                                <div className="w-1/3 h-24 bg-white/5 rounded" />
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded backdrop-blur text-xs font-bold text-[var(--color-neon-cyan)]">NEU</div>
                </div>

                {/* "Before" Image (Foreground / Old Design) */}
                <div
                    className="absolute inset-0 bg-neutral-100 flex items-center justify-center pt-8 overflow-hidden pointer-events-none"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <div className="w-[80%] h-[80%] bg-white rounded-t-sm shadow-xl border border-neutral-300 flex flex-col overflow-hidden">
                        <div className="h-6 bg-blue-600 flex items-center px-2 text-white text-[10px] font-sans">
                            Internet Explorer Style
                        </div>
                        <div className="flex-1 p-4">
                            <div className="w-full h-8 bg-blue-100 border border-blue-200 mb-4 text-center text-xs text-blue-800 pt-2">Willkommen</div>
                            <div className="flex flex-col gap-2">
                                <div className="w-full h-6 bg-neutral-200" />
                                <div className="w-full h-6 bg-neutral-200" />
                                <div className="w-full h-6 bg-neutral-200" />
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-black/10 px-3 py-1 rounded text-xs font-bold text-neutral-600">ALT</div>
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none"
                    style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center group-active:scale-95 transition-transform">
                        <div className="flex gap-0.5">
                            <div className="w-0.5 h-3 bg-neutral-400" />
                            <div className="w-0.5 h-3 bg-neutral-400" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
