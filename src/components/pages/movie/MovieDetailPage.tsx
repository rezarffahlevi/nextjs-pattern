"use client";

import { useAppContext } from "@/app/provider";
import Image from "@/components/molecules/Loader";
import { SectionBuilder } from "@/components/templates/Container/SectionBuilder";
import { useListMovie } from "@/services/useMovieService";
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
  const { fetchListMovie, listMovie, listMovieLoading, listMovieIsError } =
    useListMovie();
  const [detail, setDetail] = useState<any>(null);
  const [showModalCart, setShowModalCart] = useState<boolean>(false);
  const { state, dispatch } = useAppContext();

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 996,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  let init = true;

  useEffect(() => {
    if (init) {
      fetchListMovie({});
      init = false;
    }
  }, []);

  useEffect(() => {
    if (listMovie) {
      let movie = listMovie.find((fd: any) => textToSlug(fd.title) == slug);
      setDetail(movie);
    }
  }, [listMovie]);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <SectionBuilder
        loading={<MovieDetailLoading />}
        isLoading={(listMovieLoading && detail == null)}
        isError={listMovieIsError}
      >
        <div className="w-full items-center justify-between">
          <div className="md:px-4 md:py-4 md:flex">
            <div className="sm:basis-6/12 md:basis-7/12">
              <div className="md:mr-2">
                {detail != null && (
                  <Image
                    src={detail?.image}
                    alt={detail?.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    className={"mb-4"}
                  />
                )}
              </div>
            </div>
            <div className="m-2 basis-12/12 md:basis-5/12">
              <Text className="font-body my-1">{detail?.title}</Text>
              <Divider />
              <Text className="font-body my-4 font-semibold text-xl">
                Rp. 100.000
              </Text>

              <div className="flex">
                <HStack maxW="140px" borderWidth={1} className="mb-2">
                  <Button {...dec}>-</Button>
                  <Input
                    {...input}
                    className="border-none px-1 text-center"
                    focusBorderColor="transparent"
                  />
                  <Button {...inc}>+</Button>
                </HStack>
                <Button
                  className="bg-neutral-600 hover:bg-neutral-800 chakra-button rounded-none text-white font-body ml-2 w-full"
                  onClick={() => {
                    let carts = [...state.carts];
                    let index = carts.findIndex((e) => e.id == detail?.id);
                    if (index >= 0) {
                      carts[index] = { ...detail, qty: input?.value };
                    } else {
                      carts.push({ ...detail, qty: input?.value });
                    }
                    dispatch({ carts: carts });
                    setShowModalCart(true);
                  }}
                >
                  ADD TO CART
                </Button>
                <ModalCart
                  onClose={() => setShowModalCart(false)}
                  isOpen={showModalCart}
                  data={{ ...detail, qty: input?.value }}
                />
              </div>
              <Divider />

              <span className="font-body font-semibold my-2 flex">
                KATEGORI PRODUK: &nbsp;
                <span className="font-normal">{detail?.sub_title}</span>
              </span>

              <span className="font-body font-semibold my-3 flex">
                SINOPSIS FILM:
              </span>
              <p className="font-normal text-sm text-justify">
                {detail?.description}
              </p>
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
                  Rp. 100.000
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
