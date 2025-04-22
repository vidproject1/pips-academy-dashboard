
import MainLayout from '@/components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cheatSheets } from '@/data/mockData';
import { Download, Tag } from 'lucide-react';

const CheatSheets = () => {
  // In a real app, these PDFs would be actual files to download
  const handleDownload = (id: string) => {
    console.log(`Downloading cheat sheet: ${id}`);
    // In a real app, this would trigger a file download
    alert('In a real application, this would download a PDF. This is a demo.');
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cheat Sheets</h1>
          <p className="text-muted-foreground mt-2">
            Download quick reference guides to help with your trading
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cheatSheets.map((sheet) => (
            <Card key={sheet.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{sheet.title}</CardTitle>
                    <CardDescription className="mt-2">{sheet.description}</CardDescription>
                  </div>
                  <div className="p-2 rounded-md bg-primary text-primary-foreground">
                    <Tag className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload(sheet.id)}
                >
                  <Download className="h-4 w-4 mr-2" /> Download PDF
                </Button>
              </CardContent>
            </Card>
          ))}
          
          {/* Export Notes as PDF card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Export Your Notes</CardTitle>
                  <CardDescription className="mt-2">
                    Create a custom cheat sheet from your personal notes
                  </CardDescription>
                </div>
                <div className="p-2 rounded-md bg-primary text-primary-foreground">
                  <Tag className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => alert('In a real application, this would compile your notes into a downloadable PDF.')}
              >
                <Download className="h-4 w-4 mr-2" /> Export Notes as PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheatSheets;
