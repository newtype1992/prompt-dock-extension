import { useEffect } from 'react';

interface ShortcutHandlers {
  focusSearch: () => void;
  openNewPromptForm: () => void;
  moveSelection: (delta: 1 | -1) => void;
  activateSelection: () => void;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  const typeableTags = ['input', 'textarea', 'select'];
  return typeableTags.includes(tag) || target.isContentEditable;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      switch (event.key) {
        case '/': {
          event.preventDefault();
          handlers.focusSearch();
          break;
        }
        case 'n': {
          event.preventDefault();
          handlers.openNewPromptForm();
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();
          handlers.moveSelection(-1);
          break;
        }
        case 'ArrowDown': {
          event.preventDefault();
          handlers.moveSelection(1);
          break;
        }
        case 'Enter': {
          event.preventDefault();
          handlers.activateSelection();
          break;
        }
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlers]);
}
