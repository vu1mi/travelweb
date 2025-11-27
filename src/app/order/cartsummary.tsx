"use client";

import Link from "next/link";
import {  useMemo} from "react";
import CardItemOrder from "@/app/order/carditem_order";

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
  data: CartItem[] | null;
  onRefresh: () => Promise<void>;
}

export default function CartSummary( { data, onRefresh }: SummaryProps) {
  const discount = 0;
  // const list = data ?? [];

  console.log("log data", data);
  console.log("log re", onRefresh);

  const total = useMemo(() => {
    return (
      data?.reduce((sum: number, item: CartItem) => sum + item.subTotal, 0) ?? 0
    );
  }, [data]);
  const finaltotal = useMemo(() => {
    return total - discount;
  }, [total, discount]);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-sm mt-6 ">
      {/* Header */}
      <div className="">
        <div className="flex justify-between items-center border-b pb-4 mb-4 ">
          <h2 className="text-xl font-bold text-purple-700">Giỏ Hàng</h2>
          <Link
            href="/"
            className="text-gray-500 hover:text-purple-600 text-sm flex items-center gap-1"
          >
            Quay lại mua hàng →
          </Link>
        </div>
        
        <div className="flex flex-col gap-10">
          { (data && data.length !== 0) ? data?.map((item) => (
            <CardItemOrder data={item} key={item.id} onRefresh={onRefresh}/>
          )) : <div className="h-[200px] flex justify-center items-center text-3xl text-blue-700 ">Chưa có tour nào</div>}
        </div>
      </div>

      <hr className="my-4" />

      {/* Mã giảm giá */}
      <div className="flex gap-2 mb-6 ">
        <input
          type="text"
          placeholder="Nhập mã giảm giá"
          // onChange={(e) => setDiscountCode(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 outline-none focus:border-purple-500"
        />
        <button
          // onClick={}
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-medium"
        >
          Nhập mã
        </button>
      </div>

      {/* Tổng tiền */}
      <div className="space-y-1 text-gray-700 text-sm max-w-5xl">
        <div className="flex justify-between">
          <span>Tổng tiền:</span>
          <span>{total.toLocaleString("vi-VN")} đ</span>
        </div>
        <div className="flex justify-between">
          <span>Giảm:</span>
          <span className="text-red-600">
            -{discount.toLocaleString("vi-VN")} đ
          </span>
        </div>
        <div className="flex justify-between font-bold text-lg text-purple-700 mt-2">
          <span>Thanh toán:</span>
          <span>{finaltotal.toLocaleString("vi-VN")} đ</span>
        </div>
      </div>
    </div>
  );
}
