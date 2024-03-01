import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoomApi } from "../../apis/room/updateRoomApi";

export const useUpdateRoom = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => updateRoomApi(data.id, data.value),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['rooms'],
            });
        },
    });
};