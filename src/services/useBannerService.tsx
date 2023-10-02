

import { IFetchData, useGetData } from "@/hooks/useGetData";
import usePostData, { IPostData } from "@/hooks/usePostData";

export const useGetBanner = () => {
    const { fetchData, data, message, loading, status, error, isError } = useGetData();

    return {
        fetchBanner: ({ header, option, queryParams }: IFetchData) =>
            fetchData({
                urlPath: "api/v1/banner/get-banner-by-username/flixcinema",
                header: header,
                option: option,
                queryParams: queryParams,
            }),
        banner: data,
        bannerMessage: message,
        bannerLoading: loading,
        bannerStatus: status,
        bannerError: error || data?.message,
        bannerIsError: isError,
    };
};