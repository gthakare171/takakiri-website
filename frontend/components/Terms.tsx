import React from 'react';
import { DeveloperConfig } from '../types';
import { BookOpen, Scale, AlertTriangle, ShieldCheck } from 'lucide-react';

interface TermsProps {
  config: DeveloperConfig;
}

export const Terms: React.FC<TermsProps> = ({ config }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10 text-center sm:text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dojo-900 border border-dojo-700 text-slate-300 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5 text-gold-400" />
          <span>Standard End User Terms</span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-white">
          TERMS OF USE
        </h1>

        <p className="text-sm text-slate-400">
          Last Updated: February 2025 • Casual Mobile Game License
        </p>
      </div>

      <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
        
        <section className="bg-dojo-900/50 p-6 rounded-2xl border border-dojo-800 space-y-3">
          <h2 className="font-cinzel text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By downloading, installing, or playing <strong>Takakiri — Japanese Dojo Fruit Slicer</strong>, you agree to be bound by these Terms of Use. If you do not agree to these terms, please uninstall and discontinue using the game.
          </p>
        </section>

        <section className="bg-dojo-900/50 p-6 rounded-2xl border border-dojo-800 space-y-3">
          <h2 className="font-cinzel text-lg font-bold text-white">2. License Grant</h2>
          <p>
            The developer grants you a personal, revocable, non-exclusive, non-transferable license to install and play Takakiri on compatible Android hardware strictly for your personal, non-commercial entertainment.
          </p>
        </section>

        <section className="bg-dojo-900/50 p-6 rounded-2xl border border-dojo-800 space-y-3">
          <h2 className="font-cinzel text-lg font-bold text-white">3. Intellectual Property</h2>
          <p>
            All custom artwork, animations, blade visual shaders, game sound effects, Dojo motifs, and software code contained within Takakiri are the intellectual property of the developer or used under open licenses. You may not reverse engineer, decompile, or extract assets for unauthorized commercial redistribution.
          </p>
        </section>

        <section className="bg-dojo-900/50 p-6 rounded-2xl border border-dojo-800 space-y-3">
          <h2 className="font-cinzel text-lg font-bold text-white">4. Disclaimer of Warranties</h2>
          <p>
            Takakiri is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. While we strive for zero bugs and optimized battery consumption, the developer does not guarantee that the game will operate uninterrupted or error-free on every Android variant or modified custom ROM.
          </p>
        </section>

        <section className="bg-dojo-900/50 p-6 rounded-2xl border border-dojo-800 space-y-3">
          <h2 className="font-cinzel text-lg font-bold text-white">5. Contact</h2>
          <p>
            Inquiries regarding these terms can be sent to: <span className="font-mono text-gold-400 font-semibold">{config.supportEmail}</span>.
          </p>
        </section>

      </div>
    </div>
  );
};
