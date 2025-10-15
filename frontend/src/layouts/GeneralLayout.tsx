import Header from "../components/Header";
import Footer from "../components/Footer";
import type { ReactNode } from "react";

interface GeneralLayoutProps {
  children: ReactNode;
}

export default function GeneralLayout({ children }: GeneralLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen font-secondary bg-white text-gray-800">
      <Header />
      <main className="flex-grow flex items-center justify-center py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
