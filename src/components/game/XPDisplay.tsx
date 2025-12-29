import { motion, AnimatePresence } from "framer-motion";
import { Flame, Heart, Zap } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { useState, useEffect } from "react";

interface XPPopupProps {
  amount: number;
  show: boolean;
}

function XPPopup({ amount, show }: XPPopupProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -30, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="absolute -top-2 left-1/2 -translate-x-1/2 text-accent font-bold text-lg whitespace-nowrap"
        >
          +{amount} XP
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function XPDisplay() {
  const { xp, hearts, maxHearts, streak } = useGame();
  const [prevXP, setPrevXP] = useState(xp);
  const [showPopup, setShowPopup] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  useEffect(() => {
    if (xp > prevXP) {
      setXpGained(xp - prevXP);
      setShowPopup(true);
      const timer = setTimeout(() => setShowPopup(false), 1000);
      setPrevXP(xp);
      return () => clearTimeout(timer);
    }
    setPrevXP(xp);
  }, [xp, prevXP]);

  return (
    <div className="flex items-center gap-4">
      {/* Streak */}
      <motion.div 
        className="flex items-center gap-1.5 bg-accent/10 px-3 py-1.5 rounded-full"
        whileHover={{ scale: 1.05 }}
      >
        <Flame className="w-5 h-5 text-accent" />
        <span className="font-bold text-foreground">{streak}</span>
      </motion.div>

      {/* Hearts */}
      <motion.div 
        className="flex items-center gap-1.5 bg-destructive/10 px-3 py-1.5 rounded-full"
        animate={hearts < maxHearts ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart className={`w-5 h-5 ${hearts > 0 ? 'text-destructive fill-destructive' : 'text-muted-foreground'}`} />
        <span className="font-bold text-foreground">{hearts}</span>
      </motion.div>

      {/* XP */}
      <motion.div 
        className="relative flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full"
        whileHover={{ scale: 1.05 }}
      >
        <Zap className="w-5 h-5 text-primary fill-primary" />
        <span className="font-bold text-foreground">{xp}</span>
        <XPPopup amount={xpGained} show={showPopup} />
      </motion.div>
    </div>
  );
}
