"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import type { Blog } from "../types";

type StatusFilter = "all" | "published" | "draft";
type Props = { blogs: Blog[]; loading: boolean; onEdit: (blog: Blog) => void; onDelete: (blog: Blog) => void };

export function ArticleList({ blogs, loading, onEdit, onDelete }: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs.filter((blog) => {
      if (status !== "all" && blog.status !== status) return false;
      if (!q) return true;
      return blog.title.toLowerCase().includes(q) || blog.category.toLowerCase().includes(q) || blog.tags.some((tag) => tag.toLowerCase().includes(q));
    });
  }, [blogs, query, status]);

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">All articles</h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zolix-dark/35" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, category, tag…"
              className="w-56 rounded-xl border border-zolix-dark/15 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-zolix-orange"
            />
          </div>
          <div className="flex rounded-xl border border-zolix-dark/15 bg-white p-1 text-xs font-bold">
            {(["all", "published", "draft"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setStatus(option)}
                className={`rounded-lg px-3 py-1.5 capitalize transition ${status === option ? "bg-zolix-dark text-white" : "text-zolix-dark/50 hover:text-zolix-dark"}`}
              >
                {option}
              </button>
            ))}
          </div>
          <span className="text-sm text-zolix-dark/50">{filtered.length} of {blogs.length}</span>
        </div>
      </div>
      {loading ? (
        <div className="grid gap-5 md:grid-cols-2">{[1, 2, 3, 4].map((i) => <div key={i} className="h-44 animate-pulse rounded-3xl bg-zolix-beige" />)}</div>
      ) : blogs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zolix-dark/20 p-14 text-center text-zolix-dark/55">No articles yet. Create the first one above.</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zolix-dark/20 p-14 text-center text-zolix-dark/55">No articles match your search.</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((blog) => <ArticleCard key={blog.id} blog={blog} onEdit={onEdit} onDelete={onDelete} />)}
        </div>
      )}
    </section>
  );
}
