import "./globals.css";

export const metadata = {
  title: "BonarsCloset",
  description: "One stop shop for all your clothing items",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
