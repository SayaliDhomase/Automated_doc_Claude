---
name: architecture-design
description: Use when recommending an architecture and tech stack from approved requirements — defining components, interfaces, data flow, external integrations, error-handling strategy, security boundaries, and configuration, with Mermaid diagrams, and flagging unresolved technical decisions for human approval.
---

# Architecture Design

## When to Use

Stage 2 of the pipeline, invoked by `architect` or `/architecture`. Any time
`architecture.md` needs to be produced or revised from approved `requirements.md`.

## Checklist

- [ ] Tech stack choice is justified by actual requirements, with alternatives considered and
      rejection reasons stated — not a default template choice.
- [ ] Every component has a single, clearly stated responsibility.
- [ ] Every component-to-component interface is named (what it exposes, what it depends on).
- [ ] End-to-end data flow is described, not just component boxes.
- [ ] Every external integration states its MCP-backed path and its local/manual fallback.
- [ ] Error-handling strategy stated per boundary: what happens on failure, partial failure,
      timeout, malformed input.
- [ ] Security boundaries identified: trust zones, where untrusted input is validated, where
      secrets live and how they're kept out of logs/output.
- [ ] Configuration strategy stated: env vars, required vs. optional, safe defaults.
- [ ] At least one Mermaid component/architecture diagram, reflecting actual named components.
- [ ] At least one data-flow diagram (sequence or flowchart) for the primary use case.
- [ ] Unresolved decisions listed explicitly under their own heading — not silently chosen.

## Diagram Conventions

Use Mermaid `flowchart` or `graph` for component architecture, `sequenceDiagram` for data
flow through a request/document lifecycle. Label every edge with what crosses it (data,
call, event) — unlabeled arrows are not acceptable.

## Template

See `templates/architecture-template.md`. Preserve section order.
