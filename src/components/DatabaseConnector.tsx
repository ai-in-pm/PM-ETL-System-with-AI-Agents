import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Server, Plus, RefreshCw, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function DatabaseConnector() {
  const [dbType, setDbType] = useState('');
  const [connectionType, setConnectionType] = useState('standard');
  const { toast } = useToast();

  const handleConnect = () => {
    toast({
      title: "Database Connection",
      description: `Connecting to ${dbType} database...`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Database Connections</h2>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Connection
        </Button>
      </div>

      <Tabs defaultValue="standard" onValueChange={(value) => setConnectionType(value)}>
        <TabsList>
          <TabsTrigger value="standard">
            <Server className="h-4 w-4 mr-2" />
            Standard Connection
          </TabsTrigger>
          <TabsTrigger value="azure">
            <Cloud className="h-4 w-4 mr-2" />
            Azure Connection
          </TabsTrigger>
        </TabsList>

        <TabsContent value="standard">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <CardTitle>Standard Database Connection</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Database Type</Label>
                  <Select onValueChange={setDbType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select database type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="postgresql">PostgreSQL</SelectItem>
                      <SelectItem value="mssql">MS SQL Server</SelectItem>
                      <SelectItem value="mongodb">MongoDB (NoSQL)</SelectItem>
                      <SelectItem value="sqlite">SQLite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Host</Label>
                  <Input placeholder="localhost" />
                </div>

                <div className="space-y-2">
                  <Label>Port</Label>
                  <Input placeholder="3306" />
                </div>

                <div className="space-y-2">
                  <Label>Database Name</Label>
                  <Input placeholder="mydb" />
                </div>

                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input placeholder="username" />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>

                <div className="flex gap-2">
                  <Button className="w-full" onClick={handleConnect}>
                    <Server className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="azure">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                <CardTitle>Azure Database Connection</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Azure Service</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Azure service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="azure-sql">Azure SQL Database</SelectItem>
                      <SelectItem value="azure-cosmos">Azure Cosmos DB</SelectItem>
                      <SelectItem value="azure-mysql">Azure Database for MySQL</SelectItem>
                      <SelectItem value="azure-postgresql">Azure Database for PostgreSQL</SelectItem>
                      <SelectItem value="azure-synapse">Azure Synapse Analytics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Server Name</Label>
                  <Input placeholder="your-server.database.windows.net" />
                </div>

                <div className="space-y-2">
                  <Label>Database Name</Label>
                  <Input placeholder="your-database" />
                </div>

                <div className="space-y-2">
                  <Label>Authentication Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select authentication method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sql">SQL Authentication</SelectItem>
                      <SelectItem value="aad">Azure Active Directory</SelectItem>
                      <SelectItem value="msi">Managed Identity</SelectItem>
                      <SelectItem value="service-principal">Service Principal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Username / Client ID</Label>
                  <Input placeholder="Enter username or client ID" />
                </div>

                <div className="space-y-2">
                  <Label>Password / Client Secret</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>

                <div className="space-y-2">
                  <Label>Tenant ID (for AAD)</Label>
                  <Input placeholder="Enter tenant ID" />
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <Label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Use SSL Connection</span>
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Button className="w-full" onClick={handleConnect}>
                    <Cloud className="h-4 w-4 mr-2" />
                    Connect to Azure
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Test Azure Connection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}