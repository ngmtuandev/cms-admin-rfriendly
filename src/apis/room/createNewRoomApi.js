import axiosClientApi from "../../libs/axios-client";

export const createNewRoomApi = async (data) => {
    const rs = await axiosClientApi.post(`/admin/room/create-room`, data);

    return rs?.data;

}