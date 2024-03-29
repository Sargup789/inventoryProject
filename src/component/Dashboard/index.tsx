import { QueryClient, QueryClientProvider } from "react-query";
import { InventoryData } from "../../../pages";
import DashboardTable from "./Dashboardtable";
import { useState } from "react";
import DashboardDialog from "./DashboardDialog";
import Layout from "../Layout";

type Props = {
    data: InventoryData[];
};

const queryClient = new QueryClient();
const DashboardIndex = ({ data: initialData }: Props) => {
    const [data, setData] = useState<InventoryData[]>(initialData);
    const [addInventoryDialogOpen, setAddInventoryDialogOpen] = useState(false);
    const [inventoryDialogData, setInventoryDialogData] = useState<InventoryData | {}>({});

    const viewInventory = (zone: InventoryData) => {
        setInventoryDialogData(zone);
        setAddInventoryDialogOpen(true);
    }

    const editInventory = (updatedInventory: InventoryData) => {
        const index = data.findIndex((item) => item.name === updatedInventory.name);
        data[index] = updatedInventory;
        handleClose();
    };

    const deleteInventory = (index: number) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    const handleClose = () => {
        setAddInventoryDialogOpen(false);
        setInventoryDialogData({});
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
                        deleteInventory={deleteInventory}
                    />
                    <DashboardDialog
                        open={addInventoryDialogOpen}
                        inventoryDialogData={inventoryDialogData}
                        handleClose={handleClose}
                        onSubmit={editInventory}
                    />
                </div>
            </QueryClientProvider>
        </Layout>
    )
}

export default DashboardIndex