# Setup WordPress Environment

**Task ID:** `setup-wordpress`
**Pattern:** HO-TP-001
**Version:** 2.0
**Last Updated:** 2026-03-25

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Setup WordPress Environment |
| **status** | `pending` |
| **responsible_executor** | wp-developer |
| **execution_type** | `Hybrid` |
| **input** | Hosting credentials, domain info, design direction |
| **output** | Clean WordPress installation on staging |
| **action_items** | 5 steps |
| **acceptance_criteria** | 6 criteria |

## Action Items

### Step 1: Install WordPress
- [ ] Install latest stable WordPress on staging environment
- [ ] Configure database and wp-config.php
- [ ] Set permalink structure to Post Name (/%postname%/)

### Step 2: Configure Theme
- [ ] Install selected theme (Astra Pro, GeneratePress Pro, or similar)
- [ ] Create child theme
- [ ] Apply basic brand settings (logo, favicon)

### Step 3: Install Essential Plugins
- [ ] SEO: Yoast SEO or Rank Math
- [ ] Cache: WP Rocket or LiteSpeed Cache
- [ ] Security: Wordfence
- [ ] Forms: WPForms or Contact Form 7
- [ ] Backup: UpdraftPlus
- [ ] Builder: Elementor Pro (if using Elementor)

### Step 4: Security Baseline
- [ ] Change admin username (not "admin")
- [ ] Strong password set
- [ ] Limit login attempts enabled
- [ ] File editing disabled in wp-config
- [ ] Search engine visibility: discouraged (staging only)

### Step 5: Clean Up
- [ ] Remove default "Hello World" post
- [ ] Remove sample page
- [ ] Remove default plugins (Akismet, Hello Dolly)
- [ ] Set upload max size to 64MB

## Acceptance Criteria

- [ ] **AC-1:** WordPress latest stable installed and accessible
- [ ] **AC-2:** Child theme created and activated
- [ ] **AC-3:** All essential plugins installed and activated
- [ ] **AC-4:** Permalinks set to Post Name
- [ ] **AC-5:** Security baseline configured
- [ ] **AC-6:** Default content removed

---

_Task Version: 2.0_
_Pattern: HO-TP-001_
_Last Updated: 2026-03-25_
