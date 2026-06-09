"use client"
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <section className='bg-primary py-16'>
      <div className='max-w-6xl mx-auto px-7 flex justify-between items-center flex-wrap gap-7'>
        <div>
          <h2 className='text-3xl lg:text-4xl font-black text-white mb-1.5'>
            Admissions Open Now.
          </h2>
          <p className='text-green-300 text-base'>
            Join Mindspark and build the future you deserve — one concept at a
            time.
          </p>
        </div>
        <div className='flex gap-3 flex-wrap'>
          <Button
            onClick={() => router.push("/login")}
            className='px-4 py-5 rounded-full'
            variant={"secondary"}
          >
            Enroll Today <ArrowRight size={16} />
          </Button>
          <Button
            onClick={()=> router.push("/login")}
            className='px-4 py-5 rounded-full'
            variant={"secondary"}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Footer;
