import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function Monitoring() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Monitoring</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              <CardTitle>System Health</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">All systems operational</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Data transformation completed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">New data source connected</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}