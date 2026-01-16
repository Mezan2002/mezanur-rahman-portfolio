"use client";

import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
} from "lucide-react";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const buttons = [
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      title: "Bold",
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      title: "Italic",
    },
    { type: "divider" },
    {
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
      title: "H1",
    },
    {
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
      title: "H2",
    },
    { type: "divider" },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      title: "Bullet List",
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      title: "Ordered List",
    },
    { type: "divider" },
    {
      icon: Code,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive("codeBlock"),
      title: "Code Block",
    },
    {
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
      title: "Quote",
    },
    { type: "divider" },
    {
      icon: Undo,
      action: () => editor.chain().focus().undo().run(),
      isActive: false,
      title: "Undo",
    },
    {
      icon: Redo,
      action: () => editor.chain().focus().redo().run(),
      isActive: false,
      title: "Redo",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-xl mb-6 sticky top-24 z-40 shadow-2xl w-fit mx-auto">
      {buttons.map((btn, index) =>
        btn.type === "divider" ? (
          <div key={index} className="w-px bg-white/10 mx-2 h-6 self-center" />
        ) : (
          <button
            key={index}
            type="button"
            onClick={btn.action}
            title={btn.title}
            className={`p-2 rounded-lg transition-all duration-200 ${
              btn.isActive
                ? "bg-primary text-black shadow-[0_0_10px_rgba(180,255,0,0.5)]"
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <btn.icon size={18} strokeWidth={2.5} />
          </button>
        )
      )}
    </div>
  );
};

const TiptapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary hover:text-white underline cursor-pointer",
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[500px] prose prose-invert prose-lg max-w-none",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className="relative">
      <MenuBar editor={editor} />
      <div className="min-h-[500px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
