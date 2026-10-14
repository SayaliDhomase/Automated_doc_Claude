#!/usr/bin/env node
/**
 * PostToolUse hook for Write|Edit on source files.
 * Best-effort runs Prettier on the written file. Never blocks the agent —
 * if Prettier/node_modules aren't installed yet, it silently no-ops.
 */
import { spawnSync } from 'node:child_process';

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => (data += chunk));
    process.stdin.on('end', () => resolve(data));
    if (process.stdin.isTTY) resolve('');
  });
}

async function main() {
  const raw = await readStdin();
  if (!raw) process.exit(0);

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const filePath = payload?.tool_input?.file_path;
  if (!filePath || !/\.(ts|tsx|js|jsx|json|md)$/.test(filePath)) process.exit(0);

  try {
    const result = spawnSync('npx', ['--no-install', 'prettier', '--write', filePath], {
      stdio: 'ignore',
      shell: true,
    });
    // Non-zero (e.g. prettier not installed yet) is fine — this hook is best-effort only.
    void result;
  } catch {
    // Formatting is a convenience, never a blocker.
  }

  process.exit(0);
}

main();
