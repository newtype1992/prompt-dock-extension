import type { Prompt } from '../models/prompt';
import type { Folder } from '../models/folder';

export interface PromptRepository {
  getPrompts(): Promise<Prompt[]>;
  savePrompt(prompt: Prompt): Promise<void>;
  updatePrompt(prompt: Prompt): Promise<void>;
  deletePrompt(id: string): Promise<void>;
  getFolders(): Promise<Folder[]>;
  saveFolder(folder: Folder): Promise<void>;
  deleteFolder(id: string): Promise<void>;
}
