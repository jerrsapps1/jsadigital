import DataTable from '../DataTable';

export default function DataTableExample() {
  const mockData = [
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
    <div className="p-6">
      <DataTable 
        data={mockData}
        onView={(id) => console.log('View JSA:', id)}
        onDownloadPdf={(id) => console.log('Download PDF:', id)}
      />
    </div>
  );
}