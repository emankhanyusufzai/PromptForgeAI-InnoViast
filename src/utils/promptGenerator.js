// Generates a structured, professional prompt from user input fields
export function generatePrompt(fields) {
  const {
    role,
    task,
    context,
    constraints,
    examples,
    outputFormat,
    tone,
    successCriteria,
    negativeInstructions,
  } = fields;

  let sections = [];

  if (role?.trim()) {
    sections.push(`## Role\n${role.trim()}`);
  }
  if (task?.trim()) {
    sections.push(`## Task\n${task.trim()}`);
  }
  if (context?.trim()) {
    sections.push(`## Context\n${context.trim()}`);
  }
  if (constraints?.trim()) {
    sections.push(`## Constraints\n${constraints.trim()}`);
  }
  if (examples?.trim()) {
    sections.push(`## Examples\n${examples.trim()}`);
  }
  if (outputFormat?.trim()) {
    sections.push(`## Output Format\n${outputFormat.trim()}`);
  }
  if (tone?.trim()) {
    sections.push(`## Tone\n${tone.trim()}`);
  }
  if (successCriteria?.trim()) {
    sections.push(`## Success Criteria\n${successCriteria.trim()}`);
  }
  if (negativeInstructions?.trim()) {
    sections.push(`## Do NOT\n${negativeInstructions.trim()}`);
  }

  return sections.join('\n\n');
}

// Calculates a simple prompt quality score (0-100) based on filled fields
export function calculateQualityScore(fields) {
  const weights = {
    role: 15,
    task: 20,
    context: 10,
    constraints: 10,
    examples: 15,
    outputFormat: 10,
    tone: 5,
    successCriteria: 10,
    negativeInstructions: 5,
  };

  let score = 0;
  for (const key in weights) {
    const value = fields[key];
    if (value && value.trim().length > 10) {
      score += weights[key];
    } else if (value && value.trim().length > 0) {
      score += weights[key] * 0.5;
    }
  }

  return Math.round(score);
}

// Returns word and character count for a given text
export function getTextStats(text) {
  const trimmed = text?.trim() || '';
  const words = trimmed.length > 0 ? trimmed.split(/\s+/).length : 0;
  const characters = trimmed.length;
  return { words, characters };
}

// Empty field template used to reset the form
export const emptyFields = {
  role: '',
  task: '',
  context: '',
  constraints: '',
  examples: '',
  outputFormat: '',
  tone: '',
  successCriteria: '',
  negativeInstructions: '',
};