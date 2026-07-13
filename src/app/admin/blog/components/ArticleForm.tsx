"use client";

import { FormEvent } from "react";
import { LoaderCircle, Save, Send, X } from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";
import type { BlogFormData } from "../types";

type Props = {
  form: BlogFormData;
  setForm: (form: BlogFormData) => void;
  editing: boolean;
  saving: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};

export function ArticleForm({ form, setForm, editing, saving, onSubmit, onCancel }: Props) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="mb-12 rounded-[28px] border border-zolix-dark/10 bg-white p-5 shadow-sm md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">{editing ? "Edit article" : "Create an article"}</h2>
        {editing && (
          <button type="button" onClick={onCancel} className="text-sm font-bold text-zolix-dark/50 hover:text-zolix-dark">
            <X size={16} className="mr-1 inline" />Cancel
          </button>
        )}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm font-bold">
          Cover image URL
          <input
            value={form.coverImage.url}
            onChange={(e) => setForm({ ...form, coverImage: { ...form.coverImage, url: e.target.value } })}
            placeholder="https://…"
            className="mt-2 w-full rounded-xl border border-zolix-dark/15 px-4 py-3 font-normal outline-none focus:border-zolix-orange"
          />
        </label>
        <label className="text-sm font-bold">
          Cover image alt text
          <input
            value={form.coverImage.alt}
            onChange={(e) => setForm({ ...form, coverImage: { ...form.coverImage, alt: e.target.value } })}
            placeholder="Describe the image"
            className="mt-2 w-full rounded-xl border border-zolix-dark/15 px-4 py-3 font-normal outline-none focus:border-zolix-orange"
          />
        </label>
        {form.coverImage.url && (
          <div className="md:col-span-2">
            <img
              src={form.coverImage.url}
              alt=""
              className="h-32 w-full rounded-xl border border-zolix-dark/10 object-cover bg-zolix-beige"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              onLoad={(e) => { (e.target as HTMLImageElement).style.display = "block"; }}
            />
          </div>
        )}
        <label className="text-sm font-bold md:col-span-2">
          Title
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-2 w-full rounded-xl border border-zolix-dark/15 px-4 py-3 font-normal outline-none focus:border-zolix-orange" />
        </label>
        <label className="text-sm font-bold md:col-span-2">
          Subtitle <span className="font-normal text-zolix-dark/40">(optional)</span>
          <input value={form.subtitle || ""} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="mt-2 w-full rounded-xl border border-zolix-dark/15 px-4 py-3 font-normal outline-none focus:border-zolix-orange" />
        </label>
        <label className="text-sm font-bold">
          Category
          <input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Engineering" className="mt-2 w-full rounded-xl border border-zolix-dark/15 px-4 py-3 font-normal outline-none focus:border-zolix-orange" />
        </label>
        <label className="text-sm font-bold">
          Tags <span className="font-normal text-zolix-dark/40">(comma separated)</span>
          <input
            value={form.tags.join(", ")}
            onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((tag) => tag.trim()).filter(Boolean) })}
            placeholder="Next.js, React"
            className="mt-2 w-full rounded-xl border border-zolix-dark/15 px-4 py-3 font-normal outline-none focus:border-zolix-orange"
          />
        </label>
      </div>
      <label className="mt-5 block text-sm font-bold">
        Content
        <RichTextEditor value={form.content} onChange={(content) => setForm({ ...form, content })} />
      </label>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <label className="flex items-center gap-2 text-sm font-bold">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="h-4 w-4 accent-zolix-orange" /> Featured
        </label>
        <label className="flex items-center gap-2 text-sm font-bold">
          Status
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })} className="rounded-lg border border-zolix-dark/15 bg-white px-3 py-2">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <button disabled={saving} className="ml-auto inline-flex items-center gap-2 rounded-xl bg-zolix-orange px-5 py-3 text-sm font-bold text-white transition hover:bg-zolix-orange/90 disabled:opacity-60">
          {saving ? <LoaderCircle className="animate-spin" size={16} /> : form.status === "published" ? <Send size={16} /> : <Save size={16} />}
          {saving ? "Saving…" : form.status === "published" ? "Publish" : "Save draft"}
        </button>
      </div>
    </form>
  );
}
