import { useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, CheckCircle2, Play, ChevronRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Level, Lesson } from "@/data/courseData";
import { useGame } from "@/context/GameContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProgressBar } from "@/components/game/ProgressBar";

function LessonCard({ 
  lesson, 
  levelId, 
  lessonIndex,
  isUnlocked,
  isComplete 
}: { 
  lesson: Lesson; 
  levelId: number;
  lessonIndex: number;
  isUnlocked: boolean;
  isComplete: boolean;
}) {
  const navigate = useNavigate();
  const { hasViewedTheory } = useGame();

  const handleClick = () => {
    if (isUnlocked) {
      // Check if theory has been viewed for this level
      if (!hasViewedTheory(levelId)) {
        navigate(`/theory/${levelId}`);
      } else {
        navigate(`/lesson/${levelId}/${lesson.id}`);
      }
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={!isUnlocked}
      whileHover={isUnlocked ? { scale: 1.02 } : {}}
      whileTap={isUnlocked ? { scale: 0.98 } : {}}
      className={cn(
        "w-full p-4 rounded-2xl border-2 text-left transition-all",
        "flex items-center gap-4",
        isUnlocked && !isComplete && "border-primary bg-primary/5 hover:bg-primary/10",
        isComplete && "border-success/50 bg-success/5",
        !isUnlocked && "border-border bg-muted/50 opacity-60 cursor-not-allowed"
      )}
    >
      <div 
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
          isComplete && "bg-success",
          isUnlocked && !isComplete && "bg-primary",
          !isUnlocked && "bg-muted"
        )}
      >
        {isComplete ? (
          <CheckCircle2 className="w-6 h-6 text-success-foreground" />
        ) : isUnlocked ? (
          <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
        ) : (
          <Lock className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-foreground truncate">{lesson.title}</h4>
        <p className="text-sm text-muted-foreground truncate">{lesson.description}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-sm font-semibold text-primary">+{lesson.xpReward} XP</span>
        {isUnlocked && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
      </div>
    </motion.button>
  );
}

function LevelCard({ level, index }: { level: Level; index: number }) {
  const navigate = useNavigate();
  const { isLevelUnlocked, isLessonUnlocked, completedLessons, hasViewedTheory } = useGame();
  const unlocked = isLevelUnlocked(level.id);
  
  const completedCount = level.lessons.filter(l => 
    completedLessons.includes(l.id)
  ).length;
  
  const progress = (completedCount / level.lessons.length) * 100;
  const isLevelComplete = completedCount === level.lessons.length;
  const theoryViewed = hasViewedTheory(level.id);

  const handleTheoryClick = () => {
    if (unlocked) {
      navigate(`/theory/${level.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "bg-card rounded-3xl border border-border overflow-hidden",
        !unlocked && "opacity-60"
      )}
    >
      {/* Level Header */}
      <div className={cn(
        "p-5 border-b border-border",
        isLevelComplete && "bg-success/5"
      )}>
        <div className="flex items-center gap-4">
          <motion.div 
            className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl",
              unlocked ? "bg-gradient-to-br from-primary/20 to-accent/20" : "bg-muted"
            )}
            animate={unlocked && !isLevelComplete ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {unlocked ? level.icon : <Lock className="w-8 h-8 text-muted-foreground" />}
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-primary uppercase tracking-wide">
                Level {level.id}
              </span>
              {isLevelComplete && (
                <CheckCircle2 className="w-4 h-4 text-success" />
              )}
            </div>
            <h3 className="text-lg font-bold text-foreground">{level.title}</h3>
            <p className="text-sm text-muted-foreground">{level.description}</p>
          </div>
        </div>

        {unlocked && (
          <div className="mt-4">
            <ProgressBar 
              current={completedCount} 
              total={level.lessons.length}
              size="sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {completedCount} / {level.lessons.length} lessons
            </p>
          </div>
        )}
      </div>

      {/* Theory Button */}
      {unlocked && (
        <div className="px-4 pt-4">
          <button
            onClick={handleTheoryClick}
            className={cn(
              "w-full p-3 rounded-xl border-2 flex items-center gap-3 transition-all",
              theoryViewed 
                ? "border-success/30 bg-success/5 text-success" 
                : "border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary"
            )}
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">
              {theoryViewed ? "Theory Completed" : "Read Theory First"}
            </span>
            {theoryViewed && <CheckCircle2 className="w-4 h-4 ml-auto" />}
          </button>
        </div>
      )}

      {/* Lessons */}
      {unlocked && (
        <div className="p-4 space-y-3">
          {level.lessons.map((lesson, lessonIndex) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              levelId={level.id}
              lessonIndex={lessonIndex}
              isUnlocked={isLessonUnlocked(level.id, lessonIndex)}
              isComplete={completedLessons.includes(lesson.id)}
            />
          ))}
        </div>
      )}

      {/* Badge Preview */}
      {level.badge && isLevelComplete && (
        <div className="px-5 pb-5">
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 text-center">
            <span className="text-2xl">🏆</span>
            <p className="text-sm font-bold text-accent mt-1">{level.badge}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { xp, streak, getCurrentLesson, preferredLanguage, getCourseData } = useGame();
  const currentLesson = getCurrentLesson();
  const courseData = getCourseData();

  // Redirect to language selection if no language is chosen
  useEffect(() => {
    if (!preferredLanguage) {
      navigate('/select-language');
    }
  }, [preferredLanguage, navigate]);

  // Don't render until we know the language preference
  if (!preferredLanguage) {
    return null;
  }

  const languageEmoji = preferredLanguage === 'python' ? '🐍' : '🌐';
  const languageName = preferredLanguage === 'python' ? 'Python' : 'JavaScript';

  return (
    <MainLayout>
      <div className="px-4 py-6 space-y-6">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 rounded-3xl p-6 border border-primary/20"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="text-5xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            >
              {languageEmoji}
            </motion.div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {streak > 0 ? `${streak} day streak! 🔥` : "Welcome back!"}
              </h2>
              <p className="text-muted-foreground">
                {currentLesson 
                  ? `Ready to continue learning ${languageName}?` 
                  : "Amazing! You've completed all lessons!"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Course Path */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground px-1">Your Learning Path</h3>
          
          <div className="space-y-4">
            {courseData.map((level, index) => (
              <LevelCard key={level.id} level={level} index={index} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
