import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground green-glow"
      >
        <Zap className="h-6 w-6" strokeWidth={2.5} />
      </motion.div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
