import { Coins, FileText, Map, Smartphone, Users } from "lucide-react";

const WhyMindSpark = () => {

  const WHY_BENEFITS = [
    { icon: <FileText size={20} />, title: "Updated Notes", desc: "Latest syllabus, smart notes & MCQs bank included" },
    { icon: <Smartphone size={20} />, title: "Digital Support", desc: "WhatsApp groups, online tests & recorded lectures" },
    { icon: <Map size={20} />, title: "Career Counseling", desc: "Expert field selection guidance for your future" },
    { icon: <Coins size={20} />, title: "Affordable Fee", desc: "Quality education at a reasonable, fair fee structure" },
  ];


  return (
    <section className='py-20 '>
      <div className='max-w-6xl mx-auto px-7'>
            <h1 className=" text-[#1A6B44] text-5xl font-bold   text-center font-serif mb-8">
              Why Mindspark?
            </h1>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-14 items-center'>
          <div>
            <h2 className='text-2xl font-black leading-tight tracking-tight mb-4 text-center md:text-left'>
              Everything You Need
              <br />
              to Succeed
            </h2>
            <p className='text-gray-500 text-base leading-relaxed mb-8'>
              We combine qualified faculty, updated resources, and digital tools
              to give every student the edge they deserve — at an affordable
              fee.
            </p>
            <div className='grid grid-cols-2 gap-4'>
              {WHY_BENEFITS.map((b) => (
                <div
                  key={b.title}
                  className='bg-white rounded-xl p-5 border border-green-200'
                >
                  <div className='text-primary mb-2.5'>{b.icon}</div>
                  <strong className='block text-sm font-bold text-gray-900 mb-1'>
                    {b.title}
                  </strong>
                  <span className='text-xs text-gray-500 leading-relaxed'>
                    {b.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule card */}
          <div className='relative'>
            <div className='absolute -top-4 -right-4 bg-white border border-green-200 rounded-xl px-4 py-3 shadow-sm z-10'>
              <span className='block text-2xl font-black text-primary'>
                4.9★
              </span>
              <span className='block text-xs text-gray-500 font-medium'>
                Student Rating
              </span>
            </div>
            <div className='bg-primary rounded-2xl p-8 text-white'>
              <h3 className='text-xl font-black mb-1'>Batch Schedule</h3>
              <p className='text-green-300 text-sm mb-7'>
                Morning & Evening timings available
              </p>
              {[
                ['Morning Batch', '8 AM – 11 AM', 'yellow'],
                ['Evening Batch', '4 PM – 7 PM', 'blue'],
              ].map(([name, time, color]) => (
                <div key={name} className='flex items-center gap-3 mb-3'>
                  <div className='w-2 h-2 rounded-full bg-green-400 shrink-0' />
                  <span className='text-sm font-semibold'>{name}</span>
                  <span
                    className={`ml-auto text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      color === 'yellow'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {time}
                  </span>
                </div>
              ))}
              <hr className='border-white/15 my-5' />
              <p className='text-[10px] font-bold uppercase tracking-widest text-green-300 mb-3'>
                Enrolling Classes
              </p>
              <div className='flex flex-wrap gap-2'>
                {['Class 9', 'Class 10', 'Class 11', 'Class 12'].map((c) => (
                  <span
                    key={c}
                    className='text-xs font-semibold px-3 py-1 rounded-full bg-green-500 text-primary'
                  >
                    {c}
                  </span>
                ))}
                {['MDCAT', 'ECAT', 'Entry Tests'].map((c) => (
                  <span
                    key={c}
                    className='text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-green-200'
                  >
                    {c}
                  </span>
                ))}
              </div>
              <hr className='border-white/15 my-5' />
              <div className='flex items-center gap-2.5'>
                <Users size={18} className='text-green-300' />
                <span className='text-xs text-green-100'>
                  Subject specialists · Doctors & Engineers · 5+ yrs exp.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMindSpark;
