import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";

const adminNavigation = [
  { label: "Manage Employee", href: "#manage-employee" },
  { label: "Incentive", href: "#incentive" },
  { label: "Past Incentive", href: "#past-incentive" },
  { label: "Incentive Engine", href: "#incentive-engine" },
];

export const metadata: Metadata = {
  title: "Admin | PMJ Incentive CRM",
};

export default async function AdminPage() {
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

        <div className="pt-7">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Main Menu
          </p>
          <nav aria-label="Admin modules">
            <ul className="space-y-2">
              {adminNavigation.map((item, index) => (
                <li key={item.label}>
                  <a
                    className={`block rounded-xl px-4 py-3.5 text-sm font-semibold ${
                      index === 0
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

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
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Admin Dashboard</p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Welcome back</h2>
          </div>
        </header>

        <div className="mt-8 min-h-[480px] rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Dashboard
          </p>
          <h3 className="mt-3 text-2xl font-bold text-slate-950">Incentive CRM Workspace</h3>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
            Select a module from the left navigation to manage employees, build incentives, and
            review historical payouts.
          </p>
        </div>
      </section>
    </main>
  );
}
