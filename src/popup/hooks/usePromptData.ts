import { useCallback, useEffect, useState } from 'react';
import type { Folder } from '../../models/folder';
import type { Prompt } from '../../models/prompt';
import type { ExtensionMessage, ExtensionResponse } from '../../types/messages';

async function sendExtensionMessage<T>(message: ExtensionMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response: ExtensionResponse<T>) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (!response) {
        reject(new Error('No response from background'));
        return;
      }
      if (!response.success) {
        reject(new Error(response.error ?? 'Unknown error'));
        return;
      }
      resolve(response.data as T);
    });
  });
}

export function usePromptData() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);
  const setErrorMessage = (message: string) => setError(message);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [promptData, folderData] = await Promise.all([
        sendExtensionMessage<Prompt[]>({ type: 'GET_PROMPTS' }),
        sendExtensionMessage<Folder[]>({ type: 'GET_FOLDERS' }),
      ]);
      setPrompts(promptData);
      setFolders(folderData);
    } catch (err) {
      console.error(err);
      setError('Could not load data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const createPrompt = useCallback(
    async (prompt: Prompt) => {
      try {
        await sendExtensionMessage<void>({ type: 'SAVE_PROMPT', payload: prompt });
        await refresh();
      } catch (err) {
        console.error(err);
        setError('Could not save your prompt. Please try again.');
        throw err;
      }
    },
    [refresh],
  );

  const updatePrompt = useCallback(
    async (prompt: Prompt) => {
      try {
        await sendExtensionMessage<void>({ type: 'UPDATE_PROMPT', payload: prompt });
        await refresh();
      } catch (err) {
        console.error(err);
        setError('Could not update your prompt. Please try again.');
        throw err;
      }
    },
    [refresh],
  );

  const deletePrompt = useCallback(
    async (id: string) => {
      try {
        await sendExtensionMessage<void>({ type: 'DELETE_PROMPT', payload: { id } });
        await refresh();
      } catch (err) {
        console.error(err);
        setError('Could not delete your prompt. Please try again.');
        throw err;
      }
    },
    [refresh],
  );

  const createFolder = useCallback(
    async (folder: Folder) => {
      try {
        await sendExtensionMessage<void>({ type: 'SAVE_FOLDER', payload: folder });
        await refresh();
      } catch (err) {
        console.error(err);
        setError('Could not save your folder. Please try again.');
        throw err;
      }
    },
    [refresh],
  );

  const deleteFolder = useCallback(
    async (id: string) => {
      try {
        await sendExtensionMessage<void>({ type: 'DELETE_FOLDER', payload: { id } });
        await refresh();
      } catch (err) {
        console.error(err);
        setError('Could not delete your folder. Please try again.');
        throw err;
      }
    },
    [refresh],
  );

  return {
    prompts,
    folders,
    loading,
    error,
    clearError,
    setErrorMessage,
    refresh,
    createPrompt,
    updatePrompt,
    deletePrompt,
    createFolder,
    deleteFolder,
  };
}
