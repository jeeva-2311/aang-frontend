import { useState } from "react";
import { useNavigate, useParams, Outlet } from "react-router";
import Sidebar from "@/components/dashboard/Sidebar";
import ListItem from "@/components/dashboard/ListItem";
import Modal from "@/components/ui/Modal";
import EndpointForm from "@/components/forms/EndpointForm";
import {
    useEndpoints,
    useProject,
    useCreateEndpoint,
    useUpdateEndpoint,
    useDeleteEndpoint,
} from "@/hooks/hooks";
import { useAppStore } from "@/store/appStore";
import type { ApiEndpoint, CreateApiEndpointDto, UpdateApiEndpointDto } from "@/types/types";

const Endpoints = () => {
    const navigate = useNavigate();
    const { projectId, endpointId } = useParams();
    const { data: project } = useProject(projectId!);
    const { data: endpoints, isLoading } = useEndpoints(projectId!);
    const createEndpoint = useCreateEndpoint();
    const updateEndpoint = useUpdateEndpoint();
    const deleteEndpoint = useDeleteEndpoint();
    const { selectedEndpointId, setSelectedEndpoint, resetEndpointSelection } = useAppStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEndpoint, setEditingEndpoint] = useState<ApiEndpoint | null>(null);

    const handleBack = () => {
        resetEndpointSelection();
        navigate("/projects");
    };

    const handleCreateClick = () => {
        setEditingEndpoint(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (endpoint: ApiEndpoint) => {
        setEditingEndpoint(endpoint);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (endpoint: ApiEndpoint) => {
        if (confirm(`Are you sure you want to delete "${endpoint.name}"?`)) {
            try {
                await deleteEndpoint.mutateAsync({ id: endpoint.id, projectId: projectId! });
                if (selectedEndpointId === endpoint.id) {
                    setSelectedEndpoint(null);
                    navigate(`/projects/${projectId}/endpoints`);
                }
            } catch (error) {
                alert("Failed to delete endpoint");
            }
        }
    };

    const handleSubmit = async (data: CreateApiEndpointDto | UpdateApiEndpointDto) => {
        try {
            if (editingEndpoint) {
                await updateEndpoint.mutateAsync({ id: editingEndpoint.id, data });
            } else {
                const newEndpoint = await createEndpoint.mutateAsync(data as CreateApiEndpointDto);
                setSelectedEndpoint(newEndpoint.id);
                navigate(`/projects/${projectId}/endpoints/${newEndpoint.id}/test-cases`);
            }
            setIsModalOpen(false);
        } catch (error) {
            alert("Failed to save endpoint");
        }
    };

    const handleEndpointClick = (endpoint: ApiEndpoint) => {
        setSelectedEndpoint(endpoint.id);
        navigate(`/projects/${projectId}/endpoints/${endpoint.id}/test-cases`);
    };

    // If we're in a nested route (endpointId exists), show the Outlet
    if (endpointId) {
        return <Outlet />;
    }

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar
                title={project?.name || "API Endpoints"}
                showBackButton
                onBack={handleBack}
                actionButtonLabel="+ New Endpoint"
                onAction={handleCreateClick}
            >
                {isLoading ? (
                    <div className="text-center text-slate-500 py-4">Loading...</div>
                ) : endpoints && endpoints.length > 0 ? (
                    endpoints.map((endpoint) => (
                        <ListItem
                            key={endpoint.id}
                            title={endpoint.name}
                            subtitle={`${endpoint.method} ${endpoint.url}`}
                            isActive={selectedEndpointId === endpoint.id}
                            onClick={() => handleEndpointClick(endpoint)}
                            onEdit={() => handleEditClick(endpoint)}
                            onDelete={() => handleDeleteClick(endpoint)}
                        />
                    ))
                ) : (
                    <div className="text-center text-slate-500 py-4 text-sm">
                        No endpoints yet. Create one to get started!
                    </div>
                )}
            </Sidebar>

            <main className="flex-1 flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                    <div className="mb-4 text-6xl">🔌</div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">
                        Select an Endpoint
                    </h2>
                    <p className="text-slate-600">
                        Choose an API endpoint from the sidebar to view its test cases, or create a new endpoint.
                    </p>
                </div>
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingEndpoint ? "Edit Endpoint" : "Create New Endpoint"}
            >
                <EndpointForm
                    endpoint={editingEndpoint || undefined}
                    projectId={projectId!}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                    isLoading={createEndpoint.isPending || updateEndpoint.isPending}
                />
            </Modal>
        </div>
    );
};

export default Endpoints;
