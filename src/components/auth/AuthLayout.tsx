import { ReactNode } from "react";
import { Lock } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-glow mb-6">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Link Locker
          </h1>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {title}
          </h2>
          <p className="text-muted-foreground">
            {subtitle}
          </p>
        </div>
        
        <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-card p-8">
          {children}
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          Your private bookmark sanctuary
        </p>
      </div>
    </div>
  );
};