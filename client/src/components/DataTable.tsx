import { useState } from "react";
import { ChevronDown, ChevronUp, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";

type JSAStatus = "DRAFT" | "PENDING_SIGNOFF" | "COMPLETE";

interface JSARecord {
  id: string;
  title: string;
  project: string;
  status: JSAStatus;
  createdAt: string;
  createdBy: string;
}

interface DataTableProps {
  data: JSARecord[];
  onView?: (id: string) => void;
  onDownloadPdf?: (id: string) => void;
}

type SortField = "title" | "project" | "status" | "createdAt";

export default function DataTable({ data, onView, onDownloadPdf }: DataTableProps) {
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const direction = sortDirection === "asc" ? 1 : -1;
    
    if (aVal < bVal) return -1 * direction;
    if (aVal > bVal) return 1 * direction;
    return 0;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="border rounded-lg overflow-hidden" data-testid="table-jsa-archive">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 sticky top-0">
            <tr>
              <th 
                className="text-left px-4 py-3 text-sm font-medium cursor-pointer hover-elevate"
                onClick={() => handleSort("title")}
                data-testid="header-title"
              >
                <div className="flex items-center gap-2">
                  Title
                  <SortIcon field="title" />
                </div>
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-medium cursor-pointer hover-elevate"
                onClick={() => handleSort("project")}
                data-testid="header-project"
              >
                <div className="flex items-center gap-2">
                  Project
                  <SortIcon field="project" />
                </div>
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-medium cursor-pointer hover-elevate"
                onClick={() => handleSort("status")}
                data-testid="header-status"
              >
                <div className="flex items-center gap-2">
                  Status
                  <SortIcon field="status" />
                </div>
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-medium cursor-pointer hover-elevate"
                onClick={() => handleSort("createdAt")}
                data-testid="header-created"
              >
                <div className="flex items-center gap-2">
                  Created
                  <SortIcon field="createdAt" />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium">
                Created By
              </th>
              <th className="text-right px-4 py-3 text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((record, index) => (
              <tr 
                key={record.id} 
                className="border-t hover-elevate"
                data-testid={`row-jsa-${index}`}
              >
                <td className="px-4 py-3 text-sm font-medium" data-testid={`text-title-${index}`}>
                  {record.title}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground" data-testid={`text-project-${index}`}>
                  {record.project}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={record.status} />
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground font-mono" data-testid={`text-created-${index}`}>
                  {record.createdAt}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground" data-testid={`text-creator-${index}`}>
                  {record.createdBy}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onView?.(record.id)}
                      data-testid={`button-view-${index}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {record.status === "COMPLETE" && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onDownloadPdf?.(record.id)}
                        data-testid={`button-download-${index}`}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}