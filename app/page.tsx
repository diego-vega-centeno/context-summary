"use client";
// import { useNavigate } from "react-router";
// import { Button } from "../components/ui/button";
// import Button from '@/components/ui/Button'
// import { Badge } from "../components/ui/badge";
import {
  GitPullRequest,
  Sparkles,
  BookOpen,
  Users,
  ArrowRight,
  Clock,
  Zap,
} from "lucide-react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GitPullRequest className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">Summary context</span>
        </div>
        <div className="flex items-center gap-3">
          {/* <Button variant="ghost" onClick={() => navigate("/login")}>Sign in</Button> */}
          <Button onClick={() => router.push("/dashboard")}>Get Started</Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        {/* <Badge variant="secondary" className="mb-6 gap-1.5">
          <Sparkles className="w-3 h-3" />
          AI-powered development context
        </Badge> */}

        <h1
          className="max-w-3xl mb-6 text-foreground"
          style={{ fontSize: "3rem", fontWeight: 700, lineHeight: 1.15 }}
        >
          Stop asking{" "}
          <span className="text-muted-foreground">"what's the status?"</span>
          <br />
          Start understanding{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            the full story
          </span>
        </h1>

        <p
          className="max-w-xxl text-muted-foreground mb-10"
          style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
        >
          PR Context ingests your GitHub pull requests and reconstructs the
          development narrative
          <br />
          Who made decisions, what's blocking things, and exactly what needs to
          happen next. Not just status. Context.
        </p>

        <div className="flex items-center gap-4">
          {/* <Button size="lg" onClick={() => navigate("/signup")} className="gap-2">
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Button> */}
          {/* <Button size="lg" variant="outline" onClick={() => navigate("/dashboard")} className="gap-2">
            View Demo
          </Button> */}
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Public GitHub repos only · No OAuth token required
        </p>
      </main>

      <section className="border-t border-border px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm text-muted-foreground mb-10 uppercase tracking-wider">
            What PR Context does differently
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-5 h-5" />,
                title: "The full story",
                desc: "Chronological narrative of decisions, blockers, and context — not just a status badge.",
              },
              {
                icon: <Zap className="w-5 h-5" />,
                title: "Context recovery",
                desc: "Return to a stale PR after weeks and immediately understand exactly where things stand.",
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: "Team transparency",
                desc: "Managers get the full picture without interrupting the developers building the thing.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-accent-foreground">
                  {item.icon}
                </div>
                <h3 className="text-foreground" style={{ fontSize: "1rem" }}>
                  {item.title}
                </h3>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "0.9rem", lineHeight: 1.6 }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-16 bg-accent/30">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    PR #234 — Auth refactor
                  </p>
                  <p className="text-xs text-muted-foreground">
                    acme-corp/api-gateway
                  </p>
                </div>
              </div>
              {/* <Badge variant="destructive" className="text-xs">STALE 17d</Badge> */}
            </div>
            <p className="text-sm text-foreground mb-3">
              <span className="font-medium">AI says: </span>
              Blocked waiting on @john decision about session handling
              architecture
            </p>
            <div className="flex gap-2 flex-wrap">
              {[
                "2 approvals",
                "1 requested change",
                "awaiting @backend-team",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Example PR card — AI reconstructs the blockers automatically
          </p>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitPullRequest className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">PR Context</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <GitHubIcon className="w-4 h-4" />
          <span>Public repos only · Free tier</span>
        </div>
      </footer>
    </div>
  );
}
