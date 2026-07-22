import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Sparkles } from "lucide-react";
import { getBlogs } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("/blog");
export const dynamic = "force-dynamic";

const date = (value: string | null) => value ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value)) : "Recently published";

export default async function BlogPage() {
  const blogs = await getBlogs(true);
  return <main className="min-h-screen bg-white px-6 pb-28 pt-40"><div className="mx-auto max-w-7xl">
      <div className="mb-16 max-w-3xl"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zolix-dark/10 bg-zolix-beige px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zolix-orange"><Sparkles size={14} /> ZOLIX journal</div><h1 className="text-5xl font-extrabold tracking-tighter md:text-8xl">The Blog.</h1><p className="mt-7 text-lg font-medium leading-relaxed text-zolix-dark/55 md:text-xl">Ideas, engineering deep-dives, and practical intelligence for more efficient cloud operations.</p></div>
      {blogs.length === 0 ? <div className="rounded-[36px] border border-dashed border-zolix-dark/15 bg-zolix-beige/50 px-8 py-24 text-center"><h2 className="text-2xl font-bold">New stories are on their way.</h2><p className="mt-3 text-zolix-dark/55">Check back soon for the latest from ZOLIX.</p></div> : <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{blogs.map((blog) => {
        const isDefaultLogo = blog.coverImage.url === "/assets/logo.webp";
        return <article key={blog.id} className="group flex overflow-hidden rounded-[32px] border border-zolix-dark/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"><Link href={`/blog/${blog.slug}`} className="flex w-full flex-col"><div className="relative h-52 overflow-hidden bg-zolix-beige"><Image src={blog.coverImage.url} alt={blog.coverImage.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className={`transition duration-500 group-hover:scale-105 ${isDefaultLogo ? "object-contain p-5" : "object-cover object-top"}`} />{blog.featured && <span className="absolute left-4 top-4 rounded-full bg-zolix-orange px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white">Featured</span>}</div><div className="flex flex-1 flex-col p-7"><div className="mb-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zolix-orange"><span>{blog.category}</span><span className="inline-flex items-center gap-1 text-zolix-dark/40"><CalendarDays size={12}/>{date(blog.publishedAt)}</span></div><h2 className="text-2xl font-bold leading-tight tracking-tight">{blog.title}</h2>{blog.subtitle && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zolix-dark/55">{blog.subtitle}</p>}</div></Link></article>;
      })}</div>}
    </div></main>;
}
