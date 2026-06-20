// components/landing/Stats.tsx
const STATS = [
  { n: "500+", label: "Students enrolled" },
  { n: "98%", label: "Pass rate" },
  { n: "5 yrs", label: "Experience" },
];

export function Stats() {
  return (
    <div className="mx-3 grid grid-cols-3 divide-x divide-border border border-border rounded-xl overflow-hidden">
      {STATS.map((s) => (
        <div key={s.label} className="px-6 py-5">
          <p className="text-3xl font-medium tracking-tight mb-0.5">{s.n}</p>
          <p className="text-sm text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  );
}