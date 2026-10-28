import React, { useState, useRef, useEffect } from 'react';
import { FRUIT_SAMPLES } from '../constants';
import { SlicedFruitItem } from '../types';
import { Swords, Play, Sparkles, Smartphone, Award, Flame, Download } from 'lucide-react';

interface HeroProps {
  onExploreModes: () => void;
  onGoToSupport: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreModes, onGoToSupport }) => {
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [slashLine, setSlashLine] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const [activeFruits, setActiveFruits] = useState<SlicedFruitItem[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initialize interactive dojo target fruits
  useEffect(() => {
    resetDojoTargets();
  }, []);

  const resetDojoTargets = () => {
    const items: SlicedFruitItem[] = FRUIT_SAMPLES.map((sample, idx) => ({
      id: Date.now() + idx,
      x: 15 + (idx % 3) * 32,
      y: 20 + Math.floor(idx / 3) * 45,
      vx: 0,
      vy: 0,
      name: sample.name,
      emoji: sample.emoji,
      color: sample.color,
      sliced: false,
      points: sample.points,
    }));
    setActiveFruits(items);
  };

  const handleFruitSlice = (id: number, points: number, e: React.MouseEvent) => {
    setActiveFruits((prev) =>
      prev.map((f) => {
        if (f.id === id && !f.sliced) {
          return { ...f, sliced: true, sliceAngle: Math.random() * 40 - 20 };
        }
        return f;
      })
    );

    setScore((s) => s + points * (combo > 1 ? combo : 1));
    setCombo((c) => c + 1);

    // Render katana trail flash
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      setSlashLine({
        x1: clickX - 80,
        y1: clickY - 50,
        x2: clickX + 80,
        y2: clickY + 50,
      });
      setTimeout(() => setSlashLine(null), 250);
    }
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:py-24">
      {/* Decorative Dojo Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-crimson-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-gold-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Lore & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-dojo-900 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wide shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              <span>THE OFFICIAL DOJO FRUIT SLICER</span>
              <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
              <span className="text-slate-300">Google Play Coming Soon</span>
            </div>

            <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
              MASTER THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-500 via-rose-400 to-gold-400 drop-shadow">
                KATANA BLADE.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Step inside the ancient training hall in <strong className="text-white">Takakiri</strong>. 
              Slice Japanese persimmons, yuzu, and watermelon with fluid finger-blade arcs, dodge gunpowder shurikens, and unleash elemental fruit blitzes across 5 thrilling game modes.
            </p>

            {/* Quick Stat Pill Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 pt-2">
              <div className="p-3 rounded-xl bg-dojo-900/80 border border-dojo-800 text-center">
                <div className="font-cinzel text-xl font-bold text-gold-400">5</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Game Modes</div>
              </div>
              <div className="p-3 rounded-xl bg-dojo-900/80 border border-dojo-800 text-center">
                <div className="font-cinzel text-xl font-bold text-crimson-400">100%</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Offline Play</div>
              </div>
              <div className="p-3 rounded-xl bg-dojo-900/80 border border-dojo-800 text-center">
                <div className="font-cinzel text-xl font-bold text-white">0</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Ad Trackers</div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#download"
                className="flex items-center gap-3 px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-crimson-600 via-red-600 to-crimson-700 hover:from-crimson-500 hover:to-crimson-600 text-white shadow-lg shadow-crimson-950/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-red-500/40"
              >
                <Smartphone className="w-5 h-5 text-gold-400" />
                <span>Google Play Release Status</span>
              </a>

              <button
                onClick={onExploreModes}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold bg-dojo-900/90 hover:bg-dojo-800 text-slate-200 border border-dojo-700 hover:border-gold-500/50 transition-all"
              >
                <Swords className="w-4 h-4 text-gold-400" />
                <span>Explore Dojo Modes</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Mini Blade Dojo Demo */}
          <div className="lg:col-span-5">
            <div
              ref={containerRef}
              className="relative rounded-2xl bg-gradient-to-b from-dojo-900 to-dojo-950 border-2 border-dojo-700/80 p-5 shadow-2xl shadow-black/80 overflow-hidden select-none"
            >
              {/* Dojo Tatami Lattice Header */}
              <div className="flex items-center justify-between pb-3 border-b border-dojo-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-crimson-500 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Interactive Blade Trial
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <div className="text-slate-400">
                    Combo: <span className="text-gold-400 font-bold">{combo}x</span>
                  </div>
                  <div className="bg-dojo-800 px-2.5 py-1 rounded-md text-white font-bold border border-dojo-700">
                    Score: {score}
                  </div>
                </div>
              </div>

              {/* Katana Visual Slash Effect */}
              {slashLine && (
                <div
                  className="absolute pointer-events-none z-30 transition-opacity duration-200"
                  style={{
                    left: `${slashLine.x1}px`,
                    top: `${slashLine.y1}px`,
                    width: '160px',
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent, #ffffff, #e6b422, transparent)',
                    boxShadow: '0 0 12px 2px rgba(230, 180, 34, 0.9)',
                    transform: 'rotate(-25deg)',
                  }}
                />
              )}

              {/* Slicing Dojo Arena */}
              <div className="relative min-h-[300px] my-4 rounded-xl bg-dojo-950/80 border border-dojo-800/60 p-4 flex flex-wrap gap-4 items-center justify-center">
                {activeFruits.map((item) => (
                  <div
                    key={item.id}
                    onClick={(e) => handleFruitSlice(item.id, item.points, e)}
                    className={`cursor-pointer group relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ${
                      item.sliced
                        ? 'opacity-40 scale-90 grayscale'
                        : 'hover:scale-110 active:scale-95 bg-dojo-900/90 border border-dojo-700 hover:border-gold-400'
                    }`}
                  >
                    <div className="text-4xl filter drop-shadow group-hover:rotate-6 transition-transform">
                      {item.emoji}
                    </div>

                    <span className="text-[11px] font-medium text-slate-300 mt-1.5">
                      {item.name.split(' ')[0]}
                    </span>

                    {item.sliced ? (
                      <span className="absolute top-1 right-1 text-[10px] font-mono font-bold text-gold-400 bg-black/70 px-1 rounded">
                        +{item.points}
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-500 uppercase tracking-tighter">
                        Tap to Slice
                      </span>
                    )}

                    {/* Slice divider mark if sliced */}
                    {item.sliced && (
                      <div
                        className="absolute inset-x-2 top-1/2 h-[2px] bg-red-500 shadow-sm shadow-red-500"
                        style={{ transform: `rotate(${item.sliceAngle || 15}deg)` }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Trial Footer */}
              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-slate-400">
                  Swipe/tap to slash fruit targets. Fluid Katana physics in-game.
                </p>
                <button
                  onClick={resetDojoTargets}
                  className="text-xs text-gold-400 hover:text-gold-300 underline font-medium"
                >
                  Reset Targets
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
