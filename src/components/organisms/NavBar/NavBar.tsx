"use client";

import Image from "next/image";
import { IconType, IconBase } from "react-icons";
import { AiOutlineSearch, AiFillApple } from "react-icons/ai";
import { BsBag, BsFillTelephoneFill } from "react-icons/bs";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { MdLocationOn, MdList } from "react-icons/md";
import { PiCaretDownThin } from "react-icons/pi";
import { CImages } from "@/constants/CImages";
import Link from "next/link";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FilterSection } from "@/components/pages/home/sections/FilterSection";

export const navOptions: { name: string; link?: string }[] = [
  {
    name: "BERANDA",
    link: "/",
  },
  {
    name: "TENTANG KAMI",
    link: "/about",
  },
  {
    name: "HUBUNGI KAMI",
    link: "/contact",
  },
];

const topRow = () => {
  return (
    <div className="hidden md:block w-full border-b-[1px] border-slate-300">
      <div className="flex sm2:hidden w-full justify-center items-center gap-1 px-4">
        <BsFillTelephoneFill
          size={16}
          className="cursor-pointer m-2 text-slate-500"
        />
        <Text className="text-xs text-slate-500 font-body">083891292322</Text>
        <MdLocationOn size={16} className="cursor-pointer m-2 text-slate-500" />
        <Text className="text-xs text-slate-500 font-body">
          Agung Sedayu Group. We are at PIK Avenue, Grand Galaxy Park, Mall of
          Indonesia and Ashta District 8.
        </Text>
      </div>
    </div>
  );
};

const NavBar = () => {
  const pathname = usePathname();
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  return (
    <div className="sticky max-md:top-[0rem] top-[-2.4rem] z-30 w-full justify-center">
      {/* <div className="sticky top-[0] z-30 h-24"> */}
      {topRow()}
      <div
        className="flex min-h-min py-6 px-4 z-30 w-full justify-center
                    border-b-[1px] border-slate-300
                    text-[.74rem] bg-white"
      >
        {/* <div className="flex flex-col h-full w-full max-w-[1050px]"> */}
        <div className="flex flex-col h-full w-full">
          <div className="flex-[0.5] flex items-center px-5 justify-between">
            {/* <div className="mt-[-10px]"> */}
            <div className="flex">
              <Button
                variant={"unstyled"}
                className="hidden max-md:block rounded-none mr-2 ml-[-1.2rem]"
                onClick={() => setShowBottomSheet(true)}
              >
                <MdList size={24} />
              </Button>
              <MyDrawer
                show={showBottomSheet}
                onClose={() => setShowBottomSheet(false)}
              />
              <div className="w-[5rem]">
                <Image
                  src={CImages.logo}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  alt="logo flix"
                />
              </div>
            </div>
            {/* </div> */}

            <div className="justify-center hidden md:block">
              {navOptions.map((dt, i) => (
                <Link
                  key={"nav-" + i}
                  href={dt.link ?? "/"}
                  className="mx-4 px-1 py-1 text-sm"
                  style={
                    dt.link == pathname
                      ? {
                          borderBottom: "3px solid #facc15",
                        }
                      : {}
                  }
                >
                  <Text as="b" className="font-body">
                    {dt.name}
                  </Text>
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3 md2:gap-5 cursor-pointer max-md:mr-[-1.2rem]">
              <BsBag size={18} className="flex md2:hidden " />
              <div className="relative top-[-10px] left-[-12px] bg-orange-400 h-5 w-5 flex text-center items-center justify-center rounded-full">
                <Text as={"b"} className="text-white mt-[1px] font-body">
                  0
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IMyDrawer {
  show: boolean;
  onClose?: any;
  onOpen?: any;
}

const MyDrawer = ({
  show = false,
  onClose: onCloseDrawer,
  onOpen: onOpenDrawer,
}: IMyDrawer) => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (show) {
      onOpen();
      if (onOpenDrawer) onOpenDrawer();
    }
  }, [show]);

  return (
    <>
      <Drawer
        placement={"left"}
        onClose={() => {
          onClose();
          if (onCloseDrawer) onCloseDrawer();
        }}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <Stack className="hidden max-sm:block" direction={["column"]}>
              {navOptions.map((dt, i) => (
                <div className="my-4" key={"nav-xs-" + i}>
                  <Link
                    href={dt.link ?? "/"}
                    // onClick={() => onClose() + onCloseDrawer()}
                    className="px-1 py-1 text-sm"
                    style={
                      dt.link == pathname
                        ? {
                            borderBottom: "3px solid #facc15",
                          }
                        : {}
                    }
                  >
                    <Text as="b">{dt.name}</Text>
                  </Link>
                </div>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBar;
