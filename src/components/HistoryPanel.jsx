import { Trash } from 'lucide-react';
import './HistoryPanel.css';

export default function HistoryPanel({ history, onClear }) {
  return (
    <div>
      <div className="page-header saved-header">
        <div>
          <h1>Prompt History</h1>
          <p>A running log of every prompt you've generated</p>
        </div>
        {history.length > 0 && (
          <button className="btn btn-ghost" onClick={onClear}>
            <Trash size={16} />
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="empty-state">No history yet. Save a prompt to see it here.</div>
      ) : (
        <div className="history-list">
          {history.map((entry) => (
            <div className="history-item card" key={entry.id}>
              <div className="history-dot" />
              <div className="history-content">
                <div className="history-title">{entry.title}</div>
                <div className="history-time">
                  {new Date(entry.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}