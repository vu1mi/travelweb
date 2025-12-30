// import { ModeToggle } from "@/components/toggle-theme";
"use client";
import NavBarHeader from "@/components/navigation_menu_header";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Headers() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex justify-center pt-4 pb-4 w-full bg-white shadow-md sticky top-0 left-0 z-10">
      <div className="flex items-center justify-between w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image src={"/logo.png"} alt="Logo" width={150} height={150} className="w-auto h-auto" />
        </div>
        {/* Navigation and Buttons */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <NavBarHeader />
          </div>
          <div className="hidden md:flex gap-2">
            <button className="px-4 py-2 bg-[#00a8ef] hover:bg-blue-500 text-white text-sm lg:text-lg rounded-lg transition-colors">
              <Link href="/login">Login</Link>
            </button>
            <button className="px-3 py-2 bg-[#00a8ef] hover:bg-blue-500 text-white text-sm lg:text-lg rounded-lg transition-colors">
              <Link href="/register">Sign in</Link>
            </button>
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-purple-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
          <div className="px-4 py-4 space-y-4">
            <NavBarHeader />
            <div className="flex flex-col gap-2">
              <button className="px-4 py-2 bg-[#00a8ef] hover:bg-blue-500 text-white text-sm rounded-lg transition-colors text-left">
                <Link href="/login">Login</Link>
              </button>
              <button className="px-4 py-2 bg-[#00a8ef] hover:bg-blue-500 text-white text-sm rounded-lg transition-colors text-left">
                <Link href="/register">Sign in</Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
