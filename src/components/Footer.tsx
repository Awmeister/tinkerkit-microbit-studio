import React from 'react';
import { Cpu, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-10 mt-16 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">
                micro:bit v2 + ElecFreaks Tinker Kit Læringsplatform
              </p>
              <p className="text-[11px] text-slate-500">
                Pædagogisk undervisningsværktøj udviklet til faget Teknologiforståelse (16-25 år)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a
              href="https://makecode.microbit.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 flex items-center space-x-1 transition"
            >
              <span>Microsoft MakeCode</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://python.microbit.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 flex items-center space-x-1 transition"
            >
              <span>MicroPython Editor</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.elecfreaks.com/learn-en/microbitKit/Tinker_Kit/tinker_kit.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 flex items-center space-x-1 transition"
            >
              <span>ElecFreaks Tinker Kit</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px]">
          <p>
            Klar til direkte deployment på GitHub Pages • 100% statisk & browser-afviklet
          </p>
          <p className="flex items-center space-x-1">
            <span>Bygget med nysgerrighed og maker-glæde</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
