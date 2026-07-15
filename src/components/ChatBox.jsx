import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { INITIAL_MESSAGES, CURRENT_USER, PLAYERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
function ChatBox() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [text, setText] = useState("");
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);
  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      {
        id: `m_${m.length + 1}`,
        senderId: CURRENT_USER.id,
        text: text.trim(),
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
    setText("");
  };
  return <div className="flex h-[520px] flex-col">
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
        <AnimatePresence initial={false}>
          {messages.map((m) => {
    const mine = m.senderId === CURRENT_USER.id;
    const sender = PLAYERS.find((p) => p.id === m.senderId) ?? CURRENT_USER;
    return <motion.div
      key={m.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-end gap-2",
        mine ? "justify-end" : "justify-start"
      )}
    >
                {!mine && <img src={sender.avatar} alt={sender.name} className="h-7 w-7 rounded-full" />}
                <div
      className={cn(
        "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
        mine ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md border border-white/10 bg-white/5 text-foreground"
      )}
    >
                  {!mine && <p className="mb-0.5 text-[11px] font-semibold text-primary">{sender.name}</p>}
                  <p className="leading-relaxed">{m.text}</p>
                  <p
      className={cn(
        "mt-1 text-[10px]",
        mine ? "text-primary-foreground/70" : "text-muted-foreground"
      )}
    >
                    {m.time}
                  </p>
                </div>
              </motion.div>;
  })}
        </AnimatePresence>
      </div>

      <form
    onSubmit={send}
    className="flex items-center gap-2 border-t border-white/5 bg-background/60 px-4 py-3 backdrop-blur"
  >
        <input
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Type a message..."
    className="h-11 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/40"
  />
        <motion.button
    whileTap={{ scale: 0.95 }}
    type="submit"
    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground green-glow"
    aria-label="Send"
  >
          <Send className="h-4 w-4" />
        </motion.button>
      </form>
    </div>;
}
export {
  ChatBox
};
