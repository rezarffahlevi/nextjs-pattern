"use client";

import { useCinemaDetail, useListCinema } from "@/services/useCinemaService";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useReducer } from "react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

export const theme = extendTheme({ colors });

const initialState = {
  init: true,
  carts: [],
  listCinema: [],
  cinema: null,
  addCartPopup: null,
  checkout: null,
};
const AppContext = createContext<any>(null);
const reducer = (current: any, update: any) => {
  const state = { ...current, ...update };
  localStorage.setItem("state", JSON.stringify(state));
  // console.log('dispatch', current, update);

  return { ...current, ...update };
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  const { fetchListCinema, listCinema, listCinemaLoading, listCinemaError, listCinemaIsError } = useListCinema()
  const { fetchCinemaDetail, cinema } = useCinemaDetail()

  useEffect(() => {
    // console.log(state, localStorage.getItem('state'));

    if (state.init) {
      let localData: any = localStorage.getItem("state");
      if (localData) {
        localData = JSON.parse(localData);
        if (localData?.length < 1) {
          fetchListCinema({});
        }
        dispatch({ ...localData, init: false });
      }
      else {
        fetchListCinema({});
      }
    }
  }, [state]);


  useEffect(() => {
    if (listCinema?.cinemalist) {
      dispatch({ listCinema: listCinema?.cinemalist, cinema: listCinema?.cinemalist[0] });
      // fetchCinemaDetail({
      //   body: {
      //     "cinemaid": listCinema?.cinemalist[0]?.id,
      //     "actionby": "",
      //     "ipaddress": "127.0.0.1",
      //     "apikey": "0fe40dd3-92b4-4dd2-954d-016efb289f99",
      //     "signature": "A1CD3ACB3EABDCAC77579E56D51983675E3951AA"
      //   }
      // })
    }
  }, [listCinema])


  useEffect(() => {
    if (cinema) {
      dispatch({ cinema: cinema });
    }

  }, [cinema])

  return (
    <AppContext.Provider value={value}>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}