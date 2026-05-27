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

      <div className="mx-auto mt-8 flex max-w-6xl flex-col-reverse gap-6 lg:flex-row">
        <section className="min-h-[420px] flex-1 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm text-slate-500">Signed in as</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">{admin.username}</h2>
          <div className="mt-10 rounded-2xl bg-blue-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              Dashboard
            </p>
            <h3 className="mt-3 text-xl font-bold text-slate-950">Welcome to Incentive CRM</h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Select an admin module from the navigation panel to manage employees and incentive
              workflows.
            </p>
          </div>
        </section>

        <aside className="w-full shrink-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:w-72">
          <p className="px-3 pb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Navigation
          </p>
          <nav aria-label="Admin modules">
            <ul className="space-y-2">
              {adminNavigation.map((item, index) => (
                <li key={item.label}>
                  <a
                    className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
                      index === 0
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </main>
  );
}
