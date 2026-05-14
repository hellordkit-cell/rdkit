# RDKit Agentic Diagnostic Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a hybrid R&DTI diagnostic tool that combines deterministic tax estimate logic with an optional OpenAI-assisted discovery summary.

**Architecture:** Put reusable calculation and diagnostic scoring in `lib/rdtiDiagnostic.js`. Add `pages/api/diagnostic.js` as the server-only OpenAI integration boundary. Add `pages/diagnostic.js` as the user-facing guided diagnostic page and link to it from the calculator.

**Tech Stack:** Next.js pages router, React state, Node `fetch`, OpenAI Responses API, `node:test`.

---

### Task 1: Diagnostic Rules Module

**Files:**
- Create: `lib/rdtiDiagnostic.js`
- Test: `tests/diagnostic.test.js`

- [ ] Add deterministic estimate logic for refundable and non-refundable scenarios.
- [ ] Add evidence scoring and conservative risk flags.
- [ ] Verify large-company loss-making cases show current cash as `$0`.

### Task 2: API Route

**Files:**
- Create: `pages/api/diagnostic.js`

- [ ] Accept POST-only JSON requests.
- [ ] Always compute the deterministic diagnostic result.
- [ ] If `OPENAI_API_KEY` is missing, return deterministic fallback mode.
- [ ] If `OPENAI_API_KEY` is present, call the OpenAI Responses API and parse structured JSON.
- [ ] Fall back safely if the API response cannot be parsed.

### Task 3: Diagnostic Page

**Files:**
- Create: `pages/diagnostic.js`

- [ ] Add a guided form for company, spend, tax position, project summary, uncertainty, experiments, and evidence.
- [ ] Submit to `/api/diagnostic`.
- [ ] Render estimate, confidence, risks, evidence gaps, and follow-up questions.
- [ ] Include clear "not tax advice" guardrail copy.

### Task 4: Calculator Entry Point

**Files:**
- Modify: `pages/calculator.js`

- [ ] Add a secondary CTA from the calculator to `/diagnostic`.
- [ ] Keep existing calculator behavior intact.

### Task 5: Verification

**Files:**
- Modify: `package.json` only if a test script is not already present.

- [ ] Run `node --test tests/*.test.js`.
- [ ] Run `npm run build`.
- [ ] Open `/diagnostic` locally and verify the form renders.
