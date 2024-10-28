import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ResponsiveContainer } from 'recharts';

const evmData = [
  { name: 'Jan', bcws: 100, bcwp: 95, acwp: 98 },
  { name: 'Feb', bcws: 200, bcwp: 180, acwp: 190 },
  { name: 'Mar', bcws: 300, bcwp: 280, acwp: 310 },
  { name: 'Apr', bcws: 400, bcwp: 360, acwp: 420 },
  { name: 'May', bcws: 500, bcwp: 450, acwp: 480 },
];

const EVM_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

export function EVMChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            <CardTitle>Earned Value Management</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={evmData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bcws" stroke={EVM_COLORS[0]} name="BCWS (Planned Value)" />
              <Line type="monotone" dataKey="bcwp" stroke={EVM_COLORS[1]} name="BCWP (Earned Value)" />
              <Line type="monotone" dataKey="acwp" stroke={EVM_COLORS[2]} name="ACWP (Actual Cost)" />
              <Area type="monotone" dataKey="bcws" fill={EVM_COLORS[0]} fillOpacity={0.1} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}