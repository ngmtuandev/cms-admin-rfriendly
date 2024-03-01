import { getAllCouponApi } from "../../apis/coupon/getAllCouponApi";
import { useQuery } from "@tanstack/react-query";
export const useGetListCoupons = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["coupons"],
        queryFn: () => getAllCouponApi(),
    });
    return {
        coupons: data?.data,
        isLoading,
    };
};