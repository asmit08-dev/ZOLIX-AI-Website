"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

export function LoginGate({ onSubmit, loading, error }: { onSubmit: (token: string) => void; loading: boolean; error: string }) {
  const [value, setValue] = useState("");
  const [reveal, setReveal] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(value);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zolix-beige px-6 pb-20 pt-36">
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-md rounded-[32px] bg-white p-8 shadow-xl"
      >
        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-zolix-orange/10 text-zolix-orange">
          <LockKeyhole size={20} />
        </div>
        <h1 className="text-3xl font-bold">Blog administration</h1>
        <p className="mt-3 text-sm leading-6 text-zolix-dark/60">
          Enter the administrator token configured as <code className="rounded bg-zolix-beige px-1.5 py-0.5">BLOG_ADMIN_TOKEN</code>.
        </p>
        <div className="relative mt-6">
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            type={reveal ? "text" : "password"}
            required
            autoFocus
            placeholder="Administrator token"
            className="w-full rounded-xl border border-zolix-dark/15 px-4 py-3 pr-11 outline-none focus:border-zolix-orange"
          />
          <button
            type="button"
            onClick={() => setReveal((current) => !current)}
            aria-label={reveal ? "Hide token" : "Show token"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zolix-dark/40 hover:text-zolix-dark"
          >
            {reveal ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
        <button disabled={loading} className="mt-4 w-full rounded-xl bg-zolix-dark py-3 text-sm font-bold text-white transition hover:bg-zolix-dark/90 disabled:opacity-60">
          {loading ? "Checking…" : "Continue"}
        </button>
        {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}
      </motion.form>
    </main>
  );
}
