import axiosClientApi from "../../libs/axios-client";

export const authApiResetPassword = async (data) => {
    const rs = await axiosClientApi("/public/user/resetPassword", {
        method: 'post',
        data
    });

    return rs?.data;

}