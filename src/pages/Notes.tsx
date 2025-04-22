
import { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import { useNotes } from '@/contexts/NotesContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Tag, Save, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Notes = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-save timer
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef<number | null>(null);

  // Set active note content when selected
  useEffect(() => {
    if (activeNote) {
      const note = notes.find(n => n.id === activeNote);
      if (note) {
        setContent(note.content);
        setTags(note.tags);
      }
    } else {
      setContent('');
      setTags([]);
    }
  }, [activeNote, notes]);

  // Auto-focus textarea when creating a new note
  useEffect(() => {
    if (activeNote === 'new' && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [activeNote]);

  const handleCreateNewNote = () => {
    setActiveNote('new');
    setContent('');
    setTags([]);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSaveNote = () => {
    if (!content.trim()) return;
    
    if (activeNote === 'new') {
      addNote(content, tags);
    } else if (activeNote) {
      updateNote(activeNote, content, tags);
    }
    
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    
    // Debounce auto-save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = window.setTimeout(() => {
      if (activeNote && activeNote !== 'new' && e.target.value.trim()) {
        updateNote(activeNote, e.target.value, tags);
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1000);
      }
    }, 2000);
  };

  const handleDeleteNote = () => {
    if (activeNote && activeNote !== 'new') {
      deleteNote(activeNote);
      setActiveNote(null);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
          <p className="text-muted-foreground mt-2">
            Create and organize your personal trading notes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Notes Sidebar */}
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Your Notes</CardTitle>
                  <Button variant="outline" size="sm" onClick={handleCreateNewNote}>
                    <PlusCircle className="h-4 w-4 mr-1" /> New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {notes.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4 text-center">
                    No notes yet. Create your first note!
                  </p>
                ) : (
                  <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                    {notes.map((note) => (
                      <Button 
                        key={note.id}
                        variant={activeNote === note.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveNote(note.id)}
                      >
                        <div className="truncate text-left">
                          <div className="font-medium truncate">
                            {note.content.split('\n')[0] || 'Untitled Note'}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Note Editor */}
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>
                    {activeNote ? (activeNote === 'new' ? 'New Note' : 'Edit Note') : 'Select a Note'}
                  </CardTitle>
                  <div className="flex space-x-2">
                    {activeNote && activeNote !== 'new' && (
                      <Button variant="destructive" size="sm" onClick={handleDeleteNote}>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    )}
                    {activeNote && (
                      <Button variant="default" size="sm" onClick={handleSaveNote}>
                        <Save className="h-4 w-4 mr-1" /> 
                        {isSaving ? 'Saving...' : 'Save'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeNote ? (
                  <>
                    <Textarea
                      ref={textareaRef}
                      placeholder="Start typing your note here..."
                      className="min-h-[300px] resize-none"
                      value={content}
                      onChange={handleContentChange}
                    />
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tags</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="gap-1">
                            {tag}
                            <button 
                              className="ml-1 text-xs" 
                              onClick={() => handleRemoveTag(tag)}
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a tag..."
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                        />
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={handleAddTag}
                        >
                          <Tag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <p className="text-muted-foreground mb-4">
                      Select a note to edit or create a new one
                    </p>
                    <Button onClick={handleCreateNewNote}>
                      <PlusCircle className="h-4 w-4 mr-1" /> Create New Note
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Notes;
