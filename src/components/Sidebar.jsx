import { LayoutGrid, LibraryBig, Bookmark, Star, History, BarChart3, Moon, Sun, Sparkles } from 'lucide-react';
import './Sidebar.css';

const NAV_ITEMS = [
  { id: 'builder', label: 'Builder', icon: LayoutGrid },
  { id: 'templates', label: 'Templates', icon: LibraryBig },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'favorites', label: 'Favorites', icon: Star },
  { id: 'history', label: 'History', icon: History },
  { id: 'stats', label: 'Statistics', icon: BarChart3 },
];

export default function Sidebar({ view, setView, theme, toggleTheme, savedCount, historyCount }) {
  const counts = { saved: savedCount, history: historyCount };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <Sparkles size={20} />
        </div>
        <div>
          <div className="sidebar-brand-name">PromptForge</div>
          <div className="sidebar-brand-tag">AI Prompt Studio</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = view === item.id;
          const count = counts[item.id];
          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${active ? 'active' : ''}`}
              onClick={() => setView(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {typeof count === 'number' && count > 0 && (
                <span className="sidebar-badge">{count}</span>
              )}
            </button>
          );
        })}
      </nav>

      <button className="sidebar-theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </aside>
  );
}