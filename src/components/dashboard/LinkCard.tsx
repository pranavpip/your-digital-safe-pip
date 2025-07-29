import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Edit, Trash2, Globe } from "lucide-react";
import { format } from "date-fns";
import { Link } from "@/hooks/useLinks";

interface LinkCardProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
}

export const LinkCard = ({ link, onEdit, onDelete }: LinkCardProps) => {
  const [faviconError, setFaviconError] = useState(false);
  
  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  const openLink = () => {
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-gradient-card border border-border/50 rounded-xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            {!faviconError && getFaviconUrl(link.url) ? (
              <img
                src={getFaviconUrl(link.url)}
                alt=""
                className="w-8 h-8 rounded-lg"
                onError={() => setFaviconError(true)}
              />
            ) : (
              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {link.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {new URL(link.url).hostname}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(link)}
            className="h-8 w-8"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(link.id)}
            className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {link.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {link.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {link.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            {format(new Date(link.created_at), 'MMM d, yyyy')}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={openLink}
            className="h-8 w-8 hover:bg-primary hover:text-primary-foreground"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};