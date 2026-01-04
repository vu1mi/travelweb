// store/counterStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Tour = {
    id: number;
    name: string;
    imageUrl: string;
    duration: string;
    startDate: [number, number, number];
    originalPrice: number;
    discountedPrice: number;
    discountPercent: number;
    priceAdult: number;
    priceChild: number;
    priceInfant: number;
    remainAdult: number;
    remainChild: number;
    remainInfant: number;
    remainSlot: number;
    promotionName: string | null;
    isOnSale: boolean;
    rating: number;
    reviewCount: number;
    status: number;
    createdAt: [number, number, number, number, number, number];
    createdBy: string;
    updatedAt: [number, number, number, number, number, number];
    updatedBy: string;
  };
  

export type TourStore = {
  tours: {
    trongnuoc: [] | Tour[],
    nuocngoai: [] | Tour[],
    bac: [] | Tour[],
    trung: [] | Tour[],
    nam: [] | Tour[],
    chaua: [] | Tour[],
    chauau: [] | Tour[],
    chauuc: [] | Tour[],
  };
  loading: boolean;
  error: string | null;
  setTour:  (id:number, tourdata: Tour[])=>void;
//   fetchTours: () => Promise<void>;
};



export const useTourAllType = create<TourStore>()(
  persist(
    (set) => ({
      tours: {
        trongnuoc:[],
        nuocngoai:[],
        bac:[],
        trung:[],
        nam:[],
        chauau:[],
        chaua:[],
        chauuc:[]

      },
      loading: false,
      error: null,

  setTour: (id, tourdata) =>
  set((state) => ({
    tours: {
      ...state.tours,
      [id]: tourdata, // key động
    },
  }));


    //   clearTours: () => set({ tours: [] }),
    }),
    {
      name: "tour-storage", // 🔹 tên key lưu trong localStorage
      partialize: (state) => ({ tours: state.tours }), // chỉ lưu phần tours (không lưu loading/error)
    }
  )
);
