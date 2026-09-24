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
          {/* Logo og titel */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">
                  micro:bit <span className="text-cyan-400">v2</span>
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800 font-medium">
                  Tinker Kit Studio
                </span>
              </div>
            </div>
          </div>

          {/* Højre sektion med status og knapper */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                Valgt: <strong className="text-cyan-400 font-semibold">{selectedCount}</strong> / {totalSensors} sensorer
              </span>
            </div>

            <button
              onClick={onOpenGettingStarted}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition-all duration-150 active:scale-95"
              title="Kom godt i gang med hardwaren"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Hardware-guide</span>
            </button>

            <a
              href="https://www.elecfreaks.com/learn-en/microbitKit/Tinker_Kit/tinker_kit.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 text-sm font-medium border border-cyan-500/30 transition-all duration-150 active:scale-95"
              title="Officiel ElecFreaks dokumentation"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">ElecFreaks dokumentation</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <a
              href="https://github.com/Awmeister/tinkerkit-microbit-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition-all duration-150 active:scale-95"
              title="Se kildekoden på GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
