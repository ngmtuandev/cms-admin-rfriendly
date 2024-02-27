import axiosClientApi from "../../libs/axios-client";

export const updateStatusRoomApi = async (roomId, statusRoom) => {
    const rs = await axiosClientApi.post(`/admin/room/update-status-room/${roomId}/${statusRoom}`);

    return rs?.data;

}