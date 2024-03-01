import axiosClientApi from "../../libs/axios-client";

export const createImageForRoomApi = async (roomId, typeImageId, imageFile) => {
    try {

        const rs = await axiosClientApi.post(
            `/admin/image-room/create-image/${roomId}/${typeImageId}`,
            imageFile,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return rs.data;
    } catch (error) {
        throw error;
    }
}