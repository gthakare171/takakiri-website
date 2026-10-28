import React, { useState } from 'react';
import { NavPage } from '../types';
import { Swords, Shield, LifeBuoy, BookOpen, FolderGit2, Menu, X, ExternalLink } from 'lucide-react';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  developerMode: boolean;
  onToggleDevMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavPage; label: string; icon: React.ReactNode; kanji: string }[] = [
    { id: 'home', label: 'Home', icon: <Swords className="w-4 h-4" />, kanji: '武' },
    { id: 'modes', label: 'Game Modes', icon: <BookOpen className="w-4 h-4" />, kanji: '道' },
    { id: 'privacy', label: 'Privacy Policy', icon: <Shield className="w-4 h-4" />, kanji: '規' },
    { id: 'support', label: 'Support & Help', icon: <LifeBuoy className="w-4 h-4" />, kanji: '助' },
    { id: 'terms', label: 'Terms of Use', icon: <BookOpen className="w-4 h-4" />, kanji: '法' },
  ];

  const handleNav = (page: NavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-dojo-950/85 border-b border-dojo-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Kanji Seal */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3.5 group text-left focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br from-crimson-600 to-red-950 border border-gold-500/40 shadow-lg shadow-crimson-950/60 group-hover:border-gold-400 transition-all">
              <span className="font-cinzel text-xl font-black text-gold-400 drop-shadow">斬</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-lg pointer-events-none" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel text-xl sm:text-2xl font-black tracking-wider text-white">
                  TAKAKIRI
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/30">
                  刀
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wider">DOJO FRUIT SLICER</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-dojo-900/60 p-1.5 rounded-xl border border-dojo-800">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-crimson-600/90 text-white shadow-md shadow-crimson-900/40 border border-red-500/50'
                      : 'text-slate-300 hover:text-white hover:bg-dojo-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Area: Deploy/DNS Helper Toggle + Google Play Pill */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNav('publish-guide')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                currentPage === 'publish-guide'
                  ? 'bg-gold-500/20 text-gold-400 border-gold-400 shadow-lg shadow-gold-950/40'
                  : 'bg-dojo-900/90 text-slate-200 border-dojo-700 hover:border-gold-500/60 hover:text-gold-300'
              }`}
              title="Inspect DNS, GitHub Pages and Google Play Console parameters"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-gold-400" />
              <span>Deploy to takakiri-website</span>
            </button>

            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                handleNav('home');
                setTimeout(() => {
                  const el = document.getElementById('download');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 80);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-dojo-950 shadow-md shadow-gold-500/20 transition-transform active:scale-95"
            >
              <span>Get Game</span>
              <span className="text-[10px] bg-dojo-950/20 px-1 py-0.5 rounded">Soon</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNav('publish-guide')}
              className="p-2 text-gold-400 hover:text-white rounded-lg bg-dojo-900 border border-dojo-800"
              aria-label="Publishing Toolkit"
            >
              <FolderGit2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-dojo-900 border border-dojo-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-dojo-800 bg-dojo-950/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-crimson-600 text-white'
                    : 'text-slate-300 hover:bg-dojo-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <span className="text-xs text-gold-400 font-cinzel">{item.kanji}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-dojo-800/80">
            <button
              onClick={() => handleNav('publish-guide')}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-semibold bg-dojo-900 text-gold-400 border border-gold-500/30"
            >
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4" />
                <span>Deploy takakiri-website &amp; GoDaddy DNS</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
