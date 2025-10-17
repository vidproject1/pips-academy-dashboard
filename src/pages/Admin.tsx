import MainLayout from '@/components/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

interface VideoItem { id: string; title: string; url?: string; path?: string; category?: string; }
interface StrategyItem { id: string; title: string; content: string; }
interface CheatSheetItem { id: string; title: string; path: string; }

const Admin = () => {
  const { toast } = useToast();

  // Existing content
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [strategies, setStrategies] = useState<StrategyItem[]>([]);
  const [cheatSheets, setCheatSheets] = useState<CheatSheetItem[]>([]);

  // Video form
  const [videoTitle, setVideoTitle] = useState('');
  const [videoCategory, setVideoCategory] = useState('General');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // Strategy form
  const [strategyTitle, setStrategyTitle] = useState('');
  const [strategyContent, setStrategyContent] = useState('');

  // Cheat sheet form
  const [cheatTitle, setCheatTitle] = useState('');
  const [cheatFile, setCheatFile] = useState<File | null>(null);

  useEffect(() => {
    // Fetch existing items from backend
    const loadAll = async () => {
      try {
        const [vRes, sRes, cRes] = await Promise.all([
          fetch('/api/videos'),
          fetch('/api/strategies'),
          fetch('/api/cheatsheets'),
        ]);
        if (vRes.ok) setVideos(await vRes.json());
        if (sRes.ok) setStrategies(await sRes.json());
        if (cRes.ok) setCheatSheets(await cRes.json());
      } catch (err) {
        console.warn('API not available yet, admin will work after starting backend.');
      }
    };
    loadAll();
  }, []);

  const submitVideoLink = async () => {
    if (!videoTitle || !videoUrl) {
      toast({ title: 'Missing fields', description: 'Enter a title and video URL.' });
      return;
    }
    try {
      const res = await fetch('/api/videos/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: videoTitle, url: videoUrl, category: videoCategory }),
      });
      if (!res.ok) throw new Error('Failed to save video link');
      const saved = await res.json();
      setVideos((prev) => [saved, ...prev]);
      setVideoTitle('');
      setVideoUrl('');
      toast({ title: 'Video link saved' });
    } catch (err) {
      toast({ title: 'Error', description: (err as Error).message });
    }
  };

  const submitVideoUpload = async () => {
    if (!videoTitle || !videoFile) {
      toast({ title: 'Missing fields', description: 'Select a file and enter a title.' });
      return;
    }
    try {
      const form = new FormData();
      form.append('video', videoFile);
      form.append('title', videoTitle);
      form.append('category', videoCategory);

      const res = await fetch('/api/videos/upload', {
        method: 'POST',
        body: form,
      });
      if (!res.ok) throw new Error('Failed to upload video');
      const saved = await res.json();
      setVideos((prev) => [saved, ...prev]);
      setVideoTitle('');
      setVideoFile(null);
      toast({ title: 'Video uploaded' });
    } catch (err) {
      toast({ title: 'Error', description: (err as Error).message });
    }
  };

  const submitStrategy = async () => {
    if (!strategyTitle || !strategyContent) {
      toast({ title: 'Missing fields', description: 'Enter a title and content.' });
      return;
    }
    try {
      const res = await fetch('/api/strategies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: strategyTitle, content: strategyContent }),
      });
      if (!res.ok) throw new Error('Failed to save strategy');
      const saved = await res.json();
      setStrategies((prev) => [saved, ...prev]);
      setStrategyTitle('');
      setStrategyContent('');
      toast({ title: 'Strategy saved' });
    } catch (err) {
      toast({ title: 'Error', description: (err as Error).message });
    }
  };

  const submitCheatSheet = async () => {
    if (!cheatTitle || !cheatFile) {
      toast({ title: 'Missing fields', description: 'Select a file and enter a title.' });
      return;
    }
    try {
      const form = new FormData();
      form.append('file', cheatFile);
      form.append('title', cheatTitle);
      const res = await fetch('/api/cheatsheets/upload', { method: 'POST', body: form });
      if (!res.ok) throw new Error('Failed to upload cheat sheet');
      const saved = await res.json();
      setCheatSheets((prev) => [saved, ...prev]);
      setCheatTitle('');
      setCheatFile(null);
      toast({ title: 'Cheat sheet uploaded' });
    } catch (err) {
      toast({ title: 'Error', description: (err as Error).message });
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage videos, strategies, and cheat sheets. Authentication will be added later.</p>
        </div>

        <Tabs defaultValue="videos">
          <TabsList>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="cheatsheets">Cheat Sheets</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Video by Link</CardTitle>
                <CardDescription>Provide a title and a YouTube/Vimeo URL.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="vtitle">Title</Label>
                  <Input id="vtitle" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vurl">URL</Label>
                  <Input id="vurl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vcat">Category</Label>
                  <Input id="vcat" value={videoCategory} onChange={(e) => setVideoCategory(e.target.value)} />
                </div>
                <Button onClick={submitVideoLink}>Save Link</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload Video File</CardTitle>
                <CardDescription>MP4/WEBM recommended for browser playback. Stored under /uploads/videos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="vf-title">Title</Label>
                  <Input id="vf-title" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vf-file">Video File</Label>
                  <Input id="vf-file" type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vf-cat">Category</Label>
                  <Input id="vf-cat" value={videoCategory} onChange={(e) => setVideoCategory(e.target.value)} />
                </div>
                <Button onClick={submitVideoUpload}>Upload Video</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Videos</CardTitle>
                <CardDescription>Links and uploaded files.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {videos.length === 0 && <p className="text-sm text-muted-foreground">No videos yet.</p>}
                  {videos.map((v) => (
                    <div key={v.id} className="flex items-center justify-between border rounded-md p-2">
                      <div>
                        <div className="font-medium">{v.title}</div>
                        {v.url && <div className="text-xs text-muted-foreground">{v.url}</div>}
                        {v.path && <div className="text-xs text-muted-foreground">{v.path}</div>}
                      </div>
                      {v.url ? (
                        <a className="text-sm text-primary underline" href={v.url} target="_blank" rel="noreferrer">Open</a>
                      ) : v.path ? (
                        <a className="text-sm text-primary underline" href={v.path} target="_blank" rel="noreferrer">Play</a>
                      ) : null}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Strategy Breakdown</CardTitle>
                <CardDescription>Type or paste strategy content.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="stitle">Title</Label>
                  <Input id="stitle" value={strategyTitle} onChange={(e) => setStrategyTitle(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="scontent">Content</Label>
                  <Textarea id="scontent" value={strategyContent} onChange={(e) => setStrategyContent(e.target.value)} rows={8} />
                </div>
                <Button onClick={submitStrategy}>Save Strategy</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {strategies.length === 0 && <p className="text-sm text-muted-foreground">No strategies yet.</p>}
                  {strategies.map((s) => (
                    <div key={s.id} className="border rounded-md p-2">
                      <div className="font-medium">{s.title}</div>
                      <div className="text-sm text-muted-foreground whitespace-pre-wrap">{s.content}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cheatsheets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Cheat Sheet</CardTitle>
                <CardDescription>PDF or image. Stored under /uploads/cheatsheets.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="ctitle">Title</Label>
                  <Input id="ctitle" value={cheatTitle} onChange={(e) => setCheatTitle(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cfile">File</Label>
                  <Input id="cfile" type="file" accept="application/pdf,image/*" onChange={(e) => setCheatFile(e.target.files?.[0] || null)} />
                </div>
                <Button onClick={submitCheatSheet}>Upload Cheat Sheet</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Cheat Sheets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cheatSheets.length === 0 && <p className="text-sm text-muted-foreground">No cheat sheets yet.</p>}
                  {cheatSheets.map((c) => (
                    <div key={c.id} className="flex items-center justify-between border rounded-md p-2">
                      <div>
                        <div className="font-medium">{c.title}</div>
                        <div className="text-xs text-muted-foreground">{c.path}</div>
                      </div>
                      <a className="text-sm text-primary underline" href={c.path} target="_blank" rel="noreferrer">Open</a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Admin;