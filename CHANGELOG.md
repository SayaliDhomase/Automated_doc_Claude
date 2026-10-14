# Changelog

All notable changes to this project are documented here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Initial Agentic SDLC pipeline scaffolding: `CLAUDE.md`, nine `.claude/agents/*` subagents
  (orchestrator + eight stage specialists), eight `.claude/commands/*` slash commands, six
  `.claude/skills/*/SKILL.md` skills with templates, three `.claude/hooks/*` scripts
  (secret scanning, format-on-write, verification gate) wired via `.claude/settings.json`,
  and documented (unconfigured) MCP integration points for Jira, Confluence, and GitHub under
  `mcp/`.
- Project tooling: TypeScript, ESLint, Prettier, Vitest configuration.
