# Configure Security

**Task ID:** `configure-security`
**Pattern:** HO-TP-001
**Version:** 2.0
**Last Updated:** 2026-03-25

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Configure Security |
| **status** | `pending` |
| **responsible_executor** | wp-developer |
| **execution_type** | `Hybrid` |
| **input** | Built WordPress site |
| **output** | Hardened WordPress installation |
| **action_items** | 5 steps |
| **acceptance_criteria** | 5 criteria |

## Action Items

### Step 1: Wordfence Configuration
- [ ] Enable Web Application Firewall (WAF)
- [ ] Configure brute force protection
- [ ] Enable malware scanning
- [ ] Set scan schedule (daily)

### Step 2: WordPress Hardening
- [ ] Disable file editing (DISALLOW_FILE_EDIT in wp-config.php)
- [ ] Change database table prefix (if new install)
- [ ] Disable XML-RPC (if not needed)
- [ ] Remove WordPress version from header
- [ ] Disable directory listing

### Step 3: User Security
- [ ] No "admin" username
- [ ] Strong passwords enforced
- [ ] Limit login attempts (3 max, 15min lockout)
- [ ] Two-factor authentication (recommended)

### Step 4: Backup Configuration
- [ ] UpdraftPlus daily backups enabled
- [ ] Remote storage configured (Google Drive, Dropbox, or S3)
- [ ] Backup retention: 14 days
- [ ] Test backup restore procedure

### Step 5: SSL Verification
- [ ] SSL certificate active
- [ ] HTTP to HTTPS redirect configured
- [ ] Mixed content resolved (no HTTP resources on HTTPS pages)

## Acceptance Criteria

- [ ] **AC-1:** Wordfence firewall active
- [ ] **AC-2:** File editing disabled
- [ ] **AC-3:** Login protection configured
- [ ] **AC-4:** Daily backups active with remote storage
- [ ] **AC-5:** SSL configured with no mixed content

---

_Task Version: 2.0_
_Pattern: HO-TP-001_
_Last Updated: 2026-03-25_
