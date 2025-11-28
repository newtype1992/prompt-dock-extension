import type { Prompt } from '../../models/prompt';

const STOPWORDS = new Set([
  'the',
  'and',
  'for',
  'that',
  'with',
  'this',
  'from',
  'you',
  'your',
  'are',
  'was',
  'were',
  'but',
  'not',
  'have',
  'has',
  'had',
  'use',
  'using',
  'into',
  'out',
  'our',
  'their',
  'they',
  'them',
  'its',
  'can',
  'will',
  'just',
  'about',
  'more',
  'some',
  'any',
  'all',
  'get',
  'also',
  'like',
  'how',
  'who',
  'what',
  'when',
  'where',
  'why',
  'while',
  'should',
  'could',
  'would',
  'then',
  'than',
  'been',
  'over',
  'per',
  'via',
  'each',
  'other',
]);

const WORD_REGEX = /[^a-zA-Z]+/;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(WORD_REGEX)
    .filter((token) => token.length >= 3 && !STOPWORDS.has(token) && !/^[0-9]+$/.test(token));
}

export function getKeywordSuggestionsFromContent(
  title: string,
  content: string,
  existingTags: string[],
  maxSuggestions = 5,
): string[] {
  const tokens = tokenize(`${title} ${content}`);
  const counts = tokens.reduce<Record<string, number>>((acc, token) => {
    if (existingTags.includes(token)) return acc;
    acc[token] = (acc[token] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxSuggestions)
    .map(([word]) => word);
}

export function getPopularExistingTags(prompts: Prompt[], maxSuggestions = 5): string[] {
  const counts = prompts.reduce<Record<string, number>>((acc, prompt) => {
    prompt.tags.forEach((tag) => {
      const lower = tag.toLowerCase();
      acc[lower] = (acc[lower] ?? 0) + 1;
    });
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxSuggestions)
    .map(([tag]) => tag);
}

export function getSmartTagSuggestions(
  prompts: Prompt[],
  currentTitle: string,
  currentContent: string,
  currentTags: string[],
  maxSuggestions = 8,
): string[] {
  const existing = currentTags.map((tag) => tag.toLowerCase());
  const keywordSuggestions = getKeywordSuggestionsFromContent(
    currentTitle,
    currentContent,
    existing,
    maxSuggestions,
  );
  const popularTags = getPopularExistingTags(prompts, maxSuggestions);

  const merged: string[] = [];
  const seen = new Set(existing);

  const add = (tag: string) => {
    const lower = tag.toLowerCase();
    if (seen.has(lower)) return;
    seen.add(lower);
    merged.push(tag);
  };

  keywordSuggestions.forEach(add);
  popularTags.forEach(add);

  return merged.slice(0, maxSuggestions);
}
