import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewRoomApi } from "../../apis/room/createNewRoomApi";

export const useCreateNewRoom = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => createNewRoomApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['rooms'],
            });
        },
    });
};