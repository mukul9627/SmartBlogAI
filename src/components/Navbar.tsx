"use client";

import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import profileImg from "@/components/IMG/IMG.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
   <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
  <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
    {/* Logo */}
    <div className="text-2xl font-bold text-[#171717]">
      <Link href="/">
        SmartBlog<span className="text-blue-600">AI</span>
      </Link>
    </div>

    {/* Center Links */}
    <ul className="hidden md:flex gap-6 text-[16px] font-medium text-gray-700">
      <li className="hover:text-blue-600 cursor-pointer">
        <Link href="/">Home</Link>
      </li>
      <li className="hover:text-blue-600 cursor-pointer">
        <Link href="/addblog">Add Blogs</Link>
      </li>
      <li className="hover:text-blue-600 cursor-pointer">About Us</li>
    </ul>

    {/* Search + Profile */}
    <div className="flex items-center gap-4">
      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-md px-2 py-1">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none px-2 text-sm text-gray-700"
        />
      </div>

      {/* Profile */}
      <div className="relative">
        <Image
          src={profileImg}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
          onClick={() => setProfileOpen(!profileOpen)}
        />
        {profileOpen && (
          <div className="absolute left-3 mt-2 w-40 bg-white text-black border rounded-md shadow-md z-20">
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
              Toolkit
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="md:hidden px-4 pb-4">
      <ul className="flex flex-col gap-3 text-gray-700 font-medium">
        <li className="hover:text-blue-600 cursor-pointer">Blogs</li>
        <li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
        <li className="hover:text-blue-600 cursor-pointer">About Us</li>
      </ul>
    </div>
  )}
</nav>

  );
};

export default Navbar;
