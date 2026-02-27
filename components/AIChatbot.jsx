"use client";

import gsap from "gsap";
import parse from "html-react-parser";
import { Loader2, Send, User, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Mezan's AI assistant. Ready to chat? 💎",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const blobRef = useRef(null);

  const scrollToBottom = (instant = false) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: instant ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle auto-scroll when chat opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow GSAP open animation to finish
      const timer = setTimeout(() => {
        scrollToBottom(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Helper to convert Markdown-like formatting (**, *, -, 1.) to HTML for parsing
  const formatMessage = (content) => {
    if (!content) return "";

    // Split by double newlines to identify potential structural blocks
    const blocks = content.split(/\n\n+/);

    const formattedBlocks = blocks.map((block) => {
      const trimmedBlock = block.trim();
      if (!trimmedBlock) return "";

      const lines = trimmedBlock.split("\n");
      const isBulletedList = lines.every((line) => /^\s*-\s+(.*)$/.test(line));
      const isNumberedList = lines.every((line) =>
        /^\s*\d+\.\s+(.*)$/.test(line),
      );

      if (isBulletedList || isNumberedList) {
        const listItems = lines
          .map((line) => {
            const itemContent = line.replace(/^\s*(?:-|\d+\.)\s+(.*)$/, "$1");
            const inlineFormatted = itemContent
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\*(.*?)\*/g, "<em>$1</em>");
            return `<li>${inlineFormatted}</li>`;
          })
          .join("");

        return isNumberedList
          ? `<ol>${listItems}</ol>`
          : `<ul>${listItems}</ul>`;
      }

      // If not a list, it's a paragraph block. Apply inline formatting.
      const inlineFormatted = trimmedBlock
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/\n/g, "<br />");

      return `<p>${inlineFormatted}</p>`;
    });

    return formattedBlocks.join("");
  };

  useEffect(() => {
    // Load messages from localStorage on mount
    const storedMessages = localStorage.getItem("mezan_ai_chat_history");
    if (storedMessages) {
      try {
        // Use atob to decode and parse the JSON string
        // We use decodeURIComponent(escape()) to handle Unicode characters correctly with atob
        const decodedMessages = JSON.parse(
          decodeURIComponent(escape(window.atob(storedMessages))),
        );
        if (Array.isArray(decodedMessages) && decodedMessages.length > 0) {
          setMessages(decodedMessages);
        }
      } catch (error) {
        console.error("Failed to load chat history:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Save messages to localStorage whenever they change
    // We skip saving if it's just the initial greeting and localStorage is empty
    if (
      messages.length === 1 &&
      messages[0].role === "assistant" &&
      !localStorage.getItem("mezan_ai_chat_history")
    ) {
      return;
    }

    try {
      // Use btoa to encode the JSON string
      // We use unescape(encodeURIComponent()) to handle Unicode characters correctly with btoa
      const encodedMessages = window.btoa(
        unescape(encodeURIComponent(JSON.stringify(messages))),
      );
      localStorage.setItem("mezan_ai_chat_history", encodedMessages);
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  }, [messages]);

  useEffect(() => {
    // Initial floating animation for the blob
    if (blobRef.current) {
      gsap.to(blobRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      gsap.fromTo(
        chatRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power4.out" },
      );
    } else {
      gsap.to(chatRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setIsOpen(false),
      });
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. 💎",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-4 pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="pointer-events-auto w-[350px] md:w-[400px] h-[500px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden flex flex-col shadow-2xl origin-bottom-right"
        >
          {/* Header */}
          <div className="p-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-primary/30 overflow-hidden bg-primary flex items-center justify-center text-primary group">
                <Image
                  src="/images/mezan.png"
                  alt="Mezan AI"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-syne font-bold text-sm uppercase tracking-wider">
                  Mezan AI
                </h3>
                <span className="text-[10px] text-primary font-mono uppercase tracking-[2px]">
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center overflow-hidden ${msg.role === "user" ? "bg-primary text-black" : "bg-white text-white"}`}
                  >
                    {msg.role === "user" ? (
                      <User size={16} />
                    ) : (
                      <Image
                        src="/images/mezan.png"
                        alt="Mezan AI"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div
                    className={`p-4 rounded-3xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-black font-medium rounded-tr-none"
                        : "bg-white/5 text-gray-300 border border-white/5 rounded-tl-none stylish-markdown"
                    }`}
                  >
                    {msg.role === "assistant"
                      ? parse(formatMessage(msg.content))
                      : msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white overflow-hidden">
                    <Image
                      src="/images/mezan.png"
                      alt="Mezan AI"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-white/5 rounded-3xl rounded-tl-none border border-white/5 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-primary" />
                    <span className="text-xs text-gray-500 font-mono italic">
                      Mezan AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-6 bg-white/5 border-t border-white/10 flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Trigger Button */}
      <div className="pointer-events-auto group">
        <div
          ref={blobRef}
          onClick={handleToggle}
          className="cursor-pointer size-14 bg-primary backdrop-blur-md border border-primary/30 rounded-full flex items-center justify-center overflow-hidden text-black transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] z-20 relative"
        >
          {isOpen ? (
            <X size={32} className="rotate-180" />
          ) : (
            <Image
              src="/images/panda-3.gif"
              alt="Mezan AI"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .stylish-markdown p {
          margin-bottom: 12px;
        }
        .stylish-markdown p:last-child {
          margin-bottom: 0;
        }
        .stylish-markdown ul,
        .stylish-markdown ol {
          margin-top: 8px;
          margin-bottom: 12px;
          padding-left: 0;
        }
        .stylish-markdown ol {
          list-style-type: decimal;
          padding-left: 20px;
        }
        .stylish-markdown ol li {
          padding-left: 5px;
          margin-bottom: 6px;
          color: #d1d5db;
        }
        .stylish-markdown ol li::marker {
          color: rgba(var(--primary-rgb), 1);
          font-weight: bold;
        }
        .stylish-markdown li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 4px;
        }
        .stylish-markdown ul li::before {
          content: "▹";
          position: absolute;
          left: 0;
          color: rgba(var(--primary-rgb), 1);
          font-weight: bold;
        }
        .stylish-markdown strong {
          color: white;
          font-weight: 700;
          letter-spacing: 0.01em;
        }
        .stylish-markdown em {
          color: rgba(var(--primary-rgb), 0.9);
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
