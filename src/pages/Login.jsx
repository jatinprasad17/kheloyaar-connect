import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate("/"), 500);
  };
  return <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-primary/10 blur-3xl" />

      <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="relative w-full max-w-md rounded-3xl border border-white/10 bg-card/70 p-8 backdrop-blur-xl soft-shadow"
  >
        <div className="flex flex-col items-center text-center">
          <motion.div
    whileHover={{ rotate: -8, scale: 1.05 }}
    className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground green-glow"
  >
            <Zap className="h-6 w-6" strokeWidth={2.5} />
          </motion.div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight">
            Welcome back to Khelo<span className="text-primary">Yaar</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to find your next game.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
    id="email"
    type="email"
    required
    placeholder="you@college.edu"
    className="h-11 rounded-2xl border-white/10 bg-background/60 pl-10"
  />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
    id="password"
    type="password"
    required
    placeholder="••••••••"
    className="h-11 rounded-2xl border-white/10 bg-background/60 pl-10"
  />
            </div>
          </div>

          <Button
    type="submit"
    disabled={loading}
    className="h-11 w-full rounded-2xl text-sm font-semibold green-glow"
  >
            {loading ? "Signing in..." : "Log in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to KheloYaar?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>;
}
export {
  Login as default
};
