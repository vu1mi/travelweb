import TourCard from "@/components/home-component/tour-card";
import { useEffect, useMemo, useState } from "react";
import { useOutCountryStore } from "@/store/outcountryStore";
import Loading from "@/app/loading";
import Link from "next/link";

export default function TourOut() {
  const [show, setShow] = useState<boolean>(false);

  const { tours, loading, error, fetchTours } = useOutCountryStore();
  useEffect(() => {
    fetchTours();
  }, []);

  const showtourout = tours.tours;

  if (loading) {
    <Loading />;
  }

  // const showTour = () => {
  //   setShow((prevShow) => !prevShow);
  // };
  return (
    <div className="max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#4502c7] font-bold text-center">
        Tour Nước Ngoài
      </h2>
      <div className="flex gap-4 lg:gap-5 mt-8 lg:mt-12 flex justify-center">
        {showtourout?.map((tour: any) => {
          return <TourCard key={tour.id} tour={tour} />;
        })}
      </div>
      <div className="text-center mt-8 lg:mt-10">
        <button className="text-blue-600 p-3 border-2 rounded-md border-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
          <Link href={"/tourdetail/nuocngoai"}> Xem thêm</Link>
        </button>
      </div>
    </div>
  );
}
