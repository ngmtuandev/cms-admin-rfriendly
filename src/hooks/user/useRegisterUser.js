import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUserApi } from "../../apis/user/registerUserApi";

export const useRegisterUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => registerUserApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user'],
            });
        },
    });
};