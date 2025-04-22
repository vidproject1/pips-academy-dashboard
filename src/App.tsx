import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "./contexts/ProgressContext";
import { NotesProvider } from "./contexts/NotesContext";

// Pages
import Dashboard from "./pages/Dashboard";
import VideoLessons from "./pages/VideoLessons";
import StrategyBreakdown from "./pages/StrategyBreakdown";
import Notes from "./pages/Notes";
import CheatSheets from "./pages/CheatSheets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProgressProvider>
      <NotesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/videos" element={<VideoLessons />} />
              <Route path="/strategy" element={<StrategyBreakdown />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/cheatsheets" element={<CheatSheets />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NotesProvider>
    </ProgressProvider>
  </QueryClientProvider>
);

export default App;
