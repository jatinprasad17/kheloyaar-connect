import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Users, FileText } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SPORTS } from "@/lib/mock-data";

export default function CreateGame() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate("/"), 500);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 pb-24 pt-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Create a game</h1>
          <p className="mt-2 text-muted-foreground">
            Set the details, and we'll help you find players near you.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-8 space-y-5 rounded-3xl border border-white/10 bg-card p-6 sm:p-8 soft-shadow"
          >
            <div className="space-y-2">
              <Label>Sport</Label>
              <Select defaultValue="Football">
                <SelectTrigger className="h-11 rounded-2xl border-white/10 bg-background/60">
                  <SelectValue placeholder="Pick a sport" />
                </SelectTrigger>
                <SelectContent>
                  {SPORTS.map((s) => (
                    <SelectItem key={s.name} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <FieldWithIcon label="Location" icon={MapPin}>
              <Input required placeholder="Turf name, area, city" className="h-11 rounded-2xl border-white/10 bg-background/60 pl-10" />
            </FieldWithIcon>

            <div className="grid gap-4 sm:grid-cols-2">
              <FieldWithIcon label="Date" icon={Calendar}>
                <Input required type="date" className="h-11 rounded-2xl border-white/10 bg-background/60 pl-10" />
              </FieldWithIcon>
              <FieldWithIcon label="Time" icon={Clock}>
                <Input required type="time" className="h-11 rounded-2xl border-white/10 bg-background/60 pl-10" />
              </FieldWithIcon>
            </div>

            <FieldWithIcon label="Players needed" icon={Users}>
              <Input required type="number" min={2} max={30} defaultValue={10} className="h-11 rounded-2xl border-white/10 bg-background/60 pl-10" />
            </FieldWithIcon>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Description
              </Label>
              <Textarea
                rows={4}
                placeholder="Format, skill level, what to bring..."
                className="rounded-2xl border-white/10 bg-background/60"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-2xl text-sm font-semibold green-glow"
            >
              {loading ? "Creating..." : "Create game"}
            </Button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

function FieldWithIcon({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        {children}
      </div>
    </div>
  );
}
