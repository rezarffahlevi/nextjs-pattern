"use client";

import { useAppContext } from "@/app/provider";
import Image from "@/components/Loader";
import { addToCart } from "@/components/NavBar/NavBar";
import { ErrorBuilder, SectionBuilder } from "@/components/Container/SectionBuilder";
import { useListNowPlaying, useMovieDetail } from "@/services/useMovieService";
import { textToSlug } from "@/utils/utils";
import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonText,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MovieDetailPage = ({ slug }: { slug: string }) => {
  const { state, dispatch } = useAppContext();
  const { fetchMovieDetail, movie, setMovie, movieLoading, movieIsError, movieError } =
    useMovieDetail();
  const [detail, setDetail] = useState<any>(null);

  let init = true;

  useEffect(() => {
    if (init) {
      fetchMovieDetail({ scheduledFilmId: slug });
      init = false;
    }
  }, []);

  const onChangeQty = (value: string | Number) => {
    let val = Number(value);
    val = isNaN(val) || val > movie?.maxQty || val < 1 ? movie.qty : val;
    setMovie((prev: any) => { return { ...prev, qty: value == '' ? '' : val } })
  }


  const videoId = movie?.trailerurl?.split('?v=')[1];
  return (
    <main className="flex min-h-screen flex-col items-center">
      <SectionBuilder
        loading={<MovieDetailLoading />}
        isLoading={movieLoading && detail == null}
        isError={movieIsError}
        error={<ErrorBuilder message={movieError} />}
      >
        <div className="page-content">
          <div className="container">
            <div className="product product-single product-simple row mb-8">
              <div className="col-md-7">
                <div className="product-gallery">
                  <div
                    className="product-single-carousel row cols-1 gutter-no">
                    {/* <figure className="product-image"> */}
                    {movie?.imageurl && (<Image
                      src={movie?.imageurl}
                      id='thumbnail'
                      // data-zoom-image={movie?.imageurl}
                      alt={movie?.title + ' ' + movie?.titlealt}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                      onError={(e: any) => {
                        // document.getElementById('thumbnail')?.setAttribute('src', '/assets/images/movie-error.png')
                        let object = Object.assign({}, movie);
                        object['imageurl'] = '/assets/images/demos/demo1/banner/banner1.jpg';
                        setMovie(object);
                      }}
                    // placeholder="blur"
                    // blurDataURL="/assets/images/movie-error.png"
                    />)}
                    {/* </figure> */}
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="product-details">
                  <h1 className="product-name">{movie?.title}</h1>
                  {/* <div className="ratings-container">
                    <div className="ratings-full">
                      <span className="ratings" style={{ width: '60%' }}></span>
                      <span className="tooltiptext tooltip-top"></span>
                    </div>
                    <a href="#content-reviews" className="link-to-tab rating-reviews">( 12 Customer
                      Reviews )</a>
                  </div> */}
                  <p className="product-price mb-1">
                    {/* <del className="old-price">$24.00</del> */}
                    <ins className="new-price">Rp. {movie?.price?.toLocaleString()}</ins>
                  </p>
                  <div className="product-form product-qty pt-1">
                    <div className="product-form-group">
                      <div className="input-group">
                        <button className="quantity-minus p-icon-minus-solid bg-transparent" onClick={() => onChangeQty(movie?.qty == 1 ? 1 : (movie?.qty - 1))}></button>
                        <input className="quantity form-control"
                          type="number"
                          min="1"
                          defaultValue={movie?.qty}
                          max={movie?.maxQty}
                          value={movie?.qty ?? 0}
                          onChange={(d) => {
                            let value = d.target.value;
                            onChangeQty(value);
                          }}
                          onBlur={(d) => {
                            let value = d.target.value;
                            onChangeQty(value == '' ? 1 : value);
                          }}
                        />
                        <button className="quantity-plus p-icon-plus-solid bg-transparent" onClick={() => onChangeQty(movie?.qty + 1)}></button>
                      </div>
                      <button
                        className="btn-product btn-cart ls-normal font-weight-semi-bold"
                        onClick={() => {
                          addToCart(movie, state, dispatch);
                        }}
                      >
                        <i
                          className="p-icon-cart-solid"></i>ADD TO CART
                      </button>
                    </div>
                  </div>

                  <div className="pt-1 pb-3">

                  </div>

                  <hr className="product-divider" />

                  <div className="product-meta">
                    <label>KATEGORI PRODUK:</label><a href="#">{movie?.genres}</a><br />
                    <label>SINOPSIS FILM:</label>

                    <p className="mb-4 mb-lg-8">
                      {movie?.shortsynopsis}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-content pb-8">
              <div className="content-description">
                <h2 className="title title-line title-underline mb-lg-8">
                  <span>
                    Description
                  </span>
                </h2>
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6 d-flex align-items-center">
                    <div className="inner-video banner banner-fixed banner-video overlay-dark">
                      {/* <figure>
                        <a href="#">
                          <Image src={movie?.trailerthumbnailurl}
                            alt="product-banner" width="610" height="400"
                            style="background-color: #526e45;" />
                        </a>
                        <video>
                          <source src={movie?.trailerurl} type="video/mp4" />
                        </video>
                      </figure> */}
                      {/* <div className="banner-content text-center y-50 x-50">
                        <a className="video-btn video-play" href="video/memory-of-a-woman.mp4"
                          data-video-source="hosted"><i className="fas fa-play"></i></a>
                      </div> */}
                      <iframe
                        id="ytplayer"
                        width="100%"
                        height="360"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://flixcinema.com&controls=0&rel=1`}
                      ></iframe>
                    </div>
                  </div>
                  <div
                    className="col-12 col-md-6 col-lg-6 with-content-index pt-3 pt-md-0 content-index-1 pl-2 pl-lg-7">
                    {/* <h4 className="content-subtitle">
                      How we start our work
                    </h4> */}
                    <p className="mb-3">
                      {movie?.synopsis}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionBuilder>
    </main>
  );
};

export default MovieDetailPage;

type ModalProps = {
  onClose: any;
  isOpen: boolean;
  data: any;
};
const ModalCart = ({ onClose, isOpen, data }: ModalProps) => {
  const router = useRouter();

  return (
    <Modal onClose={onClose} size={"sm"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent className="rounded-none">
        <ModalHeader className="text-center font-body">
          Berhasil Ditambahkan
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <div className="flex mx-2">
            <div className="basis-4/12">
              {data != null && (
                <Image
                  src={data?.image}
                  alt={data?.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  className={"mb-4"}
                />
              )}
            </div>
            <div className="basis-8/12 justify-center pl-3">
              <Text className="font-body my-1">{data?.title}</Text>
              <div className="flex my-4">
                <Text className="font-body font-light mr-2 text-xl">
                  {data?.qty ?? 0} x
                </Text>
                <Text className="font-body font-semibold text-xl">
                  Rp. {data?.price?.toLocaleString()}
                </Text>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="bg-orange-400 hover:bg-neutral-800 chakra-button rounded-none text-white font-body ml-2 w-full"
            onClick={() => {
              router.push("/carts", { scroll: false });
              onClose();
            }}
          >
            CHECK OUT
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const MovieDetailLoading = () => {
  return (
    <Box className="w-full items-center justify-between">
      <div className="md:px-4 md:py-4 md:flex">
        <Skeleton className="m-2 sm:basis-6/12 md:basis-7/12 h-72" />
        <div className="m-2 basis-12/12 md:basis-5/12">
          <Skeleton className="h-8" />
          <Skeleton className="my-2 h-1" />
          <Skeleton className="w-6/12 h-8" />
          <div className="my-2 flex">
            <Skeleton className="w-4/12 h-8 mr-2" />
            <Skeleton className="w-8/12 h-8" />
          </div>
          <SkeletonText mt="4" noOfLines={7} spacing="4" skeletonHeight="2" />
        </div>
      </div>
    </Box>
  );
};
