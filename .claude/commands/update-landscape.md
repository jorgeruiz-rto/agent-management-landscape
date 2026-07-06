---
description: Refresh the competitive-landscape page from Slack. Harvests intel, proposes source-traced V edits, applies them, fills call-ready field playbooks, and writes PENDING-REVIEW.md. Never commits or pushes.
argument-hint: [#channel ...]  (optional — overrides channels in landscape.config.json)
---

# /update-landscape

Refresh `index.html` competitive-landscape data from Slack. On-demand — run before or between customer calls. **Ends at working-tree edits. Never `git commit`, never `git push`.** Publishing is the user's manual step after reviewing.

Optional args `$ARGUMENTS`: a channel list that overrides `channels` in `landscape.config.json` for this run only.

## Sequence

1. **Harvest** — dispatch the `slack-harvester` subagent. Pass it `$ARGUMENTS` as channel override if present. It returns raw intel bullets, each with a Slack permalink.

2. **Analyze** — dispatch the `intel-analyst` subagent with the harvester bullets. It returns a JSON array of change proposals `{vendorId, field, oldValue, newValue, sourcePermalink, confidence, note}`, plus a dropped-items list.

3. **Show proposals** — print the proposals as a table for the user. Do not silently apply. If any are `confidence: low`, call them out.

4. **Apply** — dispatch the `page-editor` subagent with the proposals. It applies each to the `V` block in `index.html` only, one field per edit, and reports any `oldValue` mismatches it skipped.

5. **Gap-fill** — dispatch the `field-battlecard-writer` subagent. It ensures all 41 vendors carry `winwhen`, `losewhen`, `traps`, `objections`, synthesizing missing ones from existing `V` data, and returns a "thin — verify" list.

6. **Write `PENDING-REVIEW.md`** (repo root, overwrite) — a table the user reads before publishing:

   ```
   # Landscape update — <YYYY-MM-DD HH:MM>

   | Vendor | Field | Old → New | Slack source | Confidence |
   |--------|-------|-----------|--------------|------------|
   ...

   ## Battlecard gap-fill (synthesized)
   | Vendor | Field | Thin? |
   ...

   ## Dropped (not applied)
   - <reason>

   To publish: review the diff, then `git add -A && git commit && git push`.
   ```

7. **Report** — one-paragraph summary: N proposals applied, M skipped, K battlecards gap-filled. Remind the user nothing was pushed and to review `PENDING-REVIEW.md` + `git diff` before shipping.

## Guardrails
- No git write operations anywhere in this command.
- Subagents only touch the `V` block; if page-editor reports an out-of-block attempt, surface it and stop.
- If Slack returns nothing new, still run gap-fill (step 5) and note "no new intel" in the report.
