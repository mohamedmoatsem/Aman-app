---
name: pnpm root runner
description: Root Turbo test and typecheck commands depend on pnpm's canonical package-manager field and the installed version.
---

Root `pnpm test` and `pnpm typecheck` require the correctly cased `packageManager` field so Turbo can resolve the workspace. In Replit, set it to a pnpm version already available; a mismatch can trigger a self-bootstrap download and abort before scripts run.

**Why:** Turbo resolves the package manager from canonical metadata, while the launcher may try to bootstrap a different declared version.

**How to apply:** Check `pnpm --version` before setting the root field, then verify both root tests and typecheck.
