import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Network, Upload, Search, Database, BrainCircuit, FileJson, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface VectorData {
  id: string;
  content: string;
  metadata?: Record<string, any>;
  embedding?: number[];
}

export default function VectorDB() {
  const [indexingProgress, setIndexingProgress] = useState(0);
  const [isIndexing, setIsIndexing] = useState(false);
  const [vectorData, setVectorData] = useState<VectorData[]>([]);
  const [selectedData, setSelectedData] = useState<VectorData | null>(null);
  const { toast } = useToast();

  const startIndexing = () => {
    setIsIndexing(true);
    setIndexingProgress(0);
    
    const interval = setInterval(() => {
      setIndexingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsIndexing(false);
          toast({
            title: "Indexing Complete",
            description: "Documents have been successfully vectorized and indexed",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      
      // Convert JSON data to vector format
      const newVectorData: VectorData[] = Array.isArray(jsonData) 
        ? jsonData.map((item, index) => ({
            id: `doc-${index}`,
            content: typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item),
            metadata: typeof item === 'object' ? item : { value: item },
          }))
        : [{
            id: 'doc-0',
            content: JSON.stringify(jsonData, null, 2),
            metadata: jsonData,
          }];

      setVectorData([...vectorData, ...newVectorData]);
      
      toast({
        title: "JSON Import Successful",
        description: `Imported ${newVectorData.length} documents`,
      });

      startIndexing();
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Invalid JSON file format",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Vector Database</h2>
        <div className="flex gap-2">
          <Button asChild>
            <label>
              <FileJson className="h-4 w-4 mr-2" />
              Import JSON
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </Button>
          <Button onClick={startIndexing} disabled={isIndexing}>
            <Upload className="h-4 w-4 mr-2" />
            Index Documents
          </Button>
        </div>
      </div>

      <Tabs defaultValue="vector">
        <TabsList>
          <TabsTrigger value="vector">
            <Cpu className="h-4 w-4 mr-2" />
            Vector Store
          </TabsTrigger>
          <TabsTrigger value="graph">
            <Network className="h-4 w-4 mr-2" />
            Graph RAG
          </TabsTrigger>
          <TabsTrigger value="data">
            <Eye className="h-4 w-4 mr-2" />
            Data Viewer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vector">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  <CardTitle>Vector Store Status</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Indexed Documents</span>
                    <span className="font-medium">{vectorData.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Vector Dimensions</span>
                    <span className="font-medium">1,536</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Storage</span>
                    <span className="font-medium">2.4 GB</span>
                  </div>
                  {isIndexing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Indexing Progress</span>
                        <span>{indexingProgress}%</span>
                      </div>
                      <Progress value={indexingProgress} />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  <CardTitle>Semantic Search</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Input placeholder="Enter your search query..." />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select similarity metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cosine">Cosine Similarity</SelectItem>
                        <SelectItem value="euclidean">Euclidean Distance</SelectItem>
                        <SelectItem value="dot">Dot Product</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="graph">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  <CardTitle>Knowledge Graph</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Total Nodes</span>
                    <span className="font-medium">5,678</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Relationships</span>
                    <span className="font-medium">12,345</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Graph Density</span>
                    <span className="font-medium">0.85</span>
                  </div>
                  <Button className="w-full">
                    <BrainCircuit className="h-4 w-4 mr-2" />
                    Visualize Graph
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  <CardTitle>Graph Query</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Input placeholder="Enter your graph query..." />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select query type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="path">Path Finding</SelectItem>
                        <SelectItem value="community">Community Detection</SelectItem>
                        <SelectItem value="centrality">Centrality Analysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Network className="h-4 w-4 mr-2" />
                    Execute Query
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  <CardTitle>Imported Data</CardTitle>
                </div>
                <span className="text-sm text-muted-foreground">
                  {vectorData.length} documents
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ScrollArea className="h-[400px] rounded-md border p-4">
                  <div className="space-y-4">
                    {vectorData.map((data) => (
                      <Card key={data.id} className="cursor-pointer hover:bg-muted/50">
                        <CardContent className="p-4" onClick={() => setSelectedData(data)}>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{data.id}</span>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Document Details</DialogTitle>
                                </DialogHeader>
                                <ScrollArea className="h-[500px] mt-4">
                                  <pre className="p-4 bg-muted rounded-lg text-sm">
                                    {data.content}
                                  </pre>
                                </ScrollArea>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {data.content.length > 100 
                              ? `${data.content.slice(0, 100)}...` 
                              : data.content}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}