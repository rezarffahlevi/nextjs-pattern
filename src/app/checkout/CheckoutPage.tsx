"use client";

import { useAppContext } from "@/app/provider";
import Image from "@/components/Loader";
import { SectionBuilder } from "@/components/Container/SectionBuilder";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Card,
    CardBody,
    Checkbox,
    CloseButton,
    Divider,
    HStack,
    Heading,
    IconButton,
    Input,
    Select,
    Text,
    VStack,
    useNumberInput,
} from "@chakra-ui/react";
import Link from "next/link";

const CheckoutPage = () => {
    const { state, dispatch } = useAppContext();

    const updateCarts = (detail: any, update: any) => {
        let carts = [...state.carts];
        let index = carts.findIndex((e) => e.id == detail?.id);
        if (index >= 0) {
            let oldQty = carts[index].qty;
            let newData = { ...detail, ...update };
            if (newData?.qty > newData?.stock || newData?.qty < 1) {
                newData = { ...newData, qty: oldQty };
            }
            carts[index] = newData;
        }
        dispatch({ carts: carts });
    };

    const subTotal = state.carts?.reduce((a: any, b: any) => {
        return a + b.price * b.qty;
    }, 0);

    return (
        <main className="container mt-7 mb-2">
            <SectionBuilder loading={<>loading</>} isLoading={false} isError={false}>
                <div className="row">
                    <div className="col-lg-8 col-md-12 pr-lg-6">
                        <table className="shop-table cart-table">
                            {/* <thead>
                                <tr>
                                    <th><span>Product</span></th>
                                    <th></th>
                                    <th><span>Price</span></th>
                                    <th><span>quantity</span></th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead> */}
                            <tbody>
                                {state.carts.map((movie: any, i: any) => (
                                    <tr key={'cart-' + i}>
                                        <td className="product-thumbnail">
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
                                        </td>
                                        <td className="product-name">
                                            <div className="product-name-section">
                                                <Link href={"/movies/" + movie?.scheduledfilmid}>{movie?.title}</Link>

                                            </div>
                                        </td>
                                        <td className="product-subtotal">
                                            <span className="amount">Rp. {movie?.price?.toLocaleString()}</span>
                                        </td>
                                        <td className="product-quantity">
                                            <div className="input-group">
                                                <button className="quantity-minus p-icon-minus-solid bg-transparent" onClick={() =>
                                                    updateCarts(movie, {
                                                        qty: movie.qty - 1,
                                                    })}></button>
                                                <input className="quantity form-control"
                                                    type="number"
                                                    min="1"
                                                    max={movie?.maxQty}
                                                    value={movie?.qty ?? 0}
                                                    onChange={(d) => {
                                                        let value = d.target.value;
                                                        updateCarts(movie, {
                                                            qty: value,
                                                        })
                                                    }}
                                                />
                                                <button className="quantity-plus p-icon-plus-solid bg-transparent" onClick={() =>
                                                    updateCarts(movie, {
                                                        qty: movie.qty + 1,
                                                    })}></button>
                                            </div>
                                            <label className="mt-4">Stok = {movie?.maxQty}</label>
                                        </td>
                                        <td className="product-price">
                                            <span className="amount">Rp. {(movie?.price * movie?.qty).toLocaleString()}</span>
                                        </td>
                                        <td className="product-remove">
                                            <a href="#" className="btn-remove" title="Remove this product">
                                                <i className="p-icon-times"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                                            <option value="us">United States (US)</option>
                                            <option value="uk"> United Kingdom</option>
                                            <option value="fr">France</option>
                                            <option value="aus">Austria</option>
                                        </select>
                                    </div>
                                    <label className="mb-4">Metode Pengiriman *</label>
                                    <div className="select-box">
                                        <select name="country" className="form-control">
                                            <option value="us">California</option>
                                            <option value="uk">Alaska</option>
                                            <option value="fr">Delaware</option>
                                            <option value="aus">Hawaii</option>
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
            </SectionBuilder >
        </main >
    );
};

export default CheckoutPage;
