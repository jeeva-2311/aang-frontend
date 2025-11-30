import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import type { Project, CreateProjectDto, UpdateProjectDto } from "@/types/types";

interface ProjectFormProps {
    project?: Project;
    onSubmit: (data: CreateProjectDto | UpdateProjectDto) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const ProjectForm = ({ project, onSubmit, onCancel, isLoading }: ProjectFormProps) => {
    const [name, setName] = useState(project?.name || "");
    const [description, setDescription] = useState(project?.description || "");
    const [baseUrl, setBaseUrl] = useState(project?.baseUrl || "");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            description: description || undefined,
            baseUrl: baseUrl || undefined
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Project Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="Enter project name"
                />
            </div>

            <div>
                <label htmlFor="baseUrl" className="block text-sm font-medium text-slate-700 mb-1">
                    Base URL
                </label>
                <input
                    type="url"
                    id="baseUrl"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="https://api.example.com"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                    placeholder="Enter project description (optional)"
                />
            </div>

            <div className="flex justify-end gap-3 pt-2 text-white">
                <Button
                    type="button"
                    onClick={onCancel}
                    variant="outline"
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading || !name.trim()}
                    className="bg-slate-700 hover:bg-slate-800"
                >
                    {isLoading ? "Saving..." : project ? "Update" : "Create"}
                </Button>
            </div>
        </form>
    );
};

export default ProjectForm;
