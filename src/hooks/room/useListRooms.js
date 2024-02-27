import { getListRoomApi } from "../../apis/room/getListRoomApi";
import { useQuery } from "@tanstack/react-query";
export const useGetListRooms = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["rooms"],
        queryFn: () => getListRoomApi(),
    });
    return {
        rooms: data,
        isLoading,
    };
};