import React from 'react';
import type { ProjectCategory, DifficultyLevel } from '../types';
import { Search, Filter, CheckCircle2, AlertCircle, Layers } from 'lucide-react';

interface ProjectFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: 'all' | 'ready' | 'missing_one';
  onStatusFilterChange: (status: 'all' | 'ready' | 'missing_one') => void;
  categoryFilter: 'all' | ProjectCategory;
  onCategoryFilterChange: (cat: 'all' | ProjectCategory) => void;
  difficultyFilter: 'all' | DifficultyLevel;
  onDifficultyFilterChange: (diff: 'all' | DifficultyLevel) => void;
  readyCount: number;
  missingOneCount: number;
  totalProjects: number;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  difficultyFilter,
  onDifficultyFilterChange,
  readyCount,
  missingOneCount,
  totalProjects
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Søgefelt & Status-knapper */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Søgefelt */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Søg efter projektnavn, f.eks. 'tyverialarm', 'plante', 'klaver'..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
          />
        </div>

        {/* Status filter (Klar / Mangler 1) */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onStatusFilterChange('all')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              statusFilter === 'all'
                ? 'bg-slate-700 text-white font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Alle ({totalProjects})</span>
          </button>

          <button
            onClick={() => onStatusFilterChange('ready')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              statusFilter === 'ready'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-emerald-400 hover:bg-slate-800 border border-emerald-900/40'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Klar til at bygge ({readyCount})</span>
          </button>

          <button
            onClick={() => onStatusFilterChange('missing_one')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              statusFilter === 'missing_one'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-amber-400 hover:bg-slate-800 border border-amber-900/40'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Mangler kun 1 sensor ({missingOneCount})</span>
          </button>
        </div>
      </div>

      {/* Filter Chips: Kategori & Sværhedsgrad */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-850">
        <div className="flex items-center space-x-1 text-xs text-slate-400 mr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Kategori:</span>
        </div>

        {[
          { id: 'all', label: 'Alle emner' },
          { id: 'security', label: '🛡️ Sikkerhed' },
          { id: 'robotics', label: '🤖 Robotik' },
          { id: 'smarthome', label: '🏠 Smart Home' },
          { id: 'nature', label: '🌱 Natur & Klima' },
          { id: 'games', label: '🎮 Spil' },
          { id: 'audio', label: '🎵 Lyd & Musik' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => onCategoryFilterChange(cat.id as any)}
            className={`text-xs px-2.5 py-1 rounded-md transition ${
              categoryFilter === cat.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}

        <div className="h-4 w-[1px] bg-slate-800 mx-2 hidden sm:block" />

        <div className="flex items-center space-x-1 text-xs text-slate-400 ml-auto">
          <span>Sværhedsgrad:</span>
          <select
            value={difficultyFilter}
            onChange={e => onDifficultyFilterChange(e.target.value as any)}
            className="bg-slate-900 text-slate-300 text-xs rounded-md border border-slate-800 px-2 py-1 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">Alle niveauer</option>
            <option value="begynder">Begynder</option>
            <option value="mellem">Mellem</option>
            <option value="avanceret">Avanceret</option>
          </select>
        </div>
      </div>
    </div>
  );
};
