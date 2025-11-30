import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Sidebar from "@/components/dashboard/Sidebar";
import ListItem from "@/components/dashboard/ListItem";
import Modal from "@/components/ui/Modal";
import TestCaseForm from "@/components/forms/TestCaseForm";
import {
    useTestCases,
    useEndpoint,
    useCreateTestCase,
    useUpdateTestCase,
    useDeleteTestCase,
} from "@/hooks/hooks";
import { useAppStore } from "@/store/appStore";
import type { TestCase, CreateTestCaseDto, UpdateTestCaseDto } from "@/types/types";

const TestCases = () => {
    const navigate = useNavigate();
    const { projectId, endpointId } = useParams();
    const { data: endpoint } = useEndpoint(endpointId!);
    const { data: testCases, isLoading } = useTestCases(endpointId!);
    const createTestCase = useCreateTestCase();
    const updateTestCase = useUpdateTestCase();
    const deleteTestCase = useDeleteTestCase();
    const { selectedTestCaseId, setSelectedTestCase, resetTestCaseSelection } = useAppStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestCase, setEditingTestCase] = useState<TestCase | null>(null);

    const handleBack = () => {
        resetTestCaseSelection();
        navigate(`/projects/${projectId}/endpoints`);
    };

    const handleCreateClick = () => {
        setEditingTestCase(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (testCase: TestCase) => {
        setEditingTestCase(testCase);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (testCase: TestCase) => {
        if (confirm(`Are you sure you want to delete "${testCase.name}"?`)) {
            try {
                await deleteTestCase.mutateAsync({ id: testCase.id, apiId: endpointId! });
                if (selectedTestCaseId === testCase.id) {
                    setSelectedTestCase(null);
                }
            } catch (error) {
                alert("Failed to delete test case");
            }
        }
    };

    const handleSubmit = async (data: CreateTestCaseDto | UpdateTestCaseDto) => {
        try {
            if (editingTestCase) {
                await updateTestCase.mutateAsync({ id: editingTestCase.id, data });
            } else {
                const newTestCase = await createTestCase.mutateAsync(data as CreateTestCaseDto);
                setSelectedTestCase(newTestCase.id);
            }
            setIsModalOpen(false);
        } catch (error) {
            alert("Failed to save test case");
        }
    };

    const handleTestCaseClick = (testCase: TestCase) => {
        setSelectedTestCase(testCase.id);
    };

    const selectedTestCase = testCases?.find((tc) => tc.id === selectedTestCaseId);

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar
                title={endpoint?.name || "Test Cases"}
                showBackButton
                onBack={handleBack}
                actionButtonLabel="+ New Test Case"
                onAction={handleCreateClick}
            >
                {isLoading ? (
                    <div className="text-center text-slate-500 py-4">Loading...</div>
                ) : testCases && testCases.length > 0 ? (
                    testCases.map((testCase) => (
                        <ListItem
                            key={testCase.id}
                            title={testCase.name}
                            subtitle={`Status: ${testCase.expectedStatus}`}
                            isActive={selectedTestCaseId === testCase.id}
                            onClick={() => handleTestCaseClick(testCase)}
                            onEdit={() => handleEditClick(testCase)}
                            onDelete={() => handleDeleteClick(testCase)}
                        />
                    ))
                ) : (
                    <div className="text-center text-slate-500 py-4 text-sm">
                        No test cases yet. Create one to get started!
                    </div>
                )}
            </Sidebar>

            <main className="flex-1 p-8 overflow-y-auto">
                {selectedTestCase ? (
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">
                                {selectedTestCase.name}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">
                                        Expected Status Code
                                    </label>
                                    <div className="px-4 py-2 bg-slate-50 rounded-md border border-slate-200">
                                        <span className="text-lg font-mono font-semibold text-slate-800">
                                            {selectedTestCase.expectedStatus}
                                        </span>
                                    </div>
                                </div>

                                {selectedTestCase.expectedResponse && (
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1">
                                            Expected Response
                                        </label>
                                        <pre className="px-4 py-3 bg-slate-50 rounded-md border border-slate-200 overflow-x-auto text-sm font-mono text-slate-800">
                                            {JSON.stringify(JSON.parse(selectedTestCase.expectedResponse), null, 2)}
                                        </pre>
                                    </div>
                                )}

                                {endpoint && (
                                    <div className="pt-4 border-t border-slate-200">
                                        <label className="block text-sm font-medium text-slate-600 mb-2">
                                            Endpoint Details
                                        </label>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                                                    {endpoint.method}
                                                </span>
                                                <span className="text-sm text-slate-700 font-mono">
                                                    {endpoint.url}
                                                </span>
                                            </div>
                                            {endpoint.headers && Object.keys(endpoint.headers).length > 0 && (
                                                <div>
                                                    <span className="text-xs text-slate-600">Headers:</span>
                                                    <pre className="mt-1 px-3 py-2 bg-slate-50 rounded text-xs font-mono text-slate-700">
                                                        {JSON.stringify(endpoint.headers, null, 2)}
                                                    </pre>
                                                </div>
                                            )}
                                            {endpoint.body && (
                                                <div>
                                                    <span className="text-xs text-slate-600">Body:</span>
                                                    <pre className="mt-1 px-3 py-2 bg-slate-50 rounded text-xs font-mono text-slate-700">
                                                        {endpoint.body}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center max-w-md">
                            <div className="mb-4 text-6xl">✅</div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">
                                Select a Test Case
                            </h2>
                            <p className="text-slate-600">
                                Choose a test case from the sidebar to view its details, or create a new test case.
                            </p>
                        </div>
                    </div>
                )}
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingTestCase ? "Edit Test Case" : "Create New Test Case"}
            >
                <TestCaseForm
                    testCase={editingTestCase || undefined}
                    apiId={endpointId!}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                    isLoading={createTestCase.isPending || updateTestCase.isPending}
                />
            </Modal>
        </div>
    );
};

export default TestCases;
