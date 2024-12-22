import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">BonarsCloset</Link>
        </h1>
        <div className="space-x-6">
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
      </div>
    </nav>
  );
}
