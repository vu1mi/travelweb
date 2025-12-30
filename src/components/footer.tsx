import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-[#ececec] text-black p-8 mt-10 rounded-t-[30px]">
      <div className="max-w-7xl mx-auto">
        <div>
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6">
            <ul className="flex flex-wrap gap-5 text-sm lg:text-md font-medium justify-center lg:justify-start">
              <li>
                <Link href={"/"}>Trang Chủ</Link>
              </li>
              <li>
                <a>Tour Trong Nước</a>
              </li>
              <li>
                <a>Tour Nước Ngoài</a>
              </li>
              <li>
                <a>Tin Tức</a>
              </li>
              <li>
                <a>Liên Hệ</a>
              </li>
            </ul>
            <div className="flex gap-4 lg:gap-8">
              <Image
                src="/facebook-icon.svg"
                alt="Facebook"
                width={30}
                height={30}
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
              <Image
                src="/twitte-icon.svg"
                alt="Twitte"
                width={30}
                height={30}
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
              <Image
                src="/instagram-icon.svg"
                alt="Instagram"
                width={30}
                height={30}
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
              <Image
                src="/youtube-icon.svg"
                alt="Youtube"
                width={30}
                height={30}
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
            </div>
          </div>

          <div className="w-full h-[1px] bg-black/30 mt-8 lg:mt-10"></div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mt-8 lg:mt-12">
            <p className="text-gray-600 text-center lg:text-left">
              © 2025 CT7KMA. Academy of Cryptography Techniques.
            </p>
            <Image src={"/logo.png"} alt="Logo" width={150} height={150} className="w-auto h-auto" />
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 text-center lg:text-left">
              <a className="text-gray-600 hover:text-blue-700 text-sm">
                Điều khoản dịch vụ
              </a>
              <a className="text-gray-600 hover:text-blue-700 text-sm">
                Chính sách bảo mật
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
