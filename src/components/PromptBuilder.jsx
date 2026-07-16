import { useMemo } from 'react';
import {
  UserCog, ListChecks, BookOpen, ShieldAlert, Lightbulb,
  LayoutTemplate, Mic2, Target, Ban, Trash2, CheckCircle2
} from 'lucide-react';
import { categories } from '../data/promptTemplates';
import { getTextStats } from '../utils/promptGenerator';
import './PromptBuilder.css';

const FIELD_CONFIG = [
  { key: 'role', label: 'Role', icon: UserCog, placeholder: 'e.g. You are an expert React developer...', hint: 'Who should the AI act as?' },
  { key: 'task', label: 'Task', icon: ListChecks, placeholder: 'e.g. Build a responsive pricing page...', hint: 'The main goal to accomplish' },
  { key: 'context', label: 'Context', icon: BookOpen, placeholder: 'e.g. This is for a SaaS product targeting...', hint: 'Background information the AI needs' },
  { key: 'constraints', label: 'Constraints', icon: ShieldAlert, placeholder: 'e.g. Max 300 words, use only Tailwind CSS...', hint: 'Rules, limits, or boundaries' },
  { key: 'examples', label: 'Examples', icon: Lightbulb, placeholder: 'e.g. Input: X -> Output: Y', hint: 'Sample input/output to guide the AI' },
  { key: 'outputFormat', label: 'Output Format', icon: LayoutTemplate, placeholder: 'e.g. Return as a numbered list...', hint: 'How should the result be structured?' },
  { key: 'tone', label: 'Tone', icon: Mic2, placeholder: 'e.g. Professional, friendly, technical...', hint: 'The voice and style of the response' },
  { key: 'successCriteria', label: 'Success Criteria', icon: Target, placeholder: 'e.g. The output should be immediately usable...', hint: 'What does a great result look like?' },
  { key: 'negativeInstructions', label: 'Negative Instructions', icon: Ban, placeholder: "e.g. Don't use jargon, don't add extra commentary...", hint: 'What the AI should avoid doing' },
];

export default function PromptBuilder({ fields, category, setCategory, onFieldChange, onClear }) {
  const filledCount = useMemo(
    () => FIELD_CONFIG.filter((f) => fields[f.key]?.trim().length > 0).length,
    [fields]
  );
  const progress = Math.round((filledCount / FIELD_CONFIG.length) * 100);

  return (
    <div className="builder-card card">
      <div className="builder-header">
        <div>
          <h2>Prompt Builder</h2>
          <p className="builder-subtitle">Fill in the fields below to craft your prompt</p>
        </div>
        <button className="btn btn-ghost" onClick={onClear} title="Clear all fields">
          <Trash2 size={16} />
          Clear All
        </button>
      </div>

      <div className="category-row">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-chip ${category === cat.id ? 'active' : ''}`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-label">
        {filledCount === FIELD_CONFIG.length ? (
          <span className="progress-complete"><CheckCircle2 size={14} /> All fields complete</span>
        ) : (
          <span>{filledCount} of {FIELD_CONFIG.length} fields filled</span>
        )}
      </div>

      <div className="fields-list">
        {FIELD_CONFIG.map((field) => {
          const Icon = field.icon;
          const value = fields[field.key] || '';
          const stats = getTextStats(value);
          return (
            <div className="field-group" key={field.key}>
              <label className="field-label">
                <Icon size={15} />
                {field.label}
              </label>
              <p className="field-hint">{field.hint}</p>
              <textarea
                className="field-input"
                placeholder={field.placeholder}
                value={value}
                onChange={(e) => onFieldChange(field.key, e.target.value)}
                rows={3}
              />
              <div className="field-stats">
                {stats.words} words · {stats.characters} characters
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}