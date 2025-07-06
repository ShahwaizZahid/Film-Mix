import React from "react";
import { Button } from "./button";
import { List, Grid } from "lucide-react";

export type ViewMode = "infinite" | "pagination";

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
}

export function ViewModeToggle({
  viewMode,
  onViewModeChange,
  className = "",
}: ViewModeToggleProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-muted-foreground">View:</span>
      <div className="flex rounded-lg border border-border overflow-hidden">
        <Button
          variant={viewMode === "infinite" ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange("infinite")}
          className={`rounded-none border-0 ${
            viewMode === "infinite"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "hover:bg-purple-50 dark:hover:bg-purple-900/20"
          }`}
        >
          <List className="h-4 w-4 mr-1" />
          Infinite
        </Button>
        <Button
          variant={viewMode === "pagination" ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange("pagination")}
          className={`rounded-none border-0 ${
            viewMode === "pagination"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "hover:bg-purple-50 dark:hover:bg-purple-900/20"
          }`}
        >
          <Grid className="h-4 w-4 mr-1" />
          Pages
        </Button>
      </div>
    </div>
  );
}
