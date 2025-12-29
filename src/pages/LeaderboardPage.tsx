import { motion } from "framer-motion";
import { Trophy, Medal, Crown, Flame, Zap } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useGame } from "@/context/GameContext";
import { cn } from "@/lib/utils";

// Mock leaderboard data
const leaderboardData = [
  { id: 1, name: "PythonMaster", xp: 2450, streak: 15, avatar: "👨‍💻" },
  { id: 2, name: "CodeNinja", xp: 2180, streak: 12, avatar: "🥷" },
  { id: 3, name: "ByteWizard", xp: 1920, streak: 8, avatar: "🧙‍♂️" },
  { id: 4, name: "DataDragon", xp: 1650, streak: 6, avatar: "🐲" },
  { id: 5, name: "AlgoAce", xp: 1420, streak: 5, avatar: "🃏" },
  { id: 6, name: "LoopLegend", xp: 1280, streak: 4, avatar: "🔄" },
  { id: 7, name: "FuncFan", xp: 980, streak: 3, avatar: "⚡" },
  { id: 8, name: "VarViper", xp: 720, streak: 2, avatar: "🐍" },
];

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg"
      >
        <Crown className="w-5 h-5 text-white" />
      </motion.div>
    );
  }
  if (rank === 2) {
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
        <Medal className="w-5 h-5 text-white" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center">
        <Medal className="w-5 h-5 text-white" />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
      <span className="text-sm font-bold text-muted-foreground">{rank}</span>
    </div>
  );
}

export default function LeaderboardPage() {
  const { xp, streak } = useGame();

  // Add current user to leaderboard
  const userEntry = { id: 0, name: "You", xp, streak, avatar: "🎯" };
  const fullLeaderboard = [...leaderboardData, userEntry]
    .sort((a, b) => b.xp - a.xp)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  const userRank = fullLeaderboard.find(e => e.id === 0)?.rank || 0;

  return (
    <MainLayout title="Leaderboard">
      <div className="px-4 py-6 space-y-6">
        {/* Your Rank Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 rounded-3xl p-6 border border-primary/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🎯</div>
              <div>
                <p className="text-sm text-muted-foreground">Your Rank</p>
                <p className="text-3xl font-bold text-foreground">#{userRank}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end text-primary">
                <Zap className="w-5 h-5 fill-primary" />
                <span className="text-xl font-bold">{xp}</span>
              </div>
              <div className="flex items-center gap-1 justify-end text-accent">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-semibold">{streak} day streak</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-end justify-center gap-3 py-4"
        >
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2">{fullLeaderboard[1]?.avatar}</div>
            <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-bold text-muted-foreground">2</span>
            </div>
            <p className="text-xs font-semibold mt-2 text-foreground">{fullLeaderboard[1]?.name}</p>
            <p className="text-xs text-muted-foreground">{fullLeaderboard[1]?.xp} XP</p>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <motion.div 
              className="text-4xl mb-2"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {fullLeaderboard[0]?.avatar}
            </motion.div>
            <div className="w-24 h-28 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-glow-accent">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <p className="text-sm font-bold mt-2 text-foreground">{fullLeaderboard[0]?.name}</p>
            <p className="text-xs text-muted-foreground">{fullLeaderboard[0]?.xp} XP</p>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2">{fullLeaderboard[2]?.avatar}</div>
            <div className="w-20 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <p className="text-xs font-semibold mt-2 text-foreground">{fullLeaderboard[2]?.name}</p>
            <p className="text-xs text-muted-foreground">{fullLeaderboard[2]?.xp} XP</p>
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <div className="bg-card rounded-3xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              Weekly Rankings
            </h3>
          </div>

          <div className="divide-y divide-border">
            {fullLeaderboard.slice(3).map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className={cn(
                  "flex items-center gap-4 p-4",
                  entry.id === 0 && "bg-primary/5"
                )}
              >
                <RankBadge rank={entry.rank} />
                
                <div className="text-2xl">{entry.avatar}</div>
                
                <div className="flex-1">
                  <p className={cn(
                    "font-bold",
                    entry.id === 0 ? "text-primary" : "text-foreground"
                  )}>
                    {entry.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Flame className="w-3 h-3 text-accent" />
                    <span>{entry.streak} days</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-primary">
                    <Zap className="w-4 h-4" />
                    <span className="font-bold">{entry.xp}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
