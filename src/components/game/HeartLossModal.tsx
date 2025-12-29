import { motion, AnimatePresence } from "framer-motion";
import { Heart, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";

interface HeartLossModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export function HeartLossModal({ isOpen, onClose, onContinue }: HeartLossModalProps) {
  const { hearts, restoreHearts } = useGame();

  const handleRestore = () => {
    restoreHearts();
    onContinue();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-border text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center"
            >
              <Heart className="w-10 h-10 text-destructive" />
            </motion.div>

            <h2 className="text-2xl font-bold mb-2">Out of Hearts!</h2>
            <p className="text-muted-foreground mb-6">
              {hearts === 0 
                ? "You've run out of hearts. Take a break or restore them to continue learning."
                : `You have ${hearts} hearts left. Be careful!`
              }
            </p>

            <div className="space-y-3">
              {hearts === 0 ? (
                <>
                  <Button
                    onClick={handleRestore}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Restore Hearts
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    className="w-full"
                  >
                    Go Home
                  </Button>
                </>
              ) : (
                <Button
                  onClick={onContinue}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Continue Learning
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
