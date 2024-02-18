import axiosClientApi from "../../libs/axios-client";

export const getAllUserApi = async () => {
    const rs = await axiosClientApi("/admin/user/all-user", {
        method: 'get',
    });

    return rs?.data;

}