import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  onClearAll: () => void;
}

export const TagFilter = ({ allTags, selectedTags, onTagSelect, onTagRemove, onClearAll }: TagFilterProps) => {
  if (allTags.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Filter by tags</h3>
        {selectedTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-xs"
          >
            Clear all
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <Badge
              key={tag}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer transition-all ${
                isSelected 
                  ? "bg-primary text-primary-foreground hover:bg-primary-dark" 
                  : "hover:bg-secondary"
              }`}
              onClick={() => isSelected ? onTagRemove(tag) : onTagSelect(tag)}
            >
              <span>{tag}</span>
              {isSelected && (
                <X className="w-3 h-3 ml-1" />
              )}
            </Badge>
          );
        })}
      </div>
      
      {selectedTags.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Showing links with: {selectedTags.join(", ")}
        </p>
      )}
    </div>
  );
};