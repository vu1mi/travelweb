import Search from "@/components/search/search";
import { Image } from "next/image";

export default function LayoutSearch() {
  return (
    <div className="bg-[url(/background-1.png)] w-full min-h-[500px] lg:h-[600px] bg-cover bg-center flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-center max-w-4xl pt-8 lg:pt-[100px] text-[#4502c7] leading-tight">
        Du lịch Châu Á - Khám phá Mỹ, Úc, Âu
        <br className="hidden sm:block" />Đi nơi đâu bạn muốn
      </h1>
      <Search />
    </div>
  );
}
