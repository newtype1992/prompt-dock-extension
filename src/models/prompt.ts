export interface Prompt {
  id: string;
  title: string;
  content: string;
  folder: string | null;
  tags: string[];
  pinned: boolean;
  createdAt: number;
  updatedAt: number;
}
