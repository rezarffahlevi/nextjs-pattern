import { SectionBuilder } from "@/components/templates/Container/SectionBuilder";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useCategories } from "@/services/useMovieService";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Input,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";

const FilterSection = () => {
  const size = useWindowSize();
  const { fetchCategories, categories, categoriesLoading, categoriesIsError } =
    useCategories();
  let init = true;

  useEffect(() => {
    if (init) {
      fetchCategories({});
      init = false;
    }
  }, []);

  return (
    <SectionBuilder
      isError={categoriesIsError}
      isLoading={categoriesLoading}
      loading={<FilterLoading />}
    >
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem borderWidth={0} id="accordion-1">
          <h2>
            <AccordionButton className="relative">
              <Box as="span" flex="1" textAlign="left" className="font-body">
                Filter Harga
              </Box>
              <AccordionIcon />
              <div className="absolute bottom-[-10px] h-1 left-4 right-4 bg-gray-300">
                <div className="h-1 w-3/12 bg-yellow-400" />
              </div>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className="pt-8">
            <div className="flex flex-row">
              <Input
                placeholder="Harga Minimum"
                size="md"
                className="rounded-none mr-2 font-body"
              />
              <Input
                placeholder="Harga Maximum"
                size="md"
                className="rounded-none ml-2 font-body"
              />
            </div>
            <button className="bg-black chakra-button text-white mt-4 h-8 w-24 rounded-none font-body">
              Filter
            </button>
            <Stack spacing={[1, 5]} direction={["column"]} className="mt-8">
              {categories?.map((dt: any, i: number) => (
                <Checkbox key={"cbx" + i} size="md" colorScheme="yellow" className="font-body">
                  {dt?.title}
                </Checkbox>
              ))}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </SectionBuilder>
  );
};

interface IFilterLoading {
  children?: ReactNode[] | JSX.Element;
}
const FilterLoading = ({ children }: IFilterLoading) => {
  return (
    <Box className="w-full">
      <div className="flex mr-4 flex justify-between">
        <Skeleton className="basis-3/12 h-6" />
        <Skeleton className="basis-1/12 h-6" />
      </div>
      <div className="flex mt-4 mr-4">
        <Skeleton className="basis-6/12 h-8 mr-4" />
        <Skeleton className="basis-6/12 h-8 ml-4" />
      </div>
      <Skeleton className="h-8 mt-4 w-16" />

      <Stack spacing={[1, 5]} direction={["column"]} className="mt-8 mr-4">
        {[1, 2, 3, 4]?.map((dt: any, i: number) => (
          <Skeleton key={"cbxl" + i}>
            <Checkbox size="md" colorScheme="yellow">
              {dt}
            </Checkbox>
          </Skeleton>
        ))}
      </Stack>
    </Box>
  );
};

export { FilterSection, FilterLoading };
