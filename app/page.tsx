import {
  BookOpen,
  Users,
  ArrowRight,
  Clock,
  Zap,
  Timeline,
  GitPullRequest,
} from "lucide-react";
import Button from "@/app/ui/Button";
import { ThemeToggle } from "@/app/ui/ThemeToggleClient";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-b-2 border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <Timeline className="w-4 h-4" />
          </div>
          <span className="font-semibold text-foreground">Summary context</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1
          className="max-w-4xl mb-6 text-foreground"
          style={{ fontSize: "3rem", fontWeight: 700, lineHeight: 1.15 }}
        >
          Stop asking{" "}
          <span className="text-muted-foreground">
            &quot;what&apos;s the status?&quot;
          </span>
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
          Summary context ingests your GitHub pull requests and reconstructs the
          development narrative
          <br />
          Who made decisions, what&apos;s blocking things, and exactly what
          needs to happen next. Not just status but the progress with context.
        </p>

        <div className="flex items-center gap-4">
          <Button size="lg" href="/demo/dashboard" className="gap-2">
            Demo
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" href="/login" className="gap-2">
            Sign in
          </Button>
        </div>

        <p className="mt-4 text-sm">
          AI-powered development context · Public GitHub repos only · No OAuth
          token required
        </p>
      </main>

      <section className="border-t border-border px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm mb-10 uppercase tracking-wider">
            What summary context helps you with
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-5 h-5" />,
                title: "The full story",
                desc: "Chronological narrative of decisions, blockers, and context. Not just status flag",
              },
              {
                icon: <Zap className="w-5 h-5" />,
                title: "Context recovery",
                desc: "Return to a stale PR after weeks and immediately understand exactly where things stand.",
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: "Team efficiency",
                desc: "Managers get the full picture without interrupting developers. When you need to ask now you now have a better understanding.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-highlight">
                  {item.icon}
                </div>
                <h3
                  className="text-foreground font-bold"
                  style={{ fontSize: "1rem" }}
                >
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

      <section className="border-t border-border px-6 py-16 bg-primary">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl border p-4 shadow-sm bg-background">
            <div
              className={`inline-flex items-center border-1 rounded-xl bg-green-700/50 dark:bg-green-700 border-green-700 px-2 mb-2 text-sm`}
            >
              <GitPullRequest className="inline-block w-6 pr-2" />
              <span>open</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Rate limiting middleware for public API endpoints
                  </p>
                  <p className="text-xs text-muted-foreground">
                    stackwise/api-gateway &#183; #412 &#183; dev_rami
                  </p>
                </div>
              </div>

              {/* {
                <div className="text-xs py-2 px-3 rounded-full text-muted-foreground bg-muted-background">
                  STALE 17d
                </div>
              } */}
            </div>
            <p className="text-md text-foreground mb-3">
              <span className="font-medium">Current status: </span>
              Implementation complete and tested. 3 approvals from engineering.
              Blocked on mandatory security review.
            </p>
            <hr className="border-border" />
            <div className="flex items-center pt-2 text-xs text-muted-foreground">
              <Clock className="inline-block mr-2 w-4" />
              <span>Last activity 27mo ago</span>
            </div>
            {/* <div className="flex gap-2 flex-wrap">
              {[
                "2 approvals",
                "1 requested change",
                "awaiting @backend-team",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full text-muted-foreground bg-muted-background"
                >
                  {tag}
                </span>
              ))}
            </div> */}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Example card automatically reconstructed by AI
          </p>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground">
            &copy; Diego Vega Centeno
          </span>
        </div>
      </footer>
    </div>
  );
}
