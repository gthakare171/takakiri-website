import React, { useState, useEffect } from 'react';
import { NavPage, DeveloperConfig } from './types';
import { DEFAULT_CONFIG } from './constants';
import { PetalCanvas } from './components/PetalCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GameModes } from './components/GameModes';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Support } from './components/Support';
import { Terms } from './components/Terms';
import { PublishingGuideModal } from './components/PublishingGuideModal';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle, 
  Download, 
  Clock, 
  AlertCircle,
  ExternalLink 
} from 'lucide-react';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [developerMode, setDeveloperMode] = useState<boolean>(false);
  const [config, setConfig] = useState<DeveloperConfig>(() => {
    const saved = localStorage.getItem('takakiri_dev_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback to default
      }
    }
    return DEFAULT_CONFIG;
  });

  const handleUpdateConfig = (newConfig: DeveloperConfig) => {
    setConfig(newConfig);
    localStorage.setItem('takakiri_dev_config', JSON.stringify(newConfig));
  };

  // Sync hash routing so URLs like /#privacy and /#support work as direct links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'modes', 'privacy', 'support', 'terms', 'publish-guide'].includes(hash)) {
        setCurrentPage(hash as NavPage);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: NavPage) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-dojo-950 text-slate-100">
      {/* Ambient Falling Sakura Petals Background */}
      <PetalCanvas />

      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        developerMode={developerMode}
        onToggleDevMode={() => setDeveloperMode(!developerMode)}
      />

      {/* Main Page Render View */}
      <main className="flex-grow relative z-10">
        {currentPage === 'home' && (
          <>
            <Hero
              onExploreModes={() => navigateTo('modes')}
              onGoToSupport={() => navigateTo('support')}
            />

            {/* Teaser Game Modes Section on Homepage */}
            <GameModes />

            {/* Google Play Download & Status Section */}
            <section id="download" className="py-20 relative overflow-hidden">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-gradient-to-b from-dojo-900 to-dojo-950 border-2 border-dojo-700/80 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                  
                  {/* Subtle Japanese Crest Watermark */}
                  <div className="absolute right-0 bottom-0 text-9xl font-cinzel text-white/[0.02] pointer-events-none">
                    武
                  </div>

                  <div className="max-w-2xl space-y-5 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson-950/70 border border-crimson-500/40 text-crimson-400 text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Release Status: Store Listing &amp; Closed Review</span>
                    </div>

                    <h2 className="font-cinzel text-3xl sm:text-4xl font-black text-white">
                      COMING SOON TO GOOGLE PLAY
                    </h2>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      Takakiri is engineered for pure offline mobile gaming. The production build is currently being staged in Google Play Console for Android devices.
                    </p>

                    {/* Pre-Register / Download Card Mockup */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black border border-slate-700 text-left w-full sm:w-auto opacity-90 cursor-not-allowed">
                        <div className="text-2xl">
                          <Smartphone className="w-8 h-8 text-gold-400" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-400">Android App on</div>
                          <div className="text-sm font-bold text-white flex items-center gap-1.5">
                            <span>Google Play</span>
                            <span className="text-[10px] text-gold-400 bg-gold-950 px-1.5 py-0.5 rounded border border-gold-800">
                              Staging
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => navigateTo('publish-guide')}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-dojo-800 hover:bg-dojo-700 text-xs font-bold text-gold-400 border border-dojo-600 transition-colors"
                      >
                        Inspect Deployment &amp; DNS Settings →
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500">
                      * Clearly marked as coming soon in compliance with Google Play Developer Program policies until the app is made publicly available.
                    </p>
                  </div>

                </div>
              </div>
            </section>
          </>
        )}

        {currentPage === 'modes' && <GameModes />}
        {currentPage === 'privacy' && <PrivacyPolicy config={config} />}
        {currentPage === 'support' && <Support config={config} />}
        {currentPage === 'terms' && <Terms config={config} />}
        {currentPage === 'publish-guide' && (
          <PublishingGuideModal config={config} onUpdateConfig={handleUpdateConfig} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} config={config} />
    </div>
  );
};
