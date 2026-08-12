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
        <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          {/* Global Sidebar */}
          <aside className="w-[280px] flex flex-col p-6 border-r border-slate-800/50 bg-gradient-to-b from-slate-950/80 to-slate-900/50 backdrop-blur-sm sticky top-0 h-screen overflow-y-auto">
            <Link href="/" className="flex items-center gap-3 mb-12 transition-all hover:opacity-100 opacity-90 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30 group-hover:shadow-xl group-hover:shadow-indigo-500/40 group-hover:scale-110 transition-all">
                DS
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-white">Document Studio</span>
                <span className="text-xs text-slate-400 font-medium">AI-Powered</span>
              </div>
            </Link>

            <nav className="flex flex-col gap-2 flex-1">
              <div className="px-2 py-2 mb-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">Main</p>
              </div>
              <Link href="/" className="group flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 font-medium transition-all hover:bg-indigo-600/10 hover:text-indigo-300 active:bg-indigo-600/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 to-indigo-600/0 group-hover:from-indigo-600/5 group-hover:to-indigo-600/10 transition-all" />
                <FileText className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Documents</span>
              </Link>
              <Link href="/generate" className="group flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 font-medium transition-all hover:bg-indigo-600/10 hover:text-indigo-300 active:bg-indigo-600/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 to-indigo-600/0 group-hover:from-indigo-600/5 group-hover:to-indigo-600/10 transition-all" />
                <Wand2 className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Generate Document</span>
              </Link>

              <div className="px-2 py-4 mt-4 mb-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">Tools</p>
              </div>
              <Link href="#" className="group flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 font-medium transition-all hover:bg-slate-800/50 hover:text-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-700/0 to-slate-700/0 group-hover:from-slate-700/5 group-hover:to-slate-700/10 transition-all" />
                <Network className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Agent Workflows</span>
              </Link>
              <Link href="#" className="group flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 font-medium transition-all hover:bg-slate-800/50 hover:text-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-700/0 to-slate-700/0 group-hover:from-slate-700/5 group-hover:to-slate-700/10 transition-all" />
                <Settings className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Settings</span>
              </Link>
            </nav>

            {/* Footer hint */}
            <div className="mt-auto pt-6 border-t border-slate-800/50">
              <p className="text-xs text-slate-500 text-center py-3">v1.0 • AI-Powered</p>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full -translate-y-1/2" />
              <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>
            <div className="relative z-10">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
