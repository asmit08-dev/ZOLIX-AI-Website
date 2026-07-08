import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-zolix-beige">
      <div className="text-[120px] font-bold tracking-tighter text-zolix-orange leading-none mb-8">404</div>
      <h1 className="text-4xl font-bold mb-6 tracking-tight">Resource Not Found</h1>
      <p className="text-lg text-gray-500 mb-12 max-w-md font-medium">
        The technical guide or article you are looking for is not currently in our infrastructure.
      </p>
      <Link href="/" className="bg-zolix-dark text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-zolix-orange transition-all">
        Back to Home
      </Link>
    </div>
  );
}
