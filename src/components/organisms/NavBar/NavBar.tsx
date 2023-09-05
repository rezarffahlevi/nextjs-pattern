"use client";
import Link from "next/link";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FilterSection } from "@/components/pages/home/sections/FilterSection";
import { useAppContext } from "@/app/provider";
import Image from "@/components/molecules/Loader";

export const navOptions: { name: string; link?: string }[] = [
  {
    name: "BERANDA",
    link: "/",
  },
  {
    name: "TENTANG KAMI",
    link: "/about",
  },
  {
    name: "HUBUNGI KAMI",
    link: "/contact",
  },
];

const topRow = () => {
  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:#" className="call">
            <i className="p-icon-phone-solid"></i>
            <span>+456 789 000</span>
          </a>
          <span className="divider"></span>
          <a href="contact.html" className="contact">
            <i className="p-icon-map"></i>
            <span>Jl. Pantai Indah Kapuk Boulevard</span>
          </a>
        </div>
        <div className="header-right">
          {/* <div className="dropdown switcher">
            <a href="#currency">USD</a>
            <ul className="dropdown-box">
              <li>
                <a href="#USD">USD</a>
              </li>
              <li>
                <a href="#EUR">EUR</a>
              </li>
            </ul>
          </div> */}
          {/* <div className="dropdown switcher">
            <a href="#language">
              <Image
                src="assets//images/flagus.jpg"
                width="14"
                height="10"
                className="mr-1"
                alt="flagus"
              />
              ENG
            </a>
            <ul className="dropdown-box">
              <li>
                <a href="#USD">
                  <Image
                    src="assets//images/flagus.jpg"
                    width="14"
                    height="10"
                    className="mr-1"
                    alt="flagus"
                  />
                  ENG
                </a>
              </li>
              <li>
                <a href="#EUR">
                  <Image
                    src="assets//images/flagfr.jpg"
                    width="14"
                    height="10"
                    className="mr-1"
                    alt="flagfr"
                  />
                  FRH
                </a>
              </li>
            </ul>
          </div> */}
          <span className="divider"></span>
          {/* <div className="social-links">
            <a
              href="#"
              className="social-link fab fa-facebook-f"
              title="Facebook"
            ></a>
            <a
              href="#"
              className="social-link fab fa-twitter"
              title="Twitter"
            ></a>
            <a
              href="#"
              className="social-link fab fa-pinterest"
              title="Pinterest"
            ></a>
            <a
              href="#"
              className="social-link fab fa-linkedin-in"
              title="Linkedin"
            ></a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const NavBar = () => {
  const pathname = usePathname();
  const { state, dispatch } = useAppContext();
  const [headerClass, setHeaderClass] = useState("");
  const [sidebarClass, setSidebarClass] = useState("cart-dropdown");

  useEffect(() => {
    const handleScroll = () => {
      var isFixed = window.scrollY >= 200;

      if (isFixed) {
        setHeaderClass("fixed sticky-header-active");
      } else {
        setHeaderClass("sticky-header");
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleCart = () => setSidebarClass((prev) => prev == 'cart-dropdown' ? 'cart-dropdown opened' : 'cart-dropdown')
  // $( '.cart-dropdown' ).addClass( 'opened' );
  // Panda.$body.addClass( 'offcanvas-active' );

  return (
    <header className="header">
      {topRow()}
      <div
        className={`header-middle has-center ${headerClass} fix-top sticky-content`}
      >
        <div className="container">
          <div className="header-left">
            <a href="#" className="mobile-menu-toggle" title="Mobile Menu">
              <i className="p-icon-bars-solid"></i>
            </a>
            <a href="#" className="logo">
              <Image
                src="assets/images/logo.png"
                alt="logo"
                width="74"
                height="41"
              />
            </a>
          </div>
          <div className="header-center">
            <nav className="main-nav">
              <ul className="menu">
                {navOptions.map((dt, i) => {
                  return (
                    <li
                      key={"nav-" + i}
                      className={dt.link == pathname ? "active" : ""}
                    >
                      <Link href={dt.link ?? "/"}>{dt.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className="header-right">
            <div className="header-search hs-toggle">
              <a className="search-toggle" href="#">
                <i className="p-icon-search-solid"></i>
              </a>
              <form action="#" className="form-simple">
                <input
                  type="search"
                  autoComplete="off"
                  placeholder="Search in..."
                  required
                />
                <button className="btn btn-search" type="submit">
                  <i className="p-icon-search-solid"></i>
                </button>
              </form>
            </div>
            <div className={`dropdown ${sidebarClass} off-canvas mr-0 mr-lg-2`}>
              <a href="#" className={"cart-toggle link"} onClick={toggleCart}>
                <i className="p-icon-cart-solid">
                  <span className="cart-count">2</span>
                </i>
              </a>
              <div className="canvas-overlay" onClick={toggleCart}></div>
              <div className="dropdown-box">
                <div className="canvas-header">
                  <h4 className="canvas-title">Shopping Cart</h4>
                  <a href="#" className="btn btn-dark btn-link btn-close" onClick={toggleCart}>
                    close<i className="p-icon-arrow-long-right"></i>
                    <span className="sr-only">Cart</span>
                  </a>
                </div>
                <div className="products scrollable">
                  <div className="product product-mini">
                    <figure className="product-media">
                      <a href="product-simple.html">
                        <Image
                          src="assets//images/cart/product.jpg"
                          alt="product"
                          width="84"
                          height="105"
                        />
                      </a>
                      <a href="#" title="Remove Product" className="btn-remove">
                        <i className="p-icon-times"></i>
                        <span className="sr-only">Close</span>
                      </a>
                    </figure>
                    <div className="product-detail">
                      <a href="product.html" className="product-name">
                        Peanuts
                      </a>
                      <div className="price-box">
                        <span className="product-quantity">7</span>
                        <span className="product-price">$12.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="product product-mini">
                    <figure className="product-media">
                      <a href="product-simple.html">
                        <Image
                          src="assets/images/cart/product.jpg"
                          alt="product"
                          width="84"
                          height="105"
                        />
                      </a>
                      <a href="#" title="Remove Product" className="btn-remove">
                        <i className="p-icon-times"></i>
                        <span className="sr-only">Close</span>
                      </a>
                    </figure>
                    <div className="product-detail">
                      <a href="product.html" className="product-name">
                        Prime Beef
                      </a>
                      <div className="price-box">
                        <span className="product-quantity">4</span>
                        <span className="product-price">$16.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cart-total">
                  <label>Subtotal:</label>
                  <span className="price">$148.00</span>
                </div>
                <div className="cart-action">
                  <a href="cart.html" className="btn btn-outline btn-dim mb-2">
                    View Cart
                  </a>
                  <a href="checkout.html" className="btn btn-dim">
                    <span>Go To Checkout</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

interface IMyDrawer {
  show: boolean;
  onClose?: any;
  onOpen?: any;
}

const MyDrawer = ({
  show = false,
  onClose: onCloseDrawer,
  onOpen: onOpenDrawer,
}: IMyDrawer) => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (show) {
      onOpen();
      if (onOpenDrawer) onOpenDrawer();
    }
  }, [show]);

  return (
    <>
      <Drawer
        placement={"left"}
        onClose={() => {
          onClose();
          if (onCloseDrawer) onCloseDrawer();
        }}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <Stack className="hidden max-sm:block" direction={["column"]}>
              {navOptions.map((dt, i) => (
                <div className="my-4" key={"nav-xs-" + i}>
                  <Link
                    href={dt.link ?? "/"}
                    onClick={() => onClose() + onCloseDrawer()}
                    className="px-1 py-1 text-sm"
                    style={
                      dt.link == pathname
                        ? {
                            borderBottom: "3px solid #facc15",
                          }
                        : {}
                    }
                  >
                    <Text as="b">{dt.name}</Text>
                  </Link>
                </div>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBar;
