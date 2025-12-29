import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Question } from "@/data/courseData";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/button";

interface OutputPredictionQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  disabled: boolean;
}

export function OutputPredictionQuestion({ question, onAnswer, disabled }: OutputPredictionQuestionProps) {
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const normalizeOutput = (output: string) => {
    return output.trim().toLowerCase();
  };

  const handleSubmit = () => {
    if (disabled || showResult || !answer.trim()) return;
    
    const correct = normalizeOutput(answer) === normalizeOutput(question.correctAnswer);
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-foreground">{question.prompt}</h3>
      
      {question.code && (
        <CodeBlock code={question.code} highlight />
      )}
      
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
            placeholder="What will be printed?"
            rows={2}
            className={cn(
              "w-full px-5 py-4 rounded-2xl border-2 bg-card text-foreground font-mono text-lg resize-none",
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
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground"
          >
            Correct output: <span className="font-mono text-primary font-bold whitespace-pre-wrap">{question.correctAnswer}</span>
          </motion.p>
        )}

        {!showResult && (
          <Button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className="w-full h-14 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Check Output
          </Button>
        )}
      </motion.div>
    </div>
  );
}
