
import { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContentCard from '@/components/ContentCard';
import { strategyBreakdownSections } from '@/data/mockData';
import { FileText, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const StrategyBreakdown = () => {
  const [activeSection, setActiveSection] = useState(strategyBreakdownSections[0].id);
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Strategy Breakdown</h1>
            <p className="text-muted-foreground mt-2">
              Learn the core components of our Forex trading strategy
            </p>
          </div>
          
          <div className="space-y-4">
            {strategyBreakdownSections.map((section) => (
              <Collapsible key={section.id} className="border rounded-md overflow-hidden">
                <CollapsibleTrigger className="flex w-full items-center justify-between bg-muted px-4 py-3 font-medium">
                  <span>{section.title}</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 ui-open:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 py-3">
                    <div 
                      className="prose prose-blue max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Strategy Breakdown</h1>
          <p className="text-muted-foreground mt-2">
            Learn the core components of our Forex trading strategy
          </p>
        </div>
        
        <Tabs defaultValue={strategyBreakdownSections[0].id} onValueChange={setActiveSection}>
          <TabsList className="mb-6 flex flex-wrap">
            {strategyBreakdownSections.map((section) => (
              <TabsTrigger 
                key={section.id} 
                value={section.id}
                className="text-sm py-2"
              >
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {strategyBreakdownSections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="space-y-4">
              <ContentCard
                id={section.id}
                type="strategy"
                title={section.title}
                icon={<FileText className="h-5 w-5" />}
              >
                <div 
                  className="mt-4 prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </ContentCard>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default StrategyBreakdown;
