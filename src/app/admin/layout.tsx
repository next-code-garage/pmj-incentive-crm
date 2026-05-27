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
      <aside className="flex w-full shrink-0 flex-col bg-slate-950 px-5 py-6 text-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:px-6 lg:py-8">
        <div className="border-b border-white/10 pb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-400">PMJ</p>
          <h1 className="mt-3 text-xl font-bold">Incentive CRM</h1>
          <p className="mt-2 text-sm text-slate-400">Administration Portal</p>
        </div>

        <AdminNavigation />

        <div className="mt-8 border-t border-white/10 pt-5 lg:mt-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Signed in as</p>
          <p className="mt-2 text-sm font-semibold text-white">{admin.username}</p>
          <form action="/api/auth/logout" className="mt-5" method="post">
            <button
              className="w-full rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <section className="flex-1 px-5 py-7 sm:px-8 sm:py-8 lg:ml-72 lg:px-10">
        {children}
      </section>
    </main>
  );
}
