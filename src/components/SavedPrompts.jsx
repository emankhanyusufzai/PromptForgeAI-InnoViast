import { useState, useMemo } from 'react';
import { Search, Star, Trash2, Pencil, Trash } from 'lucide-react';
import { categories } from '../data/promptTemplates';
import './SavedPrompts.css';

export default function SavedPrompts({ prompts, onLoad, onDelete, onToggleFavorite, onClearAll, title = 'Saved Prompts' }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [prompts, search, activeCategory]);

  return (
    <div>
      <div className="page-header saved-header">
        <div>
          <h1>{title}</h1>
          <p>{prompts.length} prompt{prompts.length !== 1 ? 's' : ''} stored</p>
        </div>
        {onClearAll && prompts.length > 0 && (
          <button className="btn btn-ghost" onClick={onClearAll}>
            <Trash size={16} />
            Clear All
          </button>
        )}
      </div>

      <div className="templates-toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            placeholder="Search saved prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="category-row">
          <button
            className={`category-chip ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">No prompts found. Create one from the Builder tab.</div>
      ) : (
        <div className="saved-list">
          {filtered.map((p) => (
            <div className="saved-card card" key={p.id}>
              <div className="saved-card-main">
                <div className="saved-card-top">
                  <span className="template-category">
                    {categories.find((c) => c.id === p.category)?.label}
                  </span>
                  <button
                    className={`favorite-btn ${p.favorite ? 'active' : ''}`}
                    onClick={() => onToggleFavorite(p.id)}
                  >
                    <Star size={16} fill={p.favorite ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <h3 className="saved-title">{p.title}</h3>
                <p className="saved-preview">{p.generatedPrompt?.slice(0, 140)}...</p>
                <div className="saved-date">
                  Updated {new Date(p.updatedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="saved-actions">
                <button className="btn btn-secondary" onClick={() => onLoad(p)}>
                  <Pencil size={14} />
                  Edit
                </button>
                <button className="btn btn-ghost saved-delete" onClick={() => onDelete(p.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}