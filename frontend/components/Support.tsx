import React, { useState } from 'react';
import { DeveloperConfig } from '../types';
import { LifeBuoy, Mail, Bug, HelpCircle, Check, Copy, ExternalLink, ShieldCheck } from 'lucide-react';

interface SupportProps {
  config: DeveloperConfig;
}

export const Support: React.FC<SupportProps> = ({ config }) => {
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const bugReportTemplate = `Subject: [Takakiri Support] Bug / Feedback Report
Device Model: (e.g., Samsung Galaxy S23, Pixel 7)
Android OS Version: (e.g., Android 13 or 14)
Game Mode: (Classic, Campaign, Arcade, Zen, or Ninja)
Issue Description: 
Steps to Reproduce:
1. 
2. 
3. 
Expected Result:
Actual Result:`;

  const copyToClipboard = (text: string, isEmail = false) => {
    navigator.clipboard.writeText(text);
    if (isEmail) {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } else {
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header */}
      <div className="text-center sm:text-left mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-950/60 border border-gold-500/40 text-gold-400 text-xs font-semibold">
          <LifeBuoy className="w-3.5 h-3.5" />
          <span>Takakiri Dojo Support Desk</span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-white">
          SUPPORT & CONTACT
        </h1>

        <p className="text-sm text-slate-400">
          We are committed to delivering a buttery-smooth 60fps slicing experience on Android.
        </p>
      </div>

      {/* Direct Contact Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-dojo-900 via-dojo-900 to-dojo-950 border border-dojo-700 shadow-xl mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Direct Developer Channel
            </span>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-crimson-400" />
              <span>Developer Support Inbox</span>
            </h2>
            <p className="text-xs text-slate-300 max-w-md">
              Send your questions, feature recommendations, or crash logs directly to the developer.
            </p>
            <div className="pt-2 font-mono text-sm text-gold-400 font-semibold">
              {config.supportEmail}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => copyToClipboard(config.supportEmail, true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-dojo-800 hover:bg-dojo-700 text-xs font-semibold text-slate-200 border border-dojo-700 transition-all"
            >
              {emailCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${config.supportEmail}?subject=${encodeURIComponent('[Takakiri Support Inquiry]')}`}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-xs font-bold text-white transition-all shadow-md shadow-crimson-950/60"
            >
              <Mail className="w-4 h-4" />
              <span>Compose Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bug & Crash Report Guidelines */}
      <div className="space-y-8">
        <div className="bg-dojo-900/60 p-6 sm:p-8 rounded-2xl border border-dojo-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-cinzel text-lg font-bold text-white flex items-center gap-2">
              <Bug className="w-5 h-5 text-crimson-400" />
              How to Report a Crash or Technical Issue
            </h3>
            <button
              onClick={() => copyToClipboard(bugReportTemplate)}
              className="flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 font-medium"
            >
              {copiedTemplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTemplate ? 'Template Copied!' : 'Copy Template'}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
            To help us diagnose and patch issues quickly, please provide your Android phone model and what happened right before the glitch:
          </p>

          <pre className="p-4 rounded-xl bg-dojo-950 border border-dojo-800 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
            {bugReportTemplate}
          </pre>
        </div>

        {/* FAQs */}
        <div className="bg-dojo-900/60 p-6 sm:p-8 rounded-2xl border border-dojo-800 space-y-6">
          <h3 className="font-cinzel text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-gold-400" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            <div className="border-b border-dojo-800 pb-4">
              <h4 className="text-sm font-semibold text-white mb-1">Does Takakiri require an active Wi-Fi or Cellular connection?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                No. Takakiri is completely playable offline. Scores and campaign stars are stored on your local device.
              </p>
            </div>

            <div className="border-b border-dojo-800 pb-4">
              <h4 className="text-sm font-semibold text-white mb-1">How can I reset my high score or campaign progress?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You can reset your data at any time via Android App Settings &gt; Takakiri &gt; Clear Storage, or by clicking the Reset Progress button inside the in-game options menu.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-1">When will Takakiri be published on Google Play?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The application is undergoing closed testing and Google Play Console store listing verification. Check the download section on the homepage for live status updates.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
