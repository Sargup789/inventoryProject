import { QueryClient, QueryClientProvider } from "react-query";
import { InventoryData } from "../../pages";
import DashboardTable from "./Dashboardtable";
import { Typography } from "@mui/material";
import { useState } from "react";
import DashboardDialog from "./DashboardDialog";

type Props = {
    data: InventoryData[];
};

const queryClient = new QueryClient();
const DashboardIndex = ({ data }: Props) => {
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
        <QueryClientProvider client={queryClient}>
            <div className="m-6">
                <Typography><h2>Inventory stats</h2></Typography>
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
    )
}

export default DashboardIndex