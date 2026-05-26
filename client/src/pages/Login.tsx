import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEOHead from "@/components/SEOHead";

type Mode = "login" | "register";

export default function Login() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const utils = trpc.useUtils();

  const login = trpc.auth.login.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate();
      setLocation("/dashboard");
    },
    onError: (err) => setError(err.message),
  });

  const register = trpc.auth.register.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate();
      setLocation("/dashboard");
    },
    onError: (err) => setError(err.message),
  });

  const active = useMemo(
    () => (mode === "login" ? login.isPending : register.isPending),
    [login.isPending, mode, register.isPending]
  );

  useEffect(() => {
    setError("");
  }, [mode]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        await login.mutateAsync({ email, password });
      } else {
        await register.mutateAsync({ email, password, name: name || undefined });
      }
    } catch {
      // handled in onError
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <SEOHead title="Sign In" noIndex />
      <div className="w-full max-w-md border border-border bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-lg bg-cta-gradient flex items-center justify-center">
            <span className="text-white font-semibold">C</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">CorePapers</h1>
            <p className="text-sm text-muted-foreground">Sign in or create an account</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6">
          <Button
            type="button"
            variant={mode === "login" ? "default" : "outline"}
            onClick={() => setMode("login")}
          >
            <LogIn size={14} className="mr-2" />
            Sign in
          </Button>
          <Button
            type="button"
            variant={mode === "register" ? "default" : "outline"}
            onClick={() => setMode("register")}
          >
            <UserPlus size={14} className="mr-2" />
            Create account
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button type="submit" className="w-full" disabled={active}>
            {active ? <Loader2 size={14} className="mr-2 animate-spin" /> : null}
            {mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>
      </div>
    </main>
  );
}
