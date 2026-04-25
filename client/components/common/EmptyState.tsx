export default function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-slate-500">{subtitle}</p>
    </div>
  );
}
