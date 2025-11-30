import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import type { ApiEndpoint, CreateApiEndpointDto, UpdateApiEndpointDto } from "@/types/types";

interface EndpointFormProps {
    endpoint?: ApiEndpoint;
    projectId: string;
    onSubmit: (data: CreateApiEndpointDto | UpdateApiEndpointDto) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

const EndpointForm = ({ endpoint, projectId, onSubmit, onCancel, isLoading }: EndpointFormProps) => {
    const [name, setName] = useState(endpoint?.name || "");
    const [url, setUrl] = useState(endpoint?.url || "");
    const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>(
        endpoint?.method || 'GET'
    );
    const [headers, setHeaders] = useState(
        endpoint?.headers ? JSON.stringify(endpoint.headers, null, 2) : ""
    );
    const [body, setBody] = useState(endpoint?.body || "");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        let parsedHeaders: Record<string, string> | undefined;
        if (headers.trim()) {
            try {
                parsedHeaders = JSON.parse(headers);
            } catch (error) {
                alert("Invalid JSON in headers");
                return;
            }
        }

        const data: CreateApiEndpointDto | UpdateApiEndpointDto = {
            name,
            url,
            method,
            headers: parsedHeaders,
            body: body || undefined,
        };

        if (!endpoint) {
            (data as CreateApiEndpointDto).projectId = projectId;
        }

        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Endpoint Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="e.g., Get Users"
                />
            </div>

            <div>
                <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-1">
                    URL <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="https://api.example.com/users"
                />
            </div>

            <div>
                <label htmlFor="method" className="block text-sm font-medium text-slate-700 mb-1">
                    HTTP Method <span className="text-red-500">*</span>
                </label>
                <select
                    id="method"
                    value={method}
                    onChange={(e) => setMethod(e.target.value as typeof method)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                    {httpMethods.map((m) => (
                        <option key={m} value={m}>
                            {m}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="headers" className="block text-sm font-medium text-slate-700 mb-1">
                    Headers (JSON)
                </label>
                <textarea
                    id="headers"
                    value={headers}
                    onChange={(e) => setHeaders(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none font-mono text-sm"
                    placeholder='{"Content-Type": "application/json"}'
                />
            </div>

            <div>
                <label htmlFor="body" className="block text-sm font-medium text-slate-700 mb-1">
                    Request Body
                </label>
                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none font-mono text-sm"
                    placeholder='{"key": "value"}'
                />
            </div>

            <div className="flex justify-end gap-3 pt-2">
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
                    disabled={isLoading || !name.trim() || !url.trim()}
                    className="bg-slate-700 hover:bg-slate-800"
                >
                    {isLoading ? "Saving..." : endpoint ? "Update" : "Create"}
                </Button>
            </div>
        </form>
    );
};

export default EndpointForm;
