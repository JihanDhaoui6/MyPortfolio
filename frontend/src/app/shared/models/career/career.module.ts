export type CareerType = 'work' | 'study';

export interface CareerEntry {
  id: number;
  type: CareerType;
  title: string;
  organization: string;
  location: string;
  startDate: string;   // format "YYYY-MM"
  endDate: string | 'now';
  description?: string[];
  color: string;
  /** Position en % sur la ligne (calculée) */
  left?: number;
  width?: number;
}