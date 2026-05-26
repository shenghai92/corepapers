import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import {
  FileText,
  Sparkles,
  Quote,
  BookOpen,
  Clock,
  ArrowRight,
  GraduationCap,
  Crown,
  Zap,
  Settings,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

const PLAN_INFO = {
  free: { label: "Free Plan", color: "bg-secondary text-secondary-foreground", icon: "✦" },
  student: { label: "Student Plan", color: "bg-blue-100 text-blue-700", icon: "🎓" },
  pro: { label: "Pro Plan", color: "bg-primary/10 text-primary", icon: "⚡" },
};

export default function Dashboard() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const { data: sessions } = trpc.polish.getSessions.useQuery(undefined, { enabled: isAuthenticated });
  const { data: subscription } = trpc.payment.getSubscription.useQuery(undefined, { enabled: isAuthenticated });

  if (loading) {
    return (
      <div className="pt-32 pb-16 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-16 text-center">
        <SEOHead title="Dashboard" noIndex />
        <div className="max-w-md mx-auto">
          <div className="text-4xl mb-4">🔐</div>
          <h1 className="font-serif font-light text-3xl text-slate-purple mb-3">Sign In to Your Dashboard</h1>
          <p className="text-muted-foreground font-sans mb-6">Access your writing history, subscription, and personalized tools.</p>
          <Button asChild className="bg-cta-gradient text-white border-0 shadow-soft hover:opacity-90">
            <a href={getLoginUrl("/dashboard")}>Sign In / Create Account</a>
          </Button>
        </div>
      </div>
    );
  }

  const plan = (subscription?.plan ?? "free") as keyof typeof PLAN_INFO;
  const planInfo = PLAN_INFO[plan] ?? PLAN_INFO.free;

  return (
    <>
      <SEOHead title="My Dashboard" noIndex />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container">
          {/* Header */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-1">Dashboard</p>
              <h1 className="font-serif font-light text-3xl sm:text-4xl text-slate-purple">
                Welcome back, {user?.name?.split(" ")[0] ?? "Scholar"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${planInfo.color} font-sans text-xs border-0`}>
                {planInfo.icon} {planInfo.label}
              </Badge>
              <button
                onClick={() => logout()}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <div>
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-3">Quick Actions</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { icon: Sparkles, label: "Polish Essay", href: "/polish", color: "bg-lavender-light", iconColor: "text-primary" },
                    { icon: BookOpen, label: "Phrase Library", href: "/phrases", color: "bg-blush-light", iconColor: "text-rose-500" },
                    { icon: Quote, label: "Generate Citation", href: "/citations", color: "bg-mint-light", iconColor: "text-emerald-600" },
                  ].map((action) => (
                    <Link key={action.label} href={action.href}>
                      <div className="p-4 bg-white border border-border rounded-xl hover:border-primary/30 hover:shadow-card transition-all cursor-pointer group">
                        <div className={`w-9 h-9 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                          <action.icon size={18} className={action.iconColor} />
                        </div>
                        <div className="font-sans font-medium text-sm text-foreground group-hover:text-primary transition-colors">{action.label}</div>
                        <ArrowRight size={12} className="text-muted-foreground mt-1 group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Sessions */}
              <div>
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-3">Recent Writing Sessions</p>
                <div className="bg-white border border-border rounded-2xl overflow-hidden">
                  {sessions && sessions.length > 0 ? (
                    <div className="divide-y divide-border">
                      {sessions.slice(0, 5).map((session) => (
                        <div key={session.id} className="p-4 hover:bg-secondary/30 transition-colors">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="font-sans font-medium text-sm text-foreground mb-1 truncate">
                                {session.title}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground font-sans">
                                <span className="flex items-center gap-1">
                                  <FileText size={11} /> {session.wordCount} words
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock size={11} /> {new Date(session.createdAt).toLocaleDateString()}
                                </span>
                                <Badge variant="secondary" className="text-xs capitalize">{session.discipline?.replace("_", " ")}</Badge>
                              </div>
                            </div>
                            <Link href="/polish">
                              <button className="text-xs text-primary hover:underline font-sans flex-shrink-0">
                                View →
                              </button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 text-center">
                      <div className="text-3xl mb-3">📝</div>
                      <p className="font-sans text-sm text-muted-foreground mb-4">No writing sessions yet.</p>
                      <Link href="/polish">
                        <Button size="sm" className="bg-cta-gradient text-white border-0 font-sans">
                          Polish Your First Essay
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Profile Card */}
              <div className="bg-white border border-border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-primary font-sans">
                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <div>
                    <div className="font-sans font-medium text-sm text-foreground">{user?.name ?? "User"}</div>
                    <div className="text-xs text-muted-foreground font-sans">{user?.email ?? ""}</div>
                  </div>
                </div>
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex items-center justify-between py-2 border-t border-border">
                    <span className="text-muted-foreground">Plan</span>
                    <Badge className={`${planInfo.color} border-0 text-xs`}>{planInfo.label}</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-border">
                    <span className="text-muted-foreground">Sessions</span>
                    <span className="text-foreground font-medium">{sessions?.length ?? 0}</span>
                  </div>
                </div>
              </div>

              {/* Upgrade CTA */}
              {plan === "free" && (
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
                  <div className="text-2xl mb-2">🚀</div>
                  <h3 className="font-sans font-semibold text-sm text-foreground mb-1">Upgrade to Student</h3>
                  <p className="text-xs text-muted-foreground font-sans mb-4 leading-relaxed">
                    Unlimited polishes, full phrase library, and save all your sessions for just $7.9/month.
                  </p>
                  <Link href="/pricing">
                    <Button size="sm" className="w-full bg-cta-gradient text-white border-0 font-sans text-xs">
                      View Plans <ArrowRight size={12} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              )}

              {/* Writing Stats */}
              <div className="bg-white border border-border rounded-2xl p-5">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted-foreground mb-4">Your Stats</p>
                <div className="space-y-3">
                  {[
                    { label: "Total Sessions", value: sessions?.length ?? 0 },
                    { label: "Words Polished", value: sessions?.reduce((sum, s) => sum + (s.wordCount ?? 0), 0) ?? 0 },
                    { label: "Avg. Word Count", value: sessions?.length ? Math.round((sessions.reduce((sum, s) => sum + (s.wordCount ?? 0), 0)) / sessions.length) : 0 },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between text-sm font-sans">
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className="font-medium text-foreground">{stat.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
