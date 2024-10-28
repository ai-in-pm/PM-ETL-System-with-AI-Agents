import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const projectProgressData = [
  { name: 'Week 1', planned: 20, actual: 15 },
  { name: 'Week 2', planned: 40, actual: 35 },
  { name: 'Week 3', planned: 60, actual: 55 },
  { name: 'Week 4', planned: 80, actual: 70 },
  { name: 'Week 5', planned: 100, actual: 85 },
];

export function ProjectProgressChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <CardTitle>Project Progress</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="planned" stroke="hsl(var(--chart-1))" name="Planned" />
              <Line type="monotone" dataKey="actual" stroke="hsl(var(--chart-2))" name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}