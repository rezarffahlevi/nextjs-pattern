import { REQ_STATUS } from "@/constants/constants";
import { IFetchData, useGetData } from "@/hooks/useGetData";
import { useState } from "react";

export const useCategories = () => {
  const { fetchData, data, loading, status, error, isError } = useGetData();

  return {
    fetchCategories: ({ header, option, queryParams }: IFetchData) =>
      fetchData({
        urlPath: "v3/e05f5d45-37b9-45ab-8611-8a9f2ffa6ee2",
        header: header,
        option: option,
        queryParams: queryParams,
      }),
    categories: data,
    categoriesLoading: loading,
    categoriesStatus: status,
    categoriesError: error,
    categoriesIsError: isError,
  };
};

export const useListMovie = () => {
  const { fetchData, data, loading, status, error, isError } = useGetData();

  return {
    fetchListMovie: ({ header, option, queryParams }: IFetchData) =>
      fetchData({
        urlPath: "v3/cf80c915-840a-432a-b9f3-ba54cdd3c9a4",
        header: header,
        option: option,
        queryParams: queryParams,
      }),
    listMovie: data,
    listMovieLoading: loading,
    listMovieStatus: status,
    listMovieError: error,
    listMovieIsError: isError,
  };
};
