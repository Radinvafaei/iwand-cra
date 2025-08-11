import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {FC, PropsWithChildren} from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            refetchOnMount: true,
            gcTime: 0,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
        },
    }
})

const QueryProvider: FC<PropsWithChildren> = ({children}) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export default QueryProvider;
