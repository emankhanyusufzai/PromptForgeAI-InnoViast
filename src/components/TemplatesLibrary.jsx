import { useState, useMemo } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { promptTemplates, categories } from '../data/promptTemplates';
import './TemplatesLibrary.css';

export default function TemplatesLibrary({ onSelect }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    return promptTemplates.filter((tpl) => {
      const matchesCategory = activeCategory === 'all' || tpl.category === activeCategory;
      const matchesSearch = tpl.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div>
      <div className="page-header">
        <h1>Templates Library</h1>
        <p>Start from a ready-made prompt and customize it to your needs</p>
      </div>

      <div className="templates-toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            placeholder="Search templates..."
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

      <div className="templates-grid">
        {filtered.length === 0 && (
          <div className="empty-state">No templates match your search.</div>
        )}
        {filtered.map((tpl) => (
          <div className="template-card card" key={tpl.id}>
            <div className="template-category">
              {categories.find((c) => c.id === tpl.category)?.label}
            </div>
            <h3 className="template-title">{tpl.title}</h3>
            <p className="template-preview">{tpl.fields.task}</p>
            <button className="btn btn-primary template-use-btn" onClick={() => onSelect(tpl)}>
              Use Template
              <ArrowRight size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}