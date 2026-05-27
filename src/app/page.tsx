import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";

type LoginPageProps = {
  searchParams: Promise<{ error?: string | string[] }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  if (await getCurrentAdmin()) {
    redirect("/admin");
  }

  const error = (await searchParams).error;
  const errorMessage =
    error === "invalid"
      ? "Invalid username or password."
      : error === "unavailable"
        ? "Sign in is temporarily unavailable. Please try again."
        : null;

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">PMJ</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Incentive CRM</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to continue to your workspace.</p>
        </div>

        <form action="/api/auth/login" className="space-y-5" method="post">
          {errorMessage ? (
            <p
              aria-live="polite"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          ) : null}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="username">
              Admin username
            </label>
            <input
              autoComplete="username"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              type="text"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">
              Password
            </label>
            <input
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              type="password"
            />
          </div>
          <button
            className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            type="submit"
          >
            Sign in
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-400">
          Administrator access only
        </p>
      </section>
    </main>
  );
}
