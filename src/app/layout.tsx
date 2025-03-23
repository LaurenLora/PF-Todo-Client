import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Playable Factory Todo Case",
  description:
    "It is a todo case for playable factory thats provide you to manage your todos"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <div className="xl:px-24 px-4 flex flex-col min-h-screen overflow-hidden">
          <div className="h-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
