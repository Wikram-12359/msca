"use client";
import {
  GraduationCap, Building2, Award,
  FlaskConical, Laptop
} from "lucide-react";
import Services from "@/components/LandingPage/Services";
import WhyMindSpark from "@/components/LandingPage/WhyMindSpark";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";





const BAR_ITEMS = [
  { icon: <Building2 size={18} />, title: "NUST · FAST · IBA · LUMS", sub: "Top university guidance" },
  { icon: <Award size={18} />, title: "HEC · USAID · PEEF · Ehsaas", sub: "Scholarship counseling" },
  { icon: <FlaskConical size={18} />, title: "UHS · NUMS · ETEA · NTS", sub: "All entry test patterns" },
  { icon: <Laptop size={18} />, title: "Digital Support Included", sub: "WhatsApp groups + recorded lectures" },
];

export default function MindsparkLanding() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white text-gray-900 ">
      {/* ── HERO ── */}
      <section className="bg-white pt-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-7 min-h-175">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">

            {/* Left */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-center md:text-left  font-bold font-serif leading-[1.05] mb-3 tracking-tight">
                Shape Your Future<br />
                With
                <span className="text-primary"> Smart </span>
                Preparation
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg text-center md:text-left">
                Pakistan&apos;s most dedicated coaching for ECAT, MDCAT, university admissions, and school-level excellence. Concept-based teaching — no ratta system.
              </p>
              <div className="flex justify-center md:justify-start gap-3 flex-wrap mb-12">
                <Button onClick={()=> router.push("/login")} className="py-6 rounded-full px-4 " size={"lg"}>
                  <GraduationCap size={16} /> Start Enrollment
                </Button>
                <Link href="/login">
                  <Button className="py-6 px-4 rounded-full" size="lg" variant={"outline"}>
                    Login
                  </Button>
                </Link>
              </div>
              
            </div>

            {/* Right panel — hidden on mobile */}
            <div className="hidden lg:flex flex-col gap-4 pb-12">
              {/* Admissions card */}
              <div className="bg-[#F0FDF4] border border-green-200 rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A6B44] mb-3.5">Admissions Open For</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Class 9 & 10","Class 11 & 12","MDCAT Prep","ECAT Prep","University Entry","Scholarships"].map(t => (
                    <div key={t} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-primary">{t}</div>
                  ))}
                </div>
              </div>
              {/* Batches card */}
              <div className="bg-primary rounded-2xl p-5 text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-300 mb-3.5">Available Batches</p>
                {[
                  ["Morning Batch","open"],
                  ["Evening Batch","open"],
                  ["ECAT Regular Batch","open"],
                ].map(([name, status]) => (
                  <div key={name} className="flex items-center justify-between mb-2.5">
                    <span className="text-sm font-semibold">{name}</span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      status === "open" ? "bg-green-500 text-white" : "bg-white/10 text-green-200"
                    }`}>
                      {status === "open" ? "Open" : "Starting Soon"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-8 justify-evenly mt-12 border-2 border-primary rounded-xl md:py-8 py-5 md:px-5 px-3">
                {[["500+","Students Enrolled"],["98%","Pass Rate"],["5+","Years Experience"]].map(([n,l]) => (
                  <div key={l} className="text-center">
                    <span className="block text-2xl md:text-3xl font-black text-primary">{n}</span>
                    <span className="block text-sm md:text-lg text-gray-500 font-medium mt-0.5">{l}</span>
                  </div>
                ))}
              </div>
        </div>
        
        

        {/* Bottom bar */}
        <div className="bg-primary mt-12">
          <div className="mx-auto px-7 flex  overflow-x-auto">
            {BAR_ITEMS.map((item, i) => (
              <div key={i} className="flex-1 min-w-40 flex flex-col md:flex-row text-center md:text-left items-center gap-4  md:px-5 px-2 py-4 border-r border-white/10 last:border-r-0 w-full">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-white">
                  {item.icon}
                </div>
                <div className="flex flex-col flex-nowrap w-full">
                  <strong className="text-xs font-bold text-white leading-tight">{item.title}</strong>
                  <p className="text-[11px] text-green-100 mt-1 leading-tight">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <Services />

      {/* ── WHY MINDSPARK ── */}
      <WhyMindSpark />

    </div>
  );
}