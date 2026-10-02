export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: Date;
  readTime: number;
  color?: string;
}