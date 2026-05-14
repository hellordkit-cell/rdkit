# RDKit Agentic Diagnostic Design

## Goal

Build an AI-assisted R&DTI diagnostic and discovery tool that extends the calculator without making the AI responsible for tax maths or final eligibility decisions.

## Product Shape

The first version is a hybrid tool:

1. A deterministic rules engine calculates the estimate, cash timing, carried-forward offset, RDKit fee, and after-fee position.
2. A diagnostic layer asks for project uncertainty, experiments, and available evidence.
3. A server-side OpenAI Responses API call improves the discovery output when `OPENAI_API_KEY` is configured.
4. A deterministic fallback returns useful risk flags and evidence prompts when no API key is present.

The feature is not a lodged claim, tax advice, or eligibility guarantee. It is a discovery and triage surface that helps RDKit decide what to ask for next.

## Scope

In scope:

- New `/diagnostic` page.
- New `/api/diagnostic` endpoint.
- Shared diagnostic calculation and scoring module.
- Tests for the most important money and risk behavior.
- CTA from the existing calculator to the diagnostic page.

Out of scope for the first version:

- User accounts.
- File uploads.
- Persistent storage.
- CRM integrations.
- Fully autonomous web browsing or lodgement preparation.
- Accountant dashboard.

## Architecture

The browser sends diagnostic form data to `/api/diagnostic`. The API route computes deterministic estimates first, then optionally sends a compact prompt and the deterministic result to OpenAI. The model is asked to return structured JSON with follow-up questions, evidence gaps, risk flags, and a short user-facing summary. If the model is unavailable, the deterministic fallback is returned.

The calculator logic remains separate from the UI so it can be tested and reused by the calculator page later.

## Guardrails

- Do not call AI output "tax advice".
- Do not show non-refundable loss-company offsets as cash kept now.
- Keep current cash, future/carry-forward offset, and after-fee estimate separate.
- Use conservative wording for eligibility: "signals", "risks", "review needed".
- Do not require an OpenAI API key for the page to function locally.

## Success Criteria

- A visitor can complete a guided diagnostic in one page.
- The result distinguishes cash refund, tax offset, carried-forward offset, fee, and after-fee amount.
- The result includes confidence, risk flags, follow-up questions, and evidence gaps.
- Tests pass for small-company loss and large-company loss cases.
- The app builds without an OpenAI API key.
