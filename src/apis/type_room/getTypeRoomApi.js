import axiosClientApi from "../../libs/axios-client";

export const getListTypeRoomApi = async () => {
    const rs = await axiosClientApi("/public/type-room/list-type-room", {
        method: 'get'
    });

    return rs?.data;

}