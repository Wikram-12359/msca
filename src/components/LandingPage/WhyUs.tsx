// components/landing/WhyUs.tsx
import { FileText, Smartphone, Map, Coins } from "lucide-react";

const REASONS = [
  {
    icon: FileText,
    title: "Updated notes",
    desc: "Latest syllabus and MCQ banks every session.",
  },
  {
    icon: Smartphone,
    title: "Digital support",
    desc: "WhatsApp groups, online tests, recorded lectures.",
  },
  {
    icon: Map,
    title: "Career guidance",
    desc: "Field selection and roadmap for every student.",
  },
  {
    icon: Coins,
    title: "Affordable fee",
    desc: "Quality education at a fair, transparent price.",
  },
];

export function WhyUs() {
  return (
    <section className="px-4 py-16 border-t border-border">
      <div className="mb-10">
        <h2 className="text-3xl font-medium font-serif tracking-tight mb-2">
          Why Mindspark
        </h2>
        <p className="text-muted-foreground">
          Qualified doctors and engineers as faculty. Honest, concept-first teaching.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border border border-border rounded-xl overflow-hidden">
        {REASONS.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.title} className="p-5">
              <Icon className="w-4 h-4 text-muted-foreground mb-3" />
              <h3 className="text-sm font-medium mb-1">{r.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}