import axiosClientApi from "../../libs/axios-client";

export const getAllRolesApi = async () => {
    const rs = await axiosClientApi("/admin/role/all-role", {
        method: 'get',
    });

    return rs?.data;

}