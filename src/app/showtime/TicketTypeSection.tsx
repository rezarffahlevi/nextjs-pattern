import { useTicketType } from "@/services/useMovieService";
import { useEffect, useState } from "react";
import { initialState, useAppContext } from "../provider";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react";
import Image from "@/components/Loader";
import { useRouter } from "next/navigation";
import moment from "moment";


export const TicketTypeSection = ({ data, movie, selectedShowTime, setSelectedShowTime, setSelectedTicketType, selectedTicketType }: any) => {

    const { state, dispatch } = useAppContext();
    const [showModal, setShowModal] = useState(false);

    const { fetchTicketType, ticketType, ticketTypeLoading, ticketTypeError, ticketTypeIsError } = useTicketType();

    useEffect(() => {
        fetchTicketType({
            body: {
                "cinemaid": state.cinema?.store_code,
                "sessionid": data?.sessionid,
            }
        });
    }, []);


    return (
        <div>
            {
                ticketType?.TicketTypes?.map((dt: any, i: any) => {
                    return (
                        <div key={'time-' + i + dt?.sessionid + Math.random()} className={"tag cursor-pointer my-4 mb-0 min-h-14" + ((dt?.Price_strTicket_Type_Code == selectedTicketType?.Price_strTicket_Type_Code && selectedTicketType?.Session_strID == data?.sessionid) ? ' btn-dim' : '')} onClick={() => {
                            setSelectedShowTime(data);
                            setSelectedTicketType(dt);
                            setShowModal(true);

                            // setMovie((prev: any) => {
                            //     return {
                            //         ...prev,
                            //         price: parseInt(dt?.Price_intTicket_Price),
                            //         maxQty: parseInt(dt?.QuantityAvailablePerOrder),
                            //     }
                            // })
                        }}>
                            {dt?.Price_strTicket_Type_Description} - Rp. {(dt?.Price_intTicket_Price / 100).toLocaleString()}
                        </div>
                    )
                })
            }
            <ModalCart
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                data={{
                    ...movie,
                    ...data,
                    price: parseInt(selectedTicketType?.Price_intTicket_Price),
                    qty: 1,
                    maxQty: parseInt(selectedTicketType?.QuantityAvailablePerOrder),
                }}
                setSelectedTicketType={setSelectedTicketType}
                selectedTicketType={selectedTicketType}
                selectedShowTime={selectedShowTime}
                setSelectedShowTime={setSelectedShowTime}
            />
        </div>
    )
}


const ModalCart = ({ onClose, isOpen, data, selectedShowTime, setSelectedShowTime, setSelectedTicketType, selectedTicketType }: any) => {
    const router = useRouter();
    const { state, dispatch } = useAppContext();
    const toast = useToast()
    const [movie, setMovie] = useState<any>(null);

    const onChangeQty = (value: string | Number) => {
        let val = Number(value);
        val = isNaN(val) || val > movie?.maxQty || val < 1 ? movie.qty : val;
        setMovie((prev: any) => { return { ...prev, qty: value == '' ? '' : val } })
    }

    useEffect(() => {
        if (data) {
            setMovie(data);
        }
    }, [data])

    return (
        <Modal onClose={onClose} size={"md"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent className="rounded-none">
                <ModalHeader className="text-center font-body">
                    Masukkan Jumlah QTY
                </ModalHeader>
                {/* <ModalCloseButton /> */}
                <ModalBody>
                    <div className="flex mx-2">
                        <div className="basis-4/12">
                            {data != null && (
                                <Image
                                    src={data?.image ?? 'error'}
                                    alt={data?.title}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: "100%", height: "auto" }}
                                    className={"mb-4"}
                                />
                            )}
                        </div>
                        <div className="basis-8/12 justify-center pl-3">
                            <Text className="font-body my-1">{data?.title}</Text>
                            <div className="flex my-4">
                                <Text className="font-body font-semibold text-xl">
                                    Rp. {(data?.price / 100)?.toLocaleString()}
                                </Text>
                            </div>
                        </div>
                    </div>
                    <div className="product-form product-qty pt-1 mx-3">
                        <div className="product-form-group">
                            <div className="input-group text-center">
                                <button className="quantity-minus p-icon-minus-solid bg-transparent w-16" onClick={() => onChangeQty(movie?.qty == 1 ? 1 : (movie?.qty - 1))}></button>
                                <input className="quantity form-control"
                                    type="number"
                                    min="1"
                                    // defaultValue={movie?.qty}
                                    max={isNaN(movie?.maxQty) ? 1 : movie?.maxQty}
                                    value={movie?.qty ?? 1}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        onChangeQty(value);
                                    }}
                                    onBlur={(e) => {
                                        let value = e.target.value;
                                        onChangeQty(value == '' ? 1 : value);
                                    }}
                                />
                                <button className="quantity-plus p-icon-plus-solid bg-transparent w-16" onClick={() => onChangeQty(movie?.qty + 1)}></button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="bg-orange-400 hover:bg-neutral-800 chakra-button rounded-none text-white font-body w-full"
                        onClick={() => {

                            if (selectedShowTime && selectedTicketType) {
                                if (state.token) {
                                    dispatch({
                                        checkout: {
                                            ...movie, ...selectedShowTime, ...selectedTicketType, date: moment().format('YYYY/MM/DD'), imageurl: movie?.imageurl
                                        },
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
                                    router.push('/checkout');
                                } else {
                                    toast({
                                        title: `Silahkan login terlebih dahulu`,
                                        status: 'error',
                                        isClosable: true,
                                    });
                                    document.getElementById('login-icon')?.click();
                                }
                            } else {
                                toast({
                                    title: `Pilih ${selectedShowTime ? `type ticket` : `jam tayang`} terlebih dahulu`,
                                    status: 'error',
                                    isClosable: true,
                                })
                            }
                            onClose();
                        }}
                    >
                        CHECK OUT
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};