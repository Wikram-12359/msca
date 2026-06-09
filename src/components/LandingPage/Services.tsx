import { ClipboardList, GraduationCap, HeartPulse, Settings2 } from "lucide-react";

const Services = () => {

  const SERVICES = [
  {
    icon: <GraduationCap size={22} />,
    name: "Universities & Scholarships",
    desc: "Complete admission counseling for NUST, FAST, IBA, LUMS, AKU, NED, DUHS, MUET. Personal statement, interview prep, and documentation support.",
    tags: ["USAID", "HEC Need-Based", "PEEF", "Ehsaas"],
    featured: false,
  },
  {
    icon: <HeartPulse size={22} />,
    name: "MDCAT Preparation",
    desc: "Intensive crash courses & regular 3–4 month batches. Daily MCQs, weekly tests, full mock exams. UHS, NUMS, ETEA pattern coverage.",
    tags: ["Crash Course", "Regular Batch", "Past Papers", "Mock Exams"],
    featured: true,
  },
  {
    icon: <Settings2 size={22} />,
    name: "ECAT Preparation",
    desc: "Engineering entry test prep covering NTS and university-specific patterns. Short tricks, time management, and full past paper discussions.",
    tags: ["NTS Pattern", "Crash Course", "Tricks & Tips"],
    featured: false,
  },
  {
    icon: <ClipboardList size={22} />,
    name: "Monthly GT Tests",
    desc: "Class 9–12 and ECAT/MDCAT students. Sindh Board & Federal Board patterns. Detailed result + performance analysis + weak area identification.",
    tags: ["Sindh Board", "Federal Board", "Analysis Report"],
    featured: false,
  },
];

  return (
    <section id="courses" className='py-20 bg-white'>
      <div className='max-w-6xl mx-auto px-7'>
        <div className='flex justify-center text-center  mb-12 flex-wrap gap-4'>
          <div>
            <h2 className="text-5xl font-serif font-black leading-tight tracking-tight text-primary text-center">
              What We Offer
            </h2>
          <p className='text-gray-500 text-base leading-relaxed max-w-lg'>
            From Class 9 to university entry — comprehensive preparation with
            qualified doctors and engineers as faculty.
          </p>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {SERVICES.map((svc) => (
            <div
              key={svc.name}
              className={`rounded-2xl p-7 border transition-all hover:-translate-y-0.5 ${
                svc.featured
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-200 hover:border-green-400'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                  svc.featured
                    ? 'bg-white/10 text-green-300'
                    : 'bg-[#F0FDF4] text-primary'
                }`}
              >
                {svc.icon}
              </div>
              <h3
                className={`text-base font-black mb-2 ${svc.featured ? 'text-white' : 'text-gray-900'}`}
              >
                {svc.name}
              </h3>
              <p
                className={`text-[13px] leading-relaxed mb-4 ${svc.featured ? 'text-green-300' : 'text-gray-500'}`}
              >
                {svc.desc}
              </p>
              <div className='flex flex-wrap gap-1.5'>
                {svc.tags.map((t) => (
                  <span
                    key={t}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                      svc.featured
                        ? 'bg-white/10 border-transparent text-green-200'
                        : 'bg-[#F0FDF4] border-green-200 text-[#1A6B44]'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
