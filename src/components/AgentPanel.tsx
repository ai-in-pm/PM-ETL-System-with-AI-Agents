import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Brain, Cpu, Network, Power } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export default function AgentPanel() {
  const [agentStates, setAgentStates] = useState({
    extraction: true,
    transformation: true,
    orchestration: true,
    monitoring: true,
  });

  const toggleAgent = (agent: keyof typeof agentStates) => {
    setAgentStates(prev => ({
      ...prev,
      [agent]: !prev[agent]
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">AI Agents</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <CardTitle>Data Extraction Agent</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={agentStates.extraction ? "default" : "secondary"}>
                  {agentStates.extraction ? "Active" : "Inactive"}
                </Badge>
                <Switch
                  checked={agentStates.extraction}
                  onCheckedChange={() => toggleAgent('extraction')}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Specialized in extracting data from various sources including databases, APIs, and files.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                <CardTitle>Transformation Agent</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={agentStates.transformation ? "default" : "secondary"}>
                  {agentStates.transformation ? "Active" : "Inactive"}
                </Badge>
                <Switch
                  checked={agentStates.transformation}
                  onCheckedChange={() => toggleAgent('transformation')}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Handles data cleaning, normalization, and complex transformations using AI algorithms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                <CardTitle>Load Orchestration Agent</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={agentStates.orchestration ? "default" : "secondary"}>
                  {agentStates.orchestration ? "Active" : "Inactive"}
                </Badge>
                <Switch
                  checked={agentStates.orchestration}
                  onCheckedChange={() => toggleAgent('orchestration')}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manages data loading processes and ensures data integrity during transfers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                <CardTitle>Monitoring Agent</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={agentStates.monitoring ? "default" : "secondary"}>
                  {agentStates.monitoring ? "Active" : "Inactive"}
                </Badge>
                <Switch
                  checked={agentStates.monitoring}
                  onCheckedChange={() => toggleAgent('monitoring')}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Monitors system performance, detects anomalies, and generates alerts.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}