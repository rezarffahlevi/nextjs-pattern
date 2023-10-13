import { RESTAPI } from "@/utils/restApi";
import { IFetchData, IGetData } from "./useGetData";
import { REQ_STATUS } from "@/constants/constants";
import { useState } from "react";

export interface IPostData extends IGetData, IFetchData {
  body?: any;
}

const usePostData = () => {
  const [result, setResult] = useState<IPostData>({
    loading: false,
    data: null,
    message: null,
    error: null,
    status: REQ_STATUS.INITIAL,
    isError: false,
    refresh: false,
  });

  const postData = async ({
    body,
    urlPath = "",
    queryParams,
    header,
  }: IPostData) => {
    setResult((prevData) => {
      return {
        ...prevData,
        data: null,
        loading: true,
        message: null,
        errorData: null,
        isError: false,
        status: REQ_STATUS.LOADING,
      };
    });
    return postDataHooks({
      body: body,
      urlPath: urlPath,
      header: header,
      queryParams: queryParams,
    })
      .then((result) => {
        const value = result?.data?.data;
        setResult((prevData) => {
          return {
            ...prevData,
            data: value,
            message: result?.data?.data?.message ?? 'Success post data',
            loading: false,
            status: REQ_STATUS.SUCCESS,
          };
        });
      })
      .catch((err) => {
        setResult((prevData) => {
          let errMsg = err?.response?.data?.data?.message
          return {
            ...prevData,
            loading: false,
            error: err,
            message: errMsg ?? err?.message,
            isError: true,
            status: REQ_STATUS.FAILED,
          };
        });
      });
  };

  return {
    data: result?.data,
    message: result?.message,
    error: result?.error,
    isError: result?.isError,
    loading: result?.loading,
    status: result?.status,
    postData,
  };
};

export default usePostData;

const postDataHooks = async ({
  body,
  urlPath,
  queryParams,
  header,
  option,
}: IPostData) => {
  const instance = RESTAPI;

  try {
    let token = localStorage.getItem("token");

    const headers = {
      Authorization: `${token}`,
      ...header,
    };

    const params = {
      headers,
      method: "post",
      url: urlPath,
      params: queryParams,
      data: body,
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
  } catch (error: any) {
    console.log('error', error);
    throw {
      data: null,
      error: error,
      message: error?.message,
      status: REQ_STATUS.FAILED,
    };
  }
};
