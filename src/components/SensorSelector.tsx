import React, { useState } from 'react';
import type { Sensor, SensorCategory } from '../types';
import { SensorIcon } from './SensorIcon';
import { Check, Info, SlidersHorizontal, Package, Cpu } from 'lucide-react';

interface SensorSelectorProps {
  sensors: Sensor[];
  selectedSensorIds: string[];
  onToggleSensor: (sensorId: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onSelectOnlyCategory: (category: SensorCategory) => void;
  onOpenSensorDetail: (sensor: Sensor) => void;
}

export const SensorSelector: React.FC<SensorSelectorProps> = ({
  sensors,
  selectedSensorIds,
  onToggleSensor,
  onSelectAll,
  onClearAll,
  onSelectOnlyCategory,
  onOpenSensorDetail
}) => {
  const [activeTab, setActiveTab] = useState<'all' | SensorCategory>('all');

  const filteredSensors = sensors.filter(sensor => {
    if (activeTab === 'all') return true;
    return sensor.category === activeTab;
  });

  const tinkerKitCount = sensors.filter(s => s.category === 'tinker_kit').length;
  const v2Count = sensors.filter(s => s.category === 'microbit_v2').length;

  return (
    <section className="py-8 border-b border-slate-800 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sektionsoverskrift og pædagogisk intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Hvilke sensorer vil du arbejde med?
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Klik på de moduler og sensorer, du har liggende foran dig. Hjemmesiden finder automatisk ud af, hvilke fede projekter du kan bygge lige nu!
            </p>
          </div>

          {/* Hurtig-handlinger */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onSelectAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all duration-150 active:scale-[0.99]"
            >
              Vælg alle ({sensors.length})
            </button>
            <button
              onClick={() => onSelectOnlyCategory('tinker_kit')}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all duration-150 active:scale-[0.99]"
            >
              Kun Tinker Kit
            </button>
            <button
              onClick={() => onSelectOnlyCategory('microbit_v2')}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all duration-150 active:scale-[0.99]"
            >
              Kun micro:bit v2
            </button>
            <button
              onClick={onClearAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 transition-all duration-150 active:scale-[0.99]"
            >
              Nulstil
            </button>
          </div>
        </div>

        {/* Kategori-faner */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 active:scale-[0.99] ${
              activeTab === 'all'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700 font-semibold shadow-sm'
                : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-400 border border-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span>Alle moduler ({sensors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tinker_kit')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 active:scale-[0.99] ${
              activeTab === 'tinker_kit'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700 font-semibold shadow-sm'
                : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-400 border border-slate-800'
            }`}
          >
            <Package className="w-4 h-4 text-slate-400" />
            <span>ElecFreaks Tinker Kit ({tinkerKitCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('microbit_v2')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 active:scale-[0.99] ${
              activeTab === 'microbit_v2'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700 font-semibold shadow-sm'
                : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-400 border border-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4 text-slate-400" />
            <span>micro:bit v2 indbyggede ({v2Count})</span>
          </button>
        </div>

        {/* Sensor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredSensors.map(sensor => {
            const isSelected = selectedSensorIds.includes(sensor.id);

            return (
              <div
                key={sensor.id}
                onClick={() => onToggleSensor(sensor.id)}
                className={`group relative rounded-xl p-3.5 cursor-pointer border transition-all duration-150 select-none active:scale-[0.99] ${
                  isSelected
                    ? 'bg-slate-850/90 border-cyan-500/50 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  {/* Ikon og navn */}
                  <div className="flex items-center space-x-2.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150 ${
                        isSelected
                          ? `bg-gradient-to-tr ${sensor.color} text-white shadow-sm`
                          : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      <SensorIcon name={sensor.icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition leading-snug">
                        {sensor.name}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                        {sensor.pinRecommendation}
                      </span>
                    </div>
                  </div>

                  {/* Afkrydsningsboks med pop-animation */}
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all duration-150 shrink-0 ${
                      isSelected
                        ? 'bg-cyan-500 border-cyan-400 text-cyan-950 shadow-sm'
                        : 'border-slate-700 bg-slate-800/50 text-transparent'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] animate-check-pop" />}
                  </div>
                </div>

                {/* Kort beskrivelse */}
                <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                  {sensor.shortDesc}
                </p>

                {/* Nederste linje med type-badge og Info knap */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded font-mono uppercase tracking-wider font-medium bg-slate-950 border border-slate-800 text-slate-400">
                    {sensor.signalType === 'i2c'
                      ? 'I2C Bus'
                      : sensor.signalType === 'analog'
                      ? 'Analog 0-1023'
                      : sensor.signalType === 'digital'
                      ? 'Digital 0/1'
                      : 'micro:bit v2'}
                  </span>

                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      onOpenSensorDetail(sensor);
                    }}
                    className="p-1 text-slate-400 hover:text-cyan-300 hover:bg-slate-700/60 rounded transition"
                    title={`Læs mere om ${sensor.name}`}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
