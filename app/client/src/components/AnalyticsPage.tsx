import TrendChart from "./TrendChart";
import KpiCard from "./KpiCard";
import { FileText, CheckCircle, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  const projectData = [
    { name: 'Downtown Demo', count: 12 },
    { name: 'Acme Tower', count: 8 },
    { name: 'Bridge Project', count: 15 },
    { name: 'Highway Repair', count: 7 }
  ];

  const hazardData = [
    { name: 'Fall Hazards', value: 35 },
    { name: 'Electrical', value: 25 },
    { name: 'Slips & Trips', value: 20 },
    { name: 'Heavy Machinery', value: 15 },
    { name: 'Other', value: 5 }
  ];

  return (
    <div className="space-y-8" data-testid="page-analytics">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Insights and trends from your safety data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          title="Total JSAs"
          value={42}
          icon={FileText}
        />
        <KpiCard
          title="Completion Rate"
          value="87%"
          icon={CheckCircle}
          trend={{ value: 5, isPositive: true }}
        />
        <KpiCard
          title="Avg. Time to Complete"
          value="2.3d"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart 
          type="bar" 
          title="JSAs by Project" 
          data={projectData}
        />
        <TrendChart 
          type="pie" 
          title="Top Hazard Types" 
          data={hazardData}
        />
      </div>
    </div>
  );
}