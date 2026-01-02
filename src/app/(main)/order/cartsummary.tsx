"use client";

import Link from "next/link";
import {  useMemo, useState} from "react";
import CardItemOrder from "@/app/(main)/order/carditem_order";
import { set } from "zod";
import { toast } from "sonner";

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
  bookingid?: number;
}

export default function CartSummary( { data, onRefresh,bookingid }: SummaryProps) {
  const [discount,setDiscount] = useState<number>(0)
  const [discountcode,setDiscountCode] = useState<string>()
  const [discountType,setDiscountType] = useState<string>("")


  const total = useMemo(() => {
    return (
      data?.reduce((sum: number, item: CartItem) => sum + item.subTotal, 0) ?? 0 
    );
  }, [data]);
  const finaltotal = useMemo(() => {
    switch (discountType) {
      case "PERCENTAGE":
        return total - total * (discount / 100)
      case "FIXED_AMOUNT":
        return total - discount
      default:
        return total
    }
  }, [total, discount]);

      


  const hadlediscount = async()=>{
    try{ const data = await fetch(`http://localhost:8088/api/vouchers/bookings/${bookingid}/apply-voucher`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({voucherCode:discountcode})
     });
     
     const json = await data.json();
     if(!data.ok){
       setDiscountType('')
     setDiscount(0)
      throw new Error(json.error);
      
     }
     setDiscountType(json.voucher.discountType)
     setDiscount(json.voucher.discountValue)
     console.log("discount",json.voucher.discountType)
    }catch(error){
      toast.error(error?.message)
    }
    
  }

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
          value={discountcode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 outline-none focus:border-purple-500"
        />
        <button
          onClick={hadlediscount}
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
            -{discountType === 'PERCENTAGE' ? discount : discountType === 'FIXED_AMOUNT' ? discount : 0} {discountType === 'PERCENTAGE' ? '%' : discountType === 'FIXED_AMOUNT' ? 'đ' : ''}
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
