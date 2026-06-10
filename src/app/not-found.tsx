import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-bold tracking-tight ">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        Sorry, the page you are looking for doesn&apos;t exist or may have been moved.
      </p>

      <Link
        href="/"
        className=" bg-primary text-white mt-8 rounded-lg border px-5 py-2 font-medium transition hover:bg-primary/80"
      >
        Back to Home
      </Link>
    </div>
  );
}