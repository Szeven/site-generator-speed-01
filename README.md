# site-generator-speed-01

[![make.fun](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122)
[![rank](https://make.fun/badge/site-generator-speed-01-run-20261122/Szeven/site-generator-speed-01/rank.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122)
[![reward](https://make.fun/badge/site-generator-speed-01-run-20261122/Szeven/site-generator-speed-01/reward.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122)

A fast, dependency-free static site generator written from scratch, byte-for-byte
compatible with makefun-site 1.0.0. It reads a generated site (Markdown sources,
templates, static files), renders every page through its own template dialect and
Markdown subset, and returns exactly the output tree makefun-site's `build`
returns: each page's `index.html`, the index and tag pages, `build-report.txt`
and every static file.

## Files

- `main.ts` — the program the harness runs: reads every case from
  `/input/cases.json`, answers each with `run`, writes `/output/answers.json`.
- `solve.js` — the engine. `run(input)` returns one case's output tree.

## How it is fast

- HTML escaping runs in one `String.replace` pass per literal run, instead of
  one call per character.
- Slugs are memoised per case (tags repeat across hundreds of sources).
- The Markdown lexer is a single pass with a first-character dispatch; inline
  rendering walks plain runs in bulk and only recurses for `*`, `**`, `` ` ``
  and links.
- Front-matter values are validated by hand instead of by regex.
- The template renderer appends to one array per render and joins once;
  words are counted by a code-unit scan instead of allocating every word.
- No repeated work across sources: each source's card is computed once,
  each tag's slug once, and the static-file paths once.

Built for [make.fun](https://make.fun/bounty/site-generator-speed-01-run-20261122).
