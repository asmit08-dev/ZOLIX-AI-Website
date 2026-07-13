import Link from "next/link";
import { Edit3, ExternalLink, ImageOff, Star, Trash2 } from "lucide-react";
import type { Blog } from "../types";

const dateFmt = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" });

function displayDate(blog: Blog) {
  return blog.publishedAt
    ? { label: "Published", value: dateFmt.format(new Date(blog.publishedAt)) }
    : { label: "Created", value: dateFmt.format(new Date(blog.createdAt)) };
}

type Props = { blog: Blog; onEdit: (blog: Blog) => void; onDelete: (blog: Blog) => void };

export function ArticleCard({ blog, onEdit, onDelete }: Props) {
  const { label, value } = displayDate(blog);
  return (
    <article className="flex overflow-hidden rounded-3xl border border-zolix-dark/10 bg-white transition hover:shadow-md">
      {blog.coverImage.url ? (
        <img src={blog.coverImage.url} alt="" className="h-auto w-28 shrink-0 object-cover bg-zolix-beige" />
      ) : (
        <div className="flex h-auto w-28 shrink-0 items-center justify-center bg-zolix-beige text-zolix-dark/25">
          <ImageOff size={20} />
        </div>
      )}
      <div className="min-w-0 flex-1 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-widest ${blog.status === "published" ? "bg-green-100 text-green-700" : "bg-zolix-beige text-zolix-dark/50"}`}>
            {blog.status}
          </span>
          {blog.featured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zolix-orange">
              <Star size={12} fill="currentColor" />Featured
            </span>
          )}
        </div>
        <h3 className="mt-3 truncate font-bold">{blog.title}</h3>
        <p className="mt-1 text-xs text-zolix-dark/45">
          {blog.category} · {label} {value}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button onClick={() => onEdit(blog)} className="inline-flex items-center gap-1 rounded-lg bg-zolix-beige px-3 py-2 text-xs font-bold transition hover:bg-zolix-dark/10">
            <Edit3 size={13} /> Edit
          </button>
          <button onClick={() => onDelete(blog)} className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50">
            <Trash2 size={13} /> Delete
          </button>
          {blog.status === "published" && (
            <Link href={`/blog/${blog.slug}`} target="_blank" className="ml-auto inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-zolix-dark/50 transition hover:bg-zolix-beige">
              <ExternalLink size={13} /> View live
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
