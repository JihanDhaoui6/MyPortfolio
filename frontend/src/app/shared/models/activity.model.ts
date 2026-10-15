export type ActivityType = 'github' | 'linkedin';

export interface ActivityItem {
  type: ActivityType;
  title: string;
  description?: string;
  url: string;
  date: Date;
  logo: string;         // ← URL du logo officiel
  logoBg: string;       // ← couleur de fond du badge
  color: string;
  timeAgo?: string;
}