"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/provider";
import Image from "@/components/Loader";
import { useListCinema } from "@/services/useCinemaService";

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
          <a href="#" className="contact">
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
  const [showPopup, setShowPopup] = useState<any>({
    show: false,
    title: 'Berhasil ditambahkan',
    image: null,
    content: null,
    button: null,
    action: null
  });


  let init = true;
  let timer: any = null;

  useEffect(() => {
    const handleScroll = () => {
      var isFixed = window.scrollY >= 100;

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


  useEffect(() => {
    if (state?.addCartPopup?.show) {
      // dispatch({addCartPopup: true})
      clearTimeout(timer);
      setShowPopup({
        show: true,
        title: state?.addCartPopup?.title ?? 'Berhasil ditambahkan',
        image: state?.addCartPopup?.image,
        content: <div>
          <p className="product-name">{state?.addCartPopup?.productName}</p>
          <span>{state?.addCartPopup?.qty} x
            <label className="font-bold"> Rp. {state?.addCartPopup?.price}</label>
          </span>
        </div>,
        button: 'CHECK OUT',
        action: state?.addCartPopup?.action
      });

      timer = setTimeout(() => {
        dispatch({
          addCartPopup: {
            show: false
          }
        });
        setShowPopup((prev: any) => { return { ...prev, show: false } })
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [state.addCartPopup, timer])

  const toggleCart = () =>
    setOpenCart((prev) =>
      prev == "cart-dropdown" ? "cart-dropdown opened" : "cart-dropdown"
    );

  const toggleOpenMenu = () =>
    setOpenMenu((prev) => (prev == "" ? " mmenu-active" : ""));

  const subTotal = state.carts?.reduce((a: any, b: any) => {
    return a + b.price * b.qty;
  }, 0);

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
            <Link href="/" className="logo">
              <Image
                src="/assets/images/logo.png"
                alt="logo"
                width="74"
                height="41"
              />
            </Link>
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
            <div className="select-box mr-4 w-[20rem]">
              <select name="country" className="form-control">
                {
                  (state.listCinema ?? []).map((dt: any) =>
                    <option value={dt?.id} key={'cnmx' + dt?.id}>{dt?.name}</option>)
                }
              </select>
            </div>
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
                  <span className="cart-count">{state.carts?.length}</span>
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

                  {state.carts?.map((item: any, i: any) => {
                    return (
                      <div className="product product-mini" key={'item-movie' + i}>
                        <figure className="product-media">
                          <a href="#">
                            <Image
                              src={item?.imageurl}
                              alt={"film " + item?.title}
                              style={{ maxWidth: 90 }}
                              width={90}
                              height={10}
                            />
                          </a>
                          <a href="#" title="Remove Product" className="btn-remove" onClick={() => deleteCart(item, state, dispatch)}>
                            <i className="p-icon-times"></i>
                            <span className="sr-only">Close</span>
                          </a>
                        </figure>
                        <div className="product-detail">
                          <a href="#" className="product-name">
                            {item?.title}
                          </a>
                          <div className="price-box">
                            <span className="product-quantity">{item?.qty}</span>
                            <span className="product-price">Rp. {item?.price?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })
                  }
                </div>
                <div className="cart-total">
                  <label>Subtotal:</label>
                  <span className="price">Rp. {subTotal?.toLocaleString()}</span>
                </div>
                <div className="cart-action">
                  {/* <a href="#" className="btn btn-outline btn-dim mb-2">
                    View Cart
                  </a> */}
                  <Link href="/checkout" className="btn btn-dim"
                    onClick={toggleCart}>
                    <span>Go To Checkout</span>
                  </Link>
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

      <div className="minipopup-area">
        <div className={"minipopup-box top-0" + (showPopup.show ? ' show' : '')}>
          <p className="minipopup-title">{showPopup?.title}</p>
          <div className="product product-purchased product-mini mb-0">
            {showPopup.image && (
              <figure className="product-media"><a href="#">
                <img src={showPopup.image ?? "/assets/images/cart/product.jpg"} alt="product" width="90" height="90" /></a>
              </figure>
            )}
            <div className="product-detail">
              {showPopup.content}
              {/* <span className="purchased-time">12 MINUTES AGO</span> */}
            </div>
          </div>
          {showPopup.button && (
            <Link href="/checkout" onClick={showPopup.action ? showPopup.button : () => { }} className="btn btn-dim mt-3 w-full">
              <span>{showPopup.button}</span>
            </Link>)}
        </div>
      </div>
    </header>
  );
};

export default NavBar;


export const addToCart = (item: any, state: any, dispatch: any) => {
  let carts = [...state.carts];
  let index = carts.findIndex((e) => e.scheduledfilmid == item?.scheduledfilmid);
  if (index >= 0) {
    carts[index] = { ...item, qty: item?.qty };
  } else {
    carts.push({ ...item, qty: item?.qty });
  };

  dispatch({
    addCartPopup: {
      show: true,
      productName: item?.title,
      qty: item?.qty,
      price: item?.price?.toLocaleString(),
      image: item?.imageurl,
    },
    carts: carts
  });
}


export const updateCarts = (item: any, update: any, state: any, dispatch: any) => {
  let carts = [...state.carts];
  let index = carts.findIndex((e) => e.scheduledfilmid == item?.scheduledfilmid);

  if (index >= 0) {
    let oldQty = carts[index].qty;
    let newData = { ...item, ...update };


    let val = Number(newData?.qty);
    val = isNaN(val) || val > newData?.maxQty || val < 1 ? oldQty : val;
    newData = { ...newData, qty: newData?.qty == '' ? '' : val };

    carts[index] = newData;
  }
  dispatch({ carts: carts });
};



export const deleteCart = (item: any, state: any, dispatch: any) => {
  let carts = [...state.carts];
  let index = carts.findIndex((e) => e.scheduledfilmid == item?.scheduledfilmid);
  if (index >= 0) {
    carts.splice(index, 1);
  }
  dispatch({ carts: carts });
}