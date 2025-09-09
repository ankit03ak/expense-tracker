import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });
const geistSans = inter.variable;
const geistMono = inter.variable;

export const metadata = {
  title: "Welth",
  description: "One stop finance platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      
    <html lang="en">
      <body
        className={`${inter.className}`}
        >
        {/* /header */}
        <Header />
        <main className="min-h-screen">

        {children}
        </main>
        <Toaster richColors />
        {/* footer */}
        <footer className="bg-blue-50 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600">

          <p>Made with NextJS</p>
          </div>
        </footer>
      </body>
    </html>
        </ClerkProvider>
  );
}
