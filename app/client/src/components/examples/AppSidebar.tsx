import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from '../AppSidebar';

export default function AppSidebarExample() {
  const [currentPath, setCurrentPath] = useState('/dashboard');

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar 
          currentPath={currentPath}
          onNavigate={(path) => {
            console.log('Navigate to:', path);
            setCurrentPath(path);
          }}
          userRole="SUPERVISOR"
          orgName="Acme Construction"
        />
        <div className="flex flex-col flex-1">
          <header className="flex items-center gap-4 p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <p className="text-muted-foreground">
              Current path: <code className="font-mono">{currentPath}</code>
            </p>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}