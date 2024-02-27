import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatusRoomApi } from "../../apis/room/updateStatusRoomApi";

export const useUpdateStatusRoom = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => updateStatusRoomApi(data.id, data.value),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['rooms'],
            });
        },
    });
};