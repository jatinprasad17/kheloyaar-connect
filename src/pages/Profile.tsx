import { motion } from "framer-motion";
import { Mail, Pencil, Trophy } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { GameCard } from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CURRENT_USER, GAMES, SPORTS } from "@/lib/mock-data";

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(CURRENT_USER.name);
  const [email, setEmail] = useState("aarav@college.edu");
  const [interests, setInterests] = useState<string[]>(["Football", "Badminton", "Basketball"]);

  const created = GAMES.filter((g) => g.creator.id === CURRENT_USER.id);
  const joined = GAMES.filter(
    (g) => g.creator.id !== CURRENT_USER.id && g.participants.some((p) => p.id === CURRENT_USER.id),
  );

  const toggle = (s: string) =>
    setInterests((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-card p-6 sm:p-8 soft-shadow"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <img
                src={CURRENT_USER.avatar}
                alt={name}
                className="h-20 w-20 rounded-3xl object-cover ring-2 ring-primary/40"
              />
              <div className="min-w-0">
                {editing ? (
                  <div className="space-y-2">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-9 rounded-xl border-white/10 bg-background/60"
                    />
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-9 rounded-xl border-white/10 bg-background/60"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">{name}</h1>
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {email}
                    </p>
                  </>
                )}
              </div>
            </div>

            <Button
              onClick={() => setEditing((v) => !v)}
              variant={editing ? "default" : "outline"}
              className="rounded-2xl border-white/10 bg-white/5"
            >
              <Pencil className="mr-2 h-4 w-4" />
              {editing ? "Save changes" : "Edit profile"}
            </Button>
          </div>

          <div className="relative mt-8 grid gap-4 sm:grid-cols-3">
            <Stat label="Games created" value={created.length} />
            <Stat label="Games joined" value={joined.length} />
            <Stat label="Sports played" value={interests.length} />
          </div>
        </motion.section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-card p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Sports interests</h2>
              <p className="text-sm text-muted-foreground">
                We use these to surface games you'll love.
              </p>
            </div>
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {SPORTS.map((s) => {
              const active = interests.includes(s.name);
              return (
                <button
                  key={s.name}
                  onClick={() => toggle(s.name)}
                  className={
                    "rounded-2xl border px-4 py-2 text-sm font-medium transition-colors " +
                    (active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground")
                  }
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold">Games you created</h2>
          {created.length === 0 ? (
            <p className="mt-3 rounded-2xl border border-dashed border-white/10 py-8 text-center text-sm text-muted-foreground">
              You haven't hosted a game yet.
            </p>
          ) : (
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {created.map((g, i) => (
                <GameCard key={g.id} game={g} index={i} />
              ))}
            </div>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold">Games you joined</h2>
          {joined.length === 0 ? (
            <p className="mt-3 rounded-2xl border border-dashed border-white/10 py-8 text-center text-sm text-muted-foreground">
              No joined games yet — explore the home page.
            </p>
          ) : (
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {joined.map((g, i) => (
                <GameCard key={g.id} game={g} index={i} />
              ))}
            </div>
          )}
        </section>

        <div>
          <Label htmlFor="hidden" className="sr-only">
            hidden
          </Label>
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-background/60 p-5">
      <p className="text-3xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}
