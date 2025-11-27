export const dynamic = "force-dynamic";

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8088/api/booking-items", // backend của bạn
});



export const deleteItemcart = (id: number) => {
  return api.delete<string>(`/${id}`);
};
