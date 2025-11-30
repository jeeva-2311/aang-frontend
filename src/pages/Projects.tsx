import { useState } from "react";
import { useNavigate, Outlet, useParams } from "react-router";
import Sidebar from "@/components/dashboard/Sidebar";
import ListItem from "@/components/dashboard/ListItem";
import Modal from "@/components/ui/Modal";
import ProjectForm from "@/components/forms/ProjectForm";
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from "@/hooks/hooks";
import { useAppStore } from "@/store/appStore";
import type { Project, CreateProjectDto, UpdateProjectDto } from "@/types/types";

const Projects = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const { selectedProjectId, setSelectedProject } = useAppStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleCreateClick = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (project: Project) => {
    if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
      try {
        await deleteProject.mutateAsync(project.id);
        if (selectedProjectId === project.id) {
          setSelectedProject(null);
          navigate('/projects');
        }
      } catch (error) {
        alert("Failed to delete project");
      }
    }
  };

  const handleSubmit = async (data: CreateProjectDto | UpdateProjectDto) => {
    try {
      if (editingProject) {
        await updateProject.mutateAsync({ id: editingProject.id, data });
      } else {
        const newProject = await createProject.mutateAsync(data as CreateProjectDto);
        setSelectedProject(newProject.id);
        navigate(`/projects/${newProject.id}/endpoints`);
      }
      setIsModalOpen(false);
    } catch (error) {
      alert("Failed to save project");
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project.id);
    navigate(`/projects/${project.id}/endpoints`);
  };

  // If we're in a nested route (projectId exists), show the Outlet
  if (projectId) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        title="Projects"
        actionButtonLabel="+ New Project"
        onAction={handleCreateClick}
      >
        {isLoading ? (
          <div className="text-center text-slate-500 py-4">Loading...</div>
        ) : projects && projects.length > 0 ? (
          projects.map((project) => (
            <ListItem
              key={project.id}
              title={project.name}
              subtitle={project.description}
              isActive={selectedProjectId === project.id}
              onClick={() => handleProjectClick(project)}
              onEdit={() => handleEditClick(project)}
              onDelete={() => handleDeleteClick(project)}
            />
          ))
        ) : (
          <div className="text-center text-slate-500 py-4 text-sm">
            No projects yet. Create one to get started!
          </div>
        )}
      </Sidebar>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mb-4 text-6xl">📁</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Select a Project
          </h2>
          <p className="text-slate-600">
            Choose a project from the sidebar to view its API endpoints, or create a new project to get started.
          </p>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? "Edit Project" : "Create New Project"}
      >
        <ProjectForm
          project={editingProject || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          isLoading={createProject.isPending || updateProject.isPending}
        />
      </Modal>
    </div>
  );
};

export default Projects;