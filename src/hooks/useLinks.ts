import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Link {
  id: string;
  title: string;
  url: string;
  description?: string;
  tags: string[];
  created_at: string;
}

export const useLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchLinks = async () => {
    if (!user) {
      setLinks([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching links:', error);
      toast({
        title: "Error",
        description: "Failed to load links",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [user]);

  const addLink = async (linkData: Omit<Link, 'id' | 'created_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('links')
        .insert([{
          ...linkData,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setLinks(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Link added successfully",
      });
    } catch (error) {
      console.error('Error adding link:', error);
      toast({
        title: "Error",
        description: "Failed to add link",
        variant: "destructive",
      });
    }
  };

  const updateLink = async (id: string, updates: Partial<Omit<Link, 'id' | 'created_at'>>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('links')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setLinks(prev => prev.map(link => 
        link.id === id ? data : link
      ));
      toast({
        title: "Success",
        description: "Link updated successfully",
      });
    } catch (error) {
      console.error('Error updating link:', error);
      toast({
        title: "Error",
        description: "Failed to update link",
        variant: "destructive",
      });
    }
  };

  const deleteLink = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLinks(prev => prev.filter(link => link.id !== id));
      toast({
        title: "Success",
        description: "Link deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting link:', error);
      toast({
        title: "Error",
        description: "Failed to delete link",
        variant: "destructive",
      });
    }
  };

  return {
    links,
    loading,
    addLink,
    updateLink,
    deleteLink,
    refetch: fetchLinks
  };
};