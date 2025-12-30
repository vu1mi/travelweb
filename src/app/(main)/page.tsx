"use client";
import LayoutSearch from "@/components/search/layoutsearch";
import SliceVoucher from "@/components/home-component/slice-voucher";
import TourIn from "@/components/home-component/frame-tour-in";
import Image from "next/image";
import TourOut from "@/components/home-component/frame-tour-out";
import NewInfor from "@/components/home-component/new-infor";

import { use, useEffect } from "react";
import Loading from "@/app/loading";

export default function Home() {
  return (
    <>
      <LayoutSearch />
      <SliceVoucher />
      <TourIn />
      <div className="mt-16 lg:mt-20 flex justify-center px-4">
        <Image
          src={"/banner-4.png"}
          alt="Banner-4"
          width={1280}
          height={500}
          className="object-cover w-full max-w-4xl h-auto rounded-lg"
        />
      </div>
      <TourOut />
      <div className="mt-16 lg:mt-20 flex justify-center px-4">
        <Image
          src={"/banner-5.png"}
          alt="Banner-5"
          width={1280}
          height={500}
          className="object-cover w-full max-w-4xl h-auto rounded-lg"
        />
      </div>
      <NewInfor />
    </>
  );
}
