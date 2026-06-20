// components/landing/Batches.tsx
const BATCHES = [
  { name: "Morning batch", time: "8:00 AM – 11:00 AM", open: true },
  { name: "Evening batch", time: "4:00 PM – 7:00 PM", open: true },
  { name: "ECAT regular batch", time: "Weekdays", open: true },
];

export function Batches() {
  return (
    <div className="mx-4 border border-border rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-[15px] font-medium">Current batches</h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          Morning and evening timings available
        </p>
      </div>
      {BATCHES.map((b) => (
        <div
          key={b.name}
          className="flex items-center justify-between px-6 py-4 border-b border-border last:border-b-0"
        >
          <div>
            <p className="text-sm font-medium">{b.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{b.time}</p>
          </div>
          <span className="text-xs text-primary border border-primary/30 bg-primary-light rounded-full px-3 py-1">
            Open
          </span>
        </div>
      ))}
    </div>
  );
}