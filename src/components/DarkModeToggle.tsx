
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from './ui/switch';
import { cn } from '@/lib/utils';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    if (localStorage.theme === 'dark') return true;
    if (localStorage.theme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      aria-label="Toggle Dark Mode"
      className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      onClick={() => setIsDark(!isDark)}
      type="button"
    >
      <Sun
        className={cn(
          'w-5 h-5 transition-opacity',
          isDark ? 'opacity-0' : 'opacity-100'
        )}
      />
      <Moon
        className={cn(
          'w-5 h-5 transition-opacity',
          isDark ? 'opacity-100' : 'opacity-0'
        )}
      />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setIsDark(checked === true)}
        className="ml-1"
      />
    </button>
  );
};

export default DarkModeToggle;

