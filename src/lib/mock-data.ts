import type { LucideIcon } from "lucide-react";
import {
  Trophy,
  Volleyball,
  Target,
  Dribbble,
  CircleDot,
} from "lucide-react";

export type Sport =
  | "Football"
  | "Cricket"
  | "Badminton"
  | "Basketball"
  | "Volleyball";

export const SPORTS: { name: Sport; icon: LucideIcon; hue: string }[] = [
  { name: "Football", icon: CircleDot, hue: "from-emerald-500/20 to-emerald-500/5" },
  { name: "Cricket", icon: Trophy, hue: "from-amber-500/20 to-amber-500/5" },
  { name: "Badminton", icon: Target, hue: "from-sky-500/20 to-sky-500/5" },
  { name: "Basketball", icon: Dribbble, hue: "from-orange-500/20 to-orange-500/5" },
  { name: "Volleyball", icon: Volleyball, hue: "from-fuchsia-500/20 to-fuchsia-500/5" },
];

export const sportIcon = (s: Sport) =>
  SPORTS.find((x) => x.name === s)?.icon ?? CircleDot;

export type Player = {
  id: string;
  name: string;
  avatar: string;
};

export const CURRENT_USER: Player = {
  id: "u_me",
  name: "Aarav Sharma",
  avatar: "https://i.pravatar.cc/150?img=12",
};

export const PLAYERS: Player[] = [
  CURRENT_USER,
  { id: "u1", name: "Riya Kapoor", avatar: "https://i.pravatar.cc/150?img=47" },
  { id: "u2", name: "Karan Mehta", avatar: "https://i.pravatar.cc/150?img=15" },
  { id: "u3", name: "Ishita Rao", avatar: "https://i.pravatar.cc/150?img=32" },
  { id: "u4", name: "Devansh Iyer", avatar: "https://i.pravatar.cc/150?img=23" },
  { id: "u5", name: "Meera Nair", avatar: "https://i.pravatar.cc/150?img=44" },
  { id: "u6", name: "Rohit Verma", avatar: "https://i.pravatar.cc/150?img=8" },
];

export type Game = {
  id: string;
  sport: Sport;
  title: string;
  location: string;
  date: string;
  time: string;
  playersNeeded: number;
  playersJoined: number;
  creator: Player;
  participants: Player[];
  description: string;
};

export const GAMES: Game[] = [
  {
    id: "g1",
    sport: "Football",
    title: "Sunday 7-a-side kickabout",
    location: "Cubbon Park Turf, Bangalore",
    date: "Sun, 19 Jul",
    time: "6:30 PM",
    playersNeeded: 14,
    playersJoined: 9,
    creator: PLAYERS[1],
    participants: [PLAYERS[1], PLAYERS[2], PLAYERS[3], PLAYERS[4], PLAYERS[5]],
    description:
      "Casual 7v7 game on turf. Bring your own boots. We'll split teams on the spot — mixed skill levels welcome.",
  },
  {
    id: "g2",
    sport: "Cricket",
    title: "Box cricket league night",
    location: "Play Arena, HSR Layout",
    date: "Fri, 24 Jul",
    time: "8:00 PM",
    playersNeeded: 12,
    playersJoined: 7,
    creator: PLAYERS[2],
    participants: [PLAYERS[2], PLAYERS[0], PLAYERS[5], PLAYERS[6]],
    description: "Tennis ball box cricket. 6 overs a side. Winning team's dinner is on the losers.",
  },
  {
    id: "g3",
    sport: "Badminton",
    title: "Doubles practice",
    location: "Smash Zone, Indiranagar",
    date: "Wed, 22 Jul",
    time: "7:00 AM",
    playersNeeded: 4,
    playersJoined: 2,
    creator: CURRENT_USER,
    participants: [CURRENT_USER, PLAYERS[3]],
    description: "Early morning doubles. Intermediate players preferred. Court booked for 90 mins.",
  },
  {
    id: "g4",
    sport: "Basketball",
    title: "3v3 pickup",
    location: "Koramangala Community Court",
    date: "Sat, 20 Jul",
    time: "5:00 PM",
    playersNeeded: 6,
    playersJoined: 4,
    creator: PLAYERS[4],
    participants: [PLAYERS[4], PLAYERS[1], PLAYERS[6], PLAYERS[2]],
    description: "Half court, first-to-21. Rotating winners. All levels welcome.",
  },
  {
    id: "g5",
    sport: "Volleyball",
    title: "Beach volley meetup",
    location: "Sandbox Arena, Whitefield",
    date: "Sun, 21 Jul",
    time: "4:00 PM",
    playersNeeded: 10,
    playersJoined: 6,
    creator: PLAYERS[5],
    participants: [PLAYERS[5], PLAYERS[6], PLAYERS[1], PLAYERS[3], PLAYERS[2], PLAYERS[4]],
    description: "Casual beach volleyball on real sand courts. Chill vibes, rotating teams.",
  },
  {
    id: "g6",
    sport: "Football",
    title: "Weekday 5-a-side",
    location: "Turf X, Marathahalli",
    date: "Tue, 23 Jul",
    time: "9:00 PM",
    playersNeeded: 10,
    playersJoined: 8,
    creator: PLAYERS[6],
    participants: [PLAYERS[6], PLAYERS[2], PLAYERS[3], PLAYERS[4], PLAYERS[5], PLAYERS[1], PLAYERS[0]],
    description: "Late night 5v5. Two hours, floodlit turf. Regulars welcome, walk-ins okay.",
  },
];

export type ChatMessage = {
  id: string;
  senderId: string;
  text: string;
  time: string;
};

export const INITIAL_MESSAGES: ChatMessage[] = [
  { id: "m1", senderId: "u1", text: "Hey everyone! Excited for the game 🔥", time: "10:12 AM" },
  { id: "m2", senderId: "u_me", text: "Same here. Anyone bringing a spare ball?", time: "10:14 AM" },
  { id: "m3", senderId: "u2", text: "I'll bring two. Also carpooling from HSR if anyone needs a lift.", time: "10:15 AM" },
  { id: "m4", senderId: "u3", text: "Count me in for the carpool 🙌", time: "10:17 AM" },
  { id: "m5", senderId: "u_me", text: "Perfect. See you all there!", time: "10:20 AM" },
];
