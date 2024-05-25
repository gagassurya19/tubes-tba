import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-24 bg-white text-black dark:bg-gray-800 dark:text-white">
          <div className="w-full">
            {" "}
            {/* Removed max-w-5xl */}
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
