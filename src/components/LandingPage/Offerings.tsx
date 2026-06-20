// components/landing/Offerings.tsx
import {
  HeartPulse,
  Cpu,
  GraduationCap,
  ClipboardList,
} from "lucide-react";

const OFFERINGS = [
  {
    icon: HeartPulse,
    title: "MDCAT preparation",
    desc: "Intensive 3–4 month batches. Daily MCQs, mock exams. UHS, NUMS, ETEA patterns.",
    tags: ["Regular batch", "Crash course", "Mock exams"],
  },
  {
    icon: Cpu,
    title: "ECAT preparation",
    desc: "Engineering entry test prep covering NTS and university-specific patterns with past papers.",
    tags: ["NTS pattern", "Tricks & tips"],
  },
  {
    icon: GraduationCap,
    title: "University admissions",
    desc: "NUST, FAST, IBA, LUMS, AKU. Personal statement, interview prep, documentation support.",
    tags: ["USAID", "HEC", "PEEF", "Ehsaas"],
  },
  {
    icon: ClipboardList,
    title: "Monthly GT tests",
    desc: "Class 9–12. Sindh and Federal Board patterns. Detailed performance analysis included.",
    tags: ["Sindh board", "Federal board"],
  },
];

export function Offerings() {
  return (
    <section className="px-4 py-16">
      <div className="mb-10">
        <h2 className="text-3xl font-medium font-serif tracking-tight mb-2">
          What we offer
        </h2>
        <p className="text-muted-foreground">
          From Class 9 to university — one place for everything.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border border border-border rounded-xl overflow-hidden">
        {OFFERINGS.map((o) => {
          const Icon = o.icon;
          return (
            <div
              key={o.title}
              className="p-6 border-b border-border last:border-b-0 sm:[&:nth-child(3)]:border-b-0 sm:[&:nth-child(4)]:border-b-0"
            >
              <Icon className="w-5 h-5 text-muted-foreground mb-4" />
              <h3 className="text-[15px] font-medium mb-1.5">{o.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {o.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {o.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-muted-foreground border border-border rounded-full px-2.5 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}