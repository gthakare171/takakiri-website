import React, { useState } from 'react';
import { DeveloperConfig } from '../types';
import { createZipArchive } from '../services/zipService';
import { 
  Globe, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertCircle,
  Terminal,
  Settings,
  Download,
  FolderGit2,
  Workflow,
  Sparkles,
  ShieldCheck,
  PackageCheck,
  CheckCircle2,
  GitPullRequest,
  CheckCircle
} from 'lucide-react';

interface PublishingGuideModalProps {
  config: DeveloperConfig;
  onUpdateConfig: (newConfig: DeveloperConfig) => void;
}

export const PublishingGuideModal: React.FC<PublishingGuideModalProps> = ({
  config,
  onUpdateConfig,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'push' | 'zip' | 'dns' | 'playstore'>('status');

  const githubUser = 'gthakare171';
  const repoName = 'takakiri-website';
  const repoUrl = `https://github.com/${githubUser}/${repoName}`;
  const customDomain = `${config.subdomain ? `${config.subdomain}.` : ''}${config.godaddyDomain}`;
  const defaultGhUrl = `https://${githubUser}.github.io/${repoName}/`;
  const websiteUrl = config.godaddyDomain !== 'yourdomain.com' ? `https://${customDomain}` : defaultGhUrl;
  const privacyUrl = `${websiteUrl}#privacy`;
  const supportUrl = `${websiteUrl}#support`;

  const copy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadCompleteZip = () => {
    setDownloadingZip(true);
    try {
      const packageJson = JSON.stringify({
        name: "takakiri-website",
        private: true,
        version: "1.0.0",
        type: "module",
        scripts: {
          dev: "vite",
          build: "tsc && vite build",
          preview: "vite preview"
        },
        dependencies: {
          react: "^19.0.0",
          "react-dom": "^19.0.0",
          "lucide-react": "^0.577.0",
          "framer-motion": "^12.0.0"
        },
        devDependencies: {
          "@types/react": "^19.0.0",
          "@types/react-dom": "^19.0.0",
          "@vitejs/plugin-react": "^4.3.0",
          typescript: "^5.6.0",
          vite: "^5.4.0"
        }
      }, null, 2);

      const tsConfig = JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          useDefineForClassFields: true,
          lib: ["ES2022", "DOM", "DOM.Iterable"],
          module: "ESNext",
          skipLibCheck: true,
          moduleResolution: "bundler",
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: "react-jsx",
          strict: true,
          noUnusedLocals: false,
          noUnusedParameters: false,
          noFallthroughCasesInSwitch: true
        },
        include: ["src", "index.html", "*.ts", "*.tsx", "components/*"]
      }, null, 2);

      const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base ('./') ensures assets load correctly both on:
// 1. GitHub Pages default subpath: https://${githubUser}.github.io/${repoName}/
// 2. Custom root/subdomain: https://${customDomain}/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
  }
});
`;

      const gitignore = `node_modules
dist
dist-ssr
*.local
.vscode/*
!.vscode/extensions.json
.DS_Store
*.log
`;

      const githubActionsWorkflow = `name: Deploy Takakiri Website to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci || npm install

      - name: Build Production Website
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload Pages Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

      const readme = `# Takakiri: Japanese Dojo Fruit Slicer — Official Website

Official website and Google Play compliance hub for **Takakiri: Japanese Dojo Fruit Slicer**.

- **Website Repository**: \`https://github.com/${githubUser}/${repoName}\`
- **Game Repository**: \`https://github.com/${githubUser}/takakiri-game\` (Untouched)
- **GoDaddy Domain / Target**: \`${customDomain}\`
- **GitHub Pages Direct URL**: \`${defaultGhUrl}\`

## Structure (All Root-Level)
- \`index.html\` (Root entry point)
- \`package.json\` (Build scripts & dependencies)
- \`vite.config.ts\` (Configured with relative base \`./\` for \`/${repoName}/\` subpath)
- \`.github/workflows/deploy.yml\` (Automated GitHub Actions build & deployment)
- \`public/404.html\` (SPA client-side router fallback)
- \`CNAME\` (Custom domain configuration)

## Deployment via GitHub Actions
Pushing to the \`main\` branch automatically triggers \`.github/workflows/deploy.yml\`, which builds the production React application and publishes it to GitHub Pages.
`;

      const cname = config.godaddyDomain !== 'yourdomain.com' ? customDomain : '';

      const spaRedirect404 = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Takakiri — Dojo Gateway</title>
    <script>
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>`;

      // Full HTML for standalone bundle
      const standaloneHtml = `<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Takakiri: Japanese Dojo Fruit Slicer — Official Website</title>
    <meta name="description" content="Experience the master art of the blade in Takakiri. Slice fruits, dodge shurikens, and conquer the Dojo across Classic, Campaign, Arcade, Zen, and Ninja modes." />
    <meta name="theme-color" content="#0d0d11" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {
            colors: {
              dojo: {
                950: '#08080a',
                900: '#0e0f14',
                850: '#13151c',
                800: '#1a1d26',
                700: '#2a2e3d',
              },
              sakura: {
                400: '#fca5a5',
                500: '#f87171',
                600: '#ef4444',
              },
              gold: {
                400: '#fbd38d',
                500: '#e6b422',
                600: '#c59b1d',
              },
              crimson: {
                500: '#dc2626',
                600: '#b91c1c',
                700: '#991b1b',
              }
            },
            fontFamily: {
              cinzel: ['Cinzel', 'serif'],
              sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            }
          }
        }
      }
    </script>
  </head>
  <body class="bg-dojo-950 text-slate-100 font-sans antialiased selection:bg-crimson-600 selection:text-white overflow-x-hidden min-h-screen">
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>`;

      const files = [
        { path: 'package.json', content: packageJson },
        { path: 'tsconfig.json', content: tsConfig },
        { path: 'vite.config.ts', content: viteConfig },
        { path: '.gitignore', content: gitignore },
        { path: 'README.md', content: readme },
        { path: 'CNAME', content: cname },
        { path: 'index.html', content: standaloneHtml },
        { path: 'public/404.html', content: spaRedirect404 },
        { path: '.github/workflows/deploy.yml', content: githubActionsWorkflow },
      ];

      const blob = createZipArchive(files);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `takakiri-website-complete-repo.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingZip(false);
    }
  };

  const quickPushExisting = `git remote add origin https://github.com/${githubUser}/${repoName}.git
git branch -M main
git push -u origin main`;

  const fullTerminalCommands = `# 1. Create and navigate into the website repository folder
mkdir takakiri-website
cd takakiri-website

# 2. Extract the downloaded takakiri-website-complete-repo.zip into this folder
# Ensure index.html and package.json are in the root directory

# 3. Initialize git and link to gthakare171/takakiri-website
git init
git remote add origin https://github.com/${githubUser}/${repoName}.git
git branch -M main

# 4. Commit all website files
git add .
git commit -m "Official Takakiri website, Google Play privacy policy, support desk, and GitHub Pages workflow"

# 5. Push to GitHub main branch
git push -u origin main`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      
      {/* Top Banner */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-950/70 border border-gold-500/40 text-gold-400 text-xs font-semibold">
          <FolderGit2 className="w-4 h-4 text-gold-400" />
          <span>Publishing Deployment Station</span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-4xl font-black text-white">
          PUBLISH TO GITHUB &amp; GODADDY
        </h1>

        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Target Repository: <a href={repoUrl} target="_blank" rel="noreferrer" className="text-gold-400 hover:underline font-mono font-bold">{repoUrl}</a>.
          Your existing game repository <code className="text-gold-300 font-mono">takakiri-game</code> remains completely separate and untouched.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-dojo-800 pb-3">
        <button
          onClick={() => setActiveTab('status')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'status'
              ? 'bg-crimson-600 text-white shadow-md shadow-crimson-950/50'
              : 'bg-dojo-900 text-slate-400 hover:text-white border border-dojo-800'
          }`}
        >
          <GitPullRequest className="w-4 h-4" />
          <span>Connector Status &amp; Verification</span>
        </button>

        <button
          onClick={() => setActiveTab('push')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'push'
              ? 'bg-crimson-600 text-white shadow-md shadow-crimson-950/50'
              : 'bg-dojo-900 text-slate-400 hover:text-white border border-dojo-800'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Terminal Git Commands (Push to Main)</span>
        </button>

        <button
          onClick={() => setActiveTab('zip')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'zip'
              ? 'bg-crimson-600 text-white shadow-md shadow-crimson-950/50'
              : 'bg-dojo-900 text-slate-400 hover:text-white border border-dojo-800'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>1-Click Complete ZIP Exporter</span>
        </button>

        <button
          onClick={() => setActiveTab('dns')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'dns'
              ? 'bg-crimson-600 text-white shadow-md shadow-crimson-950/50'
              : 'bg-dojo-900 text-slate-400 hover:text-white border border-dojo-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>GoDaddy DNS Records</span>
        </button>

        <button
          onClick={() => setActiveTab('playstore')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'playstore'
              ? 'bg-crimson-600 text-white shadow-md shadow-crimson-950/50'
              : 'bg-dojo-900 text-slate-400 hover:text-white border border-dojo-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Google Play Console URLs</span>
        </button>
      </div>

      {/* Global Config Row */}
      <div className="p-5 rounded-2xl bg-dojo-900/80 border border-dojo-700/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5" />
            Configuration Inputs
          </span>
          <span className="text-[11px] text-slate-400">Updates CNAME, workflow files, and URLs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              GoDaddy Root Domain
            </label>
            <input
              type="text"
              value={config.godaddyDomain}
              onChange={(e) => onUpdateConfig({ ...config, godaddyDomain: e.target.value.trim() })}
              placeholder="e.g. yourdomain.com"
              className="w-full px-3 py-1.5 rounded-lg bg-dojo-950 border border-dojo-700 text-xs text-white focus:outline-none focus:border-gold-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Subdomain (e.g. takakiri)
            </label>
            <input
              type="text"
              value={config.subdomain}
              onChange={(e) => onUpdateConfig({ ...config, subdomain: e.target.value.trim() })}
              placeholder="e.g. takakiri"
              className="w-full px-3 py-1.5 rounded-lg bg-dojo-950 border border-dojo-700 text-xs text-white focus:outline-none focus:border-gold-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Confirmed Support Email
            </label>
            <input
              type="email"
              value={config.supportEmail}
              onChange={(e) => onUpdateConfig({ ...config, supportEmail: e.target.value.trim() })}
              placeholder="e.g. support@yourdomain.com"
              className="w-full px-3 py-1.5 rounded-lg bg-dojo-950 border border-dojo-700 text-xs text-white focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>
      </div>

      {/* TAB 0: CONNECTOR STATUS & VERIFICATION */}
      {activeTab === 'status' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-dojo-900 border border-dojo-700 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gold-400" />
                <span>GitHub Connector Inspection &amp; Permission Status</span>
              </h2>
              <span className="text-xs bg-amber-950/80 text-amber-400 border border-amber-800 px-2.5 py-0.5 rounded-full font-mono">
                Direct OAuth Push Not Available in Browser Sandbox
              </span>
            </div>

            <div className="p-4 rounded-xl bg-dojo-950 border border-dojo-800 text-xs text-slate-300 space-y-3 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-1">Why automated silent push requires manual terminal or web upload:</strong>
                  In accordance with your explicit instructions (<em>&quot;If the connector does not support writing or deployment, explain exactly which permission or step is missing instead of claiming success&quot;</em>):
                  The AI web generation environment operates as a client-side execution container. It does <strong>not</strong> possess an active GitHub OAuth write token with <code>repo:write</code> or <code>workflow:write</code> scopes for <code>https://github.com/gthakare171/takakiri-website</code>, nor can it execute outbound authenticated git transport without your private credentials.
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Safe 2-Step Push Procedure:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-dojo-950 border border-dojo-800 space-y-2">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Option 1: Terminal Push (Your Exact 3 Commands)
                  </span>
                  <p className="text-slate-400 leading-relaxed">
                    Download the pre-bundled ZIP via the <strong>1-Click Complete ZIP Exporter</strong> tab, extract it into a folder, and run your 3 commands:
                  </p>
                  <pre className="p-2.5 rounded bg-black border border-dojo-800 font-mono text-[11px] text-emerald-400">
{quickPushExisting}
                  </pre>
                </div>

                <div className="p-4 rounded-xl bg-dojo-950 border border-dojo-800 space-y-2">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Option 2: GitHub Web Drag-and-Drop
                  </span>
                  <p className="text-slate-400 leading-relaxed">
                    Download the complete repository ZIP, extract it, go to <a href={repoUrl} target="_blank" rel="noreferrer" className="text-gold-400 hover:underline">gthakare171/takakiri-website</a>, click <strong>Add file &gt; Upload files</strong>, drag all files in, and commit to <code>main</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: TERMINAL PUSH */}
      {activeTab === 'push' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-dojo-900 border border-dojo-700 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-crimson-400" />
                <span>Execute Remote Push to GitHub</span>
              </h2>
              <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full font-mono">
                main branch
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Run the exact commands below in your local directory to push directly to your new repository:
            </p>

            <div className="relative group">
              <div className="flex items-center justify-between bg-dojo-950 px-4 py-2 border-t border-x border-dojo-800 rounded-t-xl text-[11px] font-mono text-slate-400">
                <span>Direct Remote Push Commands</span>
                <button
                  onClick={() => copy('quick-push', quickPushExisting)}
                  className="text-gold-400 hover:text-gold-300 flex items-center gap-1 text-xs font-semibold"
                >
                  {copiedKey === 'quick-push' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'quick-push' ? 'Copied!' : 'Copy 3 Commands'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-b-xl bg-black border border-dojo-800 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {quickPushExisting}
              </pre>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between pb-1.5 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Complete Setup &amp; Push Script:</span>
                <button
                  onClick={() => copy('full-terminal', fullTerminalCommands)}
                  className="text-gold-400 hover:text-gold-300 flex items-center gap-1 text-xs font-semibold"
                >
                  {copiedKey === 'full-terminal' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'full-terminal' ? 'Script Copied!' : 'Copy Full Script'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-dojo-950 border border-dojo-800 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {fullTerminalCommands}
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-dojo-950/80 border border-dojo-800 space-y-2 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Post-Push Verification Checklist
              </span>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li>Visit <a href={repoUrl} target="_blank" rel="noreferrer" className="text-gold-400 hover:underline">{repoUrl}</a> to confirm all files appear on the <code>main</code> branch.</li>
                <li>Go to <strong>Settings &gt; Pages</strong>: Ensure <strong>Source</strong> is set to <strong>GitHub Actions</strong>.</li>
                <li>The included workflow <code>.github/workflows/deploy.yml</code> will automatically build the Vite production distribution and deploy the website.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ZIP EXPORTER */}
      {activeTab === 'zip' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-dojo-900 via-dojo-850 to-dojo-900 border border-gold-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                1-Click Package Exporter
              </span>
              <h2 className="text-lg font-bold text-white">
                Download Complete Standalone Project ZIP
              </h2>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                Pre-configured with <code>package.json</code>, <code>vite.config.ts</code> (relative base <code>./</code> for both custom domain &amp; <code>/takakiri-website/</code> subpath), <code>.github/workflows/deploy.yml</code>, <code>public/404.html</code>, and full source code.
              </p>
            </div>

            <button
              onClick={handleDownloadCompleteZip}
              disabled={downloadingZip}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-dojo-950 font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shadow-gold-500/20 flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{downloadingZip ? 'Generating ZIP...' : 'Download takakiri-website-complete-repo.zip'}</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-dojo-900/70 border border-dojo-800 space-y-3 text-xs text-slate-300">
            <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-emerald-400" />
              Upload Files via GitHub Web Interface (No Terminal Needed)
            </h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-400">
              <li>Click the gold button above to download <code>takakiri-website-complete-repo.zip</code>.</li>
              <li>Extract the ZIP file on your computer.</li>
              <li>Open your repository: <a href={repoUrl} target="_blank" rel="noreferrer" className="text-gold-400 hover:underline">{repoUrl}</a>.</li>
              <li>Click <strong>Add file &gt; Upload files</strong>.</li>
              <li>Drag and drop the extracted files into the GitHub box, enter commit message, and click <strong>Commit changes</strong>.</li>
            </ol>
          </div>
        </div>
      )}

      {/* TAB 3: GODADDY DNS */}
      {activeTab === 'dns' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-dojo-900/70 border border-dojo-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-gold-400" />
                GoDaddy DNS Management Instructions
              </h3>
              <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full font-mono">
                Preserves Existing Root Website
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Log in to your <strong>GoDaddy Account</strong> &gt; <strong>Domains</strong> &gt; Select <strong>{config.godaddyDomain}</strong> &gt; <strong>Manage DNS</strong>. 
              Click <strong>Add New Record</strong> and add:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border border-dojo-700 rounded-lg overflow-hidden">
                <thead className="bg-dojo-950 text-slate-400 border-b border-dojo-700">
                  <tr>
                    <th className="p-3">Record Type</th>
                    <th className="p-3">Name / Host</th>
                    <th className="p-3">Value / Target</th>
                    <th className="p-3">TTL</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dojo-800 bg-dojo-900 text-slate-200">
                  <tr>
                    <td className="p-3 text-gold-400 font-bold">CNAME</td>
                    <td className="p-3">{config.subdomain}</td>
                    <td className="p-3 text-emerald-400">{githubUser}.github.io</td>
                    <td className="p-3">1/2 Hour (Default)</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => copy('cname-val', `${githubUser}.github.io`)}
                        className="px-2.5 py-1 rounded bg-dojo-800 hover:bg-dojo-700 text-gold-400 flex items-center gap-1 ml-auto"
                      >
                        {copiedKey === 'cname-val' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'cname-val' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-dojo-950 border border-dojo-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-gold-400 font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>Zero Downtime Verification</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                By pointing the subdomain <code className="text-white">{config.subdomain}.{config.godaddyDomain}</code> to GitHub Pages, your existing root website, emails, and nameservers remain 100% active with no interruption.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PLAY STORE CONSOLE */}
      {activeTab === 'playstore' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-dojo-900/70 border border-dojo-800 space-y-4">
            <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              Verified Links for Google Play Console Submission
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-dojo-950 border border-dojo-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Privacy Policy URL (Required)
                  </span>
                  <div className="font-mono text-xs text-emerald-400 select-all">
                    {privacyUrl}
                  </div>
                </div>
                <button
                  onClick={() => copy('privacyUrl', privacyUrl)}
                  className="px-3 py-1.5 rounded-lg bg-dojo-900 hover:bg-dojo-800 text-gold-400 text-xs flex items-center gap-1.5 flex-shrink-0"
                >
                  {copiedKey === 'privacyUrl' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-dojo-950 border border-dojo-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Support Website URL
                  </span>
                  <div className="font-mono text-xs text-emerald-400 select-all">
                    {supportUrl}
                  </div>
                </div>
                <button
                  onClick={() => copy('supportUrl', supportUrl)}
                  className="px-3 py-1.5 rounded-lg bg-dojo-900 hover:bg-dojo-800 text-gold-400 text-xs flex items-center gap-1.5 flex-shrink-0"
                >
                  {copiedKey === 'supportUrl' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-dojo-950 border border-dojo-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Official Website URL
                  </span>
                  <div className="font-mono text-xs text-emerald-400 select-all">
                    {websiteUrl}
                  </div>
                </div>
                <button
                  onClick={() => copy('websiteUrl', websiteUrl)}
                  className="px-3 py-1.5 rounded-lg bg-dojo-900 hover:bg-dojo-800 text-gold-400 text-xs flex items-center gap-1.5 flex-shrink-0"
                >
                  {copiedKey === 'websiteUrl' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
