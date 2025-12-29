import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Question, Lesson, Level } from "@/data/courseData";
import { useGame } from "@/context/GameContext";
import { ProgressBar } from "@/components/game/ProgressBar";
import { XPDisplay } from "@/components/game/XPDisplay";
import { HeartLossModal } from "@/components/game/HeartLossModal";
import { LessonComplete } from "@/components/game/LessonComplete";
import { MCQQuestion } from "@/components/questions/MCQQuestion";
import { FillBlankQuestion } from "@/components/questions/FillBlankQuestion";
import { FixCodeQuestion } from "@/components/questions/FixCodeQuestion";
import { OutputPredictionQuestion } from "@/components/questions/OutputPredictionQuestion";
import { Button } from "@/components/ui/button";

interface QuizScreenProps {
  levelId: number;
  lessonId: string;
}

export function QuizScreen({ levelId, lessonId }: QuizScreenProps) {
  const navigate = useNavigate();
  const { hearts, loseHeart, addXP, completeLesson, incrementStreak, getCourseData } = useGame();
  
  const courseData = getCourseData();
  const level = courseData.find(l => l.id === levelId);
  const lesson = level?.lessons.find(l => l.id === lessonId);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState("");
  const [showHeartModal, setShowHeartModal] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);

  if (!level || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Lesson not found</p>
      </div>
    );
  }

  const questions = lesson.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswer = (isCorrect: boolean) => {
    setIsAnswering(true);
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    } else {
      loseHeart();
      setCurrentExplanation(currentQuestion.explanation);
      setShowExplanation(true);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      if (!isCorrect && hearts <= 1) {
        setShowHeartModal(true);
      } else if (!isCorrect) {
        setShowExplanation(true);
      } else {
        moveToNextQuestion();
      }
    }, 1500);
  };

  const moveToNextQuestion = () => {
    setShowExplanation(false);
    setIsAnswering(false);
    
    if (currentQuestionIndex + 1 >= totalQuestions) {
      // Lesson complete!
      const xpEarned = lesson.xpReward;
      addXP(xpEarned);
      incrementStreak();
      completeLesson(lessonId);
      setShowComplete(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleContinueFromExplanation = () => {
    moveToNextQuestion();
  };

  const handleHeartModalClose = () => {
    setShowHeartModal(false);
    navigate('/');
  };

  const handleHeartModalContinue = () => {
    setShowHeartModal(false);
    setShowExplanation(true);
  };

  const handleComplete = () => {
    navigate('/');
  };

  const renderQuestion = () => {
    const props = {
      question: currentQuestion,
      onAnswer: handleAnswer,
      disabled: isAnswering,
    };

    switch (currentQuestion.type) {
      case 'mcq':
        return <MCQQuestion key={currentQuestion.id} {...props} />;
      case 'fill-blank':
        return <FillBlankQuestion key={currentQuestion.id} {...props} />;
      case 'fix-code':
        return <FixCodeQuestion key={currentQuestion.id} {...props} />;
      case 'output-prediction':
        return <OutputPredictionQuestion key={currentQuestion.id} {...props} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border px-4 py-3">
          <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-muted-foreground" />
            </button>
            
            <ProgressBar 
              current={currentQuestionIndex + 1} 
              total={totalQuestions} 
              className="flex-1"
            />
            
            <XPDisplay />
          </div>
        </header>

        {/* Question Content */}
        <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderQuestion()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Explanation Panel */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-3xl shadow-2xl p-6 z-50"
            >
              <div className="max-w-lg mx-auto">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-accent/10 rounded-full">
                    <Lightbulb className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Explanation</h4>
                    <p className="text-muted-foreground">{currentExplanation}</p>
                  </div>
                </div>
                <Button
                  onClick={handleContinueFromExplanation}
                  className="w-full h-14 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <HeartLossModal
        isOpen={showHeartModal}
        onClose={handleHeartModalClose}
        onContinue={handleHeartModalContinue}
      />

      {showComplete && (
        <LessonComplete
          xpEarned={lesson.xpReward}
          correctAnswers={correctAnswers}
          totalQuestions={totalQuestions}
          badge={level.badge}
          onContinue={handleComplete}
        />
      )}
    </>
  );
}
