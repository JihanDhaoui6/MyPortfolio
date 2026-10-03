export type ActivityType = 'github' | 'linkedin' | 'medium';

export interface ActivityItem {
  type: ActivityType;
  title: string;
  description?: string;
  url: string;
  date: Date;
  icon: string;
  color: string;
  /** Texte "il y a X" calculé au chargement (optionnel) */
  timeAgo?: string;
}