import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activeUserApi } from "../../apis/user/activeUserApi";

export const useActiveUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user) => activeUserApi(user),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user'],
            });
        },
    });
};