import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function KpiCard({ title, value, icon: Icon, trend, className = "" }: KpiCardProps) {
  return (
    <Card className={`p-6 ${className}`} data-testid={`card-kpi-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide" data-testid="text-kpi-title">
            {title}
          </p>
          <p className="text-4xl font-bold mt-2" data-testid="text-kpi-value">
            {value}
          </p>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              <span data-testid="text-kpi-trend">
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            </div>
          )}
        </div>
        <div className="text-primary/20">
          <Icon className="h-8 w-8" data-testid="icon-kpi" />
        </div>
      </div>
    </Card>
  );
}