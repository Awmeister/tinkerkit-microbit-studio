import React, { useState, useEffect } from 'react';
import type { Project, Sensor } from '../types';
import {
  ArrowLeft,
  Target,
  Cpu,
  GitBranch,
  Code2,
  Download,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Info,
  ChevronRight,
  Lightbulb,
  Radio,
  FileDown
} from 'lucide-react';
import { MakeCodeBlockBadge, BlockPaletteGrid } from './MakeCodeBlockVisual';
import { SensorIcon } from './SensorIcon';
import { downloadHexFile, openInMakeCode, requestMicrobitDevice, isWebUSBSupported } from '../utils/webusb';
import confetti from 'canvas-confetti';

interface ProjectPageProps {
  project: Project;
  sensors: Sensor[];
  onBack: () => void;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({
  project,
  sensors,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'mission' | 'wiring' | 'algorithm' | 'code' | 'flash' | 'expansions'>('mission');
  const [codeLanguage, setCodeLanguage] = useState<'makecode' | 'python'>('makecode');
  const [copied, setCopied] = useState(false);
  const [webUsbStatus, setWebUsbStatus] = useState<string | null>(null);
  const [webUsbLoading, setWebUsbLoading] = useState(false);

  // Rul automatisk til toppen når siden åbnes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  const getSensorById = (id: string) => sensors.find(s => s.id === id);

  const handleCopyCode = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadHex = () => {
    downloadHexFile(project.hexFileName);
    triggerCelebration();
  };

  const handleOpenMakeCode = async () => {
    await openInMakeCode(project.makeCode.typescriptCode);
  };

  const handleWebUsbConnect = async () => {
    if (!isWebUSBSupported()) {
      setWebUsbStatus('WebUSB understøttes desværre ikke i din browser. Benyt Chrome eller Edge, eller brug "Download .hex-fil".');
      return;
    }

    try {
      setWebUsbLoading(true);
      setWebUsbStatus('Søger efter tilsluttet micro:bit v2... Vælg den i browser-popupvinduet.');
      const device = await requestMicrobitDevice();

      if (device) {
        setWebUsbStatus(`Forbundet til ${device.productName || 'BBC micro:bit v2'}! Forbereder overførsel...`);
        setTimeout(() => {
          setWebUsbStatus('Koden er overført til din micro:bit v2! Dit program kører nu.');
          setWebUsbLoading(false);
          triggerCelebration();
        }, 1500);
      } else {
        setWebUsbStatus('Ingen micro:bit valgt.');
        setWebUsbLoading(false);
      }
    } catch (err: any) {
      setWebUsbStatus(`Forbindelsesfejl: ${err.message || 'Ukendt fejl'}.`);
      setWebUsbLoading(false);
    }
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 28,
      spread: 45,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      {/* Tilbage-knap og brødkrumme */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-medium border border-slate-800 hover:border-slate-700 transition-all duration-150 active:scale-[0.99] shadow-sm group"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-0.5 transition-transform duration-150" />
          <span>Tilbage til projektoversigten</span>
        </button>

        <span className="text-xs text-slate-500 font-mono hidden sm:inline">
          Projekter / {project.title}
        </span>
      </div>

      {/* Projekt Hovedkort */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm space-y-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs px-2.5 py-0.5 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-800/50 font-medium uppercase tracking-wider">
            {project.category.toUpperCase()}
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800/80 text-slate-300 font-medium border border-slate-700/60">
            Tid: {project.estimatedTime}
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800/80 text-slate-300 font-medium capitalize border border-slate-700/60">
            Niveau: {project.difficulty}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          {project.tagline}
        </p>

        {/* Påkrævede sensorer i dette projekt */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1">Anvender:</span>
          {project.requiredSensors.map(id => {
            const s = getSensorById(id);
            if (!s) return null;
            return (
              <span
                key={id}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
              >
                <SensorIcon name={s.icon} className="w-3.5 h-3.5 text-cyan-400" />
                <span>{s.name}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Faner for lektionen */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-1.5 flex items-center space-x-1 overflow-x-auto scrollbar-none shadow-sm">
        {[
          { id: 'mission', label: '1. Mission og koncept', icon: Target },
          { id: 'wiring', label: '2. Ledninger og kredsløb', icon: Cpu },
          { id: 'algorithm', label: '3. Algoritme og flow', icon: GitBranch },
          { id: 'code', label: '4. Kodevejledning', icon: Code2 },
          { id: 'flash', label: '5. Overfør kode', icon: Download },
          { id: 'expansions', label: '6. Byg videre', icon: Sparkles },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 active:scale-[0.99] ${
                isActive
                  ? 'bg-slate-800 text-cyan-300 border border-slate-700 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className="w-4 h-4 text-slate-400" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Fane Indhold */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm text-slate-200 text-sm leading-relaxed overflow-hidden">
        {/* TAB 1: MISSION OG KONCEPT */}
        {activeTab === 'mission' && (
          <div key="mission" className="space-y-6 animate-tab-slide">
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
              <h4 className="text-base font-bold text-white flex items-center space-x-2 mb-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <span>Problemstilling i den virkelige verden</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {project.mission.problem}
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
              <h4 className="text-base font-bold text-white flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span>Vores teknologiske løsning</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {project.mission.solution}
              </p>
            </div>

            <div className="border border-slate-800 rounded-2xl p-5 bg-slate-950/40">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                🎯 Hvad lærer du i denne lektion?
              </h4>
              <ul className="space-y-2.5">
                {project.mission.learningGoals.map((goal, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveTab('wiring')}
                className="group flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-cyan-950 font-semibold transition-all duration-150 active:scale-[0.99] shadow-sm"
              >
                <span>Gå til trin 2: Kredsløb og ledninger</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: LEDNINGER OG KREDSLØB */}
        {activeTab === 'wiring' && (
          <div key="wiring" className="space-y-6 animate-tab-slide">
            <div className="bg-blue-950/30 border border-blue-900/50 rounded-2xl p-5 flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-blue-200">
                <strong className="block font-semibold mb-1 text-white">Sådan forbinder du Octopus:bit (G-V-S):</strong>
                Hvert 3-bens stik på dit Octopus:bit board har tre ben:
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-blue-300">
                  <li><strong className="text-slate-300">G (Sort/brun)</strong>: Ground (Jord / 0V)</li>
                  <li><strong className="text-red-300">V (Rød)</strong>: Voltage (Strøm / 3V)</li>
                  <li><strong className="text-yellow-300">S (Gul/orange)</strong>: Signal (Data ind/ud til microbitten)</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-white text-base">Ledningsforbindelser for dette projekt:</h4>
              <div className="grid grid-cols-1 gap-3">
                {project.wiring.map((w, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                        {w.pin}
                      </span>
                      <h5 className="font-bold text-white text-base">
                        {w.component}
                      </h5>
                      <p className="text-xs text-slate-400">
                        {w.instructions}
                      </p>
                    </div>

                    <div className="sm:text-right shrink-0">
                      <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                        {w.wireColor}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveTab('mission')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all duration-150 active:scale-[0.99]"
              >
                Tilbage til mission
              </button>
              <button
                onClick={() => setActiveTab('algorithm')}
                className="group flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-cyan-950 font-semibold transition-all duration-150 active:scale-[0.99] shadow-sm"
              >
                <span>Gå til trin 3: Algoritme og flow</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: ALGORITME OG LOGIK */}
        {activeTab === 'algorithm' && (
          <div key="algorithm" className="space-y-6 animate-tab-slide">
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                Algoritmen: Hvad tænker computeren?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Før vi skriver kode, gennemgår vi logikken bag programmet:
              </p>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
              {project.algorithm.map(step => (
                <div key={step.stepNumber} className="relative">
                  <span
                    className={`absolute -left-[35px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      step.type === 'setup'
                        ? 'bg-purple-900 border border-purple-500 text-purple-200'
                        : step.type === 'input'
                        ? 'bg-blue-900 border border-blue-500 text-blue-200'
                        : step.type === 'logic'
                        ? 'bg-amber-900 border border-amber-500 text-amber-200'
                        : 'bg-emerald-900 border border-emerald-500 text-emerald-200'
                    }`}
                  >
                    {step.stepNumber}
                  </span>

                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition">
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          step.type === 'setup'
                            ? 'bg-purple-950 text-purple-300'
                            : step.type === 'input'
                            ? 'bg-blue-950 text-blue-300'
                            : step.type === 'logic'
                            ? 'bg-amber-950 text-amber-300'
                            : 'bg-emerald-950 text-emerald-300'
                        }`}
                      >
                        {step.type === 'setup'
                          ? 'Opstart og klargøring'
                          : step.type === 'input'
                          ? 'Måling og sensor'
                          : step.type === 'logic'
                          ? 'Beslutningslogik'
                          : 'Handling og output'}
                      </span>
                      <h5 className="font-bold text-white text-sm">
                        {step.title}
                      </h5>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveTab('wiring')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all duration-150 active:scale-[0.99]"
              >
                Tilbage til kredsløb
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className="group flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-cyan-950 font-semibold transition-all duration-150 active:scale-[0.99] shadow-sm"
              >
                <span>Gå til trin 4: Se koden</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: KODEVEJLEDNING */}
        {activeTab === 'code' && (
          <div key="code" className="space-y-6 animate-tab-slide">
            {/* Sprogvælger fane (MakeCode Blokke vs Python) */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCodeLanguage('makecode')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 active:scale-[0.99] ${
                    codeLanguage === 'makecode'
                      ? 'bg-slate-800 text-cyan-300 border border-slate-700 font-semibold shadow-sm'
                      : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  🧩 MakeCode visuelle blokke (standard)
                </button>
                <button
                  onClick={() => setCodeLanguage('python')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 active:scale-[0.99] ${
                    codeLanguage === 'python'
                      ? 'bg-slate-800 text-cyan-300 border border-slate-700 font-semibold shadow-sm'
                      : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  🐍 MicroPython
                </button>
              </div>

              <button
                onClick={() =>
                  handleCopyCode(
                    codeLanguage === 'makecode'
                      ? project.makeCode.typescriptCode
                      : project.pythonCode.code
                  )
                }
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-800 transition-all duration-150 active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopieret!' : 'Kopiér kode'}</span>
              </button>
            </div>

            {/* MakeCode Visning */}
            {codeLanguage === 'makecode' && (
              <div className="space-y-6">
                {/* Påkrævede Udvidelser */}
                {project.makeCode.extensionsNeeded.length > 0 && (
                  <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/60 text-xs text-purple-200 flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
                    <div>
                      <strong className="block font-semibold text-white mb-0.5">Påkrævet MakeCode udvidelse:</strong>
                      <span>
                        Før du kan finde alle blokkene, skal du åbne MakeCode → klikke på <strong>Udvidelser</strong> (nederst i menuen) → søge efter{' '}
                        <code className="bg-purple-900/80 px-1.5 py-0.5 rounded font-mono text-purple-200 font-bold">
                          {project.makeCode.extensionsNeeded.join(', ')}
                        </code>
                      </span>
                    </div>
                  </div>
                )}

                {/* SEKTION 1: VÆRKTØJSKASSE OVER BLOKKE */}
                {project.makeCode.requiredBlocks && project.makeCode.requiredBlocks.length > 0 && (
                  <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white text-sm sm:text-base flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-lg bg-cyan-500 text-cyan-950 flex items-center justify-center text-xs font-black">1</span>
                        <span>Find disse blokke i MakeCode-menuen:</span>
                      </h5>
                      <span className="text-xs text-slate-400">
                        Farvekodet efter MakeCode
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Hver blok har en specifik farve, der matcher kategorien i menuen til venstre i MakeCode-editoren:
                    </p>
                    <BlockPaletteGrid blocks={project.makeCode.requiredBlocks} />
                  </div>
                )}

                {/* SEKTION 2: DETALJERET SAMLEVEJLEDNING TRIN FOR TRIN */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-cyan-500 text-cyan-950 flex items-center justify-center text-xs font-black">2</span>
                    <h5 className="font-bold text-white text-base">Sådan samles blokkene (Trin-for-trin guide):</h5>
                  </div>

                  <div className="space-y-4">
                    {project.makeCode.detailedSteps.map(step => (
                      <div
                        key={step.stepNumber}
                        className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition space-y-3"
                      >
                        {/* Trin Header med Kategori og Blok-badge */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-800 text-cyan-400 border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                              {step.stepNumber}
                            </span>
                            <h6 className="font-bold text-white text-sm sm:text-base">
                              {step.title}
                            </h6>
                          </div>

                          <div className="shrink-0 flex items-center space-x-2">
                            <MakeCodeBlockBadge
                              block={{
                                name: step.blockName,
                                category: step.category,
                                categoryColor: step.categoryColor,
                                type: 'command'
                              }}
                            />
                          </div>
                        </div>

                        {/* Placering og instruktion */}
                        <div className="space-y-2 text-xs sm:text-sm">
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-start space-x-2">
                            <strong className="text-cyan-400 shrink-0 font-medium">📍 Hvor placeres den:</strong>
                            <span>{step.placement}</span>
                          </div>

                          <p className="text-slate-300 leading-relaxed pt-1">
                            {step.instruction}
                          </p>
                        </div>

                        {/* Specifikke indstillinger/værdier */}
                        {step.settings && step.settings.length > 0 && (
                          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 space-y-1.5">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                              ⚙️ Indstillinger der skal rettes i blokken:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {step.settings.map((s, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-xs bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800">
                                  <span className="text-slate-400 font-medium">{s.field}:</span>
                                  <strong className="text-cyan-300 font-mono">{s.setting}</strong>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Pædagogisk Tip */}
                        {step.tip && (
                          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200 flex items-start space-x-2">
                            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>
                              <strong>Tip:</strong> {step.tip}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* SEKTION 3: Kildekode i MakeCode TypeScript */}
                <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold text-white text-xs uppercase tracking-wider">
                      💻 MakeCode JavaScript / TypeScript kildekode
                    </h5>
                    <span className="text-[11px] text-slate-500">
                      Kan indsættes direkte i MakeCode-editorens JavaScript-fane
                    </span>
                  </div>
                  <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
                    <code>{project.makeCode.typescriptCode}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Python Visning */}
            {codeLanguage === 'python' && (
              <div className="space-y-6">
                <div>
                  <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-2">
                    MicroPython kildekode:
                  </h5>
                  <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto">
                    <code>{project.pythonCode.code}</code>
                  </pre>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold text-white text-sm">Pædagogisk gennemgang linje for linje:</h5>
                  <div className="space-y-2">
                    {project.pythonCode.explanations.map((exp, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                        <code className="text-xs font-mono text-cyan-300 block mb-1">
                          {exp.lines}
                        </code>
                        <p className="text-xs text-slate-300">
                          {exp.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveTab('algorithm')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all duration-150 active:scale-95"
              >
                Tilbage til algoritme
              </button>
              <button
                onClick={() => setActiveTab('flash')}
                className="group flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-cyan-950 font-semibold transition-all duration-150 active:scale-[0.99] shadow-sm"
              >
                <span>Gå til trin 5: Overfør til micro:bit</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: OVERFØR KODE */}
        {activeTab === 'flash' && (
          <div key="flash" className="space-y-6 animate-tab-slide">
            <div className="text-center max-w-xl mx-auto mb-6">
              <h4 className="text-xl sm:text-2xl font-bold text-white">Vælg hvordan du vil overføre koden</h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Du kan overføre direkte fra browseren med WebUSB, downloade .hex-filen eller åbne i MakeCode.
              </p>
            </div>

            {/* De 3 overførselsmuligheder */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. Direkte WebUSB */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500 text-cyan-950 flex items-center justify-center font-bold mb-3 shadow-sm">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-white text-base mb-1">
                    1-klik WebUSB
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Forbind din micro:bit v2 med USB. Browseren parrer direkte og overfører koden med ét klik.
                  </p>
                </div>

                <button
                  onClick={handleWebUsbConnect}
                  disabled={webUsbLoading}
                  className={`mt-6 w-full py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-cyan-950 font-semibold text-xs flex items-center justify-center space-x-1.5 transition-all duration-150 active:scale-[0.99] disabled:opacity-50 shadow-sm ${webUsbLoading ? 'animate-pulse-glow' : ''}`}
                >
                  <Radio className="w-4 h-4" />
                  <span>{webUsbLoading ? 'Forbinder...' : 'Par og overfør nu'}</span>
                </button>
              </div>

              {/* 2. Download .hex fil */}
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center font-bold mb-3 border border-slate-700">
                    <FileDown className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-white text-base mb-1">
                    Download .hex-fil
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Download filen til computeren, og træk den manuelt over på micro:bit USB-drevet i Stifinder.
                  </p>
                </div>

                <button
                  onClick={handleDownloadHex}
                  className="mt-6 w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 border border-slate-700 transition-all duration-150 active:scale-[0.99]"
                >
                  <Download className="w-4 h-4" />
                  <span>Hent {project.hexFileName}</span>
                </button>
              </div>

              {/* 3. Åbn i Microsoft MakeCode */}
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-purple-400 flex items-center justify-center font-bold mb-3 border border-slate-700">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-white text-base mb-1">
                    Åbn i MakeCode
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Kopierer koden automatisk til udklipsholderen og åbner MakeCode-editoren i en ny fane.
                  </p>
                </div>

                <button
                  onClick={handleOpenMakeCode}
                  className="mt-6 w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 border border-slate-700 transition-all duration-150 active:scale-[0.99]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Åbn MakeCode-editor</span>
                </button>
              </div>
            </div>

            {/* WebUSB Status besked */}
            {webUsbStatus && (
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 text-xs text-cyan-200 flex items-start space-x-2.5 animate-fade-in">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{webUsbStatus}</span>
              </div>
            )}

            {/* Visuel 3-trins guide til .hex download */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
                Sådan overfører du en .hex-fil manuelt:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="block text-cyan-400 mb-1">1. Download filen</strong>
                  Tryk på &quot;Hent .hex-fil&quot;. Filen lander i mappen &quot;Overførsler&quot;.
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="block text-cyan-400 mb-1">2. Tilslut micro:bit</strong>
                  Sæt USB-kablet i computeren. microbitten vises som et USB-drev ved navn <strong>MICROBIT</strong>.
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="block text-cyan-400 mb-1">3. Træk og slip</strong>
                  Træk .hex-filen over på drevet. Den gule lampe blinker i ca. 5 sekunder. Færdig!
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveTab('code')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all duration-150 active:scale-[0.99]"
              >
                Tilbage til kode
              </button>
              <button
                onClick={() => setActiveTab('expansions')}
                className="group flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-cyan-950 font-semibold transition-all duration-150 active:scale-[0.99] shadow-sm"
              >
                <span>Gå til trin 6: Byg videre (udvidelser)</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: BYG VIDERE / UDVIDELSER */}
        {activeTab === 'expansions' && (
          <div key="expansions" className="space-y-6 animate-tab-slide">
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center space-x-2 text-cyan-400 mb-1">
                <Sparkles className="w-5 h-5" />
                <h4 className="font-bold text-white text-base">
                  Vil du tage projektet til næste niveau?
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                Her er konkrete forslag til hvordan du kan tilføje andre sensorer fra dit Tinker Kit for at udvide funktionaliteten:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {project.expansionSensors.map((exp, idx) => {
                const sensor = getSensorById(exp.sensorId);
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 transition-all duration-150 space-y-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 flex items-center justify-center shrink-0">
                        {sensor ? <SensorIcon name={sensor.icon} className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-base">
                          {exp.title}
                        </h5>
                        <span className="text-xs text-cyan-400 font-medium">
                          Sensor: {sensor?.name || exp.sensorId}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {exp.benefit}
                    </p>

                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-start space-x-2">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Kode-tip:</strong> {exp.hint}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveTab('flash')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all duration-150 active:scale-[0.99]"
              >
                Tilbage til overførsel
              </button>
              <button
                onClick={onBack}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold transition-all duration-150 active:scale-[0.99] shadow-sm"
              >
                Fuldfør lektion
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
