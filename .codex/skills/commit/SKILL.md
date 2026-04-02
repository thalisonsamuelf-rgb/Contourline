---
name: commit
description: |
  Automated commit workflow via DevOps agent. Groups changes by scope
  (one scope = one logical commit), picks dominant category, and only
  splits when size guardrails are exceeded. No quality gates.

  Strategy defined in: .aiox-core/development/tasks/github-devops-commit-strategy.md

  Use when: User wants clean, logical commits. Supports both path filters
  in current repo AND nested git repositories (outputs, app/lendaria).

  Examples: /commit, /commit outputs, /commit docs, /commit --no-push
---

# Commit Workflow

Automated commit pipeline via DevOps agent (@devops / Gage).

**Strategy source of truth:** `.aiox-core/development/tasks/github-devops-commit-strategy.md`

## Usage

```bash
# Current repo (mmos)
/commit                    # Commit everything in mmos
/commit docs               # Only docs/ directory (filter)
/commit squads             # Only squads/ directory (filter)
/commit .claude            # Only .claude/ directory (filter)

# Nested repos (separate git repositories)
/commit outputs            # Commit in outputs-lendarios repo
/commit app                # Commit in lendaria/Vercel repo (production)
/commit lendaria           # Same as app (alias)
/commit staging            # Commit in lendaria repo (staging branch)

# Flags
/commit --no-push          # Commit but don't push
/commit --split-only       # Commit only (same as --no-push, explicit intent)
/commit --push             # Force push step after split (use with --split-only if needed)
/commit --dry-run          # Preview what would be committed
/commit outputs --no-push  # Combine repo with flag
```

## Repository Detection

The skill detects if the argument is a **nested repo** or a **path filter**:

| Argument | Type | Action |
|----------|------|--------|
| `outputs` | Nested repo | cd outputs/ → commit → push to outputs-lendarios |
| `app` | Nested repo | cd app/ → commit → push to lendaria (main) |
| `lendaria` | Alias | Same as `app` |
| `staging` | Nested repo | cd app/ → commit → push to lendaria (staging branch) |
| `docs` | Path filter | git status -- docs/ → commit in mmos |
| `squads` | Path filter | git status -- squads/ → commit in mmos |
| `.claude` | Path filter | git status -- .claude/ → commit in mmos |

**Detection logic:**
```yaml
# From .aiox-core/development/config/repos.yaml
nested_repos:
  - outputs    # → outputs-lendarios.git
  - app        # → lendaria.git
  - lendaria   # alias for app
  - staging    # alias for app (staging branch)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `<target>` | string | Repo name (outputs, app) OR path filter (docs, squads) |
| `--no-push` | flag | Commit only, skip push to remote |
| `--split-only` | flag | Alias of `--no-push` for explicit split-then-review flow |
| `--push` | flag | Explicitly execute push after split |
| `--dry-run` | flag | Preview changes without committing |
| `--single` | flag | Single commit instead of split by scope |

## Execution

### For nested repos (outputs, app)

```yaml
Tool: Task
Parameters:
  subagent_type: "aiox-devops"
  prompt: |
    Execute commit workflow for NESTED REPO: {repo_name}

    ## IMPORTANT: Read strategy first
    Read .aiox-core/development/tasks/github-devops-commit-strategy.md and follow it exactly.

    ## Repository Config (from repos.yaml)
    - Path: {path}
    - Remote: {url}
    - Branch: {branch}
    - Force push: {force_push}

    ## Steps
    1. cd {path}
    2. git status --porcelain
    3. If no changes: report "Nothing to commit" and STOP
    4. Follow the Algorithm from github-devops-commit-strategy.md
    5. Push ONLY when user requested push (no --no-push / --split-only)
    6. If push rejected: stop and report, do NOT auto-merge
    7. Report summary table

    ## CRITICAL: DO NOT run any of these:
    - NO npm run lint/typecheck/test/build/audit
    - NO npx secretlint, CodeRabbit, security scans
    - DO NOT read or follow .aiox-core/development/tasks/github-devops-pre-push-quality-gate.md
  mode: "bypassPermissions"
```

### For path filters (docs, squads, .claude)

```yaml
Tool: Task
Parameters:
  subagent_type: "aiox-devops"
  prompt: |
    Execute commit workflow with PATH FILTER: {path}/

    ## IMPORTANT: Read strategy first
    Read .aiox-core/development/tasks/github-devops-commit-strategy.md and follow it exactly.

    ## Steps
    1. git status --porcelain -- {path}/
    2. If no changes: report "Nothing to commit in {path}/" and STOP
    3. Follow the Algorithm from github-devops-commit-strategy.md (restricted to {path}/)
    4. Push ONLY when user requested push (no --no-push / --split-only)
    5. If push rejected: stop and report, do NOT auto-merge
    6. Report summary table

    ## CRITICAL: DO NOT run any of these:
    - NO npm run lint/typecheck/test/build/audit
    - NO npx secretlint, CodeRabbit, security scans
    - DO NOT read or follow .aiox-core/development/tasks/github-devops-pre-push-quality-gate.md
  mode: "bypassPermissions"
```

### For full repo (no argument)

```yaml
Tool: Task
Parameters:
  subagent_type: "aiox-devops"
  prompt: |
    Execute commit workflow for FULL REPO (mmos)

    ## IMPORTANT: Read strategy first
    Read .aiox-core/development/tasks/github-devops-commit-strategy.md and follow it exactly.

    ## Steps
    1. git status --porcelain
    2. If no changes: report "Nothing to commit" and STOP
    3. Follow the Algorithm from github-devops-commit-strategy.md
    4. Push ONLY when user requested push (no --no-push / --split-only)
    5. If push rejected: stop and report, do NOT auto-merge
    6. Report summary table

    ## CRITICAL: DO NOT run any of these:
    - NO npm run lint/typecheck/test/build/audit
    - NO npx secretlint, CodeRabbit, security scans
    - DO NOT read or follow .aiox-core/development/tasks/github-devops-pre-push-quality-gate.md
  mode: "bypassPermissions"
```

## Examples

### Commit outputs repository
```
/commit outputs
```
Enters `outputs/` directory, commits changes, pushes to `outputs-lendarios.git`.

### Commit app/Vercel repository
```
/commit app
```
Enters `app/` directory, commits changes, force-pushes to `lendaria.git`.

### Filter docs in main repo
```
/commit docs
```
Commits only files in `docs/` directory of the main mmos repo.

### Preview nested repo changes
```
/commit outputs --dry-run
```
Shows what would be committed in outputs without making changes.

### Split first, push later (recommended)
```
/commit --split-only
```
Creates scoped commits and lets you review before pushing.

## Nested Repos Config

From `.aiox-core/development/config/repos.yaml`:

| Name | Path | Remote | Branch | Notes |
|------|------|--------|--------|-------|
| `mmos` | /Users/alan/Code/mmos | oalanicolas/mmos | main | Main repo |
| `outputs` | .../mmos/outputs | oalanicolas/outputs-lendarios | main | Artifacts (1.4GB+) |
| `app` / `lendaria` | .../mmos/app | oalanicolas/lendarIA | main | Vercel production |
| `staging` | .../mmos/app | oalanicolas/lendarIA | staging | Vercel preview |

## Related Commands

- `@devops` → `*push outputs` - Push only (no commit)
- `@devops` → `*repos` - List all configured repos
- `@devops` → `*pre-push` - Quality gates only (separate, opt-in)

---

*Commit Skill v3.0 - Thin wrapper over .aiox-core/development/tasks/github-devops-commit-strategy.md*
