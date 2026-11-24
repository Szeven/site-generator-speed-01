// Driver: answers every case in /input/cases.json with solve.js and writes the
// answers to /output/answers.json. Reads its paths from MAKEFUN_INPUT_DIR and
// MAKEFUN_OUTPUT_DIR when they are set, otherwise /input and /output.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setFlagsFromString } from 'node:v8';

setFlagsFromString('--no-incremental-marking');

const solver = await import(new URL('./solve.js', import.meta.url).href);
const inDir = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const loaded = JSON.parse(readFileSync(join(inDir, 'cases.json'), 'utf8'));
const out = loaded.map((entry) => solver.run(entry.input));
writeFileSync(join(outDir, 'answers.json'), JSON.stringify(out));
