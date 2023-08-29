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
  CloseButton,
  Divider,
  HStack,
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

  return (
    <main className="flex min-h-screen flex-col items-center">
      <SectionBuilder loading={<>loading</>} isLoading={false} isError={false}>
        <div className="w-full md:flex">
          <div className="basis-8/12 items-center justify-between">
            {state.carts?.map((dt: any, i: any) => {
              return (
                <div className="m-4" key={"cart" + i}>
                  <div className="md:flex items-center basis-6/12 justify-between">
                    <div className="flex max-sm:basis-12/12 basis-7/12 justify-between items-center">
                      <div className="basis-4/12 md:basis-2/12">
                        {dt != null && (
                          <Image
                            src={dt?.image}
                            alt={dt?.title}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                          />
                        )}
                      </div>
                      <div className="md:flex basis-8/12 mx-8 md:basis-10/12 justify-between">
                        <Text className="font-body my-1">{dt?.title}</Text>
                        <Text className="font-body font-semibold text-xl ml-4">
                          Rp. {dt?.price?.toLocaleString()}
                        </Text>
                      </div>
                    </div>
                    <div className="flex mt-4 basis-5/12 justify-between">
                      <VStack>
                        <HStack maxW="140px" borderWidth={1} className="h-10">
                          <Button
                            onClick={() =>
                              updateCarts(dt, { qty: dt?.qty - 1 })
                            }
                            isDisabled={dt?.qty <= 1}
                          >
                            -
                          </Button>
                          <Input
                            value={dt?.qty}
                            onChange={(e) => {
                              let val = parseInt(e.target.value);
                              // console.log(val);
                              if (typeof val == "number")
                                updateCarts(dt, { qty: val });
                            }}
                            step={1}
                            min={1}
                            max={dt?.stock}
                            className="border-none px-1 text-center"
                            focusBorderColor="transparent"
                          />
                          <Button
                            onClick={() =>
                              updateCarts(dt, { qty: parseInt(dt?.qty) + 1 })
                            }
                            isDisabled={dt?.qty >= dt?.stock}
                          >
                            +
                          </Button>
                        </HStack>
                        <Text className="self-start">*Stok = {dt?.stock}</Text>
                      </VStack>
                      <Text className="font-body mx-2 font-semibold text-xl">
                        Rp. {(dt?.qty * dt?.price)?.toLocaleString()}
                      </Text>
                      <CloseButton
                        variant="outline"
                        colorScheme="facebook"
                        aria-label="Done"
                        fontSize="20px"
                        onClick={() => {
                          let carts = [...state.carts];
                          let index = carts.findIndex((e) => e.id == dt?.id);
                          if (index >= 0) {
                            carts.splice(index, 1);
                          }
                          dispatch({ carts: carts });
                        }}
                      />
                    </div>
                  </div>
                  <Text className="mt-2 text-xs">
                    Time Remaining to complete booking - 09.51
                  </Text>
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
                  <Text>
                    Rp. {state.carts?.length < 1 ? 0 : state.carts?.reduce((a: any, b:any) => (a.price * a.qty) + (b.price * b.qty), 0)?.toLocaleString()}
                  </Text>
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

export default CartsPage;
