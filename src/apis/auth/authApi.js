import axiosClientApi from "../../libs/axios-client";

export const authApiLogin = async (data) => {
    const rs = await axiosClientApi("/public/user/login", {
        method: 'post',
        data
    });

    return rs?.data;

}