"use client";
import { useAuth } from "@clerk/nextjs";
import AuthButtons from "./auth-buttons";
import HeaderLogo from "./header-logo";
import Navigation from "./navigation";

const Header = () => {
  const isLoggedIn = useAuth();
  return (
    <header className="px-4 py-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-20">
            <HeaderLogo href="/" />
            <Navigation />
          </div>
          {isLoggedIn && <AuthButtons />}
        </div>
      </div>
    </header>
  );
};

export default Header;
