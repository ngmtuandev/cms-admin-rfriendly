import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApiLogin } from "../../apis/auth/authApi";

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => authApiLogin(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user'],
            });
        },
    });
};