import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map } from 'lucide-react';

const regionData = [
  { region: 'North America', jobs: 450 },
  { region: 'Europe', jobs: 320 },
  { region: 'Asia', jobs: 280 },
  { region: 'South America', jobs: 190 },
  { region: 'Africa', jobs: 120 },
];

export function RegionalDistribution() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            <CardTitle>Regional Distribution</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {regionData.map((region) => (
            <div key={region.region} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{region.region}</span>
                <span className="font-medium">{region.jobs} jobs</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${(region.jobs / Math.max(...regionData.map(r => r.jobs))) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}