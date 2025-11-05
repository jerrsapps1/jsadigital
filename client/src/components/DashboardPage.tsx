import KpiCard from "./KpiCard";
import DataTable from "./DataTable";
import { FileText, CheckCircle, Clock, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardPageProps {
  onCreateJSA?: () => void;
  onViewAll?: () => void;
}

export default function DashboardPage({ onCreateJSA, onViewAll }: DashboardPageProps) {
  const mockRecentJSAs = [
    {
      id: '1',
      title: 'Trenching Safety - Main Street',
      project: 'Downtown Demo',
      status: 'COMPLETE' as const,
      createdAt: '2025-01-15',
      createdBy: 'John Supervisor'
    },
    {
      id: '2',
      title: 'Electrical Work - Building A',
      project: 'Acme Tower',
      status: 'PENDING_SIGNOFF' as const,
      createdAt: '2025-01-20',
      createdBy: 'Sarah Manager'
    },
    {
      id: '3',
      title: 'Fall Protection Assessment',
      project: 'Downtown Demo',
      status: 'DRAFT' as const,
      createdAt: '2025-01-22',
      createdBy: 'Mike Worker'
    }
  ];

  return (
    <div className="space-y-8" data-testid="page-dashboard">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your Job Safety Analysis activities
          </p>
        </div>
        <Button onClick={onCreateJSA} data-testid="button-create-jsa">
          <Plus className="h-4 w-4 mr-2" />
          Create JSA
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total JSAs"
          value={42}
          icon={FileText}
          trend={{ value: 12, isPositive: true }}
        />
        <KpiCard
          title="Completed"
          value={28}
          icon={CheckCircle}
        />
        <KpiCard
          title="Pending"
          value={8}
          icon={Clock}
        />
        <KpiCard
          title="Active Users"
          value={15}
          icon={Users}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent JSAs</h2>
          <Button variant="outline" onClick={onViewAll} data-testid="button-view-all">
            View All
          </Button>
        </div>
        <DataTable 
          data={mockRecentJSAs}
          onView={(id) => console.log('View JSA:', id)}
          onDownloadPdf={(id) => console.log('Download PDF:', id)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" onClick={onCreateJSA}>
              <Plus className="h-4 w-4 mr-2" />
              Create New JSA
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              View Templates
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last Backup</span>
              <span className="font-mono">2025-01-22 08:00</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Storage Used</span>
              <span>24 MB / 1 GB</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Active Sessions</span>
              <span>3</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}