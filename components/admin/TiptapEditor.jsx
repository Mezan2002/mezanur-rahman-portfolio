"use client";
import { useEffect } from "react";

import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Highlighter,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Palette,
  Quote,
  Strikethrough,
  Underline as UnderlineIcon,
} from "lucide-react";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

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
    {
      icon: UnderlineIcon,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
      title: "Underline",
    },
    {
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      title: "Strike",
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
      icon: AlignLeft,
      action: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
      title: "Align Left",
    },
    {
      icon: AlignCenter,
      action: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
      title: "Align Center",
    },
    {
      icon: AlignRight,
      action: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
      title: "Align Right",
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
      icon: LinkIcon,
      action: setLink,
      isActive: editor.isActive("link"),
      title: "Link",
    },
    {
      icon: Highlighter,
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: editor.isActive("highlight"),
      title: "Highlight",
    },
    {
      icon: Palette,
      action: "color", // Special case
      isActive: false,
      title: "Text Color",
    },
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
    {
      icon: Minus,
      action: () => editor.chain().focus().setHorizontalRule().run(),
      isActive: false,
      title: "Horizontal Rule",
    },
    /* { type: "divider" },
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
    }, */
  ];

  return (
    <div className="flex flex-wrap gap-1.5 p-2 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl mb-6 sticky top-24 z-40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-max mx-auto items-center justify-center">
      {buttons.map((btn, index) => {
        if (btn.type === "divider") {
          return (
            <div
              key={index}
              className="w-px bg-white/10 mx-1.5 h-6 self-center"
            />
          );
        }

        if (btn.action === "color") {
          return (
            <div key={index} className="relative group/color">
              <input
                type="color"
                onInput={(event) =>
                  editor.chain().focus().setColor(event.target.value).run()
                }
                value={editor.getAttributes("textStyle").color || "#ffffff"}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                title="Text Color"
              />
              <button
                type="button"
                className="p-2.5 rounded-xl transition-all duration-300 text-gray-400 group-hover/color:text-white group-hover/color:bg-white/5"
              >
                <btn.icon size={16} strokeWidth={2.5} />
              </button>
            </div>
          );
        }

        return (
          <button
            key={index}
            type="button"
            onClick={btn.action}
            title={btn.title}
            className={`p-2.5 rounded-xl transition-all duration-300 ${
              btn.isActive
                ? "bg-primary text-black scale-110 shadow-[0_0_15px_rgba(180,255,0,0.3)]"
                : "text-gray-400 hover:text-white hover:bg-white/5 active:scale-95"
            }`}
          >
            <btn.icon size={16} strokeWidth={2.5} />
          </button>
        );
      })}
    </div>
  );
};

const TiptapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      Color,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: true }),
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

  // Update editor content when content prop changes (e.g. from AI generation)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="relative group">
      <MenuBar editor={editor} />
      <div className="min-h-[500px] relative">
        {/* Subtle glow effect behind editor */}
        <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000"></div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
