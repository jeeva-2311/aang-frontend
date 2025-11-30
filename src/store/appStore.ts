import { create } from 'zustand';

interface AppState {
    // Selected IDs for navigation
    selectedProjectId: string | null;
    selectedEndpointId: string | null;
    selectedTestCaseId: string | null;

    // Actions
    setSelectedProject: (projectId: string | null) => void;
    setSelectedEndpoint: (endpointId: string | null) => void;
    setSelectedTestCase: (testCaseId: string | null) => void;

    // Reset navigation (e.g., when navigating back)
    resetEndpointSelection: () => void;
    resetTestCaseSelection: () => void;
    resetAllSelections: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    selectedProjectId: null,
    selectedEndpointId: null,
    selectedTestCaseId: null,

    setSelectedProject: (projectId) => set({ selectedProjectId: projectId }),
    setSelectedEndpoint: (endpointId) => set({ selectedEndpointId: endpointId }),
    setSelectedTestCase: (testCaseId) => set({ selectedTestCaseId: testCaseId }),

    resetEndpointSelection: () => set({ selectedEndpointId: null, selectedTestCaseId: null }),
    resetTestCaseSelection: () => set({ selectedTestCaseId: null }),
    resetAllSelections: () => set({
        selectedProjectId: null,
        selectedEndpointId: null,
        selectedTestCaseId: null
    }),
}));
