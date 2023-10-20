"use client";

import { useRouter } from "next/navigation";
import { initialState, useAppContext } from "../provider";
// import showTime from './showtime.json';
import { TicketTypeSection } from "./TicketTypeSection";
import { useShowTime } from "@/services/useMovieService";
import { useEffect, useState } from "react";
import moment from "moment";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";

export const ShowtimePage = () => {
    const router = useRouter();
    const { state, dispatch } = useAppContext();
    const { fetchShowTime, showTime, showTimeLoading, showTimeError, showTimeIsError } = useShowTime();
    const toast = useToast()

    const [selectedShowTime, setSelectedShowTime] = useState<any>(null);
    const [selectedTicketType, setSelectedTicketType] = useState<any>(null);
    const [date, setDate] = useState<any>(moment().format('YYYY/MM/DD'));
    let init = true;

    useEffect(() => {
        if (state.cinema && state.cinema.store_code) {
            const payload = {
                // Masukkan _id dari state.cinema ke dalam cinemaid
                cinemaid: state.cinema.store_code,
                showdate: moment(date).format('YYYY/MM/DD'),
            };
    
            // Kemudian kirim payload ke API
            fetchShowTime({
                body: payload,
            });
        }
    }, [date, state.cinema]); 

    const movieList = () => {
        let list = (showTime?.moviecinemascreen ?? []);
        if (state.search != '')
            list = list.filter((ft: any) => ft?.title?.toLowerCase()?.includes(state.search));
        return list;
    }

    return (
        <main className="main account-page">
            <div className="page-header" style={{ backgroundColor: '#f9f8f4' }}>
                <h1 className="page-title text-4xl">Show Time</h1>
            </div>
            <div className="page-content mt-4 mb-10 pb-6">
                <div className="container">
                    <div className="tab tab-vertical gutter-lg">
                        <div className="tab-content col-lg-9 col-md-8"><div className="product-form product-unit mb-2 pt-1 flex">
                            <input type="date" value={date?.replaceAll('/', '-')} onChange={(e) => {
                                let value = e.target.value;
                                if (moment(value).isBefore(moment(), 'D')) {
                                    toast({
                                        title: `Tidak bisa memilih tanggal sebelumnya`,
                                        status: 'error',
                                        isClosable: true,
                                    })
                                } else {
                                    setDate(moment(value).format('YYYY/MM/DD'));
                                }
                            }} className="inputan mr-2 h-14" style={{
                                fontWeight: 'bold',
                                fontSize: '1.4rem',
                                color: 'black',
                            }} />
                        </div>
                            <div className="tab-pane active" id="orders">
                                <table className="order-table">
                                    <thead>
                                        <tr>
                                            <th>Movie</th>
                                            <th>Location</th>
                                            <th>Showtime</th>
                                            {/* <th>Type</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {showTimeLoading && (
                                            <tr>
                                                <td className="order-number">Loading...</td>
                                                <td className="order-number"></td>
                                                <td className="order-number"></td>
                                            </tr>
                                        )}
                                        {!showTimeLoading && movieList()?.length > 0 ? (
                                            movieList()?.map((dt: any, i: any) => {
                                                return (
                                                    <tr key={'order-' + i}>
                                                        <td className="order-number"><Link href={`movies/${dt?.scheduledfilmid}`}><b>{dt?.title}</b></Link></td>
                                                        <td className="order-date"><span>{dt?.cinemaname}{'\n'}{dt?.screenname}</span></td>
                                                        <td className="order-status">
                                                            {
                                                                dt?.sessionlist?.map((time: any, j: any) => {
                                                                    return (
                                                                        <div
                                                                            className="flex"
                                                                            style={{
                                                                                paddingBottom: 14,
                                                                                paddingTop: 6,
                                                                                borderBottomWidth: (j < dt?.sessionlist?.length - 1) ? 1 : 0,
                                                                            }}
                                                                            key={'time-' + i + time?.sessionid}
                                                                        >
                                                                            <div
                                                                                className="w-[200px]"
                                                                            >
                                                                                <div className={`tag cursor-pointer my-4 mb-0 text-[1.4rem] ${time?.sessionid == selectedShowTime?.sessionid ? 'btn-dim' : ''}`} onClick={() => { setSelectedShowTime(time); setSelectedTicketType(null) }}
                                                                                style={{
                                                                                    marginRight: '200px'
                                                                                }}>
                                                                                    {time?.showtime}
                                                                                </div>
                                                                            </div>

                                                                            <TicketTypeSection
                                                                                data={time}
                                                                                movie={dt}
                                                                                setSelectedTicketType={setSelectedTicketType}
                                                                                selectedTicketType={selectedTicketType}
                                                                                selectedShowTime={selectedShowTime}
                                                                                setSelectedShowTime={setSelectedShowTime}
                                                                            />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        ) : !showTimeLoading ?  (
                                            <tr>
                                                <td className="order-number">No Movies in Here</td>
                                                <td className="order-number"></td>
                                                <td className="order-number"></td>
                                            </tr>
                                        ) : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >

    )
}