import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperRef } from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { Container, Skeleton } from "@chakra-ui/react";
import { SectionBuilder } from "@/components/Container/SectionBuilder";
import Image from "@/components/Loader";
import { useGetBanner } from "@/services/useBannerService";
import useMobileDeviceDetection from "@/hooks/useMobileDetection";

const BannerSection = () => {
  const { height, width } = useWindowSize();
  const isMobile = useMobileDeviceDetection();
  const [isLoading, setIsLoading] = useState(true);
  const { fetchBanner, banner, bannerLoading, bannerIsError, bannerMessage } = useGetBanner();
  let init = true;

  useEffect(() => {
    if (init) {
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 1000);
      fetchBanner({
        queryParams: {
          limit: 10,
          page: 1,
          order: 'name',
          sort: 1,
          field: 'name',
          value: ''
        }
      });
      init = false;
    }
  }, []);

  return (
    <SectionBuilder
      isError={bannerIsError}
      isLoading={bannerLoading}
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
        {
          banner?.results?.map((dt: any) => {
            return (
              <SwiperSlide style={{
                height: isMobile ? '24rem' : '60rem'
              }}>
                <Image
                  src={`data:image/png;base64,${dt?.image}`}
                  alt="banner 1"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: isMobile ? '24rem' : '60rem',
                    objectFit: "contain"
                  }}
                />
              </SwiperSlide>
            )
          })
        }
      </Swiper>

      {/* <section className="intro-section">
        <div
          className="intro-slider owl-carousel owl-theme owl-nav-arrow row animation-slider cols-1 gutter-no mb-8"
          data-owl-options="{
                                'nav': true,
                                'dots': false,
                                'loop': false,
                                'items': 1,
                                'responsive': {
                                    '0': {
                                        'nav': false,
                                        'autoplay': true
                                    },
                                    '768': {
                                        'nav': true
                                    }
                                }
                            }"
        >
          <div className="banner banner-fixed banner1">
            <figure>
              <Image
                src="assets/images/demos/demo1/intro/slider-1.jpg"
                alt="banner"
                width="1903"
                height="600"
                style={{ backgroundColor: "#f8f6f6" }}
              />
            </figure>
            <div className="banner-content y-50 pb-1">
              <h4
                className="banner-subtitle title-underline2 font-weight-normal text-dim slide-animate appear-animate"
                data-animation-options="{
                                                'name': 'fadeInUpShorter',
                                                'delay': '.2s'
                                            }"
              >
                <span>FROM ONLINE STORE</span>
              </h4>
              <h3
                className="banner-title text-dark lh-1 mb-7 slide-animate appear-animate"
                data-animation-options="{
                                                'name': 'fadeInUpShorter',
                                                'delay': '.4s'
                                            }"
              >
                Panda Birthday
                <br />
                Collection
              </h3>
              <a
                href="shop.html"
                className="btn btn-dark slide-animate appear-animate"
                data-animation-options="{
                                                'name': 'fadeInUpShorter',
                                                'delay': '.6s'
                                            }"
              >
                SHop now<i className="p-icon-arrow-long-right"></i>
              </a>
            </div>
          </div>
          <div className="banner banner-fixed banner2">
            <figure>
              <Image
                src="assets/images/demos/demo1/intro/slider-2.jpg"
                alt="banner"
                width="1903"
                height="600"
                style={{ backgroundColor: "#F3F2EE" }}
              />
            </figure>
            <div className="banner-content y-50 pb-1">
              <Image
                src="assets/images/demos/demo1/intro/brand1.png"
                width="269"
                height="75"
                alt="brand"
                className="mb-5 slide-animate appear-animate"
                data-animation-options="{
                                                    'name': 'fadeIn',
                                                    'delay': '.2s'
                                                }"
              />
              <h3
                className="banner-title text-dark mb-5 mb-sm-9 slide-animate appear-animate"
                data-animation-options="{
                                                'name': 'fadeInLeftShorter',
                                                'delay': '.4s'
                                            }"
              >
                New Best Products
                <br />
                With Cocoa Cake and Oil
              </h3>
              <a
                href="shop.html"
                className="btn btn-dark mr-2 mr-xs-6 slide-animate appear-animate"
                data-animation-options="{
                                                'name': 'fadeInLeftShorter',
                                                'delay': '.6s'
                                            }"
              >
                SHop now<i className="p-icon-arrow-long-right"></i>
              </a>
              <h5
                className="banner-price title-underline2 slide-animate appear-animate"
                data-animation-options="{
                                                'name': 'fadeInLeftShorter',
                                                'delay': '.6s'
                                            }"
              >
                Only{" "}
                <span className="price">
                  29<span className="d-xs-show">.00</span>
                </span>
              </h5>
            </div>
          </div>
        </div>
        <div className="container">
          <div
            className="owl-carousel owl-theme owl-box-border row cols-md-3 cols-sm-2 cols-1 appear-animate"
            data-owl-options="{
                                                'nav': false,
                                                'dots': false,
                                                'loop': false,
                                                'responsive': {
                                                    '0': {
                                                        'items': 1,
                                                        'autoplay': true
                                                    },
                                                    '576': {
                                                        'items': 2,
                                                        'autoplay': true
                                                    },
                                                    '768': {
                                                        'items': 3,
                                                        'dots': false
                                                    }
                                                }
                                            }"
          >
            <div className="icon-box icon-box-side">
              <span className="icon-box-icon">
                <i className="p-icon-shipping-solid"></i>
              </span>
              <div className="icon-box-content">
                <h4 className="icon-box-title">FREE SHIPPING & RETURN</h4>
                <p>Free shipping on orders over $99</p>
              </div>
            </div>
            <div className="icon-box icon-box-side">
              <span className="icon-box-icon">
                <i className="p-icon-quality"></i>
              </span>
              <div className="icon-box-content">
                <h4 className="icon-box-title">QUALITY GUARANTEED</h4>
                <p>We offer high quality of products</p>
              </div>
            </div>
            <div className="icon-box icon-box-side">
              <span className="icon-box-icon">
                <i className="p-icon-fax2"></i>
              </span>
              <div className="icon-box-content">
                <h4 className="icon-box-title">SECURE PAYMENT</h4>
                <p>We ensure secure payment!</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
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
