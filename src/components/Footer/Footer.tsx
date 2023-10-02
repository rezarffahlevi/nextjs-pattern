"use client";

import { useAppContext } from "@/app/provider";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useCallback, useEffect, useState } from "react";

export const Footer = () => {
  const [scrollY, setScrollY] = useState(100);
  const [showBottombar, setShowBottombar] = useState(false);
  const { state, dispatch } = useAppContext();

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
            {/* <ul className="menu menu-type2">
              <li>
                <a href="https://istyle-ddtstore.mimin.io">Beranda</a>
              </li>
            </ul> */}
          </div>

          <div className="footer-middle">
            <div className="footer-left">
              <ul className="widget-body">
                <li>
                  <a href="tel:#" className="footer-icon-box">
                    <i className="p-icon-phone-solid"></i>
                    <span>{state.cinema?.admin?.phone}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    <i className="p-icon-map"></i>
                    <span>
                      {state.cinema?.admin?.address}
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${state.cinema?.admin?.email}`} className="">
                    <i className="p-icon-message"></i>
                    <span>{state.cinema?.admin?.email}</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-center">
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
          "invisible sticky-footer sticky-content fix-bottom" +
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
