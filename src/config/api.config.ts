const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

interface FetchOptions extends RequestInit {
    body?: any;
}

class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;

        const config: RequestInit = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        if (options.body) {
            config.body = JSON.stringify(options.body);
        }

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            // Handle empty responses (e.g., DELETE operations)
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }

            return {} as T;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('An unexpected error occurred');
        }
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    async post<T>(endpoint: string, body?: any): Promise<T> {
        return this.request<T>(endpoint, { method: 'POST', body });
    }

    async put<T>(endpoint: string, body?: any): Promise<T> {
        return this.request<T>(endpoint, { method: 'PUT', body });
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}

export const apiClient = new ApiClient(API_BASE_URL);
