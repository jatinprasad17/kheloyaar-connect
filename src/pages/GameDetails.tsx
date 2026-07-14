import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  ArrowLeft,
  Trash2,
  LogOut,
  Check,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Chat } from "@/components/Chat";
import { Button } from "@/components/ui/button";
import { GAMES, sportIcon, SPORTS, CURRENT_USER } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import NotFound from "./NotFound";

export default function GameDetails() {
  const { id } = useParams<{ id: string }>();
  const game = GAMES.find((g) => g.id === id);
  const navigate = useNavigate();
  const [joined, setJoined] = useState(
    !!game && game.participants.some((p) => p.id === CURRENT_USER.id),
  );
  const [showChat, setShowChat] = useState(false);

  if (!game) return <NotFound />;

  const isCreator = game.creator.id === CURRENT_USER.id;
  const Icon = sportIcon(game.sport);
  const hue = SPORTS.find((s) => s.name === game.sport)?.hue ?? "";

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to games
        </Link>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "relative mt-4 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br p-8 sm:p-12",
            hue,
          )}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-black/40 ring-1 ring-white/10 backdrop-blur">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {game.sport}
                  </p>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{game.title}</h1>
                </div>
              </div>
            </div>
            <span className="rounded-full bg-primary/15 px-3 py-1.5 text-xs font-medium text-primary ring-1 ring-primary/25">
              {game.playersJoined}/{game.playersNeeded} joined
            </span>
          </div>
        </motion.section>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-3xl border border-white/10 bg-card p-6 sm:p-8">
              <h2 className="text-lg font-semibold">Match details</h2>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <Detail icon={MapPin} label="Location" value={game.location} />
                <Detail icon={Calendar} label="Date" value={game.date} />
                <Detail icon={Clock} label="Time" value={game.time} />
                <Detail
                  icon={Users}
                  label="Players needed"
                  value={`${game.playersNeeded - game.playersJoined} more`}
                />
              </dl>

              <div className="mt-6 rounded-2xl border border-white/10 bg-background/60 p-4">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  About this game
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  {game.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-6">
                <img
                  src={game.creator.avatar}
                  alt={game.creator.name}
                  className="h-10 w-10 rounded-full ring-2 ring-black"
                />
                <div>
                  <p className="text-xs text-muted-foreground">Created by</p>
                  <p className="text-sm font-semibold">{game.creator.name}</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-card p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Participants</h2>
                <span className="text-xs text-muted-foreground">
                  {game.participants.length} joined
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-3">
                {game.participants.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-background/60 py-1.5 pl-1.5 pr-3"
                  >
                    <img src={p.avatar} alt={p.name} className="h-8 w-8 rounded-full" />
                    <span className="text-sm font-medium">{p.name}</span>
                  </li>
                ))}
                {Array.from({ length: Math.max(0, game.playersNeeded - game.playersJoined) })
                  .slice(0, 4)
                  .map((_, i) => (
                    <li
                      key={i}
                      className="grid h-11 w-11 place-items-center rounded-2xl border border-dashed border-white/10 text-muted-foreground"
                    >
                      <Users className="h-4 w-4" />
                    </li>
                  ))}
              </ul>
            </section>

            <section className="overflow-hidden rounded-3xl border border-white/10 bg-card">
              <button
                onClick={() => setShowChat((v) => !v)}
                className="flex w-full items-center justify-between p-6 sm:px-8"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-lg font-semibold">Team chat</h2>
                    <p className="text-xs text-muted-foreground">
                      Coordinate with players before the match
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-primary">
                  {showChat ? "Hide" : "Open"}
                </span>
              </button>
              {showChat && (
                <div className="border-t border-white/5">
                  <Chat />
                </div>
              )}
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl border border-white/10 bg-card p-6 soft-shadow">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Your status
              </p>
              <p className="mt-2 text-lg font-semibold">
                {isCreator ? "You host this game" : joined ? "You're in" : "Not joined yet"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {isCreator
                  ? "Manage participants and details from here."
                  : "Chat opens once you join the team."}
              </p>

              <div className="mt-5 space-y-2">
                {isCreator ? (
                  <Button
                    variant="destructive"
                    className="h-11 w-full rounded-2xl"
                    onClick={() => navigate("/")}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete game
                  </Button>
                ) : joined ? (
                  <Button
                    variant="outline"
                    className="h-11 w-full rounded-2xl border-white/10 bg-white/5"
                    onClick={() => setJoined(false)}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Leave game
                  </Button>
                ) : (
                  <Button
                    className="h-11 w-full rounded-2xl green-glow"
                    onClick={() => setJoined(true)}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Join game
                  </Button>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
