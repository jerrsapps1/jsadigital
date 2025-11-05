import { useState } from "react";
import DataTable from "./DataTable";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

export default function ArchivePage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("all");
  const [statusFilters, setStatusFilters] = useState({
    draft: false,
    pending: false,
    complete: true
  });

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
      status: 'COMPLETE' as const,
      createdAt: '2025-01-18',
      createdBy: 'Mike Worker'
    },
    {
      id: '4',
      title: 'Concrete Pouring Safety',
      project: 'Bridge Project',
      status: 'COMPLETE' as const,
      createdAt: '2025-01-10',
      createdBy: 'John Supervisor'
    },
    {
      id: '5',
      title: 'Heavy Equipment Operation',
      project: 'Highway Repair',
      status: 'DRAFT' as const,
      createdAt: '2025-01-22',
      createdBy: 'Tom Operator'
    }
  ];

  const filteredData = mockData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = selectedProject === "all" || item.project === selectedProject;
    const matchesStatus = 
      (statusFilters.draft && item.status === 'DRAFT') ||
      (statusFilters.pending && item.status === 'PENDING_SIGNOFF') ||
      (statusFilters.complete && item.status === 'COMPLETE');
    
    return matchesSearch && matchesProject && matchesStatus;
  });

  return (
    <div className="space-y-6" data-testid="page-archive">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Archive</h1>
        <p className="text-muted-foreground mt-1">
          Search and download completed Job Safety Analyses
        </p>
      </div>

      <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search JSAs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search"
              />
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="outline" data-testid="button-toggle-filters">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label>Project</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger data-testid="select-filter-project">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="Downtown Demo">Downtown Demo</SelectItem>
                    <SelectItem value="Acme Tower">Acme Tower</SelectItem>
                    <SelectItem value="Bridge Project">Bridge Project</SelectItem>
                    <SelectItem value="Highway Repair">Highway Repair</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="status-draft"
                      checked={statusFilters.draft}
                      onCheckedChange={(checked) => 
                        setStatusFilters({ ...statusFilters, draft: checked as boolean })
                      }
                      data-testid="checkbox-status-draft"
                    />
                    <Label htmlFor="status-draft" className="font-normal cursor-pointer">
                      Draft
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="status-pending"
                      checked={statusFilters.pending}
                      onCheckedChange={(checked) => 
                        setStatusFilters({ ...statusFilters, pending: checked as boolean })
                      }
                      data-testid="checkbox-status-pending"
                    />
                    <Label htmlFor="status-pending" className="font-normal cursor-pointer">
                      Pending Sign-off
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="status-complete"
                      checked={statusFilters.complete}
                      onCheckedChange={(checked) => 
                        setStatusFilters({ ...statusFilters, complete: checked as boolean })
                      }
                      data-testid="checkbox-status-complete"
                    />
                    <Label htmlFor="status-complete" className="font-normal cursor-pointer">
                      Complete
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <DataTable 
        data={filteredData}
        onView={(id) => console.log('View JSA:', id)}
        onDownloadPdf={(id) => console.log('Download PDF:', id)}
      />

      <div className="text-sm text-muted-foreground">
        Showing {filteredData.length} of {mockData.length} JSAs
      </div>
    </div>
  );
}