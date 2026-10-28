import { GameModeInfo } from './types';

export const DEFAULT_CONFIG = {
  godaddyDomain: 'websitestar.in',
  subdomain: 'takakiri',
  supportEmail: 'gauravthakare0612@gmail.com',
  developerName: 'Gaurav Thakare (Takakiri Studios)',
  githubRepoUrl: 'https://github.com/gthakare171/takakiri-game',
};

export const GAME_MODES: GameModeInfo[] = [
  {
    id: 'classic',
    title: 'Takakiri Classic',
    subtitle: 'Pure Dojo Blade Mastery',
    description: 'The definitive fruit slicing trial. Three misses allowed. Dodge the lethal gunpowder shurikens and maintain combos to achieve high scores in the dojo hall.',
    features: ['3 Hearts Life System', 'Shuriken / Bomb avoidance', 'Combo multiplier streak bonus', 'Local high score tracking'],
    kanji: '斬',
    badgeColor: 'border-red-500/50 text-red-400 bg-red-950/40',
    iconName: 'Sword',
  },
  {
    id: 'campaign',
    title: 'Campaign Checkpoints',
    subtitle: 'Ascend the 10 Dojo Gates',
    description: 'Stage-based progression through distinct Japanese seasons and dojo chambers. Clear specific targets such as slicing 40 persimmons without touching an explosive.',
    features: ['Level-by-level milestones', 'Increasing blade velocity', 'Boss challenges & special targets', 'Star ratings & badge mastery'],
    kanji: '道',
    badgeColor: 'border-amber-500/50 text-amber-400 bg-amber-950/40',
    iconName: 'MapPin',
  },
  {
    id: 'arcade',
    title: 'Arcade Frenzy',
    subtitle: '60 Seconds of High-Speed Chaos',
    description: 'A relentless blitz against the hourglass. Slices trigger magical fruit powers including Ice Freeze (slow motion), Gold Rush (fruit deluge), and Flame Fury (blade ignition).',
    features: ['60-second frenzy timer', 'Elemental power-up bananas', 'Score boost cascade', 'No lives lost on fruit drops'],
    kanji: '狂',
    badgeColor: 'border-purple-500/50 text-purple-400 bg-purple-950/40',
    iconName: 'Zap',
  },
  {
    id: 'zen',
    title: 'Zen Garden',
    subtitle: 'Meditative Flow, No Bombs',
    description: 'Step into the tranquil bonsai courtyard. Uninterrupted 90 seconds of fruit slicing surrounded by falling cherry blossom petals, traditional koto strings, and soothing flow.',
    features: ['Zero bombs or penalties', 'Soothing Japanese audio ambience', 'Calming visual feedback', 'Stress-free slice practice'],
    kanji: '禅',
    badgeColor: 'border-emerald-500/50 text-emerald-400 bg-emerald-950/40',
    iconName: 'Feather',
  },
  {
    id: 'ninja',
    title: 'Ninja Challenge',
    subtitle: 'Ultra-Fast Reflex Trial',
    description: 'Designed exclusively for seasoned blade masters. Precision targets spawn with micro-second windows, rotating decoy bombs, and erratic arcs that demand lightning instincts.',
    features: ['Micro-window reaction timing', 'Decoy shurikens', 'Double-point critical slices', 'Master rank leaderboards'],
    kanji: '忍',
    badgeColor: 'border-blue-500/50 text-blue-400 bg-blue-950/40',
    iconName: 'ShieldAlert',
  },
];

export const FRUIT_SAMPLES = [
  { name: 'Watermelon (Suika)', emoji: '🍉', color: '#10b981', points: 10 },
  { name: 'Yuzu Citrus', emoji: '🍋', color: '#eab308', points: 15 },
  { name: 'Persimmon (Kaki)', emoji: '🍊', color: '#f97316', points: 20 },
  { name: 'Japanese Dragonfruit', emoji: '🐉', color: '#ec4899', points: 30 },
  { name: 'Bamboo Coconut', emoji: '🥥', color: '#8b5cf6', points: 25 },
  { name: 'Fuji Apple', emoji: '🍎', color: '#ef4444', points: 10 },
];
