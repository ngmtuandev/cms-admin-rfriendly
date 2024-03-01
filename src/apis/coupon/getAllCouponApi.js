import axiosClientApi from "../../libs/axios-client";

export const getAllCouponApi = async () => {
    const rs = await axiosClientApi.get("/public/coupon/list-coupon");

    return rs?.data;

}