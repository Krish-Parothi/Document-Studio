'use client';

import { useState, useRef, useEffect } from "react";
import { generateDocument, downloadDocument, triggerDownload, StyleParams, checkHealth } from "@/lib/api";
import { ParameterInput } from "@/components/parameter-input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import styles from "./generate.module.css";

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
}

export default function GeneratePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "ai",
      content: "Hello! I'm your Document Agent. I can help you generate PDFs, Word documents, and Excel spreadsheets. What would you like to create today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [styleParams, setStyleParams] = useState<StyleParams>({});
  const [generatedFileName, setGeneratedFileName] = useState<string | null>(null);
  const [generatedDocType, setGeneratedDocType] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    checkHealth().then((health) => {
      setIsConnected(health.groq_connected === true);
    });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !isConnected) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setIsLoading(true);

    try {
      const response = await generateDocument({
        prompt: input,
        style_params: styleParams,
      });

      if (response.success && response.file_name) {
        setGeneratedFileName(response.file_name);
        setGeneratedDocType(response.doc_type || "document");

        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: `I've successfully generated a ${response.doc_type || "document"} for you. You can download it using the button below.`,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: `I encountered an error: ${response.error || "Failed to generate document"}`,
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: `Error: ${error instanceof Error ? error.message : "Failed to generate document"}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedFileName) return;

    try {
      setIsLoading(true);
      const blob = await downloadDocument(generatedFileName);
      triggerDownload(blob, generatedFileName);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (e.target) {
      e.target.style.height = "auto";
      e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
    }
  };

  return (
    <div className={`${styles.container} fade-in`}>
      {/* Chat / Prompt Area */}
      <div className={styles.chatArea}>
        <div className={styles.chatHistory}>
          {messages.map((msg) => (
            <div key={msg.id} className={`${styles.message} ${styles[msg.role]}`}>
              <div className={styles.avatar}>
                {msg.role === "ai" ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                    <path d="M12 12 2.1 7.1"></path>
                    <path d="M12 12l9.9 4.9"></path>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                )}
              </div>
              <div className={styles.messageContent}>{msg.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.message} ${styles.ai}`}>
              <div className={styles.avatar}>
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
              <div className={styles.messageContent}>Generating document...</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Parameter Input */}
        <div className={styles.parametersArea}>
          <ParameterInput onParamsChange={setStyleParams} />
        </div>

        {/* Input Area */}
        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <textarea
              ref={textareaRef}
              className={styles.textarea}
              placeholder={isConnected ? "Describe the document you want to create..." : "Backend is not connected..."}
              rows={1}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading || !isConnected}
            />
            <button
              className={styles.sendButton}
              onClick={handleSend}
              disabled={isLoading || !isConnected || !input.trim()}
              title="Send (Enter to send)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
          {!isConnected && <p className="text-sm text-red-500 mt-2">Backend API is not connected</p>}
        </div>
      </div>

      {/* Document View Area */}
      <div className={styles.artifactArea}>
        {generatedFileName ? (
          <>
            <div className={styles.artifactHeader}>
              <div className={styles.artifactTitle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                {generatedFileName}
              </div>
              <Button
                onClick={handleDownload}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Download {generatedDocType?.toUpperCase()}
              </Button>
            </div>
            <div className={styles.artifactContent}>
              <div style={{ textAlign: "center", color: "#888", padding: "2rem" }}>
                <p style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.5rem" }}>Document Ready</p>
                <p>Type: <strong>{generatedDocType?.toUpperCase()}</strong></p>
                <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>Click the Download button to save your document</p>
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#888" }}>
            <div style={{ textAlign: "center" }}>
              <p>Generated documents will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
