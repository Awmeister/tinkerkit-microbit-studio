import React from 'react';
import { X, Cpu, ShieldCheck, Zap, Layers } from 'lucide-react';

interface GettingStartedModalProps {
  onClose: () => void;
}

export const GettingStartedModal: React.FC<GettingStartedModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-xl overflow-hidden my-auto p-6 space-y-6 animate-modal-pop">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Kom godt i gang: Hardware og ledninger
              </h3>
              <p className="text-xs text-slate-400">
                Lynhurtig guide til BBC micro:bit v2 og ElecFreaks Tinker Kit
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-150 active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Hvad er Octopus:bit boardet? */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
            <h4 className="font-bold text-white text-sm flex items-center space-x-2 mb-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>1. Hvad er Octopus:bit breakout-boardet?</span>
            </h4>
            <p>
              Octopus:bit er det blå udvidelseskort, der følger med Tinker Kittet. Microbitten stikkes direkte ned i det store stik med skærmen vendt fremad. Kortet forvandler microbittens små stikben til brugervenlige 3-bens porte, som passer perfekt til ledningerne i kittet!
            </p>
          </div>

          {/* 2. G-V-S Farvekode */}
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/60">
            <h4 className="font-bold text-white text-sm flex items-center space-x-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>2. Den gyldne regel: G-V-S farvekoden</span>
            </h4>
            <p className="mb-2 text-blue-200">
              Hvert stik på Octopus:bit har 3 farvede ben i en række. Sørg altid for at vende ledningen rigtigt:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-200">
                <span className="block text-slate-400 font-bold">G = Ground (Jord)</span>
                Sort eller brun ledning (0 Volt)
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-rose-300">
                <span className="block text-rose-400 font-bold">V = VCC (Strøm)</span>
                Rød ledning (3.3 Volt forsyning)
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-amber-300">
                <span className="block text-amber-400 font-bold">S = Signal (Data)</span>
                Gul, hvid el. orange ledning
              </div>
            </div>
          </div>

          {/* 3. micro:bit v2 fordele */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50">
            <h4 className="font-bold text-emerald-300 text-sm flex items-center space-x-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>3. Fordele ved micro:bit v2</span>
            </h4>
            <p className="text-slate-300 text-xs">
              Version 2 af micro:bit har en indbygget mikrofon med rød LED-diode, en integreret højttaler på bagsiden og et touch-følsomt guld-logo på toppen. Du behøver derfor ofte færre kabler for at lave lyd og interaktion!
            </p>
          </div>
        </div>

        {/* Luk knap */}
        <div className="pt-2 flex justify-end border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-cyan-950 font-semibold text-sm transition-all duration-150 active:scale-[0.99] shadow-sm"
          >
            Forstået, lad os bygge!
          </button>
        </div>
      </div>
    </div>
  );
};
