import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User as UserIcon, Camera, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string | null>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setAvatar(URL.createObjectURL(f));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

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
          <h1 className="mt-5 text-2xl font-bold tracking-tight">Join KheloYaar</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A minute to set up. A lifetime of games.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="flex flex-col items-center gap-3">
            <label
              htmlFor="avatar"
              className="group relative grid h-20 w-20 cursor-pointer place-items-center overflow-hidden rounded-full border border-white/10 bg-background/60"
            >
              {avatar ? (
                <img src={avatar} alt="Avatar preview" className="h-full w-full object-cover" />
              ) : (
                <Camera className="h-6 w-6 text-muted-foreground" />
              )}
              <div className="absolute inset-0 grid place-items-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-[11px] font-medium">Upload</span>
              </div>
              <input id="avatar" type="file" accept="image/*" className="hidden" onChange={onFile} />
            </label>
            <p className="text-xs text-muted-foreground">Upload a profile picture</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <div className="relative">
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="name" required placeholder="Aarav Sharma" className="h-11 rounded-2xl border-white/10 bg-background/60 pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" required placeholder="you@college.edu" className="h-11 rounded-2xl border-white/10 bg-background/60 pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="password" type="password" required placeholder="••••••••" className="h-11 rounded-2xl border-white/10 bg-background/60 pl-10" />
            </div>
          </div>

          <Button type="submit" className="h-11 w-full rounded-2xl text-sm font-semibold green-glow">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
