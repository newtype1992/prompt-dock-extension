import type { Folder } from '../models/folder';
import type { Prompt } from '../models/prompt';
import type { PromptRepository } from './promptRepository';

const PROMPTS_KEY = 'promptdock_prompts';
const FOLDERS_KEY = 'promptdock_folders';

async function getArrayFromStorage<T>(key: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }

      const value = result[key];
      if (Array.isArray(value)) {
        resolve(value as T[]);
        return;
      }

      // Reset corrupt data
      chrome.storage.sync.set({ [key]: [] }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }
        resolve([]);
      });
    });
  });
}

async function saveArrayToStorage<T>(key: string, data: T[]): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [key]: data }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve();
    });
  });
}

export class ChromePromptRepository implements PromptRepository {
  async getPrompts(): Promise<Prompt[]> {
    return getArrayFromStorage<Prompt>(PROMPTS_KEY);
  }

  async savePrompt(prompt: Prompt): Promise<void> {
    const prompts = await this.getPrompts();
    await saveArrayToStorage(PROMPTS_KEY, [...prompts, prompt]);
  }

  async updatePrompt(prompt: Prompt): Promise<void> {
    const prompts = await this.getPrompts();
    const updated = prompts.some((p) => p.id === prompt.id)
      ? prompts.map((p) => (p.id === prompt.id ? prompt : p))
      : [...prompts, prompt];
    await saveArrayToStorage(PROMPTS_KEY, updated);
  }

  async deletePrompt(id: string): Promise<void> {
    const prompts = await this.getPrompts();
    await saveArrayToStorage(
      PROMPTS_KEY,
      prompts.filter((p) => p.id !== id),
    );
  }

  async getFolders(): Promise<Folder[]> {
    return getArrayFromStorage<Folder>(FOLDERS_KEY);
  }

  async saveFolder(folder: Folder): Promise<void> {
    const folders = await this.getFolders();
    await saveArrayToStorage(FOLDERS_KEY, [...folders, folder]);
  }

  async deleteFolder(id: string): Promise<void> {
    const folders = await this.getFolders();
    await saveArrayToStorage(
      FOLDERS_KEY,
      folders.filter((f) => f.id !== id),
    );
  }
}
