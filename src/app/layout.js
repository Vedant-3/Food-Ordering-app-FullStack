import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import { AppProvider } from '../components/AppContext'

const roboto = Roboto({ subsets: ["latin"], weight: ['400', '500', '700'] });

export const metadata = {
  title: "V's Pizza",
  description: "Freshly Baked and Served with love!!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <AppProvider>
            <Header />
            {children}
            <footer className="border-t p-8 text-center mt-16 text-gray-500">
              &copy; 2024 All rights reserved
            </footer>
            </AppProvider>
        </main>


      </body>
    </html>
  );
}
