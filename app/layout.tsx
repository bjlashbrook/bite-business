import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Image from 'next/image';
import { FaFilter, FaRegUser } from 'react-icons/fa6';

import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Eatclub Challenge',
  description: 'Discover the best restaurants in your area'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="sticky top-0 z-10 bg-white border-gray-200 border-b">
          <nav className="container mx-auto p-4 pt-8">
            <ul className="flex justify-between">
              <li>
                <FaRegUser size={24} />
              </li>
              <li>
                <Link href="/">
                  <Image src="/eatclub-icon.png" alt="Eatclub Logo" width={30} height={30} className="rounded-md" />
                </Link>
              </li>
              <li>
                <FaFilter size={24} />
              </li>
            </ul>
          </nav>
        </div>

        <main>{children}</main>
      </body>
    </html>
  );
}
