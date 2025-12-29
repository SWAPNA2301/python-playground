import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/context/GameContext";
import { Code2, Sparkles } from "lucide-react";

const languages = [
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    description: "Great for beginners, data science & AI",
    color: "from-yellow-500/20 to-blue-500/20",
    borderColor: "border-yellow-500/30 hover:border-yellow-500/60"
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "🌐",
    description: "The language of the web & apps",
    color: "from-yellow-400/20 to-orange-500/20",
    borderColor: "border-yellow-400/30 hover:border-yellow-400/60"
  }
];

export default function LanguageSelectionPage() {
  const navigate = useNavigate();
  const { setPreferredLanguage } = useGame();

  const handleSelectLanguage = (languageId: string) => {
    setPreferredLanguage(languageId as 'python' | 'javascript');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="pt-12 pb-6 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Code2 className="w-8 h-8 text-primary" />
          <Sparkles className="w-5 h-5 text-accent" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-extrabold text-foreground mb-2"
        >
          Welcome to CodeQuest!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg"
        >
          Which programming language do you want to learn?
        </motion.p>
      </header>

      {/* Language Selection */}
      <main className="flex-1 px-6 pb-8">
        <div className="max-w-md mx-auto space-y-4">
          {languages.map((language, index) => (
            <motion.button
              key={language.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectLanguage(language.id)}
              className={`
                w-full p-6 rounded-3xl border-2 text-left transition-all
                bg-gradient-to-br ${language.color} ${language.borderColor}
                bg-card/50 backdrop-blur-sm
              `}
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">{language.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {language.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {language.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          You can change this later in your profile
        </motion.p>
      </main>
    </div>
  );
}
