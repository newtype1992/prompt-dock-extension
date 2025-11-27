import { ChromePromptRepository } from '../storage/chromePromptRepository';
import type { ExtensionMessage, ExtensionResponse } from '../types/messages';

const repo = new ChromePromptRepository();

chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage, _sender, sendResponse: (response: ExtensionResponse) => void) => {
    (async () => {
      try {
        switch (message.type) {
          case 'GET_PROMPTS': {
            const prompts = await repo.getPrompts();
            sendResponse({ success: true, data: prompts });
            break;
          }
          case 'SAVE_PROMPT': {
            await repo.savePrompt(message.payload);
            sendResponse({ success: true });
            break;
          }
          case 'UPDATE_PROMPT': {
            await repo.updatePrompt(message.payload);
            sendResponse({ success: true });
            break;
          }
          case 'DELETE_PROMPT': {
            await repo.deletePrompt(message.payload.id);
            sendResponse({ success: true });
            break;
          }
          case 'GET_FOLDERS': {
            const folders = await repo.getFolders();
            sendResponse({ success: true, data: folders });
            break;
          }
          case 'SAVE_FOLDER': {
            await repo.saveFolder(message.payload);
            sendResponse({ success: true });
            break;
          }
          case 'DELETE_FOLDER': {
            await repo.deleteFolder(message.payload.id);
            sendResponse({ success: true });
            break;
          }
          default: {
            sendResponse({ success: false, error: 'Unknown message type' });
          }
        }
      } catch (err) {
        console.error('PromptDock background error', err);
        sendResponse({ success: false, error: 'Something went wrong' });
      }
    })();

    return true;
  },
);

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== 'open_promptdock') return;

  try {
    if (chrome.action && chrome.action.openPopup) {
      await chrome.action.openPopup();
      return;
    }
  } catch (err) {
    console.warn('Unable to open popup via command', err);
  }

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      await chrome.action.setPopup({ tabId: tab.id, popup: 'popup.html' });
      await chrome.action.openPopup?.();
    }
  } catch (err) {
    console.error('Fallback to open popup failed', err);
  }
});
