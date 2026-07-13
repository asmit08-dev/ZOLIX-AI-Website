"use client";

import { useState } from "react";
import { FilePlus2 } from "lucide-react";
import { useBlogAdmin } from "./useBlogAdmin";
import { LoginGate } from "./components/LoginGate";
import { ArticleForm } from "./components/ArticleForm";
import { ArticleList } from "./components/ArticleList";
import { ConfirmDialog, type ConfirmState } from "./components/ConfirmDialog";
import { ToastStack, useToasts } from "./components/Toast";
import type { Blog } from "./types";

export default function BlogAdminPage() {
  const { toasts, push, dismiss } = useToasts();
  const admin = useBlogAdmin(push);
  const [confirm, setConfirm] = useState<ConfirmState>(null);

  function requestDelete(blog: Blog) {
    setConfirm({
      title: "Delete article?",
      message: `“${blog.title}” will be permanently removed. This cannot be undone.`,
      onConfirm: () => admin.remove(blog),
    });
  }

  if (!admin.authenticated) {
    return (
      <>
        <LoginGate onSubmit={admin.login} loading={admin.loading} error={admin.authError} />
        <ToastStack toasts={toasts} dismiss={dismiss} />
      </>
    );
  }

  const stats = {
    total: admin.blogs.length,
    published: admin.blogs.filter((blog) => blog.status === "published").length,
    draft: admin.blogs.filter((blog) => blog.status === "draft").length,
    featured: admin.blogs.filter((blog) => blog.featured).length,
  };

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-4 pb-20 pt-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zolix-orange">Content studio</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Manage the blog</h1>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">{stats.total} total</span>
              <span className="rounded-full bg-green-50 px-3 py-1.5 text-green-700">{stats.published} published</span>
              <span className="rounded-full bg-zolix-beige px-3 py-1.5 text-zolix-dark/60">{stats.draft} draft</span>
              <span className="rounded-full bg-orange-50 px-3 py-1.5 text-zolix-orange">{stats.featured} featured</span>
            </div>
          </div>
          <button onClick={admin.reset} className="inline-flex items-center gap-2 rounded-xl bg-zolix-dark px-5 py-3 text-sm font-bold text-white transition hover:bg-zolix-dark/90">
            <FilePlus2 size={16} /> New article
          </button>
        </div>

        <ArticleForm
          form={admin.form}
          setForm={admin.setForm}
          editing={Boolean(admin.editing)}
          saving={admin.saving}
          onSubmit={admin.save}
          onCancel={admin.reset}
          token={admin.token}
          posts={admin.blogs}
        />

        <ArticleList blogs={admin.blogs} loading={admin.loading} onEdit={admin.edit} onDelete={requestDelete} />
      </div>

      <ConfirmDialog state={confirm} onClose={() => setConfirm(null)} />
      <ToastStack toasts={toasts} dismiss={dismiss} />
    </main>
  );
}
