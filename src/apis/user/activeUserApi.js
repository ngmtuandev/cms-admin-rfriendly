import axiosClientApi from "../../libs/axios-client";

export const activeUserApi = async (user) => {
    const rs = await axiosClientApi(`/admin/user/delete-user/${user}`, {
        method: 'post',
    });

    return rs?.data;

}