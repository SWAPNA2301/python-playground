import { useParams, useNavigate } from "react-router-dom";
import { QuizScreen } from "@/components/quiz/QuizScreen";
import { useEffect } from "react";
import { useGame } from "@/context/GameContext";

export default function LessonPage() {
  const { levelId, lessonId } = useParams<{ levelId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { isLevelUnlocked, isLessonUnlocked, hearts } = useGame();

  // Validate access
  useEffect(() => {
    if (!levelId || !lessonId) {
      navigate('/');
      return;
    }

    const levelNum = parseInt(levelId);
    if (!isLevelUnlocked(levelNum)) {
      navigate('/');
      return;
    }
  }, [levelId, lessonId, navigate, isLevelUnlocked, isLessonUnlocked]);

  if (!levelId || !lessonId) {
    return null;
  }

  return (
    <QuizScreen 
      levelId={parseInt(levelId)} 
      lessonId={lessonId} 
    />
  );
}
