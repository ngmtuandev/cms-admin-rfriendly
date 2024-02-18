import axiosClientApi from "../../libs/axios-client";

export const registerUserApi = async (data) => {
    const rs = await axiosClientApi("/public/user/register", {
        method: 'post',
        data
    });

    return rs?.data;

}