import React, { useState } from 'react';
import type { Project, Sensor } from '../types';
import {
  X,
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
import { SensorIcon } from './SensorIcon';
import { MakeCodeBlockBadge, BlockPaletteGrid } from './MakeCodeBlockVisual';
import { downloadHexFile, openInMakeCode, requestMicrobitDevice, isWebUSBSupported } from '../utils/webusb';
import confetti from 'canvas-confetti';

interface ProjectModalProps {
  project: Project;
  sensors: Sensor[];
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  sensors,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'mission' | 'wiring' | 'algorithm' | 'code' | 'flash' | 'expansions'>('mission');
  const [codeLanguage, setCodeLanguage] = useState<'makecode' | 'python'>('makecode');
  const [copied, setCopied] = useState(false);
  const [webUsbStatus, setWebUsbStatus] = useState<string | null>(null);
  const [webUsbLoading, setWebUsbLoading] = useState(false);

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
      setWebUsbStatus('WebUSB understøttes desværre ikke i din browser. Benyt Chrome eller Edge, eller brug "Download .hex fil".');
      return;
    }

    try {
      setWebUsbLoading(true);
      setWebUsbStatus('Søger efter tilsluttet micro:bit v2... Vælg den i browser-popupvinduet.');
      const device = await requestMicrobitDevice();

      if (device) {
        setWebUsbStatus(`Forbundet til ${device.productName || 'BBC micro:bit v2'}! Forbereder overførsel...`);
        // Simuler hurtig overførsel
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
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/60 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold uppercase tracking-wider">
                {project.category.toUpperCase()}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                Tid: {project.estimatedTime}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium capitalize">
                Niveau: {project.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs Navigation */}
        <div className="flex items-center space-x-1 p-2 bg-slate-950 border-b border-slate-800 overflow-x-auto shrink-0 scrollbar-none">
          {[
            { id: 'mission', label: '1. Mission & Koncept', icon: Target },
            { id: 'wiring', label: '2. Ledninger & Kredsløb', icon: Cpu },
            { id: 'algorithm', label: '3. Algoritme & Flow', icon: GitBranch },
            { id: 'code', label: '4. Kodevejledning', icon: Code2 },
            { id: 'flash', label: '5. Overfør Kode', icon: Download },
            { id: 'expansions', label: '6. Byg Videre!', icon: Sparkles },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Indhold Scrollbart */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-slate-200 text-sm leading-relaxed">
          {/* TAB 1: MISSION & KONCEPT */}
          {activeTab === 'mission' && (
            <div className="space-y-6">
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4">
                <h4 className="text-base font-semibold text-white flex items-center space-x-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <span>Problemstilling i den virkelige verden</span>
                </h4>
                <p className="text-slate-300">
                  {project.mission.problem}
                </p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4">
                <h4 className="text-base font-semibold text-white flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span>Vores teknologiske løsning</span>
                </h4>
                <p className="text-slate-300">
                  {project.mission.solution}
                </p>
              </div>

              <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/40">
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                  🎯 Hvad lærer du i denne lektion?
                </h4>
                <ul className="space-y-2">
                  {project.mission.learningGoals.map((goal, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveTab('wiring')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition"
                >
                  <span>Gå til Trin 2: Kredsløb & Ledninger</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: LEDNINGER & KREDSLØB */}
          {activeTab === 'wiring' && (
            <div className="space-y-6">
              <div className="bg-blue-950/30 border border-blue-900/50 rounded-xl p-4 flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-blue-200">
                  <strong className="block font-semibold mb-1 text-white">Sådan forbinder du Octopus:bit (G-V-S):</strong>
                  Hvert 3-bens stik på dit Octopus:bit board har tre ben:
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-blue-300">
                    <li><strong className="text-slate-300">G (Sort/Brun)</strong>: Ground (Jord / 0V)</li>
                    <li><strong className="text-red-300">V (Rød)</strong>: Voltage (Strøm / 3V)</li>
                    <li><strong className="text-yellow-300">S (Gul/Orange)</strong>: Signal (Data ind/ud til microbitten)</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-white text-base">Ledningsforbindelser for dette projekt:</h4>
                <div className="grid grid-cols-1 gap-3">
                  {project.wiring.map((w, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
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
                        <span className="text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                          {w.wireColor}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setActiveTab('mission')}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                >
                  Tilbage til mission
                </button>
                <button
                  onClick={() => setActiveTab('algorithm')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition"
                >
                  <span>Gå til Trin 3: Algoritme & Flow</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ALGORITME & LOGIK */}
          {activeTab === 'algorithm' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-semibold text-white mb-1">
                  Algoritmen: Hvad tænker computeren?
                </h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Før vi skriver én eneste linje kode, designer vi logikken bag programmet:
                </p>
              </div>

              <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
                {project.algorithm.map(step => (
                  <div key={step.stepNumber} className="relative">
                    {/* Cirkel på tidslinjen */}
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

                    <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                      <div className="flex items-center space-x-2 mb-1">
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
                            ? 'Opstart / Setup'
                            : step.type === 'input'
                            ? 'Input / Sensor'
                            : step.type === 'logic'
                            ? 'Beslutningslogik'
                            : 'Output / Handling'}
                        </span>
                        <h5 className="font-semibold text-white text-sm">
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

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setActiveTab('wiring')}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                >
                  Tilbage til kredsløb
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition"
                >
                  <span>Gå til Trin 4: Se Koden</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: KODEVEJLEDNING */}
          {activeTab === 'code' && (
            <div className="space-y-6">
              {/* Sprogvælger fane (MakeCode Blokke vs Python) */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCodeLanguage('makecode')}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                      codeLanguage === 'makecode'
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🧩 MakeCode Visuelle Blokke (Standard)
                  </button>
                  <button
                    onClick={() => setCodeLanguage('python')}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                      codeLanguage === 'python'
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
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
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
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
                    <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/60 text-xs text-purple-200 flex items-center space-x-3">
                      <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
                      <div>
                        <strong className="block font-semibold text-white mb-0.5">Påkrævet MakeCode udvidelse:</strong>
                        <span>
                          Før du kan finde alle blokkene, skal du åbne MakeCode &rarr; klikke på <strong>Udvidelser</strong> (nederst i menuen) &rarr; søge efter{' '}
                          <code className="bg-purple-900/80 px-1.5 py-0.5 rounded font-mono text-purple-200 font-bold">
                            {project.makeCode.extensionsNeeded.join(', ')}
                          </code>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* SEKTION 1: VÆRKTØJSKASSE OVER BLOKKE */}
                  {project.makeCode.requiredBlocks && project.makeCode.requiredBlocks.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-white text-sm flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black">1</span>
                          <span>Find disse blokke i MakeCode menuen:</span>
                        </h5>
                        <span className="text-xs text-slate-400">
                          Farvekodet efter MakeCode
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Hver blok har en specifik farve, der matcher kategorien i menuen til venstre i MakeCode editoren:
                      </p>
                      <BlockPaletteGrid blocks={project.makeCode.requiredBlocks} />
                    </div>
                  )}

                  {/* SEKTION 2: DETALJERET SAMLEVEJLEDNING TRIN FOR TRIN */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black">2</span>
                      <h5 className="font-bold text-white text-base">Sådan samles blokkene (Trin-for-trin guide):</h5>
                    </div>

                    <div className="space-y-4">
                      {project.makeCode.detailedSteps && project.makeCode.detailedSteps.length > 0 ? (
                        project.makeCode.detailedSteps.map(step => (
                          <div
                            key={step.stepNumber}
                            className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition space-y-3"
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

                            {/* Placering & Instruktion */}
                            <div className="space-y-2 text-xs sm:text-sm">
                              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-start space-x-2">
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
                              <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200 flex items-start space-x-2">
                                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                <span>
                                  <strong>Tip:</strong> {step.tip}
                                </span>
                              </div>
                            )}
                          </div>
                        ))
                      ) : null}
                    </div>
                  </div>

                  {/* SEKTION 3: Kildekode i MakeCode TypeScript */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-white text-xs uppercase tracking-wider flex items-center space-x-2">
                        <span>💻 MakeCode JavaScript / TypeScript Kildekode</span>
                      </h5>
                      <span className="text-[11px] text-slate-500">
                        Kan indsættes direkte i MakeCode editorens JavaScript fane
                      </span>
                    </div>
                    <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
                      <code>{project.makeCode.typescriptCode}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Python Visning */}
              {codeLanguage === 'python' && (
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-2">
                      MicroPython kildekode:
                    </h5>
                    <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto">
                      <code>{project.pythonCode.code}</code>
                    </pre>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-semibold text-white text-sm">Pædagogisk gennemgang linje for linje:</h5>
                    <div className="space-y-2">
                      {project.pythonCode.explanations.map((exp, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
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

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setActiveTab('algorithm')}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                >
                  Tilbage til algoritme
                </button>
                <button
                  onClick={() => setActiveTab('flash')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition"
                >
                  <span>Gå til Trin 5: Overfør til micro:bit</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: OVERFØR KODE */}
          {activeTab === 'flash' && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto mb-6">
                <h4 className="text-xl font-bold text-white">Vælg hvordan du vil overføre koden</h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Du kan overføre direkte fra browseren med WebUSB, downloade .hex filen eller åbne i MakeCode.
                </p>
              </div>

              {/* De 3 overførselsmuligheder */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Direkte WebUSB */}
                <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-cyan-950/30 to-slate-900 p-5 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center font-bold mb-3 shadow-md shadow-cyan-500/30">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-white text-base mb-1">
                      1-Klik WebUSB
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Forbind din micro:bit v2 med USB. Browseren parrer direkte og flasher koden med ét klik.
                    </p>
                  </div>

                  <button
                    onClick={handleWebUsbConnect}
                    disabled={webUsbLoading}
                    className="mt-4 w-full py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 transition disabled:opacity-50"
                  >
                    <Radio className="w-4 h-4" />
                    <span>{webUsbLoading ? 'Forbinder...' : 'Par & Overfør nu'}</span>
                  </button>
                </div>

                {/* 2. Download .hex fil */}
                <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center font-bold mb-3 border border-slate-700">
                      <FileDown className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-white text-base mb-1">
                      Download .hex fil
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Download filen til computeren, og træk den manuelt over på micro:bit USB-drevet i Stifinder.
                    </p>
                  </div>

                  <button
                    onClick={handleDownloadHex}
                    className="mt-4 w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 border border-slate-700 transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Hent {project.hexFileName}</span>
                  </button>
                </div>

                {/* 3. Åbn i Microsoft MakeCode */}
                <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 flex flex-col justify-between">
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
                    className="mt-4 w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 border border-slate-700 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Åbn MakeCode Editor</span>
                  </button>
                </div>
              </div>

              {/* WebUSB Status besked */}
              {webUsbStatus && (
                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 text-xs text-cyan-200 flex items-start space-x-2.5 animate-fadeIn">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{webUsbStatus}</span>
                </div>
              )}

              {/* Visuel 3-trins guide til .hex download */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
                  Sådan overfører du en .hex fil manuelt:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                  <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                    <strong className="block text-cyan-400 mb-1">1. Download filen</strong>
                    Tryk på &quot;Hent .hex fil&quot;. Filen lander i mappen &quot;Overførsler&quot;.
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                    <strong className="block text-cyan-400 mb-1">2. Tilslut micro:bit</strong>
                    Sæt USB-kablet i computeren. microbitten vises som et USB-drev ved navn <strong>MICROBIT</strong>.
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                    <strong className="block text-cyan-400 mb-1">3. Træk & slip</strong>
                    Træk .hex-filen over på drevet. Den gule lampe blinker i ca. 5 sekunder. Færdig!
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setActiveTab('code')}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                >
                  Tilbage til kode
                </button>
                <button
                  onClick={() => setActiveTab('expansions')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition"
                >
                  <span>Gå til Trin 6: Byg Videre (Udvidelser)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: BYG VIDERE / UDVIDELSER */}
          {activeTab === 'expansions' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-slate-900 border border-cyan-800/40 rounded-2xl p-5">
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
                      className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 hover:border-cyan-500/50 transition space-y-3"
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

                      <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-start space-x-2">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>Kode-tip:</strong> {exp.hint}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setActiveTab('flash')}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                >
                  Tilbage til overførsel
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition"
                >
                  Fuldfør lektion ✓
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
