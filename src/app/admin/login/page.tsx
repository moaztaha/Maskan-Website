import { AdminLoginForm } from "@/components/admin/loginForm/AdminLoginForm";

export default function Page() {
  return (
    <div className="min-h-screen bg-bg-page font-[var(--font-tajawal)] text-text-primary">
      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <AdminLoginForm />
      </main>
    </div>
  );
}