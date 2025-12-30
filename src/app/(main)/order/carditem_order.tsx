"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {deleteItemcart} from "../../api/booking_item/route"
import { useRouter } from "next/navigation";


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
  const route = useRouter()
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

  const routeTour=()=>{
    route.push(`/order/${tour.tourId}`)
  }
  console.log("tour in card item", tour)
  return (
    <div onClick={routeTour} className="flex items-start gap-4 p-4  bg-white w-full shadow-md rounded-xl hover:translate-[-2px] ">
      <FontAwesomeIcon
        icon={faXmark}
        onClick={deleteItem}
        className="cursor-pointer hover:scale-125 transition-all  "
      />

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
