import { ReactNode } from "react";

interface CustomLayoutProps {
  children: ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content Area */}
      <main className="flex-1 bg-white p-8">{children}</main>
    </div>
  );
};

export default CustomLayout;
