import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi, apiEndpointApi, testCaseApi } from '@/services/api.service';
import type {
    CreateProjectDto,
    UpdateProjectDto,
    CreateApiEndpointDto,
    UpdateApiEndpointDto,
    CreateTestCaseDto,
    UpdateTestCaseDto,
} from '@/types/types';

// Query Keys
export const queryKeys = {
    projects: ['projects'] as const,
    project: (id: string) => ['projects', id] as const,
    endpoints: (projectId: string) => ['endpoints', projectId] as const,
    endpoint: (id: string) => ['endpoint', id] as const,
    testCases: (apiId: string) => ['testCases', apiId] as const,
    testCase: (id: string) => ['testCase', id] as const,
};

// Project Hooks
export const useProjects = () => {
    return useQuery({
        queryKey: queryKeys.projects,
        queryFn: projectApi.getAll,
    });
};

export const useProject = (id: string) => {
    return useQuery({
        queryKey: queryKeys.project(id),
        queryFn: () => projectApi.getOne(id),
        enabled: !!id,
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateProjectDto) => projectApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.projects });
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateProjectDto }) =>
            projectApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.projects });
            queryClient.invalidateQueries({ queryKey: queryKeys.project(variables.id) });
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => projectApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.projects });
        },
    });
};

// API Endpoint Hooks
export const useEndpoints = (projectId: string) => {
    return useQuery({
        queryKey: queryKeys.endpoints(projectId),
        queryFn: () => apiEndpointApi.getAllByProject(projectId),
        enabled: !!projectId,
    });
};

export const useEndpoint = (id: string) => {
    return useQuery({
        queryKey: queryKeys.endpoint(id),
        queryFn: () => apiEndpointApi.getOne(id),
        enabled: !!id,
    });
};

export const useCreateEndpoint = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateApiEndpointDto) => apiEndpointApi.create(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.endpoints(data.projectId) });
        },
    });
};

export const useUpdateEndpoint = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateApiEndpointDto }) =>
            apiEndpointApi.update(id, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.endpoints(data.projectId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.endpoint(variables.id) });
        },
    });
};

export const useDeleteEndpoint = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id }: { id: string; projectId: string }) =>
            apiEndpointApi.delete(id),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.endpoints(variables.projectId) });
        },
    });
};

// Test Case Hooks
export const useTestCases = (apiId: string) => {
    return useQuery({
        queryKey: queryKeys.testCases(apiId),
        queryFn: () => testCaseApi.getAllByApi(apiId),
        enabled: !!apiId,
    });
};

export const useTestCase = (id: string) => {
    return useQuery({
        queryKey: queryKeys.testCase(id),
        queryFn: () => testCaseApi.getOne(id),
        enabled: !!id,
    });
};

export const useCreateTestCase = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTestCaseDto) => testCaseApi.create(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.testCases(data.apiId) });
        },
    });
};

export const useUpdateTestCase = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateTestCaseDto }) =>
            testCaseApi.update(id, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.testCases(data.apiId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.testCase(variables.id) });
        },
    });
};

export const useDeleteTestCase = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id }: { id: string; apiId: string }) =>
            testCaseApi.delete(id),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.testCases(variables.apiId) });
        },
    });
};
