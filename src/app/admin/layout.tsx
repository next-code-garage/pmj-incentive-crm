import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminNavigation } from "@/app/admin/admin-navigation";
import { getCurrentAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin | PMJ Incentive CRM",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col bg-slate-950 px-4 py-5 text-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:px-4 lg:py-5">
        <div className="border-b border-white/10 px-2 pb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-400">PMJ</p>
          <h1 className="mt-2 text-lg font-bold">Incentive CRM</h1>
          <p className="mt-1 text-xs text-slate-400">Administration Portal</p>
        </div>

        <AdminNavigation />

        <div className="mt-6 border-t border-white/10 px-2 pt-4 lg:mt-auto">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Signed in as</p>
          <p className="mt-1.5 text-sm font-semibold text-white">{admin.username}</p>
          <form action="/api/auth/logout" className="mt-4" method="post">
            <button
              className="w-full rounded-lg border border-white/15 px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <section className="flex-1 px-5 py-7 sm:px-8 sm:py-8 lg:ml-64 lg:px-10">
        {children}
      </section>
    </main>
  );
}
