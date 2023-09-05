"use client";

import { useWindowSize } from "@/hooks/useWindowSize";
import { useCallback, useEffect, useState } from "react";

export const Footer = () => {
  const [scrollY, setScrollY] = useState(100);
  const [showBottombar, setShowBottombar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      var isFixed = window.scrollY >= scrollY;

      if (isFixed) {
        setShowBottombar(true);
      } else {
        setShowBottombar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <ul className="menu menu-type2">
              <li>
                <a href="https://istyle-ddtstore.mimin.io">Beranda</a>
              </li>
              <li>
                <a href="https://istyle-ddtstore.mimin.io/about-us">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="https://istyle-ddtstore.mimin.io/contact-us">
                  Hubungi Kami
                </a>
              </li>
              <li>
                <a href="https://istyle-ddtstore.mimin.io/faq">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="footer-middle">
            <div className="footer-left">
              <ul className="widget-body">
                <li>
                  <a href="tel:#" className="footer-icon-box">
                    <i className="p-icon-phone-solid"></i>
                    <span>+62 817 0816 668</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    <i className="p-icon-map"></i>
                    <span>
                      Jl. Jenderal Sudirman, RT.6/RW.11, Karet Tengsin, Kota
                      Jakarta Pusat, Daerah Khusus Ibukota Jakarta, Indonesia
                    </span>
                  </a>
                </li>
                <li>
                  <a href="mailto:ddtstore@istyle.id" className="">
                    <i className="p-icon-message"></i>
                    <span>ddtstore@istyle.id</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-center">
              <a
                href="https://istyle-ddtstore.mimin.io"
                className="logo-footer"
              >
                <img
                  src="data:image/png;base64,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"
                  alt=""
                  className="header-logo"
                  width={100}
                />
              </a>
              <div className="social-links"></div>
            </div>
            <div className="footer-right">
              <div className="widget-newsletter"></div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">
              Powered by MIMIN © 2023. All Rights Reserved
            </p>
            <figure>
              <a href="https://mimin.io">
                <img
                  src="https://istyle-ddtstore.mimin.io/plugin/images/Mimin-Logo-3-small.png"
                  alt="payment"
                  width="159"
                  height="29"
                />
              </a>
            </figure>
          </div>
        </div>
      </footer>

      <div
        className={
          "sticky-footer sticky-content fix-bottom" +
          (showBottombar ? " fixed" : "")
        }
      >
        <a href="demo1.html" className="sticky-link">
          <i className="p-icon-home"></i>
          <span>Home</span>
        </a>
        <a href="shop.html" className="sticky-link">
          <i className="p-icon-category"></i>
          <span>Categories</span>
        </a>
        <a href="wishlist.html" className="sticky-link">
          <i className="p-icon-heart-solid"></i>
          <span>Wishlist</span>
        </a>
        <a href="account.html" className="sticky-link">
          <i className="p-icon-user-solid"></i>
          <span>Account</span>
        </a>
        <div className="header-search hs-toggle dir-up">
          <a href="#" className="search-toggle sticky-link">
            <i className="p-icon-search-solid"></i>
            <span>Search</span>
          </a>
          <form action="#" className="form-simple">
            <input
              type="text"
              name="search"
              autoComplete="off"
              placeholder="Search your keyword..."
              required
            />
            <button className="btn btn-search" type="submit">
              <i className="p-icon-search-solid"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
