import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Users } from "lucide-react";
import { sportIcon, SPORTS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
function GameCard({ game, index = 0 }) {
  const Icon = sportIcon(game.sport);
  const hue = SPORTS.find((s) => s.name === game.sport)?.hue ?? "";
  return <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: index * 0.04 }}
    whileHover={{ y: -4 }}
    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card p-5 soft-shadow"
  >
      <div
    className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${hue} blur-2xl`}
  />

      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {game.sport}
            </p>
            <h3 className="text-base font-semibold leading-tight">{game.title}</h3>
          </div>
        </div>

        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary ring-1 ring-primary/20">
          {game.playersJoined}/{game.playersNeeded}
        </span>
      </div>

      <div className="relative mt-5 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">{game.location}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {game.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {game.time}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          {game.playersNeeded - game.playersJoined} players needed
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-between border-t border-white/5 pt-4">
        <div className="flex items-center gap-2">
          <img
    src={game.creator.avatar}
    alt={game.creator.name}
    className="h-7 w-7 rounded-full ring-2 ring-black"
  />
          <div className="text-xs">
            <p className="text-muted-foreground">Hosted by</p>
            <p className="font-medium text-foreground">{game.creator.name}</p>
          </div>
        </div>

        <Button asChild size="sm" className="rounded-xl">
          <Link to={`/game/${game.id}`}>Join</Link>
        </Button>
      </div>
    </motion.div>;
}
export {
  GameCard
};
