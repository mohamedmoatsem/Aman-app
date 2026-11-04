---
name: pnpm root runner
description: Root Turbo test and typecheck commands depend on pnpm's canonical package-manager field and the installed version.
---

Root `pnpm test` requires the correctly cased `packageManager` field so Turbo can resolve the workspace. In Replit, keep the pinned version aligned with the pnpm binary already available; a mismatch triggers an attempted self-bootstrap and may abort.

**Why:** The root test command is only useful if the package manager launcher and Turbo agree on workspace metadata and version; a mismatched version can trigger a failed toolchain download.

**How to apply:** Check the installed pnpm version before setting `packageManager`. Verify root tests and typecheck after changing the pin.
