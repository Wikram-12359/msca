"use client"
// components/landing/Hero.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export function Hero() {
      const { data: session } = authClient.useSession();
    
  return (
    <section className="px-4 md:pt-20 pb-16 max-w-4xl flex md:flex-row flex-col items-center gap-4">
      <div className="md:order-1 order-2">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-5">
        Pakistan · MDCAT · ECAT · Admissions
        </p>
        <h1 className="text-5xl md:text-6xl font-medium font-serif leading-[1.08] tracking-tight mb-5">
          Learn with clarity.<br />
          Score with confidence.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-10">
          Concept-based coaching for MDCAT, ECAT, and university admissions.
          No ratta system.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link href={session?.user ? "/dashboard" : "/register"}>
            <Button size="lg" className="rounded-full px-6">
              {session?.user ? "Dashboard" : "Start enrollment"}
            </Button>
          </Link>
          {!session?.user && (
            <Link href="/login">
                <Button size="lg" variant="outline" className="rounded-full px-6">
                Login
                </Button>
            </Link>
          ) }
        </div>
      </div>

      <div className="md:order-2 order-1 my-10">
        <Image src="images/main.svg" width={450} height={450}  alt="Hero Image" />
      </div>
    </section>
  );
}