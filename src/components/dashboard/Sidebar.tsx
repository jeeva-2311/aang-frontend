import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  actionButtonLabel?: string;
  onAction?: () => void;
  children: ReactNode;
  className?: string;
}

const Sidebar = ({
  title,
  showBackButton = false,
  onBack,
  actionButtonLabel,
  onAction,
  children,
  className,
}: SidebarProps) => {
  return (
    <aside
      className={cn(
        "w-64 bg-slate-100/80 backdrop-blur-sm border-r border-slate-300 shadow-sm flex flex-col h-screen",
        className
      )}
    >
      <div className="p-4 text-lg font-semibold border-b border-slate-300 text-slate-700 flex items-center justify-start gap-2">
        {showBackButton && (
          <Button
            onClick={onBack}
            variant="outline"
            size="icon"
            className="h-8 w-8 text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        <span>{title}</span>
      </div>

      <div className="flex-1 p-3 overflow-y-auto">
        <div className="flex flex-col space-y-2">{children}</div>
      </div>

      {actionButtonLabel && onAction && (
        <div className="p-4 border-t border-slate-300">
          <Button
            onClick={onAction}
            className="w-full bg-slate-700 text-slate-100 rounded-md shadow-sm hover:shadow-md transition-all duration-300"
          >
            {actionButtonLabel}
          </Button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
