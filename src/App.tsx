import { useState, useEffect } from 'react';
import { Bot, Database, GitBranch, LineChart, Cog, Users, Bell, MessageSquare, Network, Cpu, Undo, Redo, Save } from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import AgentPanel from '@/components/AgentPanel';
import DataFlow from '@/components/DataFlow';
import Monitoring from '@/components/Monitoring';
import SettingsPanel from '@/components/Settings';
import DatabaseConnector from '@/components/DatabaseConnector';
import AgentChat from '@/components/AgentChat';
import VectorDB from '@/components/VectorDB';
import UserManagement from '@/components/UserManagement';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { storageManager, StorageState } from '@/lib/storage';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();
  const [appState, setAppState] = useState<StorageState | null>(null);

  useEffect(() => {
    const savedState = storageManager.loadState();
    if (savedState) {
      setAppState(savedState);
    }
  }, []);

  const handleSave = () => {
    if (appState) {
      storageManager.saveState(appState);
    }
  };

  const handleUndo = () => {
    const previousState = storageManager.undo();
    if (previousState) {
      setAppState(previousState);
    }
  };

  const handleRedo = () => {
    const nextState = storageManager.redo();
    if (nextState) {
      setAppState(nextState);
    }
  };

  const handleNotificationClick = () => {
    toast({
      title: "New Notification",
      description: "ETL job 'DataSync-001' completed successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 border-r bg-card">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">PM ETL Hub</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSave}
                  title="Save Changes"
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUndo}
                  title="Undo"
                >
                  <Undo className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRedo}
                  title="Redo"
                >
                  <Redo className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-4 w-4" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem onClick={handleNotificationClick}>
                      New ETL job completed
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          
          <nav className="p-2 space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'dashboard' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              <LineChart className="h-4 w-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('agents')}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'agents' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              <Bot className="h-4 w-4" />
              AI Agents
            </button>
            <button
              onClick={() => setActiveTab('dataflow')}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'dataflow' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              <GitBranch className="h-4 w-4" />
              Data Flow
            </button>
            <button
              onClick={() => setActiveTab('databases')}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'databases' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              <Database className="h-4 w-4" />
              Databases
            </button>
            <button
              onClick={() => setActiveTab('vectordb')}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'vectordb' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              <Cpu className="h-4 w-4" />
              Vector DB
            </button>
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'monitoring' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              <Network className="h-4 w-4" />
              Monitoring
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'users' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              <Users className="h-4 w-4" />
              Users
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'chat' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Agent Chat
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'settings' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              <Cog className="h-4 w-4" />
              Settings
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'agents' && <AgentPanel />}
            {activeTab === 'dataflow' && <DataFlow />}
            {activeTab === 'databases' && <DatabaseConnector />}
            {activeTab === 'vectordb' && <VectorDB />}
            {activeTab === 'monitoring' && <Monitoring />}
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'chat' && <AgentChat />}
            {activeTab === 'settings' && <SettingsPanel />}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;