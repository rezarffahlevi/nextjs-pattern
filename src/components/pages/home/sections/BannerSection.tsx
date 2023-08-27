import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperRef } from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { Container, Skeleton } from "@chakra-ui/react";
import { SectionBuilder } from "@/components/templates/Container/SectionBuilder";
import Image from "@/components/molecules/Loader";

const BannerSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  let init = true;

  useEffect(() => {
    if (init) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      init = false;
    }
  }, []);

  return (
    <SectionBuilder
      isError={false}
      isLoading={isLoading}
      loading={<BannerLoading />}
    >
      <Swiper
        breakpoints={{
          300: {
            spaceBetween: 10,
          },
          640: {
            spaceBetween: 20,
          },
          768: {
            spaceBetween: 40,
          },
          1024: {
            spaceBetween: 50,
          },
        }}
        loop={true}
        pagination={{
          clickable: true,
          type: "bullets",
          clickableClass: "swiper-pagination",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        direction="horizontal"
        modules={[Pagination]}
        slideClass="swiper-slide"
        slideActiveClass="swiper-slide-active"
      >
        <SwiperSlide>
          <Image
            src={
              'https://asset.tix.id/microsite_v2/1f385f1d-ce8e-4870-810f-9560e2b95894.jpeg'
              // "https://fcprod.azurewebsites.net/uploads/Banner/2305/19091738.jpg"
            }
            alt="banner 1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={
              "https://asset.tix.id/microsite_v2/a7a26122-475a-4e9d-b575-ff4459992e71.jpeg"
            }
            alt="banner 2"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </SwiperSlide>
      </Swiper>
    </SectionBuilder>
  );
};

const BannerLoading = () => {
  const size = useWindowSize();
  return (
    <Skeleton>
      <Container width={size.width} height={size.height * 0.4} />
    </Skeleton>
  );
};

export { BannerSection, BannerLoading };
