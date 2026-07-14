import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Plus, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GameCard } from "@/components/GameCard";
import { GAMES, SPORTS, type Sport } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState<Sport | "All">("All");
  const navigate = useNavigate();

  const games = GAMES.filter((g) => {
    if (sport !== "All" && g.sport !== sport) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      g.title.toLowerCase().includes(q) ||
      g.location.toLowerCase().includes(q) ||
      g.sport.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-card px-6 py-14 sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Real-time sports matchmaking
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
              Find Players. Create Games.{" "}
              <span className="text-primary">Play Together.</span>
            </h1>
            <p className="mt-5 text-base text-muted-foreground sm:text-lg">
              Discover pickup matches near you, invite your crew, and chat before you step on the
              field.
            </p>

            <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-white/10 bg-background/60 p-1.5 backdrop-blur">
              <Search className="ml-3 h-5 w-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by sport, location, or title..."
                className="h-11 border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
              />
            </div>
          </motion.div>
        </section>

        {/* Filters */}
        <section className="mt-10">
          <div className="flex flex-wrap gap-2">
            {(["All", ...SPORTS.map((s) => s.name)] as const).map((name) => {
              const active = sport === name;
              return (
                <motion.button
                  key={name}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSport(name as Sport | "All")}
                  className={cn(
                    "rounded-2xl border px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground green-glow"
                      : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground",
                  )}
                >
                  {name}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Games grid */}
        <section className="mt-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Games near you</h2>
              <p className="text-sm text-muted-foreground">
                {games.length} open {games.length === 1 ? "match" : "matches"} looking for players
              </p>
            </div>
          </div>

          {games.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 py-20 text-center text-muted-foreground">
              No games match your filters. Try creating one instead.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {games.map((g, i) => (
                <GameCard key={g.id} game={g} index={i} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating create button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate({ to: "/create-game" })}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground green-glow"
      >
        <Plus className="h-5 w-5" />
        <span className="hidden sm:inline">Create Game</span>
      </motion.button>

      {/* Hidden dev link so mobile users can log in */}
      <Link to="/login" className="sr-only">
        Login
      </Link>
    </div>
  );
}
