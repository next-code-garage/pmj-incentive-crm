export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">PMJ</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Incentive CRM</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to continue to your workspace.</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
              Email address
            </label>
            <input
              autoComplete="email"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              type="email"
            />
          </div>
          <div>
            <div className="mb-2 flex justify-between">
              <label className="text-sm font-medium text-slate-700" htmlFor="password">
                Password
              </label>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700" type="button">
                Forgot password?
              </button>
            </div>
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
          Authentication will be configured in the next development phase.
        </p>
      </section>
    </main>
  );
}
