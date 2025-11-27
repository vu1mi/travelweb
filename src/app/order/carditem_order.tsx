"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {deleteItemcart} from "../api/booking_item/route"


interface CartItem {
  id: number;
  tourId: number;
  tourName: string;
  departureDate: number[];
  departureLocation:string;
  adultCount: number;
  childCount: number;
  infantCount: number;
  pricePerAdult: number;
  pricePerChild: number;
  pricePerInfant: number;
  subTotal: number;
}

interface SummaryProps {
  data: CartItem;
  onRefresh: () => Promise<void>;
}
export default function CardItemOrder({ data, onRefresh }: SummaryProps) {
 console.log("onRefresh received:", onRefresh)
  const tour = data
  console.log(tour);

  function formatStartDate(startDate: number[]) {
    const [year, month, day] = startDate;

    const yy = String(year).slice(-2); // 2025 -> "25"
    const mm = String(month).padStart(2, "0"); // 1 -> "01"
    const dd = String(day).padStart(2, "0"); // 15 -> "15"

    return `${yy}/${mm}/${dd}`;
  }
  async function deleteItem() {

   try {
    const res = await deleteItemcart(tour.id);
    console.log("delete", res)

    if (res.status === 200 || res.status === 204) {
       await onRefresh(); 
    }

  } catch (error) {
    console.error("Delete error:", error);
  }
  }
  return (
    <div className="flex items-start gap-4 p-4  bg-white w-full shadow-md rounded-xl ">
      {/* Ảnh tour */}
      <FontAwesomeIcon
        icon={faXmark}
        onClick={deleteItem}
        className="cursor-pointer hover:scale-125 transition-all  "
      />
      <div className="relative w-40 h-28 flex-shrink-0 overflow-hidden rounded-lg flex">
        <Image
          src="/blog-1.png" // đặt ảnh vào public/images
          alt="Tour Châu Âu Đón Noel"
          fill
          className="object-cover"
        />
      </div>

      {/* Thông tin tour */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{tour.tourName}</h2>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-medium">Mã Tour:</span> {tour.tourId}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Ngày Khởi Hành:</span>{" "}
          {formatStartDate(tour.departureDate)}
        </p>
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Khởi Hành Tại:</span>{" "}
          {tour.departureLocation}
        </p>
      </div>
      {/* Số lượng hành khách */}
      <div className="  text-sm text-gray-700 flex flex-col gap-2 mr-3 ">
        <p className="text-[18px]">Số Lượng Hành Khách</p>
        <p>
          <span className="font-medium">Người lớn:</span> {tour.adultCount} x{" "}
          <span className="text-purple-600 font-semibold">
            {tour.pricePerAdult}
          </span>
        </p>
        <p>
          <span className="font-medium">Trẻ em:</span> {tour.childCount} x{" "}
          <span className="text-purple-600 font-semibold">
            {tour.pricePerChild}
          </span>
        </p>
        <p>
          <span className="font-medium">Em bé:</span> {tour.infantCount} x{" "}
          <span className="text-purple-600 font-semibold">
            {tour.pricePerInfant}
          </span>
        </p>
      </div>
    </div>
  );
}
