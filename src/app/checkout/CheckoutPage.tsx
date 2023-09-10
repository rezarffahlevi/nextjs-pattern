"use client";

import { useAppContext } from "@/app/provider";
import Image from "@/components/Loader";
import { SectionBuilder } from "@/components/Container/SectionBuilder";
import Link from "next/link";
import { deleteCart, updateCarts } from "@/components/NavBar/NavBar";
import { useListCinema } from "@/services/useCinemaService";
import { useEffect } from "react";
import { Button, Card, CardBody, Checkbox } from "@chakra-ui/react";
import './checkout.module.css';

const CheckoutPage = () => {
    const { state, dispatch } = useAppContext();
    const { fetchListCinema, listCinema, listCinemaLoading, listCinemaError, listCinemaIsError } = useListCinema()

    let init = true;
    useEffect(() => {
        if (init) {
            init = false;
            fetchListCinema({});
        }
    }, [])

    const subTotal = state.carts?.reduce((a: any, b: any) => {
        return a + b.price * b.qty;
    }, 0);

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
                                {state.carts.map((movie: any, i: any) => (
                                    <div key={'cart-' + i} className="mb-6">
                                        <div className="flex w-full items-center">
                                            <div className="product-thumbnail basis-1/12">
                                                <figure>
                                                    <Link href={"/movies/" + movie?.scheduledfilmid}>
                                                        {movie?.imageurl && (<Image
                                                            src={movie?.imageurl}
                                                            id='thumbnail'
                                                            alt={movie?.title + ' ' + movie?.titlealt}
                                                            width={0}
                                                            height={0}
                                                            sizes="100vw"
                                                            style={{ width: "100%", height: "auto" }}
                                                        />)}
                                                    </Link>
                                                </figure>
                                            </div>
                                            <div className="product-name basis-3/12">
                                                <div className="product-name-section">
                                                    <Link href={"/movies/" + movie?.scheduledfilmid}>{movie?.title}</Link>
                                                </div>
                                            </div>
                                            <div className="product-subtotal basis-2/12">
                                                <span className="amount">Rp. {movie?.price?.toLocaleString()}</span>
                                            </div>
                                            <div className="product-quantity basis-2/12">
                                                <div className="input-group">
                                                    <button className="quantity-minus p-icon-minus-solid bg-transparent" onClick={() =>
                                                        updateCarts(movie, {
                                                            qty: movie?.qty == 1 ? 1 : movie.qty - 1,
                                                        }, state, dispatch)}></button>
                                                    <input className="quantity form-control"
                                                        type="number"
                                                        min="1"
                                                        max={movie?.maxQty}
                                                        value={movie?.qty ?? 0}
                                                        onChange={(d) => {
                                                            let value = d.target.value;
                                                            updateCarts(movie, {
                                                                qty: value,
                                                            }, state, dispatch)
                                                        }}
                                                        onBlur={(d) => {
                                                            let value = d.target.value;
                                                            updateCarts(movie, {
                                                                qty: value == '' ? 1 : value,
                                                            }, state, dispatch)
                                                        }}
                                                    />
                                                    <button className="quantity-plus p-icon-plus-solid bg-transparent" onClick={() =>
                                                        updateCarts(movie, {
                                                            qty: movie.qty + 1,
                                                        }, state, dispatch)}></button>
                                                </div>
                                                <p className="mt-1">Stok = {movie?.maxQty}</p>
                                            </div>
                                            <div className="product-price basis-3/12">
                                                <span className="amount">Rp. {(movie?.price * movie?.qty).toLocaleString()}</span>
                                            </div>
                                            <div className="product-remove basis-1/12">
                                                <a href="#" className="btn-remove float-right" title="Remove this product" onClick={() => {
                                                    deleteCart(movie, state, dispatch);
                                                }}>
                                                    <i className="p-icon-times"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="mt-3 font-semibold text-[14px]">
                                            Time Remaining to complete booking - 09.51
                                        </div>
                                        <Card className="mt-4">
                                            <CardBody className="flex justify-between overflow-auto">
                                                <span className="self-center font-bold mr-4 text-[14px]">
                                                    Tickets
                                                </span>
                                                <div className="max-md:px-6 max-md:min-w-[10rem]">
                                                    <p className="text-[12px]">Movie</p>
                                                    <span className="font-bold text-[13px]">{movie?.title}</span>
                                                </div>
                                                <div className="max-md:px-6 max-md:min-w-[10rem]">
                                                    <p className="text-[12px]">When</p>
                                                    <span className="font-bold text-[13px]">
                                                        {new Date().toDateString()}
                                                    </span>
                                                </div>
                                                <div className="max-md:px-6 max-md:min-w-[10rem]">
                                                    <p className="text-[12px]">Location</p>
                                                    <span className="font-bold text-[13px]">
                                                        FLIX - PIK AVENUE
                                                    </span>
                                                </div>
                                                <div className="max-md:px-6 max-md:min-w-[10rem]">
                                                    <p className="text-[12px]">Ticket Amount</p>
                                                    <span className="font-bold text-[13px]">{movie?.qty}</span>
                                                </div>
                                                <div className="max-md:px-6 max-md:min-w-[10rem]">
                                                    <p className="text-[12px]">Class</p>
                                                    <span className="font-bold text-[13px]">PLATINUM S</span>
                                                </div>
                                                <div className="max-md:px-6 max-md:min-w-[14rem]">
                                                    <span className="text-[12px]">
                                                        Ticket Total : <span className="font-bold">Rp. {subTotal?.toLocaleString()}</span>
                                                    </span>
                                                    <p className="font-bold text-yellow-500 text-[13px]">
                                                        Ticket Summary
                                                    </p>
                                                </div>
                                            </CardBody>
                                        </Card>

                                        <Card className="bg-gray-500 my-5">
                                            <CardBody className="flex">
                                                <span className="text-[13px] mr-12 font-bold text-white">
                                                    SEAT
                                                </span>
                                                <span className="text-[13px] font-bold text-white">
                                                    Please Select Seat
                                                </span>
                                            </CardBody>
                                        </Card>

                                        <div className="md:flex w-full">
                                            <Card className="basis-12/12 md:basis-5/12">
                                                <CardBody>
                                                    <div className="flex justify-between">
                                                        <span className="text-[12px] font-semibold text-gray-600">
                                                            Your Seat
                                                        </span>
                                                        <input type="checkbox" className="custom-checkbox bg-yellow-300" style={{ borderColor: '#54524d', borderWidth: 1.5 }} checked={false} readOnly />
                                                    </div>

                                                    <div className="mt-6 flex justify-between">
                                                        <span className="text-[12px] font-semibold text-gray-600">
                                                            Available Seats
                                                        </span>
                                                        <input type="checkbox" className="custom-checkbox" style={{ borderColor: '#54524d', borderWidth: 1.5 }} checked={false} readOnly />
                                                    </div>

                                                    <div className="mt-6 flex justify-between">
                                                        <span className="text-[12px] font-semibold text-gray-600">
                                                            Taken Seats
                                                        </span>
                                                        <input type="checkbox" className="custom-checkbox" style={{ borderColor: 'silver', backgroundColor: 'silver', borderWidth: 1.5 }} checked={false} readOnly />
                                                    </div>

                                                    <div className="mt-6 flex justify-between">
                                                        <span className="text-[12px] font-semibold text-gray-600">
                                                            Wheel Chair
                                                        </span>
                                                        <input type="checkbox" className="custom-checkbox" style={{ borderColor: '#f6e05e', borderWidth: 1.5 }} checked={false} readOnly />
                                                    </div>

                                                    <div className="mt-6 flex justify-between">
                                                        <span className="text-[12px] font-semibold text-gray-600">
                                                            Companion
                                                        </span>
                                                        <input type="checkbox" className="custom-checkbox" style={{ borderColor: '#4299e1', borderWidth: 1.5 }} checked={false} readOnly />
                                                    </div>

                                                    <div className="mt-6 flex justify-between">
                                                        <span className="text-[12px] font-semibold text-gray-600">
                                                            Housed
                                                        </span>
                                                        <input type="checkbox" className="custom-checkbox" style={{ borderColor: 'green', borderWidth: 1.5 }} checked={false} readOnly />
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <div className="md:flex basis-7/12 max-md:mt-6 max-md:mb-10">
                                                <div className="basis-5/12 mx-6">
                                                    {["A", "B", "C", "D"].map((col, i) => {
                                                        return (
                                                            <div
                                                                key={"st" + i}
                                                                className="flex basis-12/12 justify-between"
                                                            >
                                                                {renderSeat(col)}
                                                            </div>
                                                        );
                                                    })}
                                                    <div className="mr-[1.5rem] mt-3 py-3 rounded-md text-sm text-center bg-gray-500 text-white font-body font-bold">
                                                        SCREEN
                                                    </div>
                                                </div>
                                                <div className="basis-7/12 relative max-md:pt-8 max-md:pb-8">
                                                    <Button
                                                        variant={"solid"}
                                                        className="bg-yellow-300 hover:bg-neutral-800 h-10 px-20 py-8 chakra-button rounded-none text-white font-body text-bold absolute bottom-0 right-0"
                                                    >
                                                        NEXT
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="cart-actions mb-6 pt-6">
                            <Link href="/" className="btn btn-dim btn-icon-left mr-4 mb-4"><i
                                className="p-icon-arrow-long-left"></i>Continue Shopping</Link>
                        </div>
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
                                                (listCinema?.cinemalist ?? []).map((dt: any) =>
                                                    <option value={dt?.id} key={dt?.id}>{dt?.name}</option>)
                                            }
                                        </select>
                                    </div>
                                    <label className="mb-4">Metode Pengiriman *</label>
                                    <div className="select-box">
                                        <select name="country" className="form-control">
                                            <option>Instant</option>
                                            <option>Same Day</option>
                                            <option>Regular</option>
                                        </select>
                                    </div>
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
                                <a href="#" className="btn btn-dim btn-checkout btn-block">BELI</a>
                            </div>
                        </div>
                    </aside>
                </div>
            </SectionBuilder>
        </main >
    );
};


const renderSeat = (col: string) => {
    let element = [];
    element.push(<span className="w-[2.5rem] text-gray-500">{col}</span>);
    for (let index = 0; index < 6; index++) {
        let seatDivider = index % 2 == 1;
        let mr = seatDivider ? " mr-6" : "";
        element.push(
            <input
                className={"custom-checkbox mx-[1px]" + mr}
                key={'cbx-' + index}
                type="checkbox"
                style={{ borderColor: '#54524d', borderWidth: 1.5 }}
            />
        );
    }
    element.push(<span className="w-[2.5rem] ml-[-1rem] text-gray-500" key={'span-' + col}>{col}</span>);
    return element;
};

export default CheckoutPage;
