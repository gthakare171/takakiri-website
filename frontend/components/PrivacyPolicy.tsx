import React from 'react';
import { DeveloperConfig } from '../types';
import { Shield, Lock, Smartphone, Database, Mail, AlertCircle, CheckCircle } from 'lucide-react';

interface PrivacyPolicyProps {
  config: DeveloperConfig;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ config }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Policy Header */}
      <div className="mb-10 text-center sm:text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>Verified Source Inspection Policy</span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-white">
          PRIVACY POLICY
        </h1>

        <p className="text-sm text-slate-400">
          Last Updated: <strong>February 2025</strong> • Applies to <strong>Takakiri — Japanese Dojo Fruit Slicer</strong> for Android
        </p>
      </div>

      {/* Code Inspection Truth Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-dojo-900/90 border border-dojo-700/80 mb-10 text-slate-300 space-y-3">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-sm font-bold text-white">Strict Source Code Verification Summary</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Based on the inspection of the <code>takakiri-game</code> repository (React, TypeScript, Vite, and Capacitor runtime):
              the game does <strong>not</strong> collect personal identity data, does <strong>not</strong> embed third-party advertising tracking SDKs, 
              does <strong>not</strong> transmit personal profiles to external servers, and operates strictly with local device-level state.
            </p>
          </div>
        </div>
      </div>

      {/* Policy Content Sections */}
      <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="bg-dojo-900/50 p-6 rounded-2xl border border-dojo-800">
          <h2 className="font-cinzel text-lg font-bold text-white flex items-center gap-2 mb-3">
            <Database className="w-4 h-4 text-gold-400" />
            1. Information Collection and Storage
          </h2>
          <p className="mb-3">
            Takakiri is designed as a self-contained casual offline arcade title. We treat your privacy with maximum respect:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>
              <strong className="text-white">Local Device Storage:</strong> Game progress, high scores, unlocked blade visual themes, and audio toggle settings (sound effects and background music volume) are stored solely on your device using standard browser/Capacitor local storage APIs.
            </li>
            <li>
              <strong className="text-white">No Personal Telemetry:</strong> We do not ask for your real name, email, phone number, location, contacts, or photos.
            </li>
            <li>
              <strong className="text-white">No Cloud Account Required:</strong> You do not need to create an account, log in with social providers, or provide credentials to play Takakiri.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-dojo-900/50 p-6 rounded-2xl border border-dojo-800">
          <h2 className="font-cinzel text-lg font-bold text-white flex items-center gap-2 mb-3">
            <Smartphone className="w-4 h-4 text-gold-400" />
            2. Android Device Permissions
          </h2>
          <p className="mb-3">
            The Takakiri mobile application requests minimal device capabilities needed for gameplay execution:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>
              <strong className="text-white">Touch and Display:</strong> Required to interpret Katana slicing gestures and render 60fps canvas graphics.
            </li>
            <li>
              <strong className="text-white">Audio / Sound:</strong> Used to output traditional koto music and fruit-slicing audio effects through your device speaker.
            </li>
            <li>
              <strong className="text-white">Haptic Vibration (Optional):</strong> Provides subtle tactile feedback on critical fruit cuts and bomb explosions.
            </li>
            <li>
              <strong className="text-white">No Dangerous Permissions:</strong> Takakiri does <em>not</em> request access to your Camera, Microphone, GPS Location, SMS, or Contact book.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-dojo-900/50 p-6 rounded-2xl border border-dojo-800">
          <h2 className="font-cinzel text-lg font-bold text-white flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-gold-400" />
            3. Third-Party Services and Analytics
          </h2>
          <p>
            The production release of Takakiri does not sell, rent, or trade user data to data brokers or advertising exchanges.
            When downloaded through Google Play, standard anonymized installation metrics and crash traces may be processed by Google Play Services in accordance with Google's own Privacy Policy.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-dojo-900/50 p-6 rounded-2xl border border-dojo-800">
          <h2 className="font-cinzel text-lg font-bold text-white flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-gold-400" />
            4. Children's Privacy
          </h2>
          <p>
            Takakiri is an arcade game suitable for all ages. We do not knowingly collect personally identifiable information from children under 13 (or under the age of digital consent in your jurisdiction). Because the application stores high scores locally and does not collect personal data, parents can feel secure allowing young players to practice their slicing skills.
          </p>
        </section>

        {/* Section 5 */}
        <section className="bg-dojo-900/50 p-6 rounded-2xl border border-dojo-800">
          <h2 className="font-cinzel text-lg font-bold text-white flex items-center gap-2 mb-3">
            <Database className="w-4 h-4 text-gold-400" />
            5. Data Retention & Deletion
          </h2>
          <p>
            Since all gameplay data is retained locally on your Android device, you have full control over your data at all times. 
            Clearing the game's cache or storage via <em>Android Settings &gt; Apps &gt; Takakiri &gt; Storage &gt; Clear Storage</em>, or uninstalling the app, immediately and permanently deletes all stored records and scores.
          </p>
        </section>

        {/* Section 6 */}
        <section className="bg-dojo-900/50 p-6 rounded-2xl border border-dojo-800">
          <h2 className="font-cinzel text-lg font-bold text-white flex items-center gap-2 mb-3">
            <Mail className="w-4 h-4 text-gold-400" />
            6. Contacting the Developer
          </h2>
          <p className="mb-3">
            If you have any questions or feedback regarding this Privacy Policy or the security of the game, please reach out to the developer:
          </p>
          <div className="p-4 rounded-xl bg-dojo-950 border border-dojo-800 text-xs font-mono space-y-1.5">
            <div><span className="text-slate-400">Developer:</span> <span className="text-white font-semibold">{config.developerName}</span></div>
            <div><span className="text-slate-400">Confirmed Contact Email:</span> <span className="text-gold-400 font-semibold">{config.supportEmail}</span></div>
            <div><span className="text-slate-400">Source Repository:</span> <a href={config.githubRepoUrl} target="_blank" rel="noreferrer" className="text-crimson-400 hover:underline">{config.githubRepoUrl}</a></div>
          </div>
        </section>

      </div>
    </div>
  );
};
