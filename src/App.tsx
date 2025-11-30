import './App.css'
import Router from './routers/AppRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5000,
        },
    },
});

const App = () => (
    <QueryClientProvider client={queryClient}>
        <Router />
    </QueryClientProvider>
);

export default App
