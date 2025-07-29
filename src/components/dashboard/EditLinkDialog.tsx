import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Link } from "@/hooks/useLinks";

interface EditLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: Link | null;
  onEditLink: (id: string, updates: Partial<Omit<Link, 'id' | 'created_at'>>) => void;
}

export const EditLinkDialog = ({ open, onOpenChange, link, onEditLink }: EditLinkDialogProps) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (link) {
      setTitle(link.title);
      setUrl(link.url);
      setDescription(link.description || "");
      setTags(link.tags.join(", "));
    }
  }, [link]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!link) return;

    const tagsArray = tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    onEditLink(link.id, {
      title,
      url,
      description: description || undefined,
      tags: tagsArray,
    });

    onOpenChange(false);
  };

  const handleTagRemove = (tagToRemove: string) => {
    const tagsArray = tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0 && tag !== tagToRemove);
    setTags(tagsArray.join(", "));
  };

  const currentTags = tags
    .split(",")
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter link title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the link"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              type="text"
              placeholder="web, design, tools"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            {currentTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {currentTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Update Link
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};