import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, X } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { pythonTheory } from "@/data/pythonCourseData";
import { javascriptTheory } from "@/data/javascriptCourseData";

export default function TheoryPage() {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const { preferredLanguage, getCourseData, markTheoryViewed } = useGame();

  const level = parseInt(levelId || "1");
  const theory = preferredLanguage === 'javascript' ? javascriptTheory : pythonTheory;
  const theoryContent = theory[level];
  const courseData = getCourseData();
  const levelData = courseData.find(l => l.id === level);

  if (!theoryContent || !levelData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Theory not found</p>
      </div>
    );
  }

  const firstLessonId = levelData.lessons[0]?.id;

  const handleStartPractice = () => {
    markTheoryViewed(level);
    if (firstLessonId) {
      navigate(`/lesson/${level}/${firstLessonId}`);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <button
            onClick={handleClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
          
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground">Level {level} Theory</span>
          </div>
          
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* Level Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-5xl mb-3">{levelData.icon}</div>
          <h1 className="text-2xl font-extrabold text-foreground mb-2">
            {theoryContent.title}
          </h1>
          <p className="text-muted-foreground">
            What you'll learn in this level
          </p>
        </motion.div>

        {/* Theory Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-3xl border border-border p-6 mb-6"
        >
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="text-lg">📝</span>
            Key Concepts
          </h3>
          <ul className="space-y-3">
            {theoryContent.points.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="flex items-start gap-3"
              >
                <span className="text-primary mt-0.5">•</span>
                <span className="text-foreground">{point}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-3xl border border-border p-6 mb-8"
        >
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="text-lg">💻</span>
            Examples
          </h3>
          <div className="space-y-4">
            {theoryContent.examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <CodeBlock code={example.code} />
                {example.description && (
                  <p className="text-sm text-muted-foreground mt-2 ml-1">
                    ↳ {example.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Start Practice Button */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-lg border-t border-border p-4">
        <div className="max-w-lg mx-auto">
          <Button
            onClick={handleStartPractice}
            className="w-full h-14 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Start Practice
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
