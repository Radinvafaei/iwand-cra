import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {FC, PropsWithChildren} from "react";

const queryClient = new QueryClient()

const QueryProvider: FC<PropsWithChildren> = ({children}) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export default QueryProvider;
