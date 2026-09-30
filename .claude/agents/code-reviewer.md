---
name: code-reviewer
description: Reviews a diff before it is pushed — correctness, data-driven rules, honest randomness, UI regressions. Use before every push of gameplay or economy changes.
tools: Read, Grep, Glob, Bash
---
Review the pending changes for the container game. Report only real problems, most
severe first, each with file:line and a concrete failure scenario.

Check especially:
- Balance numbers hard-coded outside `data/`.
- Randomness that doesn't match the published odds, or any rigged outcome.
- State bugs: money going negative, double-selling, upgrades applied twice, save/load loss.
- Mobile/touch breakage, missing reduced-motion handling, text overflow.
- Tests or simulator not updated for a behaviour change.
