import { useMemo } from 'react';
import { FileText, Star, History as HistoryIcon, TrendingUp } from 'lucide-react';
import { categories } from '../data/promptTemplates';
import { calculateQualityScore } from '../utils/promptGenerator';
import './StatsDashboard.css';

export default function StatsDashboard({ prompts, history }) {
  const avgQuality = useMemo(() => {
    if (prompts.length === 0) return 0;
    const total = prompts.reduce((sum, p) => sum + calculateQualityScore(p.fields), 0);
    return Math.round(total / prompts.length);
  }, [prompts]);

  const categoryBreakdown = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      count: prompts.filter((p) => p.category === cat.id).length,
    }));
  }, [prompts]);

  const maxCount = Math.max(...categoryBreakdown.map((c) => c.count), 1);

  return (
    <div>
      <div className="page-header">
        <h1>Statistics Dashboard</h1>
        <p>An overview of your prompt engineering activity</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card card">
          <FileText size={20} className="stat-icon" />
          <div className="stat-value">{prompts.length}</div>
          <div className="stat-label">Saved Prompts</div>
        </div>
        <div className="stat-card card">
          <Star size={20} className="stat-icon" />
          <div className="stat-value">{prompts.filter((p) => p.favorite).length}</div>
          <div className="stat-label">Favorites</div>
        </div>
        <div className="stat-card card">
          <HistoryIcon size={20} className="stat-icon" />
          <div className="stat-value">{history.length}</div>
          <div className="stat-label">History Entries</div>
        </div>
        <div className="stat-card card">
          <TrendingUp size={20} className="stat-icon" />
          <div className="stat-value">{avgQuality}</div>
          <div className="stat-label">Avg Quality Score</div>
        </div>
      </div>

      <div className="breakdown-card card">
        <h3 className="breakdown-title">Prompts by Category</h3>
        <div className="breakdown-list">
          {categoryBreakdown.map((cat) => (
            <div className="breakdown-row" key={cat.id}>
              <span className="breakdown-label">{cat.label}</span>
              <div className="breakdown-bar-track">
                <div
                  className="breakdown-bar-fill"
                  style={{ width: `${(cat.count / maxCount) * 100}%` }}
                />
              </div>
              <span className="breakdown-count">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}