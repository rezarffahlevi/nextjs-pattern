"use client";

import { useAppContext } from "@/app/provider";
import Image from "@/components/molecules/Loader";
import { SectionBuilder } from "@/components/templates/Container/SectionBuilder";
import { useListMovie } from "@/services/useMovieService";
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
import { useState } from "react";
import { MdClose } from "react-icons/md";

const CartsPage = () => {
  const { fetchListMovie, listMovie, listMovieLoading, listMovieIsError } =
    useListMovie();
  const { state, dispatch } = useAppContext();

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 996,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

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
    <main className="flex min-h-screen flex-col items-center">
      <SectionBuilder loading={<>loading</>} isLoading={false} isError={false}>
        <div className="w-full md:flex">
          <div className="basis-8/12 items-center justify-between">
            {state.carts?.map((item: any, i: any) => {
              return (
                <div className="m-4 mb-14" key={"cart" + i}>
                  <div className="md:flex items-center basis-6/12 justify-between">
                    <div className="flex max-sm:basis-12/12 basis-7/12 justify-between items-center">
                      <div className="basis-4/12 md:basis-2/12">
                        {item != null && (
                          <Image
                            src={item?.image}
                            alt={item?.title}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                          />
                        )}
                      </div>
                      <div className="md:flex basis-8/12 mx-8 md:basis-10/12 justify-between">
                        <Text className="font-body my-1">{item?.title}</Text>
                        <Text className="font-body font-semibold text-xl ml-4">
                          Rp. {item?.price?.toLocaleString()}
                        </Text>
                      </div>
                    </div>
                    <div className="flex mt-4 basis-5/12 justify-between">
                      <VStack>
                        <HStack maxW="140px" borderWidth={1} className="h-10">
                          <Button
                            onClick={() =>
                              updateCarts(item, { qty: item?.qty - 1 })
                            }
                            isDisabled={item?.qty <= 1}
                          >
                            -
                          </Button>
                          <Input
                            value={item?.qty}
                            onChange={(e) => {
                              let val = parseInt(e.target.value);
                              // console.log(val);
                              if (typeof val == "number")
                                updateCarts(item, { qty: val });
                            }}
                            step={1}
                            min={1}
                            max={item?.stock}
                            className="border-none px-1 text-center"
                            focusBorderColor="transparent"
                          />
                          <Button
                            onClick={() =>
                              updateCarts(item, {
                                qty: parseInt(item?.qty) + 1,
                              })
                            }
                            isDisabled={item?.qty >= item?.stock}
                          >
                            +
                          </Button>
                        </HStack>
                        <Text className="self-start text-sm">
                          *Stok = {item?.stock}
                        </Text>
                      </VStack>
                      <Text className="font-body mx-2 font-semibold text-xl">
                        Rp. {(item?.qty * item?.price)?.toLocaleString()}
                      </Text>
                      <CloseButton
                        variant="outline"
                        colorScheme="facebook"
                        aria-label="Done"
                        fontSize="20px"
                        onClick={() => {
                          let carts = [...state.carts];
                          let index = carts.findIndex((e) => e.id == item?.id);
                          if (index >= 0) {
                            carts.splice(index, 1);
                          }
                          dispatch({ carts: carts });
                        }}
                      />
                    </div>
                  </div>
                  <Text className="mt-6 mb-4 text-sm font-bold text-gray-600">
                    Time Remaining to complete booking - 09.51
                  </Text>
                  <Card>
                    <CardBody className="flex justify-between overflow-auto">
                      <span className="self-center font-bold mr-4 text-sm">
                        Tickets
                      </span>
                      <div className="max-md:px-6 max-md:min-w-[10rem]">
                        <p className="text-xs">Movie</p>
                        <span className="font-bold text-sm">{item?.title}</span>
                      </div>
                      <div className="max-md:px-6 max-md:min-w-[10rem]">
                        <p className="text-xs">When</p>
                        <span className="font-bold text-sm">
                          {new Date().toDateString()}
                        </span>
                      </div>
                      <div className="max-md:px-6 max-md:min-w-[10rem]">
                        <p className="text-xs">Location</p>
                        <span className="font-bold text-sm">
                          FLIX - PIK AVENUE
                        </span>
                      </div>
                      <div className="max-md:px-6 max-md:min-w-[10rem]">
                        <p className="text-xs">Ticket Amount</p>
                        <span className="font-bold text-sm">{item?.qty}</span>
                      </div>
                      <div className="max-md:px-6 max-md:min-w-[10rem]">
                        <p className="text-xs">Class</p>
                        <span className="font-bold text-sm">PLATINUM S</span>
                      </div>
                      <div className="max-md:px-6 max-md:min-w-[14rem]">
                        <span className="text-xs">
                          Ticket Total : <span className="font-bold">Rp. {subTotal?.toLocaleString()}</span>
                        </span>
                        <p className="font-bold text-yellow-500 text-sm">
                          Ticket Summary
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="bg-gray-500 my-4">
                    <CardBody className="flex">
                      <span className="text-md mr-4 font-bold text-white">
                        SEAT
                      </span>
                      <span className="text-md font-bold text-white">
                        Please Select Seat
                      </span>
                    </CardBody>
                  </Card>
                  <div className="md:flex w-full">
                    <Card className="basis-12/12 md:basis-5/12">
                      <CardBody>
                        <div className="flex justify-between">
                          <span className="text-sm font-semibold text-gray-600">
                            Your Seat
                          </span>
                          <Checkbox
                            size={"lg"}
                            className="mr-12"
                            borderColor={"black"}
                            bgColor={"yellow.400"}
                            readOnly
                          ></Checkbox>
                        </div>

                        <div className="mt-6 flex justify-between">
                          <span className="text-sm font-semibold text-gray-600">
                            Available Seats
                          </span>
                          <Checkbox
                            size={"lg"}
                            className="mr-12"
                            borderColor={"black"}
                            readOnly
                          ></Checkbox>
                        </div>

                        <div className="mt-6 flex justify-between">
                          <span className="text-sm font-semibold text-gray-600">
                            Taken Seats
                          </span>
                          <Checkbox
                            size={"lg"}
                            className="mr-12"
                            borderColor={"silver"}
                            bgColor={"silver"}
                            readOnly
                          ></Checkbox>
                        </div>

                        <div className="mt-6 flex justify-between">
                          <span className="text-sm font-semibold text-gray-600">
                            Wheel Chair
                          </span>
                          <Checkbox
                            size={"lg"}
                            className="mr-12"
                            borderColor={"yellow.300"}
                            readOnly
                          ></Checkbox>
                        </div>

                        <div className="mt-6 flex justify-between">
                          <span className="text-sm font-semibold text-gray-600">
                            Companion
                          </span>
                          <Checkbox
                            size={"lg"}
                            className="mr-12"
                            borderColor={"blue.400"}
                            readOnly
                          ></Checkbox>
                        </div>

                        <div className="mt-6 flex justify-between">
                          <span className="text-sm font-semibold text-gray-600">
                            Housed
                          </span>
                          <Checkbox
                            size={"lg"}
                            className="mr-12"
                            borderColor={"green"}
                            bgColor={"green"}
                            readOnly
                          ></Checkbox>
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
                        <div className="mx-3 mt-6 py-1 rounded-md text-sm text-center bg-gray-500 text-white font-body font-bold">
                          SCREEN
                        </div>
                      </div>
                      <div className="basis-7/12 relative max-md:pt-8 max-md:pb-8">
                        <Button
                          variant={"solid"}
                          className="bg-yellow-300 hover:bg-neutral-800 h-10 chakra-button rounded-none text-white font-body text-bold absolute bottom-0 right-0"
                        >
                          NEXT
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Accordion className="basis-4/12" defaultIndex={[0]} allowMultiple>
            <AccordionItem borderWidth={1} className="mt-4" id="accordion-1">
              <h2>
                <AccordionButton className="relative">
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="font-body"
                  >
                    Total Pembelian
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="pt-8">
                <Divider />
                <div className="my-4 flex justify-between">
                  <Text>Subtotal</Text>
                  <Text>Rp. {subTotal?.toLocaleString()}</Text>
                </div>
                <Divider />
                <Text className="mt-4">Lokasi Teater *</Text>
                <Input variant="flushed" placeholder="FLIX PIK AVENUE" />

                <Text className="mt-4">Metode Pengiriman *</Text>
                {/* <Input
                  variant="flushed"
                  list="shipping"
                  placeholder="Pilih Pengiriman"
                /> */}
                <Select variant="flushed" id="shipping">
                  <option>Instant</option>
                  <option>Same Day</option>
                  <option>Regular</option>
                </Select>
                <button className="bg-neutral-600 hover:bg-neutral-800 h-10 chakra-button rounded-none text-white font-body text-bold mt-4 w-full">
                  BELI
                </button>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </SectionBuilder>
    </main>
  );
};

const renderSeat = (col: string) => {
  let element = [];
  element.push(<span className="mx-2 text-gray-500">{col}</span>);
  for (let index = 0; index < 6; index++) {
    let seatDivider = index % 2 == 1;
    let mr = seatDivider ? " mr-6" : "";
    element.push(
      <Checkbox
        size={"lg"}
        borderColor={"black"}
        className={"mx-[1px]" + mr}
      ></Checkbox>
    );
  }
  element.push(<span className="mx-2 ml-[-0.8rem] text-gray-500">{col}</span>);
  return element;
};

export default CartsPage;
