import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Tag, 
  Video, 
  BarChart, 
  Menu, 
  X 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProgress } from '@/contexts/ProgressContext';
import DarkModeToggle from './DarkModeToggle';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { getProgressPercentage } = useProgress();
  const progressPercentage = getProgressPercentage();
  
  // Close sidebar on mobile view by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation items
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <BarChart className="h-5 w-5" /> },
    { path: '/videos', label: 'Video Lessons', icon: <Video className="h-5 w-5" /> },
    { path: '/strategy', label: 'Strategy Breakdown', icon: <FileText className="h-5 w-5" /> },
    { path: '/notes', label: 'Notes', icon: <BookOpen className="h-5 w-5" /> },
    { path: '/cheatsheets', label: 'Cheat Sheets', icon: <Tag className="h-5 w-5" /> },
  ];

  return (
    <div className="flex h-screen flex-col md:flex-row bg-background">
      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-primary/70 backdrop-blur-sm text-primary-foreground p-2 rounded-md shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:relative z-40 w-64 h-full bg-card border-r border-border shadow-sm transition-transform duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6 mt-4 px-2">
            <h1 className="text-xl font-bold text-primary">Only Pips Academy</h1>
            <div className="hidden md:block">
              <DarkModeToggle />
            </div>
          </div>
          
          {/* Progress Overview */}
          <div className="mb-6 px-4">
            <h2 className="text-sm font-medium mb-2">Your Progress</h2>
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-right">{progressPercentage}% Complete</p>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto text-center py-4 text-xs text-muted-foreground">
            Made with 💙 by Only Pips
          </div>
        </div>
      </div>

      {/* Dark mode toggle for mobile fixed at top right */}
      <div className="fixed top-4 right-4 md:hidden z-50 bg-background/70 backdrop-blur-sm p-1 rounded-full">
        <DarkModeToggle />
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
