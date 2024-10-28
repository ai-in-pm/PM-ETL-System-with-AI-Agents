import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GitBranch, Database, ArrowRight, Server, Play, Pause, RefreshCw, 
  Upload, Download, LineChart, Brain, AlertTriangle, Calendar,
  ClipboardList, FileSpreadsheet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

export default function DataFlow() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [anomalyDetected, setAnomalyDetected] = useState(false);
  const { toast } = useToast();

  const toggleFlow = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        
        if (currentProgress === 50) {
          setAnomalyDetected(true);
          toast({
            title: "Anomaly Detected",
            description: "Unusual data pattern detected in the transformation phase",
            variant: "destructive",
          });
        }
        
        if (currentProgress >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setProgress(0);
          setAnomalyDetected(false);
        }
      }, 1000);
    }
  };

  const handleExport = (format: string) => {
    toast({
      title: "Export Started",
      description: `Exporting data in ${format} format...`,
    });
  };

  const handleImport = (source: string) => {
    toast({
      title: "Import Started",
      description: `Importing data from ${source}...`,
    });
  };

  const handlePMImport = (tool: string) => {
    toast({
      title: "Project Management Import",
      description: `Importing schedule data from ${tool}...`,
    });
  };

  const handleBIConnect = (tool: string) => {
    toast({
      title: "BI Connection",
      description: `Connecting to ${tool}...`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Data Flow</h2>
        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => handleImport('Database')}>
                <Database className="h-4 w-4 mr-2" />
                From Database
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleImport('CSV')}>
                <Upload className="h-4 w-4 mr-2" />
                From CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleImport('API')}>
                <Server className="h-4 w-4 mr-2" />
                From API
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-medium" disabled>
                <Calendar className="h-4 w-4 mr-2" />
                Project Management
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => handlePMImport('Microsoft Project')}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Microsoft Project (.mpp)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePMImport('Primavera P6')}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Primavera P6 (.xer)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePMImport('Deltek Acumen Fuse')}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Deltek Acumen Fuse
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePMImport('Deltek Cobra')}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Deltek Cobra
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePMImport('Smartsheets')}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Smartsheets
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('CSV')}>
                <Download className="h-4 w-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('JSON')}>
                <Download className="h-4 w-4 mr-2" />
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('SQL')}>
                <Database className="h-4 w-4 mr-2" />
                Export as SQL
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleFlow}
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setProgress(0)}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              <CardTitle>ETL Pipeline Status</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Database className="h-8 w-8 text-primary" />
                <div className="text-sm">Source</div>
              </div>
              <ArrowRight className="h-4 w-4" />
              <div className="flex items-center gap-2">
                <Server className="h-8 w-8 text-primary" />
                <div className="text-sm">Transform</div>
                {anomalyDetected && (
                  <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />
                )}
              </div>
              <ArrowRight className="h-4 w-4" />
              <div className="flex items-center gap-2">
                <Database className="h-8 w-8 text-primary" />
                <div className="text-sm">Target</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <CardTitle>Project Management Tools</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handlePMImport('Microsoft Project')}
                >
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Import from MS Project
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handlePMImport('Primavera P6')}
                >
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Import from Primavera P6
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handlePMImport('Deltek Acumen Fuse')}
                >
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Import from Acumen Fuse
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handlePMImport('Deltek Cobra')}
                >
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Import from Deltek Cobra
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handlePMImport('Smartsheets')}
                >
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Import from Smartsheets
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                <CardTitle>ML Integration</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Anomaly Detection</span>
                  <span className="text-sm font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Predictive Transformation</span>
                  <span className="text-sm font-medium">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Quality Score</span>
                  <span className="text-sm font-medium">98%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}