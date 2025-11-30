import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListItemProps {
    title: string;
    subtitle?: string;
    isActive?: boolean;
    onClick?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

const ListItem = ({
    title,
    subtitle,
    isActive,
    onClick,
    onEdit,
    onDelete,
}: ListItemProps) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "group relative p-3 rounded-lg border transition-all duration-200 cursor-pointer",
                isActive
                    ? "bg-slate-700 border-slate-600 shadow-md"
                    : "bg-white border-slate-200 hover:border-slate-400 hover:shadow-sm"
            )}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <h3
                        className={cn(
                            "font-medium text-sm truncate",
                            isActive ? "text-white" : "text-slate-800"
                        )}
                    >
                        {title}
                    </h3>
                    {subtitle && (
                        <p
                            className={cn(
                                "text-xs mt-0.5 truncate",
                                isActive ? "text-slate-300" : "text-slate-500"
                            )}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onEdit && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit();
                            }}
                            className={cn(
                                "p-1.5 rounded transition-colors",
                                isActive
                                    ? "hover:bg-slate-600 text-slate-300"
                                    : "hover:bg-slate-100 text-slate-600"
                            )}
                            title="Edit"
                        >
                            <Pencil className="h-3.5 w-3.5" />
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                            className={cn(
                                "p-1.5 rounded transition-colors",
                                isActive
                                    ? "hover:bg-red-900 text-red-300"
                                    : "hover:bg-red-50 text-red-600"
                            )}
                            title="Delete"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListItem;
