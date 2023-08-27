"use client";

import Image from "@/components/molecules/Loader";
import { SectionBuilder } from "@/components/templates/Container/SectionBuilder";
import { useListMovie } from "@/services/useMovieService";
import { textToSlug } from "@/utils/utils";
import { Divider, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const MovieDetailPage = ({ slug }: { slug: string }) => {
  const { fetchListMovie, listMovie, listMovieLoading, listMovieIsError } =
    useListMovie();
  const [detail, setDetail] = useState<any>(null);

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
        loading={<>loading</>}
        isLoading={listMovieLoading && detail == null}
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

              <Divider />

              <span className="font-body font-semibold my-2 flex">
                KATEGORI PRODUK: &nbsp;
                <span className="font-normal">{detail?.sub_title}</span>
              </span>

              <span className="font-body font-semibold my-3 flex">
                SINOPSIS FILM:
              </span>
              <p className="font-normal text-sm text-justify">{detail?.description}</p>
            </div>
          </div>
        </div>
      </SectionBuilder>
    </main>
  );
};

export default MovieDetailPage;
