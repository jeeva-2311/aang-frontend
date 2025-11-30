import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        // Request Interceptor
        this.axiosInstance.interceptors.request.use(
            (config) => {
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response Interceptor
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response.data;
            },
            (error) => {
                // Handle global errors here
                const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
                // You might want to throw a custom error object or just the message
                return Promise.reject(new Error(message));
            }
        );
    }

    async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.get<T, T>(endpoint, config);
    }

    async post<T>(endpoint: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.post<T, T>(endpoint, body, config);
    }

    async put<T>(endpoint: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.put<T, T>(endpoint, body, config);
    }

    async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.delete<T, T>(endpoint, config);
    }
}

export const apiClient = new ApiClient(API_BASE_URL);
