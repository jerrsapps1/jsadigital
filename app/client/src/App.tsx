import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import LoginForm from "@/components/LoginForm";
import DashboardPage from "@/components/DashboardPage";
import ArchivePage from "@/components/ArchivePage";
import AnalyticsPage from "@/components/AnalyticsPage";
import JsaBuilder from "@/components/JsaBuilder";
import JsaViewPage from "@/components/JsaViewPage";
import TemplatesPage from "@/components/TemplatesPage";
import NotFound from "@/pages/not-found";

function Router() {
  const [, setLocation] = useLocation();
  
  return (
    <Switch>
      <Route path="/dashboard">
        <DashboardPage 
          onCreateJSA={() => setLocation("/jsas/new")}
          onViewAll={() => setLocation("/archive")}
        />
      </Route>
      <Route path="/templates">
        <TemplatesPage 
          onCreateFromTemplate={(name) => {
            console.log('Create JSA from template:', name);
            setLocation("/jsas/new");
          }}
        />
      </Route>
      <Route path="/archive">
        <ArchivePage />
      </Route>
      <Route path="/analytics">
        <AnalyticsPage />
      </Route>
      <Route path="/jsas/new">
        <JsaBuilder 
          onSave={(data) => console.log('Draft saved:', data)}
          onSubmit={(data) => {
            console.log('JSA submitted:', data);
            setLocation("/dashboard");
          }}
        />
      </Route>
      <Route path="/jsas/:id">
        <JsaViewPage />
      </Route>
      <Route path="/jsas">
        {() => {
          setLocation("/templates");
          return null;
        }}
      </Route>
      <Route path="/" component={() => <DashboardPage onCreateJSA={() => setLocation("/jsas/new")} onViewAll={() => setLocation("/archive")} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [location, setLocation] = useLocation();

  // Apply dark mode by default for OSHA theme
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleLogin = (email: string, password: string) => {
    console.log('Login:', { email, password });
    setIsLoggedIn(true);
    setLocation("/dashboard");
  };

  if (!isLoggedIn) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LoginForm onLogin={handleLogin} />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar 
              currentPath={location}
              onNavigate={setLocation}
              userRole="SUPERVISOR"
              orgName="Acme Construction"
            />
            <div className="flex flex-col flex-1">
              <header className="flex items-center px-6 py-4 border-b">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
              </header>
              <main className="flex-1 overflow-auto p-6">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;