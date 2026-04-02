# Security Hardening Checklist

**Checklist ID:** `security-checklist`
**Phase:** Development
**Agent:** wp-developer

## Authentication
- [ ] No "admin" username
- [ ] Strong passwords (12+ characters, mixed)
- [ ] Login attempts limited (max 3, 15min lockout)
- [ ] Two-factor authentication enabled (recommended)
- [ ] Failed login notifications enabled

## WordPress Hardening
- [ ] File editing disabled (DISALLOW_FILE_EDIT)
- [ ] Debug mode disabled on production (WP_DEBUG = false)
- [ ] Database table prefix is not default (wp_)
- [ ] WordPress version hidden from source
- [ ] XML-RPC disabled (unless needed)
- [ ] Directory listing disabled
- [ ] wp-config.php permissions set to 400 or 440

## Plugins & Themes
- [ ] All plugins updated to latest version
- [ ] WordPress core updated to latest version
- [ ] No nulled or pirated plugins/themes
- [ ] Unused plugins deactivated and deleted
- [ ] Unused themes deleted (keep only active + one default)

## Firewall
- [ ] Wordfence (or equivalent) WAF active
- [ ] Real-time IP blacklist enabled
- [ ] Country blocking configured (if applicable)
- [ ] Rate limiting active

## Backup
- [ ] Daily automatic backups enabled
- [ ] Remote storage configured (not on same server)
- [ ] Backup retention: 14+ days
- [ ] Backup restore tested and verified

## SSL
- [ ] SSL certificate active and valid
- [ ] HTTP to HTTPS redirect configured
- [ ] No mixed content warnings
- [ ] HSTS header configured (recommended)

## Monitoring
- [ ] Malware scanning scheduled (daily)
- [ ] File change detection enabled
- [ ] Security notifications enabled (email)
- [ ] Uptime monitoring active
