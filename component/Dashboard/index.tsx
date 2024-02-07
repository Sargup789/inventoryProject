 
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { InventoryData } from "../../pages";
import DashboardTable from "./Dashboardtable";

type Props = {
    data: InventoryData[];
};
 
const queryClient = new QueryClient();
const DashboardIndex = ({ data }: Props) => {
    const router = useRouter()
    return (
        <QueryClientProvider client={queryClient}>
            <div className="m-6">
                <br />
                <DashboardTable data={data}/>
            </div>
        </QueryClientProvider>
    )
}

export default DashboardIndex