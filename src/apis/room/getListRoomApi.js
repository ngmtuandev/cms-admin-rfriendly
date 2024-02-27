import axiosClientApi from "../../libs/axios-client";

export const getListRoomApi = async () => {
    const rs = await axiosClientApi("/public/room/get-list-room", {
        method: 'get',
    });

    return rs?.data;

}