
import { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContentCard from '@/components/ContentCard';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { videoCategories } from '@/data/mockData';
import { Video } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const VideoLessons = () => {
  const [activeCategory, setActiveCategory] = useState(videoCategories[0].id);
  const isMobile = useIsMobile();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Video Lessons</h1>
          <p className="text-muted-foreground mt-2">
            Watch and learn through our structured video curriculum
          </p>
        </div>
        
        <Tabs defaultValue={videoCategories[0].id} onValueChange={setActiveCategory}>
          <TabsList className={`${isMobile ? 'mb-8 justify-center' : 'mb-6'}`}>
            {videoCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className={isMobile ? 'text-xs py-1.5 px-2' : 'text-sm py-2'}
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {videoCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{category.title}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {category.videos.map((video) => (
                  <ContentCard
                    key={video.id}
                    id={video.id}
                    type="video"
                    title={video.title}
                    description={video.description}
                    icon={<Video className="h-5 w-5" />}
                  >
                    <div className="mt-4">
                      <YouTubeEmbed url={video.youtubeUrl} title={video.title} />
                    </div>
                  </ContentCard>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default VideoLessons;
