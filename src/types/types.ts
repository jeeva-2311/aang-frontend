export interface Project {
    id: string;
    name: string;
    description?: string;
    baseUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProjectDto {
    name: string;
    description?: string;
    baseUrl?: string;
}

export interface UpdateProjectDto {
    name?: string;
    description?: string;
    baseUrl?: string;
}

export interface ApiEndpoint {
    id: string;
    projectId: string;
    name: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateApiEndpointDto {
    projectId: string;
    name: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: string;
}

export interface UpdateApiEndpointDto {
    name?: string;
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: string;
}

export interface TestCase {
    id: string;
    apiId: string;
    name: string;
    expectedStatus: number;
    expectedResponse?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTestCaseDto {
    apiId: string;
    name: string;
    expectedStatus: number;
    expectedResponse?: string;
}

export interface UpdateTestCaseDto {
    name?: string;
    expectedStatus?: number;
    expectedResponse?: string;
}
