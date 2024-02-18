import axiosClientApi from "../../libs/axios-client";

export const getProfileApi = async () => {
    const tokenUser = localStorage.getItem('token-user');
    const rs = await axiosClientApi("/public/user/get-profile", {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${tokenUser}`
        }
    });

    return rs?.data;

}