export type ActivityType = 'github' | 'linkedin' | 'medium' | 'devto';

export interface ActivityItem {
  type: ActivityType;
  title: string;
  description?: string;
  url: string;
  date: Date;
  icon: string;
  color: string;
}