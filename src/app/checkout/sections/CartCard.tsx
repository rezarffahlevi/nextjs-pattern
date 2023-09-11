import { useAppContext } from "@/app/provider";
import Image from "@/components/Loader";
import { deleteCart, updateCarts } from "@/components/NavBar/NavBar";
import { useSeatLayout, useShowTime, useTicketType } from "@/services/useMovieService";
import { Button, Card, CardBody } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";


export const CartCard = ({ movie, subTotal }: any) => {
    const { state, dispatch } = useAppContext();
    const [selected, setSelected] = useState<any>([]);
    const [selectedShowTime, setSelectedShowTime] = useState<any>(null);
    const [selectedTicketType, setSelectedTicketType] = useState<any>(null);

    const { fetchShowTime, showTime, showTimeLoading, showTimeError, showTimeIsError } = useShowTime();
    const { fetchTicketType, ticketType, ticketTypeLoading, ticketTypeError, ticketTypeIsError } = useTicketType();
    const { fetchSeatLayout, seatLayout, seatLayoutLoading, seatLayoutError, seatLayoutIsError } = useSeatLayout();

    let init = true;

    useEffect(() => {
        if (movie && init) {
            init = false;
            fetchShowTime({
                body: {
                    "scheduledFilmId": movie?.scheduledfilmid,
                    "cinemaid": state.cinema?.id,
                    "showdate": "2023/09/10",
                }
            });
        }
    }, []);

    useEffect(() => {
        if (selectedShowTime) {
            fetchTicketType({
                body: {
                    "cinemaid": state.cinema?.id,
                    "sessionid": selectedShowTime?.sessionid,
                }
            });
        }
    }, [selectedShowTime]);

    useEffect(() => {
        if (selectedTicketType) {
            fetchSeatLayout({
                body: {
                    "cinemaid": state.cinema?.id,
                    "sessionid": selectedTicketType?.Session_strID,
                    "areacategorycode": selectedTicketType?.AreaCat_strCode,
                    "tickettypecode": selectedTicketType?.Price_strTicket_Type_Code,
                    "ticketprice": selectedTicketType?.Price_intTicket_Price,
                    "ticketqty": selectedTicketType?.PPack_intQuantity,
                    "filmid": movie?.scheduledfilmid,
                    "filmname": movie?.title,
                    "cinemaname": selectedShowTime?.cinemaname,
                    "screenname": selectedShowTime?.screenname,
                    "sessiondatetime": `2023/09/10 ${selectedShowTime?.showtime}`,
                    "guestemail": "email-that-did-not-exist@mimin.io",
                }
            });
        }
    }, [selectedTicketType]);

    return (
        <div className="mb-6">
            <div className="flex w-full items-center">
                <div className="product-thumbnail basis-1/12">
                    <figure>
                        <Link href={"/movies/" + movie?.scheduledfilmid}>
                            {movie?.imageurl && (
                                <Image
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

            <div className="widget-body mt-1">
                <span className="self-center font-bold mr-4 text-[14px]">
                    Jam Tayang
                </span>
                {
                    showTime?.moviecinemascreen?.map((dt: any, i: any) => {
                        return (
                            <div key={'time-' + i + dt?.sessionid} className={"tag cursor-pointer" + (dt?.sessionid == selectedShowTime?.sessionid ? ' btn-dim' : '')} onClick={() => { setSelectedShowTime(dt); setSelectedTicketType(null) }}>
                                {dt?.showtime}
                            </div>
                        )
                    })
                }
            </div>

            <div className="widget-body mt-2">
                <span className="self-center font-bold mr-4 text-[14px]">
                    Ticket Type
                </span>

                {
                    ticketType?.TicketTypes?.map((dt: any, i: any) => {
                        return (
                            <div key={'type-' + i + dt?.Price_strTicket_Type_Code} className={"tag cursor-pointer" + (dt?.Price_strTicket_Type_Code == selectedTicketType?.Price_strTicket_Type_Code ? ' btn-dim' : '')} onClick={() => setSelectedTicketType(dt)}>
                                {dt?.Price_strTicket_Type_Description}
                            </div>
                        )
                    })
                }
                {
                    ticketType?.TicketTypes?.length < 1 ? 'Kosong' : selectedShowTime ? '' : 'Pilih jam tayang terlebih dahulu'
                }
            </div>
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
                                    {renderSeat(col, selected, setSelected)}
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
    )
}

const renderSeat = (col: string, selected: any, setSelected: any) => {
    let element = [];
    element.push(<span className="w-[2.5rem] text-gray-500" key={'span' + col}>{col}</span>);
    for (let index = 0; index < 6; index++) {
        let seatDivider = index % 2 == 1;
        let mr = seatDivider ? " mr-6" : "";
        element.push(
            <input
                className={"custom-checkbox mx-[1px]" + mr}
                key={'cbx-' + index}
                type="checkbox"
                onClick={() => setSelected((prev: any) => {
                    let newState = [...prev]
                    let i = newState.indexOf(`${col}${index}`);
                    if (i >= 0) {
                        newState.splice(i, 1);
                    } else {
                        newState.push(`${col}${index}`);
                    }
                    return newState;
                })}
                style={{ borderColor: '#54524d', borderWidth: 1.5, backgroundColor: selected.includes(`${col}${index}`) ? 'rgb(253 224 71' : 'transparent' }}
                checked={false}
                onChange={() => { }}
            />
        );
    }
    element.push(<span className="w-[2.5rem] ml-[-1rem] text-gray-500" key={'span-' + col}>{col}</span>);
    return element;
};