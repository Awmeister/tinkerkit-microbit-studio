import React from 'react';
import type { MakeCodeBlockItem } from '../types';
import { ChevronDown, Tag } from 'lucide-react';

interface MakeCodeBlockBadgeProps {
  block: MakeCodeBlockItem;
}

export const MakeCodeBlockBadge: React.FC<MakeCodeBlockBadgeProps> = ({ block }) => {
  return (
    <div className="inline-flex items-center space-x-2 py-1.5 px-3 rounded-lg border border-white/20 shadow-sm text-xs font-semibold text-white transition hover:scale-[1.02]"
         style={{ backgroundColor: block.categoryColor }}>
      {/* Kategori Mærkat */}
      <span className="text-[10px] uppercase tracking-wider bg-black/30 px-1.5 py-0.5 rounded font-mono text-white/90">
        {block.category}
      </span>

      {/* Bloknavn */}
      <span className="font-medium tracking-tight">
        {block.name}
      </span>

      {/* Valgfri parameter / dropdown visning */}
      {block.params && (
        <span className="inline-flex items-center space-x-0.5 bg-black/40 text-cyan-200 px-1.5 py-0.5 rounded text-[11px] font-mono">
          <span>{block.params}</span>
          <ChevronDown className="w-3 h-3 text-white/70" />
        </span>
      )}
    </div>
  );
};

interface BlockPaletteGridProps {
  blocks: MakeCodeBlockItem[];
}

export const BlockPaletteGrid: React.FC<BlockPaletteGridProps> = ({ blocks }) => {
  // Gruppér blokke efter kategori så det matcher MakeCode menuen 1:1
  const categories = Array.from(new Set(blocks.map(b => b.category)));

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-xs text-slate-400">
        <Tag className="w-4 h-4 text-cyan-400" />
        <span>Disse blokke skal du finde frem i Microsoft MakeCode inden du starter:</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map(cat => {
          const catBlocks = blocks.filter(b => b.category === cat);
          const color = catBlocks[0]?.categoryColor || '#0078D7';

          return (
            <div
              key={cat}
              className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span
                  className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white"
                  style={{ backgroundColor: color }}
                >
                  Kategori: {cat}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {catBlocks.length} {catBlocks.length === 1 ? 'blok' : 'blokke'}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {catBlocks.map((b, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <MakeCodeBlockBadge block={b} />
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
