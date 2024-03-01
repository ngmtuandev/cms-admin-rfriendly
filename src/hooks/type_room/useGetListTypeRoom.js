import { getListTypeRoomApi } from "../../apis/type_room/getTypeRoomApi";
import { useQuery } from "@tanstack/react-query";
export const useGetListTypeRooms = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["rooms", "type_room"],
        queryFn: () => getListTypeRoomApi(),
    });
    return {
        typeRoom: data?.data,
        isLoading,
    };
};