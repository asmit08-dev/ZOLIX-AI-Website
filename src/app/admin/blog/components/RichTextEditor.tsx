"use client";

import { useRef } from "react";
import { Bold, Heading2, Italic, List } from "lucide-react";

export function RichTextEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const editor = useRef<HTMLDivElement>(null);

  function format(command: string) {
    editor.current?.focus();
    document.execCommand(command);
    onChange(editor.current?.innerHTML || "");
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zolix-dark/15 bg-white transition focus-within:border-zolix-orange">
      <div className="flex gap-1 border-b border-zolix-dark/10 bg-zolix-beige/60 p-2">
        <button type="button" onClick={() => format("bold")} title="Bold" className="rounded-lg p-2 text-zolix-dark/70 hover:bg-white hover:text-zolix-dark">
          <Bold size={15} />
        </button>
        <button type="button" onClick={() => format("italic")} title="Italic" className="rounded-lg p-2 text-zolix-dark/70 hover:bg-white hover:text-zolix-dark">
          <Italic size={15} />
        </button>
        <button type="button" onClick={() => format("formatBlock")} title="Heading" className="rounded-lg p-2 text-zolix-dark/70 hover:bg-white hover:text-zolix-dark">
          <Heading2 size={15} />
        </button>
        <button type="button" onClick={() => format("insertUnorderedList")} title="Bulleted list" className="rounded-lg p-2 text-zolix-dark/70 hover:bg-white hover:text-zolix-dark">
          <List size={15} />
        </button>
      </div>
      <div
        ref={editor}
        contentEditable
        suppressContentEditableWarning
        onInput={() => onChange(editor.current?.innerHTML || "")}
        dangerouslySetInnerHTML={{ __html: value }}
        className="min-h-56 p-5 text-sm leading-7 outline-none [&:empty]:before:text-zolix-dark/30 [&:empty]:before:content-[attr(data-placeholder)]"
        data-placeholder="Write your article…"
      />
    </div>
  );
}
