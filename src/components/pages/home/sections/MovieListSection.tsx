import Image from "@/components/molecules/Loader";
import { SectionBuilder } from "@/components/templates/Container/SectionBuilder";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useListMovie } from "@/services/useMovieService";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Select,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { MdFilterList } from "react-icons/md";
import { FilterSection } from "./FilterSection";
import { textToSlug } from "@/utils/utils";

const MovieListSection = () => {
  const size = useWindowSize();
  const { fetchListMovie, listMovie, listMovieLoading, listMovieIsError } =
    useListMovie();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  let init = true;

  useEffect(() => {
    if (init) {
      fetchListMovie({});
      init = false;
    }
  }, []);

  return (
    <SectionBuilder
      isError={listMovieIsError}
      isLoading={listMovieLoading}
      loading={<MovieListLoading />}
    >
      <div className="w-full md:pl-4">
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-row items-center">
            <Button
              variant={"outline"}
              className="hidden max-md:block rounded-none mr-2 px-2"
              onClick={() => setShowBottomSheet(true)}
            >
              <MdFilterList size={24} />
            </Button>
            <BottomSheet
              show={showBottomSheet}
              onClose={() => setShowBottomSheet(false)}
            />
            <h4 className="hidden md:block w-24 mr-4 font-body">SORT BY</h4>
            <Select
              placeholder="Default Sorting"
              size="md"
              className="rounded-none font-body"
            >
              <option value="option1">Option 1</option>
            </Select>
          </div>

          <div className="flex flex-row items-center">
            <h4 className="mr-4 hidden md:block font-body">SHOW</h4>
            <Select
              placeholder="10"
              size="md"
              className="rounded-none font-body"
            >
              <option value="option1">20</option>
            </Select>
          </div>
        </div>

        <div className="mt-8 w-full flex flex-row flex-wrap justify-between">
          {(listMovie ?? []).map((dt: any, i: number) => (
            <Link
              href={"/movies/" + textToSlug(dt?.title)}
              key={"mv-" + i}
              className="basis-6/12 sm:basis-4/12 text-center items-center"
            >
              <div className={"m-4"}>
                <Image
                  src={dt?.image}
                  alt={dt?.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  className={"mb-4"}
                />
                <Text className="font-body">
                  {dt?.title}
                </Text>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <nav aria-label="Page navigation" className="float-right my-12 ">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </SectionBuilder>
  );
};

interface IMovieListLoading {
  children?: ReactNode[] | JSX.Element;
}
const MovieListLoading = ({ children }: IMovieListLoading) => {
  return (
    <Box className="w-full">
      <div className="flex mx-4 justify-between">
        <Skeleton className="basis-4/12 h-8 mr-4" />
        <Skeleton className="basis-3/12 h-8 ml-4" />
      </div>

      <div className="mt-4 w-full flex flex-wrap justify-between">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((dt: any, i: number) => (
          <div
            key={"mls" + i}
            className="h-48 max-sm:basis-6/12 basis-4/12 my-4"
          >
            <Skeleton className="h-48 max-sm:basis-6/12 basis-4/12 m-4" />
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
