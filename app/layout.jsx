import "./globals.css";

export const metadata = {
  title: "BonarsCloset",
  description: "One stop shop for all your clothing items",
};

export default function AppLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="">{children}</main>
      </body>
    </html>
  );
}
