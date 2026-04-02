// =============================================
// Contourline IA Hub - Auth System
// =============================================

const SUPABASE_URL = 'https://lyifnttxpoypwibbffnv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5aWZudHR4cG95cHdpYmJmZm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNDY3MTQsImV4cCI6MjA2NTkyMjcxNH0.4z8lmc2DAnykbh7YqquyoeEo0uJM_dKt2X90D7-OTS0';

// Supabase client simplificado (sem SDK externo)
const SupaAuth = {
  // Headers padrão
  _headers(token) {
    const h = {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
    };
    if (token) h['Authorization'] = `Bearer ${token}`;
    return h;
  },

  // Obter sessão do localStorage
  getSession() {
    try {
      const data = JSON.parse(localStorage.getItem('ctl_session'));
      if (!data || !data.access_token) return null;
      // Verificar expiração
      if (data.expires_at && Date.now() / 1000 > data.expires_at) {
        this.clearSession();
        return null;
      }
      return data;
    } catch { return null; }
  },

  // Salvar sessão
  saveSession(data) {
    localStorage.setItem('ctl_session', JSON.stringify({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
      user: data.user
    }));
  },

  // Limpar sessão
  clearSession() {
    localStorage.removeItem('ctl_session');
    localStorage.removeItem('ctl_profile');
  },

  // Login com email/senha
  async signIn(email, password) {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error_description || data.msg || 'Erro ao fazer login');
    this.saveSession(data);
    return data;
  },

  // Logout
  async signOut() {
    const session = this.getSession();
    if (session) {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: this._headers(session.access_token)
      }).catch(() => {});
    }
    this.clearSession();
    window.location.href = '/login';
  },

  // Refresh token
  async refreshSession() {
    const session = this.getSession();
    if (!session || !session.refresh_token) return null;
    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
        method: 'POST',
        headers: this._headers(),
        body: JSON.stringify({ refresh_token: session.refresh_token })
      });
      if (!res.ok) { this.clearSession(); return null; }
      const data = await res.json();
      this.saveSession(data);
      return data;
    } catch { this.clearSession(); return null; }
  },

  // Buscar perfil do usuário
  async getProfile() {
    const cached = localStorage.getItem('ctl_profile');
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
    const session = this.getSession();
    if (!session) return null;
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/profiles?id=eq.${session.user.id}&select=*`,
      { headers: this._headers(session.access_token) }
    );
    if (!res.ok) return null;
    const profiles = await res.json();
    if (profiles.length === 0) return null;
    localStorage.setItem('ctl_profile', JSON.stringify(profiles[0]));
    return profiles[0];
  },

  // Verificar permissão de acesso à página (por setor)
  async checkPageAccess(route) {
    const session = this.getSession();
    if (!session) return false;
    const profile = await this.getProfile();
    // Admin tem acesso total
    if (profile && profile.role === 'admin') return true;
    // Checar se o usuário pertence a um setor que tem acesso à página
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/user_sectors?user_id=eq.${session.user.id}&select=sector_id,sectors:sector_id(id,name),sector_pages:sector_id(sector_pages(page_route))`,
      { headers: this._headers(session.access_token) }
    );
    if (!res.ok) {
      // Fallback: checar permissão antiga por página
      const fallback = await fetch(
        `${SUPABASE_URL}/rest/v1/page_permissions?user_id=eq.${session.user.id}&page_route=eq.${route}&can_access=eq.true&select=id`,
        { headers: this._headers(session.access_token) }
      );
      if (!fallback.ok) return false;
      const perms = await fallback.json();
      return perms.length > 0;
    }
    // Checar via sector_pages diretamente
    const sectorCheck = await fetch(
      `${SUPABASE_URL}/rest/v1/sector_pages?page_route=eq.${route}&select=sector_id,user_sectors!inner(user_id)&user_sectors.user_id=eq.${session.user.id}`,
      { headers: this._headers(session.access_token) }
    );
    if (!sectorCheck.ok) return false;
    const matches = await sectorCheck.json();
    return matches.length > 0;
  },

  // Registrar log de acesso
  async logAccess(route, action = 'page_view') {
    const session = this.getSession();
    if (!session) return;
    fetch(`${SUPABASE_URL}/rest/v1/access_logs`, {
      method: 'POST',
      headers: this._headers(session.access_token),
      body: JSON.stringify({
        user_id: session.user.id,
        email: session.user.email,
        page_route: route,
        action: action,
        user_agent: navigator.userAgent
      })
    }).catch(() => {});
  },

  // Query genérica ao Supabase REST
  async query(table, params = '') {
    const session = this.getSession();
    if (!session) return [];
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/${table}?${params}`,
      { headers: this._headers(session.access_token) }
    );
    if (!res.ok) return [];
    return res.json();
  },

  // Insert genérico
  async insert(table, data) {
    const session = this.getSession();
    if (!session) throw new Error('Não autenticado');
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: { ...this._headers(session.access_token), 'Prefer': 'return=representation' },
      body: JSON.stringify(data)
    });
    if (!res.ok) { const e = await res.json(); throw new Error(e.message || 'Erro ao inserir'); }
    return res.json();
  },

  // Update genérico
  async update(table, match, data) {
    const session = this.getSession();
    if (!session) throw new Error('Não autenticado');
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${match}`, {
      method: 'PATCH',
      headers: { ...this._headers(session.access_token), 'Prefer': 'return=representation' },
      body: JSON.stringify(data)
    });
    if (!res.ok) { const e = await res.json(); throw new Error(e.message || 'Erro ao atualizar'); }
    return res.json();
  },

  // Delete genérico
  async delete(table, match) {
    const session = this.getSession();
    if (!session) throw new Error('Não autenticado');
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${match}`, {
      method: 'DELETE',
      headers: this._headers(session.access_token)
    });
    if (!res.ok) throw new Error('Erro ao deletar');
    return true;
  },

  // Solicitar recuperação de senha (envia email)
  async resetPasswordForEmail(email, redirectTo) {
    const siteUrl = redirectTo || window.location.origin + '/login';
    const res = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({
        email,
        gotrue_meta_security: { captcha_token: '' },
        redirect_to: siteUrl
      })
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error_description || data.msg || 'Erro ao enviar email de recuperação');
    }
    return true;
  },

  // Atualizar senha do usuário autenticado
  async updatePassword(newPassword, accessToken) {
    const token = accessToken || this.getSession()?.access_token;
    if (!token) throw new Error('Não autenticado');
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      method: 'PUT',
      headers: this._headers(token),
      body: JSON.stringify({ password: newPassword })
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error_description || data.msg || 'Erro ao atualizar senha');
    }
    return res.json();
  },

  // Criar usuário (admin only, via Supabase Auth API)
  async createUser(email, password, fullName, role = 'user') {
    const session = this.getSession();
    if (!session) throw new Error('Não autenticado');
    // Criar via signup com metadata
    const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({
        email,
        password,
        data: { full_name: fullName, role: role }
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error_description || data.msg || 'Erro ao criar usuário');

    // Criar perfil na tabela profiles (não depender do trigger)
    const userId = data.user?.id || data.id;
    if (userId) {
      await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
        method: 'POST',
        headers: { ...this._headers(session.access_token), 'Prefer': 'return=minimal' },
        body: JSON.stringify({
          id: userId,
          email: email,
          full_name: fullName,
          role: role,
          is_active: true
        })
      }).catch(() => {});
    }

    return data;
  }
};

// =============================================
// Proteção de rotas - executa automaticamente
// =============================================
(async function() {
  const path = window.location.pathname;

  // Páginas públicas (não proteger)
  if (path === '/login' || path === '/login/') return;

  const session = SupaAuth.getSession();

  // Sem sessão → login
  if (!session) {
    window.location.href = '/login';
    return;
  }

  // Tentar refresh se perto de expirar (5 min)
  if (session.expires_at && (session.expires_at - Date.now() / 1000) < 300) {
    await SupaAuth.refreshSession();
  }

  // Verificar se sessão ainda é válida
  const newSession = SupaAuth.getSession();
  if (!newSession) {
    window.location.href = '/login';
    return;
  }

  // Verificar permissão da página (exceto hub principal e admin)
  if (path !== '/' && path !== '/admin' && path !== '/admin/') {
    const hasAccess = await SupaAuth.checkPageAccess(path.replace(/\/$/, ''));
    if (!hasAccess) {
      // Redirecionar ao hub com mensagem
      sessionStorage.setItem('ctl_msg', 'Você não tem permissão para acessar esta página.');
      window.location.href = '/';
      return;
    }
  }

  // Registrar acesso
  SupaAuth.logAccess(path);

  // =============================================
  // Navbar Global - injetada em todas as páginas
  // =============================================
  const profile = await SupaAuth.getProfile();
  if (!profile) return;

  // Garantir que o DOM esteja pronto
  if (document.readyState === 'loading') {
    await new Promise(r => document.addEventListener('DOMContentLoaded', r));
  }

  const name = profile.full_name || profile.email;
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const roleLabels = { admin: 'Admin', manager: 'Gerente', user: 'Usuario' };
  const currentPath = path.replace(/\/$/, '') || '/';

  const pages = [
    { route: '/', label: 'Hub', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
    { route: '/portal', label: 'Portal', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' },
    { route: '/dashboard', label: 'Dashboard', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>' },
    { route: '/fechamento', label: 'DFs', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
    { route: '/mapa', label: 'Mapa', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg>' },
    { route: '/rdstation', label: 'Comercial', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { route: '/academy', label: 'Academy', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5"/></svg>' },
  ];

  const navHTML = pages.map(p => {
    const active = currentPath === p.route ? ' ctl-nav-active' : '';
    return `<a href="${p.route}" class="ctl-nav-link${active}">${p.icon}<span>${p.label}</span></a>`;
  }).join('');

  const adminBtn = profile.role === 'admin'
    ? `<a href="/admin" class="ctl-nav-admin${currentPath === '/admin' ? ' ctl-nav-active' : ''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg></a>`
    : '';

  const navbar = document.createElement('div');
  navbar.className = 'ctl-global-nav';
  navbar.innerHTML = `
    <div class="ctl-nav-left">
      <a href="/" class="ctl-nav-brand">C</a>
      <span class="ctl-nav-title">Contourline <span>IA</span></span>
    </div>
    <div class="ctl-nav-center">${navHTML}</div>
    <div class="ctl-nav-right">
      ${adminBtn}
      <div class="ctl-nav-user">
        <div class="ctl-nav-avatar">${initials}</div>
        <div class="ctl-nav-user-info">
          <div class="ctl-nav-user-name">${name}</div>
          <div class="ctl-nav-user-role">${roleLabels[profile.role] || 'Usuario'}</div>
        </div>
      </div>
      <button class="ctl-nav-logout" onclick="SupaAuth.signOut()" title="Sair">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      </button>
    </div>
  `;
  document.body.prepend(navbar);

  // Injetar CSS da navbar
  const style = document.createElement('style');
  style.textContent = `
    .ctl-global-nav{
      position:fixed;top:0;left:0;right:0;height:48px;z-index:9999;
      display:flex;align-items:center;justify-content:space-between;
      padding:0 16px;
      background:rgba(10,14,26,0.92);backdrop-filter:blur(16px);
      border-bottom:1px solid rgba(30,41,59,0.8);
      font-family:'Inter',system-ui,sans-serif;
    }
    .ctl-global-nav *{box-sizing:border-box;margin:0;padding:0}
    .ctl-nav-left{display:flex;align-items:center;gap:8px}
    .ctl-nav-brand{
      width:28px;height:28px;
      background:linear-gradient(135deg,#3b82f6,#a855f7);
      border-radius:8px;display:flex;align-items:center;justify-content:center;
      font-size:14px;font-weight:800;color:#fff;text-decoration:none;
      transition:transform .2s;flex-shrink:0;
    }
    .ctl-nav-brand:hover{transform:scale(1.08)}
    .ctl-nav-title{font-size:14px;font-weight:700;color:#f1f5f9}
    .ctl-nav-title span{font-weight:400;color:#64748b}

    .ctl-nav-center{display:flex;align-items:center;gap:2px}
    .ctl-nav-link{
      display:flex;align-items:center;gap:5px;
      padding:6px 10px;border-radius:7px;
      font-size:12px;font-weight:500;color:#64748b;
      text-decoration:none;transition:all .15s;white-space:nowrap;
    }
    .ctl-nav-link svg{width:15px;height:15px;flex-shrink:0}
    .ctl-nav-link:hover{color:#e2e8f0;background:rgba(255,255,255,0.06)}
    .ctl-nav-link.ctl-nav-active{color:#3b82f6;background:rgba(59,130,246,0.12)}

    .ctl-nav-right{display:flex;align-items:center;gap:8px}
    .ctl-nav-admin{
      display:flex;align-items:center;justify-content:center;
      width:30px;height:30px;border-radius:7px;
      color:#a855f7;text-decoration:none;transition:all .15s;
    }
    .ctl-nav-admin:hover{background:rgba(168,85,247,0.15)}
    .ctl-nav-admin.ctl-nav-active{background:rgba(168,85,247,0.2)}

    .ctl-nav-user{
      display:flex;align-items:center;gap:7px;
      padding:3px 10px 3px 3px;border-radius:20px;
      background:rgba(255,255,255,0.04);border:1px solid rgba(30,41,59,0.6);
    }
    .ctl-nav-avatar{
      width:24px;height:24px;border-radius:50%;
      background:linear-gradient(135deg,#3b82f6,#a855f7);
      display:flex;align-items:center;justify-content:center;
      font-size:10px;font-weight:700;color:#fff;flex-shrink:0;
    }
    .ctl-nav-user-info{line-height:1.2}
    .ctl-nav-user-name{font-size:12px;font-weight:500;color:#e2e8f0}
    .ctl-nav-user-role{font-size:9px;font-weight:600;color:#a855f7;text-transform:uppercase;letter-spacing:.3px}

    .ctl-nav-logout{
      display:flex;align-items:center;justify-content:center;
      width:30px;height:30px;border-radius:7px;
      background:none;border:none;color:#64748b;cursor:pointer;transition:all .15s;
    }
    .ctl-nav-logout svg{width:16px;height:16px}
    .ctl-nav-logout:hover{color:#ef4444;background:rgba(239,68,68,0.1)}

    body{padding-top:48px !important}

    @media(max-width:768px){
      .ctl-nav-title{display:none}
      .ctl-nav-link span{display:none}
      .ctl-nav-link{padding:6px 8px}
      .ctl-nav-user-info{display:none}
      .ctl-nav-user{padding:3px}
    }
  `;
  document.head.appendChild(style);

  // Esconder barras antigas de navegação
  const oldBars = document.querySelectorAll('#userBar, .user-bar');
  oldBars.forEach(el => el.style.display = 'none');
})();
