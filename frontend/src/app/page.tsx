import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Plus, Upload, Wand2, Clock, BarChart3, HardDrive, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 p-8 overflow-y-auto w-full max-w-[1400px] mx-auto">
      {/* Header */}
      <header className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Welcome back, Krish</h1>
            <p className="text-lg text-muted-foreground">Manage, generate, and optimize your documents with AI</p>
          </div>
          <div className="flex gap-3 flex-wrap md:flex-nowrap">
            <Button variant="outline" className="gap-2 px-6">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Import</span>
            </Button>
            <Link href="/generate">
              <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transition-all px-6">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Document</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Quick Stats - Enhanced */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-in fade-in slide-in-from-top-6 duration-700">
        <Card className="group bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur border-blue-200/50 dark:border-blue-900/30 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">Total Documents</p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">124</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">All time</p>
          </CardContent>
        </Card>

        <Card className="group bg-gradient-to-br from-emerald-50 to-emerald-50/50 dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur border-emerald-200/50 dark:border-emerald-900/30 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">Generated This Month</p>
                <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">42</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wand2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">+12 from last month</p>
          </CardContent>
        </Card>

        <Card className="group bg-gradient-to-br from-orange-50 to-orange-50/50 dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur border-orange-200/50 dark:border-orange-900/30 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">Storage Used</p>
                <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">1.2 GB</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                <HardDrive className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">4.8 GB available</p>
          </CardContent>
        </Card>
      </section>

      {/* AI Agent Hero Section - Enhanced */}
      <section className="mb-12 animate-in fade-in slide-in-from-top-8 duration-900">
        <div className="relative rounded-3xl overflow-hidden border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-slate-900/40 to-slate-950/40 backdrop-blur-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/3" />
          </div>

          <div className="flex-1 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit">
              <Wand2 className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-300">AI-Powered</span>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Meet your Document AI Agent</h2>
              <p className="text-lg text-indigo-100/80 leading-relaxed max-w-lg">
                Automate drafting, review compliance, extract insights, and transform your documents with intelligent AI assistance. Experience the future of document management.
              </p>
            </div>
            <Link href="/generate" className="inline-block">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-full px-8 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 transform hover:translate-y-[-2px]">
                Start a Workflow
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Decorative Cards */}
          <div className="flex-1 relative h-56 md:h-64 w-full hidden md:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-56 h-72 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 backdrop-blur-sm" />
              <div className="absolute w-56 h-72 bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 border border-indigo-500/20 rounded-2xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 backdrop-blur-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Documents - Enhanced */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold">Recent Documents</h3>
            <p className="text-sm text-muted-foreground mt-1">Your latest files and projects</p>
          </div>
          <Button variant="ghost" size="sm" className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 gap-1">
            View all
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="group cursor-pointer hover:shadow-lg hover:border-indigo-500/30 dark:hover:border-indigo-500/40 transition-all duration-300 bg-card/50 dark:bg-slate-800/50 backdrop-blur border-slate-200/50 dark:border-slate-700/50 overflow-hidden hover:scale-105 transform">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/30 dark:to-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full">PDF</span>
                </div>
                <h4 className="font-semibold text-base leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-3">Project Proposal v{i}.pdf</h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  Updated {i * 2} hours ago
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
