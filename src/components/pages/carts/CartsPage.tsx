"use client";

import { useAppContext } from "@/app/provider";
import Image from "@/components/molecules/Loader";
import { SectionBuilder } from "@/components/templates/Container/SectionBuilder";
import { useListMovie } from "@/services/useMovieService";
import { textToSlug } from "@/utils/utils";
import {
  Button,
  Divider,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const CartsPage = () => {
  const { fetchListMovie, listMovie, listMovieLoading, listMovieIsError } =
    useListMovie();
  const [detail, setDetail] = useState<any>(null);
  const [showModalCart, setShowModalCart] = useState<boolean>(false);
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


  return (
    <main className="flex min-h-screen flex-col items-center">
      <SectionBuilder
        loading={<>loading</>}
        isLoading={false}
        isError={false}
      >
        <div className="w-full items-center justify-between">
          
          
        </div>
      </SectionBuilder>
    </main>
  );
};

export default CartsPage;