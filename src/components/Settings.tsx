import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
import { Shield, Bell, Database, Key, Lock } from 'lucide-react';

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>

      <Tabs defaultValue="security" className="space-y-4">
        <TabsList>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="datasources">
            <Database className="h-4 w-4 mr-2" />
            Data Sources
          </TabsTrigger>
          <TabsTrigger value="llm">
            <Key className="h-4 w-4 mr-2" />
            LLM Settings
          </TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          <TabsContent value="security">
            {/* Security Tab Content */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <CardTitle>Security Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Policy */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Password Policy</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Minimum Length</span>
                        <Input
                          type="number"
                          className="w-[100px]"
                          defaultValue="12"
                          min="8"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Require Special Characters</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Require Numbers</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Require Mixed Case</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  {/* Session Settings */}
                  <div className="space-y-2">
                    <Label>Session Settings</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Session Timeout (minutes)</span>
                        <Input
                          type="number"
                          className="w-[100px]"
                          defaultValue="30"
                          min="5"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Max Login Attempts</span>
                        <Input
                          type="number"
                          className="w-[100px]"
                          defaultValue="5"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2FA Settings */}
                  <div className="space-y-2">
                    <Label>Two-Factor Authentication</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Require 2FA for All Users</span>
                        <Switch defaultChecked />
                      </div>
                      <Select defaultValue="authenticator">
                        <SelectTrigger>
                          <SelectValue placeholder="Select 2FA method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="authenticator">Authenticator App</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* IP Whitelist */}
                  <div className="space-y-2">
                    <Label>IP Whitelist</Label>
                    <div className="space-y-2">
                      <Input placeholder="Enter IP address or range (e.g., 192.168.1.0/24)" />
                      <Button variant="outline" className="w-full">
                        Add IP Range
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <CardTitle>Notification Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Notifications</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">ETL Job Completion</span>
                        <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">System Alerts</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">User Account Changes</span>
                        <Switch defaultChecked />
                      </div>
                      <Input placeholder="Email recipients (comma-separated)" />
                    </div>
                  </div>

                  {/* Slack Integration */}
                  <div className="space-y-2">
                    <Label>Slack Integration</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Enable Slack Notifications</span>
                        <Switch checked={slackNotifications} onCheckedChange={setSlackNotifications} />
                      </div>
                      <Input placeholder="Slack Webhook URL" />
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select notification level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Notifications</SelectItem>
                          <SelectItem value="important">Important Only</SelectItem>
                          <SelectItem value="critical">Critical Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="datasources">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  <CardTitle>Data Source Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Connection Settings */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Connection Settings</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Connection Timeout (seconds)</span>
                        <Input
                          type="number"
                          className="w-[100px]"
                          defaultValue="30"
                          min="1"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Max Pool Size</span>
                        <Input
                          type="number"
                          className="w-[100px]"
                          defaultValue="10"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="llm">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  <CardTitle>LLM Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* LLM Selection */}
                  <div className="space-y-2">
                    <Label>Select LLM Provider</Label>
                    <Select defaultValue="openai">
                      <SelectTrigger>
                        <SelectValue placeholder="Select LLM provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic</SelectItem>
                        <SelectItem value="cohere">Cohere</SelectItem>
                        <SelectItem value="local">Local LLM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* API Key Management */}
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <Input type="password" placeholder="Enter your API key" />
                    <p className="text-sm text-muted-foreground">
                      Your API key is encrypted and stored securely
                    </p>
                  </div>

                  {/* Model Settings */}
                  <div className="space-y-2">
                    <Label>Default Model</Label>
                    <Select defaultValue="gpt-4">
                      <SelectTrigger>
                        <SelectValue placeholder="Select default model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                        <SelectItem value="claude-2">Claude 2</SelectItem>
                        <SelectItem value="command">Cohere Command</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Advanced Settings */}
                  <div className="space-y-2">
                    <Label>Advanced Settings</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Enable Streaming</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Cache Responses</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Request Timeout (seconds)</span>
                        <Input
                          type="number"
                          className="w-[100px]"
                          defaultValue="30"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}