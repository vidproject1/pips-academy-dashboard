
import { useRef, useState } from 'react';

interface YouTubeEmbedProps {
  url: string;
  title?: string;
}

const YouTubeEmbed = ({ url, title = "YouTube video player" }: YouTubeEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="w-full h-full"
        src={url}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={handleLoad}
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
