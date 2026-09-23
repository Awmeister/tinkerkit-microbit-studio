import React from 'react';
import type { Sensor } from '../types';
import { X, Info, Lightbulb } from 'lucide-react';
import { SensorIcon } from './SensorIcon';

interface SensorModalProps {
  sensor: Sensor;
  onClose: () => void;
  onToggleSelect: (sensorId: string) => void;
  isSelected: boolean;
}

export const SensorModal: React.FC<SensorModalProps> = ({
  sensor,
  onClose,
  onToggleSelect,
  isSelected
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${sensor.color} flex items-center justify-center text-white shadow-lg`}>
              <SensorIcon name={sensor.icon} className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                {sensor.category === 'tinker_kit' ? 'ElecFreaks Tinker Kit' : 'micro:bit v2'}
              </span>
              <h3 className="text-xl font-bold text-white">
                {sensor.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Beskrivelse */}
        <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-1 flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Hvordan virker den?</span>
            </h4>
            <p>{sensor.description}</p>
          </div>

          {/* Teknisk Tip */}
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/50">
            <h4 className="font-semibold text-amber-300 text-xs uppercase tracking-wider mb-1 flex items-center space-x-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Pædagogisk og teknisk tip</span>
            </h4>
            <p className="text-amber-200 text-xs">{sensor.techTip}</p>
          </div>

          {/* Signaltype og port */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block mb-0.5">Signaltype:</span>
              <strong className="text-white font-mono uppercase">
                {sensor.signalType}
              </strong>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block mb-0.5">Anbefalet port:</span>
              <strong className="text-cyan-400 font-mono">
                {sensor.pinRecommendation}
              </strong>
            </div>
          </div>
        </div>

        {/* Handlinger */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800">
          <button
            onClick={() => {
              onToggleSelect(sensor.id);
              onClose();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              isSelected
                ? 'bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold'
            }`}
          >
            {isSelected ? 'Fjern fra mit udvalg' : '+ Vælg denne sensor'}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs sm:text-sm transition"
          >
            Luk
          </button>
        </div>
      </div>
    </div>
  );
};
