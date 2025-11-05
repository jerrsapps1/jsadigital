import { LayoutDashboard, FolderOpen, FileText, ClipboardList, Archive, BarChart3, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

interface AppSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  userRole?: "ADMIN" | "SUPERVISOR" | "WORKER";
  orgName?: string;
}

export default function AppSidebar({ 
  currentPath, 
  onNavigate,
  userRole = "SUPERVISOR",
  orgName = "Acme Construction"
}: AppSidebarProps) {
  const navItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Projects", icon: FolderOpen, path: "/projects" },
    { title: "JSA Templates", icon: ClipboardList, path: "/templates" },
    { title: "Archive", icon: Archive, path: "/archive" },
    { title: "Analytics", icon: BarChart3, path: "/analytics", adminOnly: true },
    { title: "Settings", icon: Settings, path: "/settings", adminOnly: true },
  ];

  const filteredItems = navItems.filter(item => 
    !item.adminOnly || userRole === "ADMIN" || userRole === "SUPERVISOR"
  );

  return (
    <Sidebar data-testid="sidebar-app">
      <SidebarHeader className="p-4 border-b">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold" data-testid="text-org-name">{orgName}</h2>
          <Badge variant="secondary" data-testid="badge-user-role">{userRole}</Badge>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => onNavigate(item.path)}
                    isActive={currentPath === item.path}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="text-xs text-muted-foreground">
          JSA SaaS v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}