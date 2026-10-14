---
name: secure-code-review
description: Use when reviewing architecture (Stage 3 design review) or implementation (Stage 6 code review) for security risks, reliability problems, scalability limitations, unnecessary complexity, missing components, integration risks, and gaps versus requirements — with severity-rated, evidence-backed findings.
---

# Secure Code & Design Review

## When to Use

Stage 3 (`design-reviewer`, reviewing `architecture.md`) and Stage 6 (`code-reviewer`,
reviewing the implementation). Same rigor, different artifact.

## Design Review Checklist (Stage 3 — architecture.md)

- [ ] Security: trust boundaries, secret handling, least privilege, untrusted-input
      validation points.
- [ ] Reliability: single points of failure, missing retry/timeout/error handling.
- [ ] Scalability: realistic for stated requirements — flag over-engineering too.
- [ ] Complexity: components/abstractions not justified by requirements.
- [ ] Missing components: anything requirements.md implies but architecture.md omits.
- [ ] Integration risk: failure modes and fallback behavior for every external dependency.
- [ ] Requirements coverage: every FR/NFR has an architectural home.

## Code Review Checklist (Stage 6 — implementation)

- [ ] **Correctness**: verified against `requirements.md` acceptance criteria with evidence
      (test run or code trace), not assumed.
- [ ] **Security**: no secrets in code/logs/output; inputs validated at trust boundaries; no
      shell/command injection, path traversal, or unsanitized template rendering; least
      privilege respected.
- [ ] **Error handling**: API failures, missing files, empty repos, malformed input,
      incomplete source data all handled — check the actual code path, not just the happy case.
- [ ] **Test coverage**: happy path + "Not Found"/"Not Specified"/missing-field cases exist
      and actually run.
- [ ] **Clarity**: naming, modularity, control flow understandable without extra explanation.
- [ ] **DRY**: real duplication only — don't flag intentionally similar-but-distinct logic.
- [ ] **Dependency safety**: versions current/supported; `npm audit` (or equivalent) run and
      reported.
- [ ] **Architecture compliance**: matches approved `architecture.md`; flag drift.
- [ ] **Documentation quality**: generated docs preserve template structure/order and only
      state evidence-backed facts.

## Finding Format (both stages)

```
Severity: Blocker/Critical | Major/High | Minor/Medium | Note/Low
Location: {{file:line or architecture.md section}}
Evidence: {{quote or reproduction}}
Impact: {{what breaks, and under what condition}}
Recommended action: {{specific fix}}
```

## Hard Rule

Never suppress a `Blocker`/`Critical` finding without a documented, explicit human decision
recorded in the review file. Separate "Accepted Risk" (human chose to proceed) from
"Unresolved Blocker" (must fix before proceeding) at all times.
