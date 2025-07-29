import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Search, Plus, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddLink: () => void;
}

export const Header = ({ searchQuery, onSearchChange, onAddLink }: HeaderProps) => {
  const { signOut, user } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-xl shadow-glow">
            <Lock className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Link Locker
            </h1>
            <p className="text-xs text-muted-foreground">Your private collection</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            onClick={onAddLink}
            className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-elegant"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Link
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleSignOut}
            className="hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};