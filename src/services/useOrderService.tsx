

import { IFetchData, useGetData } from "@/hooks/useGetData";
import usePostData, { IPostData } from "@/hooks/usePostData";

export const useOrderComplete = () => {
    const { postData, data, message, loading, status, error, isError } = usePostData();

    return {
        postOrderComplete: ({ header, option, queryParams }: IFetchData) =>
            postData({
                urlPath: "api/v1/flix/Orders/Complete",
                header: header,
                option: option,
                queryParams: queryParams,
                body: {
                    actionby: process.env.NEXT_PUBLIC_ACTION_BY,
                    ipaddress: "192:1.1.1",
                    apikey: process.env.NEXT_PUBLIC_API_KEY,
                    signature: process.env.NEXT_PUBLIC_SIGNATURE,
                },
            }),
        orderComplete: data,
        orderCompleteMessage: message,
        orderCompleteLoading: loading,
        orderCompleteStatus: status,
        orderCompleteError: error || data?.message,
        orderCompleteIsError: isError || data?.status == '1',
    };
};


export const useOrderCancel = () => {
    const { postData, data, message, loading, status, error, isError } = usePostData();

    return {
        postOrderCancel: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/v1/flix/Orders/Cancel",
                header: header,
                option: option,
                queryParams: queryParams,
                body: {
                    actionby: process.env.NEXT_PUBLIC_ACTION_BY,
                    ipaddress: "192:1.1.1",
                    apikey: process.env.NEXT_PUBLIC_API_KEY,
                    signature: process.env.NEXT_PUBLIC_SIGNATURE,
                    ...body,
                },
            }),
        orderCancel: data,
        orderCancelMessage: message,
        orderCancelLoading: loading,
        orderCancelStatus: status,
        orderCancelError: error || data?.message,
        orderCancelIsError: isError || data?.status == '1',
    };
};


export const useOrderMicrosite = () => {
    const { postData, data, message, loading, status, error, isError } = usePostData();

    return {
        postOrderMicrosite: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/v1/order/create-flix-order/flixcinema",
                header: header,
                option: option,
                queryParams: queryParams,
                body: {
                    actionby: process.env.NEXT_PUBLIC_ACTION_BY,
                    ipaddress: "192:1.1.1",
                    apikey: process.env.NEXT_PUBLIC_API_KEY,
                    signature: process.env.NEXT_PUBLIC_SIGNATURE,
                    ...body
                },
            }),
        orderMicrosite: data,
        orderMicrositeMessage: message,
        orderMicrositeLoading: loading,
        orderMicrositeStatus: status,
        orderMicrositeError: error || data?.message,
        orderMicrositeIsError: isError || data?.status == '1',
    };
};


export const useGetOrderHistory = () => {
    const { fetchData, data, message, loading, status, error, isError } = useGetData();

    return {
        fetchOrderHistory: ({ header, option, queryParams, body }: IPostData) =>
            fetchData({
                urlPath: "api/v1/customer/order-history/" + queryParams?.id,
                header: header,
                option: option,
                queryParams: {
                    // order: '_id',
                    sort: -1,
                    limit: 20,
                    page: 1,
                    field: 'name',
                    value: null,
                    ...queryParams
                },
            }),
        orderHistory: data,
        orderHistoryMessage: message,
        orderHistoryLoading: loading,
        orderHistoryStatus: status,
        orderHistoryError: error || data?.message,
        orderHistoryIsError: isError || data?.status == '1',
    };
};