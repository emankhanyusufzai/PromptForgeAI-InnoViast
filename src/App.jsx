import { useState, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import PromptBuilder from './components/PromptBuilder';
import PreviewPanel from './components/PreviewPanel';
import TemplatesLibrary from './components/TemplatesLibrary';
import SavedPrompts from './components/SavedPrompts';
import HistoryPanel from './components/HistoryPanel';
import StatsDashboard from './components/StatsDashboard';
import { useSavedPrompts, usePromptHistory, useTheme } from './hooks/useLocalStorage';
import { emptyFields, generatePrompt } from './utils/promptGenerator';
import './App.css';

export default function App() {
  const [view, setView] = useState('builder');
  const [fields, setFields] = useState(emptyFields);
  const [category, setCategory] = useState('coding');
  const [activePromptId, setActivePromptId] = useState(null);

  const { theme, toggleTheme } = useTheme();
  const { prompts, savePrompt, updatePrompt, deletePrompt, toggleFavorite, clearAll } = useSavedPrompts();
  const { history, addToHistory, clearHistory } = usePromptHistory();

  const handleFieldChange = useCallback((key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleLoadTemplate = useCallback((template) => {
    setFields(template.fields);
    setCategory(template.category);
    setActivePromptId(null);
    setView('builder');
    toast.success(`Loaded "${template.title}"`);
  }, []);

  const handleLoadSaved = useCallback((prompt) => {
    setFields(prompt.fields);
    setCategory(prompt.category);
    setActivePromptId(prompt.id);
    setView('builder');
    toast.success(`Editing "${prompt.title}"`);
  }, []);

  const handleClearForm = useCallback(() => {
    setFields(emptyFields);
    setActivePromptId(null);
    toast('Form cleared', { icon: '🧹' });
  }, []);

  const handleSave = useCallback((title) => {
    const generated = generatePrompt(fields);
    if (!generated.trim()) {
      toast.error('Fill in at least one field first');
      return;
    }
    if (activePromptId) {
      updatePrompt(activePromptId, { title, category, fields, generatedPrompt: generated });
      toast.success('Prompt updated');
    } else {
      const saved = savePrompt({ title, category, fields, generatedPrompt: generated });
      setActivePromptId(saved.id);
      toast.success('Prompt saved');
    }
    addToHistory({ title, category, generatedPrompt: generated });
  }, [fields, category, activePromptId, savePrompt, updatePrompt, addToHistory]);

  return (
    <div className="app-shell">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
          },
        }}
      />
      <Sidebar
        view={view}
        setView={setView}
        theme={theme}
        toggleTheme={toggleTheme}
        savedCount={prompts.length}
        historyCount={history.length}
      />
      <main className="app-main">
        {view === 'builder' && (
          <div className="builder-layout">
            <PromptBuilder
              fields={fields}
              category={category}
              setCategory={setCategory}
              onFieldChange={handleFieldChange}
              onClear={handleClearForm}
            />
            <PreviewPanel
              fields={fields}
              category={category}
              onSave={handleSave}
              isEditing={!!activePromptId}
            />
          </div>
        )}
        {view === 'templates' && (
          <TemplatesLibrary onSelect={handleLoadTemplate} />
        )}
        {view === 'saved' && (
          <SavedPrompts
            prompts={prompts}
            onLoad={handleLoadSaved}
            onDelete={deletePrompt}
            onToggleFavorite={toggleFavorite}
            onClearAll={clearAll}
          />
        )}
        {view === 'favorites' && (
          <SavedPrompts
            prompts={prompts.filter((p) => p.favorite)}
            onLoad={handleLoadSaved}
            onDelete={deletePrompt}
            onToggleFavorite={toggleFavorite}
            title="Favorites"
          />
        )}
        {view === 'history' && (
          <HistoryPanel history={history} onClear={clearHistory} />
        )}
        {view === 'stats' && (
          <StatsDashboard prompts={prompts} history={history} />
        )}
      </main>
    </div>
  );
}