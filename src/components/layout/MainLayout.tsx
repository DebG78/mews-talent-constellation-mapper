
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 overflow-x-hidden w-full">
        <div className={isMobile ? "px-0" : "px-4 max-w-[1800px] mx-auto"}>
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
