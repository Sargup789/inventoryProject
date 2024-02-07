 
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { InventoryData } from "../../pages";
import DashboardTable from "./Dashboardtable";
import { Typography } from "@mui/material";

type Props = {
    data: InventoryData[];
};
 
const queryClient = new QueryClient();
const DashboardIndex = ({ data }: Props) => {
    const router = useRouter()
    return (
        <QueryClientProvider client={queryClient}>
            <div className="m-6">
                <Typography><h2>Inventory stats</h2></Typography>
                <DashboardTable data={data}/>
            </div>
        </QueryClientProvider>
    )
}

export default DashboardIndex