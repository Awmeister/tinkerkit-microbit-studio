import React from 'react';
import type { MakeCodeBlockItem } from '../types';
import { getCategoryDef } from '../data/makecodeCategories';
import {
  ChevronDown,
  Tag,
  Grid,
  CircleDot,
  Headphones,
  ToggleLeft,
  Signal,
  RotateCw,
  GitBranch,
  Menu,
  Calculator,
  Code,
  Tv,
  Puzzle,
  PlusCircle,
  FunctionSquare,
  ListOrdered,
  Type,
  Gamepad2,
  Image,
  Disc,
  Usb,
  Server,
  Square
} from 'lucide-react';

interface MakeCodeCategoryIconProps {
  iconName: string;
  className?: string;
}

export const MakeCodeCategoryIcon: React.FC<MakeCodeCategoryIconProps> = ({ iconName, className = 'w-4 h-4' }) => {
  switch (iconName) {
    case 'Grid':
      return <Grid className={className} />;
    case 'CircleDot':
      return <CircleDot className={className} />;
    case 'Headphones':
      return <Headphones className={className} />;
    case 'ToggleLeft':
      return <ToggleLeft className={className} />;
    case 'Signal':
      return <Signal className={className} />;
    case 'RotateCw':
      return <RotateCw className={className} />;
    case 'GitBranch':
      return <GitBranch className={className} />;
    case 'Menu':
      return <Menu className={className} />;
    case 'Calculator':
      return <Calculator className={className} />;
    case 'Code':
      return <Code className={className} />;
    case 'Tv':
      return <Tv className={className} />;
    case 'Puzzle':
      return <Puzzle className={className} />;
    case 'PlusCircle':
      return <PlusCircle className={className} />;
    case 'FunctionSquare':
      return <FunctionSquare className={className} />;
    case 'ListOrdered':
      return <ListOrdered className={className} />;
    case 'Type':
      return <Type className={className} />;
    case 'Gamepad2':
      return <Gamepad2 className={className} />;
    case 'Image':
      return <Image className={className} />;
    case 'Disc':
      return <Disc className={className} />;
    case 'Usb':
      return <Usb className={className} />;
    case 'Server':
      return <Server className={className} />;
    default:
      return <Square className={className} />;
  }
};

interface MakeCodeBlockBadgeProps {
  block: MakeCodeBlockItem;
}

export const MakeCodeBlockBadge: React.FC<MakeCodeBlockBadgeProps> = ({ block }) => {
  const catDef = getCategoryDef(block.category);
  const color = catDef.color || block.categoryColor;

  return (
    <div
      className="inline-flex items-center space-x-2 py-1.5 px-3 rounded-xl border border-white/25 shadow-md text-xs font-semibold text-white transition hover:scale-[1.02]"
      style={{ backgroundColor: color }}
    >
      {/* Kategori Mærkat med Ikon */}
      <span className="inline-flex items-center space-x-1 text-[10px] uppercase tracking-wider bg-black/35 px-1.5 py-0.5 rounded font-mono text-white/95">
        <MakeCodeCategoryIcon iconName={catDef.iconName} className="w-3 h-3 text-white/90" />
        <span>
          {catDef.isAdvanced ? `Avanceret -> ${catDef.name}` : catDef.name}
        </span>
      </span>

      {/* Bloknavn */}
      <span className="font-semibold tracking-tight text-white drop-shadow-sm">
        {block.name}
      </span>

      {/* Dropdown eller parameter indikator */}
      {block.params && (
        <span className="inline-flex items-center space-x-0.5 bg-black/45 text-white px-1.5 py-0.5 rounded text-[11px] font-mono border border-white/20">
          <span>{block.params}</span>
          <ChevronDown className="w-3 h-3 text-white/80" />
        </span>
      )}
    </div>
  );
};

interface BlockPaletteGridProps {
  blocks: MakeCodeBlockItem[];
}

export const BlockPaletteGrid: React.FC<BlockPaletteGridProps> = ({ blocks }) => {
  // Gruppér blokke efter MakeCode kategori
  const categories = Array.from(new Set(blocks.map(b => b.category)));

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-xs text-slate-400">
        <Tag className="w-4 h-4 text-cyan-400" />
        <span>Find disse blokke i MakeCode menuen inden du starter:</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {categories.map(cat => {
          const catDef = getCategoryDef(cat);
          const catBlocks = blocks.filter(b => b.category === cat);
          const color = catDef.color;

          return (
            <div
              key={cat}
              className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 shadow-inner"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span
                  className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg text-white shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  <MakeCodeCategoryIcon iconName={catDef.iconName} className="w-3.5 h-3.5 text-white" />
                  <span>
                    {catDef.isAdvanced ? `Avanceret -> ${catDef.name}` : catDef.name}
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {catBlocks.length} {catBlocks.length === 1 ? 'blok' : 'blokke'}
                </span>
              </div>

              <div className="flex flex-col gap-2 pt-0.5">
                {catBlocks.map((b, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <MakeCodeBlockBadge block={{ ...b, categoryColor: color }} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
