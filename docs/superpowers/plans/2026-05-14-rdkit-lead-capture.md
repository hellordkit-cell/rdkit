# RDKit Lead Capture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add lightweight lead capture across the homepage, Claim Assistant, diagnostic result, and footer so visitors can share company and email details after seeing value.

**Architecture:** Use one reusable React form component, one validation/delivery helper, and one Next.js API route. The form sends structured source and context data so the same backend can distinguish homepage estimates, calculator estimates, diagnostic results, and footer enquiries.

**Tech Stack:** Next.js pages router, React state, Node `node:test`, optional `LEAD_WEBHOOK_URL` for production delivery.

---

### Task 1: Lead Validation

**Files:**
- Create: `tests/leads.test.js`
- Create: `lib/leads.js`

- [ ] Write a failing Node test for `validateLeadPayload` requiring name, company, and a valid email.
- [ ] Run `node --test tests/leads.test.js` and verify it fails because `lib/leads.js` does not exist.
- [ ] Implement `validateLeadPayload` and `deliverLead` with no database dependency.
- [ ] Re-run `node --test tests/leads.test.js` and verify it passes.

### Task 2: Lead API

**Files:**
- Create: `pages/api/leads.js`

- [ ] Add POST-only API handling.
- [ ] Return `400` for invalid payloads.
- [ ] In development, accept local leads without a webhook.
- [ ] In production, return `503` if no `LEAD_WEBHOOK_URL` is configured.

### Task 3: Reusable Form

**Files:**
- Create: `components/LeadCapture.js`
- Modify: `styles/globals.css`

- [ ] Add a compact lead form with name, company, email, optional phone, and clear success/error states.
- [ ] Add light, dark, and footer visual variants.
- [ ] Keep layout responsive and avoid adding a heavy gated flow before the estimate.

### Task 4: CTA Placement

**Files:**
- Modify: `pages/index.js`
- Modify: `pages/calculator.js`
- Modify: `pages/diagnostic.js`
- Modify: `components/Footer.js`
- Create: `tests/lead-capture-placement.test.js`

- [ ] Place the form in the homepage mini calculator using source `home-mini-calculator`.
- [ ] Place the form in the Claim Assistant snapshot using source `claim-assistant-snapshot`.
- [ ] Place the form after diagnostic results using source `diagnostic-result`.
- [ ] Place a small footer enquiry form using source `site-footer`.
- [ ] Test that those placements exist.

### Task 5: Verification

**Files:**
- All changed files

- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Use the browser to inspect `/`, `/calculator`, and `/diagnostic` on desktop/mobile-sized layouts.
