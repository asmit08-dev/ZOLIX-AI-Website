"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

export default function BlogLikeButton({ slug, initialLikes }: { slug: string; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  async function like() {
    if (liked || loading) return;
    setLoading(true);
    const response = await fetch(`/api/blogs/${slug}/like`, { method: "POST" });
    if (response.ok) { const data = await response.json(); setLikes(data.likes); setLiked(true); }
    setLoading(false);
  }
  return <button onClick={like} disabled={liked || loading} className="inline-flex items-center gap-2 rounded-full border border-zolix-dark/10 px-4 py-2 text-sm font-bold transition hover:border-zolix-orange hover:text-zolix-orange disabled:cursor-default disabled:text-zolix-orange" aria-label="Like this article"><Heart size={16} fill={liked ? "currentColor" : "none"} />{likes} {likes === 1 ? "like" : "likes"}</button>;
}
