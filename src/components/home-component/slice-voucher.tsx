"use client";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import Image from "next/image";
export default function SliceVoucher() {
  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#4502c7] font-bold text-center">
        Khuyến Mại Bùng Nổ - Đánh Tan Nóng Bức
      </h1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={800}
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="mt-8"
      >
        <SwiperSlide>
          <div className="flex justify-center">
            <Image src="/banner-1.png" alt="banner-1" width={400} height={270} className="w-full max-w-sm h-auto" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center">
            <Image src="/banner-2.png" alt="banner-2" width={400} height={270} className="w-full max-w-sm h-auto" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center">
            <Image src="/banner-3.png" alt="banner-3" width={400} height={270} className="w-full max-w-sm h-auto" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center">
            <Image src="/banner-2.png" alt="banner-2" width={400} height={270} className="w-full max-w-sm h-auto" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
