import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { getBlogBySlug } from "@/lib/blog";
import { faqSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

// Published articles are managed in the database, so this route must not be
// generated from the legacy catch-all content or cached as a static page.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> { const blog = await getBlogBySlug((await params).slug); return blog ? { title: blog.seo.title, description: blog.seo.description, openGraph: { type: "article", title: blog.seo.title, description: blog.seo.description, images: [blog.coverImage.url] } } : {}; }
export default async function BlogDetailPage({ params }: Props) { const blog = await getBlogBySlug((await params).slug); if (!blog) notFound(); const published = blog.publishedAt && new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(blog.publishedAt)); return <main className="min-h-screen bg-white px-6 pb-28 pt-40">{blog.faqs.length > 0 && <JsonLd data={faqSchema(blog.faqs)} />}<article className="mx-auto max-w-4xl"><Link href="/blog" className="mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zolix-orange"><ArrowLeft size={15}/> All articles</Link><div className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-zolix-orange">{blog.category}</div><h1 className="text-4xl font-extrabold leading-[.95] tracking-tighter md:text-7xl">{blog.title}</h1>{blog.subtitle && <p className="mt-7 text-xl font-medium leading-relaxed text-zolix-dark/60 md:text-2xl">{blog.subtitle}</p>}<div className="my-9 flex flex-wrap items-center gap-4 border-y border-zolix-dark/10 py-5 text-sm text-zolix-dark/50"><span className="inline-flex items-center gap-2"><CalendarDays size={16}/>{published}</span></div><div className="mb-12 aspect-[16/8] w-full overflow-hidden rounded-[32px] bg-zolix-beige p-6 md:p-10"><img src={blog.coverImage.url} alt={blog.coverImage.alt} className="h-full w-full object-contain"/></div><div className="blog-content text-lg leading-8 text-zolix-dark/75" dangerouslySetInnerHTML={{ __html: blog.content }}/></article>{blog.faqs.length > 0 && <div className="mx-auto mt-20 max-w-4xl"><FAQ items={blog.faqs} title="Frequently asked questions" intro="Everything you need to know about this topic." variant="article" /></div>}</main>; }
