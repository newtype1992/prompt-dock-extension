import type { Prompt } from '../../models/prompt';

export interface IndexedPrompt extends Prompt {
  searchText: string;
}

export function buildIndexedPrompts(prompts: Prompt[]): IndexedPrompt[] {
  return prompts.map((prompt) => ({
    ...prompt,
    searchText: buildSearchText(prompt),
  }));
}

export function buildSearchText(prompt: Prompt): string {
  const parts = [prompt.title, prompt.content, prompt.tags.join(' ')];
  return parts.join(' ').toLowerCase();
}
