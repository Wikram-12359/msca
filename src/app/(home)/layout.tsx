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
      <p className="text-white mx-auto w-full flex justify-center pb-1 bg-primary">
          Website created by: 
          <a className="text-blue-400 hover:border-blue-400 border-b border-transparent" href="https://www.linkedin.com/in/vishal-dewani/" target="_blank">
          Vishal Dewani
          </a>
      </p>
    </>
  );
}