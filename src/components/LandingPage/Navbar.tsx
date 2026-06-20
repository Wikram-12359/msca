"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === "admin";

  const LINKS = [
    {
      name: session?.user ? "Dashboard" : "Home",
      link: session?.user ? "/dashboard" : "/",
    },
    {
      name: "Courses",
      link: "#courses"
    }
  ]

  return (
    <nav className='sticky top-0 z-50 bg-white border-b border-gray-200'>
      <div className='max-w-6xl mx-auto px-7 flex items-center justify-between h-16'>
        <Link href='/' className='flex items-center gap-2.5 no-underline'>
          <div className='w-9 h-9 bg-primary rounded-lg flex items-center justify-center'>
            <Image
              src='/images/logo.jpeg'
              alt='Mindspark Logo'
              width={36}
              height={36}
            />
          </div>
          <div className='leading-none'>
            <span className='block font-black text-[15px] text-primary tracking-tight'>
              MINDSPARK
            </span>
            <span className='block text-[9px] font-bold text-[#1A6B44] uppercase tracking-widest'>
              Coaching Academy
            </span>
          </div>
        </Link>
        <ul className='hidden md:flex gap-7 list-none'>
          {LINKS.map((l) => (
            <li className="cursor-pointer" key={l.name}>
              <a
                href={l.link}
                className='text-gray-500 text-sm font-medium hover:text-primary no-underline transition-colors'
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>
        <Button
          onClick={() => router.push("/login")}
          className='px-6 py-5 rounded-full cursor-pointer'
          variant={"outline"}
        >
          Login
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
