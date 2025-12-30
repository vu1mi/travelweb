import TourCard from "@/components/home-component/tour-card";
import { useEffect, useMemo, useState } from "react";

import { useInCountryStore } from "@/store/incountryStore";
import Loading from "@/app/loading";
import Link from "next/link";

export default function TourIn() {
  const [show, setShow] = useState<boolean>(false);

  const { tours, loading, error, fetchTours } = useInCountryStore();
  useEffect(() => {
    fetchTours();
  }, []);

  const showtourin = tours.tours;
  console.log("Tour trong nuoc:", showtourin);

  if (loading) {
    <Loading />;
  }

  // useEffect(() => {
  //   if (show) {
  //     setshowtourIn(tourin);
  //   } else {
  //     setshowtourIn(tourin.length > 5 ? tourin.slice(0, 4) : tourin);
  //   }
  // }, [tourin, show]);

  // const showTour = () => {
  //   setShow((prevShow) => !prevShow);
  // };
  return (
    <div className="max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#4502c7] font-bold text-center">
        Tour Trong Nước
      </h2>
      <div className="flex gap-3 lg:gap-5 mt-8 lg:mt-12 flex justify-center">
        {showtourin?.map((tour: any) => {
          return <TourCard key={tour.id} tour={tour} />;
        })}
      </div>

      <div className="text-center mt-8 lg:mt-10">
        <button className="text-blue-600 p-3 border-2 rounded-md border-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
          <Link href={"/tourdetail/trongnuoc"}> Xem thêm</Link>
        </button>
      </div>
    </div>
  );
}
