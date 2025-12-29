import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Question, Option } from "@/data/courseData";

interface MCQQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  disabled: boolean;
}

export function MCQQuestion({ question, onAnswer, disabled }: MCQQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (optionId: string) => {
    if (disabled || showResult) return;
    
    setSelected(optionId);
    setShowResult(true);
    
    const isCorrect = optionId === question.correctAnswer;
    
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-foreground mb-6">{question.prompt}</h3>
      
      <div className="space-y-3">
        {question.options?.map((option, index) => {
          const isSelected = selected === option.id;
          const isCorrect = option.id === question.correctAnswer;
          const showCorrect = showResult && isCorrect;
          const showWrong = showResult && isSelected && !isCorrect;

          return (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={disabled || showResult}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              className={cn(
                "w-full p-4 rounded-2xl border-2 text-left transition-all duration-300",
                "flex items-center gap-3",
                !showResult && "hover:border-primary/50 hover:bg-primary/5",
                !showResult && !isSelected && "border-border bg-card",
                !showResult && isSelected && "border-primary bg-primary/10",
                showCorrect && "border-success bg-success/10 pulse-success",
                showWrong && "border-destructive bg-destructive/10 shake"
              )}
            >
              <span 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                  !showResult && "bg-muted text-muted-foreground",
                  showCorrect && "bg-success text-success-foreground",
                  showWrong && "bg-destructive text-destructive-foreground"
                )}
              >
                {showCorrect ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : showWrong ? (
                  <XCircle className="w-5 h-5" />
                ) : (
                  String.fromCharCode(65 + index)
                )}
              </span>
              <span className="text-foreground font-medium">{option.text}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
