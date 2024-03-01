import { getListTypeImageApi } from "../../apis/type_image/getListTypeImage";
import { useQuery } from "@tanstack/react-query";
export const useGetListTypeImage = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["rooms", "type_image"],
        queryFn: () => getListTypeImageApi(),
    });
    return {
        typeImage: data?.data,
        isLoading,
    };
};