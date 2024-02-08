import axios from "axios";
import { useEffect, useState } from "react";
import DashboardIndex from "../src/component/Dashboard";

export interface InventoryData {
     name: string;
    category: string;
    value: string;
    quantity: number;
    price: string;
}

export const fetchInventory = async () => {
    console.log("fetchData", process.env.ROOT_URL);
    const response = await axios.get(`https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory`);
    console.log(response.data, "response.data");
    return response.data;
};

const index = () => {

    const [inventories, setInventories] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchInventory();
                setInventories(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); 

    return (
        <>
        {console.log(inventories, "inv")}
            {isLoading || !inventories ? (
                "Loading..."
            ) : (
                <DashboardIndex 
                data={inventories}
                />
            )}
        </>

    )
}

export default index

