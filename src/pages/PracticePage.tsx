import { motion } from "framer-motion";
import { Shuffle, Target, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { courseData } from "@/data/courseData";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";

export default function PracticePage() {
  const navigate = useNavigate();
  const { completedLessons } = useGame();

  // Get all questions from completed lessons for practice
  const availableQuestions = courseData
    .flatMap(level => level.lessons)
    .filter(lesson => completedLessons.includes(lesson.id))
    .flatMap(lesson => lesson.questions);

  const practiceCategories = [
    {
      id: "quick",
      title: "Quick Practice",
      description: "5 random questions from completed lessons",
      icon: Zap,
      color: "primary",
      disabled: availableQuestions.length < 5,
    },
    {
      id: "targeted",
      title: "Targeted Practice",
      description: "Focus on a specific topic",
      icon: Target,
      color: "accent",
      disabled: completedLessons.length === 0,
    },
    {
      id: "random",
      title: "Random Mix",
      description: "All question types mixed together",
      icon: Shuffle,
      color: "info",
      disabled: availableQuestions.length === 0,
    },
  ];

  const handlePractice = (categoryId: string) => {
    // In a full implementation, this would start a practice session
    // For now, redirect to home
    navigate("/");
  };

  return (
    <MainLayout title="Practice">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">Practice Mode</h2>
          <p className="text-muted-foreground">
            Strengthen your skills with targeted practice
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-3xl border border-border p-6"
        >
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">{completedLessons.length}</p>
              <p className="text-sm text-muted-foreground">Lessons Completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">{availableQuestions.length}</p>
              <p className="text-sm text-muted-foreground">Questions Available</p>
            </div>
          </div>
        </motion.div>

        {/* Practice Categories */}
        <div className="space-y-3">
          {practiceCategories.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Button
                  onClick={() => handlePractice(category.id)}
                  disabled={category.disabled}
                  variant="ghost"
                  className="w-full h-auto p-5 rounded-2xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 justify-start disabled:opacity-50"
                >
                  <div className={`w-12 h-12 rounded-xl bg-${category.color}/10 flex items-center justify-center mr-4`}>
                    <Icon className={`w-6 h-6 text-${category.color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-foreground">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* No Lessons Message */}
        {completedLessons.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-8"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg font-bold text-foreground mb-2">Complete lessons first!</h3>
            <p className="text-muted-foreground mb-4">
              Practice mode unlocks after you complete your first lesson.
            </p>
            <Button onClick={() => navigate("/")} className="rounded-2xl">
              Start Learning
            </Button>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
