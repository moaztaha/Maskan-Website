"use client";

import { useActionState, useState } from "react";
import { AlertCircle, ArrowRight, Building2, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { loginAdmin } from "@/server/actions/auth";
import { SITE_CONTACT } from "@/lib/constants/site";

type LoginState = { error: string } | null;

async function submitLogin(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const result = await loginAdmin(formData);
  return result && "error" in result ? result : null;
}

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(submitLogin, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="relative flex w-[calc(100vw-2rem)] min-w-0 max-w-md flex-col gap-6 rounded-xl bg-bg-surface p-6 shadow-md sm:w-full sm:p-12">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="mb-1 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-on-primary shadow-md">
          <Building2 size={36} aria-hidden="true" />
        </div>
        <h2 className="font-[var(--font-cairo)] text-2xl font-semibold text-primary">Admin Login</h2>
        <p className="text-sm text-text-secondary">Maskan Real Estate Platform Dashboard</p>
      </div>

      {state?.error && (
        <div className="flex items-center gap-2 rounded-xl bg-danger/10 p-4 text-danger" role="alert">
          <AlertCircle size={20} aria-hidden="true" />
          <span className="text-sm font-medium">{state.error}</span>
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-text-secondary" htmlFor="admin-email">Email Address</label>
          <div className="relative flex items-center">
            <Mail className="pointer-events-none absolute left-4 text-text-muted" size={20} aria-hidden="true" />
            <input
              autoComplete="username"
              className="h-12 w-full rounded-xl bg-bg-subtle pl-12 pr-4 text-text-primary transition-colors placeholder:text-text-muted focus:bg-bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
              id="admin-email"
              name="email"
              placeholder="admin@example.com"
              required
              type="email"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-text-secondary" htmlFor="admin-password">Password</label>
          </div>
          <div className="relative flex items-center">
            <LockKeyhole className="pointer-events-none absolute left-4 text-text-muted" size={20} aria-hidden="true" />
            <input
              autoComplete="current-password"
              className="h-12 w-full rounded-xl bg-bg-subtle pl-12 pr-12 text-text-primary transition-colors placeholder:text-text-muted focus:bg-bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
              id="admin-password"
              name="password"
              placeholder="••••••••"
              required
              type={showPassword ? "text" : "password"}
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-3 flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => setShowPassword((visible) => !visible)}
              type="button"
            >
              {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <button
          className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-medium text-on-primary shadow-md transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending ? <LoaderCircle className="animate-spin text-on-primary" size={18} aria-hidden="true" /> : <ArrowRight className="text-on-primary" size={18} aria-hidden="true" />}
          <span className="text-on-primary">{isPending ? "Signing in…" : "Sign In"}</span>
        </button>
      </form>

    </section>
  );
}
