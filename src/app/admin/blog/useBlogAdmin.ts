"use client";

import { useEffect, useState } from "react";
import { blankForm, type Blog, type BlogFormData } from "./types";
import type { ToastKind } from "./components/Toast";

const STORAGE_KEY = "zolix-blog-admin-token";

export function useBlogAdmin(notify: (kind: ToastKind, message: string) => void) {
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState<BlogFormData>(blankForm);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [authError, setAuthError] = useState("");

  const headers = (accessToken: string) => ({ "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` });

  async function load(accessToken = token) {
    setLoading(true);
    setAuthError("");
    let success = false;
    try {
      const response = await fetch("/api/blogs?admin=1", { headers: { Authorization: `Bearer ${accessToken}` } });
      success = response.ok;
      if (success) {
        setBlogs(await response.json());
      } else {
        const body = await response.json().catch(() => null);
        setAuthError(body?.error || `Could not load blogs (HTTP ${response.status}).`);
      }
    } catch {
      setAuthError("Couldn't reach the server. Check your connection and try again.");
    }
    setAuthenticated(success);
    if (!success) sessionStorage.removeItem(STORAGE_KEY);
    setLoading(false);
    return success;
  }

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time session restore on mount, not a render-triggered loop
    if (saved) { queueMicrotask(() => setToken(saved)); void load(saved); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function login(value: string) {
    setToken(value);
    void load(value).then((success) => { if (success) sessionStorage.setItem(STORAGE_KEY, value); });
  }

  function reset() { setEditing(null); setForm(blankForm); }

  function edit(blog: Blog) {
    setEditing(blog.id);
    setForm({
      title: blog.title, subtitle: blog.subtitle, content: blog.content, category: blog.category,
      tags: blog.tags, status: blog.status, featured: blog.featured, coverImage: blog.coverImage,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save() {
    setSaving(true);
    try {
      const response = await fetch(editing ? `/api/blogs/${editing}` : "/api/blogs", {
        method: editing ? "PUT" : "POST", headers: headers(token), body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        notify("error", data?.error || `Could not save blog (HTTP ${response.status}).`);
        return;
      }
      notify("success", form.status === "published" ? "Article published." : "Draft saved.");
      reset();
      await load();
    } catch {
      notify("error", "Couldn't reach the server. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(blog: Blog) {
    try {
      const response = await fetch(`/api/blogs/${blog.id}`, { method: "DELETE", headers: headers(token) });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        notify("error", body?.error || `Could not delete blog (HTTP ${response.status}).`);
        return;
      }
      notify("success", "Article deleted.");
      await load();
    } catch {
      notify("error", "Couldn't reach the server. Check your connection and try again.");
    }
  }

  return { token, authenticated, blogs, form, setForm, editing, loading, saving, authError, login, reset, edit, save, remove };
}
