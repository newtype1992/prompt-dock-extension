import type { Folder } from '../models/folder';
import type { Prompt } from '../models/prompt';

export type ExtensionMessage =
  | { type: 'GET_PROMPTS' }
  | { type: 'SAVE_PROMPT'; payload: Prompt }
  | { type: 'UPDATE_PROMPT'; payload: Prompt }
  | { type: 'DELETE_PROMPT'; payload: { id: string } }
  | { type: 'GET_FOLDERS' }
  | { type: 'SAVE_FOLDER'; payload: Folder }
  | { type: 'DELETE_FOLDER'; payload: { id: string } };

export interface ExtensionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
