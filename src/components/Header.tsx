import React from 'react';
import { Cpu, BookOpen, ExternalLink, HelpCircle, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onOpenGettingStarted: () => void;
  selectedCount: number;
  totalSensors: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGettingStarted,
  selectedCount,
  totalSensors
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Titel */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">
                  micro:bit <span className="text-cyan-400">v2</span>
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                  Tinker Kit Studio
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Interaktiv lærings- og kodeplatform for 16-25 årige
              </p>
            </div>
          </div>

          {/* Højre sektion med status & knapper */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                Valgt: <strong className="text-cyan-400 font-semibold">{selectedCount}</strong> / {totalSensors} sensorer
              </span>
            </div>

            <button
              onClick={onOpenGettingStarted}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition"
              title="Kom godt i gang med hardwaren"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Hardware Guide</span>
            </button>

            <a
              href="https://www.elecfreaks.com/learn-en/microbitKit/Tinker_Kit/tinker_kit.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 text-sm font-medium border border-cyan-500/30 transition"
              title="Officiel ElecFreaks Dokumentation"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">ElecFreaks Doc</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
