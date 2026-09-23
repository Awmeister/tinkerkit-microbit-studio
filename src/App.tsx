import React, { useState, useMemo } from 'react';
import { SENSORS } from './data/sensors';
import { PROJECTS } from './data/projects';
import type { Project, Sensor, ProjectCategory, DifficultyLevel, SensorCategory } from './types';
import { Header } from './components/Header';
import { SensorSelector } from './components/SensorSelector';
import { ProjectFilter } from './components/ProjectFilter';
import { ProjectCard } from './components/ProjectCard';
import { ProjectPage } from './components/ProjectPage';
import { SensorModal } from './components/SensorModal';
import { GettingStartedModal } from './components/GettingStartedModal';
import { Footer } from './components/Footer';
import { Compass, Rocket, HelpCircle, Layers } from 'lucide-react';

export const App: React.FC = () => {
  // Start med standardudvalg: De fleste populære sensorer valgt
  const [selectedSensorIds, setSelectedSensorIds] = useState<string[]>([
    'pir',
    'sonar',
    'servo',
    'oled',
    'mb_speaker',
    'mb_matrix',
    'mb_mic',
    'mb_touch',
    'mb_accel'
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ready' | 'missing_one'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | ProjectCategory>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | DifficultyLevel>('all');

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeSensor, setActiveSensor] = useState<Sensor | null>(null);
  const [isGettingStartedOpen, setIsGettingStartedOpen] = useState(false);

  // Sensor vælger handlinger
  const handleToggleSensor = (sensorId: string) => {
    setSelectedSensorIds(prev =>
      prev.includes(sensorId)
        ? prev.filter(id => id !== sensorId)
        : [...prev, sensorId]
    );
  };

  const handleSelectAll = () => {
    setSelectedSensorIds(SENSORS.map(s => s.id));
  };

  const handleClearAll = () => {
    setSelectedSensorIds([]);
  };

  const handleSelectOnlyCategory = (category: SensorCategory) => {
    setSelectedSensorIds(SENSORS.filter(s => s.category === category).map(s => s.id));
  };

  const handleSelectMissingSensor = (sensorId: string) => {
    if (!selectedSensorIds.includes(sensorId)) {
      setSelectedSensorIds(prev => [...prev, sensorId]);
    }
  };

  // Filtreringslogik
  const { filteredProjects, readyCount, missingOneCount } = useMemo(() => {
    let ready = 0;
    let missingOne = 0;

    PROJECTS.forEach(project => {
      const missingCount = project.requiredSensors.filter(
        id => !selectedSensorIds.includes(id)
      ).length;

      if (missingCount === 0) ready++;
      else if (missingCount === 1) missingOne++;
    });

    const filtered = PROJECTS.filter(project => {
      // 1. Søgning
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesTagline = project.tagline.toLowerCase().includes(q);
        const matchesSensors = project.requiredSensors.some(id => {
          const s = SENSORS.find(sensor => sensor.id === id);
          return s && s.name.toLowerCase().includes(q);
        });

        if (!matchesTitle && !matchesTagline && !matchesSensors) {
          return false;
        }
      }

      // 2. Kategori filter
      if (categoryFilter !== 'all' && project.category !== categoryFilter) {
        return false;
      }

      // 3. Sværhedsgrad filter
      if (difficultyFilter !== 'all' && project.difficulty !== difficultyFilter) {
        return false;
      }

      // 4. Status filter
      const missingCount = project.requiredSensors.filter(
        id => !selectedSensorIds.includes(id)
      ).length;

      if (statusFilter === 'ready' && missingCount > 0) return false;
      if (statusFilter === 'missing_one' && missingCount !== 1) return false;

      return true;
    });

    // Sorter: Projekter der er klar til at bygge kommer først
    filtered.sort((a, b) => {
      const aMissing = a.requiredSensors.filter(id => !selectedSensorIds.includes(id)).length;
      const bMissing = b.requiredSensors.filter(id => !selectedSensorIds.includes(id)).length;
      return aMissing - bMissing;
    });

    return {
      filteredProjects: filtered,
      readyCount: ready,
      missingOneCount: missingOne
    };
  }, [selectedSensorIds, searchQuery, statusFilter, categoryFilter, difficultyFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <Header
        onOpenGettingStarted={() => setIsGettingStartedOpen(true)}
        selectedCount={selectedSensorIds.length}
        totalSensors={SENSORS.length}
      />

      {/* Hovedindhold: Enten fuld lektionsside eller projektoversigt */}
      {activeProject ? (
        <main className="flex-1 py-6">
          <ProjectPage
            project={activeProject}
            sensors={SENSORS}
            onBack={() => {
              setActiveProject(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : (
        <>
          {/* Hero Banner */}
          <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-12 sm:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))]" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-sm">
                <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                <span>Teknologiforståelse og fysisk computing</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
                Lær at bygge og kode med <span className="text-cyan-400">micro:bit v2 og Tinker Kit</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Vælg de sensorer du vil eksperimentere med, find spændende projekter inden for smart home, robotik og spil, og følg pædagogiske kode-lektioner med MakeCode-blokke eller Python!
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setIsGettingStartedOpen(true)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700 flex items-center space-x-2 transition-all duration-150 active:scale-95"
                >
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  <span>Se hardware-guide for begyndere</span>
                </button>
              </div>
            </div>
          </div>

          {/* TRIN 1: SENSOR VÆLGER */}
          <SensorSelector
            sensors={SENSORS}
            selectedSensorIds={selectedSensorIds}
            onToggleSensor={handleToggleSensor}
            onSelectAll={handleSelectAll}
            onClearAll={handleClearAll}
            onSelectOnlyCategory={handleSelectOnlyCategory}
            onOpenSensorDetail={sensor => setActiveSensor(sensor)}
          />

          {/* TRIN 2: PROJEKTOVERBLIK OG FILTER */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-6">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-950 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Trin 2: Vælg et projekt</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Foreslåede projekter til dine sensorer
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Her er projekter der matcher dine valgte sensorer. Du kan filtrere eller klikke for at åbne lektionen.
              </p>
            </div>

            {/* Filter Toolbar */}
            <ProjectFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
              difficultyFilter={difficultyFilter}
              onDifficultyFilterChange={setDifficultyFilter}
              readyCount={readyCount}
              missingOneCount={missingOneCount}
              totalProjects={PROJECTS.length}
            />

            {/* Projekt Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    sensors={SENSORS}
                    selectedSensorIds={selectedSensorIds}
                    onOpenProject={p => {
                      setActiveProject(p);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onSelectMissingSensor={handleSelectMissingSensor}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40 max-w-lg mx-auto">
                <Compass className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">
                  Ingen projekter fundet med disse filtre
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-4">
                  Prøv at nulstille filtrene eller vælg flere sensorer øverst på siden.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setCategoryFilter('all');
                    setDifficultyFilter('all');
                    handleSelectAll();
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-cyan-950 font-bold text-xs transition-all duration-150 active:scale-95 shadow-md shadow-cyan-500/20"
                >
                  Vis alle projekter
                </button>
              </div>
            )}
          </main>
        </>
      )}

      {/* Sensor Info Modal */}
      {activeSensor && (
        <SensorModal
          sensor={activeSensor}
          isSelected={selectedSensorIds.includes(activeSensor.id)}
          onToggleSelect={handleToggleSensor}
          onClose={() => setActiveSensor(null)}
        />
      )}

      {/* Hardware Kom-godt-i-gang Modal */}
      {isGettingStartedOpen && (
        <GettingStartedModal onClose={() => setIsGettingStartedOpen(false)} />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
