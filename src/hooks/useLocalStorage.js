import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'promptforge_saved_prompts';
const HISTORY_KEY = 'promptforge_history';

// Manages saved prompts: create, edit, delete, favorite
export function useSavedPrompts() {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setPrompts(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to load saved prompts', e);
    }
  }, []);

  const persist = useCallback((updated) => {
    setPrompts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save prompts', e);
    }
  }, []);

  const savePrompt = useCallback((promptData) => {
    const newPrompt = {
      id: `prompt-${Date.now()}`,
      title: promptData.title || 'Untitled Prompt',
      category: promptData.category || 'coding',
      fields: promptData.fields,
      generatedPrompt: promptData.generatedPrompt,
      favorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    persist([newPrompt, ...prompts]);
    return newPrompt;
  }, [prompts, persist]);

  const updatePrompt = useCallback((id, updates) => {
    const updated = prompts.map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    persist(updated);
  }, [prompts, persist]);

  const deletePrompt = useCallback((id) => {
    persist(prompts.filter((p) => p.id !== id));
  }, [prompts, persist]);

  const toggleFavorite = useCallback((id) => {
    const updated = prompts.map((p) =>
      p.id === id ? { ...p, favorite: !p.favorite } : p
    );
    persist(updated);
  }, [prompts, persist]);

  const clearAll = useCallback(() => {
    persist([]);
  }, [persist]);

  return { prompts, savePrompt, updatePrompt, deletePrompt, toggleFavorite, clearAll };
}

// Manages a running history of generated prompts (separate from saved ones)
export function usePromptHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to load history', e);
    }
  }, []);

  const addToHistory = useCallback((entry) => {
    setHistory((prev) => {
      const updated = [
        { id: `hist-${Date.now()}`, ...entry, timestamp: new Date().toISOString() },
        ...prev,
      ].slice(0, 50); // keep last 50 entries
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save history', e);
      }
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  return { history, addToHistory, clearHistory };
}

// Simple theme (dark/light) persistence hook
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('promptforge_theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('promptforge_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}