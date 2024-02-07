 
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
 
const queryClient = new QueryClient();
const DashboardIndex = () => {
    const router = useRouter()
    return (
        <QueryClientProvider client={queryClient}>
            <div className="m-6">
                <br />
                {/* <DashboardTable/> */}
            </div>
        </QueryClientProvider>
    )
}

export default DashboardIndex