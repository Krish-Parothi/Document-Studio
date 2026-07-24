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
              Hello! I'm your Document Agent. I can help you draft proposals, summarize reports, or create any kind of document you need. 
              <br/><br/>
              What would you like to create today?
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
              I've generated a draft of the Non-Disclosure Agreement for you. You can review and edit it in the document panel.
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <textarea 
              className={styles.textarea} 
              placeholder="Ask the agent to generate or modify a document..."
              rows={1}
            />
            <button className={styles.sendButton} title="Send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Artifact / Document View Area */}
      <div className={styles.artifactArea}>
        <div className={styles.artifactHeader}>
          <div className={styles.artifactTitle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            NDA_Document_Studio_Acme.md
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn-secondary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.875rem" }}>Copy</button>
            <button className="btn-primary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.875rem" }}>Save</button>
          </div>
        </div>
        <div className={styles.artifactContent}>
          <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>MUTUAL NON-DISCLOSURE AGREEMENT</h1>
          <p>
            This Mutual Non-Disclosure Agreement (this "Agreement") is entered into as of <strong>[Date]</strong>, by and between <strong>Document Studio Inc.</strong>, a corporation organized and existing under the laws of [State/Country], and <strong>Acme Corp.</strong>, a corporation organized and existing under the laws of [State/Country] (collectively, the "Parties").
          </p>
          <h3 style={{ marginTop: "1.5rem" }}>1. Purpose</h3>
          <p>
            The Parties wish to explore a potential business relationship regarding a new software project (the "Purpose"). In connection with the Purpose, each Party may disclose certain confidential information to the other Party.
          </p>
          <h3 style={{ marginTop: "1.5rem" }}>2. Confidential Information</h3>
          <p>
            "Confidential Information" means any information disclosed by either Party (the "Disclosing Party") to the other Party (the "Receiving Party"), either directly or indirectly, in writing, orally, or by inspection of tangible objects.
          </p>
          {/* Placeholder for more content */}
          <div style={{ height: "200px" }}></div>
        </div>
      </div>
    </div>
  );
}
