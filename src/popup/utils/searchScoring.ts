import type { IndexedPrompt } from './searchIndex';

export function scorePrompt(prompt: IndexedPrompt, query: string): number {
  if (!query) {
    // Score 0; pinned weight handled elsewhere.
    return prompt.pinned ? 5 : 0;
  }

  let score = 0;
  if (prompt.title.toLowerCase().includes(query)) {
    score += 3;
  }

  if (prompt.tags.some((tag) => tag.toLowerCase().includes(query))) {
    score += 2;
  }

  if (prompt.content.toLowerCase().includes(query)) {
    score += 1;
  }

  if (prompt.pinned) {
    score += 5;
  }

  return score;
}
