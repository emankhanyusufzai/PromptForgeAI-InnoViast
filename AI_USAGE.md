# AI Usage Documentation

This document explains how AI tools were used during the development of PromptForgeAI-InnoViast, in line with the internship task guidelines.

---

## AI Tools Used

- **Claude (Anthropic)** — Used as a step-by-step development guide throughout the project. Claude helped plan the project architecture, generate the React component structure, write the CSS design system, debug terminal errors (Node.js setup, PowerShell execution policy issues), and guide the GitHub and Vercel deployment process.
- **Google Gemini API** — Integrated directly into the application itself as the AI engine that powers the "Generate AI Prompt" feature. When a user fills in the prompt builder fields, the app sends the structured input to the Gemini API, which returns a refined, polished version of the prompt.

---

## How AI Was Used

### 1. Planning and Architecture
AI was used to break down the internship task requirements into a clear build plan: folder structure, component responsibilities, data flow between the builder form and the live preview, and the LocalStorage data model for saved prompts, favorites, and history.

### 2. Code Generation
AI generated the initial code for:
- The design system (`index.css`) with CSS custom properties for colors, typography, and spacing
- All React components (Sidebar, PromptBuilder, PreviewPanel, TemplatesLibrary, SavedPrompts, HistoryPanel, StatsDashboard)
- Utility functions for prompt generation and quality scoring
- Custom hooks for LocalStorage persistence (saved prompts, history, theme)

### 3. Debugging
AI helped resolve real setup issues encountered during development, including:
- Node.js and npm not being recognized in the terminal
- PowerShell blocking script execution (`Set-ExecutionPolicy`)
- Git and GitHub repository initialization and push errors

### 4. Deployment Guidance
AI provided step-by-step guidance for:
- Initializing a Git repository and pushing to GitHub
- Importing the repository into Vercel
- Configuring the Gemini API key as a secure environment variable
- Verifying the live deployment worked correctly

---

## Prompt Patterns Followed

- **Role-based prompting** — instructing the AI to act as a specific expert (e.g. "senior React developer") before generating code, to keep output consistent and high quality
- **Structured, incremental requests** — building the app file-by-file rather than all at once, to keep each piece reviewable and testable
- **Context-rich follow-ups** — providing screenshots and exact terminal output when debugging, so the AI could give precise, targeted fixes rather than generic advice
- **Iterative refinement** — requesting design and content improvements (e.g. adding a Screenshots section to the README) after reviewing an initial draft

---

## Human Oversight

All AI-generated code was reviewed, tested locally, and verified in the browser before being committed. Environment variables and API keys were manually configured and were never exposed in the codebase or committed to GitHub, in line with the `.gitignore` rules set up early in the project.