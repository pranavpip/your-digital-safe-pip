import { useState, useMemo } from "react";
import { Header } from "@/components/dashboard/Header";
import { LinkCard } from "@/components/dashboard/LinkCard";
import { AddLinkDialog } from "@/components/dashboard/AddLinkDialog";
import { EditLinkDialog } from "@/components/dashboard/EditLinkDialog";
import { TagFilter } from "@/components/dashboard/TagFilter";
import { useLinks, Link } from "@/hooks/useLinks";

export const Dashboard = () => {
  const { links, loading, addLink, updateLink, deleteLink } = useLinks();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    links.forEach(link => link.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [links]);

  // Filter links based on search and tags
  const filteredLinks = useMemo(() => {
    return links.filter(link => {
      const matchesSearch = searchQuery === "" || 
        link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => link.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [links, searchQuery, selectedTags]);

  const handleAddLink = async (newLink: { title: string; url: string; description: string; tags: string[] }) => {
    await addLink({
      title: newLink.title,
      url: newLink.url,
      description: newLink.description || undefined,
      tags: newLink.tags,
    });
  };

  const handleEditLink = (link: Link) => {
    setEditingLink(link);
  };

  const handleUpdateLink = async (id: string, updates: Partial<Omit<Link, 'id' | 'created_at'>>) => {
    await updateLink(id, updates);
    setEditingLink(null);
  };

  const handleDeleteLink = async (id: string) => {
    await deleteLink(id);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleClearAllTags = () => {
    setSelectedTags([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading links...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddLink={() => setIsAddDialogOpen(true)}
      />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-card">
              <TagFilter
                allTags={allTags}
                selectedTags={selectedTags}
                onTagSelect={handleTagSelect}
                onTagRemove={handleTagRemove}
                onClearAll={handleClearAllTags}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Your Links
              </h2>
              <p className="text-muted-foreground">
                {filteredLinks.length} {filteredLinks.length === 1 ? 'link' : 'links'} 
                {searchQuery && ` matching "${searchQuery}"`}
                {selectedTags.length > 0 && ` tagged with ${selectedTags.join(', ')}`}
              </p>
            </div>

            {filteredLinks.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-muted/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔗</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {searchQuery || selectedTags.length > 0 ? "No matching links" : "No links yet"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || selectedTags.length > 0 
                    ? "Try adjusting your search or filters"
                    : "Start building your link collection by adding your first bookmark"
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLinks.map((link) => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    onEdit={handleEditLink}
                    onDelete={handleDeleteLink}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <AddLinkDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddLink}
      />

      <EditLinkDialog
        open={!!editingLink}
        onOpenChange={(open) => !open && setEditingLink(null)}
        link={editingLink}
        onEditLink={handleUpdateLink}
      />
    </div>
  );
};