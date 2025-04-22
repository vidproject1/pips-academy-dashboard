
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Check, RefreshCw } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';

interface ContentCardProps {
  id: string;
  type: "video" | "strategy";
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const ContentCard = ({
  id,
  type,
  title,
  description,
  icon,
  children,
  className,
}: ContentCardProps) => {
  const { isCompleted, markAsCompleted, markAsIncomplete } = useProgress();
  const completed = isCompleted(id, type);

  const handleToggleComplete = () => {
    if (completed) {
      markAsIncomplete(id, type);
    } else {
      markAsCompleted(id, type);
    }
  };

  return (
    <div
      className={cn(
        "border border-border rounded-xl p-5 shadow-sm transition-all duration-200",
        completed ? "card-watched" : "hover:shadow-md bg-card",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          {icon && <div className="mt-1 text-primary">{icon}</div>}
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
          </div>
        </div>
        
        <Button 
          variant={completed ? "outline" : "default"}
          size="sm"
          className="ml-2 flex-shrink-0"
          onClick={handleToggleComplete}
        >
          {completed ? (
            <>
              <RefreshCw className="h-4 w-4 mr-1" /> Revisit
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-1" /> Mark Complete
            </>
          )}
        </Button>
      </div>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default ContentCard;
