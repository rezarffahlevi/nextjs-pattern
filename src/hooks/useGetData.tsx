import { REQ_STATUS } from "@/constants/constants";
import { RESTAPI } from "@/utils/restApi";
import { useState } from "react";

export interface IFetchData {
  urlPath?: string;
  header?: any;
  queryParams?: any;
  option?: any;
}

export interface IGetData {
  loading?: boolean;
  data?: any;
  error?: any;
  message?: string | null;
  status?: string;
  isError?: boolean;
  refresh?: boolean;
}

export const useGetData = () => {
  const [result, setResult] = useState<IGetData>({
    loading: true,
    data: null,
    error: null,
    message: null,
    status: REQ_STATUS.INITIAL,
    isError: false,
    refresh: false,
  });

  const fetchData = async ({
    urlPath = "",
    queryParams,
    header,
    option,
  }: IFetchData) => {
    setResult((prevData) => {
      return {
        ...prevData,
        loading: true,
        data: null,
        message: null,
        isError: false,
        status: REQ_STATUS.LOADING,
      };
    });
    return fetchDataHooks({
      urlPath: urlPath,
      header: header,
      queryParams: queryParams,
      option: option,
    })
      .then((response) => {
        const value = response?.data?.data;
        setResult((prevData) => {
          return {
            ...prevData,
            data: value,
            message: response?.data?.data?.message ?? 'Success get data',
            loading: false,
            status: REQ_STATUS.SUCCESS,
          };
        });
      })
      .catch((err) => {
        setResult((prevData) => {
          return {
            ...prevData,
            loading: false,
            message: err?.message,
            error: err,
            isError: true,
            status: REQ_STATUS.FAILED,
          };
        });
      });
  };

  return {
    data: result.data,
    message: result?.message,
    error: result?.error,
    status: result?.status,
    isError: result?.isError,
    loading: result?.loading,
    fetchData,
  };
};

const fetchDataHooks = async ({
  urlPath,
  header,
  queryParams,
  option,
}: IFetchData) => {
  const instance = RESTAPI;

  try {
    let token = localStorage.getItem("token");

    const headers = {
      Authorization: `${token}`,
      ...header,
    };

    const params = {
      headers,
      method: "get",
      url: urlPath,
      params: queryParams,
      ...option,
    };
    const response = await instance(params);

    // console.log(urlPath, response);

    if (response.status === 401) {
      // logout
      throw {
        data: null,
        error: 401,
        message: response.data.message,
        status: REQ_STATUS.FAILED,
      };
    }

    if (response.status === 400 || response.status > 401) {
      throw {
        data: null,
        error: response.data,
        message: response.data.message,
        status: REQ_STATUS.FAILED,
      };
    }

    return {
      data: response,
      error: null,
      message: response.data.message,
      status: REQ_STATUS.SUCCESS,
    };
  } catch (error) {
    throw {
      data: null,
      error: error,
      message: error?.toString(),
      status: REQ_STATUS.FAILED,
    };
  }
};
