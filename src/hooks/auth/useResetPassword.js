import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApiResetPassword } from "../../apis/auth/resetPasswordApi";

export const useResetPassword = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => authApiResetPassword(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user'],
            });
        },
    });
};