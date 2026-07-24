import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Plus, Upload, Wand2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 p-8 overflow-y-auto w-full max-w-[1200px] mx-auto animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1">Welcome back, Krish</h2>
          <p className="text-muted-foreground">Here is an overview of your document workspace.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Import File
          </Button>
          <Link href="/generate">
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4" />
              New Document
            </Button>
          </Link>
        </div>
      </header>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-card/50 backdrop-blur-sm border-muted">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Documents</h3>
            <p className="text-3xl font-bold">124</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-muted">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Generated this month</h3>
            <p className="text-3xl font-bold text-indigo-400">42</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-muted">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Storage Used</h3>
            <p className="text-3xl font-bold">1.2 GB</p>
          </CardContent>
        </Card>
      </section>

      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative rounded-2xl overflow-hidden border bg-gradient-to-br from-indigo-950/40 to-slate-900/40 backdrop-blur-md p-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-4 relative z-10">
            <h3 className="text-2xl font-bold text-indigo-50 flex items-center gap-2">
              <Wand2 className="w-6 h-6 text-indigo-400" />
              Meet your new AI Agent
            </h3>
            <p className="text-indigo-200/80 leading-relaxed max-w-lg">
              Automate your drafting, let the AI review compliance, or extract data from any PDF. The future of document management is here.
            </p>
            <Link href="/generate" className="inline-block pt-2">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 shadow-lg shadow-indigo-900/20">
                Start a Workflow
              </Button>
            </Link>
          </div>
          {/* Decorative visuals */}
          <div className="flex-1 relative h-48 w-full hidden md:block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/10 blur-[60px] rounded-full mix-blend-screen" />
            <div className="absolute right-10 top-0 w-48 h-64 bg-card border rounded-xl shadow-2xl transform rotate-6 animate-pulse opacity-80" />
            <div className="absolute right-20 top-10 w-48 h-64 bg-card border rounded-xl shadow-2xl transform -rotate-3 opacity-90" />
          </div>
        </div>
      </section>

      {/* Recent Documents */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Recent Documents</h3>
          <Button variant="ghost" size="sm" className="text-muted-foreground">View all</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="group cursor-pointer hover:border-indigo-500/50 hover:shadow-md transition-all bg-card/40 backdrop-blur-sm">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium leading-none group-hover:text-indigo-400 transition-colors">Project Proposal v{i}.pdf</h4>
                  <p className="text-sm text-muted-foreground">Updated {i * 2} hours ago</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
