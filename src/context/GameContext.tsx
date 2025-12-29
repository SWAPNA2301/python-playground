import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Level } from '@/data/courseData';
import { pythonCourseData } from '@/data/pythonCourseData';
import { javascriptCourseData } from '@/data/javascriptCourseData';

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  currentQuestion: number;
  correctAnswers: number;
}

interface GameState {
  xp: number;
  hearts: number;
  maxHearts: number;
  streak: number;
  currentLevel: number;
  completedLessons: string[];
  lessonProgress: Record<string, LessonProgress>;
  earnedBadges: string[];
  lastPlayedDate: string;
  preferredLanguage: 'python' | 'javascript' | null;
  viewedTheories: number[];
}

interface GameContextType extends GameState {
  addXP: (amount: number) => void;
  loseHeart: () => void;
  restoreHearts: () => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  completeLesson: (lessonId: string) => void;
  updateLessonProgress: (lessonId: string, progress: Partial<LessonProgress>) => void;
  getLessonProgress: (lessonId: string) => LessonProgress | undefined;
  unlockBadge: (badgeId: string) => void;
  isLevelUnlocked: (levelId: number) => boolean;
  isLessonUnlocked: (levelId: number, lessonIndex: number) => boolean;
  getCurrentLesson: () => { levelId: number; lessonIndex: number } | null;
  setPreferredLanguage: (language: 'python' | 'javascript') => void;
  getCourseData: () => Level[];
  hasViewedTheory: (levelId: number) => boolean;
  markTheoryViewed: (levelId: number) => void;
}

const defaultState: GameState = {
  xp: 0,
  hearts: 5,
  maxHearts: 5,
  streak: 0,
  currentLevel: 1,
  completedLessons: [],
  lessonProgress: {},
  earnedBadges: [],
  lastPlayedDate: new Date().toDateString(),
  preferredLanguage: null,
  viewedTheories: [],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem('pylearn-game-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Check if it's a new day to restore hearts
      if (parsed.lastPlayedDate !== new Date().toDateString()) {
        return { ...parsed, hearts: 5, lastPlayedDate: new Date().toDateString() };
      }
      return { ...defaultState, ...parsed };
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('pylearn-game-state', JSON.stringify(state));
  }, [state]);

  const getCourseData = (): Level[] => {
    return state.preferredLanguage === 'javascript' ? javascriptCourseData : pythonCourseData;
  };

  const addXP = (amount: number) => {
    setState(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const loseHeart = () => {
    setState(prev => ({ ...prev, hearts: Math.max(0, prev.hearts - 1) }));
  };

  const restoreHearts = () => {
    setState(prev => ({ ...prev, hearts: prev.maxHearts }));
  };

  const incrementStreak = () => {
    setState(prev => ({ ...prev, streak: prev.streak + 1 }));
  };

  const resetStreak = () => {
    setState(prev => ({ ...prev, streak: 0 }));
  };

  const completeLesson = (lessonId: string) => {
    setState(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      
      const newCompleted = [...prev.completedLessons, lessonId];
      const courseData = getCourseData();
      
      // Check if we should unlock next level
      let newCurrentLevel = prev.currentLevel;
      const currentLevelData = courseData.find(l => l.id === prev.currentLevel);
      if (currentLevelData) {
        const allLessonsComplete = currentLevelData.lessons.every(
          lesson => newCompleted.includes(lesson.id)
        );
        if (allLessonsComplete && prev.currentLevel < courseData.length) {
          newCurrentLevel = prev.currentLevel + 1;
        }
      }
      
      return {
        ...prev,
        completedLessons: newCompleted,
        currentLevel: newCurrentLevel,
      };
    });
  };

  const updateLessonProgress = (lessonId: string, progress: Partial<LessonProgress>) => {
    setState(prev => ({
      ...prev,
      lessonProgress: {
        ...prev.lessonProgress,
        [lessonId]: {
          ...prev.lessonProgress[lessonId],
          lessonId,
          completed: false,
          currentQuestion: 0,
          correctAnswers: 0,
          ...prev.lessonProgress[lessonId],
          ...progress,
        },
      },
    }));
  };

  const getLessonProgress = (lessonId: string) => {
    return state.lessonProgress[lessonId];
  };

  const unlockBadge = (badgeId: string) => {
    setState(prev => {
      if (prev.earnedBadges.includes(badgeId)) return prev;
      return { ...prev, earnedBadges: [...prev.earnedBadges, badgeId] };
    });
  };

  const isLevelUnlocked = (levelId: number) => {
    return levelId <= state.currentLevel;
  };

  const isLessonUnlocked = (levelId: number, lessonIndex: number) => {
    if (!isLevelUnlocked(levelId)) return false;
    if (lessonIndex === 0) return true;
    
    const courseData = getCourseData();
    const level = courseData.find(l => l.id === levelId);
    if (!level) return false;
    
    const prevLesson = level.lessons[lessonIndex - 1];
    return state.completedLessons.includes(prevLesson.id);
  };

  const getCurrentLesson = () => {
    const courseData = getCourseData();
    for (const level of courseData) {
      if (!isLevelUnlocked(level.id)) continue;
      
      for (let i = 0; i < level.lessons.length; i++) {
        const lesson = level.lessons[i];
        if (!state.completedLessons.includes(lesson.id) && isLessonUnlocked(level.id, i)) {
          return { levelId: level.id, lessonIndex: i };
        }
      }
    }
    return null;
  };

  const setPreferredLanguage = (language: 'python' | 'javascript') => {
    setState(prev => ({ 
      ...prev, 
      preferredLanguage: language,
      // Reset progress when changing language
      completedLessons: [],
      lessonProgress: {},
      currentLevel: 1,
      viewedTheories: [],
    }));
  };

  const hasViewedTheory = (levelId: number) => {
    return state.viewedTheories.includes(levelId);
  };

  const markTheoryViewed = (levelId: number) => {
    setState(prev => {
      if (prev.viewedTheories.includes(levelId)) return prev;
      return { ...prev, viewedTheories: [...prev.viewedTheories, levelId] };
    });
  };

  return (
    <GameContext.Provider
      value={{
        ...state,
        addXP,
        loseHeart,
        restoreHearts,
        incrementStreak,
        resetStreak,
        completeLesson,
        updateLessonProgress,
        getLessonProgress,
        unlockBadge,
        isLevelUnlocked,
        isLessonUnlocked,
        getCurrentLesson,
        setPreferredLanguage,
        getCourseData,
        hasViewedTheory,
        markTheoryViewed,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
