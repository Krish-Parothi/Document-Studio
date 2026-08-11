import styles from "./generate.module.css";

export default function GeneratePage() {
  return (
    <div className={`${styles.container} fade-in`}>
      {/* Chat / Prompt Area */}
      <div className={styles.chatArea}>
        <div className={styles.chatHistory}>
          {/* AI Welcome Message */}
          <div className={`${styles.message} ${styles.ai}`}>
            <div className={styles.avatar}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12 2.1 7.1"></path><path d="M12 12l9.9 4.9"></path></svg>
            </div>
            <div className={styles.messageContent}>
              <p>👋 Hello! I'm your Document Agent powered by AI. I can help you:</p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem', fontSize: '0.95rem' }}>
                <li>✨ Draft proposals, contracts, and NDAs</li>
                <li>📋 Summarize and extract insights from documents</li>
                <li>✅ Review for compliance and legal issues</li>
                <li>🎯 Create any kind of document you need</li>
              </ul>
              <p style={{ marginTop: '0.75rem' }}>What would you like to create or work on today?</p>
            </div>
          </div>

          {/* Example User Message */}
          <div className={`${styles.message} ${styles.user}`}>
            <div className={styles.avatar}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div className={styles.messageContent}>
              Can you draft a Non-Disclosure Agreement for a new software project? It should be between Document Studio Inc. and Acme Corp.
            </div>
          </div>

          {/* Example AI Response */}
          <div className={`${styles.message} ${styles.ai}`}>
            <div className={styles.avatar}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12 2.1 7.1"></path><path d="M12 12l9.9 4.9"></path></svg>
            </div>
            <div className={styles.messageContent}>
              <p>✅ Perfect! I've generated a comprehensive Mutual Non-Disclosure Agreement tailored for your software project between Document Studio Inc. and Acme Corp.</p>
              <p style={{ marginTop: '0.75rem' }}>The document includes:</p>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem', fontSize: '0.95rem' }}>
                <li>Definition of Confidential Information</li>
                <li>Obligations and restrictions</li>
                <li>Term and termination clauses</li>
                <li>Return of materials</li>
              </ul>
              <p style={{ marginTop: '0.75rem' }}>You can review, edit, and customize it in the document panel on the right. Feel free to ask me to make any changes!</p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <textarea
              className={styles.textarea}
              placeholder="Ask the agent to generate or modify a document... (e.g., 'Draft an employment contract', 'Summarize this document')"
              rows={1}
            />
            <button className={styles.sendButton} title="Send message">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center' }}>Press Enter to send • Shift+Enter for new line</p>
        </div>
      </div>

      {/* Artifact / Document View Area */}
      <div className={styles.artifactArea}>
        <div className={styles.artifactHeader}>
          <div className={styles.artifactTitle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            NDA_Document_Studio_Acme.md
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button className="btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: 500, borderRadius: "0.5rem", transition: "all 150ms" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>📋 Copy</button>
            <button className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: 500, borderRadius: "0.5rem", transition: "all 150ms" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>💾 Save</button>
          </div>
        </div>
        <div className={styles.artifactContent}>
          <h1 style={{ textAlign: "center", marginBottom: "2.5rem", fontSize: "1.75rem", fontWeight: 700 }}>MUTUAL NON-DISCLOSURE AGREEMENT</h1>

          <p style={{ marginBottom: "1rem" }}>
            This Mutual Non-Disclosure Agreement (this "<strong>Agreement</strong>") is entered into as of <strong>[Date]</strong>, by and between <strong>Document Studio Inc.</strong>, a corporation organized and existing under the laws of [State/Country], and <strong>Acme Corp.</strong>, a corporation organized and existing under the laws of [State/Country] (collectively, the "<strong>Parties</strong>").
          </p>

          <h3 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.1rem", fontWeight: 600 }}>1. PURPOSE</h3>
          <p>
            The Parties wish to explore a potential business relationship regarding a new software project (the "<strong>Purpose</strong>"). In connection with the Purpose, each Party may disclose certain confidential information to the other Party.
          </p>

          <h3 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.1rem", fontWeight: 600 }}>2. CONFIDENTIAL INFORMATION</h3>
          <p>
            "<strong>Confidential Information</strong>" means any information disclosed by either Party (the "<strong>Disclosing Party</strong>") to the other Party (the "<strong>Receiving Party</strong>"), either directly or indirectly, in writing, orally, or by inspection of tangible objects, including but not limited to:
          </p>
          <ul style={{ marginTop: "1rem", paddingLeft: "2rem", lineHeight: 1.8 }}>
            <li>Technical data, specifications, and source code</li>
            <li>Business plans, strategies, and financial information</li>
            <li>Customer and vendor lists</li>
            <li>Know-how and trade secrets</li>
            <li>Any other information marked as confidential or that reasonably should be understood to be confidential</li>
          </ul>

          <h3 style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "1.1rem", fontWeight: 600 }}>3. OBLIGATIONS</h3>
          <p>
            The Receiving Party agrees to:
          </p>
          <ul style={{ marginTop: "1rem", paddingLeft: "2rem", lineHeight: 1.8 }}>
            <li>Maintain the confidentiality of the Confidential Information</li>
            <li>Limit access to employees who have a need to know and who are bound by confidentiality obligations</li>
            <li>Use the Confidential Information solely for the Purpose</li>
            <li>Apply the same degree of care as it applies to its own confidential information, but in no event less than reasonable care</li>
          </ul>

          {/* Placeholder for more content */}
          <div style={{ height: "150px", marginTop: "2rem", padding: "2rem", backgroundColor: "rgba(99, 102, 241, 0.05)", borderRadius: "0.75rem", border: "1px dashed rgba(99, 102, 241, 0.2)", textAlign: "center", color: "var(--text-muted)", fontSize: "0.875rem" }}>
            ... Additional sections including Term, Return of Materials, Remedies, and Governing Law ...
          </div>
        </div>
      </div>
    </div>
  );
}
