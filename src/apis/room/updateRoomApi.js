import axiosClientApi from "../../libs/axios-client";

export const updateRoomApi = async (roomId, dataUpdate) => {
    const rs = await axiosClientApi.post(`/admin/room/update-room/${roomId}`, dataUpdate);

    return rs?.data;

}