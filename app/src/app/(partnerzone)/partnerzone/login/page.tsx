"use client"

import { Suspense, useState, type FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FolderOpen, Loader2, Mail, Lock, Eye, EyeOff, User, Building2, ArrowLeft } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

type View = "login" | "register" | "recovery"

const DEPARTMENTS = [
  { value: "marketing", label: "Marketing" },
  { value: "vendas", label: "Vendas" },
  { value: "clinical", label: "Clinical" },
  { value: "admin", label: "Administrativo" },
  { value: "operacoes", label: "Operacoes" },
]

const viewVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

export default function PartnerZoneLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#070b14]">
          <Loader2 className="size-8 animate-spin text-blue-500" />
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  )
}

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/partnerzone"
  const urlError = searchParams.get("error")

  const [view, setView] = useState<View>("login")
  const [error, setError] = useState<string | null>(
    urlError === "auth_failed"
      ? "Falha na autenticacao. Tente novamente."
      : urlError === "no_code"
        ? "Codigo de autorizacao ausente."
        : urlError === "supabase_not_configured"
          ? "Supabase nao esta configurado. Contate o administrador."
          : null
  )
  const [success, setSuccess] = useState<string | null>(null)

  function switchView(newView: View) {
    setError(null)
    setSuccess(null)
    setView(newView)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b14] px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="flex items-center justify-center size-14 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <FolderOpen className="size-7 text-blue-400" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              PartnerZone
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mt-1 font-medium">
              CONTOURLINE
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#0c1220] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Global messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-4 text-sm text-green-300 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* View content */}
          <AnimatePresence mode="wait">
            {view === "login" && (
              <motion.div
                key="login"
                variants={viewVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <LoginView
                  redirectTo={redirectTo}
                  router={router}
                  setError={setError}
                  switchView={switchView}
                />
              </motion.div>
            )}
            {view === "register" && (
              <motion.div
                key="register"
                variants={viewVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <RegisterView
                  setError={setError}
                  setSuccess={setSuccess}
                  switchView={switchView}
                />
              </motion.div>
            )}
            {view === "recovery" && (
              <motion.div
                key="recovery"
                variants={viewVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <RecoveryView
                  setError={setError}
                  setSuccess={setSuccess}
                  switchView={switchView}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          Acesso restrito a colaboradores Contourline.
        </p>
      </div>
    </div>
  )
}

/* ── Input component ──────────────────────────────────────────────────── */

function InputField({
  id,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
  autoComplete,
  required = true,
  showToggle,
  onToggle,
  toggleState,
}: {
  id: string
  type?: string
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  icon: React.ComponentType<{ className?: string }>
  autoComplete?: string
  required?: boolean
  showToggle?: boolean
  onToggle?: () => void
  toggleState?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="size-4 text-gray-500" />
        </div>
        <input
          id={id}
          type={showToggle ? (toggleState ? "text" : "password") : type}
          required={required}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-white/[0.08] bg-[#111827] pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-colors"
          placeholder={placeholder}
        />
        {showToggle && onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300 transition-colors"
            tabIndex={-1}
          >
            {toggleState ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

/* ── Login View ───────────────────────────────────────────────────────── */

function LoginView({
  redirectTo,
  router,
  setError,
  switchView,
}: {
  redirectTo: string
  router: ReturnType<typeof useRouter>
  setError: (e: string | null) => void
  switchView: (v: View) => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = getSupabaseBrowserClient()
    if (!supabase) {
      setError("Supabase nao esta configurado. Contate o administrador.")
      setLoading(false)
      return
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(
        authError.message === "Invalid login credentials"
          ? "Email ou senha incorretos."
          : authError.message
      )
      setLoading(false)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  async function handleGoogleLogin() {
    setError(null)
    setGoogleLoading(true)

    const supabase = getSupabaseBrowserClient()
    if (!supabase) {
      setError("Supabase nao esta configurado. Contate o administrador.")
      setGoogleLoading(false)
      return
    }

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          window.location.origin + "/partnerzone/auth/callback",
      },
    })

    if (oauthError) {
      setError(oauthError.message)
      setGoogleLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-5">Entrar</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <InputField
          id="login-email"
          type="email"
          label="Email"
          placeholder="seu@email.com"
          value={email}
          onChange={setEmail}
          icon={Mail}
          autoComplete="email"
        />

        <InputField
          id="login-password"
          label="Senha"
          placeholder="********"
          value={password}
          onChange={setPassword}
          icon={Lock}
          autoComplete="current-password"
          showToggle
          onToggle={() => setShowPassword(!showPassword)}
          toggleState={showPassword}
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => switchView("recovery")}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Esqueceu a senha?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.08]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#0c1220] px-3 text-gray-500">
            ou continue com
          </span>
        </div>
      </div>

      {/* Google button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {googleLoading ? (
          <Loader2 className="size-4 animate-spin text-gray-600" />
        ) : (
          <GoogleIcon />
        )}
        {googleLoading ? "Conectando..." : "Entrar com Google"}
      </button>

      {/* Switch to register */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Nao tem conta?{" "}
        <button
          type="button"
          onClick={() => switchView("register")}
          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          Cadastre-se
        </button>
      </p>
    </div>
  )
}

/* ── Register View ────────────────────────────────────────────────────── */

function RegisterView({
  setError,
  setSuccess,
  switchView,
}: {
  setError: (e: string | null) => void
  setSuccess: (s: string | null) => void
  switchView: (v: View) => void
}) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [department, setDepartment] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (password !== confirmPassword) {
      setError("As senhas nao coincidem.")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    if (!department) {
      setError("Selecione um departamento.")
      return
    }

    setLoading(true)

    const supabase = getSupabaseBrowserClient()
    if (!supabase) {
      setError("Supabase nao esta configurado. Contate o administrador.")
      setLoading(false)
      return
    }

    const { data: signUpData, error: signUpError } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // Create the user profile record
    if (signUpData.user) {
      const { error: profileError } = await supabase
        .from("partnerzone_user_profiles")
        .insert({
          id: signUpData.user.id,
          full_name: fullName,
          department,
          role: "viewer",
        })

      if (profileError) {
        console.error("Error creating profile:", profileError.message)
        // Don't block signup, profile can be created later via trigger
      }
    }

    setSuccess("Conta criada! Verifique seu email para confirmar.")
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-5">Criar conta</h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <InputField
          id="register-name"
          label="Nome completo"
          placeholder="Seu nome completo"
          value={fullName}
          onChange={setFullName}
          icon={User}
          autoComplete="name"
        />

        <InputField
          id="register-email"
          type="email"
          label="Email"
          placeholder="seu@email.com"
          value={email}
          onChange={setEmail}
          icon={Mail}
          autoComplete="email"
        />

        <InputField
          id="register-password"
          label="Senha"
          placeholder="Minimo 6 caracteres"
          value={password}
          onChange={setPassword}
          icon={Lock}
          autoComplete="new-password"
          showToggle
          onToggle={() => setShowPassword(!showPassword)}
          toggleState={showPassword}
        />

        <InputField
          id="register-confirm"
          label="Confirmar senha"
          placeholder="Repita a senha"
          value={confirmPassword}
          onChange={setConfirmPassword}
          icon={Lock}
          autoComplete="new-password"
          showToggle
          onToggle={() => setShowConfirm(!showConfirm)}
          toggleState={showConfirm}
        />

        <div className="space-y-1.5">
          <label
            htmlFor="register-department"
            className="block text-sm font-medium text-gray-300"
          >
            Departamento
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Building2 className="size-4 text-gray-500" />
            </div>
            <select
              id="register-department"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full appearance-none rounded-xl border border-white/[0.08] bg-[#111827] pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-colors"
            >
              <option value="" disabled>
                Selecione seu departamento
              </option>
              {DEPARTMENTS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-2"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Criando conta..." : "Criar conta"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Ja tem conta?{" "}
        <button
          type="button"
          onClick={() => switchView("login")}
          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          Entrar
        </button>
      </p>
    </div>
  )
}

/* ── Recovery View ────────────────────────────────────────────────────── */

function RecoveryView({
  setError,
  setSuccess,
  switchView,
}: {
  setError: (e: string | null) => void
  setSuccess: (s: string | null) => void
  switchView: (v: View) => void
}) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleRecovery(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    const supabase = getSupabaseBrowserClient()
    if (!supabase) {
      setError("Supabase nao esta configurado. Contate o administrador.")
      setLoading(false)
      return
    }

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: window.location.origin + "/partnerzone",
      }
    )

    if (resetError) {
      setError(resetError.message)
      setLoading(false)
      return
    }

    setSuccess("Email enviado! Verifique sua caixa de entrada.")
    setLoading(false)
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => switchView("login")}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-200 transition-colors mb-4"
      >
        <ArrowLeft className="size-4" />
        Voltar ao login
      </button>

      <h2 className="text-lg font-semibold text-white mb-2">
        Recuperar senha
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Informe seu email e enviaremos um link para redefinir sua senha.
      </p>

      <form onSubmit={handleRecovery} className="space-y-4">
        <InputField
          id="recovery-email"
          type="email"
          label="Email"
          placeholder="seu@email.com"
          value={email}
          onChange={setEmail}
          icon={Mail}
          autoComplete="email"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Enviando..." : "Enviar link de recuperacao"}
        </button>
      </form>
    </div>
  )
}
