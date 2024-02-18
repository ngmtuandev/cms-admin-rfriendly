import { getAllRolesApi } from "../../apis/role/getAllRolesApi";
import { useQuery } from "@tanstack/react-query";
export const useGetAllRoles = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["role"],
        queryFn: () => getAllRolesApi(),
    });
    return {
        roles: data,
        isLoading,
    };
};