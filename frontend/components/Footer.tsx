import React from 'react';
import { NavPage, DeveloperConfig } from '../types';
import { Swords, Shield, LifeBuoy, BookOpen, ExternalLink, FolderGit2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
  config: DeveloperConfig;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, config }) => {
  return (
    <footer className="bg-dojo-950 border-t border-dojo-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-crimson-600 flex items-center justify-center font-cinzel text-gold-400 font-bold border border-gold-500/40">
                斬
              </div>
              <span className="font-cinzel text-lg font-bold text-white tracking-wider">
                TAKAKIRI
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Japanese Dojo Fruit Slicer. Slice traditional fruits, test your reflexes, and master the blade offline.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-gold-400 transition-colors">
                  Home &amp; Hero
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('modes')} className="hover:text-gold-400 transition-colors">
                  Game Modes (5 Disciplines)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('publish-guide')} className="hover:text-gold-400 transition-colors">
                  Deploy to takakiri-website
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Legal */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Legal &amp; Policy</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-gold-400 transition-colors">
                  Privacy Policy (/privacy)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('support')} className="hover:text-gold-400 transition-colors">
                  Support &amp; Contact Desk
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-gold-400 transition-colors">
                  Terms of Use
                </button>
              </li>
            </ul>
          </div>

          {/* Repositories */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Repositories</h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Website Repo:</span>
                <a
                  href="https://github.com/gthakare171/takakiri-website"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline font-mono"
                >
                  <span>gthakare171/takakiri-website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Game Repo:</span>
                <a
                  href={config.githubRepoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-gold-400 hover:underline font-mono"
                >
                  <span>gthakare171/takakiri-game</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-dojo-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Takakiri Studios. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with honor &amp; blade precision</span>
            <span className="text-crimson-500 font-cinzel">斬</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
