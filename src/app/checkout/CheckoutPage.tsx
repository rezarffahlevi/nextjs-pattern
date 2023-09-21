"use client";

import { useAppContext } from "@/app/provider";
import Image from "@/components/Loader";
import { ErrorBuilder, SectionBuilder } from "@/components/Container/SectionBuilder";
import Link from "next/link";
import { deleteCart, updateCarts } from "@/components/NavBar/NavBar";
import { useListCinema } from "@/services/useCinemaService";
import { useEffect, useState } from "react";
import './checkout.module.css';
import { useAddConcessionItems, useSeatLayout, useSetSelectedSeat, useShowTime } from "@/services/useMovieService";
import { CartCard } from "./sections/CartCard";
import moment from "moment";
import { Box, Skeleton, useToast } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

const CheckoutPage = () => {
    const { state, dispatch } = useAppContext();

    const [subTotal, setSubTotal] = useState(0);
    const [step, setStep] = useState(0);
    const [allowedStep, setAllowedStep] = useState(0);
    const [selected, setSelected] = useState<any>([]);
    const [listConcession, setListConcession] = useState<any>([]);
    const toast = useToast()


    const { fetchSeatLayout, seatLayout, seatLayoutLoading, seatLayoutMessage, seatLayoutError, seatLayoutIsError } = useSeatLayout();
    const { fetchSetSelectedSeat, setSeat, setSeatLoading, setSeatMessage, setSeatIsError, setSeatError } = useSetSelectedSeat();
    const { postAddConcessionItems, addConcession, addConcessionLoading, addConcessionMessage, addConcessionIsError, addConcessionError } = useAddConcessionItems();

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
                    // "ticketqty": state.checkout?.PPack_intQuantity,
                    "ticketqty": state.checkout?.qty,
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

    useEffect(() => {
        if (setSeat) {
            setListConcession(setSeat?.ConcessionItems ?? []);
        }
    }, [setSeat]);


    const onChangeQtyConcession = (item: any, value: string | Number) => {
        let val = Number(value);
        val = isNaN(val) || val > item?.maxQty || val < 1 ? item.qty : val;
        setListConcession((prev: any) => {
            let newState = [...prev];
            let i = newState.findIndex(e => e.id == item.id);
            newState[i] = { ...item, qty: value == '' ? '' : val };

            return newState;
        })
    }

    const onBuyClick = () => {
        if (step < 1) {
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
            });
            setAllowedStep((prev) => prev > 1 ? prev : (prev + 1));
        } else if (step < 2) {
            postAddConcessionItems({
                body: {
                    "sessionid": state.checkout?.sessionid,
                    "cinemaid": state.cinema?.id,
                    "orderid": seatLayout?.orderid,
                    "tickettypename": state.checkout?.Price_strTicket_Type_Description,
                    "deliverytype": "Deliver",
                    "Concessions": listConcession?.filter((fd: any) => fd.selected == true)?.map((dt: any) => {
                        return {
                            "ItemId": dt?.id,
                            "Quantity": dt?.qty ?? 1,
                            "Name": dt?.description,
                            "Price": dt?.priceincents
                        }
                    }),
                }
            });
            setAllowedStep((prev) => prev > 2 ? prev : (prev + 1));
        } else if (step < 3) {
            const res = {
                "BookingFeeValueCents": "0",
                "OrderId": "5B2F87FA-94C5-490D-81C3-E37042C60A9F",
                "TotalOrderCount": "3",
                "TotalTicketFeeValueInCents": "",
                "TotalValueCents": "14000000",
                "VistaBookingNumber": "0",
                "VistaTransactionNumber": "0",
                "status": "0",
                "message": ""
            }
        }

        setStep((prev) => (prev + 1));
    }

    const getClassStepActive = (i: Number) => {
        return i == step ? ' active' : ''
    }

    const handleToastStep = () => {
        toast({
            title: `Belum bisa ke step yang ini`,
            status: 'error',
            isClosable: true,
            duration: 2000
        })
    }

    const renderStepActive = () => {

        switch (step) {
            case 1:
                return (
                    <SectionBuilder
                        loading={<CheckoutLoading />}
                        isLoading={setSeatLoading}
                        isError={setSeatIsError}
                        error={<ErrorBuilder message={setSeatMessage} />}>
                        <div>
                            {
                                listConcession.map((item: any, index: any) => {
                                    return (
                                        <div className="product-wrap" key={'concs-' + item?.id}>
                                            <div className="product product-list product-with-qty">
                                                <figure className="product-media">
                                                    <a href={item?.ItemURL}>
                                                        <Image src={item?.ItemURL} alt={"product " + item?.descriptionalt} width="288"
                                                            height="360" />
                                                    </a>
                                                </figure>
                                                <div className="product-details w-full">
                                                    <h4 className="product-name">
                                                        <a>
                                                            {item?.description}
                                                        </a>
                                                    </h4>
                                                    <span className="product-price">
                                                        {/* <del className="old-price">$90.00</del> */}
                                                        <ins className="new-price">Rp. {parseInt(item?.priceincents)?.toLocaleString()}</ins>
                                                    </span>
                                                    {/* <p className="product-short-desc">
                                                        Aliquam id diam maecenas ultricies mi eget, mauris volutpat
                                                        acconsectetur adipising volutpat ac tincidunt. Vitae semper quis lectus
                                                        sceleris.
                                                    </p> */}
                                                    <div className="product-action">
                                                        <div className="product-quantity">
                                                            <button className="quantity-minus p-icon-minus-solid" onClick={() => {
                                                                onChangeQtyConcession(item, item?.qty == 1 || typeof item?.qty == 'undefined' ? 1 : (item?.qty ?? 1) - 1)
                                                            }}></button>
                                                            <input className="quantity form-control" type="number" min="1"
                                                                max="1000" value={item?.qty ?? 1}
                                                                onChange={(e) => {
                                                                    let value = e.target.value;
                                                                    onChangeQtyConcession(item, value);
                                                                }}
                                                                onBlur={(e) => {
                                                                    let value = e.target.value;
                                                                    onChangeQtyConcession(item, value == '' ? 1 : value);
                                                                }} />
                                                            <button className="quantity-plus p-icon-plus-solid" onClick={() => {
                                                                onChangeQtyConcession(item, (item?.qty ?? 1) + 1)
                                                            }}></button>
                                                        </div>
                                                        <button onClick={() => {
                                                            let newObject = { ...item };
                                                            newObject['selected'] = !(item?.selected ?? false);
                                                            setListConcession((prev: any) => {
                                                                let newState = [...prev];
                                                                newState[index] = newObject;
                                                                // console.log('test', newObject);
                                                                return newState;
                                                            })
                                                        }} className={`btn-product btn-cart`} style={item?.selected == true ? {
                                                            backgroundColor: '#f12a57',
                                                            borderColor: '#f12a57',
                                                            color: 'white'
                                                        } : {}} title="Add to cart">
                                                            {item?.selected ?
                                                                <MdDelete size={20} style={{ marginHorizontal: 10, marginBottom: 2 }} />
                                                                :
                                                                <i className="p-icon-cart-solid"></i>
                                                            }

                                                            <span>{item?.selected ? 'Hapus' : 'Pesan'}</span></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </SectionBuilder >
                )
                break;

            case 2:

                break;
            default: return (
                <SectionBuilder
                    loading={<CheckoutLoading />}
                    isLoading={seatLayoutLoading}
                    isError={seatLayoutIsError}
                    error={<ErrorBuilder message={seatLayoutMessage} />}>
                    <>
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
                    </>
                </SectionBuilder>
            )
                break;
        }

    }

    return (
        <main className="container mt-7 mb-2 pb-12">
            <div className="step-by pr-4 pl-4 mb-8">
                <h3 className={`title title-step${getClassStepActive(0)}`}><a href="#" onClick={allowedStep >= 0 ? () => setStep(0) : handleToastStep}>1. Pilih Kursi</a></h3>
                <h3 className={`title title-step${getClassStepActive(1)}`}><a href="#" onClick={allowedStep >= 1 ? () => setStep(1) : handleToastStep}>2. Pilih Makanan</a></h3>
                <h3 className={`title title-step${getClassStepActive(2)}`}><a href="#" onClick={allowedStep >= 2 ? () => setStep(2) : handleToastStep}>3. Summary</a></h3>
            </div>
            <div className="row">
                <div className="col-lg-8 col-md-12 pr-lg-6">
                    {renderStepActive()}
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
                                    <select name="country" className="form-control" onChange={(e) => {
                                        let val = e.target.value;
                                        dispatch({ cinema: state.cinemas?.find((fd: any) => fd?.id == val) });
                                    }}>
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
        </main >
    );
};

const CheckoutLoading = ({ children }: any) => {
    return (
        <Box className="w-full mt-4">
            <div className="flex flex justify-between">
                <Skeleton className="basis-3/12 h-6" />
                <Skeleton className="basis-1/12 h-6" />
            </div>
            <div className="flex mt-4">
                <Skeleton className="basis-6/12 h-8" />
                <Skeleton className="basis-6/12 h-8" />
            </div>
            <Skeleton className="h-8 mt-4 w-16" />
        </Box>
    );
};

export default CheckoutPage;
