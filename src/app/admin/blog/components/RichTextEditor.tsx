"use client";

import { memo, useEffect, useMemo, useRef, useState, type DragEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import { TextSelection } from "@tiptap/pm/state";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold, Italic, List, ListOrdered, Quote, Link as LinkIcon, ImagePlus, LoaderCircle,
  Heading1, Heading2, Heading3, Pilcrow, Maximize2, Minimize2,
} from "lucide-react";
import type { Blog } from "../types";

type Props = {
  value: string;
  onChange: (value: string) => void;
  token: string;
  posts: Blog[];
};

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function normalizeUrl(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.startsWith("/") || trimmed.startsWith("#")) return trimmed;
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function wordCount(text: string) {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function ToolbarButton({ active, disabled, onClick, title, children }: { active?: boolean; disabled?: boolean; onClick: () => void; title: string; children: ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg p-2 transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${active ? "bg-zolix-orange/15 text-zolix-orange" : "text-zolix-dark/70 hover:bg-white hover:text-zolix-dark"}`}
    >
      {children}
    </button>
  );
}

export const RichTextEditor = memo(function RichTextEditor({ value, onChange, token, posts }: Props) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkAsNewText, setLinkAsNewText] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkError, setLinkError] = useState("");
  const [expanded, setExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);

  async function uploadImageFile(file: File, onUploaded: (url: string) => void) {
    setUploadError("");
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setUploadError("Only JPEG, PNG, WebP, and GIF images are supported.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setUploadError("Images must be 5MB or smaller.");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/blog-images", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Image upload failed.");
      onUploaded(data.url as string);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  const extensions = useMemo(
    () => [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      TiptapLink.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer" } }),
      TiptapImage,
      Placeholder.configure({ placeholder: "Write your article…" }),
    ],
    [],
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: value,
    editorProps: {
      attributes: { class: "blog-content max-w-none p-5 text-sm leading-7 outline-none" },
      handleDrop(view, event, _slice, moved) {
        if (moved) return false;
        const files = Array.from(event.dataTransfer?.files ?? []).filter((file) => ALLOWED_IMAGE_TYPES.includes(file.type));
        if (!files.length) return false;
        event.preventDefault();
        const coords = view.posAtCoords({ left: event.clientX, top: event.clientY });
        const pos = coords?.pos ?? view.state.selection.from;
        files.forEach((file) => {
          void uploadImageFile(file, (url) => {
            const node = view.state.schema.nodes.image.create({ src: url });
            const tr = view.state.tr.insert(pos, node);
            tr.setSelection(TextSelection.create(tr.doc, pos + node.nodeSize));
            view.dispatch(tr);
            view.focus();
          });
        });
        return true;
      },
      handlePaste(view, event) {
        const files = Array.from(event.clipboardData?.files ?? []).filter((file) => ALLOWED_IMAGE_TYPES.includes(file.type));
        if (!files.length) return false;
        event.preventDefault();
        files.forEach((file) => {
          void uploadImageFile(file, (url) => {
            const insertPos = view.state.selection.from;
            const node = view.state.schema.nodes.image.create({ src: url });
            const tr = view.state.tr.insert(insertPos, node);
            tr.setSelection(TextSelection.create(tr.doc, insertPos + node.nodeSize));
            view.dispatch(tr);
            view.focus();
          });
        });
        return true;
      },
    },
    onUpdate({ editor: instance }) {
      onChange(instance.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value, { emitUpdate: false });
  }, [value, editor]);

  function openLinkEditor() {
    if (!editor) return;
    const { from, to, empty } = editor.state.selection;
    const existingHref = editor.getAttributes("link").href as string | undefined;
    setLinkAsNewText(empty);
    setLinkUrl(existingHref ?? "");
    setLinkText(empty ? "" : editor.state.doc.textBetween(from, to, " "));
    setLinkError("");
    setLinkOpen(true);
  }

  function applyLink() {
    if (!editor) return;
    const trimmed = linkUrl.trim();
    if (!trimmed) { setLinkError("Enter a web address or a path like /blog/your-post-slug."); return; }
    if (/\s/.test(trimmed)) { setLinkError("Web addresses can't contain spaces."); return; }
    const url = normalizeUrl(trimmed);
    if (linkAsNewText) {
      editor.chain().focus().insertContent({ type: "text", text: linkText.trim() || url, marks: [{ type: "link", attrs: { href: url } }] }).run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
    setLinkOpen(false);
  }

  function removeLink() {
    editor?.chain().focus().unsetLink().run();
    setLinkOpen(false);
  }

  function handleDragEnter(event: DragEvent<HTMLDivElement>) {
    dragDepth.current += 1;
    if (event.dataTransfer.types.includes("Files")) setDragActive(true);
  }

  function handleDragLeave() {
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setDragActive(false);
  }

  function handleDropCapture() {
    dragDepth.current = 0;
    setDragActive(false);
  }

  const text = editor?.getText() ?? "";

  const panel = (
    <>
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-zolix-dark/10 bg-zolix-beige/70 p-2 backdrop-blur">
        <ToolbarButton title="Normal text" active={editor?.isActive("paragraph")} onClick={() => editor?.chain().focus().setParagraph().run()}><Pilcrow size={15} /></ToolbarButton>
        <ToolbarButton title="Heading 1" active={editor?.isActive("heading", { level: 1 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 size={15} /></ToolbarButton>
        <ToolbarButton title="Heading 2" active={editor?.isActive("heading", { level: 2 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={15} /></ToolbarButton>
        <ToolbarButton title="Heading 3" active={editor?.isActive("heading", { level: 3 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={15} /></ToolbarButton>
        <div className="mx-1 h-5 w-px bg-zolix-dark/10" />
        <ToolbarButton title="Bold" active={editor?.isActive("bold")} onClick={() => editor?.chain().focus().toggleBold().run()}><Bold size={15} /></ToolbarButton>
        <ToolbarButton title="Italic" active={editor?.isActive("italic")} onClick={() => editor?.chain().focus().toggleItalic().run()}><Italic size={15} /></ToolbarButton>
        <div className="mx-1 h-5 w-px bg-zolix-dark/10" />
        <ToolbarButton title="Bulleted list" active={editor?.isActive("bulletList")} onClick={() => editor?.chain().focus().toggleBulletList().run()}><List size={15} /></ToolbarButton>
        <ToolbarButton title="Numbered list" active={editor?.isActive("orderedList")} onClick={() => editor?.chain().focus().toggleOrderedList().run()}><ListOrdered size={15} /></ToolbarButton>
        <ToolbarButton title="Quote" active={editor?.isActive("blockquote")} onClick={() => editor?.chain().focus().toggleBlockquote().run()}><Quote size={15} /></ToolbarButton>
        <div className="mx-1 h-5 w-px bg-zolix-dark/10" />
        <ToolbarButton title="Insert link" active={linkOpen || editor?.isActive("link")} onClick={openLinkEditor}><LinkIcon size={15} /></ToolbarButton>
        <ToolbarButton title="Insert image" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
          {uploading ? <LoaderCircle size={15} className="animate-spin" /> : <ImagePlus size={15} />}
        </ToolbarButton>
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_IMAGE_TYPES.join(",")}
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void uploadImageFile(file, (url) => {
              if (!editor) return;
              editor.chain().focus().setImage({ src: url }).run();
              editor.commands.setTextSelection(editor.state.selection.to);
            });
            event.target.value = "";
          }}
        />
        {uploading && <span className="ml-1 text-xs font-bold text-zolix-orange">Uploading image…</span>}
        <div className="ml-auto">
          <ToolbarButton title={expanded ? "Collapse editor" : "Expand editor"} onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </ToolbarButton>
        </div>
      </div>

      {uploadError && <p className="border-b border-zolix-dark/10 bg-red-50 px-4 py-2 text-xs font-bold text-red-600">{uploadError}</p>}

      {linkOpen && (
        <div className="border-b border-zolix-dark/10 bg-white p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {linkAsNewText && (
              <label className="text-xs font-bold text-zolix-dark/70">
                Link text
                <input
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. our cloud cost guide"
                  className="mt-1 w-full rounded-lg border border-zolix-dark/15 px-3 py-2 text-sm font-normal outline-none focus:border-zolix-orange"
                />
              </label>
            )}
            <label className={`text-xs font-bold text-zolix-dark/70 ${linkAsNewText ? "" : "sm:col-span-2"}`}>
              Web address
              <input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com or /blog/your-post-slug"
                className="mt-1 w-full rounded-lg border border-zolix-dark/15 px-3 py-2 text-sm font-normal outline-none focus:border-zolix-orange"
              />
            </label>
          </div>
          <p className="mt-2 text-xs text-zolix-dark/45">Paste any web address, or type a path like /blog/your-post-slug to link to a page on this site.</p>
          {linkError && <p className="mt-1 text-xs font-bold text-red-600">{linkError}</p>}
          {posts.length > 0 && (
            <div className="mt-3">
              <p className="mb-1 text-xs font-bold text-zolix-dark/50">Or link to an existing article:</p>
              <div className="flex max-h-28 flex-wrap gap-1.5 overflow-y-auto">
                {posts.map((post) => (
                  <button
                    key={post.id}
                    type="button"
                    onClick={() => setLinkUrl(`/blog/${post.slug}`)}
                    className="rounded-full border border-zolix-dark/10 bg-zolix-beige/60 px-3 py-1 text-xs font-medium text-zolix-dark/70 hover:border-zolix-orange hover:text-zolix-orange"
                  >
                    {post.title}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="mt-3 flex items-center gap-2">
            <button type="button" onClick={applyLink} className="rounded-lg bg-zolix-orange px-4 py-2 text-xs font-bold text-white hover:bg-zolix-orange/90">Insert link</button>
            {editor?.isActive("link") && (
              <button type="button" onClick={removeLink} className="rounded-lg border border-zolix-dark/15 px-4 py-2 text-xs font-bold text-zolix-dark/60 hover:text-zolix-dark">Remove link</button>
            )}
            <button type="button" onClick={() => setLinkOpen(false)} className="ml-auto text-xs font-bold text-zolix-dark/40 hover:text-zolix-dark">Cancel</button>
          </div>
        </div>
      )}

      <div className={`relative overflow-y-auto ${expanded ? "flex-1" : "max-h-[32rem] min-h-56"}`}>
        <EditorContent editor={editor} />
        {dragActive && (
          <div className="pointer-events-none absolute inset-2 flex items-center justify-center rounded-xl border-2 border-dashed border-zolix-orange bg-white/80">
            <p className="flex items-center gap-2 text-sm font-bold text-zolix-orange"><ImagePlus size={16} /> Drop image to upload</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-zolix-dark/10 bg-zolix-beige/40 px-4 py-2 text-xs font-bold text-zolix-dark/40">
        <span>{wordCount(text)} words</span>
        <span>Drag and drop, paste, or use the image button to add photos</span>
      </div>
    </>
  );

  const frameClassName = `bg-white shadow-sm transition-colors duration-200 focus-within:border-zolix-orange ${
    expanded ? "flex h-[80vh] w-[90vw] max-w-6xl flex-col overflow-hidden rounded-2xl border-2 shadow-xl" : "overflow-hidden rounded-2xl border-2"
  } ${dragActive ? "border-zolix-orange bg-zolix-orange/5" : "border-zolix-dark/15"}`;

  if (expanded && typeof document !== "undefined") {
    return createPortal(
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-zolix-dark/60 p-4">
        <div onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDropCapture={handleDropCapture} className={frameClassName}>
          {panel}
        </div>
      </div>,
      document.body,
    );
  }

  return (
    <div onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDropCapture={handleDropCapture} className={frameClassName}>
      {panel}
    </div>
  );
});
