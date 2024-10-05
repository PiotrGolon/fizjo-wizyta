import Footer from "@/components/layout/footer";
import ProtectedNavbar from "@/components/protected/protected-navbar";
import ProtectedSidebar from "@/components/protected/protected-sidebar";
import { ReactNode } from "react";

interface CustomLayoutProps {
  children: ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <div className=" bg-gray-100">
      <div className="min-h-screen flex flex-col max-w-screen-xl mx-auto">
        <ProtectedNavbar />
        <hr className="mt-2" />
        <div className="lg:grid lg:grid-cols-[1fr_5fr] h-screen">
          <div className="hidden lg:flex">
            <ProtectedSidebar />
          </div>
          <div className="">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomLayout;
