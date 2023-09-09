import { SectionBuilder } from "@/components/templates/Container/SectionBuilder";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useCategories } from "@/services/useMovieService";
import { Box, Checkbox, Skeleton, Stack } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";

const FilterSection = ({ toggleOpenFilter = () => {} }: any) => {
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
    <aside className="col-lg-3 sidebar widget-sidebar sidebar-fixed sidebar-toggle-remain shop-sidebar sticky-sidebar-wrapper">
      <SectionBuilder
        isError={categoriesIsError}
        isLoading={categoriesLoading}
        loading={<FilterLoading />}
      >
        <div className="sidebar-overlay" onClick={toggleOpenFilter}></div>
        <a className="sidebar-close" href="#" onClick={toggleOpenFilter}>
          <i className="p-icon-times"></i>
        </a>
        <div className="sidebar-content">
          <div
            className="sticky-sidebar pt-7"
            data-sticky-options="{'top': 10}"
          >
            <div className="widget widget-collapsible">
              <h3 className="widget-title title-underline">
                <span className="title-text">Filter by Price</span>
              </h3>
              <div className="widget-body">
                <form action="#" method="get">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <input
                        type="text"
                        className="money-format"
                        id="min_price"
                        name="min_price"
                        placeholder="Harga Minimum"
                        required={true}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <input
                        type="text"
                        className="money-format"
                        id="max_price"
                        name="max_price"
                        placeholder="Harga Maximum"
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="filter-actions">
                    <button
                      type="button"
                      className="btn btn-dim btn-filter filter-sidebar active:btn-filter"
                    >
                      Filter
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="widget widget-collapsible">
              {/* <h3 className="widget-title title-underline">
                <span className="title-text">Nutrition</span>
              </h3> */}
              <ul className="widget-body filter-items">
                {(categories ?? []).map((dt: any, i: any) => (
                  <li key={"flter" + i}>
                    <a href="#">{dt?.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionBuilder>
    </aside>
  );
};

interface IFilterLoading {
  children?: ReactNode[] | JSX.Element;
}
const FilterLoading = ({ children }: IFilterLoading) => {
  return (
    <Box className="w-full mt-4">
      <div className="flex flex justify-between">
        <Skeleton className="basis-3/12 h-6" />
        <Skeleton className="basis-1/12 h-6" />
      </div>
      <div className="flex mt-4">
        <Skeleton className="basis-6/12 h-8" />
        <Skeleton className="basis-6/12 h-8" />
      </div>
      <Skeleton className="h-8 mt-4 w-16" />

      <Stack spacing={[1, 5]} direction={["column"]} className="mt-8">
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
