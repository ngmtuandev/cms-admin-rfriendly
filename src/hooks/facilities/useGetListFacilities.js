import { getAllFacilitiesApi } from "../../apis/facilities/getAllFacilitiesApi";
import { useQuery } from "@tanstack/react-query";
export const useGetListFacilities = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["facilities"],
        queryFn: () => getAllFacilitiesApi(),
    });
    return {
        facilities: data?.data,
        isLoading,
    };
};