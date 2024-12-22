import ProfileBar from "@/components/ProfileBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <ProfileBar/>
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}
