import { motion } from "framer-motion";
import { 
  Zap, Flame, Heart, Trophy, BookOpen, 
  Calendar, Settings, Moon, Sun, ChevronRight, LogOut, Languages
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useGame } from "@/context/GameContext";
import { badges } from "@/data/courseData";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { xp, hearts, maxHearts, streak, completedLessons, earnedBadges, preferredLanguage, getCourseData } = useGame();
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const courseData = getCourseData();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleChangeLanguage = () => {
    navigate('/select-language');
  };

  const totalLessons = courseData.reduce((acc, level) => acc + level.lessons.length, 0);
  const completionPercentage = Math.round((completedLessons.length / totalLessons) * 100);

  const languageEmoji = preferredLanguage === 'python' ? '🐍' : '🌐';
  const languageName = preferredLanguage === 'python' ? 'Python' : 'JavaScript';

  const stats = [
    { icon: Zap, label: "Total XP", value: xp, color: "primary" },
    { icon: Flame, label: "Day Streak", value: streak, color: "accent" },
    { icon: Heart, label: "Hearts", value: `${hearts}/${maxHearts}`, color: "destructive" },
    { icon: BookOpen, label: "Lessons", value: completedLessons.length, color: "info" },
  ];

  return (
    <MainLayout title="Profile">
      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-5xl mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            {languageEmoji}
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground">{languageName} Learner</h2>
          <p className="text-muted-foreground">Learning since today</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="bg-card rounded-2xl border border-border p-4 text-center"
              >
                <Icon className={cn("w-6 h-6 mx-auto mb-2", `text-${stat.color}`)} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-3xl border border-border p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground">Course Progress</h3>
            <span className="text-sm font-semibold text-primary">{completionPercentage}%</span>
          </div>
          <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-primary to-success rounded-full"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {completedLessons.length} of {totalLessons} lessons completed
          </p>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-3xl border border-border overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              Badges
            </h3>
          </div>
          
          <div className="p-4 grid grid-cols-4 gap-3">
            {badges.map((badge, index) => {
              const earned = completedLessons.length >= badge.levelRequired * 2; // Simplified check
              
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-2xl",
                    earned ? "bg-accent/10" : "bg-muted opacity-50"
                  )}
                >
                  <span className="text-2xl mb-1">{badge.icon}</span>
                  <span className="text-xs text-center font-medium text-foreground truncate w-full">
                    {badge.name.split(' ')[0]}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-3xl border border-border overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Settings className="w-5 h-5 text-muted-foreground" />
              Settings
            </h3>
          </div>

          <div className="divide-y divide-border">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {isDark ? (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Sun className="w-5 h-5 text-muted-foreground" />
                )}
                <span className="font-medium text-foreground">
                  {isDark ? "Dark Mode" : "Light Mode"}
                </span>
              </div>
              <div className={cn(
                "w-12 h-7 rounded-full p-1 transition-colors",
                isDark ? "bg-primary" : "bg-muted"
              )}>
                <motion.div
                  layout
                  className="w-5 h-5 bg-white rounded-full shadow"
                  animate={{ x: isDark ? 20 : 0 }}
                />
              </div>
            </button>

            <button 
              onClick={handleChangeLanguage}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Change Language</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{languageName}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Streak Calendar</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            {isLoggedIn && (
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-destructive"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
