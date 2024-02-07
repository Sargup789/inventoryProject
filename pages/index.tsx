import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";

export const fetchInventory = async () => {
    console.log("fetchData", process.env.ROOT_URL);
    const response = await axios.get(`https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory`);
    console.log(response.data, "response.data");
    return response.data;
};

const index = () => {

    const {
        data: inventory,
        isLoading,
        refetch,
    }: UseQueryResult<unknown> = useQuery(["inventory"], () => fetchInventory(), {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    return (
        <>
            {isLoading || !inventory ? (
                "Loading..."
            ) : (
                ""
            )}
        </>

    )
}

export default index

