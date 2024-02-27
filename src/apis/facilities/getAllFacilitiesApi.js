import axiosClientApi from "../../libs/axios-client";

export const getAllFacilitiesApi = async () => {
    const rs = await axiosClientApi.get("/public/facilities/list-facilities");

    return rs?.data;

}