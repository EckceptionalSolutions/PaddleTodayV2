import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { validateTaskBoard, normalizeTerminalLanes } from '../src/lib/operations-task-board';

const file = 'docs/operations/tasks.json';
const args = process.argv.slice(2);
if (args.some(arg => arg !== '--normalize-terminal-lanes')) throw new Error('Only --normalize-terminal-lanes is supported.');
const original = await readFile(file, 'utf8');
const board = JSON.parse(original);
if (args.includes('--normalize-terminal-lanes')) {
  if (!Array.isArray(board.tasks)) throw new Error('Task board must contain a tasks array.');
  const result = normalizeTerminalLanes(board.tasks);
  if (result.changes.length) {
    await mkdir('.local/task-board', { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    await copyFile(file, `.local/task-board/before-${stamp}.json`);
    if (await readFile(file, 'utf8') !== original) throw new Error('Task board changed during normalization. Retry against the latest file.');
    await writeFile(file, `${JSON.stringify({ ...board, tasks: result.tasks }, null, 2)}\n`);
    console.log(JSON.stringify({ normalized: result.changes }, null, 2));
  }
}
const result = validateTaskBoard(JSON.parse(await readFile(file, 'utf8')));
console.log(JSON.stringify(result, null, 2));
if (result.errors.length) process.exitCode = 1;
