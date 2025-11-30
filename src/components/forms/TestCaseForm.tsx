import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import type { TestCase, CreateTestCaseDto, UpdateTestCaseDto } from "@/types/types";

interface TestCaseFormProps {
    testCase?: TestCase;
    apiId: string;
    onSubmit: (data: CreateTestCaseDto | UpdateTestCaseDto) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const TestCaseForm = ({ testCase, apiId, onSubmit, onCancel, isLoading }: TestCaseFormProps) => {
    const [name, setName] = useState(testCase?.name || "");
    const [expectedStatus, setExpectedStatus] = useState(
        testCase?.expectedStatus?.toString() || "200"
    );
    const [expectedResponse, setExpectedResponse] = useState(
        testCase?.expectedResponse || ""
    );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data: CreateTestCaseDto | UpdateTestCaseDto = {
            name,
            expectedStatus: parseInt(expectedStatus, 10),
            expectedResponse: expectedResponse || undefined,
        };

        if (!testCase) {
            (data as CreateTestCaseDto).apiId = apiId;
        }

        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Test Case Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="e.g., Should return 200 OK"
                />
            </div>

            <div>
                <label htmlFor="expectedStatus" className="block text-sm font-medium text-slate-700 mb-1">
                    Expected Status Code <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    id="expectedStatus"
                    value={expectedStatus}
                    onChange={(e) => setExpectedStatus(e.target.value)}
                    required
                    min="100"
                    max="599"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="200"
                />
            </div>

            <div>
                <label htmlFor="expectedResponse" className="block text-sm font-medium text-slate-700 mb-1">
                    Expected Response (JSON)
                </label>
                <textarea
                    id="expectedResponse"
                    value={expectedResponse}
                    onChange={(e) => setExpectedResponse(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none font-mono text-sm"
                    placeholder='{"success": true, "data": []}'
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
                    disabled={isLoading || !name.trim() || !expectedStatus}
                    className="bg-slate-700 hover:bg-slate-800"
                >
                    {isLoading ? "Saving..." : testCase ? "Update" : "Create"}
                </Button>
            </div>
        </form>
    );
};

export default TestCaseForm;
