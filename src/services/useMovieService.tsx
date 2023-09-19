import { REQ_STATUS } from "@/constants/constants";
import { IFetchData, useGetData } from "@/hooks/useGetData";
import usePostData, { IPostData } from "@/hooks/usePostData";
import { useEffect, useState } from "react";

export const useCategories = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    fetchCategories: ({ header, option, queryParams }: IPostData) =>
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
  const { postData, data, loading, status, error, isError, message } = usePostData();

  return {
    fetchListNowPlaying: ({ header, option, queryParams }: IPostData) =>
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
    listMessage: message,
    listMovieLoading: loading,
    listMovieStatus: status,
    listMovieError: error || data?.message,
    listMovieIsError: isError || data?.status == '1',
  };
};

export const useMovieDetail = () => {
  const { postData, data, loading, status, error, isError } = usePostData();
  const [movie, setMovie] = useState<any>(null);


  useEffect(() => {
    if (data) setMovie({
      ...data,
      price: null,
      qty: 1,
      maxQty: 20,
    });
  }, [data])

  return {
    fetchMovieDetail: ({ header, option, queryParams, body }: IPostData) =>
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
          ...body
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

export const useShowTime = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    fetchShowTime: ({ header, option, queryParams, body }: IPostData) =>
      postData({
        urlPath: "api/v1/flix/Movies/GetShowTime",
        header: header,
        option: option,
        queryParams: queryParams,
        body: {
          actionby: process.env.NEXT_PUBLIC_ACTION_BY,
          ipaddress: "192:1.1.1",
          apikey: process.env.NEXT_PUBLIC_API_KEY,
          signature: process.env.NEXT_PUBLIC_SIGNATURE,
          "returnformat": "single",
          ...body,
        },
      }),
    showTime: data,
    showTimeLoading: loading,
    showTimeStatus: status,
    showTimeError: error || data?.message,
    showTimeIsError: isError || data?.status == '1',
  };
};


export const useTicketType = () => {
  const { postData, data, loading, status, error, isError } = usePostData();

  return {
    fetchTicketType: ({ header, option, queryParams, body }: IPostData) =>
      postData({
        urlPath: "api/v1/flix/Movies/GetTicketType",
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
    ticketType: data,
    ticketTypeLoading: loading,
    ticketTypeStatus: status,
    ticketTypeError: error || data?.message,
    ticketTypeIsError: isError || data?.status == '1',
  };
};


export const useSeatLayout = () => {
  const { postData, data, message, loading, status, error, isError } = usePostData();

  return {
    fetchSeatLayout: ({ header, option, queryParams, body }: IPostData) =>
      postData({
        urlPath: "api/v1/flix/Movies/GetSeatLayout",
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
    seatLayout: data,
    seatLayoutMessage: message,
    seatLayoutLoading: loading,
    seatLayoutStatus: status,
    seatLayoutError: error || data?.message,
    seatLayoutIsError: isError || data?.status == '1',
  };
};


export const useSetSelectedSeat = () => {
  const { postData, data, message, loading, status, error, isError } = usePostData();

  return {
    fetchSetSelectedSeat: ({ header, option, queryParams, body }: IPostData) =>
      postData({
        urlPath: "api/v1/flix/Movies/SetSelectedSeats",
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
    setSeat: data,
    setSeatMessage: message,
    setSeatLoading: loading,
    setSeatStatus: status,
    setSeatError: error || data?.message,
    setSeatIsError: isError || data?.status == '1',
  };
};


export const useAddConcessionItems = () => {
  const { postData, data, message, loading, status, error, isError } = usePostData();

  return {
    postAddConcessionItems: ({ header, option, queryParams, body }: IPostData) =>
      postData({
        urlPath: "api/v1/flix/Movies/AddConcessionItems",
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
    addConcession: data,
    addConcessionMessage: message,
    addConcessionLoading: loading,
    addConcessionStatus: status,
    addConcessionError: error || data?.message,
    addConcessionIsError: isError || data?.status == '1',
  };
};