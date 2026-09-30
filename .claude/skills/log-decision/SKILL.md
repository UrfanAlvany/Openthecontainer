---
name: log-decision
description: Append a decision to DECISIONS.md. Use whenever Urfan makes a call, we choose between real alternatives, change scope, or reverse an earlier decision.
---
# Log a decision

1. Open `DECISIONS.md` and find the highest `D-NNN` number.
2. Append (never edit old entries) a new block:

```markdown
### D-NNN — <short title>
- **Date:** YYYY-MM-DD · **By:** <Urfan | Claude | Codex> · **Status:** <Decided | Working>
- **What:** <the decision in one or two sentences>
- **Why:** <the reason, with evidence: sim result, playtest note, research link>
```

3. If it replaces an earlier entry, add `- **Supersedes:** D-XXX` and do not modify D-XXX
   except to append ` — superseded by D-NNN` to its Status line.
4. "Decided" only when Urfan approved it. Developer calls are "Working".
