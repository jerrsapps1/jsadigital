import DashboardPage from '../DashboardPage';

export default function DashboardPageExample() {
  return (
    <div className="p-6 min-h-screen">
      <DashboardPage 
        onCreateJSA={() => console.log('Navigate to JSA builder')}
        onViewAll={() => console.log('Navigate to archive')}
      />
    </div>
  );
}