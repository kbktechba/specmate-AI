import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Home, Database, HeadphonesIcon, Book, FileText, Gift } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enterprise Portal",
  description: "Mock Enterprise Portal for SpecMate Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 min-h-screen flex`}
      >
        <aside className="w-64 bg-[#007749] text-white flex flex-col h-screen sticky top-0">
          <div className="p-6 text-xl font-bold border-b border-white/20 flex items-center gap-3">
            <Database /> Enterprise Portal
          </div>
          <nav className="flex-1 p-4 flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-3 p-3 rounded hover:bg-white/10 transition-colors">
              <Home size={20} /> Home
            </Link>
            <Link href="/orders" className="flex items-center gap-3 p-3 rounded hover:bg-white/10 transition-colors">
              <Database size={20} /> Orders
            </Link>
            <Link href="/servicenow" className="flex items-center gap-3 p-3 rounded hover:bg-white/10 transition-colors">
              <HeadphonesIcon size={20} /> ServiceNow
            </Link>
            <Link href="/confluence" className="flex items-center gap-3 p-3 rounded hover:bg-white/10 transition-colors">
              <Book size={20} /> Confluence
            </Link>
            <Link href="/sharepoint" className="flex items-center gap-3 p-3 rounded hover:bg-white/10 transition-colors">
              <FileText size={20} /> SharePoint
            </Link>
            <Link href="/greenpoint" className="flex items-center gap-3 p-3 rounded hover:bg-white/10 transition-colors">
              <Gift size={20} /> GreenPoint
            </Link>
          </nav>
          <div className="p-4 border-t border-white/20">
             <a href="http://localhost:3005" className="flex items-center justify-center w-full py-2 bg-white text-[#007749] font-medium rounded shadow-sm hover:bg-gray-100 transition-colors">
               Back to SpecMate
             </a>
          </div>
        </aside>
        
        <main className="flex-1 overflow-auto bg-gray-50 p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
