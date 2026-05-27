type ModulePageProps = {
  title: string;
};

export function ModulePage({ title }: ModulePageProps) {
  return (
    <>
      <header>
        <p className="text-sm font-medium text-slate-500">Admin Dashboard</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">{title}</h2>
      </header>

      <div className="mt-8 min-h-[520px] rounded-3xl border border-slate-200 bg-white shadow-sm" />
    </>
  );
}
