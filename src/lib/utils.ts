// import { toast } from "@/components/ui/use-toast";
import { EntityError } from "@/lib/http";
import { type ClassValue, clsx } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: "server",
        message: item.message,
      });
    });
  } else {
    toast({
      title: "Lỗi",
      description: error?.payload?.message ?? "Lỗi không xác định",
      variant: "destructive",
      duration: duration ?? 5000,
    });
  }
};
/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload;
};
export const formatDate = (dateArray: [number, number, number, number, number, number] | string | null | undefined): string => {
  if (!dateArray) {
    return "";
  }

  // Nếu là string, convert to date
  if (typeof dateArray === "string") {
    const date = new Date(dateArray);
    const dayStr = String(date.getDate()).padStart(2, "0");
    const monthStr = String(date.getMonth() + 1).padStart(2, "0");
    return `${dayStr}/${monthStr}/${date.getFullYear()}`;
  }

  // Nếu không phải array, trả về empty
  if (!Array.isArray(dateArray)) {
    return "";
  }

  const [year, month, day] = dateArray;
  const dayStr = String(day).padStart(2, "0");
  const monthStr = String(month).padStart(2, "0");
  return `${dayStr}/${monthStr}/${year}`;
};
export const handleImg = (enpoint:string)=>{
 return `http://localhost:8088/api/tours/images/${enpoint}`;
}
