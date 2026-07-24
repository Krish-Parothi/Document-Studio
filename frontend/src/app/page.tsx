import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} glass-panel fade-in`}>
        <div className={styles.brand}>
          <div className={styles.logo}>DS</div>
          <span className={styles.brandName}>Document Studio</span>
        </div>
        
        <nav className={styles.nav}>
          <a href="#" className={styles.navItem} data-active="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Documents
          </a>
          <a href="#" className={styles.navItem}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            Agent Workflows
          </a>
          <a href="#" className={styles.navItem}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`${styles.main} fade-in`}>
        <header className={styles.header}>
          <h2>Welcome back, Krish</h2>
          <div className={styles.actions}>
            <button className="btn-secondary">Import File</button>
            <button className="btn-primary flex-center" style={{ gap: "0.5rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              New Document
            </button>
          </div>
        </header>

        <section className={styles.heroSection}>
          <div className={`glass-panel ${styles.glassBanner}`}>
            <div className={styles.bannerContent}>
              <h3>Meet your new AI Agent</h3>
              <p>Automate your drafting, let the AI review compliance, or extract data from any PDF. The future of document management is here.</p>
              <button className="btn-primary" style={{ marginTop: "1rem" }}>Start a Workflow</button>
            </div>
            <div className={styles.bannerVisual}>
              <div className={styles.floatingCard}></div>
              <div className={styles.floatingCard}></div>
            </div>
          </div>
        </section>

        <section className={styles.recentDocs}>
          <h3>Recent Documents</h3>
          <div className={styles.grid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={`glass-panel ${styles.docCard}`}>
                <div className={styles.docIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <h4>Project Proposal v{i}.pdf</h4>
                <p>Updated 2 hours ago</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
