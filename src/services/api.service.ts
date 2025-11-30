import { apiClient } from '@/config/api.config';
import type {
    Project,
    CreateProjectDto,
    UpdateProjectDto,
    ApiEndpoint,
    CreateApiEndpointDto,
    UpdateApiEndpointDto,
    TestCase,
    CreateTestCaseDto,
    UpdateTestCaseDto,
} from '@/types/types';

// Project API
export const projectApi = {
    getAll: () => apiClient.get<Project[]>('/projects'),

    getOne: (id: string) => apiClient.get<Project>(`/projects/${id}`),

    create: (data: CreateProjectDto) => apiClient.post<Project>('/projects', data),

    update: (id: string, data: UpdateProjectDto) =>
        apiClient.put<Project>(`/projects/${id}`, data),

    delete: (id: string) => apiClient.delete<void>(`/projects/${id}`),
};

// API Endpoint API
export const apiEndpointApi = {
    getAllByProject: (projectId: string) =>
        apiClient.get<ApiEndpoint[]>(`/projects/${projectId}/endpoints`),

    getOne: (id: string) => apiClient.get<ApiEndpoint>(`/endpoints/${id}`),

    create: (data: CreateApiEndpointDto) =>
        apiClient.post<ApiEndpoint>('/endpoints', data),

    update: (id: string, data: UpdateApiEndpointDto) =>
        apiClient.put<ApiEndpoint>(`/endpoints/${id}`, data),

    delete: (id: string) => apiClient.delete<void>(`/endpoints/${id}`),
};

// Test Case API
export const testCaseApi = {
    getAllByApi: (apiId: string) =>
        apiClient.get<TestCase[]>(`/endpoints/${apiId}/testcases`),

    getOne: (id: string) => apiClient.get<TestCase>(`/testcases/${id}`),

    create: (data: CreateTestCaseDto) =>
        apiClient.post<TestCase>('/testcases', data),

    update: (id: string, data: UpdateTestCaseDto) =>
        apiClient.put<TestCase>(`/testcases/${id}`, data),

    delete: (id: string) => apiClient.delete<void>(`/testcases/${id}`),
};
