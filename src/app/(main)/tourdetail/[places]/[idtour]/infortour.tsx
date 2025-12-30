import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {handleImg} from "@/lib/utils";

export default function TourPage({ data }: { data: any }) {
  const tour = data;
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  if (!tour) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      {/* Tour Header Images */}
      <div className="grid grid-cols-1  gap-4">
        <img
          src={handleImg(tour.images[currentImageIndex])}
          alt="img header"
          className="w-full h-80 object-cover rounded-2xl shadow"
        />
        <div className="grid grid-cols-4 gap-2">
          {tour.images.map((img: string, index: number) => {
            return (
              <img
              key={index}
                src={handleImg(img)}
                alt={`Tour Image ${index }`}
                className="rounded-xl h-28 w-full object-cover hover:scale-105 cursor-pointer border-2 transition-all"
                onClick={()=>{setCurrentImageIndex(index)}}
              />
            );
          })}
         
        
        </div>
      </div>

      {/* Thông Tin Tour */}
      <Card>
        <CardContent className="space-y-4 p-4">
          <h2 className="text-xl font-bold text-blue-700">Thông Tin Tour</h2>
     
          
             {tour.tourDetail ? (
            <div dangerouslySetInnerHTML={{ __html: tour.tourDetail }} />
          ) : (
            <p>
              Nếu bạn đang tìm kiếm một hành trình vừa có cảnh sắc thiên nhiên
              hùng vĩ, vừa có nét cổ kính của văn hóa, thì tour du lịch này
              chính là lựa chọn hoàn hảo.
            </p>
          )}

          <img
            src={handleImg(tour.images[1])}
            alt={tour.name}
            className="rounded-xl shadow-md w-full h-64 object-cover"
          />
          <Button className="bg-purple-600 hover:bg-purple-700">
            Xem chi tiết
          </Button>
        </CardContent>
      </Card>

      {/* Lịch Trình Tour */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-blue-700">Lịch Trình Tour</h2>

        {tour.schedules.map((schedule: any, index: number) => {
          return (
            <Card key={index} className="border-l-4 border-purple-600">
              <CardContent className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-purple-700">
                  Ngày {index + 1}: {schedule.title}
                </h3>
                <p>{schedule.description}</p>
                {/* <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/20/Ho_Chi_Minh_Mausoleum.jpg"
                  alt="Lăng Chủ tịch Hồ Chí Minh"
                  className="rounded-xl shadow-md w-full h-60 object-cover"
                /> */}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
