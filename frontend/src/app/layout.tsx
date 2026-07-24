import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { FileText, Wand2, Network, Settings } from "lucide-react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Document Studio | AI-Powered Workspace",
  description: "A state-of-the-art document workspace augmented by autonomous AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <div className="flex min-h-screen w-full">
          {/* Global Sidebar */}
          <aside className="w-[260px] flex flex-col p-6 border-r bg-muted/30">
            <Link href="/" className="flex items-center gap-3 mb-10 transition-opacity hover:opacity-80">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                DS
              </div>
              <span className="font-semibold text-lg tracking-tight">Document Studio</span>
            </Link>
            
            <nav className="flex flex-col gap-2">
              <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-md text-muted-foreground font-medium transition-colors hover:bg-muted hover:text-foreground">
                <FileText className="w-5 h-5" />
                Documents
              </Link>
              <Link href="/generate" className="flex items-center gap-3 px-4 py-3 rounded-md text-muted-foreground font-medium transition-colors hover:bg-muted hover:text-foreground">
                <Wand2 className="w-5 h-5" />
                Generate Document
              </Link>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-md text-muted-foreground font-medium transition-colors hover:bg-muted hover:text-foreground">
                <Network className="w-5 h-5" />
                Agent Workflows
              </Link>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-md text-muted-foreground font-medium transition-colors hover:bg-muted hover:text-foreground">
                <Settings className="w-5 h-5" />
                Settings
              </Link>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col bg-background relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
