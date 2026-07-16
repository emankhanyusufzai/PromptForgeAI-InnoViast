const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

export async function generateProfessionalPrompt(fields) {
  if (!API_KEY) {
    throw new Error('Gemini API key missing. Check your .env file.');
  }

  const systemInstruction = `You are an expert Prompt Engineer.

Convert the following user inputs into one professional, reusable AI prompt.

Requirements:
- Write in professional English.
- Improve clarity and fix grammar.
- Expand the task where appropriate, but keep the user's intent unchanged.
- Organize the output using these exact headings (only include a heading if the user gave input for it): ## Role, ## Task, ## Context, ## Constraints, ## Examples, ## Output Format, ## Tone, ## Success Criteria, ## Negative Instructions
- Return ONLY the final structured prompt text. No preamble, no explanation, no markdown code fences.`;

  const userInput = `
Role: ${fields.role || 'Not specified'}
Task: ${fields.task || 'Not specified'}
Context: ${fields.context || 'Not specified'}
Constraints: ${fields.constraints || 'Not specified'}
Examples: ${fields.examples || 'Not specified'}
Output Format: ${fields.outputFormat || 'Not specified'}
Tone: ${fields.tone || 'Not specified'}
Success Criteria: ${fields.successCriteria || 'Not specified'}
Negative Instructions: ${fields.negativeInstructions || 'Not specified'}
`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: userInput }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('Gemini se koi response nahi mila. Dobara try karen.');
  }

  return text.trim();
}