import { useTicketType } from "@/services/useMovieService";
import { useEffect } from "react";
import { useAppContext } from "../provider";
import moment from "moment";


export const TicketTypeSection = ({ data }: any) => {

    const { state, dispatch } = useAppContext();
    const { fetchTicketType, ticketType, ticketTypeLoading, ticketTypeError, ticketTypeIsError } = useTicketType();

    useEffect(() => {
        fetchTicketType({
            body: {
                "cinemaid": state.cinema?.id,
                "sessionid": data?.sessionid,
            }
        });
    }, []);

    return (
        <div>
            {
                ticketType?.TicketTypes?.map((dt: any, i: any) => {
                    return (
                        <div key={'time-' + i + dt?.sessionid + Math.random()} className={"tag cursor-pointer my-4 mb-0 h-14" + (dt?.sessionid == 'selectedShowTime?.sessionid' ? ' btn-dim' : '')} onClick={() => { }}>
                            {dt?.Price_strTicket_Type_Description} - Rp. {(dt?.Price_intTicket_Price / 100).toLocaleString()}
                        </div>
                    )
                })
            }
        </div>
    )
}