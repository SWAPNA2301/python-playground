import { ReactNode, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BottomNav } from "@/components/navigation/BottomNav";
import { XPDisplay } from "@/components/game/XPDisplay";
import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  title?: string;
}

export function MainLayout({ children, showHeader = true, title }: MainLayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      {showHeader && (
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🐍</span>
              <h1 className="text-xl font-bold text-foreground">
                {title || "PyLearn"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <XPDisplay />
              {isLoggedIn ? (
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="default" size="sm" className="rounded-xl">
                    <LogIn className="w-4 h-4 mr-1" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </header>
      )}
      <main className="max-w-lg mx-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
