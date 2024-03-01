import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createImageForRoomApi } from "../../apis/image_room/createImageForRoom";

export const useCreateImageForRoom = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => createImageForRoomApi(data?.idRoom, data?.idTypeImage, data?.images),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['rooms', "image_room"],
            });
        },
    });
};