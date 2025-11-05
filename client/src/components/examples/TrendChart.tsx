import TrendChart from '../TrendChart';

export default function TrendChartExample() {
  const barData = [
    { name: 'Downtown Demo', count: 12 },
    { name: 'Acme Tower', count: 8 },
    { name: 'Bridge Project', count: 15 },
    { name: 'Highway Repair', count: 7 }
  ];

  const pieData = [
    { name: 'Fall Hazards', value: 35 },
    { name: 'Electrical', value: 25 },
    { name: 'Slips & Trips', value: 20 },
    { name: 'Heavy Machinery', value: 15 },
    { name: 'Other', value: 5 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <TrendChart 
        type="bar" 
        title="JSAs by Project" 
        data={barData}
      />
      <TrendChart 
        type="pie" 
        title="Top Hazard Types" 
        data={pieData}
      />
    </div>
  );
}