import { motion } from "framer-motion";
import { Trophy, Star, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "@/lib/confetti";
import { useEffect } from "react";

interface LessonCompleteProps {
  xpEarned: number;
  correctAnswers: number;
  totalQuestions: number;
  badge?: string;
  onContinue: () => void;
}

export function LessonComplete({
  xpEarned,
  correctAnswers,
  totalQuestions,
  badge,
  onContinue,
}: LessonCompleteProps) {
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const stars = accuracy >= 100 ? 3 : accuracy >= 80 ? 2 : 1;

  useEffect(() => {
    confetti();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
    >
      <div className="bg-card rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-border text-center">
        {/* Trophy */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-accent to-warning rounded-full flex items-center justify-center shadow-glow-accent"
        >
          <Trophy className="w-12 h-12 text-accent-foreground" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-extrabold mb-2"
        >
          Lesson Complete!
        </motion.h2>

        {/* Stars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-2 mb-6"
        >
          {[1, 2, 3].map((star) => (
            <motion.div
              key={star}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: star <= stars ? 1 : 0.7, 
                rotate: 0,
                opacity: star <= stars ? 1 : 0.3
              }}
              transition={{ delay: 0.5 + star * 0.1, type: "spring" }}
            >
              <Star 
                className={`w-10 h-10 ${
                  star <= stars 
                    ? 'text-accent fill-accent' 
                    : 'text-muted-foreground'
                }`} 
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-muted/50 rounded-2xl p-4 mb-6"
        >
          <div className="flex justify-around">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary">
                <Zap className="w-5 h-5 fill-primary" />
                <span className="text-2xl font-bold">{xpEarned}</span>
              </div>
              <p className="text-sm text-muted-foreground">XP Earned</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{accuracy}%</div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
          </div>
        </motion.div>

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-6"
          >
            <p className="text-sm text-primary font-medium">🎉 Badge Unlocked!</p>
            <p className="text-lg font-bold text-foreground">{badge}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={onContinue}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg h-14 rounded-2xl"
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
