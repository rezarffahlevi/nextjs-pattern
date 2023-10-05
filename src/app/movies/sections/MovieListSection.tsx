import Image from "@/components/Loader";
import { ErrorBuilder, SectionBuilder } from "@/components/Container/SectionBuilder";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useListNowPlaying } from "@/services/useMovieService";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { MdFilterList } from "react-icons/md";
import { FilterSection } from "./FilterSection";
import { textToSlug } from "@/utils/utils";
import { useAppContext } from "@/app/provider";

const MovieListSection = () => {
  const { state, dispatch } = useAppContext();
  const { fetchListNowPlaying, listMovie, listMovieLoading, listMovieIsError, listMessage } =
    useListNowPlaying();
  const [openFilter, setOpenFilter] = useState("");
  const [filter, setFilter] = useState<any>([]);
  const [sort, setSort] = useState<any>([]);

  let init = true;

  useEffect(() => {
    if (init && state.cinema?.store_code) {
      fetchListNowPlaying({
        body: {
          cinemaid: state.cinema?.store_code,
        }
      });
      init = false;
    }
  }, [state.cinema]);


  const toggleOpenFilter = () =>
    setOpenFilter((prev) => (prev == "" ? " sidebar-active" : ""));

  const movieList = () => {
    let list = (filter?.length > 0 ? listMovie?.filter((ft: any) => filter.some((sm: any) => sm == ft?.genres)) : (listMovie ?? []));
    if (state.search != '')
      list = list.filter((ft: any) => ft?.title?.toLowerCase()?.includes(state.search));
    return list;
  }

  return (
    <div className={"row main-content-wrap" + openFilter}>
      <FilterSection toggleOpenFilter={toggleOpenFilter} filter={filter} setFilter={setFilter} />
      <div className={"col-lg-9 main-content pl-lg-6"}>
        <SectionBuilder
          isError={listMovieIsError}
          isLoading={listMovieLoading}
          loading={<MovieListLoading />}
          error={<ErrorBuilder message={listMessage ?? 'Error'} />}
        >
          <nav className="toolbox sticky-toolbox sticky-content fix-top">
            <div className="toolbox-left">
              <a
                className="toolbox-item left-sidebar-toggle btn btn-outline btn-primary btn-icon-right d-lg-none"
                onClick={toggleOpenFilter}
              >
                <span>Filter</span>
                <i className="p-icon-category-1 ml-md-1"></i>
              </a>
              <div className="toolbox-item toolbox-sort select-menu">
                <label>Sort By :</label>
                <select name="orderby" onChange={
                  (e) => {
                    let val = e.target.value;
                    setSort(val);
                  }}>
                  <option defaultValue="default">Default Sorting</option>
                  {/* <option defaultValue="popularity">Sort By Popularity</option>
                  <option defaultValue="rating">Sort By The Latest</option>
                  <option defaultValue="date">Sort By Average Rating</option>
                  <option defaultValue="price-low">
                    Sort By Price: Low To High
                  </option>
                  <option defaultValue="price-high">
                    Sort By Price: High To Low
                  </option> */}
                </select>
              </div>
            </div>
            <div className="toolbox-right">
              <div className="toolbox-item toolbox-show select-box">
                <label>Show :</label>
                <select name="count">
                  <option defaultValue="50">50</option>
                  <option defaultValue="100">100</option>
                  <option defaultValue="200">200</option>
                </select>
              </div>
              {/* <div className="toolbox-item toolbox-layout">
              <a href="#" className="p-icon-list btn-layout"></a>
              <a href="#" className="p-icon-grid btn-layout active"></a>
            </div> */}
            </div>
          </nav>

          <div className="row product-wrapper cols-md-3 cols-2">
            {movieList().map((dt: any, i: any) => (
              <Link href={`movies/${dt?.scheduledfilmid}`} className="product-wrap" key={`movie-${dt?.scheduledfilmid}-${i}`}>
                <div className="product shadow-media text-center">
                  <figure className="product-media">
                    <div>
                      <Image
                        src={dt?.thumbnailurl}
                        alt={"film " + dt?.title}
                        width={295}
                        height={369}
                      />
                      <Image
                        src={dt?.thumbnailurl}
                        alt={"film " + dt?.title}
                        width={295}
                        height={369}
                      />
                    </div>
                    {/* <div className="product-action-vertical">
                    <a
                      href="#"
                      className="btn-product-icon btn-cart"
                      data-toggle="modal"
                      data-target="#addCartModal"
                      title="Add to Cart"
                    >
                      <i className="p-icon-cart-solid"></i>
                    </a>
                    <a
                      href="#"
                      className="btn-product-icon btn-wishlist"
                      title="Add to Wishlist"
                    >
                      <i className="p-icon-heart-solid"></i>
                    </a>
                    <a
                      href="#"
                      className="btn-product-icon btn-compare"
                      title="Compare"
                    >
                      <i className="p-icon-compare-solid"></i>
                    </a>
                    <a
                      href="#"
                      className="btn-product-icon btn-quickview"
                      title="Quick View"
                    >
                      <i className="p-icon-search-solid"></i>
                    </a>
                  </div> */}
                  </figure>
                  <div className="product-details">
                    {/* <div className="ratings-container">
                    <div className="ratings-full">
                      <span className="ratings" style={{ width: "60%" }}></span>
                      <span className="tooltiptext tooltip-top"></span>
                    </div>
                    <a
                      href="product-simple.html#content-reviews"
                      className="rating-reviews"
                    >
                      (12)
                    </a>
                  </div> */}
                    <h5 className="product-name">
                      <div>{dt?.title}</div>
                    </h5>
                    {/* <span className="product-price">
                    <del className="old-price">$28.00</del>
                    <ins className="new-price">$12.00</ins>
                  </span> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <nav className="toolbox toolbox-pagination pt-2 pb-6">
            <p className="toolbox-item show-info">
              Menampilkan <span>{movieList?.length}</span> Film
            </p>
            {/* <ul className="pagination">
            <li className="page-item disabled">
              <a
                className="page-link page-link-prev"
                href="#"
                aria-label="Previous"
                tabIndex={-1}
                aria-disabled="true"
              >
                <i className="p-icon-angle-left"></i>
              </a>
            </li>
            <li className="page-item active" aria-current="page">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item page-item-dots"></li>
            <li className="page-item">
              <a className="page-link" href="#">
                5
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link page-link-next"
                href="#"
                aria-label="Next"
              >
                <i className="p-icon-angle-right"></i>
              </a>
            </li>
          </ul> */}
          </nav>
        </SectionBuilder>
      </div>
    </div>
  );
};

interface IMovieListLoading {
  children?: ReactNode[] | JSX.Element;
}
const MovieListLoading = ({ children }: IMovieListLoading) => {
  return (
    <Box className="w-full mt-4">
      <div className="flex justify-between mx-4">
        <Skeleton className="basis-4/12 h-8" />
        <Skeleton className="basis-3/12 h-8" />
      </div>

      <div className="mt-4 w-full flex flex-wrap justify-between">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((dt: any, i: number) => (
          <div
            key={"mls" + i}
            className="h-48 max-sm:basis-6/12 basis-4/12 my-4"
          >
            <Skeleton className="h-48 max-sm:basis-6/12 basis-4/12 mx-4" />
          </div>
        ))}
      </div>

      <Skeleton className="h-8 mx-4 mt-8 float-right" w={180} />
    </Box>
  );
};

interface IBottomSheet {
  show: boolean;
  onClose?: any;
  onOpen?: any;
}

const BottomSheet = ({
  show = false,
  onClose: onCloseBottomSheet,
  onOpen: onOpenBottomSheet,
}: IBottomSheet) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (show) {
      onOpen();
      if (onOpenBottomSheet) onOpenBottomSheet();
    }
  }, [show]);

  return (
    <>
      <Drawer
        placement={"bottom"}
        onClose={() => {
          onClose();
          if (onCloseBottomSheet) onCloseBottomSheet();
        }}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Filter</DrawerHeader>
          <DrawerBody>
            <FilterSection />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { MovieListSection, MovieListLoading };
