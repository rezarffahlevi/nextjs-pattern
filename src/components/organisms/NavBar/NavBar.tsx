"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
          <span className="divider"></span>
        </div>
      </div>
    </div>
  );
};

const NavBar = () => {
  const pathname = usePathname();
  const { state, dispatch } = useAppContext();
  const [navbarFixed, setNavbarFixed] = useState("");
  const [openCart, setOpenCart] = useState("cart-dropdown");
  const [openMenu, setOpenMenu] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      var isFixed = window.scrollY >= 200;

      if (isFixed) {
        setNavbarFixed("fixed sticky-header-active");
      } else {
        setNavbarFixed("sticky-header");
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => setOpenMenu(""));
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", () => setOpenMenu(""));
    };
  }, []);

  const toggleCart = () =>
    setOpenCart((prev) =>
      prev == "cart-dropdown" ? "cart-dropdown opened" : "cart-dropdown"
    );

  const toggleOpenMenu = () =>
    setOpenMenu((prev) => (prev == "" ? " mmenu-active" : ""));

  return (
    <header className={"header" + openMenu}>
      {topRow()}
      <div
        className={`header-middle has-center ${navbarFixed} fix-top sticky-content`}
      >
        <div className="container">
          <div className="header-left">
            <a
              href="#"
              className="mobile-menu-toggle"
              title="Mobile Menu"
              onClick={toggleOpenMenu}
            >
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
            <div className={`dropdown ${openCart} off-canvas mr-0 mr-lg-2`}>
              <a href="#" className={"cart-toggle link"} onClick={toggleCart}>
                <i className="p-icon-cart-solid">
                  <span className="cart-count">2</span>
                </i>
              </a>
              <div className="canvas-overlay" onClick={toggleCart}></div>
              <div className="dropdown-box">
                <div className="canvas-header">
                  <h4 className="canvas-title">Shopping Cart</h4>
                  <a
                    href="#"
                    className="btn btn-dark btn-link btn-close"
                    onClick={toggleCart}
                  >
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

      <div className="mobile-menu-wrapper">
        <div className="mobile-menu-overlay" onClick={toggleOpenMenu}></div>

        <a className="mobile-menu-close" href="#" onClick={toggleOpenMenu}>
          <i className="p-icon-times"></i>
        </a>

        <div className="mobile-menu-container scrollable">
          <ul className="mobile-menu mmenu-anim">
            {navOptions.map((dt, i) => {
              return (
                <li
                  key={"nav-mbl-" + i}
                  className={dt.link == pathname ? "active" : ""}
                  onClick={toggleOpenMenu}
                >
                  <Link href={dt.link ?? "/"}>{dt.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
