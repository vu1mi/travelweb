"use client";

import Link from "next/link";
import {  useMemo, useState} from "react";
import CardItemOrder from "@/app/(main)/order/carditem_order";
import { toast } from "sonner";

interface CartItem {
  id: number;
  tourId: number;
  tourName: string;
  tourImage: string;
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

interface VoucherResponse {
  id: number;
  code: string;
  description: string;
  discountType: string;
  discountValue: number;
  minPurchaseAmount: number;
  maxDiscountAmount: number;
  validFrom: string;
  validTo: string;
  usageLimit: number;
  usageCount: number;
  isActive: boolean;
}

interface SummaryProps {
  data: CartItem[] | null;
  bookingData: any;
  onRefresh: () => Promise<void>;
}

export default function CartSummary( { data, bookingData, onRefresh }: SummaryProps) {
  const [discount, setDiscount] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountcode, setDiscountCode] = useState<string>("");
  const [appliedVoucher, setAppliedVoucher] = useState<VoucherResponse | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  console.log("log data", data);
  console.log("log re", onRefresh);

  const total = useMemo(() => {
    return (
      data?.reduce((sum: number, item: CartItem) => sum + item.subTotal, 0) ?? 0
    );
  }, [data]);

  const calculateDiscount = (voucher: VoucherResponse, total: number): number => {
    if (voucher.discountType === "PERCENTAGE") {
      const discountAmount = (total * voucher.discountValue) / 100;
      // Apply max discount if specified
      if (voucher.maxDiscountAmount && discountAmount > voucher.maxDiscountAmount) {
        return voucher.maxDiscountAmount;
      }
      return discountAmount;
    } else if (voucher.discountType === "FIXED") {
      return voucher.discountValue;
    }
    return 0;
  };

  const finaltotal = useMemo(() => {
    return total - discountAmount;
  }, [total, discountAmount]);

  const hadlediscount = async () => {
    if (!discountcode || discountcode.trim() === "") {
      toast.warning("Vui lòng nhập mã giảm giá");
      return;
    }

    if (!bookingData?.id) {
      toast.error("Không tìm thấy thông tin booking");
      return;
    }

    setIsApplying(true);
    try {
      const response = await fetch(
        `http://localhost:8088/api/vouchers/bookings/${bookingData.id}/apply-voucher`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ voucherCode: discountcode }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Không thể áp dụng voucher");
        return;
      }

      const voucher: VoucherResponse = result.voucher;

      // Check min purchase amount
      if (voucher.minPurchaseAmount && total < voucher.minPurchaseAmount) {
        toast.warning(
          `Đơn hàng tối thiểu ${voucher.minPurchaseAmount.toLocaleString("vi-VN")}đ để áp dụng voucher này`
        );
        return;
      }

      // Calculate discount
      const calculatedDiscount = calculateDiscount(voucher, total);
      const discountPercentage = (calculatedDiscount / total) * 100;

      setAppliedVoucher(voucher);
      setDiscount(discountPercentage);
      setDiscountAmount(calculatedDiscount);

      toast.success(result.message || "Áp dụng voucher thành công!");
      await onRefresh(); // Refresh booking data
    } catch (error: any) {
      console.error("Error applying voucher:", error);
      toast.error("Đã xảy ra lỗi khi áp dụng voucher");
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemoveVoucher = async () => {
    if (!bookingData?.id) {
      toast.error("Không tìm thấy thông tin booking");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8088/api/vouchers/bookings/${bookingData.id}/remove-voucher`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        toast.error("Không thể xóa voucher");
        return;
      }

      setAppliedVoucher(null);
      setDiscount(0);
      setDiscountAmount(0);
      setDiscountCode("");
      toast.success("Đã xóa voucher");
      await onRefresh(); // Refresh booking data
    } catch (error) {
      console.error("Error removing voucher:", error);
      toast.error("Đã xảy ra lỗi khi xóa voucher");
    }
  };

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
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            value={discountcode}
            onChange={(e) => setDiscountCode(e.target.value)}
            disabled={!!appliedVoucher || isApplying}
            className="flex-1 border rounded-lg px-4 py-2 outline-none focus:border-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {appliedVoucher ? (
            <button
              onClick={handleRemoveVoucher}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Xóa mã
            </button>
          ) : (
            <button
              onClick={hadlediscount}
              disabled={isApplying}
              className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isApplying ? "Đang áp dụng..." : "Áp dụng"}
            </button>
          )}
        </div>

        {/* Applied voucher info */}
        {appliedVoucher && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 font-semibold">
                  Mã: {appliedVoucher.code}
                </p>
                <p className="text-sm text-green-600">{appliedVoucher.description}</p>
              </div>
              <div className="text-right">
                <p className="text-green-700 font-bold">
                  -{discountAmount.toLocaleString("vi-VN")} đ
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tổng tiền */}
      <div className="space-y-1 text-gray-700 text-sm max-w-5xl">
        <div className="flex justify-between">
          <span>Tổng tiền:</span>
          <span>{total.toLocaleString("vi-VN")} đ</span>
        </div>
        {appliedVoucher && (
          <div className="flex justify-between">
            <span>Giảm giá ({appliedVoucher.code}):</span>
            <span className="text-red-600">
              -{discountAmount.toLocaleString("vi-VN")} đ
            </span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg text-purple-700 mt-2">
          <span>Thanh toán:</span>
          <span>{finaltotal.toLocaleString("vi-VN")} đ</span>
        </div>
      </div>
    </div>
  );
}
