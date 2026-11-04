---
name: pnpm root runner
description: Root Turbo test and typecheck commands depend on pnpm's canonical package-manager field and the installed version.
---

Root `pnpm test` can fail before running tests when `package.json` only has the lowercase `packagemanager` key, because Turbo cannot resolve the workspace package manager. Renaming it to `packageManager` caused this Replit environment to attempt bootstrapping the declared `pnpm@9.1.0`, which aborted. Until the declared and available pnpm versions are aligned, use the package-level Vitest command to run API tests.

**Why:** The root test command is only useful if the package manager launcher and Turbo agree on workspace metadata; changing the metadata alone can trigger a failed toolchain download.

**How to apply:** Before fixing root orchestration, check the installed pnpm version and ensure Replit can run the matching declared version. Verify both root tests and typecheck afterward.
