import React from 'react';
import { GAME_MODES } from '../constants';
import { GameModeInfo } from '../types';
import { Swords, MapPin, Zap, Feather, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const GameModes: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sword':
        return <Swords className="w-5 h-5" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Feather':
        return <Feather className="w-5 h-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" />;
      default:
        return <Swords className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-20 bg-dojo-950/60 border-t border-b border-dojo-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dojo-900 border border-dojo-700 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            <span>Dojo Disciplines</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-white">
            FIVE WAYS TO WIELD THE BLADE
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From relaxed Zen meditation to high-speed Arcade storms and precision Ninja trials,
            Takakiri adapts to your mood and reflex mastery.
          </p>
        </div>

        {/* 5 Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAME_MODES.map((mode: GameModeInfo) => (
            <div
              key={mode.id}
              className="relative group rounded-2xl bg-dojo-900/70 hover:bg-dojo-900 border border-dojo-800 hover:border-gold-500/50 p-6 transition-all duration-300 shadow-lg hover:shadow-gold-950/20 flex flex-col justify-between"
            >
              {/* Watermark Kanji Background */}
              <div className="absolute right-4 top-4 text-7xl font-cinzel font-black text-white/[0.03] group-hover:text-gold-500/[0.08] pointer-events-none transition-colors">
                {mode.kanji}
              </div>

              <div>
                {/* Header Icon + Mode Kanji Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl border ${mode.badgeColor}`}>
                    {getIcon(mode.iconName)}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-dojo-800 border border-dojo-700 flex items-center justify-center font-cinzel text-sm text-gold-400 font-bold">
                    {mode.kanji}
                  </div>
                </div>

                <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                  {mode.title}
                </h3>
                <p className="text-xs text-crimson-400 font-medium mb-3">{mode.subtitle}</p>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {mode.description}
                </p>
              </div>

              {/* Mode Feature Checklist */}
              <div className="space-y-2 pt-4 border-t border-dojo-800">
                {mode.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}

          {/* Dojo Honor Card */}
          <div className="relative rounded-2xl bg-gradient-to-br from-crimson-950/70 via-dojo-900 to-dojo-950 border border-crimson-800/50 p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
                DOJO PHILOSOPHY
              </span>
              <h3 className="font-cinzel text-xl font-bold text-white">Offline & Pure Gameplay</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Takakiri is engineered with Capacitor and lightweight React for instantaneous load times, 
                zero mandatory account logins, and smooth 60fps slicing whether you are on an airplane or the subway.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-crimson-900/60 flex items-center justify-between text-xs text-slate-400">
              <span>Engineered for Android</span>
              <span className="font-mono text-gold-400">Capacitor + Vite</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
