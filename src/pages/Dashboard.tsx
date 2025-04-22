
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Video, FileText, BookOpen, Tag } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { videoCategories } from '@/data/mockData';

const Dashboard = () => {
  const { getProgressPercentage, progress } = useProgress();
  const [totalVideos, setTotalVideos] = useState(0);

  useEffect(() => {
    // Calculate total videos for progress percentage
    let count = 0;
    videoCategories.forEach(category => {
      count += category.videos.length;
    });
    setTotalVideos(count);
  }, []);

  // Calculate module completion stats
  const videoCompletionRate = Math.round(
    (progress.filter(item => item.type === 'video' && item.completed).length / totalVideos) * 100
  ) || 0;
  
  const strategyCompletionRate = Math.round(
    (progress.filter(item => item.type === 'strategy' && item.completed).length / 4) * 100
  ) || 0;

  const notesCount = 0; // In a real app, this would come from the notes context

  // Dashboard modules
  const dashboardModules = [
    {
      title: 'Video Lessons',
      description: `${videoCompletionRate}% completed`,
      progress: videoCompletionRate,
      icon: <Video className="h-5 w-5" />,
      link: '/videos',
      color: 'bg-blue-500',
    },
    {
      title: 'Strategy Breakdown',
      description: `${strategyCompletionRate}% completed`,
      progress: strategyCompletionRate,
      icon: <FileText className="h-5 w-5" />,
      link: '/strategy',
      color: 'bg-indigo-500',
    },
    {
      title: 'Your Notes',
      description: `${notesCount} notes created`,
      icon: <BookOpen className="h-5 w-5" />,
      link: '/notes',
      color: 'bg-purple-500',
    },
    {
      title: 'Cheat Sheets',
      description: 'Download quick references',
      icon: <Tag className="h-5 w-5" />,
      link: '/cheatsheets',
      color: 'bg-green-500',
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to Only Pips Academy. Track your progress and access all learning modules from here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardModules.map((module, index) => (
            <Link to={module.link} key={index} className="block">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className={`p-2 rounded-md ${module.color} text-white`}>
                      {module.icon}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {index + 1}/4
                    </div>
                  </div>
                  <CardTitle className="mt-3">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {module.progress !== undefined && (
                    <Progress value={module.progress} className="h-2" />
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart className="h-5 w-5 text-primary" />
                <CardTitle>Overall Progress</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={getProgressPercentage()} className="h-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{getProgressPercentage()}%</div>
                      <p className="text-xs text-muted-foreground">Total Completion</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{videoCompletionRate}%</div>
                      <p className="text-xs text-muted-foreground">Videos Watched</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{strategyCompletionRate}%</div>
                      <p className="text-xs text-muted-foreground">Strategy Sections Read</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{notesCount}</div>
                      <p className="text-xs text-muted-foreground">Notes Created</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
