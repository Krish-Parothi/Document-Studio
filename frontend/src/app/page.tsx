import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
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
            <Link href="/generate">
              <button className="btn-primary" style={{ marginTop: "1rem" }}>Start a Workflow</button>
            </Link>
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
    </>
  );
}
