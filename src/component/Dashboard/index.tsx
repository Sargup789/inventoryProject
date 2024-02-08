import { QueryClient, QueryClientProvider } from "react-query";
import { InventoryData } from "../../../pages";
import DashboardTable from "./Dashboardtable";
import { useContext, useState } from "react";
import DashboardDialog from "./DashboardDialog";
import Layout from "../Layout";
import AuthContext from "../../AuthContext"

type Props = {
    data: InventoryData[];
};

const queryClient = new QueryClient();
const DashboardIndex = ({ data }: Props) => {
    const { isAdmin } = useContext(AuthContext);
    const [addInventoryDialogOpen, setAddInventoryDialogOpen] = useState(false);
    const [inventoryDialogData, setInventoryDialogData] = useState<InventoryData | {}>({});
    const [isViewMode, setIsViewMode] = useState(false);

    const viewInventory = (zone: InventoryData) => {
        setInventoryDialogData(zone);
        setAddInventoryDialogOpen(true);
        setIsViewMode(true);
    }

    const editInventory = (zone: InventoryData) => {
        setInventoryDialogData(zone);
        setAddInventoryDialogOpen(true);
    };

    const handleClose = () => {
        setAddInventoryDialogOpen(false);
        setInventoryDialogData({});
        setIsViewMode(false);
    };

    return (
        <Layout>
        <QueryClientProvider client={queryClient}>
            <div className="mx-12 h-screen py-6">
                <h2 className="text-white text-4xl mb-12">Inventory stats</h2>
                <DashboardTable
                    data={data}
                    viewInventory={viewInventory}
                    editInventory={editInventory}
                />
                <DashboardDialog
                    open={addInventoryDialogOpen}
                    isViewMode={isViewMode}
                    inventoryDialogData={inventoryDialogData}
                    handleClose={handleClose}
                // onSubmit={onSubmit}
                />
            </div>
        </QueryClientProvider>
        </Layout>
    )
}

export default DashboardIndex