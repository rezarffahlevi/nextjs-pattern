import { REQ_STATUS } from "@/constants/constants";
import { IFetchData, useGetData } from "@/hooks/useGetData";
import usePostData, { IPostData } from "@/hooks/usePostData";
import { useEffect, useState } from "react";

export const useCategories = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    fetchCategories: ({ header, option, queryParams }: IFetchData) =>
      postData({
        urlPath: "api/v1/flix/Movies/GetGenre",
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
    categories: data?.genrelist,
    categoriesLoading: loading,
    categoriesStatus: status,
    categoriesError: error,
    categoriesIsError: isError,
  };
};

export const useListNowPlaying = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    fetchListNowPlaying: ({ header, option, queryParams }: IFetchData) =>
      postData({
        urlPath: "api/v1/flix/Movies/GetNowPlayingList",
        header: header,
        option: option,
        queryParams: queryParams,
        body: {
          actionby: process.env.NEXT_PUBLIC_ACTION_BY,
          ipaddress: "192:1.1.1",
          apikey: process.env.NEXT_PUBLIC_API_KEY,
          signature: process.env.NEXT_PUBLIC_SIGNATURE,
          cinemaid: "0000000001",
        },
      }),
    listMovie: data,
    listMovieLoading: loading,
    listMovieStatus: status,
    listMovieError: error || data?.message,
    listMovieIsError: isError || data?.status == '1',
  };
};


interface IPostDataMovieDetail extends IPostData {
  scheduledFilmId: string
}
export const useMovieDetail = () => {
  const { postData, data, loading, status, error, isError } = usePostData();
  const [movie, setMovie] = useState<any>(null);


  useEffect(() => {
    if (data) setMovie({
      ...data,
      price: 50000,
      qty: 1,
      maxQty: 20,
    });
  }, [data])

  return {
    fetchMovieDetail: ({ header, option, queryParams, scheduledFilmId }: IPostDataMovieDetail) =>
      postData({
        urlPath: "api/v1/flix/Movies/GetMovieDetail",
        header: header,
        option: option,
        queryParams: queryParams,
        body: {
          actionby: process.env.NEXT_PUBLIC_ACTION_BY,
          ipaddress: "192:1.1.1",
          apikey: process.env.NEXT_PUBLIC_API_KEY,
          signature: process.env.NEXT_PUBLIC_SIGNATURE,
          scheduledFilmId
        },
      }),
    movie,
    setMovie,
    movieLoading: loading,
    movieStatus: status,
    movieError: error || movie?.message,
    movieIsError: isError || movie?.status == '1',
  };
};