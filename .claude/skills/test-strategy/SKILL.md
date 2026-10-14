---
name: test-strategy
description: Use when planning implementation tasks or building the verification suite — defining per-task verification commands, and the mandatory unit/integration/edge-case/security/static-analysis/output-validation/regression checks the pipeline must actually run and report honestly.
---

# Test Strategy

## When to Use

Stage 4 (`impl-planner`, to define each task's verification command) and Stage 7 (`verifier`,
to run the full suite). Also referenced by `implementer` when writing tests alongside code.

## Mandatory Suite Coverage

- **Unit tests**: every module in `src/core` and `src/integrations` with logic beyond trivial
  pass-through.
- **Integration tests**: cross-component flows, especially the full documentation-sync
  pipeline (template + source → populated output).
- **Documentation-sync edge cases** (use/create fixtures under `tests/fixtures/`):
  - Successful synchronization (happy path)
  - Missing source files
  - Empty repository
  - Inaccessible integration (simulated API/auth failure)
  - Missing fields in source (must resolve to "Not Found")
  - Fields out of scope for the source (must resolve to "Not Specified")
  - Malformed template
  - General API/error failures (timeouts, non-2xx responses)
- **Security/dependency checks**: `npm audit` (or equivalent) — report actual output.
- **Static analysis**: lint, format check, typecheck — report actual output.
- **Output-document validation**: required sections present, original template field order
  preserved, every field either populated with evidence, "Not Found", or "Not Specified" —
  never silently blank or invented.
- **Regression tests**: for every defect found and fixed in Code Review, add a test that would
  have caught it.

## Per-Task Verification Commands (impl-plan.md)

Every task must specify an exact command (e.g. `npx vitest run tests/unit/field-resolver.test.ts`)
that the implementer runs and pastes real output from — not a description of what should be
tested.

## Honesty Rule

Never report a check as passed without having run it in this session. A check that can't run
(tool missing, integration unavailable) goes under "Known Limitations" with the reason, not
under "Passed."
