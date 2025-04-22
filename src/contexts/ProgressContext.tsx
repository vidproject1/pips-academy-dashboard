
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

type ContentType = "video" | "strategy";

interface ContentItem {
  id: string;
  type: ContentType;
  completed: boolean;
}

interface ProgressContextType {
  progress: ContentItem[];
  markAsCompleted: (id: string, type: ContentType) => void;
  markAsIncomplete: (id: string, type: ContentType) => void;
  isCompleted: (id: string, type: ContentType) => boolean;
  getProgressPercentage: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ContentItem[]>(() => {
    const savedProgress = localStorage.getItem("onlyPipsProgress");
    return savedProgress ? JSON.parse(savedProgress) : [];
  });

  useEffect(() => {
    localStorage.setItem("onlyPipsProgress", JSON.stringify(progress));
  }, [progress]);

  const markAsCompleted = (id: string, type: ContentType) => {
    setProgress((prev) => {
      if (prev.some((item) => item.id === id && item.type === type)) {
        return prev.map((item) =>
          item.id === id && item.type === type
            ? { ...item, completed: true }
            : item
        );
      } else {
        return [...prev, { id, type, completed: true }];
      }
    });
  };

  const markAsIncomplete = (id: string, type: ContentType) => {
    setProgress((prev) =>
      prev.map((item) =>
        item.id === id && item.type === type
          ? { ...item, completed: false }
          : item
      )
    );
  };

  const isCompleted = (id: string, type: ContentType) => {
    return progress.some(
      (item) => item.id === id && item.type === type && item.completed
    );
  };

  const getProgressPercentage = () => {
    // This is a mock calculation - we'd need to know total content items in a real app
    const totalItems = 20; // Mock total number of content items
    const completedItems = progress.filter((item) => item.completed).length;
    return Math.round((completedItems / totalItems) * 100);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markAsCompleted,
        markAsIncomplete,
        isCompleted,
        getProgressPercentage,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};
