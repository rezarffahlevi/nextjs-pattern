"use client";

import { useAppContext } from "@/app/provider";
import Image from "@/components/Loader";
import { SectionBuilder } from "@/components/Container/SectionBuilder";
import Link from "next/link";
import { deleteCart, updateCarts } from "@/components/NavBar/NavBar";
import { useListCinema } from "@/services/useCinemaService";
import { useEffect, useState } from "react";
import './checkout.module.css';
import { useSeatLayout, useSetSelectedSeat, useShowTime } from "@/services/useMovieService";
import { CartCard } from "./sections/CartCard";
import moment from "moment";

const CheckoutPage = () => {
    const { state, dispatch } = useAppContext();

    const [subTotal, setSubTotal] = useState(0);
    const [selected, setSelected] = useState<any>([]);

    const { fetchSeatLayout, seatLayout, seatLayoutLoading, seatLayoutError, seatLayoutIsError } = useSeatLayout();
    const { fetchSetSelectedSeat, setSeat, setSeatLoading, setSeatIsError, setSeatError } = useSetSelectedSeat();

    let init = true;

    useEffect(() => {
        if (state.checkout && init) {
            init = false;
            fetchSeatLayout({
                body: {
                    "cinemaid": state.cinema?.id,
                    "sessionid": state.checkout?.Session_strID,
                    "areacategorycode": state.checkout?.AreaCat_strCode,
                    "tickettypecode": state.checkout?.Price_strTicket_Type_Code,
                    "ticketprice": state.checkout?.Price_intTicket_Price,
                    "ticketqty": state.checkout?.PPack_intQuantity,
                    "filmid": state.checkout?.scheduledfilmid,
                    "filmname": state.checkout?.title,
                    "cinemaname": state.checkout?.cinemaname,
                    "screenname": state.checkout?.screenname,
                    "sessiondatetime": `${moment(state.checkout?.date).format('YYYY/MM/DD')} ${state.checkout?.showtime}`,
                    "guestemail": "email-that-did-not-exist@mimin.io",
                }
            });
        }
        let sub = [state.checkout].reduce((a: any, b: any) => {
            return a + (b?.price * b?.qty);
        }, 0);
        setSubTotal(sub);
    }, [state.checkout]);


    const onBuyClick = () => {
        fetchSetSelectedSeat({
            body: {
                "sessionid": state.checkout?.sessionid,
                "cinemaid": state.cinema?.id,
                "orderid": seatLayout?.orderid,
                "tickettypename": state.checkout?.Price_strTicket_Type_Description,
                "SelectedSeats": selected.map((dt: any) => {
                    return {
                        "AreaCategoryCode": dt?.AreaCategoryCode,
                        "AreaNumber": dt?.AreaNumber,
                        "RowIndex": dt?.RowIndex,
                        "ColumnIndex": dt?.ColumnIndex
                    }
                }),
            }
        })
    }

    return (
        <main className="container mt-7 mb-2">
            <SectionBuilder loading={<>loading</>} isLoading={false} isError={false}>
                <div className="row">
                    <div className="col-lg-8 col-md-12 pr-lg-6">
                        <div className="shop-table cart-table">
                            {/* <thead>
                                <tr>
                                    <th><span>Product</span></th>
                                    <th></th>
                                    <th><span>Price</span></th>
                                    <th><span>quantity</span></th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead> */}
                            <div>
                                {/* {state.carts.map((movie: any, i: any) => {
                                    return ( */}
                                <CartCard
                                    // key={'cart-' + i}
                                    movie={state.checkout}
                                    seatLayout={seatLayout}
                                    subTotal={subTotal}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                {/* );
                                })} */}
                            </div>
                        </div>
                        {/* <div className="cart-actions mb-6 pt-6">
                            <Link href="/" className="btn btn-dim btn-icon-left mr-4 mb-4"><i
                                className="p-icon-arrow-long-left"></i>Continue Shopping</Link>
                        </div> */}
                        <div className="cart-coupon-box pt-5 pb-8">
                            <h4 className="title coupon-title text-capitalize mb-4">Coupon Discount</h4>
                            <form action="#">
                                <input type="text" name="coupon_code" className="input-text mb-6" id="coupon_code"
                                    placeholder="Enter coupon code here..." required />
                                <button type="submit" className="btn btn-dark btn-outline" style={{ backgroundColor: 'transparent' }}>Apply
                                    Coupon</button>
                            </form>
                        </div>
                    </div>
                    <aside className="col-lg-4 sticky-sidebar-wrapper">
                        <div className="sticky-sidebar" data-sticky-options="{'bottom': 20}">
                            <div className="summary mb-4">
                                <h3 className="summary-title">Total Pembelian</h3>
                                <table className="shipping mb-2">
                                    <tbody>
                                        <tr className="summary-subtotal">
                                            <td>
                                                <h4 className="summary-subtitle">Subtotal</h4>
                                            </td>
                                            <td>
                                                <p className="summary-subtotal-price">Rp. {subTotal?.toLocaleString()}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="shipping-address">
                                    <label className="mb-4">Lokasi Teater *</label>
                                    <div className="select-box">
                                        <select name="country" className="form-control">
                                            {
                                                (state.listCinema ?? []).map((dt: any) =>
                                                    <option value={dt?.id} key={'cnm' + dt?.id}>{dt?.name}</option>)
                                            }
                                        </select>
                                    </div>
                                    {/* <label className="mb-4">Metode Pengiriman *</label>
                                    <div className="select-box">
                                        <select name="country" className="form-control">
                                            <option>Instant</option>
                                            <option>Same Day</option>
                                            <option>Regular</option>
                                        </select>
                                    </div> */}
                                </div>
                                <table className="total">
                                    <tbody>
                                        <tr className="summary-subtotal">
                                            <td>
                                                <h4 className="summary-subtitle">Total</h4>
                                            </td>
                                            <td>
                                                <p className="summary-total-price ls-s">Rp. {subTotal?.toLocaleString()}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <a onClick={onBuyClick} className="btn btn-dim btn-checkout btn-block">BELI</a>
                            </div>
                        </div>
                    </aside>
                </div>
            </SectionBuilder>
        </main >
    );
};


export default CheckoutPage;
