"use client"
import { useState } from "react";
import Link from "next/link";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-500 text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">BonarsCloset</Link>
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-200">
            About
          </Link>
          <Link href="/login" className="hover:text-gray-200">
            Login
          </Link>
        </div>

        {/* Hamburger Menu Button for Mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <CloseOutlined className="text-2xl" />
          ) : (
            <MenuOutlined className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500 space-y-2 py-4">
          <Link
            href="/"
            className="block text-center hover:text-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block text-center hover:text-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/login"
            className="block text-center hover:text-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
