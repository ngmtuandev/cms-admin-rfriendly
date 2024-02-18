import { getAllUserApi } from "../../apis/user/getAllUsersApi";
import { useQuery } from "@tanstack/react-query";
export const useGetListUsers = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: () => getAllUserApi(),
    });
    console.log("data test >>", data);
    return {
        users: data,
        isLoading,
    };
};