import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-grow p-6">{children}</main>
      <Footer/>
    </div>
  );
}
