import React from 'react';
import type { Project, Sensor } from '../types';
import { CheckCircle2, AlertCircle, Clock, ChevronRight, Sparkles, Plus } from 'lucide-react';
import { SensorIcon } from './SensorIcon';

interface ProjectCardProps {
  project: Project;
  sensors: Sensor[];
  selectedSensorIds: string[];
  onOpenProject: (project: Project) => void;
  onSelectMissingSensor: (sensorId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  sensors,
  selectedSensorIds,
  onOpenProject,
  onSelectMissingSensor
}) => {
  // Find hvilke påkrævede sensorer brugeren har valgt, og hvilke der mangler
  const missingSensorIds = project.requiredSensors.filter(
    id => !selectedSensorIds.includes(id)
  );

  const isReady = missingSensorIds.length === 0;
  const isMissingOne = missingSensorIds.length === 1;

  const getSensorById = (id: string) => sensors.find(s => s.id === id);

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        isReady
          ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-400/80 shadow-lg shadow-emerald-950/20 hover:shadow-emerald-500/10'
          : isMissingOne
          ? 'bg-slate-900/60 border-amber-500/30 hover:border-amber-400/60'
          : 'bg-slate-900/30 border-slate-800 opacity-75 hover:opacity-100 hover:border-slate-700'
      }`}
    >
      <div className="p-5 sm:p-6">
        {/* Top bar: Status & Tid */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Status Badge */}
          {isReady ? (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Klar til at bygge</span>
            </span>
          ) : isMissingOne ? (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-semibold">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Mangler 1 sensor</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-medium border border-slate-700">
              <span>Mangler {missingSensorIds.length} sensorer</span>
            </span>
          )}

          {/* Sværhedsgrad & Tidsforbrug */}
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span
              className={`px-2 py-0.5 rounded font-medium ${
                project.difficulty === 'begynder'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : project.difficulty === 'mellem'
                  ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                  : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}
            >
              {project.difficulty === 'begynder'
                ? 'Begynder'
                : project.difficulty === 'mellem'
                ? 'Mellem'
                : 'Udfordring'}
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{project.estimatedTime}</span>
            </span>
          </div>
        </div>

        {/* Titel og Tagline */}
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition leading-snug">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* Påkrævede sensorer piller */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Påkrævet hardware:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.requiredSensors.map(sensorId => {
              const sensor = getSensorById(sensorId);
              const isSelected = selectedSensorIds.includes(sensorId);

              if (!sensor) return null;

              return (
                <span
                  key={sensorId}
                  className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                    isSelected
                      ? 'bg-slate-800 text-slate-200 border border-slate-700'
                      : 'bg-amber-950/40 text-amber-200 border border-amber-800/50 cursor-pointer hover:bg-amber-900/60'
                  }`}
                  onClick={() => !isSelected && onSelectMissingSensor(sensorId)}
                  title={isSelected ? `${sensor.name} er valgt` : `Klik for at vælge ${sensor.name}`}
                >
                  <SensorIcon name={sensor.icon} className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-amber-400'}`} />
                  <span>{sensor.name}</span>
                  {!isSelected && (
                    <Plus className="w-3 h-3 text-amber-400 stroke-[3]" />
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Hvis der mangler sensorer: Pædagogisk hjælpe-knap */}
        {isMissingOne && (
          <div className="mt-3 p-2.5 rounded-lg bg-amber-950/30 border border-amber-900/40 text-xs text-amber-300 flex items-center justify-between">
            <span>
              Tilføj <strong>{getSensorById(missingSensorIds[0])?.name}</strong> for at låse op:
            </span>
            <button
              onClick={() => onSelectMissingSensor(missingSensorIds[0])}
              className="px-2 py-0.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition text-[11px]"
            >
              Vælg sensor
            </button>
          </div>
        )}

        {/* Udvidelser teaser */}
        {project.expansionSensors.length > 0 && (
          <div className="mt-3 text-[11px] text-slate-400 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">
              Kan udvides med:{' '}
              <strong className="text-slate-300">
                {project.expansionSensors.map(e => getSensorById(e.sensorId)?.name).filter(Boolean).join(', ')}
              </strong>
            </span>
          </div>
        )}
      </div>

      {/* Nederste handling */}
      <div className="p-4 bg-slate-950/60 border-t border-slate-800/60 flex items-center justify-between">
        <button
          onClick={() => onOpenProject(project)}
          className={`w-full py-2 px-4 rounded-xl text-sm font-semibold flex items-center justify-center space-x-2 transition ${
            isReady
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
        >
          <span>{isReady ? 'Start Lektion & Kode' : 'Udforsk projekt'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
