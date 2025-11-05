import KpiCard from '../KpiCard';
import { FileText } from 'lucide-react';

export default function KpiCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <KpiCard 
        title="Total JSAs" 
        value={42} 
        icon={FileText}
        trend={{ value: 12, isPositive: true }}
      />
      <KpiCard 
        title="Pending Sign-off" 
        value={8} 
        icon={FileText}
      />
    </div>
  );
}