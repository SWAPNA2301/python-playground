import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Question } from "@/data/courseData";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/button";

interface FixCodeQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  disabled: boolean;
}

export function FixCodeQuestion({ question, onAnswer, disabled }: FixCodeQuestionProps) {
  const [answer, setAnswer] = useState(question.code || "");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const normalizeCode = (code: string) => {
    return code.replace(/\s+/g, ' ').trim().toLowerCase();
  };

  const handleSubmit = () => {
    if (disabled || showResult) return;
    
    const correct = normalizeCode(answer) === normalizeCode(question.correctAnswer);
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-foreground">{question.prompt}</h3>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="relative">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={disabled || showResult}
            rows={Math.max(3, answer.split('\n').length)}
            className={cn(
              "w-full px-5 py-4 rounded-2xl border-2 bg-code text-code-text font-mono text-sm resize-none",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
              !showResult && "border-border",
              showResult && isCorrect && "border-success bg-success/10",
              showResult && !isCorrect && "border-destructive bg-destructive/10"
            )}
          />
          
          {showResult && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-4 top-4"
            >
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-success" />
              ) : (
                <XCircle className="w-6 h-6 text-destructive" />
              )}
            </motion.div>
          )}
        </div>

        {showResult && !isCorrect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            <p className="text-sm text-muted-foreground font-medium">Correct code:</p>
            <CodeBlock code={question.correctAnswer} />
          </motion.div>
        )}

        {!showResult && (
          <Button
            onClick={handleSubmit}
            className="w-full h-14 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Check Code
          </Button>
        )}
      </motion.div>
    </div>
  );
}
