"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/app/AppProvider";
import CartSummary from "@/app/(main)/order/cartsummary";
import PaymentForm from "@/app/(main)/order/inforcleint";

interface CartItem {
  id: number;
  tourId: number;
  tourName: string;
  tourImage: string;
  departureDate: number[];
  departureLocation: string;
  adultCount: number;
  childCount: number;
  infantCount: number;
  pricePerAdult: number;
  pricePerChild: number;
  pricePerInfant: number;
  subTotal: number;
}

export default function CartClient() {
  const { userId } = useAppContext();

  const [items, setItems] = useState<CartItem[] | null>(null);
  const [data, setData] = useState<any>();

  async function loadData() {
    const res = await fetch(
      `http://localhost:8088/api/bookings/user/${userId}`,
      { cache: "no-store", credentials: "include" }
    );
    const result = await res.json();
    setItems(result.items);
    setData(result);
  }

  useEffect(() => {
    if (userId) loadData();
  }, [userId]);

  console.log("databooking", data);
  // if (!items) return <div>Loading...</div>;

  return (
    <>
      <CartSummary data={items} bookingData={data} onRefresh={loadData} />
      <PaymentForm data={data} />
    </>
  );
}
