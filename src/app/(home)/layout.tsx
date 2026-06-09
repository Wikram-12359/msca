import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MindSpark Coaching Academy",
  description: "Helping students achieve academic excellence",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="grow w-full h-full">{children}</main>

      <Footer />
    </>
  );
}