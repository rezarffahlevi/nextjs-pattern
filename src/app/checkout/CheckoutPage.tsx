"use client";

import { initialState, useAppContext } from "@/app/provider";
import Image from "@/components/Loader";
import { ErrorBuilder, SectionBuilder } from "@/components/Container/SectionBuilder";
import { useCallback, useEffect, useState } from "react";
import './checkout.module.css';
import { useAddConcessionItems, useSeatLayout, useSetSelectedSeat } from "@/services/useMovieService";
import { CartCard } from "./sections/CartCard";
import moment from "moment";
import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, useToast } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useOrderMicrosite } from "@/services/useOrderService";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
    const { state, dispatch } = useAppContext();
    const router = useRouter();

    const [subTotal, setSubTotal] = useState(0);
    const [ppn, setPpn] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [step, setStep] = useState(0);
    const [allowedStep, setAllowedStep] = useState(0);
    const [selected, setSelected] = useState<any>([]);
    const [listConcession, setListConcession] = useState<any>([]);
    const [showModal, setShowModal] = useState(false);
    const toast = useToast()


    const { fetchSeatLayout, seatLayout, seatLayoutLoading, seatLayoutMessage, seatLayoutError, seatLayoutIsError } = useSeatLayout();
    const { fetchSetSelectedSeat, setSeat, setSeatLoading, setSeatMessage, setSeatIsError, setSeatError } = useSetSelectedSeat();
    const { postAddConcessionItems, addConcession, addConcessionLoading, addConcessionMessage, addConcessionIsError, addConcessionError } = useAddConcessionItems();
    const { postOrderMicrosite, orderMicrosite, orderMicrositeLoading, orderMicrositeMessage, orderMicrositeIsError, orderMicrositeError } = useOrderMicrosite();

    let init = true;
    let interval: any;
    let serviceCharge = 2500;
    let packagingCost = 5000;
    // let ppn = (subTotal / 100) * 0.11;
    // let grandTotal = (subTotal / 100) + (serviceCharge + packagingCost) + ppn;


    useEffect(() => {
        if (state.checkout && init) {
            init = false;
            fetchSeatLayout({
                body: {
                    "cinemaid": state.cinema?.store_code,
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
                    "guestemail": state.user?.email,
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
            dispatch({ setSeat: setSeat, seatSelected: selected, allowedStep: allowedStep, step: step });
        }

        if (setSeatIsError) {
            setAllowedStep(0);
            setStep(0);
            toast({
                title: setSeatMessage,
                status: 'error',
                isClosable: true,
                duration: 2000
            });
        }

    }, [setSeat, setSeatIsError, setSeatMessage]);

    useEffect(() => {
        if (addConcession) {
            dispatch({ addConcession: addConcession, allowedStep: allowedStep, step: step, ppn: (addConcession?.TotalValueCents / 100) * 0.11, subTotal: addConcession?.TotalValueCents, grandTotal: (addConcession?.TotalValueCents / 100) + (serviceCharge + packagingCost) + ((addConcession?.TotalValueCents / 100) * 0.11) });
            setSubTotal(addConcession?.TotalValueCents);
            setPpn((addConcession?.TotalValueCents / 100) * 0.11);
            setGrandTotal((addConcession?.TotalValueCents / 100) + (serviceCharge + packagingCost) + ((addConcession?.TotalValueCents / 100) * 0.11));
        }
    }, [addConcession]);

    // useEffect(() => {
    //     if (allowedStep >= 2 && grandTotal > 0) {
    //         onBuyClick();
    //     }
    // }, [allowedStep, grandTotal])

    useEffect(() => {
        if (state?.setSeat && !setSeat) {
            setListConcession(state?.setSeat?.ConcessionItems ?? []);
        }
    }, [state?.setSeat, setSeat]);


    useEffect(() => {
        if (state?.seatSelected) {
            setSelected(state?.seatSelected);
            setAllowedStep(state?.allowedStep);
            setStep(state?.step);
            setPpn(state?.ppn);
            setSubTotal(state?.subTotal);
            setGrandTotal(state?.grandTotal);
        }
    }, [state?.seatSelected]);

    useEffect(() => {
        if (listConcession) {
            let subTicket = [state.checkout].reduce((a: any, b: any) => {
                return a + (b?.price * b?.qty);
            }, 0);
            let sub = listConcession?.reduce((a: any, b: any) => {
                if (b.selected == true) {
                    return a + ((b?.priceincents) * (b?.qty ?? 1));
                }
                return a;
            }, 0);
            setSubTotal(subTicket + sub);
        }
    }, [listConcession]);

    useEffect(() => {
        if (orderMicrosite) {
            dispatch({
                grandTotal: orderMicrosite?.data?.grand_total,
                step: step,
                subtotal: orderMicrosite?.data?.subtotal,
                orderMicrosite: orderMicrosite
            });
            setShowModal(true);
        }
    }, [orderMicrosite]);


    useEffect(() => {
        if (state.orderMicrosite) {
            serviceCharge = state.orderMicrosite?.data?.service_charge;
            setSubTotal(state.orderMicrosite?.data?.subtotal)
            setGrandTotal(state.orderMicrosite?.data?.grand_total)
        }
    }, [state.orderMicrosite]);

    useEffect(() => {
        if (step > 1) {
            clearTimeout(interval);
        } else {
            interval = setTimeout(() => {
                dispatch({ timeRemains: state.timeRemains - 1000 });
            }, 1000);
        }

        if (state.timeRemains <= 0) {
            dispatch({
                checkout: null,
                setSeat: null,
                seatSelected: null,
                allowedStep: 0,
                step: 0,
                addConcession: null,
                ppn: 0,
                subtotal: 0,
                grandTotal: 0,
                orderMicrosite: null,
                timeRemains: initialState.timeRemains
            });
            router.push('/');
        }

        return () => clearTimeout(interval);

    }, [state.timeRemains])

    const onChangeQtyConcession = (item: any, value: string | Number) => {
        let val = Number(value);
        val = isNaN(val) || val > item?.maxQty || val < 1 ? item.qty : val;
        setListConcession((prev: any) => {
            let newState = [...prev];
            let i = newState.findIndex(e => e.id == item.id);
            newState[i] = { ...item, qty: value == '' ? '' : val };
            return newState;
        });
    }

    const onBuyClick = useCallback(() => {
        if (step < 1) {
            if (selected.length < state.checkout?.qty) {
                return toast({
                    title: `Pilih jumlah bangku sesuai qty Anda`,
                    status: 'error',
                    isClosable: true,
                    duration: 2000
                });
            }

            if (!state?.setSeat)
                fetchSetSelectedSeat({
                    body: {
                        "sessionid": state.checkout?.sessionid,
                        "cinemaid": state.cinema?.store_code,
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
            setStep((prev) => (prev + 1));
        } else if (step < 2) {
            // if (!state?.addConcession)
            //     postAddConcessionItems({
            //         body: {
            //             "sessionid": state.checkout?.sessionid,
            //             "cinemaid": state.cinema?.store_code,
            //             "orderid": seatLayout?.orderid,
            //             "tickettypename": state.checkout?.Price_strTicket_Type_Description,
            //             "deliverytype": "Deliver",
            //             "Concessions": listConcession?.filter((fd: any) => fd.selected == true)?.map((dt: any) => {
            //                 return {
            //                     "ItemId": dt?.id,
            //                     "Quantity": dt?.qty ?? 1,
            //                     "Name": dt?.description,
            //                     "Price": dt?.priceincents
            //                 }
            //             }),
            //         }
            //     });
            clearTimeout(interval)
            postOrderMicrosite({
                body: {
                    "sessionid": state.checkout?.sessionid,
                    "cinemaid": state.cinema?.store_code,
                    "order_id": seatLayout?.orderid,
                    "tickettypename": state.checkout?.Price_strTicket_Type_Description,
                    "deliverytype": "Deliver",
                    "concessions": listConcession?.filter((fd: any) => fd.selected == true)?.map((dt: any) => {
                        return {
                            "ItemId": dt?.id,
                            "Quantity": dt?.qty ?? 1,
                            "Name": dt?.description,
                            "Price": dt?.priceincents
                        }
                    }),
                    "detail": {
                        "name": state.user?.name,
                        "phone": state.user?.phone,
                        "email": state.user?.email
                    },
                    "note": "",
                    // "total_price": state?.setSeat?.Order?.TotalValueCents / 100,
                    "kupon": "",
                    // "subtotal": subTotal / 100,
                    // "ppn": ppn,
                    // "service_charge": serviceCharge,
                    // "packaging_cost": packagingCost,
                    // "grand_total": grandTotal,
                    // "grand_total": null,
                    "branch": state?.cinema?._id,
                    "user_id": state?.user?._id,
                    "set_selected_seat": {
                        ...state?.setSeat,
                        date: state.checkout?.date,
                        showtime: state.checkout?.showtime,
                    }
                }
            });
            setAllowedStep((prev) => prev > 2 ? prev : (prev + 1));

            dispatch({
                setSeat: {
                    ...state.setSeat,
                    ConcessionItems: listConcession
                }
            })
            setStep((prev) => (prev + 1));
        } else if (step < 3) {

            postOrderMicrosite({
                body: {
                    "sessionid": state.checkout?.sessionid,
                    "cinemaid": state.cinema?.store_code,
                    "order_id": seatLayout?.orderid,
                    "tickettypename": state.checkout?.Price_strTicket_Type_Description,
                    "deliverytype": "Deliver",
                    "concessions": listConcession?.filter((fd: any) => fd.selected == true)?.map((dt: any) => {
                        return {
                            "ItemId": dt?.id,
                            "Quantity": dt?.qty ?? 1,
                            "Name": dt?.description,
                            "Price": dt?.priceincents
                        }
                    }),
                    "detail": {
                        "name": state.user?.name,
                        "phone": state.user?.phone,
                        "email": state.user?.email
                    },
                    "note": "",
                    // "total_price": state?.setSeat?.Order?.TotalValueCents / 100,
                    "kupon": "",
                    // "subtotal": subTotal / 100,
                    // "ppn": ppn,
                    // "service_charge": serviceCharge,
                    // "packaging_cost": packagingCost,
                    // "grand_total": grandTotal,
                    // "grand_total": null,
                    "branch": state?.cinema?._id,
                    "user_id": state?.user?._id,
                    "set_selected_seat": state?.setSeat
                }
            });
        }
    }, [subTotal, step, seatLayout, allowedStep, selected, state, ppn, grandTotal]);

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
                                                        <ins className="new-price">Rp. {(item?.priceincents / 100)?.toLocaleString()}</ins>
                                                    </span>
                                                    {/* <p className="product-short-desc">
                                                        Aliquam id diam maecenas ultricies mi eget, mauris volutpat
                                                        acconsectetur adipising volutpat ac tincidunt. Vitae semper quis lectus
                                                        sceleris.
                                                    </p> */}
                                                    <div className="product-action">
                                                        <div className="product-quantity">
                                                            <button className="quantity-minus p-icon-minus-solid" onClick={() => {
                                                                if (allowedStep > 1) {
                                                                    return toast({
                                                                        title: `Order sudah terbuat, tidak dapat merubah pesanan`,
                                                                        status: 'error',
                                                                        isClosable: true,
                                                                        duration: 2000
                                                                    });
                                                                }
                                                                onChangeQtyConcession(item, item?.qty == 1 || typeof item?.qty == 'undefined' ? 1 : (item?.qty ?? 1) - 1)
                                                            }}></button>
                                                            <input className="quantity form-control" type="number" min="1"
                                                                max="1000" value={item?.qty ?? 1}
                                                                onChange={(e) => {
                                                                    if (allowedStep > 1) {
                                                                        return toast({
                                                                            title: `Order sudah terbuat, tidak dapat merubah pesanan`,
                                                                            status: 'error',
                                                                            isClosable: true,
                                                                            duration: 2000
                                                                        });
                                                                    }
                                                                    let value = e.target.value;
                                                                    onChangeQtyConcession(item, value);
                                                                }}
                                                                onBlur={(e) => {
                                                                    if (allowedStep > 1) {
                                                                        return toast({
                                                                            title: `Order sudah terbuat, tidak dapat merubah pesanan`,
                                                                            status: 'error',
                                                                            isClosable: true,
                                                                            duration: 2000
                                                                        });
                                                                    }
                                                                    let value = e.target.value;
                                                                    onChangeQtyConcession(item, value == '' ? 1 : value);
                                                                }} />
                                                            <button className="quantity-plus p-icon-plus-solid" onClick={() => {
                                                                if (allowedStep > 1) {
                                                                    return toast({
                                                                        title: `Order sudah terbuat, tidak dapat merubah pesanan`,
                                                                        status: 'error',
                                                                        isClosable: true,
                                                                        duration: 2000
                                                                    });
                                                                }
                                                                onChangeQtyConcession(item, (item?.qty ?? 1) + 1)
                                                            }}></button>
                                                        </div>
                                                        <button onClick={() => {
                                                            if (allowedStep > 1) {
                                                                return toast({
                                                                    title: `Order sudah terbuat, tidak dapat merubah pesanan`,
                                                                    status: 'error',
                                                                    isClosable: true,
                                                                    duration: 2000
                                                                });
                                                            }

                                                            let newObject = { ...item };
                                                            newObject['selected'] = !(item?.selected ?? false);
                                                            let list: any = [];
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
                    isError={seatLayoutIsError || state?.checkout == null}
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
                                    subTotal={subTotal / 100}
                                    selected={selected}
                                    setSelected={allowedStep > 0 ? () => {
                                        toast({
                                            title: `Ticket sudah terbuat, tidak dapat merubah bangku`,
                                            status: 'error',
                                            isClosable: true,
                                            duration: 2000
                                        });
                                    } : setSelected}
                                />
                                {/* );
                                    })} */}
                            </div>
                        </div>
                        {/* <div className="cart-actions mb-6 pt-6">
                                <Link href="/" className="btn btn-dim btn-icon-left mr-4 mb-4"><i
                                    className="p-icon-arrow-long-left"></i>Continue Shopping</Link>
                            </div> */}
                        {/* <div className="cart-coupon-box pt-5 pb-8">
                            <h4 className="title coupon-title text-capitalize mb-4">Coupon Discount</h4>
                            <form action="#">
                                <input type="text" name="coupon_code" className="input-text mb-6" id="coupon_code"
                                    placeholder="Enter coupon code here..." required />
                                <button type="submit" className="btn btn-dark btn-outline" style={{ backgroundColor: 'transparent' }}>Apply
                                    Coupon</button>
                            </form>
                        </div> */}
                    </>
                </SectionBuilder>
            )
                break;
        }

    }

    return (
        <main className="container order mt-7 mb-2 pb-12">
            <div className="step-by pr-4 pl-4 mb-8">
                <h3 className={`title title-step${getClassStepActive(0)}`}><a onClick={(allowedStep >= 0 && !orderMicrositeLoading) ? () => setStep(0) : handleToastStep}>1. Pilih Kursi</a></h3>
                <h3 className={`title title-step${getClassStepActive(1)}`}><a onClick={(allowedStep >= 1 && !orderMicrositeLoading) ? () => setStep(1) : handleToastStep}>2. Pilih Makanan</a></h3>
                <h3 className={`title title-step${getClassStepActive(2)}`}><a onClick={(allowedStep >= 2 && !orderMicrositeLoading) ? () => setStep(2) : handleToastStep}>3. Order</a></h3>
            </div>
            {step < 2 && (<div className="row">
                <div className="col-lg-8 col-md-12 pr-lg-6">
                    {renderStepActive()}
                </div>
                <aside className="col-lg-4 sticky-sidebar-wrapper">
                    <div className="sticky-sidebar" data-sticky-options="{'bottom': 20}">
                        <div className="summary mb-4">
                            <h3 className="summary-title">Total Pembelian</h3>
                            <table className="shipping mb-2">
                                <tbody>
                                    {state?.checkout && (<tr>
                                        <td>
                                            <br />
                                            Tiket {state?.checkout?.title} <span><i className="p-icon-times"></i> {state?.checkout?.qty}</span>

                                            <br />
                                            {moment(state?.checkout?.date).format('ll')} {state.checkout?.showtime}
                                            <br />
                                            {state?.checkout?.Price_strTicket_Type_Description}
                                            <br />
                                            {state.setSeat && (<>Kursi: {(state?.setSeat?.Order?.Sessions ?? [{}])[0]?.Tickets?.map((dt: any) => dt?.SeatData).join(', ')}</>)}

                                        </td>
                                        <td className="product-price">Rp. {(state?.checkout?.qty * state?.checkout?.price / 100)?.toLocaleString()}</td>
                                    </tr>)}
                                    {
                                        listConcession?.filter((ft: any) => ft?.selected == true)?.map((dt: any) =>
                                            <tr key={'summary-con-' + dt?.id}>
                                                <td className="product-name">{dt?.description}
                                                    {' '}<span><i className="p-icon-times"></i>
                                                        {' '}{dt?.qty ?? 1} </span>
                                                </td>
                                                <td className="product-price">Rp. {((dt?.qty ?? 1) * (dt?.priceincents / 100)).toLocaleString()}</td>
                                            </tr>
                                        )
                                    }
                                    <tr className="summary-subtotal">
                                        <td>
                                            <h4 className="summary-subtitle">Sub-total</h4>
                                        </td>
                                        <td>
                                            <p className="summary-subtotal-price">Rp. {(subTotal / 100)?.toLocaleString()}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="shipping-address">
                                {/* <label className="mb-4">Lokasi Teater *</label>
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
                                </div> */}
                                {/* <label className="mb-4">Metode Pengiriman *</label>
                                        <div className="select-box">
                                            <select name="country" className="form-control">
                                                <option>Instant</option>
                                                <option>Same Day</option>
                                                <option>Regular</option>
                                            </select>
                                        </div> */}
                            </div>
                            {/* <table className="total">
                                <tbody>
                                    <tr className="summary-subtotal">
                                        <td>
                                            <h4 className="summary-subtitle">Total</h4>
                                        </td>
                                        <td>
                                            <p className="summary-total-price ls-s">Rp. {(subTotal / 100)?.toLocaleString()}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table> */}
                            <a onClick={onBuyClick} href="#" className="btn btn-dim btn-checkout btn-block">BELI</a>
                        </div>
                    </div>
                </aside>
            </div>)}

            {step == 2 && (
                <SectionBuilder
                    loading={<CheckoutLoading />}
                    isLoading={setSeatLoading || orderMicrositeLoading}
                    isError={setSeatIsError}
                    error={<ErrorBuilder message={setSeatMessage} />}>
                    <div className="container mt-7">
                        <div className="order-message" onClick={onBuyClick}>
                            <div className="icon-box d-inline-flex align-items-center">
                                <div className="icon-box-icon mb-0">
                                    <svg xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" enableBackground="new 0 0 50 50" xmlSpace="preserve">
                                        <g>
                                            <path fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" d="
                                                    M33.3,3.9c-2.7-1.1-5.6-1.8-8.7-1.8c-12.3,0-22.4,10-22.4,22.4c0,12.3,10,22.4,22.4,22.4c12.3,0,22.4-10,22.4-22.4
                                                    c0-0.7,0-1.4-0.1-2.1"></path>
                                            <polyline fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="bevel" strokeMiterlimit="10" points="
                                                    48,6.9 24.4,29.8 17.2,22.3 	"></polyline>
                                        </g>
                                    </svg>
                                </div>
                                <h3 className="icon-box-title">Thank you. Your Order has been received.</h3>
                            </div>
                        </div>
                        <div className="order-results row cols-xl-5 cols-md-3 cols-sm-2 mt-10 pt-2 mb-4">
                            <div className="overview-item">
                                <span>Order number</span>
                                <label style={{
                                    fontSize: 14
                                }} className="font-bold">{state.orderMicrosite?.data?.add_concession_item?.OrderId}</label>
                            </div>
                            <div className="overview-item">
                                <span>Status</span>
                                <label>Pending Payment</label>
                            </div>
                            <div className="overview-item">
                                <span>Date</span>
                                <label>{moment(state.setSeat?.LastUpdated).format('ll')}</label>
                            </div>
                            <div className="overview-item">
                                <span>Email:</span>
                                <label>{state.user?.email}</label>
                            </div>
                            <div className="overview-item">
                                <span>Total:</span>
                                {/* <label>Rp. {(state?.addConcession?.TotalValueCents / 100).toLocaleString()}</label> */}
                                <label>Rp. {(grandTotal).toLocaleString()}</label>
                            </div>
                            {/* <div className="overview-item">
                                <span>Payment method:</span>
                                <label>Transfer</label>
                            </div> */}
                        </div>
                        <h2 className="detail-title mb-6">Order Details</h2>
                        <div className="order-details">
                            <table className="order-details-table">
                                <thead>
                                    <tr className="summary-subtotal">
                                        <td>
                                            <h3 className="summary-subtitle">Your Order</h3>
                                        </td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="product-subtitle">Product</td>
                                        <td></td>
                                    </tr>
                                    <tr></tr>
                                    <tr></tr>
                                    <tr>
                                        <td className="product-name">Tiket <b>{state?.checkout?.title}</b> <span><i className="p-icon-times"></i> {state?.checkout?.qty}</span>

                                            <br />
                                            <b>{moment(state?.checkout?.date).format('ll')} {state.checkout?.showtime}</b>
                                            <br />
                                            {state?.checkout?.Price_strTicket_Type_Description}
                                            <br />
                                            Kursi: <b>{(state?.setSeat?.Order?.Sessions ?? [{}])[0]?.Tickets?.map((dt: any) => dt?.SeatData).join(', ')}</b>

                                        </td>
                                        <td className="product-price">Rp. {(state?.setSeat?.Order?.TotalValueCents / 100)?.toLocaleString()}</td>
                                    </tr>
                                    {
                                        listConcession?.filter((ft: any) => ft?.selected == true)?.map((dt: any) =>
                                            <tr key={'summary-con-' + dt?.id}>
                                                <td className="product-name"><b>{dt?.description}</b>
                                                    {' '}<span><i className="p-icon-times"></i>
                                                        {' '}{dt?.qty ?? 1} </span>
                                                </td>
                                                <td className="product-price">Rp. {((dt?.qty ?? 1) * (dt?.priceincents / 100)).toLocaleString()}</td>
                                            </tr>
                                        )
                                    }
                                    <tr className="summary-subtotal">
                                        <td>
                                            <h4 className="summary-subtitle">Sub-total:</h4>
                                        </td>
                                        {/* <td className="summary-value font-weight-normal">Rp. {(state?.addConcession?.TotalValueCents / 100).toLocaleString()}</td> */}
                                        <td className="summary-value font-weight-normal">Rp. {(state.orderMicrosite?.data?.subtotal)?.toLocaleString()}</td>
                                    </tr>
                                    {/* <tr>
                                        <td className="product-name">PPN</td>
                                        <td className="product-price">Rp. {ppn?.toLocaleString()}</td>
                                    </tr> */}
                                    <tr>
                                        <td className="product-name">Service Charge</td>
                                        <td className="product-price">Rp. {serviceCharge?.toLocaleString()}</td>
                                    </tr>
                                    {/* <tr>
                                        <td className="product-name">Packaging Cost</td>
                                        <td className="product-price">Rp. {packagingCost?.toLocaleString()}</td>
                                    </tr> */}
                                    {/* <tr className="summary-subtotal">
                                        <td>
                                            <h4 className="summary-subtitle">Payment method:</h4>
                                        </td>
                                        <td className="summary-value">Transfer</td>
                                    </tr> */}
                                    <tr className="summary-subtotal">
                                        <td>
                                            <h4 className="summary-subtitle">Total:</h4>
                                        </td>
                                        <td>
                                            <p className="summary-total-price">Rp. {(grandTotal)?.toLocaleString()}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <a className={'btn btn-dim btn-checkout btn-block mt-8'} id="show-xendit" onClick={(e) => {
                        // e.preventDefault();
                        // let popup = window.open(state?.orderMicrosite?.data?.xendit?.invoice_url,
                        //     'popup', 'toolbar=0,location,status,scrollbars,resizable,width=600, height=600');
                        // var timer = setInterval(checkChild, 500);

                        // function checkChild() {
                        //     if (popup?.closed) {
                        //         clearInterval(timer);
                        //         router.push('/profile?page=orders');
                        //     }
                        // }
                        setShowModal(true);

                    }}>LIHAT CARA PEMBAYARAN</a>
                    <ModalXendit
                        isOpen={showModal}
                        data={state?.orderMicrosite?.data?.xendit}
                        onClose={() => setShowModal(false)}
                    />
                </SectionBuilder>
            )}
        </main>
    );
};

const CheckoutLoading = ({ children }: any) => {
    return (
        <Box className="w-full mt-4 mb-4">
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


const ModalXendit = ({ onClose, isOpen, data, selectedShowTime, }: any) => {
    const router = useRouter();
    const { state, dispatch } = useAppContext();
    const toast = useToast()


    return (
        <Modal onClose={onClose} size={"3xl"} isOpen={isOpen} closeOnOverlayClick>
            <ModalOverlay />
            <ModalContent className="rounded-none">
                {/* <ModalHeader className="text-center font-body">

                </ModalHeader> */}
                {/* <ModalCloseButton /> */}
                <ModalBody>
                    <iframe className="w-full h-[60rem]" src={data?.invoice_url}>
                    </iframe>
                </ModalBody>
                {/* <ModalFooter>
                    <Button
                        className="bg-orange-400 hover:bg-neutral-800 chakra-button rounded-none text-white font-body w-full"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        CHECK OUT
                    </Button>
                </ModalFooter> */}
            </ModalContent>
        </Modal>
    );
};

export default CheckoutPage;
