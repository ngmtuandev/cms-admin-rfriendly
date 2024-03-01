import axiosClientApi from "../../libs/axios-client";

export const getListTypeImageApi = async () => {
    const rs = await axiosClientApi(`/public/type-image/type-images`, {
        method: 'get'
    });

    return rs?.data;

}