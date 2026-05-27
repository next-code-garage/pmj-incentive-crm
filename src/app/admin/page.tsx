import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin | PMJ Incentive CRM",
};

export default async function AdminPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/");
  }

  return (
    <main className="min-h-screen px-5 py-8 sm:px-10">
      <header className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">PMJ</p>
          <h1 className="mt-1 text-xl font-bold text-slate-950">Incentive CRM Admin</h1>
        </div>
        <form action="/api/auth/logout" method="post">
          <button
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </header>

      <section className="mx-auto mt-8 max-w-6xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-500">Signed in as</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">{admin.username}</h2>
        <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600">
          Your administrator session is active. CRM management modules can now be built behind
          this protected area.
        </p>
      </section>
    </main>
  );
}
