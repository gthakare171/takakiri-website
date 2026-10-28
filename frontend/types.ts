export type NavPage = 'home' | 'modes' | 'privacy' | 'support' | 'terms' | 'publish-guide';

export interface GameModeInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  kanji: string;
  badgeColor: string;
  iconName: string;
}

export interface DeveloperConfig {
  godaddyDomain: string;
  subdomain: string;
  supportEmail: string;
  developerName: string;
  githubRepoUrl: string;
}

export interface SlicedFruitItem {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  name: string;
  emoji: string;
  color: string;
  sliced: boolean;
  sliceAngle?: number;
  points: number;
}
